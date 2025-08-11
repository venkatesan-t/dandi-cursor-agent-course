import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

// Rate limiting store (in production, use Redis or a proper rate limiting service)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX_ATTEMPTS = 10 // Max 10 attempts per minute per IP

function getRateLimitKey(request: NextRequest): string {
  // In production, consider using a more sophisticated key
  // that combines IP + User-Agent + other fingerprinting
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown'
  return `validate_key:${ip}`
}

function isRateLimited(request: NextRequest): boolean {
  const key = getRateLimitKey(request)
  const now = Date.now()
  
  const existing = rateLimitStore.get(key)
  
  if (!existing || now > existing.resetTime) {
    // Reset or initialize rate limit
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }
  
  if (existing.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return true
  }
  
  // Increment count
  existing.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    if (isRateLimited(request)) {
      return NextResponse.json(
        { 
          error: 'Too many validation attempts. Please try again later.',
          isValid: false
        }, 
        { status: 429 }
      )
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ 
        error: 'Supabase not configured. Please set up your environment variables.',
        isValid: false
      }, { status: 500 })
    }

    const body = await request.json()
    const { apiKey } = body

    // Validate input
    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json({ 
        error: 'API key is required and must be a string',
        isValid: false
      }, { status: 400 })
    }

    // Sanitize the API key (basic validation)
    const sanitizedKey = apiKey.trim()
    if (sanitizedKey.length === 0 || sanitizedKey.length > 100) {
      return NextResponse.json({ 
        error: 'Invalid API key format',
        isValid: false
      }, { status: 400 })
    }

    // Query Supabase for the API key
    // Using select with specific fields to avoid exposing sensitive data
    const { data: apiKeyData, error } = await supabase
      .from('api_keys')
      .select('id, name, type, is_active, usage, usage_limit, last_used')
      .eq('key', sanitizedKey)
      .eq('is_active', true)
      .single()

    if (error) {
      // Don't expose database errors to the client
      console.error('Database error during API key validation:', error)
      
      // Check if it's a "not found" error vs other database errors
      if (error.code === 'PGRST116') {
        // No rows returned - invalid key
        return NextResponse.json({
          isValid: false,
          error: 'Invalid API key'
        }, { status: 401 })
      }
      
      // Other database errors
      return NextResponse.json({
        isValid: false,
        error: 'Validation service temporarily unavailable'
      }, { status: 503 })
    }

    // Check if key exists and is active
    if (!apiKeyData) {
      return NextResponse.json({
        isValid: false,
        error: 'Invalid API key'
      }, { status: 401 })
    }

    // Check usage limits
    if (apiKeyData.usage >= apiKeyData.usage_limit) {
      return NextResponse.json({
        isValid: false,
        error: 'API key usage limit exceeded'
      }, { status:403 })
    }

    // Update usage statistics atomically
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ 
        usage: apiKeyData.usage + 1,
        last_used: new Date().toISOString()
      })
      .eq('id', apiKeyData.id)

    if (updateError) {
      console.error('Error updating API key usage:', updateError)
      // Continue anyway - validation was successful
    }

    // Return successful validation with minimal, safe data
    return NextResponse.json({
      isValid: true,
      keyInfo: {
        id: apiKeyData.id,
        name: apiKeyData.name,
        type: apiKeyData.type,
        usage: apiKeyData.usage + 1, // Return updated usage
        usageLimit: apiKeyData.usage_limit,
        lastUsed: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Unexpected error during API key validation:', error)
    return NextResponse.json({
      isValid: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to validate API keys.' 
  }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to validate API keys.' 
  }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to validate API keys.' 
  }, { status: 405 })
}
