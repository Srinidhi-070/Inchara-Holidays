/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — IN-MEMORY RESILIENCE STORE
 * Provides zero-lead-loss fallback during local development or network failures.
 */

import { InquiryRecord, NotificationLog } from './types.js';

const sharedInquiries: InquiryRecord[] = [];
const sharedNotificationLogs: NotificationLog[] = [];

export function getMemoryInquiries(): InquiryRecord[] {
  return [...sharedInquiries];
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

export function getMemoryNotificationLogs(): NotificationLog[] {
  return [...sharedNotificationLogs];
}

export function addMemoryNotificationLog(log: NotificationLog): void {
  const existingIdx = sharedNotificationLogs.findIndex((l) => l.id === log.id);
  if (existingIdx >= 0) {
    sharedNotificationLogs[existingIdx] = log;
  } else {
    sharedNotificationLogs.unshift(log);
  }
}

export function updateMemoryNotificationLog(id: string, updates: Partial<NotificationLog>): NotificationLog | null {
  const item = sharedNotificationLogs.find((l) => l.id === id);
  if (!item) return null;
  Object.assign(item, updates, { lastAttemptAt: new Date().toISOString() });
  return item;
}
