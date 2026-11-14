/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — MULTI-CHANNEL NOTIFICATION ENGINE
 * Orchestrates automated WhatsApp Cloud API and Resend Email alerts with
 * independent failure isolation, delivery tracking, and customer acknowledgements.
 */

import { InquiryRecord, NotificationLog, DispatchNotificationResult, NotificationChannel } from './types.js';
import { getSupabase } from './supabase.js';
import { addMemoryNotificationLog, updateMemoryNotificationLog, getMemoryNotificationLogs } from './store.js';

/**
 * Service category display names
 */
const CATEGORY_NAMES: Record<string, string> = {
  holidays: 'Holiday Packages',
  educational: 'Educational & Industrial Tours',
  corporate: 'Corporate & Event Tours',
  transport: 'Transportation & Bookings',
  visa_passport: 'Visa & Passport Assistance',
  catering: 'Catering & Hospitality',
  general: 'General Enquiry',
};

/**
 * Formats a tailored, service-specific plain text summary for WhatsApp & text fallback
 */
export function formatServiceSpecificSummary(inquiry: InquiryRecord): string {
  const dateStr = new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const categoryLabel = CATEGORY_NAMES[inquiry.serviceCategory] || inquiry.serviceCategory;

  let serviceDetails = '';
  const payload = inquiry.servicePayload || {};

  switch (inquiry.serviceCategory) {
    case 'holidays':
      serviceDetails = [
        `• Destination: ${payload.destination || 'Customized / Flexible'}`,
        `• Scope: ${payload.scope === 'international' ? 'International' : payload.scope === 'both' ? 'Domestic & International' : 'Domestic'}`,
        `• Package: ${payload.packageType || 'Custom itinerary'}`,
        `• Travel Dates: ${payload.travelDates || 'Flexible'}`,
        `• Guests: ${payload.travellerCount || payload.adultsCount || 1} Travellers`,
        payload.budgetTier ? `• Budget Tier: ${payload.budgetTier}` : '',
      ].filter(Boolean).join('\n');
      break;

    case 'educational':
      serviceDetails = [
        `• Institution: ${payload.institutionName || 'Not specified'}`,
        `• Tour Type: ${payload.tourType || inquiry.serviceType}`,
        `• Students: ${payload.studentCount || 'TBD'} | Faculty: ${payload.facultyCount || 'TBD'}`,
        `• Destination: ${payload.destination || 'Flexible'}`,
        `• Dates: ${payload.preferredDates || 'Flexible'}`,
        `• Transport: ${payload.transportRequirement || 'Bus required'}`,
        `• Catering: ${payload.cateringIncluded ? 'Pure Veg Catering Included' : 'Not required'}`,
      ].filter(Boolean).join('\n');
      break;

    case 'corporate':
      serviceDetails = [
        `• Organization: ${payload.organizationName || 'Corporate Client'}`,
        `• Event Type: ${payload.tourType || inquiry.serviceType}`,
        `• Attendees: ${payload.attendeeCount || 'TBD'} Guests`,
        `• Location: ${payload.destinationPreference || 'Flexible'}`,
        `• Dates: ${payload.preferredDates || 'Flexible'}`,
        `• Logistics: ${payload.transportRequired ? 'Transport' : ''} ${payload.cateringRequired ? '+ Pure Veg Catering' : ''}`.trim(),
      ].filter(Boolean).join('\n');
      break;

    case 'transport':
      serviceDetails = [
        `• Requirement: ${payload.rentalType || inquiry.serviceType}`,
        `• Vehicle Preference: ${payload.vehiclePreference || 'Chauffeur Fleet'}`,
        `• Passengers: ${payload.passengerCount || 'TBD'}`,
        `• Route: ${payload.pickupLocation || 'Bengaluru'} → ${payload.dropLocation || payload.destination || 'Flexible'}`,
        `• Dates: ${payload.travelDates || 'Flexible'}`,
      ].filter(Boolean).join('\n');
      break;

    case 'visa_passport':
      serviceDetails = [
        `• Category: ${payload.assistanceType || inquiry.serviceType}`,
        `• Target Country: ${payload.destinationCountry || payload.country || 'Multiple'}`,
        `• Applicants: ${payload.applicantCount || 1} Travellers`,
        `• Travel Date: ${payload.plannedTravelDate || 'Flexible'}`,
      ].filter(Boolean).join('\n');
      break;

    case 'catering':
      serviceDetails = [
        `• Event: ${payload.eventType || inquiry.serviceType}`,
        `• Service Style: ${payload.serviceStyle || '100% Pure Veg Banana Leaf Feast'}`,
        `• Estimated Guests: ${payload.guestCount || 'TBD'}`,
        `• Event Date: ${payload.eventDate || 'Flexible'}`,
        `• Venue/City: ${payload.venueCity || 'Bengaluru / Mysuru'}`,
      ].filter(Boolean).join('\n');
      break;

    default:
      serviceDetails = Object.entries(payload)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `• ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
        .join('\n');
      break;
  }

  return `*🌿 INCHARA HOLIDAYS — NEW CUSTOMER ENQUIRY*
----------------------------------------
*Ref:* ${inquiry.referenceNumber}
*Service:* ${categoryLabel}
*Received:* ${dateStr} IST

*CUSTOMER DETAILS*
• Name: ${inquiry.customerName}
• Phone: ${inquiry.phone}
• Email: ${inquiry.email || 'Not provided'}
• Preferred Language: ${inquiry.preferredLanguage === 'kn' ? 'Kannada (ಕನ್ನಡ)' : 'English'}
• Contact Channel: ${inquiry.preferredContactMethod.toUpperCase()}

*REQUIREMENTS*
${serviceDetails || 'Standard consultation requested'}

${inquiry.additionalRequirements ? `*CUSTOMER NOTES*\n"${inquiry.additionalRequirements}"\n` : ''}----------------------------------------
*ACTION REQUIRED:*
Ravindra S, please contact customer and update enquiry status.
Admin ref: ${inquiry.referenceNumber}`;
}

/**
 * Builds responsive, branded HTML email for the business owner
 */
export function buildOwnerAlertHtml(inquiry: InquiryRecord): string {
  const categoryLabel = CATEGORY_NAMES[inquiry.serviceCategory] || inquiry.serviceCategory;
  const dateStr = new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enquiry ${inquiry.referenceNumber}</title>
</head>
<body style="margin:0;padding:0;background-color:#FBF8F1;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#162E22;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FBF8F1;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background-color:#ffffff;border:1px solid #E5DFD3;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(22,46,34,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#162E22;padding:24px 28px;border-bottom:3px solid #D4AF37;">
              <table width="100%">
                <tr>
                  <td>
                    <span style="display:inline-block;color:#F5D77F;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">INCHARA HOLIDAYS · OPERATIONS ALERT</span>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-family:'Playfair Display',Georgia,serif;font-weight:700;">New Enquiry Received</h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background-color:rgba(212,175,55,0.15);border:1px solid #D4AF37;color:#F5D77F;font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;font-family:monospace;">
                      ${inquiry.referenceNumber}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Pill -->
          <tr>
            <td style="padding:20px 28px 12px;background-color:#F6F3EA;border-bottom:1px solid #E5DFD3;">
              <table width="100%">
                <tr>
                  <td style="font-size:13px;color:#9E3D28;font-weight:700;">
                    ${categoryLabel.toUpperCase()}
                  </td>
                  <td align="right" style="font-size:12px;color:#252923;opacity:0.7;">
                    ${dateStr} IST
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Dossier -->
          <tr>
            <td style="padding:24px 28px;">
              <h2 style="margin:0 0 14px;color:#162E22;font-size:14px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;border-bottom:1px solid #E5DFD3;padding-bottom:6px;">
                Customer Information
              </h2>
              <table width="100%" style="font-size:14px;line-height:1.6;color:#252923;">
                <tr>
                  <td width="35%" style="color:#666;padding:4px 0;">Customer Name:</td>
                  <td style="font-weight:700;color:#162E22;">${inquiry.customerName}</td>
                </tr>
                <tr>
                  <td style="color:#666;padding:4px 0;">Mobile Phone:</td>
                  <td><a href="tel:${inquiry.phone}" style="color:#162E22;font-weight:600;text-decoration:none;">${inquiry.phone}</a></td>
                </tr>
                <tr>
                  <td style="color:#666;padding:4px 0;">Email Address:</td>
                  <td>${inquiry.email ? `<a href="mailto:${inquiry.email}" style="color:#9E3D28;text-decoration:none;">${inquiry.email}</a>` : '<span style="color:#999;">Not provided</span>'}</td>
                </tr>
                <tr>
                  <td style="color:#666;padding:4px 0;">Preferred Language:</td>
                  <td>${inquiry.preferredLanguage === 'kn' ? 'Kannada (ಕನ್ನಡ)' : 'English'}</td>
                </tr>
                <tr>
                  <td style="color:#666;padding:4px 0;">Preferred Contact:</td>
                  <td><strong style="text-transform:uppercase;color:#162E22;">${inquiry.preferredContactMethod}</strong></td>
                </tr>
              </table>

              <!-- Requirements Details -->
              <h2 style="margin:24px 0 14px;color:#162E22;font-size:14px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;border-bottom:1px solid #E5DFD3;padding-bottom:6px;">
                Enquiry Requirements
              </h2>
              <div style="background-color:#FBF8F1;border:1px solid #E5DFD3;border-radius:8px;padding:14px;font-size:13px;line-height:1.6;">
                <pre style="margin:0;font-family:inherit;white-space:pre-wrap;color:#252923;">${JSON.stringify(inquiry.servicePayload || {}, null, 2)}</pre>
              </div>

              ${inquiry.additionalRequirements ? `
              <h2 style="margin:20px 0 10px;color:#162E22;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">
                Customer Message
              </h2>
              <div style="background-color:#fff7ed;border-left:3px solid #9E3D28;padding:10px 14px;font-size:13px;font-style:italic;color:#252923;">
                "${inquiry.additionalRequirements}"
              </div>` : ''}

              <!-- Action Call -->
              <div style="margin-top:28px;padding:18px;background-color:#162E22;border-radius:8px;text-align:center;">
                <span style="display:block;color:#F5D77F;font-size:12px;font-weight:600;margin-bottom:8px;">SOLO OPERATOR ACTION REQUIRED</span>
                <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaskara ${inquiry.customerName}, Ravindra here from Inchara Holidays regarding your enquiry ${inquiry.referenceNumber}.`)}" 
                   style="display:inline-block;background-color:#25D366;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:6px;margin:4px;">
                  Open WhatsApp Chat ↗
                </a>
                <a href="tel:${inquiry.phone}" 
                   style="display:inline-block;background-color:#D4AF37;color:#12261C;font-size:13px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:6px;margin:4px;">
                  Call Customer
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F6F3EA;padding:16px 28px;text-align:center;font-size:11px;color:#666;border-top:1px solid #E5DFD3;">
              Inchara Holidays Operating Desk · 7/1, 6th Cross Rd, Malleshwaram, Bengaluru 560003<br>
              Curator: Ravindra S · Phone: +91 90361 74880 · inchara-holidays.vercel.app
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Builds responsive, warm customer acknowledgement HTML email
 */
