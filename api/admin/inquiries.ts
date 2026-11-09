/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSupabase, isSupabaseConfigured } from '../_shared/supabase';
import { InquiryRecord, InquiryStatus } from '../../src/types/inquiry';
import { getMemoryInquiries, updateMemoryInquiry } from '../_shared/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Basic authorization header check
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

        // Map snake_case to camelCase
        const items: InquiryRecord[] = (data || []).map((row: any) => ({
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
          inquiries: items,
          total: count || items.length,
          limit: Number(limit),
          offset: Number(offset),
        });
      } catch (err: any) {
        return res.status(500).json({ success: false, error: err.message });
      }
    }

    // In-memory fallback
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
          i.phone.toLowerCase().includes(q) ||
          (i.email && i.email.toLowerCase().includes(q))
      );
    }

    const paginated = list.slice(Number(offset), Number(offset) + Number(limit));

    return res.status(200).json({
      success: true,
      inquiries: paginated,
      total: list.length,
      limit: Number(limit),
      offset: Number(offset),
      isFallback: true,
    });
  }

  // 2. PATCH: Update Status, Notes, Followup Date
  if (req.method === 'PATCH') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, status, assignedStaff, internalNotes, nextFollowupDate, actorName = 'Staff' } = body;

      if (!id) {
        return res.status(400).json({ success: false, error: 'Inquiry ID is required.' });
      }

      if (isSupabaseConfigured() && supabase) {
        // Fetch current record for audit comparison
        const { data: current } = await supabase
          .from('inquiries')
          .select('status')
          .eq('id', id)
          .single();

        const updatePayload: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };

        if (status) updatePayload.status = status;
        if (assignedStaff !== undefined) updatePayload.assigned_staff = assignedStaff;
        if (internalNotes !== undefined) updatePayload.internal_notes = internalNotes;
        if (nextFollowupDate !== undefined) updatePayload.next_followup_date = nextFollowupDate;

        const { data: updated, error } = await supabase
          .from('inquiries')
          .update(updatePayload)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;

        // Log status change event if status shifted
        if (status && current && current.status !== status) {
          await supabase.from('inquiry_events').insert({
            inquiry_id: id,
            event_type: 'status_changed',
            previous_status: current.status,
            new_status: status,
            notes: internalNotes || `Status updated to ${status}`,
            actor_name: actorName,
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Inquiry updated successfully',
          inquiry: updated,
        });
      }

      // Memory fallback update
      const updatePayload: Partial<InquiryRecord> = {};
      if (status) updatePayload.status = status as InquiryStatus;
      if (internalNotes !== undefined) updatePayload.internalNotes = internalNotes;
      if (nextFollowupDate !== undefined) updatePayload.nextFollowupDate = nextFollowupDate;

      const updatedMemory = updateMemoryInquiry(id, updatePayload);

      return res.status(200).json({
        success: true,
        message: 'Inquiry updated successfully',
        inquiry: updatedMemory,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
