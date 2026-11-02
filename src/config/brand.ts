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
  taglineKn: string;
  taglineEn: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  email: string;
  notificationEmail: string;
  addressKn: string;
  addressEn: string;
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
  taglineKn: 'ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ, ಸಾಮಾನ್ಯತೆಯನ್ನು ಮೀರಿ · ಕರಾವಳಿ, ಮಲೆನಾಡು ಹಾಗೂ ಕರ್ನಾಟಕದ ಪರಂಪರೆ',
  taglineEn: 'Your Trusted Travel Partner · Heritage, Hospitality & Mindful Journeys',

  // Real business contacts (overridable via Vite environment variables)
  phoneDisplay: getEnv('VITE_CONTACT_PHONE_DISPLAY', '+91 94480 00000'),
  phoneRaw: getEnv('VITE_CONTACT_PHONE', '919448000000'),

  whatsappDisplay: getEnv('VITE_WHATSAPP_DISPLAY', '+91 94480 00000'),
  whatsappRaw: getEnv('VITE_WHATSAPP_NUMBER', '919448000000'),

  email: getEnv('VITE_CONTACT_EMAIL', 'hello@incharaholidays.com'),
  notificationEmail: getEnv('VITE_NOTIFICATIONS_EMAIL', 'inquiries@incharaholidays.com'),

  addressKn: 'ನಂ. ೪೮, ಹೆರಿಟೇಜ್ ಕಾರಿಡಾರ್, ಮೈಸೂರು & ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ - ೫೬೦೦೦೧',
  addressEn: 'No. 48, Heritage Corridor, Mysuru & Bengaluru, Karnataka - 560001, India',

  hoursKn: 'ಸೋಮವಾರ - ಶನಿವಾರ: ಮುಂಜಾನೆ ೯:೦೦ ರಿಂದ ಸಂಜೆ ೮:೦೦ ವರೆಗೆ',
  hoursEn: 'Monday - Saturday: 9:00 AM - 8:00 PM IST',

  website: 'https://inchara-holidays.vercel.app',
  regNumber: 'KA-TO-2024-88419',
};

/**
 * Generates a clean WhatsApp link with prefilled text and inquiry reference.
 */
export function getWhatsAppInquiryUrl(message: string, rawPhone = brandConfig.whatsappRaw): string {
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
