-- =====================================================================================
-- INCHARA HOLIDAYS — MASTER DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Milestone 7: Supabase PostgreSQL Architecture
-- =====================================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM (
    'new',
    'contacted',
    'in_progress',
    'proposal_sent',
    'confirmed',
    'closed',
    'cancelled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE staff_role AS ENUM (
    'super_admin',
    'operations_manager',
    'travel_consultant'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  preferred_language VARCHAR(5) NOT NULL DEFAULT 'en',
  preferred_contact_method VARCHAR(20) NOT NULL DEFAULT 'whatsapp',
  service_category VARCHAR(50) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  service_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  additional_requirements TEXT,
  status inquiry_status NOT NULL DEFAULT 'new',
  assigned_staff TEXT,
  internal_notes TEXT,
  next_followup_date DATE,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance & query speed
CREATE INDEX IF NOT EXISTS idx_inquiries_ref ON inquiries(reference_number);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_category ON inquiries(service_category);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_followup ON inquiries(next_followup_date);

-- 4. INQUIRY AUDIT EVENTS TABLE
CREATE TABLE IF NOT EXISTS inquiry_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  old_status inquiry_status,
  new_status inquiry_status,
  notes TEXT,
  actor_name TEXT NOT NULL DEFAULT 'System',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiry_events_inquiry_id ON inquiry_events(inquiry_id);

-- 5. ADMIN PROFILES TABLE (Linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role staff_role NOT NULL DEFAULT 'travel_consultant',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. PACKAGES TABLE (Curated holiday packages catalogue)
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_kn TEXT NOT NULL,
  duration_days INT NOT NULL,
  duration_nights INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  destination_id VARCHAR(50),
  itinerary JSONB NOT NULL DEFAULT '[]'::jsonb,
  inclusions TEXT[] NOT NULL DEFAULT '{}',
  exclusions TEXT[] NOT NULL DEFAULT '{}',
  highlights_en TEXT[] NOT NULL DEFAULT '{}',
  highlights_kn TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_packages_slug ON packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category);

-- 7. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_inquiries_timestamp ON inquiries;
CREATE TRIGGER trigger_update_inquiries_timestamp
BEFORE UPDATE ON inquiries
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trigger_update_packages_timestamp ON packages;
CREATE TRIGGER trigger_update_packages_timestamp
BEFORE UPDATE ON packages
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- =====================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================================

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- 1. Inquiries RLS:
-- Anyone (anonymous public visitor) can submit an inquiry:
CREATE POLICY "Public can insert inquiries"
ON inquiries FOR INSERT
TO public
WITH CHECK (true);

-- Authenticated staff can view all inquiries:
CREATE POLICY "Staff can view inquiries"
ON inquiries FOR SELECT
TO authenticated
USING (true);

-- Authenticated staff can update inquiries (e.g. status, notes, follow-up date):
CREATE POLICY "Staff can update inquiries"
ON inquiries FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 2. Inquiry Events RLS:
CREATE POLICY "Staff can view audit events"
ON inquiry_events FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Staff can insert audit events"
ON inquiry_events FOR INSERT
TO authenticated
WITH CHECK (true);

-- 3. Packages RLS:
-- Public can view active packages:
CREATE POLICY "Public can view active packages"
ON packages FOR SELECT
TO public
USING (is_active = true);

-- Staff can manage packages:
CREATE POLICY "Staff can manage packages"
ON packages FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. Admin Profiles RLS:
CREATE POLICY "Staff can view admin profiles"
ON admin_profiles FOR SELECT
TO authenticated
USING (true);
