/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — ADMIN ANALYTICS & STATS HANDLER
 */

import { getSupabase, isSupabaseConfigured } from '../_shared/supabase.js';
import { InquiryRecord } from '../_shared/types.js';
import { getMemoryInquiries } from '../_shared/store.js';

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
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }))
      );

      return res.status(200).json({ success: true, stats });
    } catch (err: any) {
      console.warn('[Stats API] Supabase query failed, falling back to memory:', err);
    }
  }

  // Fallback to In-Memory Store
  const memoryList = getMemoryInquiries();
  const stats = computeStatsFromList(memoryList);

  return res.status(200).json({ success: true, stats });
}

function computeStatsFromList(inquiries: InquiryRecord[]) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const byCategory: Record<string, number> = {
    holidays: 0,
    educational: 0,
    corporate: 0,
    transport: 0,
    visa_passport: 0,
    catering: 0,
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

  let newInquiriesToday = 0;
  let pendingFollowups = 0;
  let convertedCount = 0;

  for (const item of inquiries) {
    if (byCategory[item.serviceCategory] !== undefined) {
      byCategory[item.serviceCategory]++;
    }

    if (byStatus[item.status] !== undefined) {
      byStatus[item.status]++;
    }

    const created = new Date(item.createdAt);
    if (created >= todayStart) {
      newInquiriesToday++;
    }

    if (item.status === 'in_progress' || item.status === 'proposal_sent') {
      pendingFollowups++;
    }

    if (item.status === 'confirmed' || item.status === 'closed') {
      convertedCount++;
    }
  }

  const totalInquiries = inquiries.length;
  const conversionRate = totalInquiries > 0 ? Math.round((convertedCount / totalInquiries) * 100) : 0;

  return {
    totalInquiries,
    newInquiriesToday,
    pendingFollowups,
    convertedCount,
    conversionRate,
    byCategory,
    byStatus,
    recentInquiries: inquiries.slice(0, 5),
  };
}
