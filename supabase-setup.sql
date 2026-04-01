-- ============================================================
-- CONNEXUS MEDICAL SUPPLIES - COMPLETE SUPABASE SETUP
-- ============================================================
-- Run this ENTIRE script in your Supabase SQL Editor (one go).
-- It creates all tables, storage, and security policies.
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. CONTACT FORM SUBMISSIONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Allow anonymous users to INSERT (public form submissions)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated (admin) users can read/update/delete
CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);


-- ────────────────────────────────────────────────────────────
-- 2. QUOTE REQUESTS (separate from general contact)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  product_interest TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'quoted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view quotes"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update quotes"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete quotes"
  ON quote_requests
  FOR DELETE
  TO authenticated
  USING (true);


-- ────────────────────────────────────────────────────────────
-- 3. SITE SETTINGS (key-value store for site configuration)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read site settings (needed to load images on frontend)
CREATE POLICY "Anyone can read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can modify settings
CREATE POLICY "Authenticated users can upsert settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('company_name', '"Connexus Medical Supplies"'),
  ('company_phone', '"+1 (512) 872-1111"'),
  ('company_email', '"info@connexusmedsupplies.com"'),
  ('company_address', '{"street": "30 N Gould St Suite R", "city": "Sheridan", "state": "WY", "zip": "82801"}'),
  ('business_hours', '{"weekday": "Monday - Friday: 9:00 AM - 6:00 PM", "saturday": "Saturday: 10:00 AM - 4:00 PM", "emergency": "Emergency: 24/7 Available"}')
ON CONFLICT (key) DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- 4. NEWSLETTER SUBSCRIBERS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage subscribers"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ────────────────────────────────────────────────────────────
-- 5. AUTO-UPDATE updated_at TRIGGER
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ────────────────────────────────────────────────────────────
-- 6. STORAGE BUCKET FOR SITE IMAGES
-- ────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  5242880,  -- 5MB max per file
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/gif'];

-- Anyone can VIEW images (they're public on the website)
CREATE POLICY "Public read access for site images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-images');

-- Only anon + authenticated can upload (admin page uses anon key)
CREATE POLICY "Allow image uploads to site-images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Allow updating (replacing) images
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


-- ────────────────────────────────────────────────────────────
-- 7. HELPFUL INDEXES
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);


-- ════════════════════════════════════════════════════════════
-- DONE! Your Supabase is fully configured for Connexus.
--
-- Tables created:
--   • contact_submissions  (contact form data)
--   • quote_requests       (quote/product inquiry data)
--   • site_settings        (key-value site config)
--   • newsletter_subscribers (email list)
--
-- Storage created:
--   • site-images bucket   (public, 5MB limit, image types only)
--
-- Security:
--   • Public users can: submit forms, view images, read settings
--   • Admin users can: read/update/delete everything
--   • All storage ops allowed (admin panel uses anon key)
-- ════════════════════════════════════════════════════════════
