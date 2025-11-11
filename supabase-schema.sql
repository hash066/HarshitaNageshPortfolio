-- =====================================================
-- SUPABASE DATABASE SCHEMA FOR HOBBY PORTFOLIO
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- (Supabase Dashboard -> SQL Editor -> New Query)
-- =====================================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create hobbies table
CREATE TABLE IF NOT EXISTS hobbies (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'tech',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 5. Create RLS Policies for hobbies table
-- Anyone can view all hobbies (public viewing)
CREATE POLICY "Anyone can view hobbies"
  ON hobbies FOR SELECT
  USING (true);

-- Users can insert their own hobbies
CREATE POLICY "Users can insert own hobbies"
  ON hobbies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own hobbies
CREATE POLICY "Users can update own hobbies"
  ON hobbies FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own hobbies
CREATE POLICY "Users can delete own hobbies"
  ON hobbies FOR DELETE
  USING (auth.uid() = user_id);

-- 6. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS hobbies_user_id_idx ON hobbies(user_id);
CREATE INDEX IF NOT EXISTS hobbies_date_idx ON hobbies(date DESC);
CREATE INDEX IF NOT EXISTS hobbies_category_idx ON hobbies(category);

-- 7. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hobbies_updated_at
  BEFORE UPDATE ON hobbies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- OPTIONAL: Sample data for testing
-- =====================================================
-- Uncomment the lines below to insert sample data after you create your first user

/*
-- Replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users table
INSERT INTO hobbies (user_id, title, date, description, tags, category, image_url) VALUES
  ('YOUR_USER_ID_HERE', 'Weekend Hiking Adventure', '2024-01-15', 'Explored the beautiful mountain trails today. The sunrise view from the peak was absolutely breathtaking.', ARRAY['hiking', 'nature', 'photography'], 'outdoor', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'),
  ('YOUR_USER_ID_HERE', 'Building My First Mechanical Keyboard', '2024-01-10', 'Finally completed my custom mechanical keyboard build. The tactile switches feel amazing for coding sessions.', ARRAY['mechanical keyboards', 'DIY', 'coding'], 'tech', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=300&fit=crop');
*/

-- =====================================================
-- STORAGE BUCKET SETUP (Run separately in Dashboard)
-- =====================================================
-- Go to: Supabase Dashboard -> Storage -> Create a new bucket
-- Bucket name: hobby-images
-- Public bucket: YES (for public image access)
-- 
-- Then create a storage policy:
-- 1. Go to Storage -> hobby-images -> Policies
-- 2. Create policy: "Anyone can view images"
--    Operation: SELECT
--    Policy definition: (bucket_id = 'hobby-images')
-- 3. Create policy: "Authenticated users can upload images"
--    Operation: INSERT
--    Policy definition: (bucket_id = 'hobby-images' AND auth.role() = 'authenticated')
-- 4. Create policy: "Users can delete own images"
--    Operation: DELETE
--    Policy definition: (bucket_id = 'hobby-images' AND auth.uid() = owner)

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- After setup, run these to verify everything is working:

-- Check if tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check RLS policies
-- SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';

-- View all hobbies
-- SELECT * FROM hobbies ORDER BY date DESC;
