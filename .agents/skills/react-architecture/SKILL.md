---
name: react-architecture
description: >-
  Governs React 19 architecture, component boundaries, TypeScript data models, state management,
  separation of concerns, and clean refactoring patterns for Inchara Holidays. Use when structuring
  code, writing TypeScript types, managing state, or organizing project files.
---

# Inchara Holidays — React Architecture & Code Quality

This skill establishes the software architecture standards, component boundaries, data layer separation, and TypeScript modeling practices for the Inchara Holidays application.

## When to Use This Skill
- Designing new React components or refactoring complex existing ones.
- Defining domain data models, interfaces, or types in `src/types.ts`.
- Managing UI state (dialog triggers, form state, step wizards, language switches).
- Separating static business data (`src/data/`) from UI presentation (`src/components/`).
- Code-splitting large components with `React.lazy` to keep the initial bundle light.

---

## 1. Directory Structure & Architecture Boundaries

The application enforces a clean separation of concerns:

```
src/
├── components/          # Presentational & interactive UI components
│   ├── ui/              # Primitive reusable widgets (buttons, badges, inputs)
│   ├── EnquiryDialog.tsx # Universal 4-step consultation wizard
│   ├── Header.tsx       # Sticky navigation, logo, language toggle
│   ├── Footer.tsx       # 4-column directory, verified contact, staff login
│   ├── Hero.tsx         # Heritage hero, editorial headline, call to action
│   ├── WhyUs.tsx        # 6 core standards (Personal Warmth, Pacing, etc.)
│   ├── PackagesSection.tsx # Tour package showcase with filters & itineraries
│   ├── CateringShowcase.tsx# Pure veg cuisine, tradition & menu styles
│   └── DestinationDiscovery.tsx # 5-tile editorial destination mosaic
├── config/              # Brand constants, phone numbers, WhatsApp helpers
│   └── brand.ts         # Centralized contact info, social links, URLs
├── data/                # Static business domain data (packages, destinations)
│   ├── packagesData.ts  # Complete package itineraries, inclusions, durations
│   └── destinationsData.ts # Destination highlights, seasons, circuits
├── services/            # Client-side services (inquiry storage, WhatsApp prep)
│   └── inquiryService.ts# LocalStorage persistence, reference ID generator
├── types/               # TypeScript type definitions and interfaces
│   └── index.ts         # Locale, ServiceCategory, Package, Inquiry types
├── App.tsx              # Primary page shell, modal state orchestration
├── main.tsx             # React DOM root entrypoint
└── index.css            # Tailwind CSS v4 entrypoint, theme tokens, Kolam patterns
```

---

## 2. Component Design Principles

### A. Single Responsibility & Component Sizing
- Keep individual component files focused (< 350 lines). If a component exceeds 350 lines, decompose it into logical subcomponents (e.g., splitting a 4-step wizard into Step01Service, Step02Details, Step03Contact, Step04Review).
- Separate presentation from data. Never hardcode extensive package lists or menu arrays inside JSX. Import them from `src/data/`.

### B. Props Contracts & Immutability
- Always type component props with TypeScript interfaces:
  ```typescript
  export interface PackageCardProps {
    packageItem: TourPackage;
    locale: Locale;
    onViewItinerary: (packageId: string) => void;
    onBookNow: (packageId: string) => void;
  }
  ```
- Use readonly props and avoid mutating objects directly. Use functional state updates (`setItems(prev => [...prev, newItem])`).

### C. State Management Guidelines
- **Local State (`useState`)**: For component-scoped concerns (e.g., active tab, accordion toggle, input value).
- **Lifted State**: Lift state to `App.tsx` only when required across disparate sections (e.g., opening the `EnquiryDialog` with a specific pre-selected service from any section).
- **Avoid Over-Syncing (`useEffect`)**: Do not use `useEffect` to copy props into state. Compute derived values directly during render.

---

## 3. TypeScript Modeling Standards

- **Strict Type Checking**: Avoid `any` at all costs. Use discriminated unions for polymorphic data:
  ```typescript
  export type ServiceCategory =
    | "holidays"
    | "educational"
    | "corporate"
    | "transport"
    | "visa"
    | "catering";

  export interface BaseInquiry {
    id: string;
    referenceNumber: string;
    serviceCategory: ServiceCategory;
    createdAt: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
  }
  ```
- **Validation Schemas**: Pair TypeScript types with `zod` schemas for form boundaries to guarantee runtime validation matches static types.

---

## 4. Code Splitting & Performance

- **Lazy Loading**: Code-split any modal or heavy dashboard component that is not needed for the initial viewport render:
  ```typescript
  const DestinationModal = React.lazy(() => import("./DestinationModal"));
  const ItineraryModal = React.lazy(() => import("./ItineraryModal"));
  const AdminDashboard = React.lazy(() => import("./AdminDashboard"));
  ```
- **Suspense Fallbacks**: Always provide an unobtrusive loading fallback with brand styling (e.g., `<div className="p-8 text-center text-[#D4AF37]">Loading...</div>`).

---

## 5. Architectural Quality Checklist

- [ ] All components and utilities compile without errors (`npx tsc --noEmit`).
- [ ] No `any` types in newly created or refactored code.
- [ ] No circular dependencies between modules.
- [ ] Data arrays reside in `src/data/`, not hardcoded in JSX.
- [ ] Modals are lazy-loaded to prevent initial bundle bloat.
- [ ] No global side effects outside of sanctioned lifecycle hooks.
