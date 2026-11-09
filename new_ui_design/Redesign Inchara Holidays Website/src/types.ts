export type Locale = "en" | "kn";

export type ServiceId = "holidays" | "education" | "corporate" | "transport" | "visa" | "catering";

export type Localized = Record<Locale, string>;

export type Service = {
  id: ServiceId;
  number: string;
  title: Localized;
  shortTitle: Localized;
  description: Localized;
  features: Record<Locale, string[]>;
};

export type EnquiryDetails = Record<string, string>;

export type EnquiryContact = {
  name: string;
  phone: string;
  email: string;
  preferred: "phone" | "email" | "";
  notes: string;
  consent: boolean;
};

export type EnquiryPayload = {
  service: ServiceId | "";
  details: EnquiryDetails;
  contact: EnquiryContact;
};
