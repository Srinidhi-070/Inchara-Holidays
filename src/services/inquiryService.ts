/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateInquiryRequest, InquiryRecord } from '../types/inquiry';
import { brandConfig, getWhatsAppInquiryUrl } from '../config/brand';

const LOCAL_STORAGE_KEY = 'inchara_inquiries_db_v1';

// Seed sample initial inquiries if local storage is empty so staff can view the admin dashboard immediately
function getInitialSeedInquiries(): InquiryRecord[] {
  return [
    {
      id: 'seed-1',
      referenceNumber: 'ICH-2026-H7K2',
      customerName: 'ಅನನ್ಯಾ ಶರ್ಮ (Ananya Sharma)',
      phone: '+91 98450 12345',
      email: 'ananya.s@gmail.com',
      preferredLanguage: 'kn',
      preferredContactMethod: 'whatsapp',
      serviceCategory: 'holidays',
      serviceType: 'domestic_tours',
      servicePayload: {
        destination: 'ಮೈಸೂರು - ಹಂಪಿ - ಬಾದಾಮಿ ಪಾರಂಪರಿಕ ಪಯಣ',
        scope: 'domestic',
        departureCity: 'Bengaluru',
        travellerCount: 4,
        adultsCount: 4,
        childrenCount: 0,
        travelDates: '2026-11-20 to 2026-11-25',
        budgetTier: 'premium',
      },
      additionalRequirements: 'ಹಿರಿಯರಿಗೆ ಆರಾಮದಾಯಕ ಕೆಳಮಹಡಿಯ ಕೊಠಡಿಗಳು ಮತ್ತು ಶುದ್ಧ ಸಾಂಪ್ರದಾಯಿಕ ಸಸ್ಯಾಹಾರಿ ಊಟ ಬೇಕು.',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'seed-2',
      referenceNumber: 'ICH-2026-M4V9',
      customerName: 'ವಿವೇಕಾನಂದ ಪದವಿ ಕಾಲೇಜು (Vivekananda Degree College)',
      phone: '+91 94498 76543',
      email: 'principal@vdc.edu.in',
      preferredLanguage: 'en',
      preferredContactMethod: 'phone',
      serviceCategory: 'educational',
      serviceType: 'industrial_visits',
      servicePayload: {
        institutionName: 'Vivekananda Degree College, Hassan',
        contactPersonDesignation: 'Prof. Ramesh Rao (HOD Commerce)',
        studentCount: 65,
        facultyCount: 4,
        destination: 'Mangalore & Udupi Coastal Circuit',
        visitPurpose: 'Port visit, cashew processing & banking logistics',
        preferredDates: '2026-12-10',
        transportRequirement: 'bus_only',
        cateringIncluded: true,
      },
      additionalRequirements: 'Require 2 verified 35-seater luxury coaches and packed vegetarian breakfast + lunch.',
      status: 'in_progress',
      assignedStaff: 'Ramesh K (Tour Coordinator)',
      internalNotes: 'Contacted Principal; shared customized quotation for 2 buses and pure veg lunch.',
      nextFollowupDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'seed-3',
      referenceNumber: 'ICH-2026-C8Q3',
      customerName: 'ಟೆಕ್ ಮಹೀಂದ್ರಾ ಬೆಂಗಳೂರು (Tech Mahindra Team)',
      phone: '+91 99800 44321',
      email: 'rohit.mehta@techmahindra.com',
      preferredLanguage: 'en',
      preferredContactMethod: 'whatsapp',
      serviceCategory: 'corporate',
      serviceType: 'corporate_retreats',
      servicePayload: {
        organizationName: 'Tech Mahindra Engineering Team',
        attendeeCount: 40,
        destinationPreference: 'Chikmagalur Coffee Estate',
        preferredDates: '2026-11-28 to 2026-11-30',
        transportRequired: true,
        cateringRequired: true,
        budgetEstimate: '₹3,50,000',
      },
      additionalRequirements: 'Require projector, Wi-Fi for 4-hour strategy meeting, followed by private bonfire & music.',
      status: 'proposal_sent',
      assignedStaff: 'Inchara Corporate Desk',
      internalNotes: 'Sent proposal with 2 luxury plantation estate options. Awaiting procurement sign-off.',
      nextFollowupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: 'seed-4',
      referenceNumber: 'ICH-2026-P2L8',
      customerName: 'ಸುರೇಶ್ & ಪರಿವಾರ (Suresh G)',
      phone: '+91 97400 98765',
      email: 'suresh.mys@gmail.com',
      preferredLanguage: 'kn',
      preferredContactMethod: 'whatsapp',
      serviceCategory: 'catering',
      serviceType: 'pure_veg_catering',
      servicePayload: {
        eventType: 'family_function',
        guestCount: 150,
        eventDate: '2026-12-05',
        venueLocation: 'Mysore Heritage Hall',
        mealSlots: ['lunch'],
        cuisineStyle: 'south_indian_traditional',
        servingStyle: 'banana_leaf_pankti',
      },
      additionalRequirements: 'ಮೈಸೂರು ಪಾಕ್, ಬೆಂಡೆಕಾಯಿ ಗೊಜ್ಜು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಸಾರಿಗೆ ಬಾಳೆ ಎಲೆ ಊಟ.',
      status: 'confirmed',
      assignedStaff: 'Shastry (Head Chef)',
      internalNotes: 'Advance token received; ingredients and plantain leaf procurement booked.',
      createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    }
  ];
}

