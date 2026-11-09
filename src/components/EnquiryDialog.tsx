import React, { useEffect, useId, useRef, useState } from "react";
import { services } from "../content";
import { detailFields, submitEnquiry } from "../lib/enquiry";
import type { EnquiryPayload, Locale, ServiceId } from "../types";
import { brandConfig } from "../config/brand";
import { Check, X, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { CustomSelect } from "./CustomSelect";
import { CustomDatePicker } from "./CustomDatePicker";

const emptyContact = {
  name: "",
  phone: "",
  email: "",
  preferred: "whatsapp" as const,
  notes: "",
  consent: false,
};

const ui = {
  en: {
    eyebrow: "UNIVERSAL ENQUIRY",
    title: "Let’s shape your journey.",
    intro: "A few thoughtful details help us understand where to begin.",
    steps: ["Service", "Details", "Contact", "Review"],
    choose: "What can we help you with?",
    details: "Tell us a little more.",
    contact: "How may we reach you?",
    review: "Review your enquiry",
    reviewBody: "Check your details before submitting.",
    next: "CONTINUE",
    back: "BACK",
    submit: "SUBMIT ENQUIRY",
    edit: "Edit",
    required: "Please complete this field.",
    chooseRequired: "Choose a service to continue.",
    contactRequired: "Add a valid phone number or email address.",
    preferredRequired: "Add the contact detail for your preferred method.",
    consentRequired: "Please confirm your details are accurate.",
    name: "Your Name",
    phone: "Phone Number",
    email: "Email Address",
    preferred: "Preferred Contact Method",
    chooseMethod: "Choose a method",
    whatsappOption: "WhatsApp",
    phoneOption: "Phone Call",
    emailOption: "Email",
    notes: "Anything else we should know? (optional)",
    consent: "I confirm the contact and travel details provided are accurate.",
    demo: "Bespoke itineraries, transparent pricing, zero commercial kickbacks.",
    selectedService: "Selected Service",
    yourDetails: "Journey Details",
    contactDetails: "Contact Details",
    sending: "Submitting…",
    successEyebrow: "ENQUIRY REGISTERED",
    successTitle: "Thank you for sharing your plans.",
    successBody:
      "Our team will review your requirements and reach out with a personalized plan within 24 hours.",
    referenceLabel: "Your Enquiry Reference Number",
    whatsappBtn: "Chat with an Advisor on WhatsApp",
    another: "Start another enquiry",
    done: "Close",
    close: "Close enquiry",
    discard: "Discard the information entered and close?",
    error: "Something interrupted the submission. Please try again.",
  },
  kn: {
    eyebrow: "ಸಾರ್ವತ್ರಿಕ ವಿಚಾರಣೆ",
    title: "ನಿಮ್ಮ ಪಯಣವನ್ನು ರೂಪಿಸೋಣ.",
    intro: "ಕೆಲವು ವಿವರಗಳು ನಾವು ಎಲ್ಲಿಂದ ಆರಂಭಿಸಬೇಕೆಂದು ತಿಳಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",
    steps: ["ಸೇವೆ", "ವಿವರಗಳು", "ಸಂಪರ್ಕ", "ಪರಿಶೀಲನೆ"],
    choose: "ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    details: "ಇನ್ನಷ್ಟು ವಿವರಿಸಿ.",
    contact: "ನಿಮ್ಮನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸಬಹುದು?",
    review: "ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    reviewBody: "ಸಲ್ಲಿಸುವ ಮೊದಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    next: "ಮುಂದುವರಿಸಿ",
    back: "ಹಿಂದೆ",
    submit: "ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ",
    edit: "ತಿದ್ದುಪಡಿ",
    required: "ದಯವಿಟ್ಟು ಈ ವಿವರವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
    chooseRequired: "ಮುಂದುವರಿಸಲು ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    contactRequired: "ಸರಿಯಾದ ದೂರವಾಣಿ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ಸೇರಿಸಿ.",
    preferredRequired: "ನಿಮ್ಮ ಆದ್ಯತೆಯ ವಿಧಾನಕ್ಕೆ ಸಂಪರ್ಕ ವಿವರ ಸೇರಿಸಿ.",
    consentRequired: "ವಿವರಗಳು ಸರಿಯಾಗಿವೆ ಎಂದು ದೃಢೀಕರಿಸಿ.",
    name: "ನಿಮ್ಮ ಹೆಸರು",
    phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    email: "ಇಮೇಲ್ ವಿಳಾಸ",
    preferred: "ಆದ್ಯತೆಯ ಸಂಪರ್ಕ ವಿಧಾನ",
    chooseMethod: "ವಿಧಾನ ಆಯ್ಕೆಮಾಡಿ",
    whatsappOption: "ವಾಟ್ಸಾಪ್ (WhatsApp)",
    phoneOption: "ದೂರವಾಣಿ ಕರೆ (Phone)",
    emailOption: "ಇಮೇಲ್ (Email)",
    notes: "ನಾವು ತಿಳಿಯಬೇಕಾದ ಬೇರೆ ವಿಷಯ? (ಐಚ್ಛಿಕ)",
    consent: "ನಾನು ನೀಡಿದ ಸಂಪರ್ಕ ಮತ್ತು ಪ್ರಯಾಣ ವಿವರಗಳು ನಿಖರವಾಗಿವೆ ಎಂದು ದೃಢೀಕರಿಸುತ್ತೇನೆ.",
    demo: "ವೈಯಕ್ತಿಕ ಪ್ರವಾಸ ಯೋಜನೆ, ಪಾರದರ್ಶಕ ದರಗಳು ಮತ್ತು ನೈಜ ಮಲೆನಾಡು ಆತಿಥ್ಯ.",
    selectedService: "ಆಯ್ಕೆಮಾಡಿದ ಸೇವೆ",
    yourDetails: "ಪ್ರಯಾಣದ ವಿವರಗಳು",
    contactDetails: "ಸಂಪರ್ಕ ವಿವರಗಳು",
    sending: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ…",
    successEyebrow: "ವಿಚಾರಣೆ ದಾಖಲಾಗಿದೆ",
    successTitle: "ನಿಮ್ಮ ಯೋಜನೆ ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
    successBody: "ನಮ್ಮ ತಂಡವು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ೨೪ ಗಂಟೆಗಳ ಒಳಗೆ ಸೂಕ್ತ ಯೋಜನೆಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
    referenceLabel: "ನಿಮ್ಮ ವಿಚಾರಣೆ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ",
    whatsappBtn: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ತಕ್ಷಣ ಚರ್ಚಿಸಿ",
    another: "ಇನ್ನೊಂದು ವಿಚಾರಣೆ ಆರಂಭಿಸಿ",
    done: "ಮುಚ್ಚಿ",
    close: "ವಿಚಾರಣೆ ಮುಚ್ಚಿ",
    discard: "ನಮೂದಿಸಿದ ಮಾಹಿತಿಯನ್ನು ರದ್ದುಗೊಳಿಸಿ ಮುಚ್ಚಬೇಕೆ?",
    error: "ವಿಚಾರಣೆ ಸಲ್ಲಿಸುವಲ್ಲಿ ದೋಷವಾಗಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.",
  },
};

type Props = {
  open: boolean;
  locale: Locale;
  initialService?: ServiceId | null;
  initialDestination?: string;
  onClose: () => void;
};

// High-fidelity vector icons matching the Figma design screenshot
export function LargeServiceArtwork({ id, className = "w-16 h-16 sm:w-20 sm:h-20" }: { id: string; className?: string }) {
  switch (id) {
    case "holidays":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M8 52 L23 20 L34 38 L43 25 L56 52" />
          <path d="M4 56 H60" />
        </svg>
      );
    case "education":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M8 24 L32 12 L56 24 L32 36 Z" />
          <path d="M18 30 V44 C18 47 32 52 32 52 C32 52 46 47 46 44 V30" />
          <path d="M56 24 V44" />
          <circle cx="56" cy="46" r="2" fill="currentColor" />
        </svg>
      );
    case "corporate":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="10" y="20" width="44" height="34" rx="5" />
          <path d="M22 20 V14 C22 11.8 23.8 10 26 10 H38 C40.2 10 42 11.8 42 14 V20" />
          <path d="M10 32 H54" />
          <path d="M28 32 V36 H36 V32" />
        </svg>
      );
    case "transport":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="10" y="14" width="44" height="36" rx="8" />
          <path d="M10 28 H54" />
          <circle cx="20" cy="40" r="3" fill="currentColor" />
          <circle cx="44" cy="40" r="3" fill="currentColor" />
          <path d="M18 50 V54" />
          <path d="M46 50 V54" />
        </svg>
      );
    case "visa":
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="14" y="10" width="36" height="46" rx="6" />
          <circle cx="32" cy="28" r="7" />
          <path d="M24 44 H40" />
          <path d="M27 49 H37" />
        </svg>
      );
    case "catering":
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 44 C12 28 20 20 32 20 C44 20 52 28 52 44" />
          <path d="M32 20 V14" />
          <circle cx="32" cy="12" r="2.5" fill="currentColor" />
          <path d="M8 50 H56" />
          <path d="M12 44 H52" />
        </svg>
      );
  }
}

