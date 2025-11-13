-- Supabase Storage Policies for beauty-bar-images bucket
-- Copy and paste this entire file into your Supabase SQL Editor and run it
-- This will create all required storage policies for image uploads

-- First, ensure the bucket exists and is public
-- You can do this manually in the Supabase dashboard:
-- 1. Go to Storage
-- 2. Create bucket named: beauty-bar-images
-- 3. Make it Public

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'beauty-bar-images' AND
    auth.uid() IS NOT NULL
  );

-- Allow authenticated users to update their files
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

-- Allow authenticated users to delete files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE 
  USING (
    bucket_id = 'beauty-bar-images' AND
    auth.uid() IS NOT NULL
  );

-- Allow public read access (so images can be displayed on the website)
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'beauty-bar-images');

