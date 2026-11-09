/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InquiryRecord } from '../../src/types/inquiry';

// Shared memory store for local development and offline resilience
const sharedInquiries: InquiryRecord[] = [];

export function getMemoryInquiries(): InquiryRecord[] {
  return sharedInquiries;
}

export function addMemoryInquiry(inquiry: InquiryRecord): void {
  const existingIdx = sharedInquiries.findIndex((i) => i.id === inquiry.id);
  if (existingIdx >= 0) {
    sharedInquiries[existingIdx] = inquiry;
  } else {
    sharedInquiries.unshift(inquiry);
  }
}

export function updateMemoryInquiry(id: string, updates: Partial<InquiryRecord>): InquiryRecord | null {
  const item = sharedInquiries.find((i) => i.id === id);
  if (!item) return null;
  Object.assign(item, updates, { updatedAt: new Date().toISOString() });
  return item;
}
