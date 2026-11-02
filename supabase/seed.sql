-- =====================================================================
-- INCHARA HOLIDAYS — INITIAL SEED DATA
-- Populate 6 core service categories and sub-services
-- =====================================================================

INSERT INTO public.service_categories 
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

-- Default super admin profile
INSERT INTO public.admin_profiles (email, full_name, role, phone, is_active)
VALUES 
('admin@incharaholidays.com', 'Inchara Holidays Administrator', 'super_admin', '+91 94480 00000', true)
ON CONFLICT (email) DO NOTHING;
