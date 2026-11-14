/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminDashboardStats, InquiryRecord, InquiryStatus, NotificationLog } from '../types/inquiry';
import { getLocalStoredInquiries, saveLocalInquiry } from './inquiryService';

const ADMIN_TOKEN_KEY = 'inchara_admin_session_token';
const ADMIN_USER_KEY = 'inchara_admin_user_profile';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'operations_manager' | 'travel_consultant';
}

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getCurrentAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAdminAuthenticated(): boolean {
  return Boolean(getAdminToken() && getCurrentAdminUser());
}

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    // 1. Try serverless login endpoint
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token && data.user) {
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
    }
  } catch (err) {
    console.info('[AdminAuth] Serverless login unavailable, checking verified client credentials:', err);
  }

  // 2. Client fallback verification for development & offline inspection
  const cleanEmail = email.toLowerCase().trim();
  if (
    (cleanEmail === 'admin@incharaholidays.com' || cleanEmail === 'inchara@travel.com' || cleanEmail === 'demo@incharaholidays.com') &&
    (password === 'Inchara@2026' || password === 'admin123')
  ) {
    const user: AdminUser = {
      id: 'usr_lead_admin',
      email: cleanEmail,
      fullName: 'Inchara Operations Lead',
      role: 'super_admin',
    };
    localStorage.setItem(ADMIN_TOKEN_KEY, `local_auth_${Date.now()}`);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    return { success: true, user };
  }

  return {
    success: false,
    error: 'Invalid credentials. Use admin@incharaholidays.com with password Inchara@2026'
  };
}

export function adminLogout(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

/**
 * Computes dashboard statistics from stored inquiries
 */
export async function fetchAdminStats(): Promise<AdminDashboardStats> {
  const token = getAdminToken();

  try {
    const res = await fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.stats) return data.stats;
    }
  } catch {
    // Fall back to client calculation
  }

  const list = getLocalStoredInquiries();
  const totalInquiries = list.length;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  let newToday = 0;
  let pendingFollowups = 0;
  let convertedCount = 0;

  const byCategory: Record<string, number> = {
    holidays: 0,
    educational: 0,
    corporate: 0,
    transport: 0,
    visa_passport: 0,
    catering: 0,
    general: 0,
  };

  const byStatus: Record<string, number> = {
    new: 0,
    contacted: 0,
    in_progress: 0,
    proposal_sent: 0,
    confirmed: 0,
    closed: 0,
    cancelled: 0,
  };

  const todayStr = new Date().toISOString().split('T')[0];

  list.forEach((item) => {
    const created = new Date(item.createdAt);
    if (created >= todayStart) newToday++;

    if (
      item.nextFollowupDate &&
      item.nextFollowupDate <= todayStr &&
      item.status !== 'confirmed' &&
      item.status !== 'closed' &&
      item.status !== 'cancelled'
    ) {
      pendingFollowups++;
    }

    if (item.status === 'confirmed') convertedCount++;

    const cat = item.serviceCategory || 'general';
    byCategory[cat] = (byCategory[cat] || 0) + 1;

    const st = item.status || 'new';
    byStatus[st] = (byStatus[st] || 0) + 1;
  });

  const conversionRate = totalInquiries > 0 ? Math.round((convertedCount / totalInquiries) * 100) : 0;

  return {
    totalInquiries,
    newInquiriesToday: newToday,
    pendingFollowups,
    convertedCount,
    conversionRate,
    byCategory,
    byStatus,
    recentInquiries: list.slice(0, 8),
  };
}

export interface InquiriesFilterOptions {
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

/**
 * Fetches and filters inquiries
 */
export async function fetchAdminInquiries(filters: InquiriesFilterOptions = {}): Promise<{
  inquiries: InquiryRecord[];
  total: number;
}> {
  const token = getAdminToken();

  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.search) params.set('search', filters.search);
    if (filters.limit) params.set('limit', String(filters.limit));
    if (filters.offset) params.set('offset', String(filters.offset));

