-- ============================================================
-- STORAGE POLICIES ONLY
-- ============================================================
-- Run this ONLY if you created the "site-images" bucket
-- manually via the Supabase dashboard and need the policies.
--
-- If you already ran supabase-setup.sql successfully,
-- you do NOT need this file.
-- ============================================================

-- Anyone can VIEW images (public website)
CREATE POLICY "Public read access for site images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-images');

-- Allow uploading images (admin panel)
CREATE POLICY "Allow image uploads to site-images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Allow replacing images
CREATE POLICY "Allow image updates in site-images"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'site-images')
  WITH CHECK (bucket_id = 'site-images');

-- Allow deleting images
CREATE POLICY "Allow image deletes in site-images"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'site-images');
