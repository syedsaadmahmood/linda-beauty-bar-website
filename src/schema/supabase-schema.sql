-- Supabase Database Schema (Normalized)
-- Copy and paste this entire file into your Supabase SQL Editor and run it
-- This will create all required tables for the Beauty Bar website

-- Service categories table (one row per category)
-- Must be created before services table due to foreign key reference
CREATE TABLE IF NOT EXISTS service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon_name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
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
  booking_link TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  aftercare JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
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
  sort_order INTEGER DEFAULT 0,
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
  sort_order INTEGER DEFAULT 0,
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
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio categories table (one row per category)
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0,
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
  sort_order INTEGER DEFAULT 0,
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
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(category_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_service ON testimonials(service);
CREATE INDEX IF NOT EXISTS idx_testimonials_sort_order ON testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(faq_category_id);
CREATE INDEX IF NOT EXISTS idx_faq_items_sort_order ON faq_items(faq_category_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_category_id ON portfolio(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort_order ON portfolio(category_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_service_highlights_category_id ON service_highlights(category_id);
CREATE INDEX IF NOT EXISTS idx_service_highlights_sort_order ON service_highlights(sort_order);
CREATE INDEX IF NOT EXISTS idx_service_categories_sort_order ON service_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_faq_categories_sort_order ON faq_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_sort_order ON portfolio_categories(sort_order);

-- Row Level Security (RLS) is disabled for now
-- You can enable RLS and add policies later if needed
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Migration: Add sort_order columns to existing tables (if they don't exist)
-- Run these ALTER TABLE statements if you're updating an existing database

-- Add sort_order to service_categories
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add sort_order to services
ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add sort_order to testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add sort_order to faq_categories
ALTER TABLE faq_categories ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add sort_order to faq_items
ALTER TABLE faq_items ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add sort_order to portfolio_categories
ALTER TABLE portfolio_categories ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add sort_order to portfolio
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Migrate display_order to sort_order for service_highlights
-- First add sort_order if it doesn't exist
ALTER TABLE service_highlights ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Copy display_order values to sort_order (if display_order exists)
UPDATE service_highlights 
SET sort_order = COALESCE(display_order, 0)
WHERE sort_order = 0 AND display_order IS NOT NULL;

-- Drop display_order column after migration (uncomment when ready)
-- ALTER TABLE service_highlights DROP COLUMN IF EXISTS display_order;

-- Initialize sort_order for existing records based on current ordering
-- Services: Order by title within each category
UPDATE services s1
SET sort_order = (
  SELECT COUNT(*) 
  FROM services s2 
  WHERE s2.category_id = s1.category_id 
    AND (s2.title < s1.title OR (s2.title = s1.title AND s2.id < s1.id))
);

-- Service categories: Order by name
UPDATE service_categories sc1
SET sort_order = (
  SELECT COUNT(*) 
  FROM service_categories sc2 
  WHERE sc2.name < sc1.name OR (sc2.name = sc1.name AND sc2.id < sc1.id)
);

-- Testimonials: Order by date descending (newest first)
UPDATE testimonials t1
SET sort_order = (
  SELECT COUNT(*) 
  FROM testimonials t2 
  WHERE t2.date > t1.date OR (t2.date = t1.date AND t2.id < t1.id)
);

-- FAQ categories: Order by category name
UPDATE faq_categories fc1
SET sort_order = (
  SELECT COUNT(*) 
  FROM faq_categories fc2 
  WHERE fc2.category < fc1.category OR (fc2.category = fc1.category AND fc2.id < fc1.id)
);

-- FAQ items: Order by id within each category (maintains current order)
UPDATE faq_items fi1
SET sort_order = (
  SELECT COUNT(*) 
  FROM faq_items fi2 
  WHERE fi2.faq_category_id = fi1.faq_category_id 
    AND (fi2.id < fi1.id)
);

-- Portfolio categories: Order by name
UPDATE portfolio_categories pc1
SET sort_order = (
  SELECT COUNT(*) 
  FROM portfolio_categories pc2 
  WHERE pc2.name < pc1.name OR (pc2.name = pc1.name AND pc2.id < pc1.id)
);

-- Portfolio items: Order by id within each category (maintains current order)
UPDATE portfolio p1
SET sort_order = (
  SELECT COUNT(*) 
  FROM portfolio p2 
  WHERE p2.category_id = p1.category_id 
    AND (p2.id < p1.id)
);
