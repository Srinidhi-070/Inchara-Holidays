---
name: security-privacy
description: >-
  Enforces application security, secret management, client/server trust boundaries,
  spam mitigation, and privacy compliance (DPDP/GDPR) for Inchara Holidays. Use when handling
  credentials, form security, data collection, or reviewing API integrations.
---

# Inchara Holidays — Security & Privacy Engineering

This skill defines the security boundaries, data protection rules, secret hygiene, and privacy standards for the Inchara Holidays digital platform.

## When to Use This Skill
- Reviewing form input collection, validation schemas, and contact storage.
- Managing API keys, credentials, tokens, or environment variables (`.env`).
- Designing or auditing authentication, authorization, or role-based access.
- Implementing spam protection, CAPTCHA/Turnstile, or rate limiting.
- Auditing client bundles and reports to guarantee zero credential leakage.

---

## 1. Absolute Security Boundaries & Guardrails

### A. Secret Hygiene & Zero-Leakage Rule
- **Never Hardcode Secrets**: Database connection strings, service role keys, SMTP credentials, or API tokens must NEVER be committed to Git or hardcoded in source files.
- **Environment Separation**:
  - Client-safe variables must be prefixed with `VITE_` (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
  - Sensitive secrets (e.g., `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) must NEVER have the `VITE_` prefix and must never be imported in client-side code.
- **Report & Log Sanitization**: Never print raw keys, hashed passwords, or private environment variables in `REPORT.md`, conversation transcripts, or console logs.

### B. Client-Side vs Server-Side Trust Boundaries
- Client-side validation (HTML5 attributes, Zod in React) is strictly a User Experience (UX) convenience to assist visitors.
- **Never treat frontend validation as security**. All backend endpoints, Edge Functions, or webhooks must perform authoritative, independent validation and sanitization.

### C. Visa & Identity Data Privacy Guardrail (CRITICAL)
- **Prohibited Public Collection**: The public visa and passport enquiry flow (`EnquiryDialog`) **MUST NOT** request or collect:
  - Passport numbers.
  - Aadhaar / National ID numbers.
  - Uploaded scans or photos of government identity documents.
  - Credit card or bank account credentials.
- **Permitted Public Collection**: Target destination country, travel purpose (Tourism, Academic, Business), approximate travel dates, group size, and primary contact information (Name, Phone, Email).
- Sensitive identity documents must only be exchanged via verified, secure, encrypted channels (in-person office consultation or authenticated customer portals) in compliance with the Digital Personal Data Protection (DPDP) Act and international privacy laws.

---

## 2. Spam & Abuse Mitigation

To protect the enquiry system from automated bots, form spam, and DoS attacks:

1. **Honeypot Form Fields**:
   - Include hidden form inputs invisible to human users (`tabIndex={-1}`, `autoComplete="off"`, `className="sr-only"`).
   - If the honeypot field contains any value upon submission, silently discard the enquiry.
2. **Client-Side Throttling**:
   - Debounce submit buttons and prevent rapid duplicate submissions with disabled loading states.
3. **Turnstile / reCAPTCHA Readiness**:
   - Architect forms to allow effortless insertion of Cloudflare Turnstile or Google reCAPTCHA tokens before transmission to backend endpoints.

---

## 3. Storage & Data Retention Rules

1. **LocalStorage Caution**:
   - In the frontend recovery phase, enquiries cached in browser `localStorage` are strictly stored on the client's own machine for reference continuity.
   - Do not store sensitive personal information or session secrets in `localStorage`.
2. **Data Minimization**:
   - Collect only the minimum information necessary to initiate a travel consultation.

---

## 4. Security Audit & Pre-Deployment Checklist

Before approving any code for deployment:
- [ ] No `.env`, `.env.local`, or `.pem` files are tracked in Git (`git status` clean).
- [ ] No private keys or service role secrets exist in client bundles (`dist/`).
- [ ] Form fields are sanitized against XSS (cross-site scripting) injection.
- [ ] No passport numbers, national IDs, or document scans are collected on public forms.
- [ ] External links use `rel="noopener noreferrer"` to prevent reverse tabnabbing.
- [ ] All inputs have strict length limits to prevent payload flooding.
