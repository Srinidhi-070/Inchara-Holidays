-- =====================================================================================
-- INCHARA HOLIDAYS — COMPLETE BUSINESS OPERATING SYSTEM SCHEMA & RLS
-- Migration: 20261110000000_inchara_complete_schema.sql
-- Solo Operator Architecture: Owner Ravindra S (Owner & Principal Curator)
-- =====================================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOMERS DIRECTORY TABLE
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

-- 3. FORMAL QUOTATIONS & BREAKDOWNS
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

-- 4. PAYMENTS & OFFICIAL MONEY RECEIPTS
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
  payment_type VARCHAR(50) NOT NULL DEFAULT 'advance_token', -- advance_30, interim_50, final_settlement, full
  payment_mode VARCHAR(50) NOT NULL DEFAULT 'upi', -- upi, neft, imps, cash, card
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
CREATE INDEX IF NOT EXISTS idx_receipts_quotation ON receipts(quotation_id);

-- 5. CONFIRMED BOOKINGS TABLE
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
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed', -- confirmed, ongoing, completed, cancelled
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(travel_start_date, travel_end_date);

-- 6. BUSINESS SETTINGS TABLE (Single-Row Configuration for Solo Operator)
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
  is_verified_by_owner BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default single-row settings if not present
INSERT INTO business_settings (id)
VALUES ('current')
ON CONFLICT (id) DO NOTHING;

-- 7. FAQS CONTENT TABLE
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

-- 8. PROMOTIONS & SEASONAL BANNERS TABLE
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

-- 9. NOTIFICATION LOGS & AUDIT DISPATCH TABLE
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

-- 9. TRIGGERS FOR AUTO-UPDATING TIMESTAMPS
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

DROP TRIGGER IF EXISTS trigger_update_settings_timestamp ON business_settings;
CREATE TRIGGER trigger_update_settings_timestamp
BEFORE UPDATE ON business_settings
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- =====================================================================================
-- ROW LEVEL SECURITY (RLS) FOR NEW TABLES
-- =====================================================================================

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Public can read business settings, faqs and promotions:
CREATE POLICY "Public can view business settings"
ON business_settings FOR SELECT
TO public
USING (true);

CREATE POLICY "Public can view active faqs"
ON faqs FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Public can view active promotions"
ON promotions FOR SELECT
TO public
USING (is_active = true);

-- Owner / Authenticated users have full administrative access:
CREATE POLICY "Owner full access on customers"
ON customers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on quotations"
ON quotations FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on quotation_items"
ON quotation_items FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on receipts"
ON receipts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on bookings"
ON bookings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on business_settings"
ON business_settings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on faqs"
ON faqs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on promotions"
ON promotions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Owner full access on notification_logs"
ON notification_logs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access on notification_logs"
ON notification_logs FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
