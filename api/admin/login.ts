/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — OWNER AUTHENTICATION HANDLER
 */

import { getSupabase, isSupabaseConfigured } from '../_shared/supabase.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { email, password } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Please enter the owner email address.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const masterEmail = (process.env.ADMIN_EMAIL || 'incharaholidays@gmail.com').toLowerCase().trim();

    // 1. Authorized Owner Verification
    const isOwner = (
      cleanEmail === masterEmail ||
      cleanEmail === 'incharaholidays@gmail.com' ||
      cleanEmail === 'admin@incharaholidays.com' ||
      cleanEmail === 'ravindra@incharaholidays.com'
    );

    if (isOwner) {
      return res.status(200).json({
        success: true,
        token: `owner_jwt_${Buffer.from(cleanEmail).toString('base64')}_${Date.now()}`,
        user: {
          id: 'admin_root',
          email: cleanEmail,
          fullName: 'Ravindra S (Owner & Lead Curator)',
          role: 'super_admin',
        }
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Access restricted. Please enter the authorized owner email (incharaholidays@gmail.com).'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Authentication service error'
    });
  }
}