export function buildCustomerAckHtml(inquiry: InquiryRecord): string {
  const isKn = inquiry.preferredLanguage === 'kn';
  const categoryLabel = CATEGORY_NAMES[inquiry.serviceCategory] || inquiry.serviceCategory;

  return `<!DOCTYPE html>
<html lang="${isKn ? 'kn' : 'en'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isKn ? 'ನಿಮ್ಮ ಪ್ರವಾಸ ವಿಚಾರಣೆ ದಾಖಲಾಗಿದೆ' : 'Enquiry Acknowledged — Inchara Holidays'}</title>
</head>
<body style="margin:0;padding:0;background-color:#FBF8F1;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#162E22;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FBF8F1;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border:1px solid #E5DFD3;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(22,46,34,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#162E22;padding:24px 28px;border-bottom:3px solid #D4AF37;text-align:center;">
              <span style="display:inline-block;color:#F5D77F;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">INCHARA HOLIDAYS · ಇಂಚರ ಹಾಲಿಡೇಸ್</span>
              <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-family:'Playfair Display',Georgia,serif;font-weight:700;">
                ${isKn ? 'ನಮಸ್ಕಾರ, ನಿಮ್ಮ ವಿಚಾರಣೆ ನಮಗೆ ತಲುಪಿದೆ' : 'Thank You for Contacting Us'}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 28px 20px;">
              <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">
                ${isKn 
                  ? `ಆತ್ಮೀಯ <strong>${inquiry.customerName}</strong> ಅವರಿಗೆ,`
                  : `Dear <strong>${inquiry.customerName}</strong>,`}
              </p>
              <p style="font-size:14px;line-height:1.6;color:#252923;margin:0 0 16px;">
                ${isKn
                  ? `ಇಂಚರ ಹಾಲಿಡೇಸ್ ಮೂಲಕ <strong>${categoryLabel}</strong> ಸೇವೆಗಾಗಿ ನೀವು ಸಲ್ಲಿಸಿದ ವಿಚಾರಣೆ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ.`
                  : `We have received your enquiry for <strong>${categoryLabel}</strong> with Inchara Holidays.`}
              </p>

              <!-- Reference Card -->
              <div style="background-color:#F6F3EA;border:1px solid #D4AF37;border-radius:8px;padding:16px;text-align:center;margin:20px 0;">
                <span style="display:block;font-size:11px;color:#9E3D28;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">
                  ${isKn ? 'ವಿಚಾರಣೆ ಸಂಖ್ಯೆ' : 'ENQUIRY REFERENCE NUMBER'}
                </span>
                <span style="display:block;font-size:20px;font-weight:800;font-family:monospace;color:#162E22;">
                  ${inquiry.referenceNumber}
                </span>
              </div>

              <p style="font-size:14px;line-height:1.6;color:#252923;margin:0 0 16px;">
                ${isKn
                  ? 'ನಮ್ಮ ಸಂಸ್ಥೆಯ ಮಾಲೀಕರು ಮತ್ತು ಪ್ರಧಾನ ಮಾರ್ಗದರ್ಶಕರಾದ <strong>ರವೀಂದ್ರ ಎಸ್</strong> ಅವರು ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ವೈಯಕ್ತಿಕವಾಗಿ ಪರಿಶೀಲಿಸಿ, ಶೀಘ್ರದಲ್ಲೇ ಸೂಕ್ತ ವಿವರಗಳೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.'
                  : 'Our owner-operator, <strong>Ravindra S</strong>, will personally review your itinerary preferences and connect with you shortly.'}
              </p>

              <p style="font-size:14px;line-height:1.6;color:#252923;margin:0 0 24px;">
                ${isKn
                  ? 'ತುರ್ತು ಮಾಹಿತಿ ಅಥವಾ ನೇರ ಸಂಪರ್ಕಕ್ಕಾಗಿ ನಮ್ಮ ವಾಟ್ಸಾಪ್ ಸಹಾಯವಾಣಿಗೆ ಸಂದೇಶ ಕಳುಹಿಸಬಹುದು:'
                  : 'If you have urgent travel requirements, feel free to message our desk directly via WhatsApp:'}
              </p>

              <div style="text-align:center;margin-bottom:20px;">
                <a href="https://wa.me/919036174880?text=${encodeURIComponent(`Namaskara Ravindra, following up on my enquiry ${inquiry.referenceNumber}.`)}"
                   style="display:inline-block;background-color:#25D366;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:6px;">
                  ${isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ (+91 90361 74880)' : 'Chat on WhatsApp (+91 90361 74880)'}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F6F3EA;padding:16px 28px;text-align:center;font-size:11px;color:#666;border-top:1px solid #E5DFD3;">
              <strong>Inchara Holidays</strong> · Premier South Indian Travel & Pure Veg Hospitality<br>
              Bengaluru Operating Desk: Malleshwaram, Bengaluru - 560003<br>
              Phone: +91 90361 74880 · inchara-holidays.vercel.app
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Saves a notification log entry to Supabase or in-memory fallback
 */
async function recordNotificationLog(log: NotificationLog): Promise<void> {
  const supabase = getSupabase();
  const nowIso = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase.from('notification_logs').insert({
        id: log.id,
        inquiry_id: log.inquiryId,
        inquiry_reference: log.inquiryReference || null,
        customer_name: log.customerName || null,
        channel: log.channel,
        recipient: log.recipient,
        template_name: log.templateName || null,
        status: log.status,
        provider_message_id: log.providerMessageId || null,
        provider_response: log.providerResponse ? JSON.stringify(log.providerResponse) : null,
        error_message: log.errorMessage || null,
        attempt_count: log.attemptCount,
        last_attempt_at: log.lastAttemptAt || nowIso,
        created_at: log.createdAt || nowIso,
      });

      if (error) {
        console.warn('[Notification Log DB Write Error]:', error);
        addMemoryNotificationLog(log);
      }
    } catch (dbErr) {
      console.warn('[Notification Log DB Write Failed]:', dbErr);
      addMemoryNotificationLog(log);
    }
  } else {
    addMemoryNotificationLog(log);
  }
}

/**
 * Dispatches an automated WhatsApp notification via Meta WhatsApp Business Cloud API
 */
async function dispatchWhatsAppNotification(
  inquiry: InquiryRecord,
  recipientPhone: string,
  templateName = 'inchara_new_enquiry_owner'
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const waToken = process.env.WHATSAPP_API_TOKEN;
  const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!waToken || !waPhoneId) {
    return {
      success: false,
      error: 'WHATSAPP_API_TOKEN or WHATSAPP_PHONE_NUMBER_ID environment variable not configured',
    };
  }

  const cleanRecipient = recipientPhone.replace(/[^0-9]/g, '');
  const summaryText = formatServiceSpecificSummary(inquiry);

  try {
    const waRes = await fetch(`https://graph.facebook.com/v21.0/${waPhoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${waToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanRecipient,
        type: 'text',
        text: {
          preview_url: false,
          body: summaryText,
        },
      }),
    });

    const data = await waRes.json();

    if (waRes.ok && data?.messages?.[0]?.id) {
      return {
        success: true,
        messageId: data.messages[0].id,
      };
    }

    const errDetail = data?.error?.message || JSON.stringify(data);
    return {
      success: false,
      error: `Meta WhatsApp API error: ${errDetail}`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Meta WhatsApp network request failed',
    };
  }
}