    const res = await fetch(`/api/admin/inquiries?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.inquiries && data.inquiries.length > 0) {
        return { inquiries: data.inquiries, total: data.total };
      }
    }
  } catch {
    // Fall back to client search
  }

  let list = getLocalStoredInquiries();

  if (filters.category && filters.category !== 'all') {
    list = list.filter((i) => i.serviceCategory === filters.category);
  }

  if (filters.status && filters.status !== 'all') {
    list = list.filter((i) => i.status === filters.status);
  }

  if (filters.search && filters.search.trim()) {
    const query = filters.search.toLowerCase().trim();
    list = list.filter((i) =>
      i.referenceNumber.toLowerCase().includes(query) ||
      i.customerName.toLowerCase().includes(query) ||
      i.phone.toLowerCase().includes(query) ||
      (i.email && i.email.toLowerCase().includes(query)) ||
      i.serviceType.toLowerCase().includes(query)
    );
  }

  // Sort descending by date
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = list.length;
  const offset = filters.offset || 0;
  const limit = filters.limit || 50;
  const paged = list.slice(offset, offset + limit);

  return { inquiries: paged, total };
}

/**
 * Updates status, internal notes, assigned staff, or follow-up date
 */
export async function updateInquiry(
  id: string,
  updates: {
    status?: InquiryStatus;
    assignedStaff?: string;
    internalNotes?: string;
    nextFollowupDate?: string;
  }
): Promise<InquiryRecord | null> {
  const token = getAdminToken();

  try {
    const res = await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...updates }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.inquiry) {
        saveLocalInquiry(data.inquiry);
        return data.inquiry;
      }
    }
  } catch {
    // Client fallback
  }

  // Local storage update
  const list = getLocalStoredInquiries();
  const target = list.find((i) => i.id === id);
  if (!target) return null;

  const updated: InquiryRecord = {
    ...target,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveLocalInquiry(updated);
  return updated;
}

/**
 * Generates and downloads a CSV export of filtered inquiries
 */
export function exportInquiriesToCsv(inquiries: InquiryRecord[], filename = 'inchara_holidays_inquiries.csv'): void {
  const headers = [
    'Reference Number',
    'Date Submitted (IST)',
    'Customer Name',
    'Phone',
    'Email',
    'Language',
    'Category',
    'Service Type',
    'Status',
    'Assigned Staff',
    'Next Follow-up Date',
    'Additional Requirements',
    'Internal Notes'
  ];

  const rows = inquiries.map((i) => [
    `"${i.referenceNumber}"`,
    `"${new Date(i.createdAt).toLocaleString('en-IN')}"`,
    `"${(i.customerName || '').replace(/"/g, '""')}"`,
    `"${i.phone}"`,
    `"${i.email || ''}"`,
    `"${i.preferredLanguage}"`,
    `"${i.serviceCategory}"`,
    `"${i.serviceType}"`,
    `"${i.status}"`,
    `"${(i.assignedStaff || '').replace(/"/g, '""')}"`,
    `"${i.nextFollowupDate || ''}"`,
    `"${(i.additionalRequirements || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${(i.internalNotes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const LOCAL_NOTIF_KEY = 'inchara_notification_logs_v1';

export function getLocalNotificationLogs(): NotificationLog[] {
  try {
    const raw = localStorage.getItem(LOCAL_NOTIF_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalNotificationLog(log: NotificationLog): void {
  try {
    const list = getLocalNotificationLogs();
    const updated = [log, ...list.filter((l) => l.id !== log.id)];
    localStorage.setItem(LOCAL_NOTIF_KEY, JSON.stringify(updated.slice(0, 100)));
  } catch (e) {
    console.warn('[LocalStorage] Could not save notification log:', e);
  }
}

/**
 * Fetches notification delivery logs from serverless API with client fallback
 */
export async function fetchNotificationLogs(limit = 50): Promise<NotificationLog[]> {
  try {
    const token = getAdminToken();
    const res = await fetch(`/api/admin/notifications?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token || 'anonymous'}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.logs)) {
        return data.logs;
      }
    }
  } catch (err) {
    console.info('[AdminService] Serverless notifications API offline, checking local storage:', err);
  }

  return getLocalNotificationLogs();
}

/**
 * Retries a failed notification job via serverless API
 */
export async function retryNotificationJob(logId: string): Promise<{ success: boolean; log?: NotificationLog; error?: string }> {
  try {
    const token = getAdminToken();
    const res = await fetch('/api/admin/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || 'anonymous'}`,
      },
      body: JSON.stringify({ logId }),
    });

    const data = await res.json();
    if (data.success && data.log) {
      saveLocalNotificationLog(data.log);
    }
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network exception during notification retry',
    };
  }
}

