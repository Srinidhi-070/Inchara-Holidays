---
name: design-system
description: >-
  Governs the Inchara Holidays heritage-modern design system, color palette, bilingual typography,
  card and button standards, modal styling, and responsive layout tokens. Use when styling,
  reviewing, or refining UI components, CSS, and visual presentation.
---

# Inchara Holidays — Design System Engineering

This skill defines the canonical visual design tokens, bilingual typography rules, component styling standards, and cultural design motifs for the Inchara Holidays web platform.

## When to Use This Skill
- Designing, implementing, or refactoring any visual UI component.
- Creating or updating styles in `src/index.css` or Tailwind CSS utility classes.
- Standardizing buttons, cards, dialogs, form inputs, headers, or footers.
- Reviewing typography for Kannada (`kn`) and English (`en`) script harmony.
- Resolving theme inconsistencies, padding discrepancies, or misaligned elements.

---

## 1. Canonical Color Palette

The Inchara Holidays palette bridges royal Karnataka heritage with contemporary luxury hospitality:

| Token Name | Hex Code | Purpose & Application |
|---|---|---|
| **Forest Evergreen** | `#162E22` | Deep primary brand ground, navigation header, dark text, footer contrast |
| **Deep Forest Moss** | `#1E3A2B` | Secondary dark background, hero gradients, deep surface accents |
| **Mysore Royal Gold** | `#D4AF37` | Primary CTA buttons (`bg-[#D4AF37]`), active steppers, gold borders, icons |
| **Kasavu Light Gold** | `#F5D77F` | Subtle borders, hover gradient highlights, badges, warm text glow |
| **Kaavi Terracotta** | `#9E3D28` | Editorial subtitles, numbering counters (`01`–`06`), italic highlights (`em`) |
| **Warm Sand** | `#F6F3EA` | Light section backgrounds, page body background, soft contrast |
| **Heritage Ivory** | `#FBF8F1` | Pristine card surfaces, dialog cards, input field backgrounds |
| **Charcoal Slate** | `#263F32` | Secondary body text, subtle borders, inactive step indicators |

### Cultural Texture & Watermarks
- `.bg-kolam-subtle`: Authentic geometric South Indian Kolam lace watermark pattern in CSS SVG format. Applied across light sand and ivory sections (`AboutIntroduction`, `WhyUs`, `PackagesSection`, `CateringShowcase`).
- `.bg-kolam-dark`: Inverted low-opacity Kolam watermark for deep forest sections.

---

## 2. Bilingual Typographic System

The website seamlessly renders in both English and Kannada. Typography must maintain equal optical balance and baseline harmony in both scripts.

### Heading Hierarchy
- **Font Family**:
  - English: `Playfair Display`, Georgia, serif
  - Kannada: `Noto Serif Kannada`, serif
- **Global Reset**: All `h1`–`h6`, `.font-serif-editorial`, and display headings inherit this font pairing.
- **Editorial Italic Highlights**:
  - Use `<em>...</em>` within headings to emphasize key phrases.
  - Styled with high-contrast italic serif in Kaavi Terracotta (`#9E3D28`):
    ```html
    <h2>The Sanctity of Home Cuisine, <em>Wherever You Travel.</em></h2>
    ```

### Body & Interface Hierarchy
- **Font Family**:
  - English: `Plus Jakarta Sans`, system-ui, sans-serif
  - Kannada: `Noto Sans Kannada`, system-ui, sans-serif
- **Application**: Paragraphs, captions, navigation links, form labels, badges, and button labels.

### Typography Scale Guidelines
- Hero Headings: `clamp(36px, 4.5vw, 64px)` with tight line height (`0.98`–`1.08`).
- Section Headings (`h2`): `clamp(28px, 3.4vw, 44px)` with line height `1.15`.
- Subsection Headings (`h3`): `clamp(20px, 2.2vw, 28px)`.
- Body Copy: `text-sm sm:text-base` (`14px`–`16px`) with generous line height (`leading-relaxed` / `1.65`).
- Eyebrow Subtitles: `text-xs font-bold uppercase tracking-widest text-[#9E3D28]`.

---

## 3. Component Standards & Tokens

### A. Buttons & CTAs
1. **Primary Gold Pill CTA**:
   - `px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#162E22]`
   - Background: `bg-gradient-to-r from-[#F5D77F] to-[#D4AF37]`
   - Hover: `hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:scale-[1.02] active:scale-[0.98]`
   - Text alignment: Centered with optical padding (`flex items-center justify-center gap-2`).
2. **Secondary Ghost / Outline Button**:
   - `px-5 py-2.5 rounded-full font-medium text-xs border border-[#162E22]/20 text-[#162E22] hover:bg-[#162E22]/5`
3. **Bilingual Toggle Switch**:
   - Pill container with sliding active gold indicator (`bg-[#D4AF37] text-[#162E22]`).
   - Sized uniformly (`h-9 px-1 rounded-full border border-white/20`).

### B. Cards & Elevation
- **Card Background**: `#FFFFFF` or `#FBF8F1` (Heritage Ivory).
- **Border**: `border border-[#D4AF37]/25` or `border border-[#263F32]/10`.
- **Corner Radius**: `rounded-2xl` (`16px`) or `rounded-3xl` (`24px`).
- **Shadow**: `shadow-sm hover:shadow-xl transition-all duration-300`.
- **Badge Indicators**: Gold or terracotta tag in top corner or footer (e.g., `Inchara Standard ▲` or `Core Promise ▲`).

### C. Dialogs & Modals
- **Backdrop**: `fixed inset-0 bg-black/60 backdrop-blur-sm z-[1050]`.
- **Modal Surface**: `bg-[#FBF8F1] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden`.
- **Dimensions**: Max width `max-w-3xl` for standard wizards, `max-w-4xl` for package itineraries.
- **Scroll Containment**: Max height `max-h-[90vh]` with smooth internal scrolling (`overflow-y-auto`). Header must never be obscured.

---

## 4. Spacing & Responsive Rhythm

- **Global Section Padding**: `py-12 sm:py-16 md:py-20` (avoid excessive vertical white space >150px).
- **Container Max-Width**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Grid Systems**:
  - 3-column features (`grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8`).
  - 2-column editorial (`grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`).
  - 6-service grid (`grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6`).

---

## 5. Verification Checklist

- [ ] All colors match the canonical palette (Forest Evergreen, Mysore Gold, Kasavu Gold, Kaavi Terracotta).
- [ ] No generic blue/purple/black system defaults are used.
- [ ] Kannada text renders cleanly using Noto fonts without clipping or incorrect diacritics.
- [ ] Button labels and icons are optically centered.
- [ ] Modals render above header chrome with `z-[1050]`.
- [ ] No viewport horizontal scrolling at 360px viewport.
