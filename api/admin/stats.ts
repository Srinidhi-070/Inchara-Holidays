/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSupabase, isSupabaseConfigured } from '../_shared/supabase';
import { AdminDashboardStats, InquiryRecord } from '../../src/types/inquiry';
import { getMemoryInquiries } from '../_shared/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const supabase = getSupabase();

  if (isSupabaseConfigured() && supabase) {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const { data: allInquiries, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const list = allInquiries || [];
      const stats = computeStatsFromList(
        list.map((row: any) => ({
          id: row.id,
          referenceNumber: row.reference_number,
          customerName: row.customer_name,
          phone: row.phone,
          email: row.email,
          preferredLanguage: row.preferred_language,
          preferredContactMethod: row.preferred_contact_method,
          serviceCategory: row.service_category,
          serviceType: row.service_type,
          servicePayload: row.service_payload || {},
          additionalRequirements: row.additional_requirements,
          status: row.status,
          assignedStaff: row.assigned_staff,
          internalNotes: row.internal_notes,
          nextFollowupDate: row.next_followup_date,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }))
      );

      return res.status(200).json({ success: true, stats });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Compute from shared memory store
  const memoryList = getMemoryInquiries();
  const stats = computeStatsFromList(memoryList);

  return res.status(200).json({ success: true, stats });
}

function computeStatsFromList(list: InquiryRecord[]): AdminDashboardStats {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStr = new Date().toISOString().split('T')[0];

  const totalInquiries = list.length;
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

  list.forEach((item) => {
    const itemCreated = new Date(item.createdAt);
    if (itemCreated >= todayStart) {
      newToday++;
    }

    if (
      item.nextFollowupDate &&
      item.nextFollowupDate <= todayStr &&
      item.status !== 'confirmed' &&
      item.status !== 'closed' &&
      item.status !== 'cancelled'
    ) {
      pendingFollowups++;
    }

    if (item.status === 'confirmed') {
      convertedCount++;
    }

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
