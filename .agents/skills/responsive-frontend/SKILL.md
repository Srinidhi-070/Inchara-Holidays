---
name: responsive-frontend
description: >-
  Guides React 19, TypeScript, and Tailwind CSS v4 frontend engineering for Inchara Holidays.
  Use when implementing or refactoring components, ensuring fluid responsive layouts across
  mobile, tablet, and desktop viewports, and maintaining UI performance.
---

# Inchara Holidays — Responsive Frontend Engineering

This skill defines the coding standards, component architecture, Tailwind CSS v4 practices, and responsive design guidelines for the Inchara Holidays frontend application.

## When to Use This Skill
- Building or refactoring React components in `src/components/`.
- Styling layouts using Tailwind CSS v4 utilities and custom CSS in `src/index.css`.
- Fixing responsive issues, overflow bugs, clipping, or viewport layout shifts.
- Implementing accessible modal dialogs, drawers, form controls, and steppers.
- Optimizing frontend rendering performance and bundle efficiency.

---

## 1. Technical Stack & Conventions

- **React**: Version 19 (`react`, `react-dom`).
- **Language**: TypeScript with strict mode.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin.
  - Global CSS and theme resets reside in `src/index.css`.
  - Global base styles use `@layer base { ... }`.
  - Utility classes are applied directly in JSX.
- **Icons**: `lucide-react`.
- **Animations**: `framer-motion` for transitions, steppers, and modal entries.
- **Form Validation**: `zod` schema-backed validation with clear user-facing error messages.

---

## 2. Target Responsive Breakpoints & Viewports

All components must render without horizontal overflow, text clipping, or broken touch targets across these four canonical viewports:

| Device Category | Viewport Dimensions | Key Layout Behaviors |
|---|---|---|
| **Compact Mobile** | 360 × 800 | Single-column cards, full-width buttons (`w-full`), compact header, hamburger drawer |
| **Standard Mobile** | 390 × 844 | 2-column service grid, optimized typography scales, touch targets ≥ 44px |
| **Tablet Portrait** | 768 × 1024 | 2-3 column grids, expanded hero padding, dual-tab navigation, tablet drawer |
| **Desktop** | 1440 × 900 | Full multi-column layout (3–6 columns), prominent editorial mosaic, fixed sticky header |

### Responsive Design Rules:
1. **No Horizontal Scroll**: Ensure `overflow-x-hidden` on outer containers. Avoid fixed pixel widths (`w-[600px]`); use max-widths (`max-w-xl w-full`).
2. **Touch Target Size**: All interactive buttons, icon triggers, and tab items must have minimum touch targets of `44px × 44px` on mobile screens.
3. **Fluid Typography**: Use `clamp()` for headings (e.g., `text-[clamp(1.75rem,3.5vw,2.75rem)]`) to prevent awkward line breaks on narrow devices.
4. **Kannada Text Breathing Room**: Kannada script has ascenders and subscript consonants (ottu). Always provide adequate `line-height` (`leading-relaxed` or `leading-loose`) and vertical padding to prevent glyph clipping.

---

## 3. Component Architecture & Patterns

### A. Clean Props Contracts & Types
- Define component props interfaces clearly in TypeScript:
  ```typescript
  export interface ServiceCardProps {
    id: ServiceCategory;
    title: string;
    kannadaTitle: string;
    description: string;
    icon: LucideIcon;
    isActive?: boolean;
    onSelect: (id: ServiceCategory) => void;
  }
  ```
- Co-locate subcomponents when only used by a single parent; extract to `src/components/` when reused across multiple sections.

### B. Dialog & Modal Stacking Context
- Fixed navigation headers operate at `z-index: 100`.
- Mobile navigation drawers operate at `z-[500]`.
- All modals and dialog backdrops **MUST** operate at `z-[1050]` to overlay all fixed UI chrome:
  ```tsx
  <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div className="relative w-full max-w-3xl bg-[#FBF8F1] rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      {/* Content */}
    </div>
  </div>
  ```

### C. Bilingual Text Handling
- Components should receive the active `locale: "en" | "kn"` or import localization strings cleanly.
- Never hardcode untranslated English strings inside display markup.

---

## 4. Performance & Bundle Governance

1. **Lazy Loading Modals**:
   - Heavy modal components (`DestinationModal`, `ItineraryModal`, `AdminDashboard`) must be code-split using `React.lazy` and wrapped in `<Suspense>`:
     ```tsx
     const DestinationModal = React.lazy(() => import("./DestinationModal"));
     ```
2. **Image Optimization**:
   - Specify `loading="lazy"` on all images below the fold.
   - Use proper aspect ratio containers (`aspect-[4/3]`, `aspect-video`) with `object-cover` to prevent layout shift (CLS).
3. **No Unneeded State**:
   - Derive state during render rather than synchronizing duplicate state in `useEffect`.

---

## 5. Verification Checklist

Before finalizing any frontend component:
- [ ] `npx tsc --noEmit` returns 0 type errors.
- [ ] `npm run build` builds the production bundle cleanly.
- [ ] Tested in mobile viewport (390×844) with zero horizontal overflow.
- [ ] Tested in desktop viewport (1440×900).
- [ ] Both English and Kannada modes render cleanly without clipped glyphs.
- [ ] Modals sit above header chrome with accessible close triggers (`ESC` key + close button).
