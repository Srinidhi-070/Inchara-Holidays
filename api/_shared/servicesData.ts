/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceCategoryDef } from './types.js';

/**
 * Inchara Holidays - 6 Comprehensive Service Categories & Sub-Services
 * Richly annotated in Kannada & English reflecting Karnataka cultural hospitality.
 */
export const serviceCategories: ServiceCategoryDef[] = [
  {
    id: 'holidays',
    displayOrder: 1,
    isActive: true,
    titleKn: 'ರಜಾದಿನದ ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ಗಳು',
    titleEn: 'Holiday Packages',
    taglineKn: 'ವೈಯಕ್ತಿಕ ಹಾಗೂ ಆಪ್ತ ರಜಾದಿನಗಳ ಅನುಭವ',
    taglineEn: 'Bespoke Curated & Pre-Organised Journeys',
    descriptionKn: 'ದೇಶೀಯ ಪ್ರವಾಸಗಳು, ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪಯಣಗಳು, ಪೂರ್ವ ನಿಯೋಜಿತ ಹಾಗೂ ನಿಮ್ಮ ಆಸಕ್ತಿಗೆ ತಕ್ಕಂತೆ ರೂಪಿಸಿದ ವೈಯಕ್ತಿಕ ರಜಾದಿನಗಳು.',
    descriptionEn: 'Tailored domestic escapes, world-class international getaways, ready-to-book itineraries, and customized vacations for families and groups.',
    badgeKn: 'ಹೆರಿಟೇಜ್ & ಪ್ರಕೃತಿ',
    badgeEn: 'Heritage & Leisure',
    iconName: 'Compass',
    image: '/images/hero_western_ghats_1791795450720.jpg',
    services: [
      {
        id: 'domestic_tours',
        categoryId: 'holidays',
        titleKn: 'ದೇಶೀಯ ಪ್ರವಾಸಗಳು (ಕರ್ನಾಟಕ & ಭಾರತ)',
        titleEn: 'Domestic Tours (Karnataka & Pan-India)',
        summaryKn: 'ಹಂಪಿ, ಬಾದಾಮಿ, ಮಲೆನಾಡು, ಕೇರಳ ಹಿನ್ನೀರು, ಗೋಲ್ಡನ್ ಟ್ರಯಾಂಗಲ್ ಮತ್ತು ಕಾಶ್ಮೀರದವರೆಗೆ ಸುಂದರ ಪಯಣಗಳು.',
        summaryEn: 'Comprehensive domestic circuits from Hampi and Malnad to Kerala backwaters and the Golden Triangle.',
        detailsKn: [
          'ಕರ್ನಾಟಕದ ಪಾರಂಪರಿಕ ಸರ್ಕ್ಯೂಟ್ (ಹಂಪಿ, ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಬೇಲೂರು-ಹಳೇಬೀಡು)',
          'ಮಲೆನಾಡು & ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ವಿಶ್ರಾಂತಿ (ಚಿಕ್ಕಮಗಳೂರು, ಕೂರ್ಗ್, ಶರಾವತಿ ಕಣಿವೆ)',
          'ದಕ್ಷಿಣ & ಉತ್ತರ ಭಾರತದ ಪ್ರಸಿದ್ಧ ತಾಣಗಳು (ಕೇರಳ, ತಮಿಳುನಾಡು, ರಾಜಸ್ಥಾನ, ಹಿಮಾಚಲ)',
          'ಆಪ್ತ ಚಾಲಕ-ಮಾರ್ಗದರ್ಶಕರ ಖಾಸಗಿ ಹವಾನಿಯಂತ್ರಿತ ವಾಹನ ಸಾರಿಗೆ'
        ],
        detailsEn: [
          'Karnataka UNESCO Heritage Circuits (Hampi, Badami, Pattadakal, Belur-Halebidu)',
          'Western Ghats Eco-Retreats (Chikmagalur, Coorg, Wayanad)',
          'Pan-India Signature Routes (Kerala, Tamil Nadu, Rajasthan, Himachal)',
          'Private sanitized vehicle with experienced chauffeur-guide'
        ],
        highlightsKn: ['ಹೋಮ್‌ಸ್ಟೇ & ಹೆರಿಟೇಜ್ ರೆಸಾರ್ಟ್‌ಗಳು', 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಊಟೋಪಚಾರ', '೨೪/೭ ಪ್ರಯಾಣ ಸಹಾಯ'],
        highlightsEn: ['Heritage Resorts & Homestays', 'Pure Veg Dining Guidance', '24/7 Journey Support']
      },
      {
        id: 'international_tours',
        categoryId: 'holidays',
        titleKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸಗಳು',
        titleEn: 'International Tours',
        summaryKn: 'ದುಬೈ, ಸಿಂಗಾಪುರ, ಮಲೇಷ್ಯಾ, ಬಾಲಿ, ಥಾಯ್ಲೆಂಡ್ ಮತ್ತು ಯೂರೋಪ್ — ಸಂಪೂರ್ಣ ವೀಸಾ ಹಾಗೂ ಸಂಯೋಜನೆಯೊಂದಿಗೆ.',
        summaryEn: 'Curated international escapes to Dubai, Bali, Singapore, Southeast Asia, and Europe with full visa assistance.',
        detailsKn: [
          'ದುಬೈ ಮತ್ತು ಮಧ್ಯಪ್ರಾಚ್ಯ ಸಫಾರಿ & ನಗರ ಪ್ರವಾಸ',
          'ಆಗ್ನೇಯ ಏಷ್ಯಾ ರಜಾದಿನಗಳು (ಸಿಂಗಾಪುರ, ಮಲೇಷ್ಯಾ, ಥಾಯ್ಲೆಂಡ್, ಬಾಲಿ)',
          'ವೀಸಾ ಮಾರ್ಗದರ್ಶನ, ವಿಮಾನ ಬುಕಿಂಗ್ ಸಮಾಲೋಚನೆ & ಪ್ರವಾಸಿ ವಿಮೆ ಬೆಂಬಲ',
          'ಕನ್ನಡಿಗ ಪ್ರವಾಸಿಗರ ಆಹಾರ ಅಗತ್ಯತೆಗಳ ಪೂರ್ಣ ಕಾಳಜಿ'
        ],
        detailsEn: [
          'Dubai & Middle East Dunes, Skylines & Luxury Safaris',
          'Southeast Asia Island & Cultural Escapes (Singapore, Bali, Thailand)',
          'Tourist Visa Guidance, Flight Coordination & Travel Insurance',
          'Tailored dietary support with trusted Indian dining arrangements'
        ],
        highlightsKn: ['ವೀಸಾ ಸಮಾಲೋಚನೆ', 'ಅಂತರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನೆರವು', 'ಖಾಸಗಿ/ಗುಂಪು ಆಯ್ಕೆಗಳು'],
        highlightsEn: ['Visa Consultation', 'Flight Assistance', 'Private/Group Options'],
        isAssistanceOnly: true,
        inquiryNoticeKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸಗಳಿಗೆ ವೀಸಾ ಹಾಗೂ ಟಿಕೆಟಿಂಗ್ ಸಲಹಾ ನೆರವು ನೀಡಲಾಗುತ್ತದೆ.',
        inquiryNoticeEn: 'International tours include verified consultation, itinerary planning, and visa processing guidance.'
      },
      {
        id: 'pre_organised_packages',
        categoryId: 'holidays',
        titleKn: 'ಪೂರ್ವ ನಿಯೋಜಿತ ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ಗಳು',
        titleEn: 'Pre-Organised Fixed Departure Packages',
        summaryKn: 'ನಿಖರ ದಿನಚರಿ, ಮುಂಚಿತವಾಗಿ ಕಾಯ್ದಿರಿಸಿದ ಉತ್ತಮ ವಾಸ್ತವ್ಯ ಮತ್ತು ಸಮತೋಲಿತ ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳ ಪಟ್ಟಿ.',
        summaryEn: 'Fixed-duration, thoughtfully paced packages with handpicked resorts, verified guides, and seamless transfers.',
        detailsKn: [
          '೪ ರಿಂದ ೭ ದಿನಗಳ ನಿಖರ ಯೋಜಿತ ಪ್ರವಾಸಗಳು',
          'ಮುಂಚಿತವಾಗಿ ಪರಿಶೀಲಿಸಿದ ಪ್ರೀಮಿಯಂ ಹೋಟೆಲ್ ಹಾಗೂ ಹೋಮ್‌ಸ್ಟೇ ವಾಸ್ತವ್ಯ',
          'ಸ್ಮಾರಕ ಪ್ರವೇಶ ಹಾಗೂ ನಿಗದಿತ ಸಮಯದ ಪ್ರವಾಸ ನಿರ್ವಹಣೆ',
          'ಬೆಸ್ಟ್ ಸೀಸನ್ ಆಧಾರಿತ ಪ್ರವಾಸ ದಿನಾಂಕಗಳು'
        ],
        detailsEn: [
          '4 to 7-day masterfully choreographed itineraries',
          'Pre-audited boutique hotel and plantation bungalow stays',
          'Monument entry arrangements and synchronized sightseeing schedules',
          'Optimal seasonal timing for weather and local cultural festivals'
        ],
        highlightsKn: ['ನಿಶ್ಚಿತ ದಿನಾಂಕಗಳು', 'ಪಾರದರ್ಶಕ ದರ ವಿವರ', 'ತಜ್ಞ ಸಂಯೋಜಕರು'],
        highlightsEn: ['Fixed Dates', 'Transparent Costs', 'Expert Coordinators']
      },
      {
        id: 'customised_packages',
        categoryId: 'holidays',
        titleKn: 'ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಪ್ರವಾಸ ಯೋಜನೆ',
        titleEn: 'Customised Bespoke Packages',
        summaryKn: 'ನಿಮ್ಮ ವೇಗ, ಬಜೆಟ್ ಮತ್ತು ಇಷ್ಟದ ಸ್ಥಳಗಳಿಗೆ ತಕ್ಕಂತೆ ಶೂನ್ಯ ಒತ್ತಡದ ವೈಯಕ್ತಿಕ ಪ್ರವಾಸ ವಿನ್ಯಾಸ.',
        summaryEn: 'Zero-pressure itinerary customization built entirely around your preferred pace, interests, dates, and budget tier.',
        detailsKn: [
          'ಪ್ರತಿಯೊಂದು ದಿನದ ಸಮಯ ಮತ್ತು ಸ್ಥಳಗಳ ನಿಮ್ಮದೇ ಆದ್ಯತೆ',
          'ಕುಟುಂಬದ ಹಿರಿಯರು ಮತ್ತು ಮಕ್ಕಳ ಅಗತ್ಯಗಳಿಗೆ ವಿಶೇಷ ಗಮನ',
          'ನಿಮ್ಮ ಆಯ್ಕೆಯ ವಾಹನ ಮತ್ತು ವಾಸ್ತವ್ಯ ಶ್ರೇಣಿ',
          'ಯಾವುದೇ ಕಡ್ಡಾಯ ಷರತ್ತುಗಳಿಲ್ಲದ ಮುಕ್ತ ಸಮಾಲೋಚನೆ'
        ],
        detailsEn: [
          'Tailored day-by-day pacing with full itinerary flexibility',
          'Special comfort adjustments for seniors and young children',
          'Choice of preferred transit vehicle class and stay category',
          'Consultative itinerary crafting with direct travel planners'
        ],
        highlightsKn: ['೧೦೦% ಕಸ್ಟಮೈಸ್ಡ್', 'ಹೊಂದಿಕೊಳ್ಳುವ ಸಮಯ', 'ಆಪ್ತ ಪ್ಲಾನಿಂಗ್'],
        highlightsEn: ['100% Tailored', 'Flexible Pacing', 'Dedicated Planner']
      },
      {
        id: 'family_group_holidays',
        categoryId: 'holidays',
        titleKn: 'ಕುಟುಂಬ ಮತ್ತು ಆಪ್ತ ಗುಂಪು ರಜಾದಿನಗಳು',
        titleEn: 'Family & Group Holidays',
        summaryKn: 'ಎಲ್ಲಾ ವಯೋಮಾನದವರಿಗೂ ಹಿತಕರವಾದ ವಿಶಾಲ ವಾಹನಗಳು, ಕನೆಕ್ಟೆಡ್ ಕೊಠಡಿಗಳು ಮತ್ತು ಹಿತಮಿತ ದಿನಚರಿ.',
        summaryEn: 'Spacious multi-generation family retreats with interconnected rooms, comfortable tempo travellers, and relaxed pacing.',
        detailsKn: [
          '೬ ರಿಂದ ೩೦ ಜನರ ಕುಟುಂಬ ಗುಂಪುಗಳಿಗೆ ವಿಶೇಷ ಪ್ಯಾಕೇಜ್‌ಗಳು',
          'ದೊಡ್ಡ ವಾಹನಗಳು (ಟೆಂಪೋ ಟ್ರಾವೆಲರ್ / ಮಿನಿ ಬಸ್ಸು)',
          'ಮಕ್ಕಳ ವಿನೋದ ಮತ್ತು ಹಿರಿಯರ ಆರಾಮದಾಯಕ ಪಯಣ',
          'ಖಾಸಗಿ ಕ್ಯಾಂಪ್‌ಫೈರ್ ಹಾಗೂ ಕುಟುಂಬ ಕೂಟಗಳ ಆಯೋಜನೆ'
        ],
        detailsEn: [
          'Custom packages for groups of 6 to 30 family members and friends',
          'Spacious group vehicles (Tempo Travellers and Executive Mini Buses)',
          'Thoughtfully balanced activities for children and elderly travelers',
          'Private campfires, estate strolls, and family gatherings'
        ],
        highlightsKn: ['ಕುಟುಂಬ ಸ್ನೇಹಿ', 'ದೊಡ್ಡ ವಾಹನಗಳು', 'ಹಿತಕರ ವೇಗ'],
        highlightsEn: ['Family-Friendly', 'Spacious Vehicles', 'Unhurried Flow']
      }
    ]
  },
  {
    id: 'educational',
    displayOrder: 2,
    isActive: true,
    titleKn: 'ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಕೈಗಾರಿಕಾ ಪ್ರವಾಸಗಳು',
    titleEn: 'Educational & Industrial Tours',
    taglineKn: 'ಕಲಿಕೆ, ಸಂಶೋಧನೆ ಮತ್ತು ನಿಷ್ಠ ಸುರಕ್ಷತೆ',
    taglineEn: 'Curriculum-Aligned Learning Expeditions & Industrial Visits',
    descriptionKn: 'ಶಾಲೆ, ಕಾಲೇಜು ಮತ್ತು ವಿಶ್ವವಿದ್ಯಾಲಯಗಳಿಗಾಗಿ ಅತ್ಯುನ್ನತ ಸುರಕ್ಷತಾ ಮಾನದಂಡಗಳು, ಶಿಸ್ತು ಮತ್ತು ಕೈಗಾರಿಕಾ ಸಂಪರ್ಕಗಳೊಂದಿಗೆ ಆಯೋಜಿತ ಪ್ರವಾಸಗಳು.',
    descriptionEn: 'Structured institutional travel, technical industrial exposures, historical study trips, and safety-audited school expeditions.',
    badgeKn: 'ಸುರಕ್ಷತೆ & ಜ್ಞಾನ',
    badgeEn: 'Safety & Learning',
    iconName: 'GraduationCap',
    image: '/images/hoysala_belur.jpg',
    services: [
      {
        id: 'school_tours',
        categoryId: 'educational',
        titleKn: 'ಶಾಲಾ ಮಕ್ಕಳ ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸಗಳು',
        titleEn: 'School Educational Tours',
        summaryKn: 'ವಿಜ್ಞಾನ ಕೇಂದ್ರಗಳು, ಐತಿಹಾಸಿಕ ಕೋಟೆಗಳು, ನಿಸರ್ಗ ವನ್ಯಧಾಮಗಳು — ಕಟ್ಟುನಿಟ್ಟಿನ ಸುರಕ್ಷತೆಯೊಂದಿಗೆ.',
        summaryEn: 'Age-appropriate heritage, science, and nature study tours with verified safety protocols and 24/7 chaperone support.',
        detailsKn: [
          'ಜಿಪಿಎಸ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಇರುವ ಸುರಕ್ಷಿತ ಶಾಲಾ ಬಸ್ಸುಗಳು & ನುರಿತ ಚಾಲಕರು',
          'ಪ್ರತ್ಯೇಕ ಶಿಕ್ಷಕ-ಸಂಯೋಜಕರ ಉಚಿತ ವಾಸ್ತವ್ಯ ಸೌಲಭ್ಯ',
          'ಆರೋಗ್ಯಕರ, ಪೌಷ್ಟಿಕ ಹಾಗೂ ನೈರ್ಮಲ್ಯಯುತ ಶುದ್ಧ ಊಟ',
          'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ (First-Aid) ಮತ್ತು ತುರ್ತು ವೈದ್ಯಕೀಯ ಸಂಪರ್ಕ ಬೆಂಬಲ'
        ],
        detailsEn: [
          'GPS-tracked executive coaches with speed governors and vetted drivers',
          'Complimentary teacher and faculty chaperone accommodations',
          'Hygienic, freshly prepared, child-friendly vegetarian nutrition',
          'On-board first aid kits, emergency doctor networks, and insurance'
        ],
        highlightsKn: ['ಜಿಪಿಎಸ್ ವಾಹನಗಳು', 'ಪೌಷ್ಟಿಕ ಊಟ', '೨೪/೭ ವೈದ್ಯಕೀಯ ನೆಟ್ವರ್ಕ್'],
        highlightsEn: ['GPS Tracked Buses', 'Nutritious Meals', 'Medical Protocols']
      },
      {
        id: 'college_tours',
        categoryId: 'educational',
        titleKn: 'ಕಾಲೇಜು & ಯೂನಿವರ್ಸಿಟಿ ಪ್ರವಾಸಗಳು',
        titleEn: 'College & University Study Tours',
        summaryKn: 'ವಾಸ್ತುಶಿಲ್ಪ, ಪರಿಸರ ವಿಜ್ಞಾನ, ಕಲೆ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ಆಳವಾದ ಅಧ್ಯಯನ ಪ್ರವಾಸಗಳು.',
        summaryEn: 'Architecture, ecology, botanical, and cultural field studies combining intellectual rigor with camaraderie.',
        detailsKn: [
          'ವಿವಿಧ ವಿಭಾಗಗಳ ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಪೂರಕವಾದ ತಾಣಗಳ ಆಯ್ಕೆ',
          'ಸ್ಥಳೀಯ ಪ್ರೊಫೆಸರ್‌ಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ಸಂವಾದ',
          'ಬಜೆಟ್-ಸ್ನೇಹಿ ಗ್ರೂಪ್ ದರಗಳು ಹಾಗೂ ಸ್ವಚ್ಛ ವಾಸ್ತವ್ಯ',
          'ಕಾಲೇಜು ಆಡಳಿತ ಮಂಡಳಿಯ ನಿಯಮಗಳಿಗೆ ಪೂರ್ಣ ಬದ್ಧತೆ'
        ],
        detailsEn: [
          'Subject-aligned field destinations (Architecture, Botany, History, Geology)',
          'Sessions with local conservationists, scholars, and field experts',
          'Clean, secure group accommodations with transparent institutional billing',
          'Strict adherence to institutional compliance and authorization protocols'
        ],
        highlightsKn: ['ಪಠ್ಯಕ್ರಮ ಆಧಾರಿತ', 'ಗ್ರೂಪ್ ರಿಯಾಯಿತಿ', 'ಶಿಸ್ತುಬದ್ಧ ಆಯೋಜನೆ'],
        highlightsEn: ['Syllabus-Aligned', 'Group Rates', 'Disciplinary Compliance']
      },
      {
        id: 'industrial_visits',
        categoryId: 'educational',
        titleKn: 'ಕೈಗಾರಿಕಾ ಭೇಟಿಗಳು (Industrial Visits - IV)',
        titleEn: 'Industrial Visits (Technical IV)',
        summaryKn: 'ಉತ್ಪಾದನಾ ಘಟಕಗಳು, ಐಟಿ ಪಾರ್ಕ್‌ಗಳು, ಸಕ್ಕರೆ ಕಾರ್ಖಾನೆಗಳು ಹಾಗೂ ಕೃಷಿ ಸಂಸ್ಕರಣಾ ಕೇಂದ್ರಗಳಿಗೆ ಅಧಿಕೃತ ಭೇಟಿ.',
        summaryEn: 'Official permissions, plant walkthroughs, and technical interaction with leading manufacturing and tech facilities.',
        detailsKn: [
          'ಕೈಗಾರಿಕಾ ಅನುಮತಿ ಪತ್ರಗಳು ಮತ್ತು ಭೇಟಿಯ ಸಮಯ ನಿಗದಿ ನೆರವು',
          'ಮೆಕ್ಯಾನಿಕಲ್, ಸಿವಿಲ್, ಬಯೋಟೆಕ್, ಐಟಿ ಮತ್ತು ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸೂಕ್ತ ತಾಣಗಳು',
          'ಕಾರ್ಖಾನೆಗಳ ಸುರಕ್ಷತಾ ನಿಯಮಾವಳಿಗಳ ಪೂರ್ವ ತರಬೇತಿ',
          'ಭೇಟಿಯ ನಂತರದ ಸಂಕ್ಷಿಪ್ತ ವರದಿ ತಯಾರಿಕಾ ಬೆಂಬಲ'
        ],
        detailsEn: [
          'Liaison for official plant entry permissions and gate passes',
          'Curated facilities for Mechanical, Civil, Biotech, IT, and MBA cohorts',
          'Plant safety protocol briefings prior to factory walkthroughs',
          'Logistical synchronization between factory shifts and student arrivals'
        ],
        highlightsKn: ['ಅಧಿಕೃತ ಅನುಮತಿ ನೆರವು', 'ತಾಂತ್ರಿಕ ಮಾರ್ಗದರ್ಶನ', 'ಸುರಕ್ಷಿತ ಪ್ರವೇಶ'],
        highlightsEn: ['Official Entry Liaison', 'Technical Exposure', 'Safety Compliance']
      },
      {
        id: 'educational_expeditions',
        categoryId: 'educational',
        titleKn: 'ಸಂಶೋಧನಾ & ಕಲಿಕಾ ಪಯಣಗಳು',
        titleEn: 'Educational Field Expeditions',
        summaryKn: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಜೀವವೈವಿಧ್ಯ, ಕಡಲತೀರದ ಪರಿಸರ ವ್ಯವಸ್ಥೆ ಹಾಗೂ ಬುಡಕಟ್ಟು ಪರಂಪರೆಯ ಸಂಶೋಧನಾ ಪಯಣ.',
        summaryEn: 'Deep ecological field expeditions across Western Ghats rainforests, coastal ecosystems, and tribal communities.',
        detailsKn: [
          'ಅರಣ್ಯ ಇಲಾಖೆ ಅನುಮತಿ ಹಾಗೂ ನೈಸರ್ಗಿಕ ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ',
          'ಪಕ್ಷಿ ವೀಕ್ಷಣೆ, ಸಸ್ಯಶಾಸ್ತ್ರ ಮತ್ತು ಮಣ್ಣಿನ ಸಂರಕ್ಷಣಾ ಅಧ್ಯಯನ',
          'ಪರಿಸರ ಸ್ನೇಹಿ ಕ್ಯಾಂಪಿಂಗ್ ಹಾಗೂ ಶೂನ್ಯ ತ್ಯಾಜ್ಯ ನೀತಿ',
          'ರಾತ್ರಿ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆ ಹಾಗೂ ಕ್ಯಾಂಪ್ ಲಾಗ್'
        ],
        detailsEn: [
          'Forest department permissions and expert naturalist guides',
          'Birding trails, botanical taxonomy, and watershed ecology studies',
          'Eco-friendly camping with Leave No Trace environmental ethics',
          'Strict night perimeter security and expedition camp governance'
        ],
        highlightsKn: ['ಜೀವವೈವಿಧ್ಯ ಅಧ್ಯಯನ', 'ಅರಣ್ಯ ಅನುಮತಿ', 'ನೈಸರ್ಗಿಕ ತಜ್ಞರು'],
        highlightsEn: ['Biodiversity Studies', 'Forest Permits', 'Expert Naturalists']
      },
      {
        id: 'institutional_travel',
        categoryId: 'educational',
        titleKn: 'ಸಾಂಸ್ಥಿಕ ಸಾರಿಗೆ & ವಾರ್ಷಿಕ ಪ್ರವಾಸಗಳು',
        titleEn: 'Institutional Annual Travel',
        summaryKn: 'ಶಾಲಾ-ಕಾಲೇಜು ಸಿಬ್ಬಂದಿ, ಶಿಕ್ಷಕರ ತಂಡ ಹಾಗೂ ವಾರ್ಷಿಕ ಕ್ರೀಡಾ-ಸಾಂಸ್ಕೃತಿಕ ತಂಡಗಳ ವಿಶ್ವಾಸಾರ್ಹ ಸಾರಿಗೆ.',
        summaryEn: 'Comprehensive group travel management for faculty retreats, inter-collegiate sports teams, and annual staff tours.',
        detailsKn: [
          'ವಾರ್ಷಿಕ ಒಪ್ಪಂದ ಆಧಾರಿತ ವಿಶೇಷ ಸಾರಿಗೆ ರಿಯಾಯಿತಿ',
          'ಆಡಿಟ್ ಮಾಡಿದ ೩೦ ರಿಂದ ೫೦ ಸೀಟುಗಳ ಲಕ್ಸುರಿ ಕೋಚ್‌ಗಳು',
          'ಸಂಸ್ಥೆಯ ಬಜೆಟ್ ಮಿತಿಯೊಳಗಿನ ಗುಣಮಟ್ಟದ ನಿರ್ವಹಣೆ',
          'ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್ ಹಾಗೂ ಅಧಿಕೃತ ಬಿಲ್ಲಿಂಗ್ ಪಾರದರ್ಶಕತೆ'
        ],
        detailsEn: [
          'Annual institutional contracts with volume pricing benefits',
          'Audited 30 to 50-seater luxury air-conditioned coaches',
          'Strict adherence to institutional budget ceilings without compromising quality',
          'Full GST invoicing and transparent institutional accounting documentation'
        ],
        highlightsKn: ['ಜಿಎಸ್‌ಟಿ ಬಿಲ್ಲಿಂಗ್', 'ದೊಡ್ಡ ಕೋಚ್‌ಗಳು', 'ಸಾಂಸ್ಥಿಕ ವಿಶ್ವಾಸ'],
        highlightsEn: ['GST Invoicing', 'Large Coaches', 'Institutional Trust']
      }
    ]
  },
  {
    id: 'corporate',
    displayOrder: 3,
    isActive: true,
    titleKn: 'ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಈವೆಂಟ್ ಪ್ರವಾಸಗಳು',
    titleEn: 'Corporate & Event Tours',
    taglineKn: 'ಉದ್ದೇಶಪೂರ್ವಕ ಸಭೆಗಳು ಮತ್ತು ಸ್ಮರಣೀಯ ಆಫ್‌ಸೈಟ್‌ಗಳು',
    taglineEn: 'Gather with Purpose, Reconnect & Celebrate',
    descriptionKn: 'ಉದ್ಯೋಗಿಗಳ ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್, ಲೀಡರ್‌ಶಿಪ್ ರಿಟ್ರೀಟ್‌ಗಳು, ವಾರ್ಷಿಕ ಸಮ್ಮೇಳನಗಳು ಹಾಗೂ ಆಯೋಜಿತ ಕಾರ್ಯಕ್ರಮಗಳ ನಿಖರ ನಿರ್ವಹಣೆ.',
    descriptionEn: 'High-impact team offsites, executive leadership retreats, corporate conferences, and end-to-end event management.',
    badgeKn: 'ವೃತ್ತಿಪರತೆ & ಆತಿಥ್ಯ',
    badgeEn: 'Professional & Seamless',
    iconName: 'Briefcase',
    image: '/images/hero_western_ghats_1791795450720.jpg',
    services: [
      {
        id: 'corporate_tours',
        categoryId: 'corporate',
        titleKn: 'ಕಾರ್ಪೊರೇಟ್ ಪ್ರವಾಸಗಳು & ಡೇ-ಔಟಿಂಗ್',
        titleEn: 'Corporate Team Outings & Day Trips',
        summaryKn: 'ಬೆಂಗಳೂರು ಹಾಗೂ ಮೈಸೂರು ಸುತ್ತಮುತ್ತಲಿನ ಸುಂದರ ರೆಸಾರ್ಟ್‌ಗಳಲ್ಲಿ ಒತ್ತಡ ಮುಕ್ತ ದಿನದ ಔಟಿಂಗ್.',
        summaryEn: 'Refreshing single-day or weekend retreats near Bengaluru, Mysore, and Coorg for stress-free team bonding.',
        detailsKn: [
          'ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್ ಆಟಗಳು, ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್, ಇನ್‌ಡೋರ್ & ಔಟ್‌ಡೋರ್ ಕ್ರೀಡೆಗಳು',
          'ಉಪಹಾರ, ಭೋಜನ ಮತ್ತು ಸಂಜೆ ಹೈ-ಟೀ ಒಳಗೊಂಡ ಸಂಪೂರ್ಣ ದಿನದ ಪ್ಯಾಕೇಜ್',
          'ಕಂಪನಿ ಕಚೇರಿಯಿಂದ ನೇರ ಎಸಿ ಬಸ್ ಸಾರಿಗೆ ಪಿಕ್-ಅಪ್ ಮತ್ತು ಡ್ರಾಪ್',
          'ದೊಡ್ಡ ಹಾಗೂ ಸಣ್ಣ ತಂಡಗಳಿಗೆ ಸೂಕ್ತ ರೆಸಾರ್ಟ್ ಶಿಫಾರಸು'
        ],
        detailsEn: [
          'Curated team building games, rope courses, swimming, and outdoor sports',
          'Full-day gourmet catering package: breakfast, banquet lunch, and high-tea',
          'Doorstep air-conditioned executive coach pickup and return',
          'Handpicked resort options suited for both small teams and 200+ cohorts'
        ],
        highlightsKn: ['ರೆಸಾರ್ಟ್ ಆಯ್ಕೆಗಳು', 'ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್', 'ಡೋರ್‌ಸ್ಟೆಪ್ ಪಿಕ್-ಅಪ್'],
        highlightsEn: ['Resort Selection', 'Team Activities', 'Doorstep Transit']
      },
      {
        id: 'corporate_retreats',
        categoryId: 'corporate',
        titleKn: 'ಲೀಡರ್‌ಶಿಪ್ ರಿಟ್ರೀಟ್‌ಗಳು & ಆಫ್‌ಸೈಟ್‌ಗಳು',
        titleEn: 'Executive Leadership Retreats & Offsites',
        summaryKn: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪ್ರಶಾಂತ ತಾಣಗಳಲ್ಲಿ ಸಂಸ್ಥೆಯ ಮುಂದಿನ ಗುರಿಗಳನ್ನು ರೂಪಿಸಲು ಶಾಂತ ವಾತಾವರಣ.',
        summaryEn: 'Serene, distraction-free plantation retreats and luxury eco-resorts for leadership strategy sessions.',
        detailsKn: [
          'ಹೈ-ಸ್ಪೀಡ್ ವೈಫೈ ಹಾಗೂ ಆಡಿಯೋ-ವಿಶುವಲ್ ಕಾನ್ಫರೆನ್ಸ್ ಸೌಲಭ್ಯ',
          'ಖಾಸಗಿ ಕಾಟೇಜ್‌ಗಳು ಮತ್ತು ಪ್ರೀಮಿಯಂ ಹಾಸ್ಪಿಟಾಲಿಟಿ',
          'ಸಂಜೆ ಲೈಟ್ ಮ್ಯೂಸಿಕ್, ಬಾರ್ಬೆಕ್ಯೂ ಹಾಗೂ ನೆಟ್‌ವರ್ಕಿಂಗ್ ಡಿನ್ನರ್',
          'ಪೂರ್ಣ ಗೌಪ್ಯತೆ ಮತ್ತು ಪ್ರಶಾಂತ ನೈಸರ್ಗಿಕ ಪರಿಸರ'
        ],
        detailsEn: [
          'High-speed Wi-Fi, projectors, audio-visual conference hall setups',
          'Private plantation cottages and premium concierge hospitality',
          'Evening starlit networking, bespoke barbecue, and live acoustic music',
          'Absolute privacy and serene natural immersion for strategic clarity'
        ],
        highlightsKn: ['ಕಾನ್ಫರೆನ್ಸ್ ಸೌಲಭ್ಯ', 'ಪ್ರೀಮಿಯಂ ವಾಸ್ತವ್ಯ', 'ಪೂರ್ಣ ಗೌಪ್ಯತೆ'],
        highlightsEn: ['AV Facilities', 'Premium Living', 'Absolute Privacy']
      },
      {
        id: 'organised_event_tours',
        categoryId: 'corporate',
        titleKn: 'ಆಯೋಜಿತ ಈವೆಂಟ್ ಟೂರ್ಸ್ & ಸಮ್ಮೇಳನಗಳು',
        titleEn: 'Organised Event Tours & Conferences',
        summaryKn: 'ಕಾರ್ಪೊರೇಟ್ ವಾರ್ಷಿಕ ಸಭೆಗಳು, ಡೀಲರ್ ಮೀಟ್‌ಗಳು ಹಾಗೂ ಪ್ರಶಸ್ತಿ ಪ್ರದಾನ ಸಮಾರಂಭಗಳ ಸಮಗ್ರ ನಿರ್ವಹಣೆ.',
        summaryEn: 'Flawless logistical choreography for dealer meets, annual general meetings, and corporate award galas.',
        detailsKn: [
          'ಸ್ಥಳ ಆಯ್ಕೆ, ವೇದಿಕೆ ನಿರ್ಮಾಣ, ಧ್ವನಿ ಮತ್ತು ಬೆಳಕಿನ ವ್ಯವಸ್ಥೆ',
          'ಅತಿಥಿಗಳ ವಿಮಾನ/ರೈಲು ನಿಲ್ದಾಣ ಸ್ವಾಗತ ಮತ್ತು ಹೋಟೆಲ್ ಚೆಕ್-ಇನ್ ನಿರ್ವಹಣೆ',
          'ಕಾರ್ಯಕ್ರಮದ ಸ್ಮರಣಿಕೆಗಳು ಹಾಗೂ ವೆಲ್‌ಕಮ್ ಕಿಟ್ ಸಿದ್ಧತೆ',
          'ನಿಗದಿತ ಕಾರ್ಯಕ್ರಮದ ನಿಖರ ಸಮಯ ಪಾಲನೆ'
        ],
        detailsEn: [
          'Venue sourcing, stage fabrication, acoustic sound, and stage lighting',
          'Guest airport/railway reception, transfers, and synchronized check-in desk',
          'Custom branded welcome kits, badges, and commemorative gifts',
          'Minute-by-minute stage schedule management and technical direction'
        ],
        highlightsKn: ['ವೇದಿಕೆ & ತಂತ್ರಜ್ಞಾನ', 'ಅತಿಥಿ ಸತ್ಕಾರ', 'ಸಮಗ್ರ ಈವೆಂಟ್ ಪ್ಲಾನಿಂಗ್'],
        highlightsEn: ['Stage & Tech', 'Guest Welcoming', 'Full Coordination']
      },
      {
        id: 'group_events',
        categoryId: 'corporate',
        titleKn: 'ಸಂಘ-ಸಂಸ್ಥೆಗಳು & ಅಸೋಸಿಯೇಷನ್ ಈವೆಂಟ್‌ಗಳು',
        titleEn: 'Associations & Cultural Group Events',
        summaryKn: 'ರೋಟರಿ, ಲಯನ್ಸ್, ಹಳೆಯ ವಿದ್ಯಾರ್ಥಿ ಸಂಘಗಳು ಮತ್ತು ಸಮಾಜದ ಪ್ರಮುಖ ಕೂಟಗಳ ಆಯೋಜನೆ.',
        summaryEn: 'Custom conventions, milestone celebrations, and reunions for professional networks and alumni associations.',
        detailsKn: [
          'ದೊಡ್ಡ ಸಭಾಂಗಣಗಳು ಮತ್ತು ಓಪನ್-ಏರ್ ಲಾನ್ ವ್ಯವಸ್ಥೆ',
          'ಪಾರಂಪರಿಕ ಸತ್ಕಾರ ಹಾಗೂ ಬಾಳೆ ಎಲೆ ಸಾಂಪ್ರದಾಯಿಕ ಔತಣಕೂಟ',
          'ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು (ಯಕ್ಷಗಾನ, ಡೊಳ್ಳು ಕುಣಿತ, ಸಂಗೀತ ಸಂಜೆ)',
          'ಸದಸ್ಯರ ಸಾರಿಗೆ ಹಾಗೂ ವಾಸ್ತವ್ಯದ ಸುಲಭ ನಿರ್ವಹಣೆ'
        ],
        detailsEn: [
          'Spacious auditoriums, banquet halls, and open-air lawn coordination',
          'Traditional cultural welcoming and authentic banana leaf banquets',
          'Regional cultural performances (Yakshagana, Dollu Kunitha, Classical)',
          'Smooth accommodation allocation and group transit dispatch'
        ],
        highlightsKn: ['ಸಾಂಸ್ಕೃತಿಕ ವೈಭವ', 'ದೊಡ್ಡ ಸಭಾಂಗಣಗಳು', 'ಪಾರಂಪರಿಕ ಭೋಜನ'],
        highlightsEn: ['Cultural Heritage', 'Large Venues', 'Traditional Banquets']
      },
      {
        id: 'event_coordination',
        categoryId: 'corporate',
        titleKn: 'ಈವೆಂಟ್ ಕೋಆರ್ಡಿನೇಷನ್ & ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್',
        titleEn: 'End-to-End Event Coordination & Logistics',
        summaryKn: 'ಯೋಜನೆಯಿಂದ ಹಿಡಿದು ಅಂತಿಮ ಬೀಳ್ಕೊಡುಗೆಯವರೆಗೆ ಪ್ರತಿಯೊಂದು ವಿವರವನ್ನೂ ಗಮನಿಸುವ ಅನುಭವಿ ತಂಡ.',
        summaryEn: 'On-ground operational commanders ensuring zero friction across catering, transport, hotels, and stage crews.',
        detailsKn: [
          'ಪ್ರತ್ಯೇಕ ಇವೆಂಟ್ ಮ್ಯಾನೇಜರ್ ನಿಯೋಜನೆ',
          'ವೆಂಡರ್ ಸಮನ್ವಯ (ಹೋಟೆಲ್, ಸಾರಿಗೆ, ಕ್ಯಾಟರಿಂಗ್, ತಂತ್ರಜ್ಞಾನ)',
          'ತುರ್ತು ಬದಲಾವಣೆಗಳಿಗೆ ತ್ವರಿತ ಸ್ಪಂದನೆ',
          'ಖರ್ಚು ವೆಚ್ಚಗಳ ಪಾರದರ್ಶಕ ಲೆಕ್ಕಪತ್ರ'
        ],
        detailsEn: [
          'Dedicated senior event operations lead assigned to your account',
          'Complete vendor orchestration across hospitality, fleet, food, and AV',
          'Agile contingency buffers for unexpected schedule or weather shifts',
          'Post-event reconciliation with transparent invoicing and audit trails'
        ],
        highlightsKn: ['ಒಬ್ಬರೇ ಸಂಯೋಜಕರು', 'ವೆಂಡರ್ ನಿರ್ವಹಣೆ', 'ಪಾರದರ್ಶಕ ಲೆಕ್ಕ'],
        highlightsEn: ['Single Point of Contact', 'Vendor Management', 'Clear Accounts']
      }
    ]
  },
  {
    id: 'transport',
    displayOrder: 4,
    isActive: true,
    titleKn: 'ಸಾರಿಗೆ ಮತ್ತು ಟಿಕೆಟ್ ಬುಕಿಂಗ್ ನೆರವು',
    titleEn: 'Transportation & Bookings',
    taglineKn: 'ಸುರಕ್ಷಿತ ವಾಹನಗಳು ಮತ್ತು ನಿರಾತಂಕ ಪ್ರಯಾಣ ನೆರವು',
    taglineEn: 'Sanitized Fleets, Experienced Chauffeurs & Travel Logistics',
    descriptionKn: 'ಕಾರು ಬಾಡಿಗೆ, ಟೆಂಪೋ ಟ್ರಾವೆಲರ್, ಮಿನಿ ಬಸ್ಸುಗಳು, ರೈಲು ಮತ್ತು ಬಸ್ಸು ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆಯ ವಿಶ್ವಾಸಾರ್ಹ ಸಹಾಯ.',
    descriptionEn: 'Chauffeur-driven car rentals, tourist buses and coaches, plus dedicated assistance for train and bus seat reservations.',
    badgeKn: 'ಸ್ವಚ್ಛ & ವಿಶ್ವಾಸಾರ್ಹ',
    badgeEn: 'Safe & Clean Fleet',
    iconName: 'Bus',
    image: '/images/hero_western_ghats_1791795450720.jpg',
    services: [
      {
        id: 'car_rentals',
        categoryId: 'transport',
        titleKn: 'ಕಾರು ಬಾಡಿಗೆ (ಸೆಡಾನ್, ಇನೋವಾ, ಎಸ್‌ಯುವಿ)',
        titleEn: 'Chauffeur-Driven Car Rentals (Sedan, Innova, SUV)',
        summaryKn: 'ಸ್ವಚ್ಛ, ಸ್ಯಾನಿಟೈಸ್ ಮಾಡಿದ ಕಾರುಗಳು ಹಾಗೂ ಮಾರ್ಗಗಳನ್ನು ಚೆನ್ನಾಗಿ ಬಲ್ಲ ಅನುಭವಿ, ಸಭ್ಯ ಚಾಲಕರು.',
        summaryEn: 'Well-maintained fleet of Sedans (Dzire, Etios), Innova Crysta, and Premium SUVs for local and outstation journeys.',
        detailsKn: [
          'ಏರ್‌ಪೋರ್ಟ್ ಪಿಕ್-ಅಪ್ ಮತ್ತು ಡ್ರಾಪ್ (ಬೆಂಗಳೂರು, ಮೈಸೂರು, ಮಂಗಳೂರು)',
          'ದಿನನಿತ್ಯದ ಹೊರರಾಜ್ಯ/ಹೊರಜಿಲ್ಲೆ ಪ್ರಯಾಣಕ್ಕೆ ನಿಗದಿತ ಕಿಮೀ ಪ್ಯಾಕೇಜ್‌ಗಳು',
          'ಯೂನಿಫಾರ್ಮ್ ಧರಿಸಿದ, ಕನ್ನಡ-ಇಂಗ್ಲಿಷ್-ಹಿಂದಿ ಮಾತನಾಡುವ ಸೌಜನ್ಯದ ಚಾಲಕರು',
          'ಸ್ಪೀಡ್ ಗವರ್ನರ್ ಹಾಗೂ ಎಲ್ಲಾ ಕಾನೂನು ಪರವಾನಗಿ ಹೊಂದಿದ ವಾಹನಗಳು'
        ],
        detailsEn: [
          'Airport transfers (Bengaluru Kempegowda, Mysore, Mangalore airports)',
          'Transparent outstation kilometer packages with zero hidden surprises',
          'Courteous, verified chauffeurs conversant in Kannada, English, and Hindi',
          'Speed-governed, commercially licensed, fully insured vehicles'
        ],
        highlightsKn: ['ಇನೋವಾ ಕ್ರಿಸ್ಟಾ', 'ಪಾರದರ್ಶಕ ಕಿಮೀ ದರ', 'ಅನುಭವಿ ಚಾಲಕರು'],
        highlightsEn: ['Innova Crysta Fleet', 'Clear Per-KM Rates', 'Vetted Chauffeurs']
      },
      {
        id: 'bus_coach_rentals',
        categoryId: 'transport',
        titleKn: 'ಟೆಂಪೋ ಟ್ರಾವೆಲರ್, ಮಿನಿ ಬಸ್ಸು & ಕೋಚ್ ಬಾಡಿಗೆ',
        titleEn: 'Tempo Traveller, Mini Bus & Luxury Coach Rentals',
        summaryKn: '೧೨ ರಿಂದ ೫೦ ಸೀಟುಗಳ ಪುಷ್-ಬ್ಯಾಕ್, ಹವಾನಿಯಂತ್ರಿತ ದೊಡ್ಡ ವಾಹನಗಳು ಕುಟುಂಬ ಮತ್ತು ಸಂಸ್ಥೆಗಳಿಗೆ.',
        summaryEn: '12-seater to 26-seater Tempo Travellers, 33-seater Mini Buses, and 49-53 seater multi-axle luxury tourist coaches.',
        detailsKn: [
          '೧೨, ೧೪, ೧೭, ೨೦ ಮತ್ತು ೨೬ ಸೀಟುಗಳ ಟೆಂಪೋ ಟ್ರಾವೆಲರ್',
          '೩೦ ರಿಂದ ೫೦ ಸೀಟುಗಳ ಹವಾನಿಯಂತ್ರಿತ ಐಷಾರಾಮಿ ಟೂರಿಸ್ಟ್ ಬಸ್ಸುಗಳು',
          'ಪುಷ್-ಬ್ಯಾಕ್ ಸೀಟುಗಳು, ಮ್ಯೂಸಿಕ್ ಸಿಸ್ಟಮ್ ಮತ್ತು ವಿಶಾಲ ಲಗೇಜ್ ಸ್ಥಳ',
          'ದೂರದ ಘಾಟಿ ರಸ್ತೆಗಳಲ್ಲಿ ಚಲಾಯಿಸುವ ಪರಿಣತಿ ಹೊಂದಿದ ಹಿರಿಯ ಚಾಲಕರು'
        ],
        detailsEn: [
          '12, 14, 17, 20, and 26-seater executive Tempo Travellers',
          '30 to 50-seater air-conditioned luxury air-suspension coaches',
          'Push-back ergonomic seating, charging ports, and ample luggage bays',
          'Drivers with verified mastery of Western Ghats hairpin and hill curves'
        ],
        highlightsKn: ['೧೨-೫೦ ಸೀಟುಗಳು', 'ಪುಷ್-ಬ್ಯಾಕ್ ಸೀಟು', 'ಘಾಟಿ ಚಾಲನಾ ಅನುಭವ'],
        highlightsEn: ['12-50 Seater Options', 'Push-Back Comfort', 'Ghats Specialists']
      },
      {
        id: 'train_booking_assistance',
        categoryId: 'transport',
        titleKn: 'ರೈಲು ಟಿಕೆಟ್ ಬುಕಿಂಗ್ ನೆರವು',
        titleEn: 'Train Booking Assistance',
        summaryKn: 'ಭಾರತೀಯ ರೈಲ್ವೆಯ ತತ್ಕಾಲ್, ಪ್ರೀಮಿಯಂ ಹಾಗೂ ಸಾಮಾನ್ಯ ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆಯ ಅಧಿಕೃತ ಮಾಹಿತಿ ಮತ್ತು ನೆರವು.',
        summaryEn: 'Expert guidance on train availability, route options, tatkal rules, and booking assistance for holiday travel.',
        detailsKn: [
          'ಸೂಕ್ತ ರೈಲು ಮಾರ್ಗ ಮತ್ತು ಸಮಯದ ಸಲಹೆ',
          'ಟಿಕೆಟ್ ಲಭ್ಯತೆ, ವೇಟಿಂಗ್ ಲಿಸ್ಟ್ ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ',
          'ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ಮಹಿಳೆಯರ ಲೋವರ್ ಬರ್ತ್ ಆದ್ಯತೆ',
          'ರೈಲು ನಿಲ್ದಾಣದಿಂದ ಮುಂದಿನ ವಾಹನ ಸಂಯೋಜನೆ'
        ],
        detailsEn: [
          'Guidance on the best train routes, schedules, and connectivity',
          'Real-time seat availability and waitlist confirmation probability advice',
          'Assistance with senior citizen and family lower berth allocations',
          'Seamless station-to-hotel vehicle transit synchronization'
        ],
        highlightsKn: ['ಮಾರ್ಗ ಸಮಾಲೋಚನೆ', 'ಸೀಟ್ ಮಾಹಿತಿ', 'ನಿಲ್ದಾಣ ಪಿಕ್-ಅಪ್'],
        highlightsEn: ['Route Guidance', 'Seat Advisory', 'Station Transfers'],
        isAssistanceOnly: true,
        inquiryNoticeKn: 'ಗಮನಿಸಿ: ಇದು ಟಿಕೆಟಿಂಗ್ ಸಲಹಾ ಮತ್ತು ಬುಕಿಂಗ್ ನೆರವು ಸೇವೆಯಾಗಿದೆ. ನಿಯಮಾನುಸಾರ ರೈಲ್ವೆ ಬುಕಿಂಗ್ ನೆರವು ನೀಡಲಾಗುತ್ತದೆ.',
        inquiryNoticeEn: 'Notice: This is a dedicated travel assistance and itinerary coordination service conforming to railway guidelines.'
      },
      {
        id: 'bus_ticket_assistance',
        categoryId: 'transport',
        titleKn: 'ಬಸ್ಸು ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆ ನೆರವು',
        titleEn: 'Bus Ticket Booking Assistance',
        summaryKn: 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಊರುಗಳಿಗೆ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಮತ್ತು ಪ್ರಮುಖ ಖಾಸಗಿ ಬಸ್ಸುಗಳ ಸೀಟು ಕಾಯ್ದಿರಿಸುವಿಕೆ ನೆರವು.',
        summaryEn: 'Assistance for KSRTC (Airavat, Club Class) and verified private sleeper buses across Karnataka and South India.',
        detailsKn: [
          'ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಐರಾವತ್, ಅಂಬಾರಿ ಉತ್ಸವ ಬಸ್ಸುಗಳ ಮಾರ್ಗದರ್ಶನ',
          'ರಾತ್ರಿ ಸ್ಲೀಪರ್ ಬಸ್ಸುಗಳ ಸೀಟು ಆಯ್ಕೆ ಸಹಾಯ',
          'ಹಬ್ಬ ಹರಿದಿನಗಳ ಪ್ರಯಾಣಕ್ಕೆ ಮುಂಗಡ ಯೋಜನೆ',
          'ಬಸ್ಸು ನಿಲ್ದಾಣದಿಂದ ಡೆಸ್ಟಿನೇಷನ್ ವಾಹನ ವ್ಯವಸ್ಥೆ'
        ],
        detailsEn: [
          'Guidance on KSRTC Airavat Club Class and Ambari Utsav schedules',
          'Assistance in selecting clean, verified overnight sleeper coaches',
          'Advance planning for festive season peak travel rushes',
          'Coordinated pickup from bus alighting points to destination stays'
        ],
        highlightsKn: ['ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ನೆರವು', 'ಸ್ಲೀಪರ್ ಕೋಚ್ ಮಾಹಿತಿ', 'ಮುಂಗಡ ಸೀಟು ನೆರವು'],
        highlightsEn: ['KSRTC Advisory', 'Sleeper Coach Guidance', 'Advance Planning'],
        isAssistanceOnly: true,
        inquiryNoticeKn: 'ಗಮನಿಸಿ: ಬಸ್ಸು ಟಿಕೆಟ್ ಬುಕಿಂಗ್ ಸಹಾಯ ಮತ್ತು ಸಂಯೋಜನಾ ಸೇವೆಯಾಗಿದೆ.',
        inquiryNoticeEn: 'Notice: Assistance service facilitating schedule discovery and inter-city bus reservations.'
      },
      {
        id: 'group_transportation',
        categoryId: 'transport',
        titleKn: 'ದೊಡ್ಡ ಗುಂಪು ಸಾರಿಗೆ ನಿರ್ವಹಣೆ',
        titleEn: 'Large Group Fleet Logistics',
        summaryKn: 'ಮದುವೆ ಸಮಾರಂಭಗಳು, ಸಮಾವೇಶಗಳು ಹಾಗೂ ತೀರ್ಥಯಾತ್ರೆಗಳಿಗೆ ಅನೇಕ ವಾಹನಗಳ ಏಕಕಾಲೀನ ಸಮನ್ವಯ.',
        summaryEn: 'Multi-vehicle convoy coordination for weddings, pilgrimages, and conventions with central dispatch.',
        detailsKn: [
          'ಹಲವಾರು ಬಸ್ಸುಗಳು ಮತ್ತು ಕಾರುಗಳ ಏಕಕಾಲೀನ ಸಾರಿಗೆ ನಿರ್ವಹಣೆ',
          'ಕಂಟ್ರೋಲ್ ರೂಮ್ ಮೂಲಕ ಮಾರ್ಗ ಮತ್ತು ಸಮಯದ ನಿಗಾ',
          'ಪಾರ್ಕಿಂಗ್ ಮತ್ತು ಟೋಲ್ ಶುಲ್ಕಗಳ ಪೂರ್ವ ಯೋಜನೆ',
          'ಅತಿಥಿಗಳಿಗೆ ತೊಂದರೆಯಾಗದಂತೆ ವಿಮಾನ/ರೈಲು ನಿಲ್ದಾಣ ರಿಸೆಪ್ಷನ್'
        ],
        detailsEn: [
          'Simultaneous multi-vehicle coordination across fleets of buses and sedans',
          'Central dispatch oversight for convoy route adherence and schedule fidelity',
          'Pre-cleared highway toll, permit, and parking logistical planning',
          'Dedicated transit marshals at arrival stations and event portals'
        ],
        highlightsKn: ['ಫ್ಲೀಟ್ ಸಮನ್ವಯ', 'ಮದುವೆ ಸಾರಿಗೆ', 'ಕಂಟ್ರೋಲ್ ರೂಮ್ ನಿಗಾ'],
        highlightsEn: ['Fleet Coordination', 'Wedding Logistics', 'Central Dispatch']
      }
    ]
  },
  {
    id: 'visa_passport',
    displayOrder: 5,
    isActive: true,
    titleKn: 'ವೀಸಾ ಮತ್ತು ಪಾಸ್‌ಪೋರ್ಟ್ ನೆರವು',
    titleEn: 'Visa & Passport Assistance',
    taglineKn: 'ನಿಖರ ದಾಖಲೆಗಳು, ನಂಬಿಕಾರ್ಹ ಮಾರ್ಗದರ್ಶನ',
    taglineEn: 'Expert Guidance, Hassle-Free International Travel Documentation',
    descriptionKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸಗಳಿಗೆ ಪ್ರವಾಸಿ ವೀಸಾ ಅರ್ಜಿ ಸಮಾಲೋಚನೆ, ಪಾಸ್‌ಪೋರ್ಟ್ ನವೀಕರಣ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ.',
    descriptionEn: 'Professional advisory and assistance for tourist visas, new passport applications, renewals, and travel documentation.',
    badgeKn: 'ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶನ',
    badgeEn: 'Document Advisory',
    iconName: 'FileCheck',
    image: '/images/hero_western_ghats_1791795450720.jpg',
    services: [
      {
        id: 'visa_assistance',
        categoryId: 'visa_passport',
        titleKn: 'ಪ್ರವಾಸಿ ವೀಸಾ ಅರ್ಜಿ ಸಮಾಲೋಚನೆ & ನೆರವು',
        titleEn: 'Tourist Visa Consultation & Assistance',
        summaryKn: 'ದುಬೈ, ಸಿಂಗಾಪುರ, ಮಲೇಷ್ಯಾ, ಥಾಯ್ಲೆಂಡ್, ಶ್ರೀಲಂಕಾ ಮತ್ತು ಇತರ ದೇಶಗಳ ಪ್ರವಾಸಿ ವೀಸಾ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆಯ ಸಂಪೂರ್ಣ ನೆರವು.',
        summaryEn: 'Step-by-step assistance for tourist visas across Dubai/UAE, Singapore, Malaysia, Thailand, Sri Lanka, and Schengen.',
        detailsKn: [
          'ಅಗತ್ಯ ದಾಖಲೆಗಳ (Checklist) ನಿಖರ ಮಾರ್ಗದರ್ಶನ',
          'ಆನ್‌ಲೈನ್ ಇ-ವೀಸಾ (eVisa) ಅರ್ಜಿ ಭರ್ತಿ ಮಾಡುವಲ್ಲಿ ನೆರವು',
          'ವಿಮಾನ ಟಿಕೆಟ್ ಹಾಗೂ ಹೋಟೆಲ್ ವೋಚರ್ ಡಾಕ್ಯುಮೆಂಟೇಶನ್ ಬೆಂಬಲ',
          'ವೀಸಾ ನಿಯಮಾವಳಿಗಳು ಹಾಗೂ ಸಮಯದ ಕುರಿತು ಪ್ರಾಮಾಣಿಕ ಮಾಹಿತಿ'
        ],
        detailsEn: [
          'Country-specific documentation checklist and financial proof advisory',
          'Assistance in filing online eVisa applications and appointment booking',
          'Confirmed flight itinerary and hotel accommodation voucher preparation',
          'Transparent timelines and consular fee breakdown with no hidden charges'
        ],
        highlightsKn: ['ಇ-ವೀಸಾ ನೆರವು', 'ದಾಖಲೆ ಪರಿಶೀಲನೆ', 'ಸಮಯೋಚಿತ ಮಾಹಿತಿ'],
        highlightsEn: ['eVisa Guidance', 'Document Checks', 'Timely Updates'],
        isAssistanceOnly: true,
        inquiryNoticeKn: 'ಗಮನಿಸಿ: ಇದು ವೀಸಾ ಅರ್ಜಿ ಸಲಹಾ ಹಾಗೂ ದಾಖಲೆ ಸಿದ್ಧತೆ ನೆರವು ಸೇವೆಯಾಗಿದೆ. ವೀಸಾ ಮಂಜೂರಾತಿ ಸಂಬಂಧಪಟ್ಟ ರಾಯಭಾರ ಕಚೇರಿಯ (Embassy/Consulate) ವಿವೇಚನೆಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ. ಸೂಕ್ಷ್ಮ ದಾಖಲೆಗಳನ್ನು ಸಾರ್ವಜನಿಕ ಫಾರ್ಮ್‌ನಲ್ಲಿ ನೀಡಬೇಡಿ.',
        inquiryNoticeEn: 'Notice: This is a professional visa assistance and documentation guidance service. Final visa issuance is at the sole discretion of the respective embassy or consulate. Never submit sensitive identity scans through public inquiry forms.'
      },
      {
        id: 'passport_assistance',
        categoryId: 'visa_passport',
        titleKn: 'ಪಾಸ್‌ಪೋರ್ಟ್ ಅರ್ಜಿ & ನವೀಕರಣ ಮಾರ್ಗದರ್ಶನ',
        titleEn: 'Passport Application & Renewal Guidance',
        summaryKn: 'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್, ನವೀಕರಣ (Renewal), ವಿಳಾಸ ಬದಲಾವಣೆ ಹಾಗೂ ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವಾ ಕೇಂದ್ರದ (PSK) ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನೆರವು.',
        summaryEn: 'Guidance for fresh passport applications, renewals, Tatkaal processing, minor passports, and PSK appointment slots.',
        detailsKn: [
          'ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವಾ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಪ್ರಕ್ರಿಯೆಯ ಸಲಹೆ',
          'ಅಗತ್ಯ ಜನನ ಪ್ರಮಾಣಪತ್ರ, ವಿಳಾಸ ಪುರಾವೆಗಳ ಪರಿಶೀಲನೆ',
          'ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವಾ ಕೇಂದ್ರದ (PSK) ದಿನಾಂಕ ಮತ್ತು ಸಮಯದ ಬುಕಿಂಗ್ ನೆರವು',
          'ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ (Police Verification) ಹಂತಗಳ ಮುನ್ಸೂಚನೆ'
        ],
        detailsEn: [
          'Advisory on filling Passport Seva Kendra application forms correctly',
          'Pre-check of required birth, address, educational, and identity proofs',
          'Guidance on appointment slot selection at regional PSK centers',
          'Step-by-step briefing on police verification requirements and dispatch'
        ],
        highlightsKn: ['ಹೊಸ / ನವೀಕರಣ', 'ಪಿಎಸ್‌ಕೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನೆರವು', 'ದಾಖಲೆ ಸಲಹೆ'],
        highlightsEn: ['Fresh / Renewal', 'PSK Slot Guidance', 'Document Advisory'],
        isAssistanceOnly: true,
        inquiryNoticeKn: 'ಗಮನಿಸಿ: ಪಾಸ್‌ಪೋರ್ಟ್ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಪ್ರಕ್ರಿಯೆಯ ಸಲಹಾ ಸೇವೆಯಾಗಿದೆ. ಅಧಿಕೃತ ಪಾಸ್‌ಪೋರ್ಟ್ ವಿತರಣೆ ಭಾರತ ಸರ್ಕಾರದ ಪಾಸ್‌ಪೋರ್ಟ್ ವಿಭಾಗದಿಂದ ಮಾತ್ರ ನಡೆಯುತ್ತದೆ.',
        inquiryNoticeEn: 'Notice: This is an administrative consultation service assisting citizens in preparing their applications for Passport Seva Kendra.'
      },
      {
        id: 'travel_docs_guidance',
        categoryId: 'visa_passport',
        titleKn: 'ಪ್ರಯಾಣ ದಾಖಲೆಗಳು & ಓಕೆ-ಟು-ಬೋರ್ಡ್ (OTB)',
        titleEn: 'Travel Documentation & OK to Board (OTB)',
        summaryKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಪ್ರವಾಸಿ ವಿಮೆ, ಓಕೆ-ಟು-ಬೋರ್ಡ್ ಹಾಗೂ ಕರೆನ್ಸಿ ವಿನಿಮಯ ಮಾಹಿತಿ.',
        summaryEn: 'Essential preparation: Travel Insurance coverage, OK to Board airline verifications, and foreign exchange advisory.',
        detailsKn: [
          'ವೈದ್ಯಕೀಯ ಹಾಗೂ ಲಗೇಜ್ ನಷ್ಟ ಒಳಗೊಳ್ಳುವ ಪ್ರವಾಸಿ ವಿಮೆ (Travel Insurance) ಆಯ್ಕೆಗಳು',
          'ವಿವಿಧ ವಿಮಾನಯಾನ ಸಂಸ್ಥೆಗಳಿಗೆ ಅಗತ್ಯವಾದ ಓಕೆ-ಟು-ಬೋರ್ಡ್ ಕ್ಲಿಯರೆನ್ಸ್ ನೆರವು',
          'ವಿದೇಶಿ ಕರೆನ್ಸಿ ಕಾರ್ಡ್ ಮತ್ತು ಕರೆನ್ಸಿ ವಿನಿಮಯ ನಿಯಮಗಳ ಮಾರ್ಗದರ್ಶನ',
          'ಸ್ಥಳೀಯ ಸಿಮ್ ಕಾರ್ಡ್ ಹಾಗೂ ಅಂತಾರಾಷ್ಟ್ರೀಯ ರೋಮಿಂಗ್ ಸಲಹೆಗಳು'
        ],
        detailsEn: [
          'Comprehensive travel medical and baggage insurance policy guidance',
          'Airline OK-to-Board (OTB) profile updates for Gulf sectors',
          'Foreign exchange regulations and multi-currency travel card advisory',
          'Destination SIM card connectivity and international roaming pointers'
        ],
        highlightsKn: ['ಪ್ರವಾಸಿ ವಿಮೆ', 'ಓಕೆ-ಟು-ಬೋರ್ಡ್', 'ಕರೆನ್ಸಿ ಮಾರ್ಗದರ್ಶನ'],
        highlightsEn: ['Travel Insurance', 'OTB Verification', 'Forex Advisory'],
        isAssistanceOnly: true
      },
      {
        id: 'international_prep',
        categoryId: 'visa_passport',
        titleKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣ ಪೂರ್ವ ಸಿದ್ಧತೆ',
        titleEn: 'International Travel Readiness Checklist',
        summaryKn: 'ಮೊದಲ ಬಾರಿಗೆ ವಿದೇಶಕ್ಕೆ ತೆರಳುವ ಪ್ರವಾಸಿಗರಿಗೆ ವಿಮಾನ ನಿಲ್ದಾಣ ನಿಯಮಗಳು, ಲಗೇಜ್ ಮಿತಿ ಮತ್ತು ಸುರಕ್ಷತೆಯ ಸಂಪೂರ್ಣ ವಿವರಣೆ.',
        summaryEn: 'Dedicated orientation for first-time international travelers covering immigration, baggage allowances, and customs norms.',
        detailsKn: [
          'ವಿಮಾನ ನಿಲ್ದಾಣದ ಇಮಿಗ್ರೇಷನ್ (Immigration) ಮತ್ತು ಕಸ್ಟಮ್ಸ್ ಹಂತಗಳ ವಿವರಣೆ',
          'ಲಗೇಜ್ ತೂಕದ ಮಿತಿ ಹಾಗೂ ಕ್ಯಾರಿ-ಆನ್ ನಿಯಮಗಳ ಮಾಹಿತಿ',
          'ಗಮ್ಯಸ್ಥಾನ ದೇಶದ ಸಾಂಸ್ಕೃತಿಕ ಹಾಗೂ ಕಾನೂನು ನಿಯಮಗಳ ತಿಳುವಳಿಕೆ',
          'ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಭಾರತೀಯ ರಾಯಭಾರ ಕಚೇರಿಯ ಸಂಪರ್ಕ ವಿವರಗಳ ಕಿಟ್'
        ],
        detailsEn: [
          'Immigration counter protocols and customs declaration walkthroughs',
          'Cabin and check-in baggage weight regulations and prohibited item guidance',
          'Local cultural decorum, tipping customs, and destination laws orientation',
          'Emergency contact dossiers including Indian Embassy consular helplines'
        ],
        highlightsKn: ['ಮೊದಲ ಬಾರಿಯ ಪ್ರಯಾಣಿಕರಿಗೆ ಆಪ್ತ', 'ಇಮಿಗ್ರೇಷನ್ ಮಾಹಿತಿ', 'ತುರ್ತು ಕಿಟ್'],
        highlightsEn: ['First-Time Friendly', 'Immigration Walkthrough', 'Emergency Kit'],
        isAssistanceOnly: true
      }
    ]
  },
  {
    id: 'catering',
    displayOrder: 6,
    isActive: true,
    titleKn: 'ಕ್ಯಾಟರಿಂಗ್ ಮತ್ತು ಆತಿಥ್ಯ ಸೇವೆಗಳು',
    titleEn: 'Catering & Hospitality',
    taglineKn: '೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಸಾಂಪ್ರದಾಯಿಕ ಪಂಕ್ತಿ ಭೋಜನ',
    taglineEn: '100% Pure Vegetarian Culinary Artistry & Hospitality',
    descriptionKn: 'ದಕ್ಷಿಣ ಹಾಗೂ ಉತ್ತರ ಭಾರತೀಯ ಸಾಂಪ್ರದಾಯಿಕ ಸಸ್ಯಾಹಾರಿ ಅಡುಗೆ, ಪ್ರವಾಸದ ಮಾರ್ಗಮಧ್ಯೆ ಬಾಳೆ ಎಲೆ ಊಟ ಹಾಗೂ ಸಮಾರಂಭಗಳ ಭೋಜನ ವ್ಯವಸ್ಥೆ.',
    descriptionEn: 'Authentic pure vegetarian feasts, South & North Indian culinary traditions, on-tour dining arrangements, and event hospitality.',
    badgeKn: 'ಅಪ್ಪಟ ಸಸ್ಯಾಹಾರಿ',
    badgeEn: '100% Pure Veg',
    iconName: 'Utensils',
    image: '/images/pure_veg_travel_meal.jpg',
    services: [
      {
        id: 'pure_veg_catering',
        categoryId: 'catering',
        titleKn: '೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಪಂಕ್ತಿ ಸೇವೆ',
        titleEn: '100% Pure Vegetarian Traditional Pankti Seva',
        summaryKn: 'ಬಿಸಿ ತುಪ್ಪ, ಸಾಂಬಾರು, ರಸಂ, ಪಾಯಸ ಹಾಗೂ ಮೈಸೂರು ಪಾಕ್ ಒಳಗೊಂಡ ಅಪ್ಪಟ ಬಾಳೆ ಎಲೆ ಸಾಂಪ್ರದಾಯಿಕ ಊಟ.',
        summaryEn: 'Traditional banana leaf dining served with reverence, featuring heritage recipes, desi ghee, and artisanal sweets.',
        detailsKn: [
          'ಅಪ್ಪಟ ತುಪ್ಪ, ತಾಜಾ ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ಪಾರಂಪರಿಕ ಮಸಾಲೆಗಳ ಬಳಕೆ',
          'ಬಾಳೆ ಎಲೆಯಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ಶೈಲಿಯ ಪ್ರೀತಿಯ ಬಡಿಸುವಿಕೆ (ಪಂಕ್ತಿ ಸೇವೆ)',
          'ಉಪಹಾರ (ತಟ್ಟೆ ಇಡ್ಲಿ, ಬೆಣ್ಣೆ ದೋಸೆ, ಕೇಸರಿಬಾತ್, ಫಿಲ್ಟರ್ ಕಾಫಿ)',
          'ಮಧ್ಯಾಹ್ನ ಮತ್ತು ರಾತ್ರಿಯ ಸಂಪೂರ್ಣ ಮೃಷ್ಟಾನ್ನ ಭೋಜನ'
        ],
        detailsEn: [
          'Prepared exclusively with pure desi ghee, fresh coconut, and hand-ground spices',
          'Served reverently on fresh plantain leaves in authentic Pankti Seva discipline',
          'Traditional morning spread: Thatte Idli, Benne Dosa, Kesari Bath, and Filter Coffee',
          'Elaborate festive lunches with authentic Rasam, Sambar, Palya, and Payasam'
        ],
        highlightsKn: ['ಬಾಳೆ ಎಲೆ ಊಟ', 'ಅಪ್ಪಟ ತುಪ್ಪ & ಕಾಫಿ', 'ಪಂಕ್ತಿ ಶಿಸ್ತು'],
        highlightsEn: ['Banana Leaf Spread', 'Desi Ghee & Coffee', 'Traditional Service']
      },
      {
        id: 'group_tour_catering',
        categoryId: 'catering',
        titleKn: 'ಪ್ರವಾಸದ ಮಾರ್ಗಮಧ್ಯೆ ಗ್ರೂಪ್ ಕ್ಯಾಟರಿಂಗ್',
        titleEn: 'On-Tour Group Meal Logistics',
        summaryKn: 'ದೂರದ ಪ್ರವಾಸಗಳಲ್ಲಿ ಎಲ್ಲೇ ತೆರಳಿದರೂ ನಿಗದಿತ ಸಮಯಕ್ಕೆ ಶುದ್ಧ, ಬಿಸಿ ಹಾಗೂ ನೈರ್ಮಲ್ಯಯುತ ಸಸ್ಯಾಹಾರಿ ಊಟದ ವ್ಯವಸ್ಥೆ.',
        summaryEn: 'Never compromise on food while travelling: Fresh, hygienic, warm vegetarian meals served on-schedule during transit.',
        detailsKn: [
          'ಬಸ್ಸು ಅಥವಾ ರೈಲು ಪ್ರಯಾಣದ ನಿಲ್ದಾಣಗಳಲ್ಲಿ ಸಿದ್ಧವಾಗಿರುವ ಬಿಸಿ ಊಟ',
          'ವಿಶೇಷ ಟ್ರಾವೆಲ್ ಪ್ಯಾಕಿಂಗ್ (ಸೋರಿಕೆಯಾಗದ ಪರಿಸರ ಸ್ನೇಹಿ ಬಾಕ್ಸ್‌ಗಳು)',
          'ಹಿರಿಯರಿಗೆ ಮೃದು ಆಹಾರ ಮತ್ತು ಮಕ್ಕಳಿಗಾಗಿ ಕಡಿಮೆ ಖಾರದ ಊಟ',
          'ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ನಿರಂತರ ಬಿಸಿ ಕಾಫಿ-ಟೀ ವ್ಯವಸ್ಥೆ'
        ],
        detailsEn: [
          'Synchronized warm meal delivery at designated highway transit halts',
          'Eco-friendly leak-proof meal boxes designed for clean transit consumption',
          'Gentle, low-spice meal options for elderly travellers and young children',
          'Purified drinking water and continuous fresh filter coffee and tea stations'
        ],
        highlightsKn: ['ಸಮಯಕ್ಕೆ ಬಿಸಿ ಊಟ', 'ಪರಿಸರ ಸ್ನೇಹಿ ಪ್ಯಾಕಿಂಗ್', 'ಮಕ್ಕಳು & ಹಿರಿಯರ ಕಾಳಜಿ'],
        highlightsEn: ['Punctual Hot Meals', 'Eco-Packaging', 'Seniors & Kids Menu']
      },
      {
        id: 'event_catering',
        categoryId: 'catering',
        titleKn: 'ಸಮಾರಂಭ & ಈವೆಂಟ್ ಕ್ಯಾಟರಿಂಗ್',
        titleEn: 'Event & Celebration Catering',
        summaryKn: 'ಉಪನಯನ, ಸೀಮಂತ, ಗೃಹಪ್ರವೇಶ, ಹುಟ್ಟುಹಬ್ಬ ಹಾಗೂ ಕಾರ್ಪೊರೇಟ್ ಸಮಾರಂಭಗಳ ವೈಭವಯುತ ಭೋಜನ.',
        summaryEn: 'Grand vegetarian banquet catering for family milestones, housewarmings, anniversaries, and corporate celebrations.',
        detailsKn: [
          '೫೦ ರಿಂದ ೨೦೦೦ ಜನರವರೆಗಿನ ಸಮಾರಂಭಗಳ ಭೋಜನ ನಿರ್ವಹಣೆ',
          'ದಕ್ಷಿಣ ಭಾರತೀಯ, ಉತ್ತರ ಭಾರತೀಯ ಮತ್ತು ಲೈವ್ ಕೌಂಟರ್‌ಗಳು (ಚಾಟ್ಸ್, ದೋಸೆ, ಜಿಲೇಬಿ)',
          'ಅನುಭವಿ ಅಡುಗೆ ಭಟ್ಟರು ಮತ್ತು ಸೌಜನ್ಯದ ಯೂನಿಫಾರ್ಮ್ ಸಿಬ್ಬಂದಿ',
          'ಉತ್ಕೃಷ್ಟ ಗುಣಮಟ್ಟದ ಪಾತ್ರೆಗಳು, ಬಫೆಟ್ ಅಥವಾ ಟೇಬಲ್ ಸರ್ವಿಸ್'
        ],
        detailsEn: [
          'Scalable culinary management from intimate 50-guest functions to 2000+ banquets',
          'South Indian, North Indian, and Live Artisanal counters (Dosas, Chaats, Jalebi)',
          'Master heritage cooks backed by disciplined, uniformed service stewards',
          'Elegant chafing dish buffet spreads or traditional table-side seated hospitality'
        ],
        highlightsKn: ['೫೦-೨೦೦೦ ಜನರಿಗೆ', 'ಲೈವ್ ಕೌಂಟರ್‌ಗಳು', 'ನುರಿತ ಅಡುಗೆ ಭಟ್ಟರು'],
        highlightsEn: ['50 to 2000+ Guests', 'Live Food Counters', 'Master Chefs']
      },
      {
        id: 'hospitality_arrangements',
        categoryId: 'catering',
        titleKn: 'ಸಾತ್ವಿಕ, ಜೈನ & ಮಲೆನಾಡು ವಿಶೇಷ ಪಾಕಪದ್ಧತಿ',
        titleEn: 'Sattvic, Jain & Regional Malnad Cuisine',
        summaryKn: 'ಈರುಳ್ಳಿ-ಬೆಳ್ಳುಳ್ಳಿ ರಹಿತ ಸಾತ್ವಿಕ ಊಟ, ಜೈನ ಪದ್ಧತಿಯ ಆಹಾರ ಮತ್ತು ಮಲೆನಾಡಿನ ಕಟುಂಬ ಶೈಲಿಯ ಅಪ್ಪಟ ತಿನಿಸುಗಳು.',
        summaryEn: 'Specialized dietary customization: strictly onion-garlic free Sattvic, Jain food, and Malenadu regional delicacies.',
        detailsKn: [
          'ಪೂರ್ಣ ಈರುಳ್ಳಿ-ಬೆಳ್ಳುಳ್ಳಿ ರಹಿತ (No Onion, No Garlic) ಶುದ್ಧ ಸಾತ್ವಿಕ ಅಡುಗೆ',
          'ಜೈನ ಧರ್ಮದ ಕಟ್ಟುನಿಟ್ಟಿನ ನಿಯಮಗಳ ಪಾಲನೆಯೊಂದಿಗೆ ಆಹಾರ ಸಿದ್ಧತೆ',
          'ಮಲೆನಾಡಿನ ಅಕ್ಕಿರೊಟ್ಟಿ, ಹಲಸಿನಕಾಯಿ ತಿನಿಸುಗಳು, ತಂಬುಳಿ ಮತ್ತು ಮಾವಿನಹಣ್ಣಿನ ಸಾಸಿವೆ',
          'ಪ್ರತ್ಯೇಕ ಅಡುಗೆ ಪರಿಕರಗಳು ಮತ್ತು ಪವಿತ್ರತೆಯ ಕಟ್ಟುನಿಟ್ಟಿನ ನಿಗಾ'
        ],
        detailsEn: [
          'Strictly No Onion, No Garlic (Sattvic) culinary protocols prepared with sanctity',
          'Authentic Jain food preparation adhering to traditional root-vegetable exclusions',
          'Traditional Malenadu specialties: Akki Rotti, Tambuli, Jackfruit delicacies, and Kaapi',
          'Dedicated utensils and separate preparation discipline for complete peace of mind'
        ],
        highlightsKn: ['ಸಾತ್ವಿಕ & ಜೈನ ಆಹಾರ', 'ಮಲೆನಾಡು ಅಕ್ಕಿರೊಟ್ಟಿ', 'ಪೂರ್ಣ ಪಾವಿತ್ರ್ಯ'],
        highlightsEn: ['Sattvic & Jain Food', 'Authentic Malnad Delicacies', 'Strict Sanctity']
      }
    ]
  }
];

export function getCategoryById(id: string): ServiceCategoryDef | undefined {
  return serviceCategories.find((c) => c.id === id);
}

export function getSubServiceById(categoryId: string, serviceId: string) {
  const category = getCategoryById(categoryId);
  return category?.services.find((s) => s.id === serviceId);
}
