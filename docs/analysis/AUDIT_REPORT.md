# INCHARA HOLIDAYS — COMPREHENSIVE TECHNICAL AUDIT
## Phase 1: Discovery, Assessment & Production Readiness Report

**Repository:** `https://github.com/Srinidhi-070/Inchara-Holidays`  
**Live Deployment:** `https://inchara-holidays.vercel.app`  
**Audit Date:** November 7, 2026  
**Auditor Roles:** Senior Software Architect, Full-Stack Engineer, UI/UX Auditor, DevOps Engineer, Application Security Reviewer  
**Audit Scope:** Non-destructive, evidence-based discovery across codebase, frontend, backend, security, hosting, and data infrastructure.

---

## 1. Executive Summary

**Inchara Holidays (ಇಂಚರ ಹಾಲಿಡೇಸ್)** is a South Indian heritage-focused travel, logistics, and catering enterprise based in Karnataka. The web application is built as a single-page application (SPA) using React 19, TypeScript, and Vite 8, styled with Tailwind CSS v4 and a bespoke CSS architecture reflecting Karnataka cultural aesthetics (Mysore gold `#D4AF37`, forest green `#162E22`, terracotta `#9E3D28`, and ivory `#FBF8F1`).

### Primary Verdict:
The application possesses **exceptional visual polish, cultural authenticity, responsive fidelity, and rich bilingual (Kannada/English) content**. The design language, typography, and interactive components are aesthetically superior to standard travel portals.

However, behind the polished user interface lies **substantial architectural fragility, security vulnerabilities, and functional incompleteness**:
1. **Critical Security Vulnerabilities:** Plaintext administrative credentials (`admin@incharaholidays.com` / `Inchara@2026`) are hardcoded and pre-filled in the frontend admin modal, permitting any public visitor to access the staff portal and view customer submissions. The serverless admin API checks for an `Authorization` header presence without validating cryptographic signatures or JWT expiration.
2. **Ephemeral / Client-Only Data Storage:** In production, Supabase PostgreSQL is not connected via environment variables. Customer enquiries submitted via the Universal Enquiry Modal fall back to ephemeral serverless memory (which terminates immediately) and client-side browser `localStorage`. A business owner cannot see leads submitted from customer devices.
3. **Silent Data Loss in Secondary Modals:** The `ContactModal` performs validation and displays a success message, but completely discards the submitted form data without saving or dispatching it anywhere.
4. **Dead Code & Massive Redundancy:** Over 120 KB of modal components (`TripPlannerModal`, `SchoolTripModal`, `CorporateEventModal`, `CateringModal`) and unmounted section components (`ExperiencesSection`, `OurStory`, `PlannerTeaser`, `SignatureJourney`) are compiled into the build chunks but are completely unreachable from UI triggers. An entire secondary duplicate project folder (`UI DESIGN/`, 77+ files) and 10+ MB of uncompressed raw mockups reside in the repository root.
5. **Placeholder Business Credentials:** Default phone numbers (`+91 94480 00000`), WhatsApp endpoints, email addresses (`hello@incharaholidays.com`), and physical addresses are placeholders. Without production environment variables configured, live customer WhatsApp clicks connect to an inactive number.

---

## 2. Verified Technology Stack

| Layer | Declared / Detected Technology | Version | Verification Evidence | Operational Status |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime / Language** | TypeScript / Node.js | TS 7.0.2 / 5.x | `package.json`, `tsconfig.json` | Verified Functional |
| **Frontend Framework** | React | `19.0.1` | `package.json`, `src/main.tsx` | Verified Functional |
| **DOM Renderer** | React DOM | `19.0.1` | `package.json`, `src/App.tsx` | Verified Functional |
| **Build Tool / Bundler**| Vite (with Rolldown engine) | `8.3.0` (CLI 8.3.4) | `vite.config.ts`, `package.json` | Verified Functional (build time: ~610ms) |
| **Styling Framework** | Tailwind CSS v4 + PostCSS | `^4.3.3` | `@tailwindcss/vite` in `vite.config.ts` | Verified Functional |
| **Custom Styling** | Handcrafted CSS (`src/index.css`) | 2,233 lines / 62.9 KB | `src/index.css` | Verified Functional (contains legacy bloat) |
| **Animation Library** | Framer Motion | `^14.1.0` | `package.json`, `src/components/*` | Verified Functional |
| **Iconography** | Lucide React + Custom SVG | `^0.546.0` | `src/components/SouthIndianMotifs.tsx` | Verified Functional |
| **Validation** | Zod | `^4.6.7` | `src/utils/validation.ts` | Verified Functional |
| **Serverless API** | Vercel Serverless Functions | Node.js (ESM) | `api/*.ts`, `vercel.json` | Partially Functional (unconfigured DB/keys) |
| **Database Client** | `@supabase/supabase-js` | `^2.118.0` | `api/_shared/supabase.ts` | **Unconfigured in Production** |
| **Transactional Email** | Resend API (via native `fetch`) | HTTP REST | `api/_shared/notifications.ts` | **Unconfigured** (`RESEND_API_KEY` missing) |
| **WhatsApp API** | Meta WhatsApp Cloud API | Graph API v21.0 | `api/_shared/notifications.ts` | **Unconfigured** (`WHATSAPP_API_TOKEN` missing) |
| **Hosting Platform** | Vercel | Production | `vercel.json`, `https://inchara-holidays.vercel.app` | Verified Live |
| **Dead Dependency** | `@google/genai` | `^2.4.0` | `package.json` | **Unused** (0 imports in codebase) |
| **Dead Dependency** | `express` & `@types/express` | `^4.21.2` | `package.json` | **Unused** (introduces High CVE in `body-parser`) |
| **Dead Dependency** | `dotenv` | `^17.2.3` | `package.json` | **Unused** (handled natively by Vite & Vercel) |

---

## 3. Repository Architecture & Structure

