---
name: ux-information-architecture
description: >-
  Architects page structure, content hierarchy, service pathways, and customer journeys across
  Inchara Holidays' six core service categories. Use when structuring layouts, organizing content,
  designing enquiry flows, or preventing content loss and visual clutter.
---

# Inchara Holidays — UX & Information Architecture

This skill governs how content, navigation pathways, and conversion funnels are structured across the Inchara Holidays digital experience.

## When to Use This Skill
- Organizing complex travel itineraries, package details, fleet specs, and catering menus.
- Designing or refining navigation hierarchies, anchor routing, and mobile drawers.
- Optimizing customer journeys from initial discovery to consultation enquiry.
- Resolving tension between content completeness (avoiding stripped-down templates) and visual elegance (avoiding legacy clutter).
- Determining whether content belongs on the primary page, inside interactive accordions/tabs, or within dedicated detail modals.

---

## 1. The Six Core Service Architectures

Inchara Holidays is an end-to-end travel and hospitality company. Every service category requires a distinct information architecture tailored to its specific audience:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        INCHARA HOLIDAYS PORTFOLIO                      │
├──────────────────┬──────────────────┬──────────────────────────────────┤
│ 1. Holiday       │ 2. Educational   │ 3. Corporate & Events            │
│ Packages         │ & Institutional  │                                  │
│ - Heritage trails│ - School trips   │ - Executive offsites             │
│ - Hill stations  │ - College tours  │ - MICE & conferences             │
│ - Pilgrim tours  │ - Industrial     │ - Team-building retreats         │
│ - International  │   immersion      │ - Logistics management           │
├──────────────────┼──────────────────┼──────────────────────────────────┤
│ 4. Transport &   │ 5. Visa &        │ 6. Pure Veg Catering             │
│ Fleet Bookings   │ Passport Assist  │ & Hospitality                    │
│ - Chauffeur cars │ - Doc advisory   │ - Satvik & temple dining         │
│ - Tempo & coaches│ - Slot booking   │ - Plantain leaf feasts           │
│ - Airport drop   │ - Travel counsel │ - Highway stopover meals         │
│ - Outstation     │ - Academic visas │ - Event banquet service          │
└──────────────────┴──────────────────┴──────────────────────────────────┘
```

### Content Depth Guidelines per Category:
1. **Holiday Packages**:
   - Primary: Hero showcase + category filters (Karnataka, South India, North India, International) + price indicator/duration badge.
   - Deep-dive: Modal/sheet revealing day-by-day itinerary, hotel categories, inclusions, exclusions, and booking advisory.
2. **Educational Tours**:
   - Primary: Industrial visit domains, curriculum-aligned circuits, student safety protocols, chaperone ratios.
   - Deep-dive: Dedicated modal with institutional request form (student count, institution name, learning focus).
3. **Corporate Tours**:
   - Primary: Offsite venues, team retreat themes, executive transport, conference facilities.
   - Deep-dive: Corporate enquiry modal capturing headcount, offsite objectives, AV needs, team dining.
4. **Transport Fleet**:
   - Primary: Fleet showcase with seat capacity (Sedan 4-seat, Innova/SUV 6-7 seat, Tempo Traveller 12-17 seat, Luxury Coach 21-50 seat), chauffeur vetting, sanitization standards.
   - Deep-dive: Booking enquiry with route, pickup city, dates, and vehicle preference.
5. **Visa Assistance**:
   - Primary: Supported destinations, procedural roadmap, step-by-step documentation guidance.
   - Privacy Guardrail: Never request passport numbers or uploads in initial enquiry. Capture only target country, purpose, and tentative date.
6. **Pure Veg Catering**:
   - Primary: Authentic South Indian Brahmin/satvik traditions, desi ghee preparation, highway mobile catering, wedding/tour banquets.
   - Deep-dive: Menu showcase with tiffin, lunch, dinner options, and dietary preferences.

---

## 2. Navigational Hierarchy & Information Scent

### Desktop Navigation Structure
1. **Brand Identity**: Circular logo seal + Bilingual Wordmark ("Inchara Holidays / ಇಂಚರ ಹಾಲಿಡೇಸ್").
2. **Primary Section Anchors**:
   - `#holidays` (Holiday Packages & Itineraries)
   - `#educational` (Educational & Institutional Tours)
   - `#corporate` (Corporate Offsites & Events)
   - `#transport` (Fleet & Transport Logistics)
   - `#catering` (Pure Veg Catering & Hospitality)
   - `#destinations` (Destination Discovery Mosaic)
   - `#about` (Heritage, Story & Core Promises)
3. **Utility Controls**:
   - Bilingual Toggle (`EN` / `ಕ`) with instant bilingual context switch.
   - Primary Gold CTA: `Enquire Now ↗` (opens Universal Enquiry Dialog).

### Mobile Drawer Architecture
- Accessible via touch-friendly hamburger trigger (`w-11 h-11`).
- Drawer slides smoothly from right with clean backdrop blur.
- Features prominent phone, WhatsApp, and email shortcuts at the top.
- Lists all 6 services with distinct icons, followed by language switcher and direct enquiry button.

---

## 3. Customer Enquiry Journey Architecture

The Universal Enquiry flow (`EnquiryDialog`) follows a progressive 4-step wizard that reduces abandonment:

```
[ Step 01: Service ] ──> [ Step 02: Details ] ──> [ Step 03: Contact ] ──> [ Step 04: Review ] ──> [ Success & WhatsApp ]
   Select 1 of 6            Service-specific        Name, phone, email,     Verify full details      Unique Reference ID +
   large visual cards       form fields             travel dates            before submit            one-click WhatsApp link
```

- **Step 01 (Service Selection)**: 6 prominent cards with vector illustrations, brief description, and instant feedback.
- **Step 02 (Service-Specific Custom Fields)**:
  - Holidays: Destination idea, trip duration, accommodation style.
  - Educational: Institution name, student count, department.
  - Corporate: Company name, attendee count, event type.
  - Transport: Vehicle category, pickup location, drop location.
  - Visa: Target country, visa type (Tourist/Student/Business).
  - Catering: Event type, guest count, meal service preference.
- **Step 03 (Contact & Logistics)**:
  - Primary contact person, phone number (validated with country code), email, tentative dates, passenger count.
- **Step 04 (Review & Consent)**:
  - Clean summary card showing all chosen parameters.
  - Explicit consent checkbox for travel advisory outreach.
- **Success State**:
  - Displays unique reference number (e.g., `ICH-2026-XXXX`).
  - Pre-composes a structured WhatsApp message with all details for instant advisor routing.

---

## 4. Anti-Patterns to Prevent

- **Information Starvation**: Do not strip itinerary details down to single-sentence teasers. Travelers require day-by-day context before booking.
- **Wall of Unstyled Text**: Do not dump tables of unformatted text from the legacy site. Use structured cards, badges, and clean spacing.
- **Broken Anchor Jumps**: Ensure section anchors have `scroll-margin-top: 80px` so fixed headers do not cover section titles.
- **Modal Overlap**: Ensure modal backdrops have `z-[1050]` so they float above navigation chrome.
