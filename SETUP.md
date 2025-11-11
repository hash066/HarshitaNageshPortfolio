# 🚀 Hobby Portfolio Setup Guide

Your authenticated hobby uploader is **fully implemented**! Just follow these steps to get it running:

## 📋 Features Already Implemented
✅ Email/Password Authentication  
✅ Google OAuth Authentication  
✅ Add Hobby Dialog with image upload  
✅ Real-time updates  
✅ Category filtering  
✅ Responsive design  

---

## 🔧 Setup Instructions

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to finish setting up (~2 minutes)

### Step 2: Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Update the `.env` file in your project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 3: Create Database Tables
In your Supabase dashboard, go to **SQL Editor** and run these commands:

#### 1. Create Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

#### 2. Create Hobbies Table
```sql
CREATE TABLE hobbies (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'tech',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;

-- Policies for hobbies
CREATE POLICY "Hobbies are viewable by everyone"
  ON hobbies FOR SELECT
  USING (true);

CREATE POLICY "Users can create own hobbies"
  ON hobbies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hobbies"
  ON hobbies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own hobbies"
  ON hobbies FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX hobbies_user_id_idx ON hobbies(user_id);
CREATE INDEX hobbies_date_idx ON hobbies(date DESC);
```

#### 3. Enable Realtime (Optional but Recommended)
```sql
-- Enable realtime for hobbies table
ALTER PUBLICATION supabase_realtime ADD TABLE hobbies;
```

### Step 4: Set Up Storage Bucket
1. In Supabase dashboard, go to **Storage**
2. Click **New Bucket**
3. Name it: `hobby-images`
4. Make it **Public**
5. Click **Create Bucket**

#### Set Storage Policies
Click on the `hobby-images` bucket, go to **Policies**, and add:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'hobby-images');

-- Allow public read access
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'hobby-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'hobby-images');
```

### Step 5: Configure Google OAuth (Optional)
1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Google** provider
3. Follow Supabase's instructions to set up Google OAuth
4. Add your redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### Step 6: Start Your App
```bash
npm install
npm run dev
```

---

## 🎉 You're Done!

Navigate to:
- `/hobbies` - View all hobbies
- `/login` - Sign in
- `/register` - Create account

Click the **+** button on the hobbies page to add your first entry!

---

## 🐛 Troubleshooting

**Issue: "Missing Supabase environment variables"**
- Make sure `.env` file exists in project root
- Restart dev server after adding env variables

**Issue: "Failed to fetch hobbies"**
- Check database tables are created
- Verify RLS policies are set up correctly

**Issue: "Image upload fails"**
- Ensure `hobby-images` bucket exists
- Check storage policies are configured

**Issue: Authentication doesn't work**
- Verify Supabase credentials in `.env`
- Check email confirmation is disabled in Supabase (Settings → Auth)
