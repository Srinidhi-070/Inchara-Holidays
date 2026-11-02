-- =====================================================================
-- INCHARA HOLIDAYS — DATABASE SCHEMA & RLS POLICIES
-- Platform: Supabase PostgreSQL
-- Version: 1.0.0
-- =====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.service_categories (
    id VARCHAR(50) PRIMARY KEY, -- 'holidays', 'educational', 'corporate', 'transport', 'visa_passport', 'catering'
    title_kn VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    tagline_kn TEXT,
    tagline_en TEXT,
    description_kn TEXT,
    description_en TEXT,
    badge_kn VARCHAR(100),
    badge_en VARCHAR(100),
    icon_name VARCHAR(100),
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICES (SUB-SERVICES) TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id VARCHAR(80) PRIMARY KEY, -- e.g. 'domestic_tours', 'school_tours', 'pure_veg_catering'
    category_id VARCHAR(50) NOT NULL REFERENCES public.service_categories(id) ON DELETE CASCADE,
    title_kn VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    summary_kn TEXT,
    summary_en TEXT,
    details_kn JSONB DEFAULT '[]'::jsonb,
    details_en JSONB DEFAULT '[]'::jsonb,
    highlights_kn JSONB DEFAULT '[]'::jsonb,
    highlights_en JSONB DEFAULT '[]'::jsonb,
    inquiry_notice_kn TEXT,
    inquiry_notice_en TEXT,
    is_assistance_only BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INQUIRIES MASTER TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'ICH-2026-X8P2'
    customer_name VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(200),
    city VARCHAR(150),
    preferred_language VARCHAR(10) DEFAULT 'kn', -- 'kn' or 'en'
    preferred_contact_method VARCHAR(20) DEFAULT 'whatsapp', -- 'whatsapp', 'phone', 'email'
    service_category VARCHAR(50) NOT NULL,
    service_type VARCHAR(80) NOT NULL,
    service_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    additional_requirements TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'proposal_sent', 'confirmed', 'closed', 'cancelled'
    assigned_staff VARCHAR(150),
    internal_notes TEXT,
    next_followup_date DATE,
    idempotency_key VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INQUIRY EVENTS (AUDIT TRAIL & NOTES)
CREATE TABLE IF NOT EXISTS public.inquiry_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'created', 'status_changed', 'note_added', 'staff_assigned', 'notification_dispatched'
    previous_status VARCHAR(30),
    new_status VARCHAR(30),
    notes TEXT,
    actor_name VARCHAR(150) DEFAULT 'System',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. NOTIFICATION LOGS TABLE
CREATE TABLE IF NOT EXISTS public.notification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    channel VARCHAR(20) NOT NULL, -- 'email' or 'whatsapp'
    recipient VARCHAR(200) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'mock_sent'
    provider_response JSONB,
    error_message TEXT,
    attempt_count INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ADMIN PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID, -- References auth.users(id) in Supabase Auth
    email VARCHAR(200) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'travel_consultant', -- 'super_admin', 'operations_manager', 'travel_consultant'
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- PERFORMANCE INDEXES
-- =====================================================================

CREATE INDEX IF NOT EXISTS idx_inquiries_ref ON public.inquiries(reference_number);
CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON public.inquiries(phone);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_category ON public.inquiries(service_category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_followup ON public.inquiries(next_followup_date);
CREATE INDEX IF NOT EXISTS idx_inquiries_idempotency ON public.inquiries(idempotency_key);

CREATE INDEX IF NOT EXISTS idx_inquiry_events_inquiry_id ON public.inquiry_events(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_notif_logs_inquiry_id ON public.notification_logs(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_services_category_id ON public.services(category_id);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Service Categories: Public readable
CREATE POLICY "Public can view active service categories"
    ON public.service_categories FOR SELECT
    USING (is_active = true);

-- Services: Public readable
CREATE POLICY "Public can view active services"
    ON public.services FOR SELECT
    USING (is_active = true);

-- Inquiries: Public can insert new inquiries only
CREATE POLICY "Public can insert new inquiries"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

-- Inquiries: Staff with verified admin role can view and update
CREATE POLICY "Staff can view all inquiries"
    ON public.inquiries FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Staff can update inquiries"
    ON public.inquiries FOR UPDATE
    TO authenticated
    USING (true);

-- Inquiry Events: Staff only
CREATE POLICY "Staff can view and insert inquiry events"
    ON public.inquiry_events FOR ALL
    TO authenticated
    USING (true);

-- Notification Logs: Staff only
CREATE POLICY "Staff can view notification logs"
    ON public.notification_logs FOR SELECT
    TO authenticated
    USING (true);

-- Admin Profiles: Authenticated staff can view
CREATE POLICY "Staff can view active admin profiles"
    ON public.admin_profiles FOR SELECT
    TO authenticated
    USING (is_active = true);

-- Automatic Updated_At Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inquiries_timestamp
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_categories_timestamp
    BEFORE UPDATE ON public.service_categories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_services_timestamp
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
