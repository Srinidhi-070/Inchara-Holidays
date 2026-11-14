/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Inchara Holidays (ಇಂಚರ ಹಾಲಿಡೇಸ್) - Central Brand & Contact Configuration
 * Single source of truth for business contact credentials, verified channels, and company metadata.
 */

export interface BrandConfig {
  nameKn: string;
  nameEn: string;
  ownerNameEn: string;
  ownerNameKn: string;
  taglineKn: string;
  taglineEn: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  email: string;
  emailStatusEn: string;
  emailStatusKn: string;
  notificationEmail: string;
  addressKn: string;
  addressEn: string;
  mapsUrl: string;
  hoursKn: string;
  hoursEn: string;
  website: string;
  regNumber: string;
}

const getEnv = (key: string, fallback: string): string => {
  try {
    const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
    if (metaEnv && metaEnv[key]) {
      return metaEnv[key];
    }
  } catch {
    // Ignore in non-Vite environments
  }
  return fallback;
};

export const brandConfig: BrandConfig = {
  nameKn: 'ಇಂಚರ ಹಾಲಿಡೇಸ್',
  nameEn: 'Inchara Holidays',
  ownerNameEn: 'Ravindra S',
  ownerNameKn: 'ರವೀಂದ್ರ ಎಸ್',
  taglineKn: 'ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ, ಸಾಮಾನ್ಯತೆಯನ್ನು ಮೀರಿ · ಕರಾವಳಿ, ಮಲೆನಾಡು ಹಾಗೂ ಕರ್ನಾಟಕದ ಪರಂಪರೆ',
  taglineEn: 'Your Trusted Travel Partner · Heritage, Hospitality & Mindful Journeys',

  // Real business contacts (Malleshwaram, Bengaluru desk)
  phoneDisplay: getEnv('VITE_CONTACT_PHONE_DISPLAY', '+91 90361 74880'),
  phoneRaw: getEnv('VITE_CONTACT_PHONE', '919036174880'),

  whatsappDisplay: getEnv('VITE_WHATSAPP_DISPLAY', '+91 90361 74880'),
  whatsappRaw: getEnv('VITE_WHATSAPP_NUMBER', '919036174880'),

  email: getEnv('VITE_CONTACT_EMAIL', 'incharaholidays@gmail.com'),
  emailStatusEn: 'incharaholidays@gmail.com',
  emailStatusKn: 'incharaholidays@gmail.com',
  notificationEmail: getEnv('VITE_NOTIFICATIONS_EMAIL', 'incharaholidays@gmail.com'),

  addressKn: 'ಇಂಚರ ಹಾಲಿಡೇಸ್, ೭/೧, ೬ನೇ ಕ್ರಾಸ್ ರಸ್ತೆ, ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್ ಬಡಾವಣೆ, ಎಚ್.ಎನ್. ಬಡಾವಣೆ, ಮಲ್ಲೇಶ್ವರಂ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ ೫೬೦೦೦೩',
  addressEn: 'INCHARA HOLIDAYS, 7/1, 6th Cross Rd, Swimming Pool Extension, HN Layout, Malleshwaram, Bengaluru, Karnataka 560003',
  mapsUrl: 'https://maps.app.goo.gl/r9YGiWEQwDKTtc9e7',

  hoursKn: 'ಸೋಮವಾರ - ಭಾನುವಾರ: ಮುಂಜಾನೆ ೮:೦೦ ರಿಂದ ರಾತ್ರಿ ೯:೩೦ ವರೆಗೆ',
  hoursEn: 'Monday - Sunday: 8:00 AM - 9:30 PM IST',

  website: getEnv('VITE_SITE_URL', 'https://inchara-holidays.vercel.app'),
  regNumber: '',
};

/**
 * Generates a clean WhatsApp link with prefilled text and inquiry reference.
 */
export function getWhatsAppInquiryUrl(message: string, rawPhone = brandConfig.whatsappRaw): string {
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