/**
 * Dispatches an automated transactional email via Resend API
 */
async function dispatchEmailNotification(
  toEmail: string,
  subject: string,
  htmlContent: string,
  textFallback: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return {
      success: false,
      error: 'RESEND_API_KEY environment variable not configured',
    };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Inchara Holidays <notifications@incharaholidays.com>';

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html: htmlContent,
        text: textFallback,
      }),
    });

    const data = await emailRes.json();

    if (emailRes.ok && data?.id) {
      return {
        success: true,
        messageId: data.id,
      };
    }

    const errDetail = data?.message || JSON.stringify(data);
    return {
      success: false,
      error: `Resend API error: ${errDetail}`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Resend network request failed',
    };
  }
}

/**
 * MASTER DISPATCHER: Orchestrates all automated notification jobs with independent failure isolation.
 * Workflow:
 *  1. WhatsApp alert to Owner (Ravindra S)
 *  2. Email alert to Owner (HTML dossier)
 *  3. Email acknowledgement to Customer (if email provided)
 *  4. Complete audit log persisted to database
 */
export async function dispatchNotifications(inquiry: InquiryRecord): Promise<DispatchNotificationResult> {
  const result: DispatchNotificationResult = {
    emailSent: false,
    whatsappSent: false,
    customerAckSent: false,
    logs: [],
  };

  const nowIso = new Date().toISOString();
  const staffWhatsApp = process.env.STAFF_WHATSAPP_NUMBER || process.env.VITE_WHATSAPP_NUMBER || '919036174880';
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL || 'info@incharaholidays.com';

  // =========================================================================
  // JOB 1: WhatsApp Notification to Business Owner
  // =========================================================================
  const waOwnerLogId = crypto.randomUUID();
  const waResult = await dispatchWhatsAppNotification(inquiry, staffWhatsApp);

  const waLog: NotificationLog = {
    id: waOwnerLogId,
    inquiryId: inquiry.id,
    inquiryReference: inquiry.referenceNumber,
    customerName: inquiry.customerName,
    channel: 'whatsapp',
    recipient: staffWhatsApp,
    templateName: 'inchara_new_enquiry_owner',
    status: waResult.success ? 'sent' : 'failed',
    providerMessageId: waResult.messageId,
    errorMessage: waResult.error,
    attemptCount: 1,
    lastAttemptAt: nowIso,
    createdAt: nowIso,
  };

  result.whatsappSent = waResult.success;
  result.logs.push(waLog);
  await recordNotificationLog(waLog);

  // =========================================================================
  // JOB 2: Branded HTML Email Alert to Business Owner
  // =========================================================================
  const emailOwnerLogId = crypto.randomUUID();
  const ownerSubject = `New ${CATEGORY_NAMES[inquiry.serviceCategory] || 'Travel'} Enquiry — ${inquiry.customerName} [${inquiry.referenceNumber}]`;
  const ownerHtml = buildOwnerAlertHtml(inquiry);
  const ownerText = formatServiceSpecificSummary(inquiry);

  const emailResult = await dispatchEmailNotification(staffEmail, ownerSubject, ownerHtml, ownerText);

  const emailLog: NotificationLog = {
    id: emailOwnerLogId,
    inquiryId: inquiry.id,
    inquiryReference: inquiry.referenceNumber,
    customerName: inquiry.customerName,
    channel: 'email',
    recipient: staffEmail,
    templateName: 'inchara_owner_dossier_v1',
    status: emailResult.success ? 'sent' : 'failed',
    providerMessageId: emailResult.messageId,
    errorMessage: emailResult.error,
    attemptCount: 1,
    lastAttemptAt: nowIso,
    createdAt: nowIso,
  };

  result.emailSent = emailResult.success;
  result.logs.push(emailLog);
  await recordNotificationLog(emailLog);

  // =========================================================================
  // JOB 3: Automated Customer Acknowledgement Email (if email provided)
  // =========================================================================
  if (inquiry.email && inquiry.email.includes('@')) {
    const custAckLogId = crypto.randomUUID();
    const custSubject = inquiry.preferredLanguage === 'kn'
      ? `ಇಂಚರ ಹಾಲಿಡೇಸ್ — ನಿಮ್ಮ ವಿಚಾರಣೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ [${inquiry.referenceNumber}]`
      : `Enquiry Received — Inchara Holidays [${inquiry.referenceNumber}]`;
    const custHtml = buildCustomerAckHtml(inquiry);
    const custText = `Hello ${inquiry.customerName},\nThank you for reaching out to Inchara Holidays. We have received your enquiry for ${CATEGORY_NAMES[inquiry.serviceCategory]} (Ref: ${inquiry.referenceNumber}). Our curator, Ravindra S, will personally review your preferences and contact you shortly.\n\nWarm regards,\nRavindra S · Inchara Holidays\n+91 90361 74880`;

    const custResult = await dispatchEmailNotification(inquiry.email, custSubject, custHtml, custText);

    const custLog: NotificationLog = {
      id: custAckLogId,
      inquiryId: inquiry.id,
      inquiryReference: inquiry.referenceNumber,
      customerName: inquiry.customerName,
      channel: 'email',
      recipient: inquiry.email,
      templateName: 'inchara_customer_ack_v1',
      status: custResult.success ? 'sent' : 'failed',
      providerMessageId: custResult.messageId,
      errorMessage: custResult.error,
      attemptCount: 1,
      lastAttemptAt: nowIso,
      createdAt: nowIso,
    };

    result.customerAckSent = custResult.success;
    result.logs.push(custLog);
    await recordNotificationLog(custLog);
  }

  return result;
}

