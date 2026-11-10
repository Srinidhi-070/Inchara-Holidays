/**
 * INCHARA HOLIDAYS — INTERACTIVE TRAVEL MAP & REGIONAL EXPLORER
 * Three-tier interactive discovery with 100% AUTHENTIC, RECOGNIZABLE GEOGRAPHIC MAPS:
 * 1. Karnataka Map: 27 survey-accurate districts with authentic state boundaries (Bidar horn, Karavali coast, Mysuru south).
 * 2. India Map: 36 authentic states & UTs (Kashmir crown, Gujarat horn, southern peninsula, Northeast arm).
 * 3. International Map: Real world map with continents, flight trajectories, and global destination highlights.
 *
 * Fully bilingual (EN / KN), responsive across 360px to 1440px+,
 * keyboard accessible, and connects directly to EnquiryDialog & WhatsApp advisory.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale, ServiceId } from '../types';
import {
  MapPin,
  Clock,
  Car,
  UtensilsCrossed,
  Sparkles,
  ArrowUpRight,
  Compass,
  Globe,
  CheckCircle2,
  PhoneCall,
  Plane,
} from 'lucide-react';
import {
  KARNATAKA_DISTRICTS,
  INDIA_STATES,
  WORLD_COUNTRIES,
} from '../data/travelMapData';

interface InteractiveTravelMapProps {
  locale: Locale;
  onEnquire: (service?: ServiceId | string, initialDetails?: string) => void;
}

type MapTier = 'karnataka' | 'india' | 'international';

interface DestinationRegion {
  id: string;
  nameEn: string;
  nameKn: string;
  tier: MapTier;
  tagEn: string;
  tagKn: string;
  tagColor: string;
  image: string;
  durationEn: string;
  durationKn: string;
  transitEn: string;
  transitKn: string;
  diningEn: string;
  diningKn: string;
  summaryEn: string;
  summaryKn: string;
  highlightsEn: string[];
  highlightsKn: string[];
  // SVG Pin coordinates
  pinCoords: { x: number; y: number };
  // Associated entity IDs
  entityIds: string[];
}

const DESTINATIONS: DestinationRegion[] = [
  // ================= 1. KARNATAKA CIRCUITS (Authentic Coordinates on 500x650) =================
  {
    id: 'karnataka-hoysala',
    nameEn: 'Hassan & Hoysala Heartland',
    nameKn: 'ಹಾಸನ & ಹೊಯ್ಸಳ ಪರಂಪರೆ',
    tier: 'karnataka',
    tagEn: 'UNESCO World Heritage',
    tagKn: 'ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ',
    tagColor: 'from-[#D4AF37] to-[#C5A028]',
    image: '/images/hoysala_belur.jpg',
    durationEn: '3 – 4 Days',
    durationKn: '೩ – ೪ ದಿನಗಳು',
    transitEn: '4 hrs scenic drive from Bengaluru via NH75',
    transitKn: 'ಬೆಂಗಳೂರಿನಿಂದ ಎನ್‌ಎಚ್‌೭೫ ಮೂಲಕ ೪ ಗಂಟೆಗಳ ರಸ್ತೆ ಪ್ರಯಾಣ',
    diningEn: '100% Satvik Pure Veg South Indian feasts',
    diningKn: '೧೦೦% ಸಾತ್ವಿಕ ಶುದ್ಧ ಸಸ್ಯಾಹಾರ ಊಟ',
    summaryEn:
      'Marvel at the 12th-century star-shaped temples of Belur and Halebidu, intricate soapstone bracket figures, and the monolithic Gommateshwara statue at Shravanabelagola.',
    summaryKn:
      '೧೨ನೇ ಶತಮಾನದ ನಕ್ಷತ್ರಾಕಾರದ ಬೇಲೂರು-ಹಳೇಬೀಡು ದೇಗುಲಗಳು, ಸೂಕ್ಷ್ಮ ಶಿಲ್ಪಕಲೆ ಹಾಗೂ ಶ್ರವಣಬೆಳಗೊಳದ ಗೊಮ್ಮಟೇಶ್ವರನ ದರ್ಶನ — ಐತಿಹಾಸಿಕ ಪಯಣ.',
    highlightsEn: [
      'Belur Chennakeshava Temple',
      'Halebidu Hoysaleshwara',
      'Shravanabelagola Monolith',
      'Dedicated Chauffeur Car',
    ],
    highlightsKn: [
      'ಬೇಲೂರು ಚನ್ನಕೇಶವ ದೇವಾಲಯ',
      'ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ',
      'ಶ್ರವಣಬೆಳಗೊಳ ಗೊಮ್ಮಟೇಶ್ವರ',
      'ವಿಶ್ವಾಸಾರ್ಹ ಚಾಲಕ ಸೌಲಭ್ಯ',
    ],
    pinCoords: { x: 205, y: 475 },
    entityIds: ['hassan', 'mandya', 'tumkur'],
  },
  {
    id: 'karnataka-mysuru',
    nameEn: 'Royal Mysuru & Kabini Safari',
    nameKn: 'ಮೈಸೂರು ಅರಮನೆ & ಕಬಿನಿ',
    tier: 'karnataka',
    tagEn: 'Royal Heritage & Wildlife',
    tagKn: 'ರಾಜ ಪರಂಪರೆ & ಅಭಯಾರಣ್ಯ',
    tagColor: 'from-[#D4AF37] to-[#9E3D28]',
    image: '/images/mysuru_palace.jpg',
    durationEn: '3 – 5 Days',
    durationKn: '೩ – ೫ ದಿನಗಳು',
    transitEn: '2.5 hrs via Mysuru Expressway / Mysore Airport',
    transitKn: 'ಮೈಸೂರು ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ವೇ ಮೂಲಕ ೨.೫ ಗಂಟೆಗಳ ಪಯಣ',
    diningEn: 'Traditional Mysore Pak & royal plantain leaf meals',
    diningKn: 'ಪಾರಂಪರಿಕ ಬಾಳೆಎಲೆ ಊಟ & ಮೈಸೂರು ಪಾಕ್',
    summaryEn:
      'Experience the illuminated Mysore Palace, Chamundi Hills, fragrant sandalwood bazaars, and venture into Kabini and Bandipur for premier tiger and elephant safaris.',
    summaryKn:
      'ದೀಪಾಲಂಕೃತ ಮೈಸೂರು ಅರಮನೆ, ಚಾಮುಂಡಿ ಬೆಟ್ಟ ಹಾಗೂ ಕಬಿನಿ-ಬಂಡೀಪುರ ಅಭಯಾರಣ್ಯದ ಅದ್ಭುತ ವನ್ಯಜೀವಿ ಸಫಾರಿ ಅನುಭವ.',
    highlightsEn: [
      'Illuminated Mysore Palace',
      'Kabini Jungle Safari',
      'Bandipur Tiger Reserve',
      'Chamundi Hill Darshan',
    ],
    highlightsKn: [
      'ದೀಪಾಲಂಕೃತ ಮೈಸೂರು ಅರಮನೆ',
      'ಕಬಿನಿ ಜಂಗಲ್ ಸಫಾರಿ',
      'ಬಂಡೀಪುರ ಹುಲಿ ಸಂರಕ್ಷಿತ ತಾಣ',
      'ಚಾಮುಂಡಿ ಬೆಟ್ಟ ದರ್ಶನ',
    ],
    pinCoords: { x: 245, y: 555 },
    entityIds: ['mysore', 'chamrajnagar'],
  },
  {
    id: 'karnataka-malnad',
    nameEn: 'Coorg & Chikmagalur Coffee Country',
    nameKn: 'ಕೂರ್ಗ್ & ಚಿಕ್ಕಮಗಳೂರು ಮಲೆನಾಡು',
    tier: 'karnataka',
    tagEn: 'Misty Hill Sanctuary',
    tagKn: 'ಮಂಜಿನ ಮಲೆನಾಡು & ಗಿರಿಧಾಮ',
    tagColor: 'from-[#1E3A2B] to-[#D4AF37]',
    image: '/images/coorg_misty_plantation_1791795473840.jpg',
    durationEn: '4 – 5 Days',
    durationKn: '೪ – ೫ ದಿನಗಳು',
    transitEn: '5.5 hrs drive from Bengaluru or 3 hrs from Mangaluru',
    transitKn: 'ಬೆಂಗಳೂರಿನಿಂದ ೫.೫ ಗಂಟೆ ಅಥವಾ ಮಂಗಳೂರಿನಿಂದ ೩ ಗಂಟೆ',
    diningEn: 'Fresh plantation filter coffee & Satvik Malnad cuisine',
    diningKn: 'ಮಲೆನಾಡಿನ ಸಾಂಪ್ರದಾಯಿಕ ಅಡುಗೆ & ಶುದ್ಧ ಫಿಲ್ಟರ್ ಕಾಫಿ',
    summaryEn:
      'Wander through mist-shrouded Arabica coffee estates, scale Mullayanagiri (Karnataka’s highest peak), visit Abbey Falls, and relax in serene estate homestays.',
    summaryKn:
      'ಕಾಫಿ ತೋಟಗಳ ಹಸಿರು ಮಡಿಲು, ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರ, ಅಬ್ಬಿ ಜಲಪಾತ ಹಾಗೂ ಪ್ರಶಾಂತ ಎಸ್ಟೇಟ್ ಹೋಮ್‌ಸ್ಟೇಗಳ ಸವಿ ನೆನಪು.',
    highlightsEn: [
      'Private Coffee Estate Walk',
      'Mullayanagiri Peak Trek',
      'Abbey Falls & Raja’s Seat',
      'Western Ghats Mist Trails',
    ],
    highlightsKn: [
      'ಕಾಫಿ ತೋಟದ ವಾಕಿಂಗ್',
      'ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರ ವೀಕ್ಷಣೆ',
      'ಅಬ್ಬಿ ಜಲಪಾತ & ರಾಜಾಸೀಟ್',
      'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಮಂಜಿನ ಹಾದಿ',
    ],
    pinCoords: { x: 185, y: 445 },
    entityIds: ['kodagu', 'chikmagalur', 'shimoga'],
  },
  {
    id: 'karnataka-karavali',
    nameEn: 'Gokarna, Murudeshwar & Coastal Karavali',
    nameKn: 'ಗೋಕರ್ಣ, ಮುರುಡೇಶ್ವರ & ಕರಾವಳಿ',
    tier: 'karnataka',
    tagEn: 'Sacred Coast & Beaches',
    tagKn: 'ಕರಾವಳಿ ಕಡಲತೀರ & ಪುಣ್ಯಕ್ಷೇತ್ರ',
    tagColor: 'from-[#0D1F15] to-[#F5D77F]',
    image: '/images/signature_gokarna_coast_1791795485390.jpg',
    durationEn: '4 – 6 Days',
    durationKn: '೪ – ೬ ದಿನಗಳು',
    transitEn: 'Direct trains, Mangaluru flight or coastal highway drive',
    transitKn: 'ನೇರ ರೈಲು, ಮಂಗಳೂರು ವಿಮಾನ ಅಥವಾ ಕರಾವಳಿ ಹೆದ್ದಾರಿ',
    diningEn: 'Authentic Udupi vegetarian thali & coastal refreshments',
    diningKn: 'ಅಧಿಕೃತ ಉಡುಪಿ ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಊಟ & ತಂಪು ಪಾನೀಯಗಳು',
    summaryEn:
      'Golden sand crescent beaches in Gokarna, the towering Lord Shiva monolith at Murudeshwar, and sacred darshan at the ancient Udupi Sri Krishna Matha.',
    summaryKn:
      'ಗೋಕರ್ಣದ ಓಂ ಬೀಚ್, ಮುರುಡೇಶ್ವರದ ಬೃಹತ್ ಶಿವನ ಮೂರ್ತಿ ಹಾಗೂ ಉಡುಪಿ ಶ್ರೀಕೃಷ್ಣ ಮಠದ ಪವಿತ್ರ ದರ್ಶನ.',
    highlightsEn: [
      'Gokarna Om Beach & Kudle',
      'Murudeshwar Shiva Monolith',
      'Udupi Sri Krishna Temple',
      'St. Mary’s Basaltic Island',
    ],
    highlightsKn: [
      'ಗೋಕರ್ಣ ಓಂ ಬೀಚ್',
      'ಮುರುಡೇಶ್ವರ ಶಿವನ ಮೂರ್ತಿ',
      'ಉಡುಪಿ ಶ್ರೀ ಕೃಷ್ಣ ಮಠ',
      'ಸೈಂಟ್ ಮೇರೀಸ್ ದ್ವೀಪ',
    ],
    pinCoords: { x: 88, y: 295 },
    entityIds: ['uttar-kannand', 'udupi', 'dakshin-kannad'],
  },
  {
    id: 'karnataka-hampi',
    nameEn: 'Hampi UNESCO & Badami Cave Temples',
    nameKn: 'ಹಂಪಿ ಯುನೆಸ್ಕೋ & ಬಾದಾಮಿ ಗುಹೆಗಳು',
    tier: 'karnataka',
    tagEn: 'Vijayanagara Empire Capital',
    tagKn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವೈಭವ',
    tagColor: 'from-[#9E3D28] to-[#D4AF37]',
    image: '/images/hampi_stone_chariot_1791795462673.jpg',
    durationEn: '4 – 5 Days',
    durationKn: '೪ – ೫ ದಿನಗಳು',
    transitEn: '6 hrs via NH48 / Hubballi Airport / Hosapete Railhead',
    transitKn: 'ಬೆಂಗಳೂರಿನಿಂದ ಎನ್‌ಎಚ್‌೪೮ ಅಥವಾ ಹೊಸಪೇಟೆ ರೈಲ್ವೆ ನಿಲ್ದಾಣ',
    diningEn: 'Traditional North Karnataka Jolada Rotti satvik meals',
    diningKn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ',
    summaryEn:
      'Step into the golden age of Vijayanagara: boulder-strewn Tungabhadra landscapes, the iconic Stone Chariot, Virupaksha Temple, and Badami’s rock-cut caves.',
    summaryKn:
      'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಭವ್ಯತೆ: ತುಂಗಭದ್ರಾ ನದಿ ತೀರ, ಪ್ರಸಿದ್ಧ ಕಲ್ಲಿನ ರಥ, ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ಹಾಗೂ ಬಾದಾಮಿಯ ಕಲ್ಲಿನ ಗುಹೆಗಳು.',
    highlightsEn: [
      'Hampi Stone Chariot',
      'Virupaksha Living Temple',
      'Badami Rock-cut Caves',
      'Pattadakal UNESCO Monuments',
    ],
    highlightsKn: [
      'ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ',
      'ವಿರೂಪಾಕ್ಷ ಪುರಾತನ ದೇವಾಲಯ',
      'ಬಾದಾಮಿ ಕಲ್ಲಿನ ಗುಹೆಗಳು',
      'ಪಟ್ಟದಕಲ್ಲು ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕ',
    ],
    pinCoords: { x: 265, y: 245 },
    entityIds: ['bellary', 'bagalkot', 'bijapur', 'belgaum', 'dharwad', 'gadag', 'koppal', 'raichur', 'gulbarga', 'bidar'],
  },

  // ================= 2. INCREDIBLE INDIA CIRCUITS (Authentic Coordinates on 612x696) =================
  {
    id: 'india-rajasthan',
    nameEn: 'Rajasthan Royal Palaces & Desert Forts',
    nameKn: 'ರಾಜಸ್ಥಾನ ಅರಮನೆಗಳು & ಮರಳುಗಾಡು',
    tier: 'india',
    tagEn: 'Maharaja Heritage',
    tagKn: 'ಮಹಾರಾಜ ಪರಂಪರೆ',
    tagColor: 'from-[#D4AF37] to-[#9E3D28]',
    image: '/images/rajasthan_heritage.jpg',
    durationEn: '6 – 8 Days',
    durationKn: '೬ – ೮ ದಿನಗಳು',
    transitEn: 'Direct flights from Bengaluru to Jaipur & Udaipur',
    transitKn: 'ಬೆಂಗಳೂರಿನಿಂದ ಜೈಪುರ / ಉದಯಪುರಕ್ಕೆ ನೇರ ವಿಮಾನ',
    diningEn: 'Pure Marwari Satvik thali with Dal Baati Churma',
    diningKn: 'ಶುದ್ಧ ಮಾರ್ವಾಡಿ ಸಾತ್ವಿಕ ದಾಲ್ ಬಾಟಿ ಚುರ್ಮಾ ಊಟ',
    summaryEn:
      'Grand lake palaces of Udaipur, Amber Fort in Jaipur, golden desert dunes of Jaisalmer, and majestic living heritage with royal hospitality.',
    summaryKn:
      'ಉದಯಪುರದ ಸುಂದರ ಸರೋವರ ಅರಮನೆ, ಜೈಪುರದ ಆಂಬರ್ ಕೋಟೆ ಮತ್ತು ಜೈಸಲ್ಮೇರ್ ಮರಳುಗಾಡಿನ ಭವ್ಯ ರಾಜಸ್ಥಾನಿ ಸೌಂದರ್ಯ.',
    highlightsEn: [
      'Udaipur Lake Pichola Boat Cruise',
      'Jaipur City Palace & Hawa Mahal',
      'Jaisalmer Thar Desert Camel Safari',
      'Private Luxury Chauffeur Coach',
    ],
    highlightsKn: [
      'ಉದಯಪುರ ಪಿಚೋಲಾ ಸರೋವರ ಬೋಟಿಂಗ್',
      'ಜೈಪುರ ಸಿಟಿ ಪ್ಯಾಲೇಸ್ & ಹವಾ ಮಹಲ್',
      'ಜೈಸಲ್ಮೇರ್ ಥಾರ್ ಮರಳುಗಾಡು ಸಫಾರಿ',
      'ಲಕ್ಸುರಿ ಖಾಸಗಿ ವಾಹನ ಸೌಲಭ್ಯ',
    ],
    pinCoords: { x: 165, y: 275 },
    entityIds: ['rj'],
  },
  {
    id: 'india-kerala',
    nameEn: 'Kerala Luxury Backwaters & Munnar Hills',
    nameKn: 'ಕೇರಳ ಹಿನ್ನೀರು & ಮುನ್ನಾರ್ ಚಹಾ ಬೆಟ್ಟ',
    tier: 'india',
    tagEn: 'God’s Own Country',
    tagKn: 'ದೇವರ ಸ್ವಂತ ನಾಡು',
    tagColor: 'from-[#1E3A2B] to-[#F5D77F]',
    image: '/images/kerala_backwaters_luxury.jpg',
    durationEn: '5 – 7 Days',
    durationKn: '೫ – ೭ ದಿನಗಳು',
    transitEn: 'Flight to Kochi / scenic rail / luxury coach',
    transitKn: 'ಕೊಚ್ಚಿ ವಿಮಾನ ಅಥವಾ ಸುಂದರ ರೈಲು ಪಯಣ',
    diningEn: 'Traditional Kerala Sadya on fresh plantain leaf',
    diningKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕೇರಳ ಬಾಳೆಎಲೆ ಸದ್ಯ ಶುದ್ಧ ಊಟ',
    summaryEn:
      'Private luxury houseboat cruise along palm-fringed Alleppey lagoons, rolling green tea estates of Munnar, and Ayurvedic wellness retreats.',
    summaryKn:
      'ಆಲಪ್ಪುಳದ ಪ್ರಶಾಂತ ಹಿನ್ನೀರಿನಲ್ಲಿ ಖಾಸಗಿ ಹೌಸ್‌ಬೋಟ್ ಪಯಣ, ಮುನ್ನಾರ್‌ನ ಹಸಿರು ಚಹಾ ತೋಟಗಳು ಮತ್ತು ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ.',
    highlightsEn: [
      'Alleppey Private Houseboat Cruise',
      'Munnar Tea Valley & Mattupetty',
      'Fort Kochi Colonial Heritage',
      'Satvik Kerala Sadya Feast',
    ],
    highlightsKn: [
      'ಆಲಪ್ಪುಳ ಖಾಸಗಿ ಹೌಸ್‌ಬೋಟ್',
      'ಮುನ್ನಾರ್ ಚಹಾ ಕಣಿವೆ',
      'ಫೋರ್ಟ್ ಕೊಚ್ಚಿ ಪರಂಪರೆ',
      'ಸಾತ್ವಿಕ ಕೇರಳ ಬಾಳೆಎಲೆ ಊಟ',
    ],
    pinCoords: { x: 215, y: 615 },
    entityIds: ['kl'],
  },
  {
    id: 'india-himachal',
    nameEn: 'Himachal Snow Valleys & Kashmir Valleys',
    nameKn: 'ಹಿಮಾಚಲ ಹಿಮ ಕಣಿವೆಗಳು & ಕಾಶ್ಮೀರ',
    tier: 'india',
    tagEn: 'Alpine Himalayan Splendor',
    tagKn: 'ಹಿಮಾಲಯದ ಹಿಮಶಿಖರಗಳು',
    tagColor: 'from-[#0D1F15] to-[#D4AF37]',
    image: '/images/himachal_alpine_peaks.jpg',
    durationEn: '7 – 9 Days',
    durationKn: '೭ – ೯ ದಿನಗಳು',
    transitEn: 'Flights to Chandigarh / Srinagar with vetted mountain pilots',
    transitKn: 'ಚಂಡೀಗಢ ಅಥವಾ ಶ್ರೀನಗರಕ್ಕೆ ವಿಮಾನ ಸಂಪರ್ಕ',
    diningEn: 'Piping hot North Indian satvik meals & Kashmiri Kahwa',
    diningKn: 'ಬಿಸಿಬಿಸಿ ಉತ್ತರ ಭಾರತೀಯ ಸಸ್ಯಾಹಾರ & ಕಾಶ್ಮೀರಿ ಕಾಹ್ವಾ',
    summaryEn:
      'Glistening snow peaks of Manali, Rohtang Pass glaciers, Dal Lake Shikara rides in Srinagar, and the Gondola cable car ride above Gulmarg alpine meadows.',
    summaryKn:
      'ಮನಾಲಿಯ ಹಿಮಶಿಖರಗಳು, ರೋಹ್ಟಾಂಗ್ ಪಾಸ್, ಶ್ರೀನಗರದ ದಾಲ್ ಸರೋವರದ ಶಿಕಾರಾ ಬೋಟಿಂಗ್ ಹಾಗೂ ಗುಲ್‌ಮಾರ್ಗ್ ಕೇಬಲ್ ಕಾರ್.',
    highlightsEn: [
      'Manali Solang & Atal Tunnel',
      'Srinagar Dal Lake Shikara',
      'Gulmarg Gondola Ride Phase 2',
      'All-Weather Heated Coaches',
    ],
    highlightsKn: [
      'ಮನಾಲಿ ಸೋಲಾಂಗ್ ಕಣಿವೆ & ಅಟಲ್ ಟನಲ್',
      'ದಾಲ್ ಸರೋವರ ಶಿಕಾರಾ ಪಯಣ',
      'ಗುಲ್‌ಮಾರ್ಗ್ ಗೊಂಡೋಲಾ ಕೇಬಲ್ ಕಾರ್',
      'ಆರಾಮದಾಯಕ ಪರ್ವತ ವಾಹನಗಳು',
    ],
    pinCoords: { x: 210, y: 145 },
    entityIds: ['hp', 'jk'],
  },
  {
    id: 'india-golden-triangle',
    nameEn: 'Golden Triangle & Sacred Varanasi Ganges',
    nameKn: 'ಗೋಲ್ಡನ್ ಟ್ರಯಾಂಗಲ್ & ವಾರಣಾಸಿ ಗಂಗಾರತಿ',
    tier: 'india',
    tagEn: 'Historic Monuments & Spirituality',
    tagKn: 'ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕಗಳು & ಆಧ್ಯಾತ್ಮಿಕತೆ',
    tagColor: 'from-[#9E3D28] to-[#D4AF37]',
    image: '/images/karnataka-heritage.jpg',
    durationEn: '6 – 8 Days',
    durationKn: '೬ – ೮ ದಿನಗಳು',
    transitEn: 'Connecting flights / Vande Bharat Express & private coaches',
    transitKn: 'ವಿಮಾನ / ವಂದೇ ಭಾರತ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ & ಖಾಸಗಿ ಕೋಚ್',
    diningEn: 'Strict satvik vegetarian catering throughout pilgrimage',
    diningKn: 'ತೀರ್ಥಯಾತ್ರೆಯುದ್ದಕ್ಕೂ ಶುದ್ಧ ಸಾತ್ವಿಕ ಸಸ್ಯಾಹಾರ',
    summaryEn:
      'The timeless marble splendor of Taj Mahal at dawn, historic Delhi Mughal monuments, and evening Ganga Aarti rituals on Varanasi’s sacred river ghats.',
    summaryKn:
      'ಸೂರ್ಯೋದಯದಲ್ಲಿ ತಾಜ್ ಮಹಲ್ ದರ್ಶನ, ದೆಹಲಿಯ ಐತಿಹಾಸಿಕ ತಾಣಗಳು ಹಾಗೂ ವಾರಣಾಸಿಯ ಗಂಗಾ ನದಿ ತೀರದಲ್ಲಿ ಭವ್ಯ ಸಂಧ್ಯಾ ಮಹಾ ಆರತಿ.',
    highlightsEn: [
      'Taj Mahal Sunrise Experience',
      'Varanasi Private Ghat Boat & Aarti',
      'Delhi Red Fort & Qutub Minar',
      'Guided Pilgrim Support',
    ],
    highlightsKn: [
      'ತಾಜ್ ಮಹಲ್ ಸೂರ್ಯೋದಯ ವೀಕ್ಷಣೆ',
      'ವಾರಣಾಸಿ ಸಂಧ್ಯಾ ಗಂಗಾರತಿ ದರ್ಶನ',
      'ದೆಹಲಿ ಕೆಂಪು ಕೋಟೆ & ಕುತುಬ್ ಮಿನಾರ್',
      'ಅನುಭವಿ ಮಾರ್ಗದರ್ಶಕರ ಬೆಂಬಲ',
    ],
    pinCoords: { x: 290, y: 265 },
    entityIds: ['up', 'dl', 'ut'],
  },
  {
    id: 'india-goa',
    nameEn: 'Goa Golden Shores & Konkan Heritage',
    nameKn: 'ಗೋವಾ ಕಡಲತೀರ & ಕೊಂಕಣ ಸಂಸ್ಕೃತಿ',
    tier: 'india',
    tagEn: 'Sun, Sand & Portuguese History',
    tagKn: 'ಕಡಲತೀರ & ಪೋರ್ಚುಗೀಸ್ ಪರಂಪರೆ',
    tagColor: 'from-[#162E22] to-[#F5D77F]',
    image: '/images/signature_gokarna_coast_1791795485390.jpg',
    durationEn: '4 – 5 Days',
    durationKn: '೪ – ೫ ದಿನಗಳು',
    transitEn: '8 hrs Western Ghats drive or 1 hr flight from Bengaluru',
    transitKn: 'ಬೆಂಗಳೂರಿನಿಂದ ೧ ಗಂಟೆ ವಿಮಾನ ಅಥವಾ ರಸ್ತೆ ಪಯಣ',
    diningEn: 'Goan vegetarian curries & fresh coconut refreshments',
    diningKn: 'ಗೋವಾದ ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಅಡುಗೆ & ಎಳನೀರು',
    summaryEn:
      'Pristine south Goan beaches, historic Latin Quarter cathedrals of Fontainhas, Dudhsagar Waterfalls, and relaxing sunset river cruises.',
    summaryKn:
      'ದಕ್ಷಿಣ ಗೋವಾದ ಸುಂದರ ಬೀಚ್‌ಗಳು, ಫೊಂಟೈನ್ಹಾಸ್ ಪೋರ್ಚುಗೀಸ್ ಚರ್ಚ್‌ಗಳು, ದೂಧ್‌ಸಾಗರ್ ಜಲಪಾತ ಹಾಗೂ ಸೂರ್ಯಾಸ್ತದ ನದಿ ಕ್ರೂಸ್.',
    highlightsEn: [
      'Palolem & South Goa Quiet Shores',
      'Old Goa UNESCO Cathedrals',
      'Dudhsagar Waterfalls Safari',
      'Private Chauffeur Pickup',
    ],
    highlightsKn: [
      'ದಕ್ಷಿಣ ಗೋವಾದ ಪ್ರಶಾಂತ ಬೀಚ್‌ಗಳು',
      'ಓಲ್ಡ್ ಗೋವಾ ಪುರಾತನ ಚರ್ಚ್‌ಗಳು',
      'ದೂಧ್‌ಸಾಗರ್ ಜಲಪಾತ ಸಫಾರಿ',
      'ಖಾಸಗಿ ಚಾಲಕ ಸೌಲಭ್ಯ',
    ],
    pinCoords: { x: 155, y: 495 },
    entityIds: ['ga'],
  },

  // ================= 3. INTERNATIONAL CIRCUITS (Authentic Coordinates on 784x458) =================
  {
    id: 'intl-vietnam',
    nameEn: 'Vietnam: Emerald Ha Long Bay & Ancient Towns',
    nameKn: 'ವಿಯೆಟ್ನಾಂ: ಹಾಲಾಂಗ್ ಕೊಲ್ಲಿ & ಪ್ರಾಚೀನ ನಗರ',
    tier: 'international',
    tagEn: 'Southeast Asia Wonder',
    tagKn: 'ಆಗ್ನೇಯ ಏಷ್ಯಾದ ಅದ್ಭುತ',
    tagColor: 'from-[#0D1F15] to-[#D4AF37]',
    image: '/images/vietnam_halong.jpg',
    durationEn: '6 – 8 Days',
    durationKn: '೬ – ೮ ದಿನಗಳು',
    transitEn: 'Flights from Bengaluru to Hanoi/Da Nang with eVisa assistance',
    transitKn: 'ಬೆಂಗಳೂರಿನಿಂದ ನೇರ ವಿಮಾನ & ಸಂಪೂರ್ಣ ಇ-ವೀಸಾ ನೆರವು',
    diningEn: 'Dedicated Indian pure veg catering & fresh tropical fruit',
    diningKn: 'ಪ್ರವಾಸದಲ್ಲೆಲ್ಲಾ ಶುದ್ಧ ಭಾರತೀಯ ಸಸ್ಯಾಹಾರದ ವ್ಯವಸ್ಥೆ',
    summaryEn:
      'Overnight 5-star luxury cruise through Ha Long Bay’s thousands of limestone karsts, lantern-lit streets of Hoi An, and the famous Golden Hand Bridge in Da Nang.',
    summaryKn:
      'ಹಾಲಾಂಗ್ ಕೊಲ್ಲಿಯಲ್ಲಿ ೫-ಸ್ಟಾರ್ ಲಕ್ಸುರಿ ಕ್ರೂಸ್, ಹೋಯಿ ಆನ್ ನಗರದ ದೀಪಾಲಂಕೃತ ಬೀದಿಗಳು ಮತ್ತು ಡಾನಾಂಗ್‌ನ ಗೋಲ್ಡನ್ ಬ್ರಿಡ್ಜ್.',
    highlightsEn: [
      'Ha Long Bay 5-Star Junk Cruise',
      'Da Nang Golden Bridge in the Sky',
      'Hoi An UNESCO Ancient Town',
      'Full Visa & Airport Transfer',
    ],
    highlightsKn: [
      'ಹಾಲಾಂಗ್ ಕೊಲ್ಲಿಯಲ್ಲಿ ಲಕ್ಸುರಿ ಕ್ರೂಸ್',
      'ಡಾನಾಂಗ್ ಗೋಲ್ಡನ್ ಬ್ರಿಡ್ಜ್ ವೀಕ್ಷಣೆ',
      'ಹೋಯಿ ಆನ್ ಯುನೆಸ್ಕೋ ಪಟ್ಟಣ',
      'ವೀಸಾ & ಏರ್‌ಪೋರ್ಟ್ ನೆರವು',
    ],
    pinCoords: { x: 625, y: 450 },
    entityIds: ['vn'],
  },
  {
    id: 'intl-bali',
    nameEn: 'Bali Island: Sacred Temples & Rice Terraces',
    nameKn: 'ಬಾಲಿ ದ್ವೀಪ: ಪವಿತ್ರ ದೇಗುಲ & ಹಸಿರು ತೋಟ',
    tier: 'international',
    tagEn: 'Tropical Island Culture',
    tagKn: 'ಉಷ್ಣವಲಯದ ದ್ವೀಪ ಸಂಸ್ಕೃತಿ',
    tagColor: 'from-[#1E3A2B] to-[#F5D77F]',
    image: '/images/bali_temple.jpg',
    durationEn: '6 – 7 Days',
    durationKn: '೬ – ೭ ದಿನಗಳು',
    transitEn: 'Flight via Singapore/Kuala Lumpur with Visa on Arrival',
    transitKn: 'ಸಿಂಗಾಪುರ ಮೂಲಕ ವಿಮಾನ & ಆಗಮನದ ನಂತರ ವೀಸಾ',
    diningEn: 'Indian pure vegetarian restaurants arranged at all stops',
    diningKn: 'ಪ್ರತಿ ನಿಲ್ದಾಣದಲ್ಲೂ ಭಾರತೀಯ ಸಸ್ಯಾಹಾರಿ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು',
    summaryEn:
      'Ulun Danu water temple on Lake Beratan, Tegalalang emerald rice terraces in Ubud, sunset fire dance at Uluwatu Cliff, and tranquil villa stays.',
    summaryKn:
      'ಬೆರಾಟನ್ ಸರೋವರದ ಜಲ ದೇವಾಲಯ, ಉಬುಡ್ ಹಸಿರು ಮೆಟ್ಟಿಲು ತೋಟಗಳು, ಉಲುವಾಟು ಕಡಿದಾದ ಬಂಡೆಯ ಮೇಲಿನ ಸೂರ್ಯಾಸ್ತ ಹಾಗೂ ಖಾಸಗಿ ವಿಲ್ಲಾ.',
    highlightsEn: [
      'Ulun Danu Beratan Lake Temple',
      'Ubud Tegalalang Rice Terraces',
      'Uluwatu Sunset Ocean Temple',
      'Private Pool Villa Experience',
    ],
    highlightsKn: [
      'ಉಲುನ್ ದಾನು ಸರೋವರ ದೇವಾಲಯ',
      'ಉಬುಡ್ ಹಸಿರು ಮೆಟ್ಟಿಲು ತೋಟಗಳು',
      'ಉಲುವಾಟು ಸಮುದ್ರ ತೀರದ ದೇವಾಲಯ',
      'ಖಾಸಗಿ ಪೂಲ್ ವಿಲ್ಲಾ ವಾಸ್ತವ್ಯ',
    ],
    pinCoords: { x: 660, y: 535 },
    entityIds: ['id'],
  },
  {
    id: 'intl-japan',
    nameEn: 'Japan: Kyoto Cherry Blossoms & Mount Fuji',
    nameKn: 'ಜಪಾನ್: ಕ್ಯೋಟೋ ದೇಗುಲಗಳು & ಮೌಂಟ್ ಫ್ಯೂಜಿ',
    tier: 'international',
    tagEn: 'Imperial Gardens & Bullet Trains',
    tagKn: 'ಶಾಂತ ಉದ್ಯಾನಗಳು & ಬುಲೆಟ್ ಟ್ರೈನ್',
    tagColor: 'from-[#9E3D28] to-[#D4AF37]',
    image: '/images/japan_kyoto.jpg',
    durationEn: '7 – 9 Days',
    durationKn: '೭ – ೯ ದಿನಗಳು',
    transitEn: 'Direct flights & Shinkansen bullet train pass included',
    transitKn: 'ವಿಮಾನ ಪ್ರಯಾಣ & ಜಪಾನ್ ಬುಲೆಟ್ ಟ್ರೈನ್ ಪಾಸ್ ಸೌಲಭ್ಯ',
    diningEn: 'Curated vegetarian dining, Shojin Ryori temple cuisine',
    diningKn: 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರ & ಬೌದ್ಧ ದೇವಾಲಯದ ಸಾತ್ವಿಕ ಅಡುಗೆ',
    summaryEn:
      'Walk through thousands of red vermillion Torii gates at Fushimi Inari in Kyoto, bamboo groves of Arashiyama, Tokyo modern skyline, and snow-capped Mount Fuji.',
    summaryKn:
      'ಕ್ಯೋಟೋದ ಕೆಂಪು ತೋರಿ ಗೇಟ್‌ಗಳ ಹಾದಿ, ಅರಶಿಯಾಮಾ ಬಿದಿರಿನ ವನ, ಟೋಕಿಯೊ ಆಧುನಿಕ ನಗರ ಹಾಗೂ ಮೌಂಟ್ ಫ್ಯೂಜಿ ಹಿಮಶಿಖರ ದರ್ಶನ.',
    highlightsEn: [
      'Fushimi Inari 10,000 Torii Gates',
      'Mount Fuji 5th Station Panorama',
      'Shinkansen Bullet Train at 320km/h',
      'Comprehensive Japan Visa Guidance',
    ],
    highlightsKn: [
      'ಕ್ಯೋಟೋ ತೋರಿ ಗೇಟ್‌ಗಳ ಪವಿತ್ರ ಹಾದಿ',
      'ಮೌಂಟ್ ಫ್ಯೂಜಿ ಹಿಮ ಶಿಖರದ ನೋಟ',
      'ಶಿಂಕನ್‌ಸೆನ್ ಬುಲೆಟ್ ಟ್ರೈನ್ ಪ್ರಯಾಣ',
      'ಸಮಗ್ರ ಜಪಾನ್ ವೀಸಾ ಮಾರ್ಗದರ್ಶನ',
    ],
    pinCoords: { x: 705, y: 395 },
    entityIds: ['jp'],
  },
  {
    id: 'intl-dubai',
    nameEn: 'Dubai & Abu Dhabi: Golden Dunes & Modern Wonders',
    nameKn: 'ದುಬೈ & ಅಬುಧಾಬಿ: ಮರುಭೂಮಿ & ಆಧುನಿಕ ಅದ್ಭುತ',
    tier: 'international',
    tagEn: 'Futuristic Luxury & Heritage',
    tagKn: 'ಆಧುನಿಕ ವೈಭವ & ಮರಳುಗಾಡು',
    tagColor: 'from-[#D4AF37] to-[#1E3A2B]',
    image: '/images/mysuru_palace.jpg',
    durationEn: '5 – 6 Days',
    durationKn: '೫ – ೬ ದಿನಗಳು',
    transitEn: '4 hrs direct flights from Bengaluru with express tourist visa',
    transitKn: 'ಬೆಂಗಳೂರಿನಿಂದ ೪ ಗಂಟೆಗಳ ನೇರ ವಿಮಾನ & ಎಕ್ಸ್‌ಪ್ರೆಸ್ ವೀಸಾ',
    diningEn: 'Abundant 100% pure vegetarian & Jain options available daily',
    diningKn: '೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಹಾಗೂ ಜೈನ್ ಊಟದ ಸೌಲಭ್ಯ',
    summaryEn:
      'Stand atop Burj Khalifa, enjoy thrilling 4x4 desert dune bashing with evening barbecue, marvel at Abu Dhabi’s Sheikh Zayed Grand Mosque and Louvre Museum.',
    summaryKn:
      'ಬುರ್ಜ್ ಖಲೀಫಾ ಶಿಖರದ ಮೇಲಿನ ನೋಟ, ಮರುಭೂಮಿ ಸಫಾರಿ, ಅಬುಧಾಬಿಯ ಭವ್ಯ ಶೇಖ್ ಜಾಯೆದ್ ಮಸೀದಿ ಹಾಗೂ ಮ್ಯೂಸಿಯಂ ವೀಕ್ಷಣೆ.',
    highlightsEn: [
      'Burj Khalifa 124th Floor Entry',
      'Desert Safari & Dune Bashing',
      'Sheikh Zayed Grand Mosque Tour',
      'Express Tourist Visa in 72 Hrs',
    ],
    highlightsKn: [
      'ಬುರ್ಜ್ ಖಲೀಫಾ ವೀಕ್ಷಣೆ',
      'ಡೆಸರ್ಟ್ ಸಫಾರಿ & ಮರಳುಗಾಡು ವಾಹನ',
      'ಶೇಖ್ ಜಾಯೆದ್ ಭವ್ಯ ಮಸೀದಿ ಭೇಟಿ',
      '೭೨ ಗಂಟೆಗಳಲ್ಲಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ವೀಸಾ',
    ],
    pinCoords: { x: 485, y: 420 },
    entityIds: ['ae'],
  },
];

export const InteractiveTravelMap: React.FC<InteractiveTravelMapProps> = ({
  locale,
  onEnquire,
}) => {
  const isKn = locale === 'kn';
  const [activeTier, setActiveTier] = useState<MapTier>('karnataka');
  const [activeRegionId, setActiveRegionId] = useState<string>('karnataka-hoysala');
  const [hoveredEntityName, setHoveredEntityName] = useState<string | null>(null);

  // Filter destinations by currently selected tier
  const tierDestinations = DESTINATIONS.filter((d) => d.tier === activeTier);
  const activeRegion =
    tierDestinations.find((d) => d.id === activeRegionId) || tierDestinations[0];

  const handleTierChange = (tier: MapTier) => {
    setActiveTier(tier);
    const firstOfTier = DESTINATIONS.find((d) => d.tier === tier);
    if (firstOfTier) setActiveRegionId(firstOfTier.id);
  };

  // When clicking on a district in Karnataka
  const handleDistrictClick = (districtId: string, circuitId: string) => {
    const matchedRegion = DESTINATIONS.find(
      (d) => d.tier === 'karnataka' && (d.id === circuitId || d.entityIds.includes(districtId))
    );
    if (matchedRegion) {
      setActiveRegionId(matchedRegion.id);
    }
  };

  // When clicking on an Indian state
  const handleStateClick = (stateId: string) => {
    const matchedRegion = DESTINATIONS.find(
      (d) => d.tier === 'india' && d.entityIds.includes(stateId)
    );
    if (matchedRegion) {
      setActiveRegionId(matchedRegion.id);
    }
  };

  // When clicking on an international country
  const handleCountryClick = (countryId: string) => {
    const matchedRegion = DESTINATIONS.find(
      (d) => d.tier === 'international' && d.entityIds.includes(countryId)
    );
    if (matchedRegion) {
      setActiveRegionId(matchedRegion.id);
    }
  };

  const tiers: { id: MapTier; num: string; labelEn: string; labelKn: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      id: 'karnataka',
      num: '01',
      labelEn: 'Karnataka Circuits',
      labelKn: 'ಕರ್ನಾಟಕ ಪಯಣಗಳು',
      icon: Compass,
    },
    {
      id: 'india',
      num: '02',
      labelEn: 'Incredible India',
      labelKn: 'ಭಾರತೀಯ ಪಯಣಗಳು',
      icon: MapPin,
    },
    {
      id: 'international',
      num: '03',
      labelEn: 'Global Horizons',
      labelKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ದಿಗಂತ',
      icon: Globe,
    },
  ];

  return (
    <section
      id="travel-map"
      style={{ scrollMarginTop: '6rem' }}
      className="py-16 sm:py-24 bg-[#07130C] relative overflow-hidden border-t border-b border-[#D4AF37]/25"
      aria-labelledby="map-section-heading"
    >
      {/* Background Ambience & Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#1E3A2B]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#F5D77F] uppercase mb-3">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              {isKn
                ? 'ಅಧಿಕೃತ ನಕ್ಷೆಯ ಮೂಲಕ ಅನ್ವೇಷಿಸಿ · ಕರ್ನಾಟಕ, ಭಾರತ & ವಿಶ್ವ'
                : 'EXPLORE BY AUTHENTIC GEOGRAPHIC MAP · KARNATAKA, INDIA & BEYOND'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="w-6 h-px bg-[#D4AF37]" />
          </div>

          <h2
            id="map-section-heading"
            className={`text-2xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-white tracking-tight leading-[1.18] mb-4 ${
              isKn ? 'font-kannada-serif' : ''
            }`}
          >
            {isKn ? (
              <>
                ಪ್ರತಿ ತಾಣದ{' '}
                <em className="text-[#F5D77F] font-normal italic">
                  ನೈಜ ನಕ್ಷೆ ಮತ್ತು ಮಾರ್ಗಸೂಚಿ
                </em>{' '}
                ಕಾಣಿ
              </>
            ) : (
              <>
                Authentic Geographic Explorer &{' '}
                <em className="text-[#F5D77F] font-normal italic">
                  Curated Routes
                </em>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#F6F3EA]/75 max-w-2xl mx-auto leading-relaxed">
            {isKn
              ? 'ಕರ್ನಾಟಕದ ಅಧಿಕೃತ ಜಿಲ್ಲೆಗಳು, ಭಾರತದ ಎಲ್ಲಾ ರಾಜ್ಯಗಳು ಹಾಗೂ ವಿಶ್ವದ ಖಂಡಗಳ ನೈಜ ನಕ್ಷೆ — ನಿಮ್ಮಿಷ್ಟದ ತಾಣವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ಸಂಪೂರ್ಣ ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ಸಾರಿಗೆ ವಿವರಗಳನ್ನು ಪಡೆಯಿರಿ.'
              : 'Interactive real-boundary cartography: Explore Karnataka’s 27 districts, all 36 Indian states, and global expedition countries with guaranteed satvik pure veg dining and chauffeur logistics.'}
          </p>

          {/* Tier Switcher Segmented Control */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#0D1F15]/90 border border-[#D4AF37]/40 shadow-[0_12px_32px_rgba(0,0,0,0.5)] mt-8 max-w-full overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]">
            {tiers.map((t) => {
              const active = activeTier === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTierChange(t.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap z-10 ${
                    active
                      ? 'text-[#07130C] font-bold shadow-md'
                      : 'text-[#F6F3EA]/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-map-tier"
                      transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] -z-10"
                    />
                  )}
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      active ? 'text-[#07130C]/80' : 'text-[#D4AF37]'
                    }`}
                  >
                    {t.num}
                  </span>
                  <span>{isKn ? t.labelKn : t.labelEn}</span>
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      active ? 'text-[#07130C]' : 'text-[#D4AF37]/70'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Real Geographic Canvas (Left) + Detailed Destination Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN (7 COLS): Real Geographic SVG Map Canvas & Quick Select */}
          <div className="lg:col-span-7 bg-[#0D1F15]/80 backdrop-blur-xl rounded-3xl border border-[#D4AF37]/35 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
            {/* Top Bar with Status & Interactive Hover Readout */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#F5D77F]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="uppercase tracking-wider font-bold">
                  {activeTier === 'karnataka'
                    ? (isKn ? 'ಕರ್ನಾಟಕ ರಾಜ್ಯದ ಅಧಿಕೃತ ನಕ್ಷೆ (೨೭ ಜಿಲ್ಲೆಗಳು)' : 'Official Karnataka Map (27 Survey Districts)')
                    : activeTier === 'india'
                    ? (isKn ? 'ಭಾರತದ ಅಧಿಕೃತ ನಕ್ಷೆ (೩೬ ರಾಜ್ಯಗಳು & ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ)' : 'Official Map of India (36 States & UTs)')
                    : (isKn ? 'ಅಧಿಕೃತ ವಿಶ್ವ ನಕ್ಷೆ & ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪಯಣಗಳು' : 'Official World Map & Global Flight Horizons')}
                </span>
              </div>
              <span className="text-[11px] text-[#F5D77F] font-mono font-semibold">
                {hoveredEntityName || (activeTier === 'karnataka' ? 'Click any district' : activeTier === 'india' ? 'Click any state' : 'Click any country')}
              </span>
            </div>

            {/* REAL GEOGRAPHIC SVG MAP CONTAINER */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#07130C]/90 rounded-2xl border border-[#D4AF37]/20 overflow-hidden flex items-center justify-center p-2 sm:p-4 group">
              {/* Subtle background compass & lat-long coordinate markings */}
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                <div className="w-72 h-72 border border-[#D4AF37] rounded-full" />
                <div className="w-[420px] h-[420px] border border-[#D4AF37]/50 rounded-full" />
                <div className="absolute w-full h-px bg-[#D4AF37]/40" />
                <div className="absolute h-full w-px bg-[#D4AF37]/40" />
              </div>

              {/* TIER 1: AUTHENTIC KARNATAKA MAP (27 DISTRICT BOUNDARIES) */}
              {activeTier === 'karnataka' && (
                <svg
                  viewBox="0 0 500 650"
                  className="w-full h-full max-h-[420px] drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)] transition-all duration-500"
                >
                  <g className="karnataka-districts-group">
                    {KARNATAKA_DISTRICTS.map((district) => {
                      const isDistrictInActiveRegion =
                        activeRegion.entityIds.includes(district.id) ||
                        activeRegion.id === district.circuitId;

                      return (
                        <path
                          key={district.id}
                          id={district.id}
                          d={district.path}
                          fill={
                            isDistrictInActiveRegion
                              ? '#D4AF37'
                              : '#12251B'
                          }
                          fillOpacity={isDistrictInActiveRegion ? 0.35 : 0.75}
                          stroke={
                            isDistrictInActiveRegion
                              ? '#F5D77F'
                              : '#2A4637'
                          }
                          strokeWidth={isDistrictInActiveRegion ? '1.8' : '0.8'}
                          className="transition-all duration-200 cursor-pointer hover:fill-[#D4AF37]/45 hover:stroke-[#F5D77F]"
                          onMouseEnter={() => setHoveredEntityName(`District: ${district.name}`)}
                          onMouseLeave={() => setHoveredEntityName(null)}
                          onClick={() => handleDistrictClick(district.id, district.circuitId)}
                        >
                          <title>{district.name} District, Karnataka</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Bengaluru Gateway Hub Indicator */}
                  <g className="bengaluru-gateway pointer-events-none">
                    <circle cx="325" cy="510" r="3.5" fill="#F5D77F" stroke="#07130C" strokeWidth="1" />
                    <text x="333" y="513" fontSize="8" fill="#F6F3EA" fontWeight="bold" opacity="0.8">
                      {isKn ? 'ಬೆಂಗಳೂರು' : 'Bengaluru'}
                    </text>
                  </g>

                  {/* Interactive Glowing Destination Pins for Karnataka */}
                  {tierDestinations.map((dest) => {
                    const isSelected = dest.id === activeRegion.id;
                    const { x, y } = dest.pinCoords;

                    return (
                      <g
                        key={dest.id}
                        onClick={() => setActiveRegionId(dest.id)}
                        className="cursor-pointer group"
                        tabIndex={0}
                        role="button"
                        aria-label={isKn ? dest.nameKn : dest.nameEn}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveRegionId(dest.id);
                          }
                        }}
                      >
                        {/* Radiating Radar Wave on Selected */}
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="16"
                            fill="#D4AF37"
                            fillOpacity="0.25"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer Glow Halo */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 9 : 6.5}
                          fill={isSelected ? '#F5D77F' : '#D4AF37'}
                          stroke="#07130C"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:scale-125 shadow-lg"
                        />

                        {/* Core Dot */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 4 : 2.5}
                          fill={isSelected ? '#07130C' : '#FFFFFF'}
                        />

                        {/* Pin Destination Label with Drop Shadow */}
                        <text
                          x={x}
                          y={y > 550 ? y - 10 : y + 15}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight={isSelected ? 'bold' : '600'}
                          fill={isSelected ? '#F5D77F' : '#FFFFFF'}
                          className="select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                        >
                          {isKn ? dest.nameKn.split(' ')[0] : dest.nameEn.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* TIER 2: AUTHENTIC INDIA MAP (36 STATES & UNION TERRITORIES) */}
              {activeTier === 'india' && (
                <svg
                  viewBox="0 0 612 696"
                  className="w-full h-full max-h-[420px] drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)] transition-all duration-500"
                >
                  <g className="india-states-group">
                    {INDIA_STATES.map((state) => {
                      const isStateInActiveRegion = activeRegion.entityIds.includes(state.id);

                      return (
                        <path
                          key={state.id}
                          id={state.id}
                          d={state.path}
                          fill={
                            isStateInActiveRegion
                              ? '#D4AF37'
                              : state.id === 'ka'
                              ? '#1E3A2B'
                              : '#12251B'
                          }
                          fillOpacity={isStateInActiveRegion ? 0.45 : state.id === 'ka' ? 0.8 : 0.75}
                          stroke={
                            isStateInActiveRegion
                              ? '#F5D77F'
                              : state.id === 'ka'
                              ? '#D4AF37'
                              : '#2A4637'
                          }
                          strokeWidth={isStateInActiveRegion ? '1.8' : '0.8'}
                          className="transition-all duration-200 cursor-pointer hover:fill-[#D4AF37]/45 hover:stroke-[#F5D77F]"
                          onMouseEnter={() => setHoveredEntityName(`State: ${state.name}`)}
                          onMouseLeave={() => setHoveredEntityName(null)}
                          onClick={() => handleStateClick(state.id)}
                        >
                          <title>{state.name}</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Connecting Domestic Routes / Corridors */}
                  <path
                    d="M 210,525 Q 180,400 165,275 M 210,525 Q 215,570 215,615 M 210,525 Q 240,330 210,145 M 210,525 Q 260,380 290,265 M 210,525 L 155,495"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    strokeOpacity="0.4"
                    className="pointer-events-none"
                  />

                  {/* Interactive Glowing Destination Pins for India */}
                  {tierDestinations.map((dest) => {
                    const isSelected = dest.id === activeRegion.id;
                    const { x, y } = dest.pinCoords;

                    return (
                      <g
                        key={dest.id}
                        onClick={() => setActiveRegionId(dest.id)}
                        className="cursor-pointer group"
                        tabIndex={0}
                        role="button"
                        aria-label={isKn ? dest.nameKn : dest.nameEn}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveRegionId(dest.id);
                          }
                        }}
                      >
                        {/* Radiating Wave */}
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="18"
                            fill="#D4AF37"
                            fillOpacity="0.28"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer Glow Halo */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 10 : 7}
                          fill={isSelected ? '#F5D77F' : '#D4AF37'}
                          stroke="#07130C"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:scale-125 shadow-lg"
                        />

                        {/* Core Dot */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 4.5 : 3}
                          fill={isSelected ? '#07130C' : '#FFFFFF'}
                        />

                        {/* Pin Destination Label */}
                        <text
                          x={x}
                          y={y > 600 ? y - 11 : y + 16}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight={isSelected ? 'bold' : '600'}
                          fill={isSelected ? '#F5D77F' : '#FFFFFF'}
                          className="select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                        >
                          {isKn ? dest.nameKn.split(' ')[0] : dest.nameEn.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* TIER 3: AUTHENTIC WORLD MAP (143 COUNTRIES & CONTINENTAL SHAPES) */}
              {activeTier === 'international' && (
                <svg
                  viewBox="30.767 241.591 784.077 458.627"
                  className="w-full h-full max-h-[420px] drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)] transition-all duration-500"
                >
                  <g className="world-countries-group">
                    {WORLD_COUNTRIES.map((country) => {
                      const isCountryInActiveRegion = activeRegion.entityIds.includes(country.id);
                      const isHomeIndia = country.id === 'in';

                      return (
                        <path
                          key={country.id}
                          id={country.id}
                          d={country.path}
                          fill={
                            isCountryInActiveRegion
                              ? '#D4AF37'
                              : isHomeIndia
                              ? '#1E3A2B'
                              : '#12251B'
                          }
                          fillOpacity={isCountryInActiveRegion ? 0.6 : isHomeIndia ? 0.85 : 0.65}
                          stroke={
                            isCountryInActiveRegion
                              ? '#F5D77F'
                              : isHomeIndia
                              ? '#D4AF37'
                              : '#2A4637'
                          }
                          strokeWidth={isCountryInActiveRegion ? '1.5' : isHomeIndia ? '1.2' : '0.5'}
                          className="transition-all duration-200 cursor-pointer hover:fill-[#D4AF37]/50 hover:stroke-[#F5D77F]"
                          onMouseEnter={() => setHoveredEntityName(`Nation: ${country.id.toUpperCase()}`)}
                          onMouseLeave={() => setHoveredEntityName(null)}
                          onClick={() => handleCountryClick(country.id)}
                        />
                      );
                    })}
                  </g>

                  {/* Curved Flight Trajectories originating from India (x: 540, y: 430) */}
                  <g className="international-flight-arcs pointer-events-none">
                    {/* India to Vietnam */}
                    <path
                      d="M 540,430 Q 585,420 625,450"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.2"
                      strokeDasharray="3 2"
                      strokeOpacity="0.75"
                    />
                    {/* India to Bali */}
                    <path
                      d="M 540,430 Q 600,480 660,535"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.2"
                      strokeDasharray="3 2"
                      strokeOpacity="0.75"
                    />
                    {/* India to Japan */}
                    <path
                      d="M 540,430 Q 620,380 705,395"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.2"
                      strokeDasharray="3 2"
                      strokeOpacity="0.75"
                    />
                    {/* India to Dubai */}
                    <path
                      d="M 540,430 Q 510,410 485,420"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.2"
                      strokeDasharray="3 2"
                      strokeOpacity="0.75"
                    />
                  </g>

                  {/* India Home Base Marker */}
                  <g className="india-home-pin pointer-events-none">
                    <circle cx="540" cy="430" r="5" fill="#1E3A2B" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="540" cy="430" r="2" fill="#F5D77F" />
                    <text x="540" y="444" textAnchor="middle" fontSize="9" fill="#F5D77F" fontWeight="bold">
                      {isKn ? 'ಭಾರತ (ಮೂಲ)' : 'India (Origin)'}
                    </text>
                  </g>

                  {/* Interactive International Destination Pins */}
                  {tierDestinations.map((dest) => {
                    const isSelected = dest.id === activeRegion.id;
                    const { x, y } = dest.pinCoords;

                    return (
                      <g
                        key={dest.id}
                        onClick={() => setActiveRegionId(dest.id)}
                        className="cursor-pointer group"
                        tabIndex={0}
                        role="button"
                        aria-label={isKn ? dest.nameKn : dest.nameEn}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveRegionId(dest.id);
                          }
                        }}
                      >
                        {/* Radiating Wave */}
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="16"
                            fill="#D4AF37"
                            fillOpacity="0.3"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer Glow Halo */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 9 : 6.5}
                          fill={isSelected ? '#F5D77F' : '#D4AF37'}
                          stroke="#07130C"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:scale-125 shadow-lg"
                        />

                        {/* Core Dot */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 4 : 2.5}
                          fill={isSelected ? '#07130C' : '#FFFFFF'}
                        />

                        {/* Pin Destination Label */}
                        <text
                          x={x}
                          y={y > 500 ? y - 10 : y + 15}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight={isSelected ? 'bold' : '600'}
                          fill={isSelected ? '#F5D77F' : '#FFFFFF'}
                          className="select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                        >
                          {isKn ? dest.nameKn.split(' ')[0] : dest.nameEn.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Bottom Region Quick-Select Pills */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mr-1">
                {isKn ? 'ತ್ವರಿತ ತಾಣ ಆಯ್ಕೆ:' : 'Quick Select:'}
              </span>
              {tierDestinations.map((dest) => {
                const isSelected = dest.id === activeRegion.id;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setActiveRegionId(dest.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#07130C] font-bold shadow-md scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{isKn ? dest.nameKn : dest.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (5 COLS): Active Region Detailed Dossier & Direct Actions */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="bg-[#0D1F15] rounded-3xl border border-[#D4AF37]/45 p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  {/* Destination Photo Card with Badge */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/30 shadow-inner group">
                    <img
                      src={activeRegion.image}
                      alt={isKn ? activeRegion.nameKn : activeRegion.nameEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07130C] via-[#07130C]/30 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#07130C]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#F5D77F] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {isKn ? activeRegion.tagKn : activeRegion.tagEn}
                      </span>
                    </div>

                    {/* Image Footer with Location */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                      <span className="font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {isKn ? activeRegion.nameKn : activeRegion.nameEn}
                      </span>
                      <span className="text-[11px] text-[#F5D77F] font-mono font-bold">
                        {isKn ? activeRegion.durationKn : activeRegion.durationEn}
                      </span>
                    </div>
                  </div>

                  {/* Heading & Summary */}
                  <h3
                    className={`text-xl sm:text-2xl font-bold font-serif-editorial text-white mb-2 leading-tight ${
                      isKn ? 'font-kannada-serif' : ''
                    }`}
                  >
                    {isKn ? activeRegion.nameKn : activeRegion.nameEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                    {isKn ? activeRegion.summaryKn : activeRegion.summaryEn}
                  </p>

                  {/* 3 Core Inchara Pillars: Duration, Logistics & Satvik Dining */}
                  <div className="space-y-2.5 mb-5 p-3.5 rounded-xl bg-black/25 border border-white/10 text-xs">
                    <div className="flex items-start gap-2.5 text-white/90">
                      <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#F5D77F] font-semibold">
                          {isKn ? 'ಅವಧಿ: ' : 'Ideal Duration: '}
                        </span>
                        <span>{isKn ? activeRegion.durationKn : activeRegion.durationEn}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-white/90">
                      <Car className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#F5D77F] font-semibold">
                          {isKn ? 'ಸಾರಿಗೆ: ' : 'Logistics: '}
                        </span>
                        <span>{isKn ? activeRegion.transitKn : activeRegion.transitEn}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-white/90">
                      <UtensilsCrossed className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#F5D77F] font-semibold">
                          {isKn ? 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರ: ' : 'Pure Veg Guarantee: '}
                        </span>
                        <span>{isKn ? activeRegion.diningKn : activeRegion.diningEn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="mb-6">
                    <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                      {isKn ? 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು:' : 'Key Tour Highlights:'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {(isKn ? activeRegion.highlightsKn : activeRegion.highlightsEn).map(
                        (h, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-xs text-[#F6F3EA]/85"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onEnquire(
                        'holidays',
                        isKn ? activeRegion.nameKn : activeRegion.nameEn
                      )
                    }
                    className="gold-button w-full sm:flex-1 py-3 px-5 text-xs font-bold uppercase tracking-wider rounded-xl inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>
                      {isKn
                        ? `${activeRegion.nameKn.split(' ')[0]} ಪ್ರವಾಸ ರೂಪಿಸಿ`
                        : `Plan Trip to ${activeRegion.nameEn.split(' ')[0]}`}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/919900000000?text=${encodeURIComponent(
                      `Hello Inchara Holidays, I would like to plan a bespoke holiday tour to ${activeRegion.nameEn} (${activeRegion.durationEn}). Please share details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-button w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 border-white/20 hover:border-[#25D366] text-white hover:text-[#25D366] transition-colors cursor-pointer"
                    title={isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ' : 'Chat on WhatsApp'}
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
