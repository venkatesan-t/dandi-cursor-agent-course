export interface ApiKey {
  id: string
  name: string
  key: string
  type: string
  created_at: string
  last_used?: string
  is_active: boolean
  usage: number
  usage_limit: number
}