export function EnquiryDialog({ open, locale, initialService, initialDestination, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState<EnquiryPayload>({
    service: "",
    details: {},
    contact: emptyContact,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"form" | "submitting" | "success" | "error">("form");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const c = ui[locale];

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    setPayload((current) => ({
      ...current,
      service: initialService ?? current.service,
      details: initialDestination
        ? { ...current.details, destination: initialDestination }
        : initialService && initialService !== current.service
        ? {}
        : current.details,
    }));
    if (initialService) {
      setStep(1);
    } else {
      setStep(0);
    }
    document.body.classList.add("dialog-open");
    window.setTimeout(() => dialogRef.current?.focus(), 0);
    return () => {
      document.body.classList.remove("dialog-open");
      previousFocus.current?.focus();
    };
  }, [open, initialService, initialDestination]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!open) return null;

  const activeFields = payload.service ? detailFields[payload.service] : [];
  const selectedServiceMeta = services.find((s) => s.id === payload.service);

  function requestClose() {
    const hasData =
      payload.service ||
      Object.keys(payload.details).length > 0 ||
      payload.contact.name ||
      payload.contact.phone;
    if (!hasData || status === "success") {
      reset();
      onClose();
      return;
    }
    if (window.confirm(c.discard)) {
      reset();
      onClose();
    }
  }

  function reset() {
    setPayload({ service: "", details: {}, contact: emptyContact });
    setErrors({});
    setStep(0);
    setStatus("form");
    setReferenceNumber("");
    setWhatsappUrl("");
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (step === 0 && !payload.service) nextErrors.service = c.chooseRequired;
    if (step === 1 && payload.service) {
      detailFields[payload.service].forEach((field) => {
        if (field.key !== "dietary" && !payload.details[field.key]?.trim())
          nextErrors[field.key] = c.required;
      });
    }
    if (step === 2) {
      if (!payload.contact.name.trim()) nextErrors.name = c.required;
      const validEmail = /^\S+@\S+\.\S+$/.test(payload.contact.email);
      const validPhone = payload.contact.phone.replace(/\D/g, "").length >= 7;
      if (!validEmail && !validPhone) nextErrors.contact = c.contactRequired;
      if (payload.contact.preferred === "email" && !validEmail)
        nextErrors.email = c.preferredRequired;
      if (payload.contact.preferred === "phone" && !validPhone)
        nextErrors.phone = c.preferredRequired;
      if (!payload.contact.consent) nextErrors.consent = c.consentRequired;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function next() {
    if (validate()) setStep((current) => Math.min(current + 1, 3));
  }

  async function submit() {
    setStatus("submitting");
    try {
      const res = await submitEnquiry(payload);
      setReferenceNumber(res.referenceNumber);
      if (res.whatsappUrl) setWhatsappUrl(res.whatsappUrl);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[1050] overflow-hidden bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-3xl h-[min(620px,calc(100svh-1.5rem))] sm:h-[min(650px,calc(100svh-2.5rem))] bg-[#FBF8F1] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* Top Close Button */}
        <button
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#162E22] flex items-center justify-center shadow-md border border-[#162E22]/15 transition-all hover:scale-105 cursor-pointer"
          type="button"
          aria-label={c.close}
          onClick={requestClose}
        >
          <X className="w-4 h-4 text-[#162E22]" />
        </button>

        {status === "success" ? (
          /* SUCCESS STATE */
          <div className="p-8 sm:p-14 text-center max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center mb-6 shadow-xl border-2 border-[#D4AF37]/50">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>
            <p className="text-xs font-bold tracking-widest text-[#9E3D28] uppercase mb-2">
              {c.successEyebrow}
            </p>
            <h3 id={titleId} className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#162E22] mb-4">
              {c.successTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#252923]/75 leading-relaxed mb-6">
              {c.successBody}
            </p>

            {referenceNumber && (
              <div className="w-full my-4 p-5 rounded-2xl bg-white border border-[#D4AF37]/50 text-center shadow-sm">
                <span className="text-xs uppercase tracking-wider text-[#9E3D28] font-bold block mb-1">
                  {c.referenceLabel}
                </span>
                <span className="font-mono text-2xl font-bold text-[#162E22] tracking-wider select-all">
                  {referenceNumber}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
              {whatsappUrl && (
                <a
                  className="flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all hover:shadow-xl"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{c.whatsappBtn}</span>
                </a>
              )}
              <button
                className="py-4 px-6 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer border border-[#D4AF37]/40"
                type="button"
                onClick={requestClose}
              >
                {c.done}
              </button>
            </div>
          </div>
        ) : (
          /* MULTI-STEP WIZARD */
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Header with Title and Stepper */}
            <header className="pt-3 sm:pt-4 px-4 sm:px-6 pb-2.5 text-center border-b border-[#263F32]/8 bg-white/60 shrink-0">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-[#9E3D28] uppercase mb-0.5">
                {c.eyebrow}
              </p>
              <h2 id={titleId} className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#162E22] tracking-tight">
                {c.title}
              </h2>
              <p className="text-xs text-[#252923]/70 mt-0.5 max-w-md mx-auto hidden sm:block">
                {c.intro}
              </p>

              {/* Connected Stepper Line */}
              <div className="flex items-center justify-center max-w-sm mx-auto mt-3 relative">
                {/* Connecting track line */}
                <div className="absolute top-3 sm:top-3.5 left-4 right-4 h-0.5 bg-[#263F32]/15 -z-0" />

                <div className="flex items-center justify-between w-full relative z-10">
                  {c.steps.map((label, index) => {
                    const isDone = index < step;
                    const isCurrent = index === step;
                    return (
                      <div key={label} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all shadow-sm ${
                            isCurrent
                              ? "bg-[#162E22] text-[#F5D77F] ring-3 ring-[#D4AF37]/30 border border-[#D4AF37]"
                              : isDone
                              ? "bg-[#162E22] text-[#F5D77F]"
                              : "bg-[#F6F3EA] text-[#263F32]/50 border border-[#263F32]/20"
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : `0${index + 1}`}
                        </div>
                        <span className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase mt-1 ${
                          isCurrent ? "text-[#162E22] font-bold" : "text-[#252923]/50"
                        }`}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </header>

            {/* Dialog Scrollable Body */}
            <div className="p-3.5 sm:p-5 lg:p-6 flex-1 min-h-0 overflow-y-auto overscroll-contain">
              {/* STEP 0: What can we help you with? */}
              {step === 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-serif-editorial font-bold text-[#162E22] mb-1 sm:mb-2 text-center sm:text-left">
                    {c.choose}
                  </h3>
                  {errors.service && (
                    <p className="text-xs font-bold text-[#9E3D28] mb-3 p-2 rounded-lg bg-[#9E3D28]/10 border border-[#9E3D28]/20">
                      {errors.service}
                    </p>
                  )}

                  {/* 6 Balanced Service Cards in 3x2 Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mt-2.5 sm:mt-3">
                    {services.map((service) => {
                      const selected = payload.service === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => {
                            setPayload((curr) => ({
                              ...curr,
                              service: service.id,
                              details: curr.service === service.id ? curr.details : {},
                            }));
                            setErrors((curr) => ({ ...curr, service: "" }));
                          }}
                          className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center text-center transition-all duration-200 cursor-pointer group ${
                            selected
                              ? "bg-white border-2 border-[#D4AF37] shadow-lg ring-2 ring-[#D4AF37]/20 scale-[1.01]"
                              : "bg-white/80 hover:bg-white border border-[#263F32]/12 hover:border-[#D4AF37]/50 shadow-xs hover:shadow-md"
                          }`}
                        >
                          {/* Active Check Badge */}
                          {selected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}

                          {/* Bold Artwork Icon */}
                          <div className={`mb-2 sm:mb-2.5 transition-transform duration-200 group-hover:scale-105 ${
                            selected ? "text-[#162E22]" : "text-[#162E22]/85 group-hover:text-[#162E22]"
                          }`}>
                            <LargeServiceArtwork id={service.id} className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
                          </div>

                          <h4 className="text-xs sm:text-sm font-serif-editorial font-bold text-[#162E22] mb-1 leading-tight line-clamp-2 min-h-[1.75rem] sm:min-h-[2rem] flex items-center justify-center">
                            {service.title[locale]}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-[#252923]/70 leading-snug font-normal line-clamp-2">
                            {service.description[locale]}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 1: Details */}
              {step === 1 && (
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#D4AF37]/40 shadow-xs">
                    <LargeServiceArtwork id={payload.service} className="w-12 h-12 text-[#162E22] shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-[#9E3D28] uppercase block">
                        {c.selectedService}
                      </span>
                      <h4 className="text-lg font-bold font-serif-editorial text-[#162E22]">
                        {selectedServiceMeta?.title[locale]}
                      </h4>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif-editorial font-bold text-[#162E22]">
                    {c.details}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeFields.map((field) => {
                      const error = errors[field.key];
                      return (
                        <div key={field.key} className={field.key === "dietary" || field.key === "objective" ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2">
                            {field.label[locale]}
                          </label>
                          {field.type === "select" ? (
                            <CustomSelect
                              value={payload.details[field.key] ?? ""}
                              onChange={(val) =>
                                setPayload((curr) => ({
                                  ...curr,
                                  details: { ...curr.details, [field.key]: val },
                                }))
                              }
                              placeholder={c.chooseMethod}
                              error={error}
                              options={
                                field.options?.map((opt) => ({
                                  value: opt.value,
                                  label: opt.label[locale],
                                })) ?? []
                              }
                            />
                          ) : field.type === "date" ? (
                            <CustomDatePicker
                              value={payload.details[field.key] ?? ""}
                              onChange={(val) =>
                                setPayload((curr) => ({
                                  ...curr,
                                  details: { ...curr.details, [field.key]: val },
                                }))
                              }
                              placeholder={
                                field.placeholder?.[locale] ??
                                (locale === "kn" ? "ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ" : "Select travel date")
                              }
                              error={error}
                              locale={locale}
                            />
                          ) : (
                            <input
                              type={field.type ?? "text"}
                              value={payload.details[field.key] ?? ""}
                              placeholder={field.placeholder?.[locale]}
                              onChange={(e) =>
                                setPayload((curr) => ({
                                  ...curr,
                                  details: { ...curr.details, [field.key]: e.target.value },
                                }))
                              }
                              className="w-full px-4 py-3 rounded-xl bg-white border border-[#263F32]/20 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm font-medium text-[#162E22] outline-none transition-all shadow-xs placeholder:text-[#252923]/40"
                            />
                          )}
                          {error && (
                            <p className="text-[11px] font-semibold text-[#9E3D28] mt-1.5">{error}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Contact */}
              {step === 2 && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <h3 className="text-xl font-serif-editorial font-bold text-[#162E22]">
                    {c.contact}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2">
                        {c.name} *
                      </label>
                      <input
                        type="text"
                        value={payload.contact.name}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: { ...curr.contact, name: e.target.value },
                          }))
                        }
                        placeholder="e.g. Ramesh Hegde"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#263F32]/20 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm font-medium text-[#162E22] outline-none shadow-xs"
                      />
                      {errors.name && (
                        <p className="text-[11px] font-semibold text-[#9E3D28] mt-1.5">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2">
                        {c.phone} *
                      </label>
                      <input
                        type="tel"
                        value={payload.contact.phone}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: { ...curr.contact, phone: e.target.value },
                          }))
                        }
                        placeholder="+91 98450 12345"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#263F32]/20 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm font-medium text-[#162E22] outline-none shadow-xs"
                      />
                      {errors.phone && (
                        <p className="text-[11px] font-semibold text-[#9E3D28] mt-1.5">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2">
                        {c.email}
                      </label>
                      <input
                        type="email"
                        value={payload.contact.email}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: { ...curr.contact, email: e.target.value },
                          }))
                        }
                        placeholder="yourname@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#263F32]/20 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm font-medium text-[#162E22] outline-none shadow-xs"
                      />
                      {errors.email && (
                        <p className="text-[11px] font-semibold text-[#9E3D28] mt-1.5">{errors.email}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2">
                        {c.preferred}
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "whatsapp", label: c.whatsappOption },
                          { id: "phone", label: c.phoneOption },
                          { id: "email", label: c.emailOption },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setPayload((curr) => ({
                                ...curr,
                                contact: { ...curr.contact, preferred: opt.id as any },
                              }))
                            }
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              payload.contact.preferred === opt.id
                                ? "bg-[#162E22] text-[#F5D77F] border-[#D4AF37] shadow-sm"
                                : "bg-white text-[#162E22] border-[#263F32]/15 hover:border-[#D4AF37]"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2">
                        {c.notes}
                      </label>
                      <textarea
                        rows={3}
                        value={payload.contact.notes}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: { ...curr.contact, notes: e.target.value },
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#263F32]/20 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm font-medium text-[#162E22] outline-none shadow-xs resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={payload.contact.consent}
                          onChange={(e) =>
                            setPayload((curr) => ({
                              ...curr,
                              contact: { ...curr.contact, consent: e.target.checked },
                            }))
                          }
                          className="mt-1 w-4 h-4 rounded text-[#162E22] focus:ring-[#D4AF37] border-gray-300"
                        />
                        <span className="text-xs text-[#252923]/80 leading-relaxed font-medium">
                          {c.consent}
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-[11px] font-semibold text-[#9E3D28] mt-1.5">{errors.consent}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Review */}
              {step === 3 && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <h3 className="text-xl font-serif-editorial font-bold text-[#162E22]">
                    {c.review}
                  </h3>
                  <p className="text-xs text-[#252923]/70">{c.reviewBody}</p>

                  <div className="rounded-2xl bg-white border border-[#D4AF37]/40 p-4 sm:p-5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#263F32]/10 pb-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#9E3D28] font-bold block">
                          {c.selectedService}
                        </span>
                        <h4 className="text-lg font-bold font-serif-editorial text-[#162E22]">
                          {selectedServiceMeta?.title[locale]}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="text-xs font-bold text-[#9E3D28] hover:underline"
                      >
                        {c.edit}
                      </button>
                    </div>

                    <div className="border-b border-[#263F32]/10 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] uppercase tracking-wider text-[#9E3D28] font-bold">
                          {c.yourDetails}
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs font-bold text-[#9E3D28] hover:underline"
                        >
                          {c.edit}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {Object.entries(payload.details).map(([k, v]) => (
                          <div key={k}>
                            <span className="text-[#252923]/60 block capitalize">{k}:</span>
                            <span className="font-semibold text-[#162E22]">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] uppercase tracking-wider text-[#9E3D28] font-bold">
                          {c.contactDetails}
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-xs font-bold text-[#9E3D28] hover:underline"
                        >
                          {c.edit}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[#252923]/60 block">{c.name}:</span>
                          <span className="font-semibold text-[#162E22]">{payload.contact.name}</span>
                        </div>
                        <div>
                          <span className="text-[#252923]/60 block">{c.phone}:</span>
                          <span className="font-semibold text-[#162E22]">{payload.contact.phone}</span>
                        </div>
                        {payload.contact.email && (
                          <div>
                            <span className="text-[#252923]/60 block">{c.email}:</span>
                            <span className="font-semibold text-[#162E22]">{payload.contact.email}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-[#252923]/60 block">{c.preferred}:</span>
                          <span className="font-semibold text-[#162E22] capitalize">{payload.contact.preferred}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Bar with Gold Button */}
            <footer className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#263F32]/12 bg-white/95 backdrop-blur-md flex items-center justify-between shrink-0 shadow-[0_-4px_20px_rgba(22,46,34,0.06)] z-20">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((curr) => curr - 1)}
                  className="px-5 py-2.5 rounded-xl border border-[#263F32]/20 hover:border-[#162E22] text-[#162E22] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {c.back}
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#12261C] hover:brightness-105 active:scale-95 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 font-bold text-xs uppercase tracking-wider cursor-pointer border border-[#F5D77F]/60"
                >
                  <span>{c.next}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#12261C] hover:brightness-105 active:scale-95 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 font-bold text-xs uppercase tracking-wider cursor-pointer border border-[#F5D77F]/60 disabled:opacity-50"
                >
                  <span>{status === "submitting" ? c.sending : c.submit}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              )}
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