### 3.1 Directory Tree
```
├── api/                            # Vercel Serverless Function Endpoints
│   ├── _shared/
│   │   ├── notifications.ts        # Resend & WhatsApp dispatch logic
│   │   └── supabase.ts             # Supabase client singleton
│   ├── admin/
│   │   ├── inquiries.ts            # GET/PATCH inquiries endpoint
│   │   ├── login.ts                # Staff authentication endpoint
│   │   └── stats.ts                # Dashboard metrics aggregation
│   ├── inquire.ts                  # Public POST enquiry endpoint
│   └── services.ts                 # Service catalog endpoint
├── public/                         # Public static assets
│   ├── favicon.svg                 # Brand mark icon
│   └── images/                     # Optimized images & partner logos
│       ├── brand/                  # Official emblem
│       └── partners/               # KTF, IATTE, ABTO, UTEN trimmed logos
├── src/                            # Application source
│   ├── assets/                     # Empty directory (dead)
│   ├── components/                 # React UI components (30 files)
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx  # Staff management portal modal
│   │   ├── ... (29 modal, section & motif components)
│   ├── config/
│   │   └── brand.ts                # Central brand credentials & contacts
│   ├── data/                       # Static data repositories (6 files)
│   │   ├── community.ts            # Community initiatives
│   │   ├── culturalEtiquette.ts    # Cultural guidelines
│   │   ├── destinations.ts         # Destination catalog
│   │   ├── experiences.ts          # Experience packages (dead code)
│   │   ├── packages.ts             # Curated travel packages
│   │   ├── servicesData.ts         # 6 core service categories & sub-services
│   │   └── translations.ts         # English & Kannada dictionaries
│   ├── services/                   # Frontend API & Storage abstraction
│   │   ├── adminService.ts         # Admin auth, inquiries fetch, CSV export
│   │   └── inquiryService.ts       # Inquiry submission, fallback storage
│   ├── types/                      # TypeScript definitions
│   │   ├── index.ts                # Core domain types (Language, Concept, etc.)
│   │   └── inquiry.ts              # Inquiry records, statuses, payloads
│   ├── utils/                      # Helper utilities
│   │   ├── smoothScroll.ts         # Section anchor scroll calculation
│   │   └── validation.ts           # Zod schema definitions
│   ├── App.tsx                     # Master component & state container
│   ├── index.css                   # Global stylesheets (2,233 lines)
│   └── main.tsx                    # React root mount
├── supabase/                       # Database infrastructure definitions
│   ├── migrations/
│   │   └── 01_initial_schema.sql   # PostgreSQL tables, indexes, RLS policies
│   └── seed.sql                    # Initial seed data for services & admin
├── logo/                           # Raw uncompressed marketing concepts (>10 MB) [REDUNDANT]
├── tieup logos/                    # Raw uncompressed affiliate downloads [REDUNDANT]
├── UI DESIGN/                      # Secondary duplicate Figma workspace [REDUNDANT]
├── index.html                      # HTML entry with Google Fonts
├── package.json                    # Project metadata & dependencies
├── tsconfig.json                   # TypeScript compiler configuration
├── vercel.json                     # Vercel deployment & rewrite config
└── vite.config.ts                  # Vite bundler configuration
```

### 3.2 Dead, Duplicated & Redundant Files

| Path | Size | Category | Impact & Assessment |
| :--- | :--- | :--- | :--- |
| `UI DESIGN/` | ~35 MB (77+ files) | Complete Duplicate Project | Entire second repository with its own `package.json`, `vite.config.ts`, `pnpm-lock.yaml`, and `.figma/`. Never referenced by the root app. Bloats git clones. |
| `logo/` | 10.0 MB (7 files) | Raw Mockup Images | Large PNG concept boards (`INCHARA Luxury Travel Heritage Logo.png`, etc.) committed in root. Never served to visitors. |
| `tieup logos/` | ~400 KB (5 files) | Duplicate Assets | Raw downloads (`images (1).jpg`, `images.jpg`, `LOGO-ABTO.png`) whose trimmed, optimized counterparts already exist in `public/images/partners/`. |
| `src/assets/` | 0 KB | Empty Directory | Leftover scaffold directory. |
| `src/components/ExperiencesSection.tsx` | 21.9 KB | Dead Code Component | Replaced by `DestinationDiscovery` & `PackagesSection`. Unmounted in `App.tsx` and never imported anywhere. |
| `src/components/OurStory.tsx` | 4.3 KB | Dead Code Component | Unmounted in `App.tsx` and never imported. |
| `src/components/PlannerTeaser.tsx` | 4.6 KB | Dead Code Component | Unmounted in `App.tsx` and never imported. |
| `src/components/SignatureJourney.tsx` | 4.5 KB | Dead Code Component | Unmounted in `App.tsx` and never imported. |
| `src/data/experiences.ts` | 14.0 KB | Dead Data File | Only consumed by `ExperiencesSection.tsx` (which is dead code). |

---

## 4. Current Feature Inventory

| Feature | Scope / Path | Classification | Verification Notes |
| :--- | :--- | :--- | :--- |
| **Bilingual Language Switcher** | `Header.tsx`, `App.tsx` | **PARTIALLY IMPLEMENTED** | Toggles between Kannada (`kn`) and English (`en`) dynamically across all data structures. **Fails to persist** in `localStorage`—resets on reload. |
| **Concept Switcher (3 Themes)** | `ConceptSwitcher.tsx`, `Hero.tsx` | **PARTIALLY IMPLEMENTED** | Allows choosing between Concept A (Luxury), B (Journal), C (Global). Responsive across all aspect ratios. **Fails to persist** in `localStorage`. |
| **Universal Enquiry Modal** | `UniversalEnquiryModal.tsx` | **IMPLEMENTED (Client-Side)** | Fully functional interactive modal supporting all 6 service categories, dynamic forms, Zod validation, honeypot spam protection, and WhatsApp prefill. |
| **Contact Modal** | `ContactModal.tsx` | **BROKEN** | Form accepts input, validates, and displays "Thank You", but **does not save, dispatch, or log data anywhere**. Submissions are permanently lost. |
| **Trip Planner Modal** | `TripPlannerModal.tsx` | **NOT IMPLEMENTED (Unreachable)** | 51 KB interactive step modal mounted via React lazy, but its trigger handler (`handleOpenPlanner`) is never attached to any active button. |
| **Corporate Event Modal** | `CorporateEventModal.tsx` | **NOT IMPLEMENTED (Unreachable)** | Legacy modal mounted in `App.tsx` but all open triggers route to `UniversalEnquiryModal`. Component code is unreachable. |
| **School Trip Modal** | `SchoolTripModal.tsx` | **NOT IMPLEMENTED (Unreachable)** | Legacy modal mounted in `App.tsx` but all open triggers route to `UniversalEnquiryModal`. Component code is unreachable. |
| **Catering Modal** | `CateringModal.tsx` | **NOT IMPLEMENTED (Unreachable)** | Legacy modal mounted in `App.tsx` but all open triggers route to `UniversalEnquiryModal`. Component code is unreachable. |
| **Destination Modal** | `DestinationModal.tsx` | **IMPLEMENTED** | Opens rich cultural cards for selected destinations with itinerary highlights, etiquette notes, and enquiry triggers. |
| **Staff Admin Dashboard** | `AdminDashboard.tsx` | **IMPLEMENTED (Insecure)** | Functional UI for searching, filtering, editing status, and CSV exporting inquiries. **Critical vulnerability:** Pre-filled credentials and zero server-side token validation. |
| **WhatsApp Direct Connect** | `brand.ts`, `inquiryService.ts` | **PARTIALLY IMPLEMENTED** | Generates valid `https://wa.me/` URLs with pre-formatted inquiry text, but uses placeholder phone number (`919448000000`). |
| **Phone & Email Direct Links** | `Header.tsx`, `Footer.tsx` | **PARTIALLY IMPLEMENTED** | Functional `tel:` and `mailto:` links, but target placeholder values (`+91 94480 00000`, `hello@incharaholidays.com`). |
| **Accreditations / Partner Bar** | `WhyUs.tsx` | **IMPLEMENTED** | High-visibility horizontal plaques for KTF, IATTE, ABTO, and UTEN with verified bilingual labels and responsive grid behavior. |
| **Smooth Navigation Anchors** | `smoothScroll.ts` | **IMPLEMENTED** | Eased offset scrolling to `#destinations`, `#packages`, `#services`, `#institutional-corporate`, `#why-us`, `#how-it-works`. |

