/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * INCHARA HOLIDAYS — SERVERLESS BACKEND SHARED TYPES
 * Completely isolated from frontend Vite/React bundle.
 */

declare global {
  var process: any;
  var Buffer: any;
}

export type Language = 'kn' | 'en';
export type ContactMethod = 'whatsapp' | 'phone' | 'email';

export type ServiceCategoryId = 
  | 'holidays'
  | 'educational'
  | 'corporate'
  | 'transport'
  | 'visa_passport'
  | 'catering'
  | 'general';

export type InquiryStatus = 
  | 'new'
  | 'contacted'
  | 'in_progress'
  | 'proposal_sent'
  | 'confirmed'
  | 'closed'
  | 'cancelled';

export type NotificationChannel = 'whatsapp' | 'email';

export type NotificationStatus = 
  | 'pending'
  | 'processing'
  | 'sent'
  | 'delivered'
  | 'failed'
  | 'retry_scheduled';

export interface CustomerContactInfo {
  fullName: string;
  phone: string;
  email?: string;
  preferredLanguage: Language;
  preferredContactMethod: ContactMethod;
  additionalRequirements?: string;
  city?: string;
}

export interface InquiryRecord {
  id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  preferredLanguage: Language;
  preferredContactMethod: ContactMethod;
  serviceCategory: ServiceCategoryId;
  serviceType: string;
  servicePayload: Record<string, unknown>;
  additionalRequirements?: string;
  status: InquiryStatus;
  assignedStaff?: string;
  internalNotes?: string;
  nextFollowupDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationLog {
  id: string;
  inquiryId: string;
  inquiryReference?: string;
  customerName?: string;
  channel: NotificationChannel;
  recipient: string;
  templateName?: string;
  status: NotificationStatus;
  providerMessageId?: string;
  providerResponse?: unknown;
  errorMessage?: string;
  attemptCount: number;
  lastAttemptAt?: string;
  createdAt: string;
}

export interface DispatchNotificationResult {
  emailSent: boolean;
  whatsappSent: boolean;
  customerAckSent: boolean;
  logs: NotificationLog[];
}

export interface SubServiceDef {
  id: string;
  categoryId: ServiceCategoryId;
  titleKn: string;
  titleEn: string;
  summaryKn: string;
  summaryEn: string;
  detailsKn: string[];
  detailsEn: string[];
  highlightsKn: string[];
  highlightsEn: string[];
  inquiryNoticeKn?: string;
  inquiryNoticeEn?: string;
  isAssistanceOnly?: boolean;
}

export interface ServiceCategoryDef {
  id: ServiceCategoryId;
  titleKn: string;
  titleEn: string;
  taglineKn: string;
  taglineEn: string;
  descriptionKn: string;
  descriptionEn: string;
  iconName: string;
  image: string;
  badgeKn: string;
  badgeEn: string;
  services: SubServiceDef[];
  isActive: boolean;
  displayOrder: number;
}
