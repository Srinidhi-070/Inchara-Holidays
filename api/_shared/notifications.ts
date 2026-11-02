/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InquiryRecord, NotificationLog } from '../../src/types/inquiry';
import { getSupabase } from './supabase';

export interface DispatchNotificationResult {
  emailSent: boolean;
  whatsappSent: boolean;
  logs: Partial<NotificationLog>[];
}

/**
 * Generates an executive plain-text & markdown summary for WhatsApp and staff alerts
 */
export function formatStaffInquirySummary(inquiry: InquiryRecord): string {
  const dateStr = new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const categoryLabels: Record<string, string> = {
    holidays: 'Holiday Packages',
    educational: 'Educational & Industrial Tours',
    corporate: 'Corporate & Event Tours',
    transport: 'Transportation & Bookings',
    visa_passport: 'Visa & Passport Assistance',
    catering: 'Catering & Hospitality',
    general: 'General Enquiry'
  };

  const catName = categoryLabels[inquiry.serviceCategory] || inquiry.serviceCategory;

  let payloadLines = '';
  if (inquiry.servicePayload && typeof inquiry.servicePayload === 'object') {
    payloadLines = Object.entries(inquiry.servicePayload)
      .filter(([k, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `• ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join('\n');
  }

  return `*🚨 NEW INQUIRY RECEIVED — INCHARA HOLIDAYS*
----------------------------------------
*Ref:* ${inquiry.referenceNumber}
*Service:* ${catName} (${inquiry.serviceType})
*Time:* ${dateStr} IST

*Customer Information:*
• Name: ${inquiry.customerName}
• Phone: ${inquiry.phone}
• Email: ${inquiry.email || 'Not provided'}
• Language: ${inquiry.preferredLanguage === 'kn' ? 'Kannada (ಕನ್ನಡ)' : 'English'}
• Contact Via: ${inquiry.preferredContactMethod.toUpperCase()}

*Service Requirements:*
${payloadLines || 'Standard consultation requested'}

${inquiry.additionalRequirements ? `*Special Notes:*\n${inquiry.additionalRequirements}\n` : ''}
----------------------------------------
*Admin Action:* Follow up within 2 hours.`;
}

/**
 * Dispatches Email and WhatsApp notifications with resilient logging
 */
export async function dispatchNotifications(inquiry: InquiryRecord): Promise<DispatchNotificationResult> {
  const result: DispatchNotificationResult = {
    emailSent: false,
    whatsappSent: false,
    logs: [],
  };

  const supabase = getSupabase();
  const summaryText = formatStaffInquirySummary(inquiry);
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL || 'inquiries@incharaholidays.com';
  const staffWhatsApp = process.env.STAFF_WHATSAPP_NUMBER || process.env.VITE_WHATSAPP_NUMBER || '919448000000';

  // 1. Email Dispatch
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Inchara Inquiries <notifications@incharaholidays.com>',
          to: [staffEmail],
          subject: `[New Lead - ${inquiry.referenceNumber}] ${inquiry.serviceCategory.toUpperCase()} - ${inquiry.customerName}`,
          text: summaryText,
        }),
      });

      if (emailRes.ok) {
        result.emailSent = true;
        result.logs.push({
          inquiryId: inquiry.id,
          channel: 'email',
          recipient: staffEmail,
          status: 'sent',
          attemptCount: 1,
        });
      } else {
        const errorData = await emailRes.text();
        result.logs.push({
          inquiryId: inquiry.id,
          channel: 'email',
          recipient: staffEmail,
          status: 'failed',
          errorMessage: errorData,
          attemptCount: 1,
        });
      }
    } catch (err: any) {
      result.logs.push({
        inquiryId: inquiry.id,
        channel: 'email',
        recipient: staffEmail,
        status: 'failed',
        errorMessage: err?.message || 'Email network exception',
        attemptCount: 1,
      });
    }
  } else {
    // Mock / Development Logging
    result.logs.push({
      inquiryId: inquiry.id,
      channel: 'email',
      recipient: staffEmail,
      status: 'mock_sent',
      providerResponse: 'Simulated email dispatch (RESEND_API_KEY not configured)',
      attemptCount: 1,
    });
  }

  // 2. WhatsApp Cloud API Dispatch
  const waToken = process.env.WHATSAPP_API_TOKEN;
  const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (waToken && waPhoneId) {
    try {
      const waRes = await fetch(`https://graph.facebook.com/v21.0/${waPhoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${waToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: staffWhatsApp,
          type: 'text',
          text: { body: summaryText },
        }),
      });

      if (waRes.ok) {
        result.whatsappSent = true;
        result.logs.push({
          inquiryId: inquiry.id,
          channel: 'whatsapp',
          recipient: staffWhatsApp,
          status: 'sent',
          attemptCount: 1,
        });
      } else {
        const errorText = await waRes.text();
        result.logs.push({
          inquiryId: inquiry.id,
          channel: 'whatsapp',
          recipient: staffWhatsApp,
          status: 'failed',
          errorMessage: errorText,
          attemptCount: 1,
        });
      }
    } catch (err: any) {
      result.logs.push({
        inquiryId: inquiry.id,
        channel: 'whatsapp',
        recipient: staffWhatsApp,
        status: 'failed',
        errorMessage: err?.message || 'WhatsApp network error',
        attemptCount: 1,
      });
    }
  } else {
    // Mock / Development Logging
    result.logs.push({
      inquiryId: inquiry.id,
      channel: 'whatsapp',
      recipient: staffWhatsApp,
      status: 'mock_sent',
      providerResponse: 'Simulated WhatsApp dispatch (WHATSAPP_API_TOKEN not configured)',
      attemptCount: 1,
    });
  }

  // Persist logs to Supabase if configured
  if (supabase && result.logs.length > 0) {
    try {
      await supabase.from('notification_logs').insert(
        result.logs.map((log) => ({
          inquiry_id: inquiry.id,
          channel: log.channel,
          recipient: log.recipient,
          status: log.status,
          provider_response: log.providerResponse ? { message: log.providerResponse } : null,
          error_message: log.errorMessage || null,
          attempt_count: log.attemptCount || 1,
        }))
      );
    } catch (e) {
      console.warn('[NotificationLogs] Failed to write logs to DB:', e);
    }
  }

  return result;
}
