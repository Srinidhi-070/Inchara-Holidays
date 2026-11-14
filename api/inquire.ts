/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — SERVERLESS INQUIRY SUBMISSION HANDLER
 * Completely self-contained within api/ directory for zero-error Vercel execution.
 */

import { validateInquiryInput } from './_shared/validation.js';
import { InquiryRecord } from './_shared/types.js';
import { getSupabase, isSupabaseConfigured } from './_shared/supabase.js';
import { dispatchNotifications } from './_shared/notifications.js';
import { addMemoryInquiry } from './_shared/store.js';

/**
 * Generates unique reference code: ICH-YYYY-XXXX (e.g. ICH-2026-K7M2)
 */
function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ICH-${year}-${rand}`;
}

export default async function handler(req: any, res: any) {
  // CORS & Preflight
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
        error: 'Validation failed. Please verify required fields.',
        details: validation.errors
      });
    }

    const { customer, serviceCategory, serviceType, servicePayload, idempotencyKey, honeypot } = validation.data;

    // 2. Anti-Spam Honeypot Gate
    if (honeypot && honeypot.length > 0) {
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

    // 4. Generate Unique Reference Code
    const referenceNumber = generateReferenceNumber();
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
      servicePayload: (servicePayload as Record<string, unknown>) || {},
      additionalRequirements: customer.additionalRequirements || undefined,
      status: 'new',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // 6. Persistence: Supabase PostgreSQL First, In-Memory Fallback Second
    let isPersistedToDb = false;
    if (isSupabaseConfigured() && supabase) {
      const { error: insertError } = await supabase.from('inquiries').insert({
        id: inquiryId,
        reference_number: referenceNumber,
        customer_name: inquiryRecord.customerName,
        phone: inquiryRecord.phone,
        email: inquiryRecord.email || null,
        city: customer.city || null,
        preferred_language: inquiryRecord.preferredLanguage,
        preferred_contact_method: inquiryRecord.preferredContactMethod,
        service_category: inquiryRecord.serviceCategory,
        service_type: inquiryRecord.serviceType,
        service_payload: inquiryRecord.servicePayload,
        additional_requirements: inquiryRecord.additionalRequirements || null,
        status: 'new',
        idempotency_key: idempotencyKey || null,
        created_at: nowIso,
        updated_at: nowIso,
      });

      if (!insertError) {
        isPersistedToDb = true;
        // Record creation event in audit trail
        try {
          await supabase.from('inquiry_events').insert({
            inquiry_id: inquiryId,
            event_type: 'created',
            new_status: 'new',
            notes: 'Customer submitted new inquiry via web portal',
            actor_name: 'Customer (Web Portal)',
            created_at: nowIso,
          });
        } catch (eventErr) {
          console.warn('[Audit Trail Event Warning]:', eventErr);
        }
      } else {
        console.error('[Supabase Insert Error]:', insertError);
        addMemoryInquiry(inquiryRecord);
      }
    } else {
      addMemoryInquiry(inquiryRecord);
    }

    // 7. Multi-Channel Automated Notification Dispatch (Independent Failure Isolation)
    // Awaited to guarantee serverless execution completes both WhatsApp and Email jobs.
    // If notifications fail, the inquiry record remains permanently saved in the database.
    try {
      await dispatchNotifications(inquiryRecord);
    } catch (notifErr) {
      console.warn('[Notification Dispatch Warning]:', notifErr);
    }

    // 8. Return Verified Success Acknowledgment
    return res.status(201).json({
      success: true,
      referenceNumber,
      message: 'Inquiry registered successfully. An Inchara Holidays travel coordinator will connect with you shortly.',
      inquiry: inquiryRecord,
      persistedToDatabase: isPersistedToDb,
    });
  } catch (error: any) {
    console.error('[API Inquire Handler Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while registering your inquiry. Please reach our direct WhatsApp hotline.',
      fallbackContact: '+91 90361 74880'
    });
  }
}
