/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — ADMIN INQUIRIES MANAGEMENT HANDLER
 */

import { getSupabase, isSupabaseConfigured } from '../_shared/supabase.js';
import { InquiryRecord, InquiryStatus } from '../_shared/types.js';
import { getMemoryInquiries, updateMemoryInquiry } from '../_shared/store.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Basic authorization check
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Staff token required.' });
  }

  const supabase = getSupabase();

  // 1. GET: List Inquiries with Search & Filter
  if (req.method === 'GET') {
    const { category, status, search, limit = 50, offset = 0 } = req.query || {};

    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase
          .from('inquiries')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(Number(offset), Number(offset) + Number(limit) - 1);

        if (category && category !== 'all') {
          query = query.eq('service_category', category);
        }

        if (status && status !== 'all') {
          query = query.eq('status', status);
        }

        if (search) {
          query = query.or(
            `reference_number.ilike.%${search}%,customer_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`
          );
        }

        const { data, count, error } = await query;
        if (error) throw error;

        const inquiries: InquiryRecord[] = (data || []).map((row: any) => ({
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
        }));

        return res.status(200).json({
          success: true,
          inquiries,
          total: count || inquiries.length,
          limit: Number(limit),
          offset: Number(offset),
        });
      } catch (err: any) {
        console.warn('[Inquiries API] Supabase query failed, falling back to memory:', err);
      }
    }

    // In-Memory Fallback Filter
    let list = getMemoryInquiries();

    if (category && category !== 'all') {
      list = list.filter((i) => i.serviceCategory === category);
    }
    if (status && status !== 'all') {
      list = list.filter((i) => i.status === status);
    }
    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter(
        (i) =>
          i.referenceNumber.toLowerCase().includes(q) ||
          i.customerName.toLowerCase().includes(q) ||
          i.phone.includes(q) ||
          (i.email && i.email.toLowerCase().includes(q))
      );
    }

    const total = list.length;
    const paginated = list.slice(Number(offset), Number(offset) + Number(limit));

    return res.status(200).json({
      success: true,
      inquiries: paginated,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  // 2. PATCH: Update Status, Notes, Follow-up
  if (req.method === 'PATCH') {
    try {
      const { id, status, internalNotes, assignedStaff, nextFollowupDate } =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      if (!id) {
        return res.status(400).json({ success: false, error: 'Inquiry ID is required' });
      }

      const updates: Partial<InquiryRecord> = {};
      if (status) updates.status = status as InquiryStatus;
      if (internalNotes !== undefined) updates.internalNotes = internalNotes;
      if (assignedStaff !== undefined) updates.assignedStaff = assignedStaff;
      if (nextFollowupDate !== undefined) updates.nextFollowupDate = nextFollowupDate;

      const nowIso = new Date().toISOString();

      if (isSupabaseConfigured() && supabase) {
        const dbUpdates: Record<string, any> = { updated_at: nowIso };
        if (status) dbUpdates.status = status;
        if (internalNotes !== undefined) dbUpdates.internal_notes = internalNotes;
        if (assignedStaff !== undefined) dbUpdates.assigned_staff = assignedStaff;
        if (nextFollowupDate !== undefined) dbUpdates.next_followup_date = nextFollowupDate;

        const { data, error } = await supabase
          .from('inquiries')
          .update(dbUpdates)
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          // Log status change in audit trail
          if (status) {
            await supabase.from('inquiry_events').insert({
              inquiry_id: id,
              event_type: 'status_changed',
              new_status: status,
              notes: internalNotes || 'Status updated by owner',
              actor_name: assignedStaff || 'Ravindra S (Owner)',
              created_at: nowIso,
            });
          }

          return res.status(200).json({
            success: true,
            message: 'Inquiry updated successfully',
            inquiry: {
              id: data.id,
              referenceNumber: data.reference_number,
              customerName: data.customer_name,
              phone: data.phone,
              email: data.email,
              preferredLanguage: data.preferred_language,
              preferredContactMethod: data.preferred_contact_method,
              serviceCategory: data.service_category,
              serviceType: data.service_type,
              servicePayload: data.service_payload || {},
              additionalRequirements: data.additional_requirements,
              status: data.status,
              assignedStaff: data.assigned_staff,
              internalNotes: data.internal_notes,
              nextFollowupDate: data.next_followup_date,
              createdAt: data.created_at,
              updatedAt: data.updated_at,
            },
          });
        }
      }

      // Memory Fallback
      const updated = updateMemoryInquiry(id, updates);
      if (updated) {
        return res.status(200).json({
          success: true,
          message: 'Inquiry updated successfully (local memory)',
          inquiry: updated,
        });
      }

      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Update failed' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
