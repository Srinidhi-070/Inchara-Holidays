/**
 * INCHARA HOLIDAYS — SOLO OPERATOR CUSTOMER DIRECTORY SERVICE
 * Aggregates client profiles across inquiries, quotes, and confirmed journeys.
 * Enables one-click communication for Srinidhi N S (Owner & Operator).
 */

import { CustomerRecord, InquiryRecord } from '../types/inquiry';
import { getLocalStoredInquiries } from './inquiryService';
import { getStoredQuotations } from './quotationService';

const CUSTOMERS_CACHE_KEY = 'inchara_customers_db_v1';

export function getAggregatedCustomers(): CustomerRecord[] {
  const inquiries = getLocalStoredInquiries();
  const quotations = getStoredQuotations();

  const customerMap = new Map<string, CustomerRecord>();

  // 1. Inquiries aggregation
  for (const inq of inquiries) {
    const rawPhone = inq.phone.replace(/[^\d]/g, '');
    const key = rawPhone || inq.email || inq.id;

    const existing = customerMap.get(key);
    const inqCity = inq.servicePayload && 'departureCity' in inq.servicePayload && typeof inq.servicePayload.departureCity === 'string'
      ? inq.servicePayload.departureCity
      : undefined;

    if (!existing) {
      customerMap.set(key, {
        id: `cust-${key}`,
        name: inq.customerName,
        phone: inq.phone,
        email: inq.email || undefined,
        city: inqCity,
        preferredLanguage: inq.preferredLanguage,
        notes: inq.internalNotes || inq.additionalRequirements || undefined,
        totalInquiries: 1,
        totalBookings: inq.status === 'confirmed' ? 1 : 0,
        totalSpend: 0,
        lastContactedAt: inq.updatedAt || inq.createdAt,
        createdAt: inq.createdAt,
        updatedAt: inq.updatedAt || inq.createdAt,
      });
    } else {
      existing.totalInquiries += 1;
      if (inq.status === 'confirmed') existing.totalBookings += 1;
      if (new Date(inq.createdAt) < new Date(existing.createdAt)) {
        existing.createdAt = inq.createdAt;
      }
      if (new Date(inq.updatedAt || inq.createdAt) > new Date(existing.updatedAt)) {
        existing.updatedAt = inq.updatedAt || inq.createdAt;
        existing.lastContactedAt = inq.updatedAt || inq.createdAt;
      }
      if (!existing.email && inq.email) existing.email = inq.email;
      if (!existing.city && inqCity) existing.city = inqCity;
    }
  }

  // 2. Quotations aggregation
  for (const quote of quotations) {
    const rawPhone = quote.customerPhone.replace(/[^\d]/g, '');
    const key = rawPhone || quote.customerEmail || quote.id;

    const existing = customerMap.get(key);
    if (existing) {
      existing.totalSpend += quote.totalAmount;
      if (quote.status === 'accepted') {
        existing.totalBookings += 1;
      }
    } else {
      customerMap.set(key, {
        id: `cust-${key}`,
        name: quote.customerName,
        phone: quote.customerPhone,
        email: quote.customerEmail || undefined,
        preferredLanguage: 'en',
        notes: quote.specialNotes,
        totalInquiries: 1,
        totalBookings: quote.status === 'accepted' ? 1 : 0,
        totalSpend: quote.totalAmount,
        lastContactedAt: quote.updatedAt || quote.createdAt,
        createdAt: quote.createdAt,
        updatedAt: quote.updatedAt || quote.createdAt,
      });
    }
  }

  return Array.from(customerMap.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function searchCustomers(query: string): CustomerRecord[] {
  const all = getAggregatedCustomers();
  const q = query.toLowerCase().trim();
  if (!q) return all;

  return all.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.city && c.city.toLowerCase().includes(q))
  );
}
