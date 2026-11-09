import { useEffect, useId, useRef, useState } from "react";
import { services } from "../content";
import { detailFields, submitEnquiry } from "../lib/enquiry";
import type { EnquiryPayload, Locale, ServiceId } from "../types";
import { ArrowRight, Check, CloseIcon, ServiceIcon } from "./Icons";

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
    reviewBody: "Check your details before completing this preview.",
    next: "Continue",
    back: "Back",
    submit: "Complete preview",
    edit: "Edit",
    required: "Please complete this field.",
    chooseRequired: "Choose a service to continue.",
    contactRequired: "Add a valid phone number or email address.",
    preferredRequired: "Add the contact detail for your preferred method.",
    consentRequired: "Please confirm you understand this is a local preview.",
    name: "Your name",
    phone: "Phone number",
    email: "Email address",
    preferred: "Preferred contact",
    chooseMethod: "Choose a method",
    phoneOption: "Phone",
    emailOption: "Email",
    notes: "Anything else we should know? (optional)",
    consent: "I understand this preview does not send or save my information.",
    demo: "Preview only — your details will not be transmitted or stored.",
    selectedService: "Service",
    yourDetails: "Journey details",
    contactDetails: "Contact details",
    sending: "Completing…",
    successEyebrow: "Preview complete",
    successTitle: "Thank you for sharing your plans.",
    successBody:
      "This interaction is ready for review. No enquiry was sent and none of your information was saved in this preview.",
    another: "Start another enquiry",
    done: "Close",
    close: "Close enquiry",
    discard: "Discard the information entered and close?",
    error: "Something interrupted the preview. Please try again.",
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
    reviewBody: "ಪೂರ್ವವೀಕ್ಷಣೆ ಪೂರ್ಣಗೊಳಿಸುವ ಮೊದಲು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    next: "ಮುಂದುವರಿಸಿ",
    back: "ಹಿಂದೆ",
    submit: "ಪೂರ್ವವೀಕ್ಷಣೆ ಪೂರ್ಣಗೊಳಿಸಿ",
    edit: "ತಿದ್ದುಪಡಿ",
    required: "ದಯವಿಟ್ಟು ಈ ವಿವರವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
    chooseRequired: "ಮುಂದುವರಿಸಲು ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    contactRequired: "ಸರಿಯಾದ ದೂರವಾಣಿ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ಸೇರಿಸಿ.",
    preferredRequired: "ನಿಮ್ಮ ಆದ್ಯತೆಯ ವಿಧಾನಕ್ಕೆ ಸಂಪರ್ಕ ವಿವರ ಸೇರಿಸಿ.",
    consentRequired: "ಇದು ಸ್ಥಳೀಯ ಪೂರ್ವವೀಕ್ಷಣೆ ಎಂದು ದೃಢೀಕರಿಸಿ.",
    name: "ನಿಮ್ಮ ಹೆಸರು",
    phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    email: "ಇಮೇಲ್ ವಿಳಾಸ",
    preferred: "ಆದ್ಯತೆಯ ಸಂಪರ್ಕ",
    chooseMethod: "ವಿಧಾನ ಆಯ್ಕೆಮಾಡಿ",
    phoneOption: "ದೂರವಾಣಿ",
    emailOption: "ಇಮೇಲ್",
    notes: "ನಾವು ತಿಳಿಯಬೇಕಾದ ಬೇರೆ ವಿಷಯ? (ಐಚ್ಛಿಕ)",
    consent: "ಈ ಪೂರ್ವವೀಕ್ಷಣೆ ನನ್ನ ಮಾಹಿತಿಯನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ ಅಥವಾ ಉಳಿಸುವುದಿಲ್ಲ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ.",
    demo: "ಪೂರ್ವವೀಕ್ಷಣೆ ಮಾತ್ರ — ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ ಅಥವಾ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.",
    selectedService: "ಸೇವೆ",
    yourDetails: "ಪ್ರಯಾಣದ ವಿವರಗಳು",
    contactDetails: "ಸಂಪರ್ಕ ವಿವರಗಳು",
    sending: "ಪೂರ್ಣಗೊಳ್ಳುತ್ತಿದೆ…",
    successEyebrow: "ಪೂರ್ವವೀಕ್ಷಣೆ ಪೂರ್ಣ",
    successTitle: "ನಿಮ್ಮ ಯೋಜನೆ ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
    successBody: "ಈ ಅನುಭವ ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧವಾಗಿದೆ. ಈ ಪೂರ್ವವೀಕ್ಷಣೆಯಲ್ಲಿ ಯಾವುದೇ ವಿಚಾರಣೆ ಕಳುಹಿಸಿಲ್ಲ ಮತ್ತು ಮಾಹಿತಿ ಉಳಿಸಿಲ್ಲ.",
    another: "ಮತ್ತೊಂದು ವಿಚಾರಣೆ ಆರಂಭಿಸಿ",
    done: "ಮುಚ್ಚಿ",
    close: "ವಿಚಾರಣೆ ಮುಚ್ಚಿ",
    discard: "ನಮೂದಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಅಳಿಸಿ ಮುಚ್ಚಬೇಕೇ?",
    error: "ಪೂರ್ವವೀಕ್ಷಣೆಗೆ ಅಡ್ಡಿಯಾಯಿತು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  },
};

