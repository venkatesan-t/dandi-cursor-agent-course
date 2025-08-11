-- Create the api_keys table
CREATE TABLE api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('dev', 'prod', 'test')),
  usage_limit INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true,
  usage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE
);

-- Create an index on the key for fast lookups
CREATE INDEX idx_api_keys_key ON api_keys(key);

-- Create an index on is_active for filtering active keys
CREATE INDEX idx_api_keys_active ON api_keys(is_active);

-- Add Row Level Security (RLS) policies if needed
-- ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_api_keys_updated_at 
    BEFORE UPDATE ON api_keys 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO api_keys (name, key, type, usage_limit, is_active, usage) VALUES
('production', 'dandi-prod-' || substring(gen_random_uuid()::text, 1, 24), 'prod', 10000, true, 850),
('development', 'dandi-dev-' || substring(gen_random_uuid()::text, 1, 24), 'dev', 1000, true, 245),
('testing', 'dandi-test-' || substring(gen_random_uuid()::text, 1, 24), 'test', 500, true, 0);
