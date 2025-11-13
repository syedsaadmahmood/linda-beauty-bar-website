# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Note your project URL and anon key from Settings > API

## 2. Environment Variables

Create a `.env` file in the root directory with:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Database Schema

**IMPORTANT**: You must create the database tables before seeding data!

### Option 1: Quick Setup (Recommended)
Copy the entire contents of `src/schema/supabase-schema.sql` file and paste it into your Supabase SQL Editor, then run it.

### Option 2: Manual Setup
Run these SQL commands in your Supabase SQL Editor to create the required tables:

```sql
-- Services table (stores all services as JSONB array in a single row)
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table (stores all testimonials as JSONB array in a single row)
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table (stores all blog posts as JSONB array in a single row)
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ categories table (stores all FAQ categories as JSONB array in a single row)
CREATE TABLE IF NOT EXISTS faq_categories (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio images table (stores portfolio structure as JSONB object in a single row)
CREATE TABLE IF NOT EXISTS portfolio_images (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

-- Create policies to allow authenticated users to read/write
CREATE POLICY "Allow authenticated users to read services" ON services
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to write services" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update services" ON services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete services" ON services
  FOR DELETE USING (auth.role() = 'authenticated');

-- Repeat for other tables
CREATE POLICY "Allow authenticated users to read testimonials" ON testimonials
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to write testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read blog_posts" ON blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to write blog_posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update blog_posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete blog_posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read faq_categories" ON faq_categories
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to write faq_categories" ON faq_categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update faq_categories" ON faq_categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete faq_categories" ON faq_categories
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read portfolio_images" ON portfolio_images
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to write portfolio_images" ON portfolio_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update portfolio_images" ON portfolio_images
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete portfolio_images" ON portfolio_images
  FOR DELETE USING (auth.role() = 'authenticated');

-- Allow public read access (for frontend)
CREATE POLICY "Allow public read access to services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to blog_posts" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to faq_categories" ON faq_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to portfolio_images" ON portfolio_images
  FOR SELECT USING (true);
```

## 4. Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Click "New bucket"
3. Name it: `beauty-bar-images`
4. Make it **Public** (so images can be accessed via URL)
5. Click "Create bucket"

### Storage Policies

After creating the bucket, you need to set up storage policies. 

**Option 1: Quick Setup (Recommended)**
Copy the entire contents of `src/schema/supabase-storage-policies.sql` file and paste it into your Supabase SQL Editor, then run it.

**Option 2: Manual Setup**
Go to Storage > Policies in the Supabase dashboard and add these policies:

**Allow authenticated users to upload:**
```sql
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'beauty-bar-images' AND
    auth.uid() IS NOT NULL
  );
```

**Allow authenticated users to update:**
```sql
CREATE POLICY "Allow authenticated updates" ON storage.objects
  FOR UPDATE 
  USING (
    bucket_id = 'beauty-bar-images' AND
    auth.uid() IS NOT NULL
  )
  WITH CHECK (
    bucket_id = 'beauty-bar-images' AND
    auth.uid() IS NOT NULL
  );
```

**Allow authenticated users to delete:**
```sql
CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE 
  USING (
    bucket_id = 'beauty-bar-images' AND
    auth.uid() IS NOT NULL
  );
```

**Allow public read access:**
```sql
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'beauty-bar-images');
```

**Important:** Make sure you are logged into the admin panel before uploading images, as these policies require authentication.

## 5. Create Admin User

1. Go to Authentication > Users in Supabase dashboard
2. Click "Add User" and create an admin user
3. Set email and password (or use email invite)
4. Use this email/password to log into the admin panel

## 6. Seed the Database

After setting up Supabase, you need to seed it with initial data from JSON files:

1. Log into the admin panel at `/admin`
2. Navigate to "Seed Data" in the sidebar (or go to `/admin?section=seed`)
3. Click "Seed Database" button
4. Wait for the seed to complete (you'll see a success message)

This will import all data from JSON files into Supabase. After seeding, the application will fetch data exclusively from Supabase with caching support.

### Alternative: Programmatic Seed

You can also seed programmatically from the browser console:

```javascript
// In browser console after loading the app
import('/src/scripts/seedSupabase.js').then(module => {
  module.seedSupabase();
});
```

## 7. Cache Configuration

The application uses localStorage-based caching with TTL:
- Services/Testimonials: 5 minutes
- Blog/Portfolio: 10 minutes  
- FAQ: 15 minutes

Cache is automatically cleared when data is updated through the admin panel.

## 8. Verify Setup

After seeding, verify:
- Services page loads with data
- Testimonials are visible
- Blog posts appear
- FAQ categories load
- Portfolio images display

If you see empty states, check:
1. Browser console for errors
2. Supabase dashboard to verify data exists
3. Re-run seed script if needed

