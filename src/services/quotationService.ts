/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BankSettlementDetails, PaymentRecord, QuotationRecord } from '../types/inquiry';

const QUOTATIONS_STORAGE_KEY = 'inchara_quotations_db_v1';
const PAYMENTS_STORAGE_KEY = 'inchara_payments_db_v1';

export const defaultBankDetails: BankSettlementDetails = {
  bankName: 'Canara Bank',
  accountName: 'INCHARA HOLIDAYS',
  accountNumber: '110023456789',
  ifscCode: 'CNRB0001234',
  branch: 'Malleshwaram Branch, Bengaluru',
  upiId: 'incharaholidays@upi',
};

function generateQuotationNumber(): string {
  const year = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
  return `QTN-${year}-${rand}`;
}

function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
  return `RCP-${year}-${rand}`;
}

// 1. QUOTATIONS
export function getStoredQuotations(): QuotationRecord[] {
  try {
    const raw = localStorage.getItem(QUOTATIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQuotation(quotation: QuotationRecord): void {
  try {
    const list = getStoredQuotations();
    const updated = [quotation, ...list.filter((q) => q.id !== quotation.id)];
    localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('[QuotationService] Failed to save quotation:', e);
  }
}

export function getQuotationsForInquiry(inquiryId: string): QuotationRecord[] {
  return getStoredQuotations().filter((q) => q.inquiryId === inquiryId);
}

export function createNewQuotation(
  data: Omit<QuotationRecord, 'id' | 'quotationNumber' | 'createdAt' | 'updatedAt'>
): QuotationRecord {
  const now = new Date().toISOString();
  const quotation: QuotationRecord = {
    ...data,
    id: crypto.randomUUID(),
    quotationNumber: generateQuotationNumber(),
    createdAt: now,
    updatedAt: now,
  };
  saveQuotation(quotation);
  return quotation;
}

// 2. PAYMENTS
export function getStoredPayments(): PaymentRecord[] {
  try {
    const raw = localStorage.getItem(PAYMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePayment(payment: PaymentRecord): void {
  try {
    const list = getStoredPayments();
    const updated = [payment, ...list.filter((p) => p.id !== payment.id)];
    localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('[QuotationService] Failed to save payment:', e);
  }
}

export function getPaymentsForInquiry(inquiryId: string): PaymentRecord[] {
  return getStoredPayments().filter((p) => p.inquiryId === inquiryId);
}

export function recordNewPayment(
  data: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'createdAt'>
): PaymentRecord {
  const now = new Date().toISOString();
  const payment: PaymentRecord = {
    ...data,
    id: crypto.randomUUID(),
    receiptNumber: generateReceiptNumber(),
    createdAt: now,
  };
  savePayment(payment);
  return payment;
}

export function getPaymentSummary(inquiryId: string, totalQuotedAmount: number) {
  const payments = getPaymentsForInquiry(inquiryId);
  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const balanceDue = Math.max(0, totalQuotedAmount - totalPaid);
  return {
    totalQuotedAmount,
    totalPaid,
    balanceDue,
    isFullyPaid: totalQuotedAmount > 0 && balanceDue === 0,
    paymentsCount: payments.length,
    payments,
  };
}
