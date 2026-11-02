/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { serviceCategories } from '../src/data/servicesData';
import { getSupabase, isSupabaseConfigured } from './_shared/supabase';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabase = getSupabase();

  if (req.method === 'GET') {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: dbCategories, error } = await supabase
          .from('service_categories')
          .select('*, services(*)')
          .order('display_order', { ascending: true });

        if (!error && dbCategories && dbCategories.length > 0) {
          return res.status(200).json({ success: true, categories: dbCategories });
        }
      } catch (e) {
        console.warn('[Services API] Supabase fallback to static data:', e);
      }
    }

    return res.status(200).json({ success: true, categories: serviceCategories });
  }

  // PATCH: Staff updates category visibility / display order
  if (req.method === 'PATCH') {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { id, isActive, displayOrder } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!id) return res.status(400).json({ success: false, error: 'Category ID is required' });

    if (isSupabaseConfigured() && supabase) {
      try {
        const updateObj: Record<string, any> = {};
        if (isActive !== undefined) updateObj.is_active = isActive;
        if (displayOrder !== undefined) updateObj.display_order = displayOrder;

        await supabase
          .from('service_categories')
          .update(updateObj)
          .eq('id', id);

        return res.status(200).json({ success: true, message: 'Service category updated' });
      } catch (err: any) {
        return res.status(500).json({ success: false, error: err.message });
      }
    }

    return res.status(200).json({ success: true, message: 'Service updated (memory fallback)' });
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
