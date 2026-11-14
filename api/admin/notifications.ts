/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — ADMIN NOTIFICATION LOGS & RETRY API
 * Allows the owner (Ravindra S) to inspect delivery states and re-attempt failed alerts.
 */

import { getNotificationLogs, retryNotification } from '../_shared/notifications.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Basic authorization check
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Staff token required.' });
  }

  // 1. GET: Retrieve notification logs
  if (req.method === 'GET') {
    try {
      const limit = Number(req.query?.limit) || 50;
      const logs = await getNotificationLogs(limit);
      return res.status(200).json({ success: true, logs });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Failed to retrieve notification logs' });
    }
  }

  // 2. POST: Re-attempt failed notification
  if (req.method === 'POST') {
    try {
      const { logId } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!logId) {
        return res.status(400).json({ success: false, error: 'Notification logId is required' });
      }

      const retryResult = await retryNotification(logId);
      if (retryResult.success) {
        return res.status(200).json({
          success: true,
          message: 'Notification retry dispatched successfully',
          log: retryResult.log,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: retryResult.error || 'Retry attempt failed',
          log: retryResult.log,
        });
      }
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Notification retry exception' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
