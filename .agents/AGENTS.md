# INCHARA HOLIDAYS — MASTER PROJECT RULES & GOVERNANCE
# Canonical Source of Truth for Antigravity AI Engineering

This document establishes the binding rules, operational constraints, and quality standards for all agentic engineering work on the Inchara Holidays platform.

---

## 1. Project Context & Domain Scope

Inchara Holidays is a premier South Indian travel, tour, and hospitality company rooted in Karnataka. The platform serves domestic and international travelers with tailored experiences, high-integrity transport, and authentic cultural hospitality.

The business operates across **six core service categories**:
1. **Holiday Packages**: Bespoke leisure, cultural heritage, hill station, and pilgrim journeys across Karnataka, South India, North India, and international circuits.
2. **Educational & Institutional Tours**: Curriculum-aligned field visits, industrial immersions, and youth discovery tours for schools, colleges, and universities.
3. **Corporate & Event Tours**: Executive offsites, annual retreats, MICE coordination, team-building gatherings, and business logistics.
4. **Transportation & Bookings**: Verified chauffeur fleet (sedans, SUVs, tempo travelers, luxury coaches), airport/railhead transfers, and ticketing assistance.
5. **Visa & Passport Assistance**: Document advisory, appointment scheduling, and procedural guidance for international leisure and academic travel.
6. **Catering & Hospitality**: 100% pure vegetarian cuisine (South Indian plantain leaf feasts, satvik meals, North Indian specialties) for tour groups and private events.

---

## 2. Source-of-Truth Hierarchy

When evaluating requirements, resolving discrepancies, or planning implementation, all agents **MUST** strictly adhere to this five-tier precedence hierarchy:

```
Tier 1: Approved Project Requirements & Direct Owner Decisions (Highest Authority)
   ↓
Tier 2: Original Website Implementation (Authoritative for business content, services, itineraries, assets)
   ↓
Tier 3: Figma Design Reference (Authoritative for visual language, art direction, and styling tokens)
   ↓
Tier 4: Current Integrated Codebase (Code to inspect, audit, and refine; NOT proof of correctness)
   ↓
Tier 5: Historical Reports (Working notes and claims that MUST be verified against actual code/behavior)
```

- **Never** discard original content simply because it was omitted in a Figma mockup or draft redesign.
- **Never** invent pricing, testimonials, affiliations, team members, or fleet statistics without verified business source data.

---

## 3. Business & Design Constraints

### Visual & Cultural Direction
- **Heritage-Modern South Indian Ethos**: Balance contemporary digital craftsmanship with authentic Karnataka cultural identity.
- **Canonical Color System**:
  - Forest Evergreen: `#162E22`, `#1E3A2B` (Primary brand ground & deep contrast)
  - Mysore Royal Gold: `#D4AF37`, `#C5A028` (Primary CTAs, active highlights, badges)
  - Kasavu Light Gold: `#F5D77F` (Warm accents, borders, and gradient stops)
  - Kaavi Terracotta: `#9E3D28` (Editorial eyebrows, numbering counters `01`–`06`, italic accents)
  - Warm Sand & Heritage Ivory: `#F6F3EA`, `#FBF8F1` (Textured card and section backgrounds)
  - Cultural Lattice: Subtle South Indian Kolam watermark pattern (`.bg-kolam-subtle`) across light grounds.
- **Bilingual Typographic System**:
  - Headings: `Playfair Display` paired with `Noto Serif Kannada`.
  - Body & UI: `Plus Jakarta Sans` paired with `Noto Sans Kannada`.
  - Editorial Accents: High-contrast `Playfair Display Italic` with Kaavi Terracotta (`#9E3D28`).
- **Brand Assets**: Preserve the approved Inchara Holidays logo and circular emblem seal. Do not introduce unauthorized logos or placeholders.

### UX & Layout Principles
- **Balanced Information Architecture**: Avoid both the cluttered chaos of the legacy website and the hollow minimalism of generic templates. Retain all comprehensive itinerary details, inclusions, exclusions, and vehicle specifications using structured accordions, modal deep-dives, and tabs.
- **Primary Conversion Channel**: The structured 4-step Universal Enquiry modal (`EnquiryDialog`) is the primary conversion vehicle. Keep it intuitive, accessible, and responsive.
- **No Floating Viewport Obstructions**: Do not add floating Call or WhatsApp buttons over the page viewport. WhatsApp contact is available through the 4-column directory footer and enquiry submission confirmation.
- **Honest Booking Flow**: Do not imply instant automated booking or payment gateway checkout. The platform provides bespoke advisory, consultation, and transparent offline/manual settlement.

---

## 4. Engineering & Architectural Constraints

### Tech Stack Standards
- **Framework**: React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Styling Architecture**: Tailwind v4 via `@tailwindcss/vite` in `src/index.css`. Theme variables and global base resets live in `@layer base` in `src/index.css`.
- **Component Design**: Modular, typed components in `src/components/` with clean props contracts.
- **State Management**: React state + custom hooks. Isolate domain data (e.g., `packagesData.ts`, `inquiryService.ts`).
- **Modal Layering**: All dialog backdrops must sit at `z-[1050]` or higher to overlay the fixed site header (`z-100`).

### Dependency Governance
- Do not install new npm packages or external libraries without explicit necessity and user approval.
- Leverage existing dependencies: `lucide-react`, `framer-motion`, `zod`, `@supabase/supabase-js`.
- Keep bundle size monitored; use dynamic imports (`React.lazy` + `Suspense`) for heavy modals.

### Backend Activation Gate (STRICT)
- **Do NOT** initiate backend implementation, create live Supabase projects, alter remote database schemas, add Express API routes, introduce authentication guards, or build admin CMS panels until the frontend recovery milestones are declared complete and approved by the owner.
- Current enquiry persistence uses verified client-side local caching (`localStorage`) with one-click pre-composed WhatsApp routing.

---

## 5. Quality Assurance & Delivery Protocol

Before any implementation cycle is declared complete:
1. **Compilation Check**: `npx tsc --noEmit` must pass with 0 errors.
2. **Production Build**: `npm run build` must complete cleanly without bundler failures.
3. **Cross-Device Visual QA**: Verify rendered layouts via Playwright across:
   - Compact Mobile: 360 × 800
   - Standard Mobile: 390 × 844
   - Tablet Portrait: 768 × 1024
   - Desktop: 1440 × 900
4. **Bilingual Verification**: Switch between English (`EN`) and Kannada (`ಕ`) to confirm text alignment, font rendering, and zero clipping.
5. **Documentation Update**: Update `REPORT.md` at the project root with the cycle summary, files modified, tests executed, and clear next steps.