type Props = {
  open: boolean;
  locale: Locale;
  initialService: ServiceId | null;
  onClose: () => void;
};

export function EnquiryDialog({ open, locale, initialService, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState<EnquiryPayload>({
    service: "",
    details: {},
    contact: emptyContact,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"form" | "submitting" | "success" | "error">("form");
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
      details: initialService && initialService !== current.service ? {} : current.details,
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
      await submitEnquiry(payload);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

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
          <div className="success-state">
            <div className="success-mark">
              <Check />
            </div>
            <p className="eyebrow">{c.successEyebrow}</p>
            <h2 id={titleId}>{c.successTitle}</h2>
            <p>{c.successBody}</p>
            <div className="success-actions">
              <button className="gold-button" type="button" onClick={reset}>
                {c.another}
                <ArrowRight />
              </button>
              <button
                className="quiet-button"
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                {c.done}
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="dialog-header">
              <p className="eyebrow">{c.eyebrow}</p>
              <h2 id={titleId}>{c.title}</h2>
              <p>{c.intro}</p>
            </header>
            <ol className="stepper" aria-label={`${step + 1} / 4`}>
              {c.steps.map((label, index) => (
                <li
                  key={label}
                  className={index === step ? "is-active" : index < step ? "is-complete" : ""}
                >
                  <button
                    type="button"
                    disabled={index > step}
                    onClick={() => index < step && setStep(index)}
                  >
                    <span>{index < step ? <Check /> : index + 1}</span>
                    <small>{label}</small>
                  </button>
                </li>
              ))}
            </ol>

            <div className="dialog-body">
              {step === 0 && (
                <fieldset className="service-choices">
                  <legend>{c.choose}</legend>
                  <div className="service-choices__grid">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={payload.service === service.id ? "is-selected" : ""}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={payload.service === service.id}
                          aria-invalid={Boolean(errors.service)}
                          aria-describedby={errors.service ? "service-error" : undefined}
                          onChange={() => {
                            setPayload((current) => ({
                              ...current,
                              service: service.id,
                              details: {},
                            }));
                            setErrors({});
                          }}
                        />
                        <ServiceIcon id={service.id} />
                        <span>{service.shortTitle[locale]}</span>
                        <i>
                          <Check />
                        </i>
                      </label>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="field-error" id="service-error">
                      {errors.service}
                    </p>
                  )}
                </fieldset>
              )}

              {step === 1 && payload.service && (
                <fieldset>
                  <legend>{c.details}</legend>
                  <div className="field-grid">
                    {detailFields[payload.service].map((field) => (
                      <label
                        className={field.key === "dietary" ? "field--wide" : ""}
                        key={field.key}
                      >
                        <span>{field.label[locale]}</span>
                        {field.type === "select" ? (
                          <select
                            value={payload.details[field.key] ?? ""}
                            aria-invalid={Boolean(errors[field.key])}
                            aria-describedby={
                              errors[field.key] ? `detail-${field.key}-error` : undefined
                            }
                            onChange={(event) =>
                              setPayload((current) => ({
                                ...current,
                                details: { ...current.details, [field.key]: event.target.value },
                              }))
                            }
                          >
                            <option value="">—</option>
                            {field.options?.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label[locale]}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type ?? "text"}
                            min={field.type === "number" ? 1 : undefined}
                            value={payload.details[field.key] ?? ""}
                            placeholder={field.placeholder?.[locale]}
                            aria-invalid={Boolean(errors[field.key])}
                            aria-describedby={
                              errors[field.key] ? `detail-${field.key}-error` : undefined
                            }
                            onChange={(event) =>
                              setPayload((current) => ({
                                ...current,
                                details: { ...current.details, [field.key]: event.target.value },
                              }))
                            }
                          />
                        )}
                        {errors[field.key] && (
                          <small className="field-error" id={`detail-${field.key}-error`}>
                            {errors[field.key]}
                          </small>
                        )}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend>{c.contact}</legend>
                  {errors.contact && (
                    <p className="error-banner" id="contact-error">
                      {errors.contact}
                    </p>
                  )}
                  <div className="field-grid">
                    <Field label={c.name} error={errors.name} errorId="name-error">
                      <input
                        autoComplete="name"
                        value={payload.contact.name}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        onChange={(e) =>
                          setPayload((current) => ({
                            ...current,
                            contact: { ...current.contact, name: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <Field label={c.preferred}>
                      <select
                        value={payload.contact.preferred}
                        onChange={(e) =>
                          setPayload((current) => ({
                            ...current,
                            contact: {
                              ...current.contact,
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
                    <Field label={c.phone} error={errors.phone} errorId="phone-error">
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={payload.contact.phone}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone
                            ? "phone-error"
                            : errors.contact
                              ? "contact-error"
                              : undefined
                        }
                        onChange={(e) =>
                          setPayload((current) => ({
                            ...current,
                            contact: { ...current.contact, phone: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <Field label={c.email} error={errors.email} errorId="email-error">
                      <input
                        type="email"
                        autoComplete="email"
                        value={payload.contact.email}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email
                            ? "email-error"
                            : errors.contact
                              ? "contact-error"
                              : undefined
                        }
                        onChange={(e) =>
                          setPayload((current) => ({
                            ...current,
                            contact: { ...current.contact, email: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <label className="field--wide">
                      <span>{c.notes}</span>
                      <textarea
                        rows={3}
                        value={payload.contact.notes}
                        onChange={(e) =>
                          setPayload((current) => ({
                            ...current,
                            contact: { ...current.contact, notes: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <label className="consent field--wide">
                      <input
                        type="checkbox"
                        checked={payload.contact.consent}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        onChange={(e) =>
                          setPayload((current) => ({
                            ...current,
                            contact: { ...current.contact, consent: e.target.checked },
                          }))
                        }
                      />
                      <span>{c.consent}</span>
                    </label>
                    {errors.consent && (
                      <small className="field-error field--wide" id="consent-error">
                        {errors.consent}
                      </small>
                    )}
                  </div>
                </fieldset>
              )}

              {step === 3 && payload.service && (
                <div className="review">
                  <h3>{c.review}</h3>
                  <p>{c.reviewBody}</p>
                  <ReviewBlock label={c.selectedService} onEdit={() => setStep(0)} edit={c.edit}>
                    {services.find((service) => service.id === payload.service)?.title[locale]}
                  </ReviewBlock>
                  <ReviewBlock label={c.yourDetails} onEdit={() => setStep(1)} edit={c.edit}>
                    <dl>
                      {detailFields[payload.service].map((field) => (
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
