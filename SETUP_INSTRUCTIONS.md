# 🚀 Setup Instructions for Hobby Portfolio with Authentication

## Prerequisites
- A Supabase account (free tier is fine)
- Node.js installed on your machine

---

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: e.g., "hobby-portfolio"
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose closest to you
4. Click **"Create new project"** and wait for setup to complete (~2 minutes)

---

## Step 2: Get Your Supabase Credentials

1. Once your project is ready, go to **Settings** (left sidebar) → **API**
2. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`
3. Copy both values - you'll need them in Step 4

---

## Step 3: Set Up the Database Schema

1. In your Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase-schema.sql` file from your project
4. Paste it into the SQL Editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned" - this means the tables were created!

---

## Step 4: Set Up Storage Bucket for Images

1. Go to **Storage** (left sidebar) in Supabase Dashboard
2. Click **"Create a new bucket"**
3. Configure:
   - **Name**: `hobby-images`
   - **Public bucket**: Toggle to **ON** (important for image viewing)
4. Click **"Create bucket"**

### Set Storage Policies:
1. Click on the `hobby-images` bucket
2. Go to **Policies** tab
3. Click **"New policy"** and create these 3 policies:

**Policy 1: Anyone can view images**
```
Policy name: Anyone can view images
Allowed operation: SELECT
Policy definition: (bucket_id = 'hobby-images')
```

**Policy 2: Authenticated users can upload**
```
Policy name: Authenticated users can upload
Allowed operation: INSERT  
Policy definition: (bucket_id = 'hobby-images' AND auth.role() = 'authenticated')
```

**Policy 3: Users can delete own images**
```
Policy name: Users can delete own images
Allowed operation: DELETE
Policy definition: (bucket_id = 'hobby-images' AND auth.uid()::text = (storage.foldername(name))[1])
```

---

## Step 5: Configure Google OAuth (Optional)

### Get Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Select **External** user type
5. Fill in required fields:
   - App name: Your app name
   - User support email: Your email
   - Developer contact: Your email
6. Add scopes:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
7. Add test users (your email)
8. Save

### Create OAuth Client ID:

1. Go to **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** → **OAuth Client ID**
3. Application type: **Web application**
4. Add **Authorized JavaScript origins**:
   - `http://localhost:5173` (for development)
   - Your production URL (when deployed)
5. Add **Authorized redirect URIs**:
   - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - Replace `YOUR_PROJECT_REF` with your actual project reference (found in Supabase URL)
6. Click **"Create"**
7. Copy the **Client ID** and **Client Secret**

### Configure in Supabase:

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Toggle **"Enable Sign in with Google"** to ON
4. Paste your **Client ID** and **Client Secret**
5. Click **"Save"**

---

## Step 6: Set Up Environment Variables

1. In your project root, create a `.env` file (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...your-anon-key...
```

3. Replace with your actual values from Step 2

---

## Step 7: Install Dependencies & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Your app should now be running at `http://localhost:5173`

---

## 🎉 You're All Set!

### Test Your Setup:

1. **Sign Up**: Go to `/register` and create an account
2. **Verify Email**: Check your email for verification link (optional - you can skip this in development)
3. **Sign In**: Go to `/login` and sign in
4. **Add Hobby**: Click the "+" button on the Hobbies page
5. **Upload Image**: Try uploading an image with your hobby entry

---

## 🔒 Security Notes

- The `VITE_SUPABASE_ANON_KEY` is safe to expose in client-side code
- Never expose your `service_role` key in the frontend
- Row Level Security (RLS) policies protect your data
- All hobbies are publicly viewable, but only authenticated users can create/edit/delete their own

---

## 📝 Database Structure

### Tables:
- **profiles**: User profile information
- **hobbies**: Hobby entries with title, date, description, tags, images, and category

### Storage:
- **hobby-images**: Public bucket for hobby images

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Make sure your `.env` file exists and has the correct variable names with `VITE_` prefix
- Restart your dev server after adding environment variables

### Images not uploading
- Check that the `hobby-images` bucket exists and is **public**
- Verify storage policies are correctly set
- Check browser console for specific error messages

### Google OAuth not working
- Verify redirect URIs match exactly in Google Cloud Console
- Make sure Google provider is enabled in Supabase
- Check that Client ID and Secret are correct

### Database errors
- Run the SQL schema again to ensure all tables and policies were created
- Check the Supabase logs in Dashboard → Logs

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
