/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from './index';

export type ServiceCategoryId = 
  | 'holidays'
  | 'educational'
  | 'corporate'
  | 'transport'
  | 'visa_passport'
  | 'catering';

export type InquiryStatus = 
  | 'new'
  | 'contacted'
  | 'in_progress'
  | 'proposal_sent'
  | 'confirmed'
  | 'closed'
  | 'cancelled';

export type ContactMethod = 'whatsapp' | 'phone' | 'email';

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

// Common Customer Information
export interface CustomerContactInfo {
  fullName: string;
  phone: string;
  email?: string;
  preferredLanguage: Language;
  preferredContactMethod: ContactMethod;
  additionalRequirements?: string;
  city?: string;
}

// 1. Holiday Packages Payload
export interface HolidayInquiryPayload {
  destination: string;
  scope: 'domestic' | 'international' | 'both';
  packageType: 'pre_organised' | 'customised' | 'family_group';
  departureCity: string;
  travelDates: string;
  travelDurationDays?: number;
  travellerCount: number;
  adultsCount: number;
  childrenCount: number;
  budgetTier: 'budget' | 'comfort' | 'premium' | 'curated_luxury';
  accommodationPreference?: string;
  interests?: string[];
}

// 2. Educational & Industrial Tours Payload
export interface EducationalInquiryPayload {
  institutionName: string;
  contactPersonDesignation: string;
  tourType: 'school' | 'college' | 'industrial_visit' | 'expedition' | 'institutional';
  studentCount: number;
  facultyCount?: number;
  gradeLevels?: string;
  destination: string;
  visitPurpose: string;
  preferredDates: string;
  transportRequirement: 'bus_only' | 'train_plus_bus' | 'flight_plus_bus' | 'self_arranged';
  cateringIncluded: boolean;
}

// 3. Corporate & Event Tours Payload
export interface CorporateInquiryPayload {
  organizationName: string;
  contactPersonDesignation?: string;
  eventType: 'retreat' | 'conference' | 'team_outing' | 'group_event' | 'event_coordination';
  attendeeCount: number;
  destinationPreference: string;
  preferredDates: string;
  durationDays?: number;
  accommodationTier?: string;
  transportRequired: boolean;
  cateringRequired: boolean;
  budgetEstimate?: string;
}

// 4. Transportation & Bookings Payload
export interface TransportInquiryPayload {
  bookingType: 'car_rental' | 'bus_coach_rental' | 'train_assistance' | 'bus_ticket_assistance' | 'group_transport';
  vehicleType?: 'sedan' | 'suv' | 'tempo_traveller' | 'mini_bus' | 'luxury_coach';
  originCity: string;
  destinationCity: string;
  journeyDate: string;
  returnDate?: string;
  durationDays?: number;
  passengerCount: number;
  specialRequests?: string;
}

// 5. Visa & Passport Assistance Payload
export interface VisaPassportInquiryPayload {
  serviceType: 'visa_assistance' | 'passport_assistance' | 'travel_docs' | 'international_prep';
  destinationCountry: string;
  citizenship: string;
  applicantCount: number;
  travelDateApprox?: string;
  assistanceSpecifics?: string;
}

// 6. Catering & Hospitality Payload
export interface CateringInquiryPayload {
  eventType: 'tour_group' | 'wedding' | 'corporate_event' | 'family_function' | 'pankti_seva';
  guestCount: number;
  eventDate: string;
  venueLocation: string;
  mealSlots: ('breakfast' | 'lunch' | 'high_tea' | 'dinner')[];
  cuisineStyle: 'south_indian_traditional' | 'north_indian' | 'sattvic_jain' | 'malnad_coorg' | 'mixed';
  servingStyle: 'banana_leaf_pankti' | 'buffet' | 'packed_travel_boxes';
}

// Union of all payload types
export type ServiceInquiryPayload =
  | { category: 'holidays'; data: HolidayInquiryPayload }
  | { category: 'educational'; data: EducationalInquiryPayload }
  | { category: 'corporate'; data: CorporateInquiryPayload }
  | { category: 'transport'; data: TransportInquiryPayload }
  | { category: 'visa_passport'; data: VisaPassportInquiryPayload }
  | { category: 'catering'; data: CateringInquiryPayload }
  | { category: 'general'; data: Record<string, unknown> };

// Full Inquiry Submission Payload (from client to server)
export interface CreateInquiryRequest {
  customer: CustomerContactInfo;
  serviceCategory: ServiceCategoryId | 'general';
  serviceType: string;
  servicePayload: Record<string, unknown>;
  idempotencyKey?: string;
  honeypot?: string; // Spam trap field
}

// Stored Inquiry Entity
export interface InquiryRecord {
  id: string; // UUID
  referenceNumber: string; // e.g. ICH-2026-X8P2
  customerName: string;
  phone: string;
  email?: string;
  preferredLanguage: Language;
  preferredContactMethod: ContactMethod;
  serviceCategory: ServiceCategoryId | 'general';
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

// Audit Log of Status Changes & Events
export interface InquiryEvent {
  id: string;
  inquiryId: string;
  eventType: 'created' | 'status_changed' | 'note_added' | 'staff_assigned' | 'notification_dispatched' | 'followup_scheduled';
  previousStatus?: InquiryStatus;
  newStatus?: InquiryStatus;
  notes?: string;
  actorName: string;
  createdAt: string;
}

// Notification Delivery Log
export interface NotificationLog {
  id: string;
  inquiryId: string;
  channel: 'email' | 'whatsapp';
  recipient: string;
  status: 'pending' | 'sent' | 'failed' | 'mock_sent';
  providerResponse?: string;
  errorMessage?: string;
  attemptCount: number;
  createdAt: string;
}

// Admin Profile
export interface AdminProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'operations_manager' | 'travel_consultant';
  isActive: boolean;
  createdAt: string;
}

// Admin Summary Statistics
export interface AdminDashboardStats {
  totalInquiries: number;
  newInquiriesToday: number;
  pendingFollowups: number;
  convertedCount: number;
  conversionRate: number;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
  recentInquiries: InquiryRecord[];
}