---

## 5. UI/UX Audit & Service Category Discoverability

### 5.1 Service Category Discoverability Audit

The client requires all six service categories discoverable from the homepage without overwhelming visitors:

| Service Category | Client Sub-Service Scope | Current Homepage Presence | Audit Classification | UX Assessment & Deficiencies |
| :--- | :--- | :--- | :--- | :--- |
| **1. Holidays** | Domestic, International, Pre-organised, Custom packages | Hero, ServicesDiscovery, Destinations, Packages | **IMPLEMENTED** | Strong positioning. Concept A & C highlight domestic & international horizons. Destination discovery and package tabs allow intuitive exploration. |
| **2. Educational Travel** | School tours, College tours, Industrial visits | ServicesDiscovery, InstitutionalCorporateHighlight | **IMPLEMENTED** | Well represented in Services grid (Pillar 02) and dedicated highlight section with verified safety badges and curriculum focus. |
| **3. Corporate & Events** | Corporate tours, Retreats, Event tours | ServicesDiscovery, InstitutionalCorporateHighlight | **IMPLEMENTED** | Well represented in Services grid (Pillar 03) and Corporate offsite showcase with team building and conference highlights. |
| **4. Transport & Bookings** | Car rentals, Bus/Coach rentals, Train & Bus booking | ServicesDiscovery, TravelLogisticsAssistance | **IMPLEMENTED** | Prominently displayed with chauffeur car rentals, tempo travellers, tourist coaches, and explicit "Assistance Only" notice for rail/bus ticketing. |
| **5. Travel Assistance** | Visa and Passport assistance | ServicesDiscovery, TravelLogisticsAssistance | **IMPLEMENTED** | Clearly presented with document advisory, international visa checklists, and non-issuing agency regulatory disclaimer. |
| **6. Catering & Hospitality** | Pure vegetarian, Tour catering, Event catering | ServicesDiscovery, CateringShowcase | **IMPLEMENTED** | Richly featured in dedicated "Pankti Seva" showcase with banana leaf imagery, 100% pure veg guarantees, and mobile kitchen features. |

### 5.2 UI/UX Friction Points & Clutter Analysis

1. **Repetitive Vertical Stacking (Section Redundancy):**
   - The homepage contains **13 distinct vertical sections**.
   - Categories 2 & 3 (Educational & Corporate), Categories 4 & 5 (Transport & Visa), and Category 6 (Catering) are fully detailed in `ServicesDiscoverySection` (lines 51–192), and then **immediately repeated in full-width bespoke sections** (`InstitutionalCorporateHighlight`, `TravelLogisticsAssistance`, `CateringShowcase`).
   - *Impact:* A visitor scrolling the page experiences intense déjà vu and must scroll past ~15,000 pixels to reach testimonials and the contact footer.
2. **Dual-Modal Confusion:**
   - Clicking "Contact Us" in the header or footer opens `ContactModal`, which discards submitted data.
   - Clicking "Enquire Now" or any service button opens `UniversalEnquiryModal`, which stores data in `localStorage`.
   - *Impact:* Customers who choose the simpler "Contact Us" form never have their leads received.
3. **Cursor Micro-Stutter on Low-Power Devices:**
   - `CustomCursor.tsx` attaches a spring-interpolated custom cursor to mousemove. On lower-end laptops or external monitors with 60Hz refresh rates, this creates perceived lag compared to the native OS cursor.
4. **Header Height & Density:**
   - Desktop header contains 6 navigation links, a staff shield icon, language toggle (`ಕನ್ನಡ | EN`), and an "Enquire Now" CTA. On 13-inch laptops (1280×800), horizontal breathing room is tight (padding `1.25rem`).

---

## 6. Frontend Functionality Findings

### 6.1 State Management & Data Flow
- **Architecture:** Pure local component state (`useState`) in `App.tsx` passed down via prop drilling.
- **No Global Store:** No Redux, Zustand, or React Context is implemented. Modal state flags (`enquiryOpen`, `adminOpen`, `selectedDestination`, etc.) are held directly at the root `App` level.
- **Data Mutation:** Mutations to inquiries in the admin dashboard update `localStorage` directly via `adminService.ts`, which does not dispatch cross-tab synchronization events.

### 6.2 Forms & Validation
- **Universal Enquiry Modal:**
  - Implements Zod validation via `src/utils/validation.ts`.
  - Enforces minimum 2-character names and 10–15 digit phone numbers matching `/^[0-9+\s\-()]{10,15}$/`.
  - Implements an invisible honeypot field (`honeypot`) to intercept automated bot submissions.
- **Contact Modal:**
  - Minimal inline check: `if (!name.trim())` and `if (!phoneOrEmail.trim())`.
  - No email format verification, no honeypot, no submission persistence.

### 6.3 Placeholder Content Audit

