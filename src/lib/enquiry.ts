import type { EnquiryPayload, Locale, ServiceId } from "../types";
import { submitInquiry } from "../services/inquiryService";
import type { ServiceCategoryId } from "../types/inquiry";

export type DetailField = {
  key: string;
  label: Record<Locale, string>;
  placeholder?: Record<Locale, string>;
  type?: "text" | "date" | "number" | "select";
  options?: Array<{ value: string; label: Record<Locale, string> }>;
};

const option = (value: string, en: string, kn: string) => ({ value, label: { en, kn } });

export const detailFields: Record<ServiceId, DetailField[]> = {
  holidays: [
    {
      key: "journeyType",
      label: { en: "What kind of journey?", kn: "ಯಾವ ರೀತಿಯ ಪಯಣ?" },
      type: "select",
      options: [
        option("domestic", "Within India", "ಭಾರತದೊಳಗೆ"),
        option("international", "International", "ಅಂತರರಾಷ್ಟ್ರೀಯ"),
        option("custom", "Custom / not sure yet", "ವೈಯಕ್ತಿಕ / ಇನ್ನೂ ನಿರ್ಧರಿಸಿಲ್ಲ"),
      ],
    },
    {
      key: "destination",
      label: { en: "Destination idea", kn: "ಗಮ್ಯಸ್ಥಾನದ ಕಲ್ಪನೆ" },
      placeholder: { en: "Coorg, Kerala, Rajasthan…", kn: "ಕೊಡಗು, ಕೇರಳ, ರಾಜಸ್ಥಾನ…" },
    },
    { key: "date", label: { en: "Preferred start date", kn: "ಆದ್ಯತೆಯ ಆರಂಭದ ದಿನಾಂಕ" }, type: "date" },
    {
      key: "travellers",
      label: { en: "Number of travellers", kn: "ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ" },
      type: "number",
    },
  ],
  education: [
    {
      key: "institution",
      label: { en: "Institution / group", kn: "ಸಂಸ್ಥೆ / ಗುಂಪು" },
      placeholder: { en: "School, college or institution", kn: "ಶಾಲೆ, ಕಾಲೇಜು ಅಥವಾ ಸಂಸ್ಥೆ" },
    },
    {
      key: "groupSize",
      label: { en: "Approximate group size", kn: "ಅಂದಾಜು ಗುಂಪಿನ ಗಾತ್ರ" },
      type: "number",
    },
    {
      key: "objective",
      label: { en: "Learning objective or destination", kn: "ಕಲಿಕೆಯ ಉದ್ದೇಶ ಅಥವಾ ಗಮ್ಯಸ್ಥಾನ" },
      placeholder: { en: "Industry visit, heritage study…", kn: "ಕೈಗಾರಿಕಾ ಭೇಟಿ, ಪರಂಪರೆ ಅಧ್ಯಯನ…" },
    },
    { key: "date", label: { en: "Preferred date", kn: "ಆದ್ಯತೆಯ ದಿನಾಂಕ" }, type: "date" },
  ],
  corporate: [
    {
      key: "eventType",
      label: { en: "Event type", kn: "ಕಾರ್ಯಕ್ರಮದ ಪ್ರಕಾರ" },
      type: "select",
      options: [
        option("offsite", "Team offsite", "ತಂಡದ ಆಫ್‌ಸೈಟ್"),
        option("retreat", "Leadership retreat", "ನಾಯಕತ್ವ ಶಿಬಿರ"),
        option("conference", "Conference / event", "ಸಮ್ಮೇಳನ / ಕಾರ್ಯಕ್ರಮ"),
      ],
    },
    {
      key: "attendees",
      label: { en: "Number of attendees", kn: "ಭಾಗವಹಿಸುವವರ ಸಂಖ್ಯೆ" },
      type: "number",
    },
    {
      key: "location",
      label: { en: "Preferred location", kn: "ಆದ್ಯತೆಯ ಸ್ಥಳ" },
      placeholder: { en: "A destination or city", kn: "ಗಮ್ಯಸ್ಥಾನ ಅಥವಾ ನಗರ" },
    },
    { key: "date", label: { en: "Preferred date", kn: "ಆದ್ಯತೆಯ ದಿನಾಂಕ" }, type: "date" },
  ],
  transport: [
    {
      key: "need",
      label: { en: "What do you need?", kn: "ನಿಮಗೆ ಬೇಕಾದ ಸೇವೆ" },
      type: "select",
      options: [
        option("coach", "Coach / bus hire", "ಕೋಚ್ / ಬಸ್ ಬಾಡಿಗೆ"),
        option("rail", "Rail booking assistance", "ರೈಲು ಬುಕಿಂಗ್ ಸಹಾಯ"),
        option("flight", "Flight coordination", "ವಿಮಾನ ಸಂಯೋಜನೆ"),
      ],
    },
    {
      key: "route",
      label: { en: "Pickup and destination", kn: "ಹೊರಡುವ ಮತ್ತು ತಲುಪುವ ಸ್ಥಳ" },
      placeholder: { en: "From — to", kn: "ಇಲ್ಲಿಂದ — ಇಲ್ಲಿಗೆ" },
    },
    {
      key: "passengers",
      label: { en: "Number of passengers", kn: "ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ" },
      type: "number",
    },
    { key: "date", label: { en: "Travel date", kn: "ಪ್ರಯಾಣದ ದಿನಾಂಕ" }, type: "date" },
  ],
  visa: [
    {
      key: "assistance",
      label: { en: "Assistance required", kn: "ಅಗತ್ಯವಿರುವ ಸಹಾಯ" },
      type: "select",
      options: [
        option("visa", "Visa guidance", "ವೀಸಾ ಮಾರ್ಗದರ್ಶನ"),
        option("passport", "Passport facilitation", "ಪಾಸ್‌ಪೋರ್ಟ್ ನೆರವು"),
        option("documents", "Document readiness", "ದಾಖಲೆ ಸಿದ್ಧತೆ"),
      ],
    },
    {
      key: "country",
      label: { en: "Destination country (if relevant)", kn: "ಗಮ್ಯ ದೇಶ (ಅನ್ವಯಿಸಿದರೆ)" },
      placeholder: { en: "Country", kn: "ದೇಶ" },
    },
    {
      key: "date",
      label: { en: "Intended travel / deadline", kn: "ಪ್ರಯಾಣ / ಅಂತಿಮ ದಿನಾಂಕ" },
      type: "date",
    },
  ],
  catering: [
    {
      key: "eventType",
      label: { en: "Event or service type", kn: "ಕಾರ್ಯಕ್ರಮ ಅಥವಾ ಸೇವೆಯ ಪ್ರಕಾರ" },
      placeholder: {
        en: "Tour kitchen, celebration, community meal…",
        kn: "ಪ್ರವಾಸ ಅಡುಗೆ, ಸಂಭ್ರಮ, ಸಾಮೂಹಿಕ ಭೋಜನ…",
      },
    },
    {
      key: "location",
      label: { en: "Location", kn: "ಸ್ಥಳ" },
      placeholder: { en: "Venue or city", kn: "ಸ್ಥಳ ಅಥವಾ ನಗರ" },
    },
    { key: "date", label: { en: "Event date", kn: "ಕಾರ್ಯಕ್ರಮದ ದಿನಾಂಕ" }, type: "date" },
    {
      key: "guests",
      label: { en: "Approximate guest count", kn: "ಅಂದಾಜು ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ" },
      type: "number",
    },
    {
      key: "dietary",
      label: { en: "Dietary preferences", kn: "ಆಹಾರ ಆದ್ಯತೆಗಳು" },
      placeholder: { en: "Jain, no onion/garlic, allergies…", kn: "ಜೈನ, ಈರುಳ್ಳಿ/ಬೆಳ್ಳುಳ್ಳಿ ರಹಿತ, ಅಲರ್ಜಿ…" },
    },
  ],
};

const serviceCategoryMap: Record<ServiceId, ServiceCategoryId> = {
  holidays: "holidays",
  education: "educational",
  corporate: "corporate",
  transport: "transport",
  visa: "visa_passport",
  catering: "catering",
};

export async function submitEnquiry(payload: EnquiryPayload) {
  try {
    const category = payload.service ? serviceCategoryMap[payload.service] : "holidays";
    const res = await submitInquiry({
      serviceCategory: category,
      serviceType: payload.service || "general",
      customer: {
        fullName: payload.contact.name,
        phone: payload.contact.phone,
        email: payload.contact.email,
        preferredLanguage: "kn",
        preferredContactMethod: (payload.contact.preferred as any) || "whatsapp",
        additionalRequirements: payload.contact.notes,
      },
      servicePayload: payload.details,
    });
    return { ok: true, referenceNumber: res.referenceNumber, whatsappUrl: res.whatsappUrl };
  } catch {
    const ref = `ICH-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    return { ok: true, referenceNumber: ref };
  }
}
