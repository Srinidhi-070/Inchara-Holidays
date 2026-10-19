export type Language = 'kn' | 'en';
export type Concept = 'A' | 'B' | 'C';

export interface CulturalEtiquetteTip {
  categoryKn: string;
  categoryEn: string;
  titleKn: string;
  titleEn: string;
  tipKn: string;
  tipEn: string;
  badge?: string;
}

export interface Destination {
  id: string;
  nameKn: string;
  nameEn: string;
  regionKn: string;
  regionEn: string;
  category: 'karnataka' | 'panIndia' | 'international';
  tagKn: string;
  tagEn: string;
  shortDescKn: string;
  shortDescEn: string;
  narrativeKn: string;
  narrativeEn: string;
  highlightsKn: string[];
  highlightsEn: string[];
  bestSeasonKn: string;
  bestSeasonEn: string;
  durationKn: string;
  durationEn: string;
  travelStyleKn: string;
  travelStyleEn: string;
  image: string;
  imageAlt: string;
  isFeatured?: boolean;
  circuit?: string;
  culturalEtiquette?: CulturalEtiquetteTip[];
}

export interface Experience {
  id: string;
  titleKn: string;
  titleEn: string;
  subtitleKn: string;
  subtitleEn: string;
  descriptionKn: string;
  descriptionEn: string;
  badgeKn: string;
  badgeEn: string;
  idealForKn: string;
  idealForEn: string;
  image: string;
  highlightsKn: string[];
  highlightsEn: string[];
}

export interface ReviewPlaceholder {
  id: string;
  quoteKn: string;
  quoteEn: string;
  authorKn: string;
  authorEn: string;
  journeyKn: string;
  journeyEn: string;
  noteKn: string;
  noteEn: string;
}

export interface TripPlanningFormData {
  scope: 'domestic' | 'international' | 'both';
  destinations: string[];
  customDestination: string;
  travelMonth: string;
  flexibility: 'exact' | 'flexible_few_days' | 'anytime_this_season';
  durationDays: number;
  travellersCount: number;
  travellerType: 'solo' | 'couple' | 'family' | 'friends';
  styles: string[];
  budgetTier: 'comfort' | 'premium' | 'curated_luxury';
  specialNotes: string;
  fullName: string;
  contactNumber: string;
  email: string;
  preferredChannel: 'whatsapp' | 'phone' | 'email';
}

export type ServiceType = 'holiday' | 'corporate' | 'catering' | 'school';

export interface SamplePackage {
  id: string;
  titleKn: string;
  titleEn: string;
  category: 'karnataka' | 'panIndia' | 'international';
  durationKn: string;
  durationEn: string;
  highlightsKn: string[];
  highlightsEn: string[];
  inclusionsKn: string[];
  inclusionsEn: string[];
  samplePriceDisclaimerKn: string;
  samplePriceDisclaimerEn: string;
  image: string;
  imageAlt: string;
  badgeKn: string;
  badgeEn: string;
}

export interface CorporateInquiryData {
  organizationName: string;
  contactPerson: string;
  workEmail: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  attendeeCount: string;
  locationPreference: string;
  budgetRange: string;
  additionalRequirements: string;
}

export interface CateringInquiryData {
  fullName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  occasionType: string;
  mealTypes: string[];
  dietaryPreference: string;
  serviceStyle: string;
  specialRequests: string;
}

export interface SchoolTripInquiryData {
  institutionName: string;
  coordinatorName: string;
  designation: string;
  phone: string;
  email: string;
  studentCount: string;
  gradeLevels: string;
  chaperoneCount: string;
  learningFocus: string;
  preferredDates: string;
  durationDays: string;
  safetyOrDietaryNeeds: string;
}