| Content Item | Current Value in Code | Required Real Value | Location in Code |
| :--- | :--- | :--- | :--- |
| **Phone Number (Display)** | `+91 94480 00000` | Owner's verified business number | `src/config/brand.ts:49` |
| **Phone Number (Raw/Dial)** | `919448000000` | Owner's verified business dial code | `src/config/brand.ts:50` |
| **WhatsApp Number** | `919448000000` | Active WhatsApp Business number | `src/config/brand.ts:53` |
| **Primary Email** | `hello@incharaholidays.com` | Active domain inbox | `src/config/brand.ts:55` |
| **Inquiry Notification Email** | `inquiries@incharaholidays.com`| Owner's notification inbox | `src/config/brand.ts:56` |
| **Office Address (KN)** | `ನಂ. ೪೮, ಹೆರಿಟೇಜ್ ಕಾರಿಡಾರ್, ಮೈಸೂರು & ಬೆಂಗಳೂರು...` | Actual office address | `src/config/brand.ts:58` |
| **Office Address (EN)** | `No. 48, Heritage Corridor, Mysuru & Bengaluru...` | Actual office address | `src/config/brand.ts:59` |
| **Registration Number** | `KA-TO-2024-88419` | Official GST / Dept of Tourism ID | `src/config/brand.ts:65` |
| **Package Images** | Unsplash photo IDs | Real tour / fleet photos | `src/data/packages.ts:8` |

---

## 7. Backend & Data Infrastructure Audit

### 7.1 Serverless Architecture (`api/` Directory)
The repository contains 5 serverless endpoints configured for Vercel:
1. `POST /api/inquire`: Validates payload, checks honeypot, checks idempotency, generates reference number (`ICH-2026-XXXX`), inserts into Supabase, and triggers notifications.
2. `GET/PATCH /api/services`: Fetches or updates service categories.
3. `POST /api/admin/login`: Authenticates staff against Supabase Auth or fallback credentials.
4. `GET/PATCH /api/admin/inquiries`: Lists, filters, and updates inquiry records.
5. `GET /api/admin/stats`: Aggregates lead volume, follow-up counts, and conversion rates.

### 7.2 The Reality of Backend Persistence (Critical Finding)

```
[Customer Form Submission]
          │
          ▼
   fetch('/api/inquire') ─────────────► Is SUPABASE_URL configured?
          │                                  │
          │ (Vercel Serverless)              ├─► NO: Store in memoryInquiriesStore = []
          │                                  │       (VANISHES ON SERVERLESS SHUTDOWN)
          │                                  │
          │                                  └─► YES: Insert into PostgreSQL 'inquiries'
          │                                           (REQUIRES SUPABASE ENV VARS)
          ▼
   Network Failure or Local Dev
          │
          ▼
   Catch block in inquiryService.ts
          │
          ▼
   localStorage.setItem('inchara_inquiries_db_v1')
   (STORED ONLY ON CUSTOMER'S BROWSER — INVISIBLE TO BUSINESS)
```

- In `api/_shared/supabase.ts`, `isSupabaseConfigured()` checks `Boolean(supabaseUrl && supabaseKey && supabaseClient)`.
- If environment variables are missing (current production state), the serverless function executes:
  ```ts
  // api/inquire.ts line 149
  memoryInquiriesStore.unshift(inquiryRecord);
  ```
- Because Vercel Serverless Functions are **stateless and ephemeral**, `memoryInquiriesStore` is cleared every time a function instance recycles.
- **Conclusion:** Customer inquiries submitted on the live site are currently stored **only in the customer's personal browser cache**. Unless the customer clicks the subsequent "Connect on WhatsApp" button, the business has **no record of the customer's submission**.

### 7.3 Database Readiness (Supabase SQL Assets)
The repository contains two high-quality SQL files in `supabase/`:
- `01_initial_schema.sql` (8,010 bytes):
  - 6 well-designed relational tables (`service_categories`, `services`, `inquiries`, `inquiry_events`, `notification_logs`, `admin_profiles`).
  - Strict foreign keys, `UUID` primary keys, `TIMESTAMPTZ` audit timestamps, and automated `handle_updated_at` triggers.
  - 10 performance indexes covering `reference_number`, `phone`, `email`, `status`, and `created_at`.
  - Comprehensive Row-Level Security (RLS) policies allowing public inserts for inquiries while restricting reads/updates to authenticated staff.
- `seed.sql` (6,319 bytes):
  - Rich seed data for all 6 service categories and default administrator account.
- **Verdict:** The database design is production-grade. It only requires a live Supabase project instance and environment variable linkage.

---

## 8. Hosting & Deployment Audit

### 8.1 Current Hosting Setup
- **Host Provider:** Vercel Inc.
- **Production URL:** `https://inchara-holidays.vercel.app`
- **GitHub Linkage:** Connected to `Srinidhi-070/Inchara-Holidays` branch `main` with automatic CI/CD deployment on git push.
- **Routing Rules (`vercel.json`):**
  ```json
  {
    "rewrites": [
      {
        "source": "/((?!api/|images/|assets/|favicon.svg).*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
  *Note:* Correctly excludes `/api/` from SPA rewrites so Vercel Serverless Functions execute as API endpoints.

### 8.2 Build & Bundle Analysis
Execution of `npm run build` generates the following output:
```
dist/index.html                                  1.83 kB │ gzip:   0.89 kB
dist/assets/index-BDqBxYtP.css                 131.79 kB │ gzip:  23.32 kB
dist/assets/inquiryService-cBwscZ4g.js           6.49 kB │ gzip:   2.88 kB
dist/assets/ContactModal-DlNx9GUY.js             6.95 kB │ gzip:   2.50 kB
dist/assets/CorporateEventModal-Cc0_JTNX.js     15.19 kB │ gzip:   4.46 kB
dist/assets/CateringModal-80CIpMCR.js           15.98 kB │ gzip:   4.75 kB
dist/assets/SchoolTripModal-BaRh1cTL.js         17.49 kB │ gzip:   4.99 kB
dist/assets/DestinationModal-DPpbk3Db.js        18.31 kB │ gzip:   5.63 kB
dist/assets/TripPlannerModal-Dfc16cjj.js        30.69 kB │ gzip:   7.75 kB
dist/assets/UniversalEnquiryModal-kPKhc3pb.js   32.28 kB │ gzip:   7.84 kB
dist/assets/AdminDashboard-Ya9sbSzd.js          32.74 kB │ gzip:   8.48 kB
dist/assets/index-BzWnzXgg.js                  638.39 kB │ gzip: 190.63 kB

