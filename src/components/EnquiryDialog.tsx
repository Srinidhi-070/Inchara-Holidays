import React, { useEffect, useId, useRef, useState } from "react";
import { services } from "../content";
import { detailFields, submitEnquiry } from "../lib/enquiry";
import type { EnquiryPayload, Locale, ServiceId } from "../types";
import { ArrowRight, Check, CloseIcon, ServiceIcon } from "./Icons";
import { brandConfig } from "../config/brand";

const emptyContact = {
  name: "",
  phone: "",
  email: "",
  preferred: "" as const,
  notes: "",
  consent: false,
};

const ui = {
  en: {
    eyebrow: "Universal enquiry",
    title: "Let’s shape your journey.",
    intro: "A few thoughtful details help us understand where to begin.",
    steps: ["Service", "Details", "Contact", "Review"],
    choose: "What can we help you with?",
    details: "Tell us a little more.",
    contact: "How may we reach you?",
    review: "Review your enquiry",
    reviewBody: "Check your details before submitting.",
    next: "Continue",
    back: "Back",
    submit: "Submit Enquiry",
    edit: "Edit",
    required: "Please complete this field.",
    chooseRequired: "Choose a service to continue.",
    contactRequired: "Add a valid phone number or email address.",
    preferredRequired: "Add the contact detail for your preferred method.",
    consentRequired: "Please confirm your details are accurate.",
    name: "Your name",
    phone: "Phone number",
    email: "Email address",
    preferred: "Preferred contact",
    chooseMethod: "Choose a method",
    phoneOption: "Phone",
    emailOption: "Email",
    notes: "Anything else we should know? (optional)",
    consent: "I confirm the contact and travel details provided are accurate.",
    demo: "Bespoke itineraries, transparent pricing, zero commercial kickbacks.",
    selectedService: "Service",
    yourDetails: "Journey details",
    contactDetails: "Contact details",
    sending: "Submitting…",
    successEyebrow: "Enquiry Registered",
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
    preferred: "ಆದ್ಯತೆಯ ಸಂಪರ್ಕ",
    chooseMethod: "ವಿಧಾನ ಆಯ್ಕೆಮಾಡಿ",
    phoneOption: "ದೂರವಾಣಿ",
    emailOption: "ಇಮೇಲ್",
    notes: "ನಾವು ತಿಳಿಯಬೇಕಾದ ಬೇರೆ ವಿಷಯ? (ಐಚ್ಛಿಕ)",
    consent: "ನಾನು ನೀಡಿದ ಸಂಪರ್ಕ ಮತ್ತು ಪ್ರಯಾಣ ವಿವರಗಳು ನಿಖರವಾಗಿವೆ ಎಂದು ದೃಢೀಕರಿಸುತ್ತೇನೆ.",
    demo: "ವೈಯಕ್ತಿಕ ಪ್ರವಾಸ ಯೋಜನೆ, ಪಾರದರ್ಶಕ ದರಗಳು ಮತ್ತು ನೈಜ ಮಲೆನಾಡು ಆತಿಥ್ಯ.",
    selectedService: "ಸೇವೆ",
    yourDetails: "ಪ್ರಯಾಣದ ವಿವರಗಳು",
    contactDetails: "ಸಂಪರ್ಕ ವಿವರಗಳು",
    sending: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ…",
    successEyebrow: "ವಿಚಾರಣೆ ದಾಖಲಾಗಿದೆ",
    successTitle: "ನಿಮ್ಮ ಯೋಜನೆ ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
    successBody: "ನಮ್ಮ ತಂಡವು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ 24 ಗಂಟೆಗಳ ಒಳಗೆ ಸೂಕ್ತ ಯೋಜನೆಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
    referenceLabel: "ನಿಮ್ಮ ವಿಚಾರಣೆ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ",
    whatsappBtn: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ತಕ್ಷಣ ಚರ್ಚಿಸಿ",
    another: "ಮತ್ತೊಂದು ವಿಚಾರಣೆ ಆರಂಭಿಸಿ",
    done: "ಮುಚ್ಚಿ",
    close: "ವಿಚಾರಣೆ ಮುಚ್ಚಿ",
    discard: "ನಮೂದಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಅಳಿಸಿ ಮುಚ್ಚಬೇಕೇ?",
    error: "ವಿಚಾರಣೆ ಸಲ್ಲಿಕೆಗೆ ಅಡ್ಡಿಯಾಯಿತು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  },
};

type Props = {
  open: boolean;
  locale: Locale;
  initialService: ServiceId | null;
  initialDestination?: string;
  onClose: () => void;
};

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
    document.body.classList.add("dialog-open");
    window.setTimeout(() => dialogRef.current?.focus(), 0);
    return () => {
      document.body.classList.remove("dialog-open");
      previousFocus.current?.focus();
    };
  }, [open, initialService]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
        ),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!open) return null;

  const activeService = services.find((service) => service.id === payload.service);
  const activeFields = payload.service ? detailFields[payload.service] : [];

  const dirty =
    payload.service !== (initialService ?? "") ||
    Object.values(payload.details).some(Boolean) ||
    Object.entries(payload.contact).some(([key, value]) => key !== "consent" && Boolean(value));

  function requestClose() {
    if (status === "success") {
      reset();
      onClose();
      return;
    }
    if (!dirty) {
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
    if (Object.keys(nextErrors).length) {
      window.setTimeout(
        () => dialogRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      );
      return false;
    }
    return true;
  }

  function next() {
    if (validate()) setStep((current) => Math.min(current + 1, 3));
  }

  async function submit() {
    setStatus("submitting");
    try {
      const res = await submitEnquiry(payload);
      setReferenceNumber(res.referenceNumber);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Namaskara Inchara Holidays! I submitted an enquiry for ${activeService?.title.en || 'travel services'}. My reference number is ${referenceNumber}. Name: ${payload.contact.name}. Looking forward to discussing details!`
  );
  const whatsappUrl = `https://wa.me/${(brandConfig.whatsappRaw || brandConfig.phoneRaw || "919448000000").replace(/\D/g, "")}?text=${whatsappMessage}`;

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && requestClose()}
    >
      <div
        className="enquiry-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        tabIndex={-1}
      >
        <button className="dialog-close" type="button" aria-label={c.close} onClick={requestClose}>
          <CloseIcon />
        </button>

        {status === "success" ? (
          <div className="success-state" tabIndex={0}>
            <div className="success-badge" aria-hidden="true">
              <Check />
            </div>
            <p className="eyebrow">{c.successEyebrow}</p>
            <h3 id={titleId} className={locale === "kn" ? "font-kannada-serif" : ""}>
              {c.successTitle}
            </h3>
            <p className="success-body">{c.successBody}</p>

            {referenceNumber && (
              <div className="my-6 p-4 rounded-xl bg-[#F6F3EA] border border-[#D4AF37]/40 text-center">
                <span className="text-xs uppercase tracking-wider text-[#9E3D28] font-bold block mb-1">
                  {c.referenceLabel}
                </span>
                <span className="font-mono text-lg font-bold text-[#162E22] tracking-wider select-all">
                  {referenceNumber}
                </span>
              </div>
            )}

            <div className="success-actions flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-button w-full"
              >
                {c.whatsappBtn}
                <ArrowRight />
              </a>
              <div className="flex gap-3 justify-center mt-2">
                <button className="quiet-button" type="button" onClick={reset}>
                  {c.another}
                </button>
                <button className="outline-button !text-[#162E22] !border-[#162E22]/30 hover:!bg-[#162E22]/5" type="button" onClick={requestClose}>
                  {c.done}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <header className="dialog-header">
              <p className="eyebrow">{c.eyebrow}</p>
              <h3 id={titleId} className={locale === "kn" ? "font-kannada-serif" : ""}>
                {c.title}
              </h3>
              <p>{c.intro}</p>
              <ol className="stepper" aria-label="Steps">
                {c.steps.map((label, index) => {
                  const stateClass =
                    index === step ? "is-current" : index < step ? "is-complete" : "";
                  return (
                    <li key={label} className={`step ${stateClass}`}>
                      <button
                        type="button"
                        disabled={index > step && !payload.service}
                        onClick={() => index < step && setStep(index)}
                      >
                        <span className="step__number">
                          {index < step ? <Check /> : `0${index + 1}`}
                        </span>
                        <span className="step__label">{label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </header>

            <div className="dialog-body">
              {step === 0 && (
                <div className="service-choices">
                  <h4>{c.choose}</h4>
                  {errors.service && <p className="field-error">{errors.service}</p>}
                  <div className="service-choices__grid" role="radiogroup" aria-label={c.choose}>
                    {services.map((service) => {
                      const selected = payload.service === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          className={`choice-card ${selected ? "is-selected" : ""}`}
                          onClick={() => {
                            setPayload((curr) => ({
                              ...curr,
                              service: service.id,
                              details: curr.service === service.id ? curr.details : {},
                            }));
                            setErrors((curr) => ({ ...curr, service: "" }));
                          }}
                        >
                          <div className="choice-card__icon">
                            <ServiceIcon id={service.id} />
                          </div>
                          <div>
                            <h5>{service.title[locale]}</h5>
                            <p>{service.description[locale]}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="field-group">
                  <h4>{c.details}</h4>
                  <div className="field-grid">
                    {activeFields.map((field) => {
                      const error = errors[field.key];
                      const errorId = `${field.key}-error`;
                      return (
                        <Field
                          key={field.key}
                          label={field.label[locale]}
                          error={error}
                          errorId={errorId}
                        >
                          {field.type === "select" ? (
                            <select
                              value={payload.details[field.key] ?? ""}
                              aria-invalid={Boolean(error)}
                              aria-describedby={error ? errorId : undefined}
                              onChange={(e) =>
                                setPayload((curr) => ({
                                  ...curr,
                                  details: { ...curr.details, [field.key]: e.target.value },
                                }))
                              }
                            >
                              <option value="">{c.chooseMethod}</option>
                              {field.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label[locale]}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type ?? "text"}
                              value={payload.details[field.key] ?? ""}
                              placeholder={field.placeholder?.[locale]}
                              aria-invalid={Boolean(error)}
                              aria-describedby={error ? errorId : undefined}
                              onChange={(e) =>
                                setPayload((curr) => ({
                                  ...curr,
                                  details: { ...curr.details, [field.key]: e.target.value },
                                }))
                              }
                            />
                          )}
                        </Field>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="field-group">
                  <h4>{c.contact}</h4>
                  <div className="field-grid">
                    <Field label={c.name} error={errors.name} errorId="name-error">
                      <input
                        type="text"
                        value={payload.contact.name}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: { ...curr.contact, name: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <Field label={c.phone} error={errors.phone || errors.contact} errorId="phone-error">
                      <input
                        type="tel"
                        value={payload.contact.phone}
                        aria-invalid={Boolean(errors.phone || errors.contact)}
                        aria-describedby={errors.phone || errors.contact ? "phone-error" : undefined}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: { ...curr.contact, phone: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <Field label={c.email} error={errors.email || errors.contact} errorId="email-error">
                      <input
                        type="email"
                        value={payload.contact.email}
                        aria-invalid={Boolean(errors.email || errors.contact)}
                        aria-describedby={errors.email || errors.contact ? "email-error" : undefined}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: { ...curr.contact, email: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <Field label={c.preferred} error={errors.preferred} errorId="preferred-error">
                      <select
                        value={payload.contact.preferred}
                        aria-invalid={Boolean(errors.preferred)}
                        aria-describedby={errors.preferred ? "preferred-error" : undefined}
                        onChange={(e) =>
                          setPayload((curr) => ({
                            ...curr,
                            contact: {
                              ...curr.contact,
                              preferred: e.target.value as "phone" | "email" | "",
                            },
                          }))
                        }
                      >
                        <option value="">{c.chooseMethod}</option>
                        <option value="phone">{c.phoneOption}</option>
                        <option value="email">{c.emailOption}</option>
                      </select>
                    </Field>
                    <div className="field--wide">
                      <Field label={c.notes}>
                        <textarea
                          rows={3}
                          value={payload.contact.notes}
                          onChange={(e) =>
                            setPayload((curr) => ({
                              ...curr,
                              contact: { ...curr.contact, notes: e.target.value },
                            }))
                          }
                        />
                      </Field>
                    </div>
                  </div>
                  <label className="consent-checkbox">
                    <input
                      type="checkbox"
                      checked={payload.contact.consent}
                      aria-invalid={Boolean(errors.consent)}
                      onChange={(e) =>
                        setPayload((curr) => ({
                          ...curr,
                          contact: { ...curr.contact, consent: e.target.checked },
                        }))
                      }
                    />
                    <span>{c.consent}</span>
                  </label>
                  {errors.consent && <p className="field-error">{errors.consent}</p>}
                </div>
              )}

              {step === 3 && (
                <div className="review-step">
                  <h4>{c.review}</h4>
                  <p>{c.reviewBody}</p>
                  <ReviewBlock label={c.selectedService} onEdit={() => setStep(0)} edit={c.edit}>
                    {activeService?.title[locale]}
                  </ReviewBlock>
                  <ReviewBlock label={c.yourDetails} onEdit={() => setStep(1)} edit={c.edit}>
                    <dl>
                      {activeFields.map((field) => (
                        <div key={field.key}>
                          <dt>{field.label[locale]}</dt>
                          <dd>{displayDetailValue(field, payload.details[field.key], locale)}</dd>
                        </div>
                      ))}
                    </dl>
                  </ReviewBlock>
                  <ReviewBlock label={c.contactDetails} onEdit={() => setStep(2)} edit={c.edit}>
                    {payload.contact.name}
                    <br />
                    {payload.contact.phone || payload.contact.email}
                  </ReviewBlock>
                  <p className="demo-notice">{c.demo}</p>
                  {status === "error" && <p className="error-banner">{c.error}</p>}
                </div>
              )}
            </div>

            <footer className="dialog-footer">
              {step > 0 ? (
                <button
                  className="quiet-button"
                  type="button"
                  onClick={() => setStep((current) => current - 1)}
                >
                  {c.back}
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button className="gold-button" type="button" onClick={next}>
                  {c.next}
                  <ArrowRight />
                </button>
              ) : (
                <button
                  className="gold-button"
                  type="button"
                  disabled={status === "submitting"}
                  onClick={submit}
                >
                  {status === "submitting" ? c.sending : c.submit}
                  <ArrowRight />
                </button>
              )}
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  errorId,
  children,
}: {
  label: string;
  error?: string;
  errorId?: string;
  children: React.ReactElement;
}) {
  return (
    <label>
      <span>{label}</span>
      {children}
      {error && (
        <small className="field-error" id={errorId}>
          {error}
        </small>
      )}
    </label>
  );
}

function displayDetailValue(
  field: (typeof detailFields)[ServiceId][number],
  value: string | undefined,
  locale: Locale,
) {
  if (!value) return "—";
  return field.options?.find((option) => option.value === value)?.label[locale] ?? value;
}

function ReviewBlock({
  label,
  edit,
  onEdit,
  children,
}: {
  label: string;
  edit: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="review-block">
      <header>
        <h4>{label}</h4>
        <button type="button" onClick={onEdit}>
          {edit}
        </button>
      </header>
      <div>{children}</div>
    </section>
  );
}
