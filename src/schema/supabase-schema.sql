-- Supabase Database Schema (Normalized)
-- Copy and paste this entire file into your Supabase SQL Editor and run it
-- This will create all required tables for the Beauty Bar website

-- Service categories table (one row per category)
-- Must be created before services table due to foreign key reference
CREATE TABLE IF NOT EXISTS service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table (one row per service)
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  price TEXT NOT NULL,
  duration TEXT NOT NULL,
  deposit TEXT,
  category_id TEXT NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  image_url TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  aftercare JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  -- SEO fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table (one row per testimonial)
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date TEXT NOT NULL,
  -- SEO fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ categories table (one row per category)
CREATE TABLE IF NOT EXISTS faq_categories (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL UNIQUE,
  -- SEO fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ items table (one row per FAQ question)
CREATE TABLE IF NOT EXISTS faq_items (
  id TEXT PRIMARY KEY,
  faq_category_id INTEGER NOT NULL REFERENCES faq_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio categories table (one row per category)
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio table (one row per portfolio item)
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES portfolio_categories(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  alt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  -- SEO fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service highlights table (one row per highlight)
CREATE TABLE IF NOT EXISTS service_highlights (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_service ON testimonials(service);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(faq_category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_category_id ON portfolio(category_id);
CREATE INDEX IF NOT EXISTS idx_service_highlights_category_id ON service_highlights(category_id);

-- Row Level Security (RLS) is disabled for now
-- You can enable RLS and add policies later if needed
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