(!) Some chunks are larger than 500 kB after minification.
```

- **JavaScript Warning:** The main bundle `index-*.js` is **638.39 kB** (minified), triggering Vite's threshold warning.
  - *Cause:* Static data dictionaries (`servicesData.ts` 63 KB, `destinations.ts` 43 KB, `translations.ts` 30 KB) and heavy dependencies (`framer-motion`) are bundled directly into the main chunk.
- **CSS Weight:** `index-*.css` is **131.79 kB** (minified), which is heavy for a landing page.
  - *Cause:* Tailwind v4 combined with unpurged legacy styling rules in `src/index.css`.
- **Dead Chunks:** 79.35 kB of unreferenced modal chunks (`TripPlannerModal`, `SchoolTripModal`, `CateringModal`, `CorporateEventModal`) are compiled and uploaded on every build.

---

## 9. Email, WhatsApp & Enquiry Requirements

### 9.1 Target Customer Journey Evaluation
The business requires:
`Visitor visits website → Selects service → Submits enquiry → Enquiry saved → Business receives Email & WhatsApp alerts → Customer receives acknowledgement → Staff manage enquiry.`

| Requirement | Current Capability | Missing Components & External Prerequisites |
| :--- | :--- | :--- |
| **1. Enquiry Saved** | Client `localStorage` only | Needs live PostgreSQL / Supabase connected via `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. |
| **2. Business Email Alert** | Simulated mock in logs | Needs Resend account, verified domain DNS (`incharaholidays.com` SPF/DKIM), and `RESEND_API_KEY`. |
| **3. Customer Email Ack** | Not implemented | Needs branded HTML confirmation template dispatched via Resend. |
| **4. Business WhatsApp Alert** | Simulated mock in logs | Needs Meta Business Manager verification, WhatsApp Business Platform app, System User token, and Phone Number ID. |
| **5. Customer WhatsApp Ack** | Click-to-chat link only | Direct automated inbound acknowledgement requires pre-approved Meta WhatsApp Message Templates. |
| **6. Enquiry Ref Numbers** | Fully implemented | Authentic format (`ICH-2026-XXXX`) generated with visually ambiguous characters excluded. |
| **7. Staff Management Portal** | Fully implemented in UI | Needs backend auth migration (Supabase Auth) to remove hardcoded master credentials. |

---

## 10. Security, Privacy & Reliability Audit

### 10.1 Critical Security Vulnerabilities (Ranked by CVSS Risk)

#### 1. Public Exposure of Hardcoded Staff Credentials (CVSS: 9.8 — CRITICAL)
- **Location:** `src/components/admin/AdminDashboard.tsx:71-72` and `src/services/adminService.ts:60-62`
- **Evidence:**
  ```tsx
  // src/components/admin/AdminDashboard.tsx
  const [loginEmail, setLoginEmail] = useState('admin@incharaholidays.com');
  const [loginPassword, setLoginPassword] = useState('Inchara@2026');
  ```
  ```ts
  // src/services/adminService.ts
  if (
    (cleanEmail === 'admin@incharaholidays.com' || cleanEmail === 'inchara@travel.com') &&
    (password === 'Inchara@2026' || password === 'admin123')
  )
  ```
- **Risk:** Anyone inspecting the frontend bundle or opening the staff modal from the footer sees the administrative credentials pre-filled in the form inputs. Clicking "Sign In" gives complete access to view all submitted customer leads, internal notes, and phone numbers.

#### 2. Unauthenticated Serverless Admin API Endpoints (CVSS: 9.1 — CRITICAL)
- **Location:** `api/admin/inquiries.ts:17-20` and `api/admin/stats.ts:16-19`
- **Evidence:**
  ```ts
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  ```
- **Risk:** The serverless handlers only verify that the `Authorization` header is *non-empty*. They do not verify cryptographic JWT signatures, expiry, or user session state. Sending `curl -H "Authorization: Bearer bypass" https://inchara-holidays.vercel.app/api/admin/inquiries` will pass the authorization check and return data once Supabase is connected.

#### 3. Plaintext Password Fallback in Serverless Handler (CVSS: 8.2 — HIGH)
- **Location:** `api/admin/login.ts:60-61`
- **Evidence:**
  ```ts
  const masterEmail = process.env.ADMIN_EMAIL || 'admin@incharaholidays.com';
  const masterPassword = process.env.ADMIN_PASSWORD || 'Inchara@2026';
  ```
- **Risk:** If `ADMIN_PASSWORD` is not set in the Vercel dashboard, the API defaults to the public hardcoded fallback password.

#### 4. High-Severity Dependency CVE in `body-parser` (CVSS: 7.5 — HIGH)
- **Location:** `node_modules/body-parser` (pulled by unused `express` dependency)
- **Evidence:**
  `GHSA-27r3-jxmh-p828`: Denial of Service via trailing bytes after compressed request body.
- **Risk:** Redundant server framework in a frontend repo exposes the application to dependency vulnerabilities.

#### 5. Unencrypted Customer PII in Client LocalStorage (CVSS: 6.5 — MEDIUM)
- **Location:** `src/services/inquiryService.ts:149`
- **Risk:** Leads stored in `localStorage` under `inchara_inquiries_db_v1` include full customer names, phone numbers, email addresses, and detailed itinerary notes in unencrypted plaintext.

---

## 11. Performance Findings

1. **JavaScript Bundle Size (FCP & TTI Impact):**
   - Main chunk is **638.39 kB** minified (190.63 kB gzip).
   - Recommended budget for high-speed mobile in India is $\le 250\text{ kB}$ uncompressed.
   - Initial load evaluates `framer-motion`, `lucide-react` (all icons), and heavy static objects.
2. **Render-Blocking Web Fonts:**
   - `index.html` loads **6 Google Font families** (`Cormorant Garamond`, `Manrope`, `Noto Sans Kannada`, `Noto Serif Kannada`, `Playfair Display`, `Plus Jakarta Sans`) across 24 weights in a single `<link>` stylesheet.
   - *Audit Measurement:* Font stylesheet download blocks First Contentful Paint (FCP) by 250–600ms on 4G connections.
3. **Uncompressed External Images:**
   - 10+ background and card images are loaded directly from `images.unsplash.com` without local caching or static CDN compression.
