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

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please enter both email and password.'
      });
    }

    // 1. If Supabase Auth is configured, use official Supabase Auth
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data?.session) {
        const { data: profile } = await supabase
          .from('admin_profiles')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        return res.status(200).json({
          success: true,
          token: data.session.access_token,
          user: {
            id: data.user.id,
            email: data.user.email,
            fullName: profile?.full_name || 'Ravindra S (Owner)',
            role: profile?.role || 'super_admin',
          }
        });
      }
    }

    // 2. Verified Solo-Operator Fallback Credentials
    const masterEmail = process.env.ADMIN_EMAIL || 'incharaholidays@gmail.com';
    const masterPassword = process.env.ADMIN_PASSWORD || 'Inchara@2026';

    const isMatch = (
      email.toLowerCase().trim() === masterEmail.toLowerCase().trim() ||
      email.toLowerCase().trim() === 'admin@incharaholidays.com' ||
      email.toLowerCase().trim() === 'incharaholidays@gmail.com'
    ) && password === masterPassword;

    if (isMatch) {
      return res.status(200).json({
        success: true,
        token: `mock_jwt_${Buffer.from(email).toString('base64')}_${Date.now()}`,
        user: {
          id: 'admin_root',
          email: email.toLowerCase().trim(),
          fullName: 'Ravindra S (Owner & Lead Curator)',
          role: 'super_admin',
        }
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid email or password. Please verify your owner credentials.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Authentication service error'
    });
  }
}
