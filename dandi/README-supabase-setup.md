# Supabase Database Setup

This guide will help you set up your Supabase database for the API Key Management system.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Database Setup

### 1. Run the Schema

1. Open your Supabase project dashboard
2. Go to the SQL Editor (Database > SQL Editor)
3. Copy and paste the contents of `supabase-schema.sql` file
4. Click "Run" to execute the SQL

This will create:
- `api_keys` table with all necessary columns
- Proper indexes for performance
- Triggers for automatic timestamp updates
- Sample data for testing

### 2. Environment Variables

1. In your Supabase project dashboard, go to Settings > API
2. Copy your project URL and anon key
3. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Note:** Replace the placeholder values with your actual Supabase credentials.

### 3. Database Schema

The `api_keys` table includes:

- `id` (UUID, Primary Key) - Unique identifier
- `name` (TEXT) - Human-readable name for the API key
- `key` (TEXT, Unique) - The actual API key
- `type` (TEXT) - Environment type (dev, prod, test)
- `usage_limit` (INTEGER) - Maximum allowed usage
- `is_active` (BOOLEAN) - Whether the key is active
- `usage` (INTEGER) - Current usage count
- `created_at` (TIMESTAMP) - When the key was created
- `updated_at` (TIMESTAMP) - When the key was last updated
- `last_used` (TIMESTAMP) - When the key was last used

### 4. Testing the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/dashboard`
3. Try creating, editing, and deleting API keys
4. Check your Supabase dashboard to see the data being stored

## Security Notes

- The service role key should only be used for server-side operations
- Consider enabling Row Level Security (RLS) for production use
- Never expose service role keys in client-side code
- Use environment variables for all sensitive data

## API Endpoints

The following REST API endpoints are available:

- `GET /api/api-keys` - Fetch all API keys
- `POST /api/api-keys` - Create a new API key
- `GET /api/api-keys/[id]` - Fetch a specific API key
- `PUT /api/api-keys/[id]` - Update an API key
- `DELETE /api/api-keys/[id]` - Delete an API key

## Troubleshooting

If you encounter issues:

1. Check that your environment variables are correctly set
2. Verify your Supabase credentials in the project dashboard
3. Ensure the database schema was created successfully
4. Check the browser console and server logs for error messages