4. **Duplicate Project Folder in Working Tree:**
   - `UI DESIGN/` containing 77 files and 35 MB of assets slows down search indexing, git diffing, and workspace tooling.

---

## 12. Cost-Conscious Technology Recommendations

The business requires maximum cost efficiency, aiming for **$0.00/month initial operating cost** while maintaining production reliability.

### Recommended Minimum-Cost Architecture:

| Component | Recommended Technology | Free Tier Availability | Estimated Monthly Cost | Limitation & Scaling Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Hosting** | **Vercel Hobby** (Retain) | Free (unlimited deployments, 100 GB bandwidth) | **$0.00** | Exceeded only if monthly bandwidth exceeds 100 GB (>150k monthly pageviews). |
| **Database & Auth** | **Supabase Free Tier** | Free (500 MB Postgres, 50,000 MAU, Row-Level Security, automated backups) | **$0.00** | Pauses if inactive for 7 days (mitigated by automated cron or standard web traffic). |
| **Transactional Email**| **Resend Free Tier** | Free (3,000 emails/month, 100 emails/day) | **$0.00** | More than sufficient for up to 50 daily customer enquiries (2 emails per lead). |
| **WhatsApp Notifications**| **Hybrid: wa.me + Meta Cloud API** | Free: `wa.me` links are 100% free with zero fees. Meta Cloud API gives 1,000 free service conversations/mo. | **$0.00** | Paid fees only apply after 1,000 monthly marketing/utility template conversations (~₹0.40–₹0.80 per conversation in India). |
| **Admin Authentication**| **Supabase Auth** | Free (included in Supabase tier) | **$0.00** | Secure email/password with encrypted session cookies. Eliminates all hardcoded tokens. |
| **Asset Storage** | **Vite Public / Vercel Edge** | Included in Vercel bandwidth | **$0.00** | No external S3 or R2 bucket required. All tour images converted to WebP in `public/images/`. |
| **Total Operating Cost**| — | — | **$0.00 / month** | **100% Free Tier Viable** |

---

## 13. Production Readiness Scorecard

| Area | Score (0–100) | Justification & Verification Evidence |
| :--- | :---: | :--- |
| **UI/UX Quality** | **88 / 100** | Exceptional aesthetic polish, cultural authenticity, responsive across all aspect ratios, refined Kannada typography. Deducted for section repetition and length. |
| **Frontend Architecture**| **68 / 100** | Modern React 19 + TypeScript + Tailwind v4. Deducted for over 120 KB of dead/unreachable modal components, lack of global state, and non-persisted language settings. |
| **Functional Completeness**| **62 / 100** | Universal Enquiry modal works cleanly. Deducted because `ContactModal` silently discards data, and secondary service modals are unreachable. |
| **Backend Readiness** | **45 / 100** | Serverless function structure in `api/` is well-written with CORS and Zod validation, but completely non-functional for persistent storage without Supabase env vars. |
| **Database Readiness** | **78 / 100** | Schema (`01_initial_schema.sql`) is production-grade with RLS, indexes, and audit trails. Deducted because it is not yet executed on a live database instance. |
| **Enquiry Management** | **55 / 100** | Admin dashboard UI is feature-complete (search, filter, status, CSV export). Deducted because it reads from client `localStorage` rather than a synchronized database. |
| **Email Integration** | **20 / 100** | Code exists in `notifications.ts`, but unconfigured (`RESEND_API_KEY` missing). No customer-facing acknowledgement email templates exist. |
| **WhatsApp Integration**| **60 / 100** | Frontend click-to-chat (`wa.me`) functions cleanly with pre-filled enquiry reference numbers, but targets a placeholder phone number (`919448000000`). Cloud API unconfigured. |
| **Security & Privacy** | **25 / 100** | **Critical failure.** Plaintext admin credentials hardcoded and pre-filled in frontend modal. Unauthenticated serverless API endpoints. Unencrypted PII in `localStorage`. |
| **Performance** | **65 / 100** | Build is fast (~610ms), but main JS bundle (638 kB) and CSS (132 kB) exceed recommended budgets. 6 render-blocking Google Font families and unoptimized external images. |
| **Deployment Readiness**| **72 / 100** | Automated Vercel CI/CD is active and reliable. Deducted due to missing environment variables and high CVE in unused `body-parser`. |
| **Maintainability** | **60 / 100** | TypeScript coverage is 100% (`tsc --noEmit` passes). Deducted for 35 MB duplicate `UI DESIGN/` folder, 10 MB raw mockups in git, and 2,233 lines of monolithic CSS. |
| **OVERALL READINESS** | **58 / 100** | **Not Production-Ready.** Front-of-house UI is excellent, but back-of-house data persistence, security credentials, and business contact channels require immediate remediation. |

---

## 14. Critical Issues Ranked by Severity

| Rank | Severity | Issue Summary | Location | Remediation Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **CRITICAL** | Plaintext admin credentials prefilled in public UI bundle | `AdminDashboard.tsx:71-72`, `adminService.ts:60` | Remove hardcoded strings. Migrate to Supabase Auth with secure email verification. |
| **2** | **CRITICAL** | Unauthenticated Serverless Admin Endpoints | `api/admin/inquiries.ts:17`, `api/admin/stats.ts:16` | Validate Supabase JWT Bearer token cryptographically on every request. |
| **3** | **CRITICAL** | Silent customer data loss in Contact Modal | `ContactModal.tsx:39-55` | Route `ContactModal` submissions through `inquiryService.ts` or replace with `UniversalEnquiryModal`. |
| **4** | **CRITICAL** | Zero persistent database storage in production | `api/inquire.ts:149`, `supabase.ts:28` | Link live Supabase project and set `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` in Vercel. |
| **5** | **HIGH** | Placeholder business contact credentials on live site | `src/config/brand.ts:49-65` | Replace `+91 94480 00000` and `hello@incharaholidays.com` with owner's verified numbers and email. |
| **6** | **HIGH** | High-severity Denial of Service CVE in `body-parser` | `package.json:19` (`express`) | Remove unused `express` and `@types/express` from `package.json`. |
| **7** | **HIGH** | Language preference resets on page reload | `src/App.tsx:71` | Store `language` in `localStorage` (`'inchara_lang'`) and initialize from stored value. |
| **8** | **MEDIUM** | Over 120 KB of unreachable dead modal code | `TripPlannerModal`, `SchoolTripModal`, etc. | Remove unreachable legacy modals and delete unused components. |
| **9** | **MEDIUM** | Homepage section repetition and excessive length | `App.tsx:163-206` | Consolidate 6 service categories into unified discovery grid; eliminate duplicate highlight sections. |
| **10** | **MEDIUM** | 35 MB duplicate repository folder in git root | `UI DESIGN/`, `logo/`, `tieup logos/` | Archive or delete unreferenced mockup folders to clean up git repository size. |
| **11** | **LOW** | 6 render-blocking Google Font families in `index.html` | `index.html:15` | Reduce to 2 core font families (`Noto Serif Kannada` / `Playfair Display` + `Plus Jakarta Sans`) with `font-display: swap`. |

