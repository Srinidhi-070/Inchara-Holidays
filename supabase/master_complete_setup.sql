-- =====================================================================================
-- INCHARA HOLIDAYS — COMPLETE MASTER DATABASE SCHEMA, SEED & ROW LEVEL SECURITY
-- Platform: Supabase PostgreSQL (Production Ready)
-- Target: Inchara Holidays Solo Operator Business Architecture (Owner: Ravindra S)
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

-- 3. SERVICE CATEGORIES TABLE (The 6 Core Verticals)
CREATE TABLE IF NOT EXISTS service_categories (
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

-- 4. SERVICES (SUB-SERVICES) TABLE
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(80) PRIMARY KEY,
  category_id VARCHAR(50) NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
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

-- 5. INQUIRIES MASTER TABLE
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

CREATE INDEX IF NOT EXISTS idx_inquiries_ref ON inquiries(reference_number);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_category ON inquiries(service_category);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON inquiries(phone);

-- 6. INQUIRY AUDIT EVENTS TABLE
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

-- 7. NOTIFICATION LOGS TABLE (Automated Multi-Channel Audit)
CREATE TABLE IF NOT EXISTS notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  inquiry_reference TEXT,
  customer_name TEXT,
  channel VARCHAR(20) NOT NULL, -- 'whatsapp' or 'email'
  recipient VARCHAR(200) NOT NULL,
  template_name TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'sent', 'delivered', 'failed', 'retry_scheduled'
  provider_message_id TEXT,
  provider_response JSONB,
  error_message TEXT,
  attempt_count INT DEFAULT 1,
  last_attempt_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notification_logs_inquiry_id ON notification_logs(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_notification_logs_status ON notification_logs(status);
CREATE INDEX IF NOT EXISTS idx_notification_logs_channel ON notification_logs(channel);
CREATE INDEX IF NOT EXISTS idx_notification_logs_created ON notification_logs(created_at);

-- 8. ADMIN PROFILES TABLE
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role staff_role NOT NULL DEFAULT 'super_admin',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. PACKAGES TABLE (Curated holiday packages catalogue)
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

-- 10. CUSTOMERS DIRECTORY TABLE
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  city TEXT,
  preferred_language VARCHAR(5) NOT NULL DEFAULT 'en',
  notes TEXT,
  total_inquiries INT NOT NULL DEFAULT 1,
  total_bookings INT NOT NULL DEFAULT 0,
  total_spend NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- 11. FORMAL QUOTATIONS & BREAKDOWNS
CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_number TEXT NOT NULL UNIQUE,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  destination TEXT NOT NULL,
  travel_dates TEXT,
  passenger_count INT NOT NULL DEFAULT 1,
  service_category VARCHAR(50) NOT NULL DEFAULT 'holidays',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_rate NUMERIC NOT NULL DEFAULT 5.0,
  tax_amount NUMERIC NOT NULL DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  payment_schedule TEXT,
  bank_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, sent, accepted, expired
  valid_until DATE,
  issued_by TEXT NOT NULL DEFAULT 'Ravindra S (Owner)',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotations_number ON quotations(quotation_number);
CREATE INDEX IF NOT EXISTS idx_quotations_inquiry_id ON quotations(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_quotations_customer_phone ON quotations(customer_phone);

CREATE TABLE IF NOT EXISTS quotation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id UUID NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity_unit TEXT NOT NULL,
  rate NUMERIC NOT NULL DEFAULT 0,
  amount NUMERIC NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotation_items_qid ON quotation_items(quotation_id);

-- 12. PAYMENTS & OFFICIAL MONEY RECEIPTS
CREATE TABLE IF NOT EXISTS receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number TEXT NOT NULL UNIQUE,
  quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  tour_particulars TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  payment_type VARCHAR(50) NOT NULL DEFAULT 'advance_token',
  payment_mode VARCHAR(50) NOT NULL DEFAULT 'upi',
  transaction_reference TEXT,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  received_by TEXT NOT NULL DEFAULT 'Ravindra S (Owner)',
  balance_due NUMERIC NOT NULL DEFAULT 0,
  bank_account TEXT NOT NULL DEFAULT 'Canara Bank A/C 110023456789',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_receipts_number ON receipts(receipt_number);
CREATE INDEX IF NOT EXISTS idx_receipts_phone ON receipts(customer_phone);

-- 13. CONFIRMED BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT NOT NULL UNIQUE,
  quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  destination TEXT NOT NULL,
  travel_start_date DATE NOT NULL,
  travel_end_date DATE NOT NULL,
  passenger_count INT NOT NULL DEFAULT 1,
  assigned_vehicle TEXT,
  driver_name TEXT,
  driver_phone TEXT,
  hotel_details TEXT,
  total_cost NUMERIC NOT NULL DEFAULT 0,
  advance_paid NUMERIC NOT NULL DEFAULT 0,
  balance_pending NUMERIC NOT NULL DEFAULT 0,
  pure_veg_guarantee BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(customer_phone);

-- 14. BUSINESS SETTINGS TABLE (Single-Row Configuration for Solo Operator)
CREATE TABLE IF NOT EXISTS business_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  business_name TEXT NOT NULL DEFAULT 'Inchara Holidays',
  business_name_kn TEXT NOT NULL DEFAULT 'ಇಂಚರ ಹಾಲಿಡೇಸ್',
  tagline TEXT NOT NULL DEFAULT 'Bespoke Travel, Chauffeur Mobility & Pure Veg Hospitality',
  tagline_kn TEXT NOT NULL DEFAULT 'ವಿಶಿಷ್ಟ ಪ್ರವಾಸಗಳು, ವಿಶ್ವಾಸಾರ್ಹ ಸಾರಿಗೆ & ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಆತಿಥ್ಯ',
  owner_name TEXT NOT NULL DEFAULT 'Ravindra S',
  phone_primary TEXT NOT NULL DEFAULT '+91 90361 74880',
  phone_raw TEXT NOT NULL DEFAULT '919036174880',
  email_primary TEXT NOT NULL DEFAULT 'info@incharaholidays.com',
  email_official TEXT NOT NULL DEFAULT 'contact@incharaholidays.com',
  registered_address_en TEXT NOT NULL DEFAULT 'INCHARA HOLIDAYS, 7/1, 6th Cross Rd, Swimming Pool Extension, HN Layout, Malleshwaram, Bengaluru, Karnataka 560003',
  registered_address_kn TEXT NOT NULL DEFAULT 'ಇಂಚರ ಹಾಲಿಡೇಸ್, ೭/೧, ೬ನೇ ಕ್ರಾಸ್ ರಸ್ತೆ, ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್ ಬಡಾವಣೆ, ಎಚ್.ಎನ್. ಬಡಾವಣೆ, ಮಲ್ಲೇಶ್ವರಂ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ ೫೬೦೦೦೩',
  reg_number TEXT NOT NULL DEFAULT '',
  gstin TEXT NOT NULL DEFAULT '29AABCU9603R1ZM',
  pan TEXT NOT NULL DEFAULT 'AABCU9603R',
  bank_name TEXT NOT NULL DEFAULT 'Canara Bank',
  bank_account_number TEXT NOT NULL DEFAULT '110023456789',
  bank_ifsc TEXT NOT NULL DEFAULT 'CNRB0001234',
  bank_branch TEXT NOT NULL DEFAULT 'Malleshwaram Branch, Bengaluru',
  gst_rate_percent NUMERIC NOT NULL DEFAULT 5.0,
  is_verified_by_owner BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO business_settings (id)
VALUES ('current')
ON CONFLICT (id) DO NOTHING;

-- 15. FAQS CONTENT TABLE
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,
  question_en TEXT NOT NULL,
  question_kn TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_kn TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. PROMOTIONS & SEASONAL BANNERS TABLE
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_en TEXT NOT NULL,
  badge_kn TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_kn TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_kn TEXT NOT NULL,
  discount_code TEXT,
  valid_until DATE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
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

DROP TRIGGER IF EXISTS trigger_update_customers_timestamp ON customers;
CREATE TRIGGER trigger_update_customers_timestamp
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trigger_update_quotations_timestamp ON quotations;
CREATE TRIGGER trigger_update_quotations_timestamp
BEFORE UPDATE ON quotations
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trigger_update_receipts_timestamp ON receipts;
CREATE TRIGGER trigger_update_receipts_timestamp
BEFORE UPDATE ON receipts
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trigger_update_bookings_timestamp ON bookings;
CREATE TRIGGER trigger_update_bookings_timestamp
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- =====================================================================================
-- 18. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================================

ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES:
CREATE POLICY "Public read active service_categories" ON service_categories FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public read active services" ON services FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public read active packages" ON packages FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public read business settings" ON business_settings FOR SELECT TO public USING (true);
CREATE POLICY "Public read active faqs" ON faqs FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public read active promotions" ON promotions FOR SELECT TO public USING (is_active = true);

-- CUSTOMER ENQUIRY INSERT (Public website visitors can submit):
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT TO public WITH CHECK (true);

-- SERVICE ROLE FULL ACCESS (Backend serverless functions with service_role key):
CREATE POLICY "Service role full access inquiries" ON inquiries FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access inquiry_events" ON inquiry_events FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access notification_logs" ON notification_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access service_categories" ON service_categories FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access services" ON services FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access packages" ON packages FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access customers" ON customers FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access quotations" ON quotations FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access quotation_items" ON quotation_items FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access receipts" ON receipts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access bookings" ON bookings FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access business_settings" ON business_settings FOR ALL TO service_role USING (true) WITH CHECK (true);

-- AUTHENTICATED STAFF / OWNER POLICIES:
CREATE POLICY "Staff read admin_profiles" ON admin_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff all inquiries" ON inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all inquiry_events" ON inquiry_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all notification_logs" ON notification_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all packages" ON packages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all customers" ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all quotations" ON quotations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all quotation_items" ON quotation_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all receipts" ON receipts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all bookings" ON bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all business_settings" ON business_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all promotions" ON promotions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all service_categories" ON service_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff all services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================================
-- 19. INITIAL SEED DATA FOR 6 SERVICE CATEGORIES
-- =====================================================================================

INSERT INTO service_categories 
(id, title_kn, title_en, tagline_kn, tagline_en, description_kn, description_en, badge_kn, badge_en, icon_name, image_url, display_order, is_active)
VALUES
('holidays', 'ರಜಾದಿನದ ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ಗಳು', 'Holiday Packages', 'ವೈಯಕ್ತಿಕ ಹಾಗೂ ಆಪ್ತ ರಜಾದಿನಗಳ ಅನುಭವ', 'Bespoke Curated & Pre-Organised Journeys', 'ದೇಶೀಯ ಪ್ರವಾಸಗಳು, ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪಯಣಗಳು, ಪೂರ್ವ ನಿಯೋಜಿತ ಹಾಗೂ ನಿಮ್ಮ ಆಸಕ್ತಿಗೆ ತಕ್ಕಂತೆ ರೂಪಿಸಿದ ವೈಯಕ್ತಿಕ ರಜಾದಿನಗಳು.', 'Tailored domestic escapes, world-class international getaways, ready-to-book itineraries, and customized vacations for families and groups.', 'ಹೆರಿಟೇಜ್ & ಪ್ರಕೃತಿ', 'Heritage & Leisure', 'Compass', '/images/hero_western_ghats_1791795450720.jpg', 1, true),
('educational', 'ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಕೈಗಾರಿಕಾ ಪ್ರವಾಸಗಳು', 'Educational & Industrial Tours', 'ಕಲಿಕೆ, ಸಂಶೋಧನೆ ಮತ್ತು ನಿಷ್ಠ ಸುರಕ್ಷತೆ', 'Curriculum-Aligned Learning Expeditions & Industrial Visits', 'ಶಾಲೆ, ಕಾಲೇಜು ಮತ್ತು ವಿಶ್ವವಿದ್ಯಾಲಯಗಳಿಗಾಗಿ ಅತ್ಯುನ್ನತ ಸುರಕ್ಷತಾ ಮಾನದಂಡಗಳು, ಶಿಸ್ತು ಮತ್ತು ಕೈಗಾರಿಕಾ ಸಂಪರ್ಕಗಳೊಂದಿಗೆ ಆಯೋಜಿತ ಪ್ರವಾಸಗಳು.', 'Structured institutional travel, technical industrial exposures, historical study trips, and safety-audited school expeditions.', 'ಸುರಕ್ಷತೆ & ಜ್ಞಾನ', 'Safety & Learning', 'GraduationCap', '/images/school_trip_safety.jpg', 2, true),
('corporate', 'ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಈವೆಂಟ್ ಪ್ರವಾಸಗಳು', 'Corporate & Event Tours', 'ಉದ್ದೇಶಪೂರ್ವಕ ಸಭೆಗಳು ಮತ್ತು ಸ್ಮರಣೀಯ ಆಫ್‌ಸೈಟ್‌ಗಳು', 'Gather with Purpose, Reconnect & Celebrate', 'ಉದ್ಯೋಗಿಗಳ ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್, ಲೀಡರ್‌ಶಿಪ್ ರಿಟ್ರೀಟ್‌ಗಳು, ವಾರ್ಷಿಕ ಸಮ್ಮೇಳನಗಳು ಹಾಗೂ ಆಯೋಜಿತ ಕಾರ್ಯಕ್ರಮಗಳ ನಿಖರ ನಿರ್ವಹಣೆ.', 'High-impact team offsites, executive leadership retreats, corporate conferences, and end-to-end event management.', 'ವೃತ್ತಿಪರತೆ & ಆತಿಥ್ಯ', 'Professional & Seamless', 'Briefcase', '/images/hero_western_ghats_1791795450720.jpg', 3, true),
('transport', 'ಸಾರಿಗೆ ಮತ್ತು ಟಿಕೆಟ್ ಬುಕಿಂಗ್ ನೆರವು', 'Transportation & Bookings', 'ಸುರಕ್ಷಿತ ವಾಹನಗಳು ಮತ್ತು ನಿರಾತಂಕ ಪ್ರಯಾಣ ನೆರವು', 'Sanitized Fleets, Experienced Chauffeurs & Travel Logistics', 'ಕಾರು ಬಾಡಿಗೆ, ಟೆಂಪೋ ಟ್ರಾವೆಲರ್, ಮಿನಿ ಬಸ್ಸುಗಳು, ರೈಲು ಮತ್ತು ಬಸ್ಸು ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆಯ ವಿಶ್ವಾಸಾರ್ಹ ಸಹಾಯ.', 'Chauffeur-driven car rentals, tourist buses and coaches, plus dedicated assistance for train and bus seat reservations.', 'ಸ್ವಚ್ಛ & ವಿಶ್ವಾಸಾರ್ಹ', 'Safe & Clean Fleet', 'Bus', '/images/hero_western_ghats_1791795450720.jpg', 4, true),
('visa_passport', 'ವೀಸಾ ಮತ್ತು ಪಾಸ್‌ಪೋರ್ಟ್ ನೆರವು', 'Visa & Passport Assistance', 'ನಿಖರ ದಾಖಲೆಗಳು, ನಂಬಿಕಾರ್ಹ ಮಾರ್ಗದರ್ಶನ', 'Expert Guidance, Hassle-Free International Travel Documentation', 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸಗಳಿಗೆ ಪ್ರವಾಸಿ ವೀಸಾ ಅರ್ಜಿ ಸಮಾಲೋಚನೆ, ಪಾಸ್‌ಪೋರ್ಟ್ ನವೀಕರಣ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ.', 'Professional advisory and assistance for tourist visas, new passport applications, renewals, and travel documentation.', 'ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶನ', 'Document Advisory', 'FileCheck', '/images/hero_western_ghats_1791795450720.jpg', 5, true),
('catering', 'ಕ್ಯಾಟರಿಂಗ್ ಮತ್ತು ಆತಿಥ್ಯ ಸೇವೆಗಳು', 'Catering & Hospitality', '೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಸಾಂಪ್ರದಾಯಿಕ ಪಂಕ್ತಿ ಭೋಜನ', '100% Pure Vegetarian Culinary Artistry & Hospitality', 'ದಕ್ಷಿಣ ಹಾಗೂ ಉತ್ತರ ಭಾರತೀಯ ಸಾಂಪ್ರದಾಯಿಕ ಸಸ್ಯಾಹಾರಿ ಅಡುಗೆ, ಪ್ರವಾಸದ ಮಾರ್ಗಮಧ್ಯೆ ಬಾಳೆ ಎಲೆ ಊಟ ಹಾಗೂ ಸಮಾರಂಭಗಳ ಭೋಜನ ವ್ಯವಸ್ಥೆ.', 'Authentic pure vegetarian feasts, South & North Indian culinary traditions, on-tour dining arrangements, and event hospitality.', 'ಅಪ್ಪಟ ಸಸ್ಯಾಹಾರಿ', '100% Pure Veg', 'Utensils', '/images/pure_veg_travel_meal.jpg', 6, true)
ON CONFLICT (id) DO UPDATE SET
title_kn = EXCLUDED.title_kn,
title_en = EXCLUDED.title_en,
tagline_kn = EXCLUDED.tagline_kn,
tagline_en = EXCLUDED.tagline_en,
description_kn = EXCLUDED.description_kn,
description_en = EXCLUDED.description_en,
badge_kn = EXCLUDED.badge_kn,
badge_en = EXCLUDED.badge_en,
image_url = EXCLUDED.image_url,
display_order = EXCLUDED.display_order;

-- Insert default admin profile for Ravindra S
INSERT INTO admin_profiles (email, full_name, role, phone, is_active)
VALUES ('info@incharaholidays.com', 'Ravindra S (Owner & Lead Curator)', 'super_admin', '+91 90361 74880', true)
ON CONFLICT (email) DO NOTHING;
