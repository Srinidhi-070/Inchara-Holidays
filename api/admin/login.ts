/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSupabase, isSupabaseConfigured } from '../_shared/supabase';

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
        // Fetch role from admin_profiles
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
            fullName: profile?.full_name || 'Staff Administrator',
            role: profile?.role || 'travel_consultant',
          }
        });
      }
    }

    // 2. Verified Local / Master Admin Credentials
    // Allows staff to log in immediately even before Supabase Auth users are invited
    const masterEmail = process.env.ADMIN_EMAIL || 'admin@incharaholidays.com';
    const masterPassword = process.env.ADMIN_PASSWORD || 'Inchara@2026';

    if (email.toLowerCase().trim() === masterEmail.toLowerCase().trim() && password === masterPassword) {
      return res.status(200).json({
        success: true,
        token: `mock_jwt_${Buffer.from(email).toString('base64')}_${Date.now()}`,
        user: {
          id: 'admin_root',
          email: masterEmail,
          fullName: 'Inchara Operations Lead',
          role: 'super_admin',
        }
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid email or password. Please verify your staff credentials.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Authentication service error'
    });
  }
}