---

## 15. Existing Functionality That Must Be Preserved

During upcoming refactoring and architectural upgrades, the following validated features **must remain intact**:

1. **Brand Aesthetic & Cultural Motifs:**
   - Color palette: Mysore gold (`#D4AF37`/`#F5D77F`), deep forest green (`#162E22`), terracotta (`#9E3D28`), and parchment ivory (`#FBF8F1`).
   - Custom SVG South Indian motifs (`AmbariElephant`, `LotusIcon`, `SikkuKolamMandala`, `Mark`) in `src/components/SouthIndianMotifs.tsx`.
2. **Bilingual Dual-Language System:**
   - Full English and Kannada parity across all service categories, package summaries, and form labels.
3. **Responsive Hero Art Directions:**
   - Concept A (Indian Luxury Edit), Concept B (Living Travel Journal), and Concept C (Global Explorer) across ultrawide (21:9), desktop (16:9), laptop (16:10), tablet (4:3), and mobile.
4. **All Six Core Service Offerings:**
   - Holidays, Educational Travel, Corporate & Events, Transport & Bookings, Travel Assistance, and 100% Pure Vegetarian Catering.
5. **Authentic Enquiry Reference Code Generator:**
   - Format `ICH-2026-XXXX` with non-ambiguous alphanumeric characters.
6. **WhatsApp Click-to-Chat Pre-filled Flow:**
   - Instant conversion pathway allowing customers to message the business directly with their reference code.
7. **Accreditation Plaques:**
   - High-visibility member plaques for KTF, IATTE, ABTO, and UTEN.
8. **Destination Cultural Modals:**
   - Rich destination cards with cultural etiquette guidelines and seasonal timing notes.

---

## 16. Implementation Roadmap — Planning Only

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             INCHARA HOLIDAYS ROADMAP                             │
├────────────────────┬────────────────────┬───────────────────┬────────────────────┤
│ Phase 1: Cleanup   │ Phase 2: UI/UX &   │ Phase 3: Database │ Phase 4: Enquiry   │
│ & Security Audit   │ Service Discovery  │ & Supabase Link   │ Pipeline Storage   │
├────────────────────┼────────────────────┼───────────────────┼────────────────────┤
│ Phase 5: Resend &  │ Phase 6: Secure    │ Phase 7: Hardening│ Phase 8: Domain,   │
│ WhatsApp Alerts    │ Admin Dashboard    │ & Performance     │ SEO & Final Launch │
└────────────────────┴────────────────────┴───────────────────┴────────────────────┘
```

### Phase 1 — Cleanup, Security & Architecture Simplification
- **Objective:** Eliminate security vulnerabilities, dead dependencies, and redundant directories without altering visual presentation.
- **Actions:**
  - Remove unused dependencies: `express`, `@types/express`, `@google/genai`, `dotenv`.
  - Fix `npm audit` vulnerabilities.
  - Remove hardcoded credentials from `AdminDashboard.tsx`, `adminService.ts`, and `api/admin/login.ts`.
  - Delete unused dead components (`ExperiencesSection.tsx`, `OurStory.tsx`, `PlannerTeaser.tsx`, `SignatureJourney.tsx`).
  - Delete unreachable legacy modals (`CorporateEventModal.tsx`, `SchoolTripModal.tsx`, `CateringModal.tsx`, `TripPlannerModal.tsx`).
  - Clean up `UI DESIGN/` and raw marketing mockups from git tracking.
  - Implement language persistence (`localStorage.getItem('inchara_lang')`).
- **Dependencies:** None.
- **Estimated Complexity:** Low (1–2 days).
- **Acceptance Criteria:** `npm run build` bundle size drops by $\ge 120\text{ kB}$; `npm audit` reports 0 vulnerabilities; no hardcoded credentials remain in source code.

### Phase 2 — UI/UX Streamlining & 6-Service Discovery Consolidation
- **Objective:** Consolidate the 13-section vertical layout into a coherent, non-repetitive customer journey where all 6 services are immediately discoverable.
- **Actions:**
  - Refactor `ServicesDiscoverySection` to serve as the unified gateway for all 6 service pillars.
  - Consolidate repetitive highlight sections (`InstitutionalCorporateHighlight`, `TravelLogisticsAssistance`, `CateringShowcase`) into tabbed or modular deep-dive drawers.
  - Unify `ContactModal` with `UniversalEnquiryModal` so no customer enquiry is lost.
  - Optimize mobile navigation drawer for touch devices.
- **Dependencies:** Phase 1.
- **Estimated Complexity:** Medium (2–3 days).
- **Acceptance Criteria:** Page vertical scroll depth reduced by $\ge 35\%$; zero data loss on any form trigger; all 6 services accessible within 1 scroll.

### Phase 3 — Backend & Database Foundation (Supabase Free Tier)
- **Objective:** Establish real cloud data persistence using the prepared PostgreSQL schema.
- **Actions:**
  - Provision a free Supabase project in the `ap-south-1` (Mumbai) region for minimal latency in India.
  - Execute `supabase/migrations/01_initial_schema.sql` and `supabase/seed.sql`.
  - Configure Supabase RLS policies and verify public insert permissions.
  - Add `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to Vercel production environment variables.
- **Dependencies:** Owner provides Supabase account access.
- **Estimated Complexity:** Low (1 day).
- **Acceptance Criteria:** Successful query test verifying read/write from serverless functions.

### Phase 4 — Enquiry Submission & Persistent Storage
- **Objective:** Ensure every customer enquiry is permanently stored in PostgreSQL with guaranteed delivery.
- **Actions:**
  - Connect `api/inquire.ts` to live Supabase client.
  - Verify idempotency check preventing duplicate submissions.
  - Test offline fallback behavior when customer network disconnects.
  - Update `inquiryService.ts` to sync local cache with cloud database.