/**
 * Loads cached inquiries from local storage with initial seed fallback
 */
export function getLocalStoredInquiries(): InquiryRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialSeedInquiries();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialSeedInquiries();
  }
}

/**
 * Saves an inquiry to local storage
 */
export function saveLocalInquiry(inquiry: InquiryRecord): void {
  try {
    const list = getLocalStoredInquiries();
    // Prepend new inquiry
    const updated = [inquiry, ...list.filter((i) => i.id !== inquiry.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('[LocalStorage] Could not save inquiry to local cache:', e);
  }
}

/**
 * Submits customer inquiry:
 * Tries serverless `/api/inquire` first; falls back seamlessly to local database adapter.
 */
export async function submitInquiry(request: CreateInquiryRequest): Promise<{
  success: boolean;
  referenceNumber: string;
  inquiry: InquiryRecord;
  whatsappUrl: string;
  message: string;
}> {
  let referenceNumber = '';
  let inquiryRecord: InquiryRecord | null = null;

  try {
    // 1. Try real serverless endpoint
    const response = await fetch('/api/inquire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Idempotency-Key': request.idempotencyKey || `req_${Date.now()}`,
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      const data = await response.json();
      referenceNumber = data.referenceNumber;
      inquiryRecord = data.inquiry;
    }
  } catch (networkErr) {
    console.info('[InquiryAPI] Serverless endpoint offline or local Vite preview. Using client fallback:', networkErr);
  }

  // 2. Client-side resilience fallback if server was not reachable
  if (!inquiryRecord) {
    const year = new Date().getFullYear();
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let rand = '';
    for (let i = 0; i < 4; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
    referenceNumber = `ICH-${year}-${rand}`;

    const now = new Date().toISOString();
    inquiryRecord = {
      id: crypto.randomUUID(),
      referenceNumber,
      customerName: request.customer.fullName,
      phone: request.customer.phone,
      email: request.customer.email || undefined,
      preferredLanguage: request.customer.preferredLanguage,
      preferredContactMethod: request.customer.preferredContactMethod,
      serviceCategory: request.serviceCategory,
      serviceType: request.serviceType,
      servicePayload: request.servicePayload,
      additionalRequirements: request.customer.additionalRequirements || undefined,
      status: 'new',
      createdAt: now,
      updatedAt: now,
    };

    saveLocalInquiry(inquiryRecord);
  }

  // Also cache locally for immediate admin visibility
  saveLocalInquiry(inquiryRecord);

  // 3. Build WhatsApp instant-connect message
  const waMessage = `ನಮಸ್ಕಾರ Inchara Holidays, ನಾನು ${inquiryRecord.customerName}. ನನ್ನ ಪ್ರವಾಸದ ವಿಚಾರಣೆ Ref: *${referenceNumber}* (${inquiryRecord.serviceCategory} - ${inquiryRecord.serviceType}). ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಿ.`;
  const whatsappUrl = getWhatsAppInquiryUrl(waMessage);

  return {
    success: true,
    referenceNumber,
    inquiry: inquiryRecord,
    whatsappUrl,
    message: request.customer.preferredLanguage === 'kn'
      ? `ನಿಮ್ಮ ವಿಚಾರಣೆ ಸಂಖ್ಯೆ ${referenceNumber} ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ. ಇಂಚರ ಹಾಲಿಡೇಸ್ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.`
      : `Your inquiry ${referenceNumber} has been received. An Inchara Holidays travel coordinator will connect with you shortly.`
  };
}
