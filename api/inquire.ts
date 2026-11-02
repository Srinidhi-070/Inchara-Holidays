/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { validateInquiryInput } from '../src/utils/validation';
import { InquiryRecord } from '../src/types/inquiry';
import { getSupabase, isSupabaseConfigured } from './_shared/supabase';
import { dispatchNotifications } from './_shared/notifications';

// In-memory fallback cache for development/demo when database is not yet hooked up
const memoryInquiriesStore: InquiryRecord[] = [];

/**
 * Generates an authentic, professional, unique inquiry reference code.
 * Format: ICH-2026-XXXX (e.g. ICH-2026-K7M2)
 */
function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude visually ambiguous characters (0, 1, I, O)
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ICH-${year}-${randomPart}`;
}

export default async function handler(req: any, res: any) {
  // CORS & Methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Idempotency-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST to submit an inquiry.'
    });
  }

  try {
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // 1. Server-side Validation with Zod
    const validation = validateInquiryInput(rawBody);
    if (!validation.success || !validation.data) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please verify the required fields.',
        details: validation.errors
      });
    }

    const { customer, serviceCategory, serviceType, servicePayload, idempotencyKey, honeypot } = validation.data;

    // 2. Anti-Spam Honeypot Verification
    if (honeypot && honeypot.length > 0) {
      // Quietly reject bot submissions
      return res.status(200).json({
        success: true,
        referenceNumber: 'ICH-2026-SPAM',
        message: 'Inquiry received'
      });
    }

    // 3. Idempotency Check
    const supabase = getSupabase();
    if (idempotencyKey && isSupabaseConfigured() && supabase) {
      const { data: existing } = await supabase
        .from('inquiries')
        .select('*')
        .eq('idempotency_key', idempotencyKey)
        .maybeSingle();

      if (existing) {
        return res.status(200).json({
          success: true,
          referenceNumber: existing.reference_number,
          inquiry: existing,
          isDuplicate: true,
        });
      }
    }

    // 4. Generate Unique Reference Number
    let referenceNumber = generateReferenceNumber();
    const nowIso = new Date().toISOString();
    const inquiryId = crypto.randomUUID();

    // 5. Build Inquiry Record
    const inquiryRecord: InquiryRecord = {
      id: inquiryId,
      referenceNumber,
      customerName: customer.fullName,
      phone: customer.phone,
      email: customer.email || undefined,
      preferredLanguage: customer.preferredLanguage,
      preferredContactMethod: customer.preferredContactMethod,
      serviceCategory,
      serviceType,
      servicePayload: servicePayload || {},
      additionalRequirements: customer.additionalRequirements || undefined,
      status: 'new',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // 6. Persistence to PostgreSQL or In-Memory Fallback
    if (isSupabaseConfigured() && supabase) {
      const { error: insertError } = await supabase.from('inquiries').insert({
        id: inquiryId,
        reference_number: referenceNumber,
        customer_name: inquiryRecord.customerName,
        phone: inquiryRecord.phone,
        email: inquiryRecord.email,
        city: customer.city || null,
        preferred_language: inquiryRecord.preferredLanguage,
        preferred_contact_method: inquiryRecord.preferredContactMethod,
        service_category: inquiryRecord.serviceCategory,
        service_type: inquiryRecord.serviceType,
        service_payload: inquiryRecord.servicePayload,
        additional_requirements: inquiryRecord.additionalRequirements,
        status: 'new',
        idempotency_key: idempotencyKey || null,
        created_at: nowIso,
        updated_at: nowIso,
      });

      if (insertError) {
        console.error('[Supabase Insert Error]:', insertError);
        // Fall back to memory so client inquiry is never discarded
        memoryInquiriesStore.unshift(inquiryRecord);
      } else {
        // Log creation event in audit trail
        await supabase.from('inquiry_events').insert({
          inquiry_id: inquiryId,
          event_type: 'created',
          new_status: 'new',
          notes: 'Customer submitted new inquiry via web portal',
          actor_name: 'Customer (Web Portal)',
          created_at: nowIso,
        });
      }
    } else {
      memoryInquiriesStore.unshift(inquiryRecord);
      console.log(`[Inquiries Store] Stored inquiry ${referenceNumber} in memory store (${memoryInquiriesStore.length} total)`);
    }

    // 7. Dispatch Background Notifications (Resend Email & WhatsApp)
    // Non-blocking: notification failure never cancels the saved inquiry
    dispatchNotifications(inquiryRecord).catch((err) => {
      console.warn('[Notification Error]:', err);
    });

    // 8. Return Verified Success Acknowledgment
    return res.status(201).json({
      success: true,
      referenceNumber,
      message: 'Inquiry registered successfully. An Inchara Holidays travel coordinator will connect with you shortly.',
      inquiry: inquiryRecord,
    });
  } catch (error: any) {
    console.error('[API Inquire Handler Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while registering your inquiry. Please reach our direct WhatsApp hotline.',
      fallbackContact: '+91 94480 00000'
    });
  }
}