- **Dependencies:** Phase 3.
- **Estimated Complexity:** Low (1–2 days).
- **Acceptance Criteria:** Submitting a form on `localhost` or live site writes a verifiable row into the `inquiries` table with status `new`.

### Phase 5 — Email & WhatsApp Integration (Zero/Low Cost)
- **Objective:** Notify the business owner instantly via Email and WhatsApp when a customer enquires, and send a branded acknowledgement to the customer.
- **Actions:**
  - Configure Resend account and add `RESEND_API_KEY` to Vercel.
  - Verify domain DNS records (`incharaholidays.com`) for SPF, DKIM, and DMARC.
  - Build responsive bilingual HTML email notification template for business staff.
  - Build customer acknowledgement email with reference number and itinerary timeline.
  - Update verified WhatsApp Business phone number in `src/config/brand.ts`.
  - Set up Meta WhatsApp Cloud API credentials (or maintain high-reliability `wa.me` instant prefilled redirect).
- **Dependencies:** Owner provides domain DNS access and business phone number.
- **Estimated Complexity:** Medium (2–3 days).
- **Acceptance Criteria:** Submitting an enquiry delivers an email to `inquiries@incharaholidays.com` within 10 seconds; WhatsApp click opens owner's real business chat.

### Phase 6 — Secure Admin Dashboard & Lead Management
- **Objective:** Give the business owner a secure, private dashboard to review enquiries, update lead statuses, assign follow-ups, and export reports.
- **Actions:**
  - Implement Supabase Auth email/password login for staff (e.g. `owner@incharaholidays.com`).
  - Restrict `/api/admin/*` endpoints to verify active Supabase Auth JWT tokens.
  - Connect dashboard metrics (`AdminDashboard.tsx`) to real database aggregates (`api/admin/stats.ts`).
  - Add lead status workflow (`new` $\rightarrow$ `contacted` $\rightarrow$ `proposal_sent` $\rightarrow$ `confirmed` $\rightarrow$ `closed`).
  - Test CSV export with real UTF-8 Kannada character support.
- **Dependencies:** Phase 4 & Phase 5.
- **Estimated Complexity:** Medium (2–3 days).
- **Acceptance Criteria:** Unauthenticated users cannot view enquiries; staff can log in, filter leads by service category, update statuses, and export CSVs.

### Phase 7 — Production Hardening, Performance & Accessibility
- **Objective:** Optimize bundle sizes, Google Fonts, and mobile performance for real-world devices across Karnataka.
- **Actions:**
  - Reduce Google Fonts in `index.html` from 6 families down to 2 (`Noto Serif Kannada` and `Plus Jakarta Sans`) with `font-display: swap`.
  - Self-host core fonts or preload critical weights.
  - Purge unused CSS rules in `src/index.css`.
  - Configure Vite code splitting (`manualChunks`) to break `index.js` below 300 kB.
  - Convert heavy external Unsplash images to local WebP assets with `loading="lazy"`.
  - Test screen readers and WCAG AA contrast compliance.
- **Dependencies:** Phase 1 through 6.
- **Estimated Complexity:** Medium (2 days).
- **Acceptance Criteria:** Lighthouse Mobile Performance score $\ge 90$; FCP $\le 1.2\text{s}$; total initial JS bundle $\le 250\text{ kB}$.

### Phase 8 — Custom Domain, DNS & Production Launch
- **Objective:** Transition from `inchara-holidays.vercel.app` to official custom domain (`incharaholidays.com`).
- **Actions:**
  - Configure Vercel custom domain DNS (A record & CNAME).
  - Verify SSL/TLS certificates and automated renewals.
  - Implement SEO sitemap (`sitemap.xml`) and search crawler directives (`robots.txt`).
  - Configure OpenGraph social cards with official Inchara logo.
  - Perform live end-to-end smoke test of entire customer and staff journey.
- **Dependencies:** Owner provides domain registrar access.
- **Estimated Complexity:** Low (1 day).
- **Acceptance Criteria:** Domain resolves with HTTPS; forms, email, WhatsApp, and admin portal operate flawlessly.

---

## 17. Risks, Dependencies & Unknowns

### Technical & Environmental Risks
1. **Unconfigured Environment Variables:** If the site is launched without setting `SUPABASE_URL` and `RESEND_API_KEY` in Vercel, customer inquiries will silently fail to reach the business owner.
2. **Meta WhatsApp Business Verification Delays:** Meta's WhatsApp Cloud API requires Facebook Business Manager verification and official business documentation in India. This process can take 5–14 days. *Mitigation:* The existing `wa.me` direct click-to-chat link works immediately with zero approval needed.
3. **Database Idle Pausing on Free Tier:** Supabase free-tier projects pause after 7 days of inactivity. *Mitigation:* Regular customer inquiries or a free periodic ping keep the database active.

### Unknowns Requiring Verification
- Has the business registered an official GST number or Department of Tourism certificate?
- Is there an existing domain name already registered (e.g. `incharaholidays.com`, `incharaholidays.in`), and who controls DNS access?
- What is the verified, official WhatsApp Business phone number for Inchara Holidays?

---

## 18. Questions Requiring Business-Owner Decisions

Before beginning Phase 1 and Phase 2 implementation, the business owner must decide on the following 6 operational questions:

1. **Official Contact Channels:**  
   What are the exact phone numbers, WhatsApp numbers, and email addresses to receive customer leads?
2. **Physical Office Address:**  
   What official address should be displayed on the website and in customer confirmation emails?
3. **Domain Name:**  
   What is the desired primary web address (e.g., `incharaholidays.com` or `incharaholidays.in`), and is it already purchased?
4. **Homepage Presentation Preference:**  
   Do you prefer keeping the 6 service categories in a single clean, expandable grid, or continuing to show full-page separate sections for Educational, Transport, and Catering?
5. **Staff Portal Access:**  
   Which staff email addresses should have administrative login access to manage customer inquiries and download lead reports?
6. **Default Language on First Visit:**  
   Should the website continue opening in **Kannada (`kn`)** by default for all visitors, or detect browser language and open in English if outside Karnataka?

---
*Report generated and archived to `AUDIT_REPORT.md` on November 7, 2026. All source code, dependencies, and deployment settings were preserved without modification.*
