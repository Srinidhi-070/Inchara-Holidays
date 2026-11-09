---
name: backend-engineering
description: >-
  Prepares architectural blueprints for Supabase PostgreSQL, Row Level Security, enquiry persistence,
  WhatsApp Business Cloud API, and staff authentication for Inchara Holidays. Contains a STRICT GATE
  prohibiting implementation without explicit owner approval.
---

# Inchara Holidays — Backend & Supabase Engineering

> [!CAUTION]
> ### STRICT MILESTONE IMPLEMENTATION GATE
> This skill is an architectural reference prepared for a **future milestone**.
> Agents **MUST NOT** initiate backend implementation, create Supabase projects, modify database schemas, add Express API routes, introduce authentication guards, install backend dependencies, or build admin panels without **explicit, written owner approval**.
> Current enquiry persistence uses verified client-side local storage with one-click pre-composed WhatsApp routing.

---

## When to Use This Skill
- Preparing or reviewing future database schemas, ER diagrams, or Supabase migration scripts.
- Designing secure Row Level Security (RLS) policies for customer enquiries and package management.
- Reviewing backend architecture requirements when explicitly authorized by the project owner.

---

## 1. Target Future Database Architecture (Supabase / PostgreSQL)

When authorized, the backend architecture will leverage Supabase PostgreSQL with the following core relational schema:

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│           inquiries             │       │            packages             │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ id: uuid (PK)                   │       │ id: uuid (PK)                   │
│ reference_number: text (UNIQUE) │       │ slug: text (UNIQUE)             │
│ service_category: text          │       │ title_en: text                  │
│ details: jsonb                  │       │ title_kn: text                  │
│ customer_name: text             │       │ duration_days: int              │
│ customer_phone: text            │       │ duration_nights: int            │
│ customer_email: text            │       │ category: text                  │
│ status: text (enum)             │       │ itinerary: jsonb                │
│ assigned_agent: text            │       │ inclusions: text[]              │
│ created_at: timestamptz         │       │ exclusions: text[]              │
│ updated_at: timestamptz         │       │ is_active: boolean              │
└─────────────────────────────────┘       └─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│        inquiry_notes            │       │         manual_payments         │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ id: uuid (PK)                   │       │ id: uuid (PK)                   │
│ inquiry_id: uuid (FK)           │       │ inquiry_id: uuid (FK)           │
│ author: text                    │       │ amount: numeric(10,2)           │
│ note: text                      │       │ payment_mode: text (UPI/NEFT)   │
│ created_at: timestamptz         │       │ reference_number: text          │
└─────────────────────────────────┘       │ verified_by: text               │
                                          │ verified_at: timestamptz        │
                                          └─────────────────────────────────┘
```

---

## 2. Row Level Security (RLS) Strategy

All tables must enforce strict Row Level Security:

1. **`inquiries` Table**:
   - **Insert (Public / Anonymous)**: Allow unauthenticated visitors to insert enquiries via the website wizard:
     ```sql
     CREATE POLICY "Public can submit enquiries" ON inquiries
     FOR INSERT WITH CHECK (true);
     ```
   - **Select / Update / Delete (Staff Only)**: Strictly restricted to authenticated staff roles:
     ```sql
     CREATE POLICY "Staff can view enquiries" ON inquiries
     FOR SELECT USING (auth.role() = 'authenticated');
     ```
2. **`packages` Table**:
   - **Select (Public)**: Public visitors can view all packages where `is_active = true`.
   - **Insert / Update / Delete (Admin Only)**: Restricted to authenticated admins.

---

## 3. Server-Side Validation & Sanitization

- Even with client-side Zod validation, all backend endpoints or Edge Functions must re-validate incoming payloads using Zod schemas.
- Strip all HTML/script tags from free-text notes to prevent Stored XSS.
- Rate-limit submission endpoints by IP address (maximum 5 submissions per hour per IP) to prevent spam flooding.

---

## 4. Integration Blueprints

### A. WhatsApp Business Cloud API
- Outgoing Webhook on enquiry creation triggers a structured template notification to the Inchara Holidays operations desk (`+91 94482 17345`).
- Customer receives an instant automated confirmation message containing their Reference ID (`ICH-2026-XXXX`).

### B. Transactional Email
- Integration with Resend or SendGrid to deliver PDF quotation briefs and detailed itineraries to customers who provide valid email addresses.

### C. Manual Payment Tracking (No Online Gateway)
- System supports manual ledger tracking for bank transfers, RTGS, NEFT, and verified UPI transactions with receipt generation, avoiding unnecessary payment gateway overhead and transaction surcharges.

---

## 5. Gate Verification Checklist

Before ANY backend code is committed or executed:
- [ ] Has the project owner explicitly instructed backend implementation?
- [ ] Is the frontend recovery and UI reconciliation declared complete in `REPORT.md`?
- [ ] Are Supabase credentials provided via secure environment variables (`.env`), never hardcoded?
- [ ] Are all RLS policies drafted and peer-reviewed for data leakage prevention?