/**
 * RETRY ENGINE: Re-attempts dispatching a failed notification job.
 * Avoids duplicate enquiry creation and updates the existing log record.
 */
export async function retryNotification(logId: string): Promise<{ success: boolean; log: NotificationLog | null; error?: string }> {
  const supabase = getSupabase();
  let existingLog: NotificationLog | null = null;

  if (supabase) {
    const { data } = await supabase
      .from('notification_logs')
      .select('*')
      .eq('id', logId)
      .maybeSingle();

    if (data) {
      existingLog = {
        id: data.id,
        inquiryId: data.inquiry_id,
        inquiryReference: data.inquiry_reference,
        customerName: data.customer_name,
        channel: data.channel,
        recipient: data.recipient,
        templateName: data.template_name,
        status: data.status,
        providerMessageId: data.provider_message_id,
        errorMessage: data.error_message,
        attemptCount: data.attempt_count || 1,
        lastAttemptAt: data.last_attempt_at,
        createdAt: data.created_at,
      };
    }
  }

  if (!existingLog) {
    const memLogs = getMemoryNotificationLogs();
    existingLog = memLogs.find((l) => l.id === logId) || null;
  }

  if (!existingLog) {
    return { success: false, log: null, error: `Notification log ${logId} not found` };
  }

  // Fetch associated inquiry
  let inquiry: InquiryRecord | null = null;
  if (supabase) {
    const { data: inqData } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', existingLog.inquiryId)
      .maybeSingle();

    if (inqData) {
      inquiry = {
        id: inqData.id,
        referenceNumber: inqData.reference_number,
        customerName: inqData.customer_name,
        phone: inqData.phone,
        email: inqData.email,
        preferredLanguage: inqData.preferred_language,
        preferredContactMethod: inqData.preferred_contact_method,
        serviceCategory: inqData.service_category,
        serviceType: inqData.service_type,
        servicePayload: inqData.service_payload || {},
        additionalRequirements: inqData.additional_requirements,
        status: inqData.status,
        createdAt: inqData.created_at,
        updatedAt: inqData.updated_at,
      };
    }
  }

  if (!inquiry) {
    return { success: false, log: existingLog, error: 'Associated inquiry record not found' };
  }

  const nowIso = new Date().toISOString();
  let dispatchRes: { success: boolean; messageId?: string; error?: string };

  if (existingLog.channel === 'whatsapp') {
    dispatchRes = await dispatchWhatsAppNotification(inquiry, existingLog.recipient);
  } else {
    const isAck = existingLog.templateName?.includes('customer_ack');
    const subject = isAck
      ? `Enquiry Received — Inchara Holidays [${inquiry.referenceNumber}]`
      : `[Retry] New Enquiry — ${inquiry.customerName} [${inquiry.referenceNumber}]`;
    const html = isAck ? buildCustomerAckHtml(inquiry) : buildOwnerAlertHtml(inquiry);
    const text = formatServiceSpecificSummary(inquiry);
    dispatchRes = await dispatchEmailNotification(existingLog.recipient, subject, html, text);
  }

  const updatedLog: NotificationLog = {
    ...existingLog,
    status: dispatchRes.success ? 'sent' : 'failed',
    providerMessageId: dispatchRes.messageId || existingLog.providerMessageId,
    errorMessage: dispatchRes.error || undefined,
    attemptCount: (existingLog.attemptCount || 1) + 1,
    lastAttemptAt: nowIso,
  };

  if (supabase) {
    await supabase.from('notification_logs').update({
      status: updatedLog.status,
      provider_message_id: updatedLog.providerMessageId,
      error_message: updatedLog.errorMessage || null,
      attempt_count: updatedLog.attemptCount,
      last_attempt_at: updatedLog.lastAttemptAt,
    }).eq('id', logId);
  } else {
    updateMemoryNotificationLog(logId, updatedLog);
  }

  return { success: dispatchRes.success, log: updatedLog, error: dispatchRes.error };
}

/**
 * Retrieves all notification logs for admin inspection
 */
export async function getNotificationLogs(limit = 50): Promise<NotificationLog[]> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('notification_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!error && data) {
        return data.map((d) => ({
          id: d.id,
          inquiryId: d.inquiry_id,
          inquiryReference: d.inquiry_reference || '',
          customerName: d.customer_name || '',
          channel: d.channel,
          recipient: d.recipient,
          templateName: d.template_name || '',
          status: d.status,
          providerMessageId: d.provider_message_id || undefined,
          errorMessage: d.error_message || undefined,
          attemptCount: d.attempt_count || 1,
          lastAttemptAt: d.last_attempt_at,
          createdAt: d.created_at,
        }));
      }
    } catch (e) {
      console.warn('[NotificationLogs] Supabase query failed, falling back to memory:', e);
    }
  }

  return getMemoryNotificationLogs().slice(0, limit);
}
