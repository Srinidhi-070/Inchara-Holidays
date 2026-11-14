/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — SERVERLESS INQUIRY VALIDATION (ZOD)
 */

import { z } from 'zod';

export const customerInputSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' }),
  phone: z
    .string()
    .min(10, { message: 'Please enter a valid 10-digit mobile number.' })
    .max(15, { message: 'Phone number is too long.' })
    .regex(/^[0-9+\s\-()]{10,15}$/, { message: 'Invalid phone number format.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .optional()
    .or(z.literal('')),
  preferredLanguage: z.enum(['kn', 'en']).default('kn'),
  preferredContactMethod: z.enum(['whatsapp', 'phone', 'email']).default('whatsapp'),
  city: z.string().max(80).optional(),
  additionalRequirements: z.string().max(1000).optional(),
});

export const createInquiryRequestSchema = z.object({
  customer: customerInputSchema,
  serviceCategory: z.enum([
    'holidays',
    'educational',
    'corporate',
    'transport',
    'visa_passport',
    'catering',
    'general'
  ]),
  serviceType: z.string().min(1, { message: 'Service type is required.' }),
  servicePayload: z.record(z.string(), z.unknown()).default({}),
  idempotencyKey: z.string().optional(),
  honeypot: z.string().max(0, { message: 'Spam detected.' }).optional().or(z.literal('')),
});

export type ValidatedCreateInquiryRequest = z.infer<typeof createInquiryRequestSchema>;

export function validateInquiryInput(input: unknown): {
  success: boolean;
  data?: ValidatedCreateInquiryRequest;
  errors?: Record<string, string>;
} {
  const result = createInquiryRequestSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const fieldPath = issue.path.join('.');
    errors[fieldPath] = issue.message;
  }

  return { success: false, errors };
}
