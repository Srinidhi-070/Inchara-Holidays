/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InquiryRecord, QuotationRecord, PaymentRecord } from '../types/inquiry';
import { brandConfig } from '../config/brand';

/**
 * Normalizes customer phone number for direct WhatsApp deep linking (wa.me)
 */
export function cleanClientPhone(rawPhone: string): string {
  if (!rawPhone) return '';
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 10) {
    return '91' + digits;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return '91' + digits.slice(1);
  }
  return digits;
}

/**
 * Converts Indian Rupee number to standard words for formal documentation
 */
export function numberToWordsINR(num: number): string {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';

  function convertTwoDigits(n: number): string {
    if (n < 20) return a[n];
    return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
  }

  function convertThreeDigits(n: number): string {
    let str = '';
    if (Math.floor(n / 100) > 0) {
      str += a[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 0) {
      str += convertTwoDigits(n);
    }
    return str.trim();
  }

  let words = '';
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;

  if (crore > 0) words += convertTwoDigits(crore) + ' Crore ';
  if (lakh > 0) words += convertTwoDigits(lakh) + ' Lakh ';
  if (thousand > 0) words += convertTwoDigits(thousand) + ' Thousand ';
  if (num > 0) words += convertThreeDigits(num);

  return 'Rupees ' + words.trim() + ' Only';
}

// =====================================================================
// 1. QUOTATION DISPATCH FORMATTERS (WHATSAPP & EMAIL)
// =====================================================================

export function buildQuotationWhatsAppText(inquiry: InquiryRecord, quotation: QuotationRecord): string {
  const itemsList = quotation.items
    .map((it, idx) => `  ${idx + 1}. ${it.description} — ₹${it.amount.toLocaleString('en-IN')}`)
    .join('\n');

  return (
    `*INCHARA HOLIDAYS — OFFICIAL TOUR QUOTATION*\n` +
    `_Premier South Indian Travel & Cultural Hospitality_\n\n` +
    `Dear *${inquiry.customerName}*,\n\n` +
    `Namaskara! Thank you for choosing Inchara Holidays. Please find below the handcrafted itinerary quotation for your upcoming journey.\n\n` +
    `📋 *QUOTATION PARTICULARS:*\n` +
    `• Quote Reference: *#${quotation.quotationNumber}*\n` +
    `• Inquiry Reference: *${inquiry.referenceNumber}*\n` +
    `• Destination Circuit: *${quotation.destination}*\n` +
    `• Proposed Travel Dates: *${quotation.travelDates}*\n` +
    `• Guest Count: *${quotation.guestCount} Travelers*\n` +
    `• Validity: *${quotation.validityDays} Days from issue*\n\n` +
    `💰 *INVESTMENT BREAKDOWN:*\n` +
    `${itemsList}\n` +
    `───────────────────────\n` +
    `• Subtotal: ₹${quotation.subtotal.toLocaleString('en-IN')}.00\n` +
    `• GST (${quotation.gstRate}%): ₹${quotation.gstAmount.toLocaleString('en-IN')}.00\n` +
    `• *TOTAL QUOTED VALUE: ₹${quotation.totalAmount.toLocaleString('en-IN')}.00*\n` +
    `  _(${numberToWordsINR(quotation.totalAmount)})_\n\n` +
    `🌿 *AUTHENTIC INCHARA COMMITMENTS:*\n` +
    `• 100% Pure Vegetarian / Satvik meal assurance arranged across the circuit.\n` +
    `• Verified chauffeurs, private sanitized vehicles, and dedicated 24×7 ground helpline.\n` +
    `• Transparent pricing with zero hidden commercial showroom detours.\n\n` +
    `🏦 *SETTLEMENT & BANK PARTICULARS:*\n` +
    `• Bank: ${quotation.bankDetails.bankName}\n` +
    `• Account Name: ${quotation.bankDetails.accountName}\n` +
    `• Account No: *${quotation.bankDetails.accountNumber}*\n` +
    `• IFSC Code: *${quotation.bankDetails.ifscCode}*\n` +
    `• Branch: ${quotation.bankDetails.branch}\n` +
    `• UPI VPA: *${quotation.bankDetails.upiId}*\n\n` +
    `To confirm this reservation, kindly share the advance transfer UTR or reply to this message. We look forward to hosting you on an unforgettable journey!\n\n` +
    `Warm Regards,\n` +
    `*Inchara Holidays Advisory Desk*\n` +
    `📍 Sayyaji Rao Road, Near Mysuru Palace, Mysuru – 570001\n` +
    `📞 +91 99000 00000 | ✉️ ${brandConfig.email}\n` +
    `🌐 ${brandConfig.website}`
  );
}

export function buildQuotationEmailContent(inquiry: InquiryRecord, quotation: QuotationRecord): {
  subject: string;
  body: string;
  mailtoUrl: string;
} {
  const subject = `Official Tour Quotation #${quotation.quotationNumber} — ${quotation.destination} — Inchara Holidays`;

  const itemsList = quotation.items
    .map((it, idx) => `  ${idx + 1}. ${it.description} (${it.quantity} ${it.unit}) — INR ${it.amount.toLocaleString('en-IN')}.00`)
    .join('\n');

  const body =
    `Dear ${inquiry.customerName},\n\n` +
    `Namaskara!\n\n` +
    `Thank you for reaching out to Inchara Holidays. We are pleased to present your customized itinerary quotation for the ${quotation.destination} journey.\n\n` +
    `===================================================\n` +
    `OFFICIAL QUOTATION PARTICULARS\n` +
    `===================================================\n` +
    `Quotation Number: #${quotation.quotationNumber}\n` +
    `Inquiry Reference: ${inquiry.referenceNumber}\n` +
    `Destination Circuit: ${quotation.destination}\n` +
    `Travel Schedule: ${quotation.travelDates}\n` +
    `Number of Guests: ${quotation.guestCount} Travelers\n` +
    `Quotation Validity: ${quotation.validityDays} Days\n\n` +
    `ITEMIZED COMMERCIAL BREAKDOWN:\n` +
    `${itemsList}\n\n` +
    `Subtotal: INR ${quotation.subtotal.toLocaleString('en-IN')}.00\n` +
    `GST (${quotation.gstRate}%): INR ${quotation.gstAmount.toLocaleString('en-IN')}.00\n` +
    `TOTAL QUOTED AMOUNT: INR ${quotation.totalAmount.toLocaleString('en-IN')}.00\n` +
    `Amount in Words: ${numberToWordsINR(quotation.totalAmount)}\n\n` +
    `SPECIAL NOTES & INCHARA STANDARD:\n` +
    `${quotation.specialNotes || 'Includes dedicated 100% pure vegetarian culinary care and verified private chauffeur logistics.'}\n\n` +
    `OFFICIAL BANK SETTLEMENT PARTICULARS:\n` +
    `Bank Name: ${quotation.bankDetails.bankName}\n` +
    `Account Name: ${quotation.bankDetails.accountName}\n` +
    `Account Number: ${quotation.bankDetails.accountNumber}\n` +
    `IFSC Code: ${quotation.bankDetails.ifscCode}\n` +
    `Branch: ${quotation.bankDetails.branch}\n` +
    `UPI ID: ${quotation.bankDetails.upiId}\n\n` +
    `Should you require any customized adjustments or wish to confirm booking slots, please feel free to reply to this email or call us directly at +91 99000 00000.\n\n` +
    `Warm regards,\n\n` +
    `Travel Operations Desk\n` +
    `Inchara Holidays\n` +
    `Sayyaji Rao Road, Near Mysuru Palace, Mysuru – 570001, Karnataka\n` +
    `Email: ${brandConfig.email}\n` +
    `Website: ${brandConfig.website}\n` +
    `Karnataka Tourism Reg: ${brandConfig.regNumber}`;

  const recipient = inquiry.email || '';
  const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
}

// =====================================================================
// 2. PAYMENT RECEIPT DISPATCH FORMATTERS (WHATSAPP & EMAIL)
// =====================================================================

export function buildReceiptWhatsAppText(
  inquiry: InquiryRecord,
  receipt: PaymentRecord,
  summary?: { totalQuotedAmount: number; totalPaid: number; balanceDue: number }
): string {
  const formattedDate = new Date(receipt.paymentDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const ledgerSection = summary
    ? `\n📊 *CURRENT LEDGER BALANCE:*\n` +
      `• Total Quoted Tour Value: ₹${summary.totalQuotedAmount.toLocaleString('en-IN')}.00\n` +
      `• Total Settled to Date: ₹${summary.totalPaid.toLocaleString('en-IN')}.00\n` +
      `• *Remaining Balance Due: ₹${summary.balanceDue.toLocaleString('en-IN')}.00*\n`
    : '';

  return (
    `*INCHARA HOLIDAYS — OFFICIAL PAYMENT RECEIPT*\n` +
    `_Premier South Indian Travel & Cultural Hospitality_\n\n` +
    `Dear *${inquiry.customerName}*,\n\n` +
    `Namaskara! We gratefully acknowledge receipt of your inward payment for tour reservation. Please find your official e-receipt details below:\n\n` +
    `🧾 *RECEIPT PARTICULARS:*\n` +
    `• Receipt Number: *#${receipt.receiptNumber}*\n` +
    `• Booking Reference: *${inquiry.referenceNumber}*\n` +
    `• Payment Date: *${formattedDate}*\n` +
    `• Verification Status: *✔ INWARD CLEARED & VERIFIED*\n\n` +
    `💵 *TRANSACTION DETAILS:*\n` +
    `• Amount Received: *₹${receipt.amount.toLocaleString('en-IN')}.00*\n` +
    `  _(${numberToWordsINR(receipt.amount)})_\n` +
    `• Payment Category: *${receipt.paymentType.replace('_', ' ').toUpperCase()}*\n` +
    `• Mode of Transfer: *${receipt.paymentMode.toUpperCase()}*\n` +
    `• Transaction / UTR Ref: *${receipt.transactionRef}*\n` +
    `• Staff Verification: *${receipt.verifiedBy}*\n` +
    (receipt.notes ? `• Remarks: _${receipt.notes}_\n` : '') +
    ledgerSection +
    `\n🌿 *PURE VEG & SERVICE GUARANTEE:*\n` +
    `Your tour arrangements and pure vegetarian meal bookings are formally recorded. A physical stamped copy is accessible at our Mysuru desk or printable via our staff portal.\n\n` +
    `Thank you for traveling with Inchara Holidays!\n\n` +
    `Accounts Desk · Inchara Holidays\n` +
    `Reg: KA-TO-2024-88419 · GSTIN: 29AABCU9603R1ZM\n` +
    `📞 +91 99000 00000 | ✉️ ${brandConfig.email}`
  );
}

export function buildReceiptEmailContent(
  inquiry: InquiryRecord,
  receipt: PaymentRecord,
  summary?: { totalQuotedAmount: number; totalPaid: number; balanceDue: number }
): {
  subject: string;
  body: string;
  mailtoUrl: string;
} {
  const formattedDate = new Date(receipt.paymentDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const subject = `Official Payment Receipt #${receipt.receiptNumber} — INR ${receipt.amount.toLocaleString('en-IN')} — Inchara Holidays`;

  const ledgerText = summary
    ? `\nCURRENT ACCOUNT LEDGER BALANCE:\n` +
      `---------------------------------------------------\n` +
      `Total Quoted Value:   INR ${summary.totalQuotedAmount.toLocaleString('en-IN')}.00\n` +
      `Total Settled to Date: INR ${summary.totalPaid.toLocaleString('en-IN')}.00\n` +
      `Remaining Balance Due: INR ${summary.balanceDue.toLocaleString('en-IN')}.00\n`
    : '';

  const body =
    `Dear ${inquiry.customerName},\n\n` +
    `Namaskara!\n\n` +
    `We gratefully confirm receipt of your inward payment toward your tour booking with Inchara Holidays.\n\n` +
    `===================================================\n` +
    `OFFICIAL E-RECEIPT PARTICULARS\n` +
    `===================================================\n` +
    `Receipt Number: #${receipt.receiptNumber}\n` +
    `Booking Reference: ${inquiry.referenceNumber}\n` +
    `Payment Date: ${formattedDate}\n` +
    `Customer Name: ${inquiry.customerName}\n` +
    `Contact Phone: ${inquiry.phone}\n\n` +
    `TRANSACTION DETAILS:\n` +
    `Amount Received: INR ${receipt.amount.toLocaleString('en-IN')}.00\n` +
    `Amount in Words: ${numberToWordsINR(receipt.amount)}\n` +
    `Payment Category: ${receipt.paymentType.replace('_', ' ').toUpperCase()}\n` +
    `Payment Mode: ${receipt.paymentMode.toUpperCase()}\n` +
    `Bank UTR / Transaction Ref: ${receipt.transactionRef}\n` +
    `Verified By: ${receipt.verifiedBy}\n` +
    (receipt.notes ? `Staff Notes: ${receipt.notes}\n` : '') +
    ledgerText +
    `\nTERMS & GUARANTEES:\n` +
    `1. This electronic receipt serves as valid proof of inward advance settlement for tour confirmation.\n` +
    `2. 100% Pure Vegetarian cuisine guaranteed across all tour dining points.\n` +
    `3. Formal stamped receipts are retained on company ledger KA-TO-2024-88419.\n\n` +
    `Thank you for entrusting your journey to Inchara Holidays. Please do not hesitate to contact our desk should you have any questions.\n\n` +
    `Warm regards,\n\n` +
    `Accounts & Finance Desk\n` +
    `Inchara Holidays\n` +
    `Sayyaji Rao Road, Near Mysuru Palace, Mysuru – 570001, Karnataka\n` +
    `GSTIN: 29AABCU9603R1ZM · PAN: AABCU9603R\n` +
    `Phone: +91 99000 00000\n` +
    `Email: ${brandConfig.email}\n` +
    `Website: ${brandConfig.website}`;

  const recipient = inquiry.email || '';
  const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
}

// =====================================================================
// 3. ACTION DISPATCH TRIGGERS (BROWSER WINDOW OR CLIPBOARD)
// =====================================================================

export function dispatchWhatsApp(phone: string, text: string): boolean {
  const clean = cleanClientPhone(phone);
  if (!clean) {
    // If phone is missing, open WhatsApp Web with prefilled message
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    return true;
  }
  const url = `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  return true;
}

export function dispatchEmail(mailtoUrl: string): boolean {
  window.open(mailtoUrl, '_self');
  return true;
}
