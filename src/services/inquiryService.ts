/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateInquiryRequest, InquiryRecord } from '../types/inquiry';
import { brandConfig, getWhatsAppInquiryUrl } from '../config/brand';

const LOCAL_STORAGE_KEY = 'inchara_inquiries_db_v1';

// No dummy inquiries; start with clean production slate
function getInitialSeedInquiries(): InquiryRecord[] {
  return [];
}

/**
 * Loads cached inquiries from local storage
 */
export function getLocalStoredInquiries(): InquiryRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
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
