# Inchara Holidays Homepage Redesign — Implementation Plan

## 1. Objective

Build the first milestone of the Inchara Holidays redesign as a polished, responsive, bilingual homepage in the existing React 19 + TypeScript + Vite 8 + Tailwind CSS v4 application.

The homepage will establish the “Heritage + Modern Fusion” visual system, represent all six service categories, make the universal enquiry flow the primary conversion path, and remain honest about the current frontend-only/demo state.

## 2. Confirmed Scope and Decisions

- **Milestone:** Homepage only. No secondary routes or service detail pages in this pass.
- **Visual direction:** Quiet luxury with Karnataka heritage cues: Hoysala-inspired geometry, Mysore/Kasavu gold accents, forest atmospheres, parchment surfaces, editorial typography, and restrained motion.
- **Responsive targets:** Fully composed desktop, tablet, and mobile experiences rather than a desktop layout that merely stacks.
- **Languages:** Full English/Kannada toggle across navigation, page copy, CTAs, form labels, validation, and confirmation states.
- **Language persistence:** Store the visitor’s choice in `localStorage`; default safely to English and update the document `lang` attribute when switched.
- **Primary conversion:** An accessible multi-step enquiry dialog available from the header and contextual CTAs.
- **Submission behavior:** Validated local demo only. No data is transmitted or persisted. The final action calls a replaceable async submission adapter and displays an explicit demo confirmation.
- **Assets and claims:** Use replaceable photography and a custom, non-infringing emblem treatment. Do not fabricate exact contact details, customer counts, awards, prices, partner logos, or accreditation claims. Present listed organizations as text-based affiliation references only, with neutral wording until the business verifies official status and supplies approved marks.
- **Copy:** Use polished, conservative English and Kannada copy suitable for review, with all content centralized so approved translations and factual business data can replace it without layout rewrites.
- **Backend:** None for this milestone.

## 3. Source and Asset Strategy

1. During implementation, invoke the Unsplash workflow to select context-specific, license-safe photography for:
   - Western Ghats / misty plantation hero;
   - experiential Karnataka travel/service cards;
   - banana-leaf vegetarian hospitality;
   - closing cinematic invitation banner.
2. Download chosen images into `public/images/` with descriptive filenames so the production UI does not depend on runtime image search or hotlinked query endpoints.
3. Use responsive image sizing, meaningful alt text, lazy loading below the fold, and eager/high-priority loading only for the hero image.
4. Create the brand mark as an original lightweight inline SVG/typographic lockup inspired by an ambari silhouette and architectural line work, clearly replaceable when an approved logo is supplied.
5. Represent heritage details with CSS/SVG line motifs such as gold hairlines, stepped Hoysala geometry, and subtle kolam-like backgrounds. Keep ornament secondary to content and avoid using emoji.
6. Wire public Google fonts at the top of `src/index.css`:
   - Cormorant Garamond for English display type;
   - Inter for English UI/body copy;
   - Noto Serif Kannada for Kannada display type;
   - Noto Sans Kannada for Kannada UI/body copy.

## 4. Information Architecture and Homepage Sections

### A. Global shell

- Add a keyboard-visible “Skip to content” link.
- Apply the tokenized sand, parchment, forest, gold, terracotta, and ink palette globally.
- Use a centered content width with fluid horizontal gutters and generous editorial vertical rhythm.
- Add subtle scroll-reveal treatment only where it improves hierarchy; respect `prefers-reduced-motion`.

### B. Sticky navigation

- Frosted forest header with the original placeholder emblem, bilingual brand lockup, desktop anchor navigation, language switch, and gold “Enquire now” CTA.
- Desktop links scroll to Holidays, Educational, Corporate, Transport, Visa, and Catering section/card anchors.
- Mobile uses an accessible menu panel with a real button, `aria-expanded`, focusable links, language control, and enquiry CTA.
- Close the mobile menu after navigation, on Escape, and when the enquiry dialog opens.

### C. Hero

- Full-bleed Western Ghats photograph with layered forest/black gradients for legibility.
- Coordinate-style editorial stamp, bilingual headline and supporting line, primary enquiry CTA, secondary “Explore services” anchor, and a restrained scroll cue.
- Compose type and controls independently at desktop/tablet/mobile breakpoints so headline wraps remain intentional.

### D. Trust / affiliations strip

- A high-contrast transition band that introduces “Travel planned with local understanding.”
- Four consistent text badges for KTF, IATTE, ABTO, and UTEN using generic geometric seals, not unapproved organization logos.
- Include careful microcopy that avoids asserting verified membership until supplied business documentation confirms it.

### E. Six-service editorial showcase

- Introductory heading and short positioning copy.
- Six data-driven service cards:
  1. Holiday Packages;
  2. Educational & Institutional Tours;
  3. Corporate & Event Tours;
  4. Transportation & Bookings;
  5. Visa & Passport Assistance;
  6. Catering & Hospitality.
- Each card includes localized title/description, original line icon, short capability list, visual treatment, and a contextual enquiry action that preselects that service in the modal.
- Use a varied editorial grid on wide screens and a clear one-column rhythm on phones; avoid an undifferentiated equal-card dashboard.

### F. Signature catering feature

- Dedicated parchment/terracotta section with subtle kolam geometry and vegetarian feast photography.
- Present Pankti Seva/tour-kitchen positioning and dietary accommodations as configurable copy pending business approval.
- Include service highlights and a CTA that opens the enquiry flow with Catering selected.

### G. Brand-value / journey process band

- Brief three-stage story: listen, shape, host.
- Use restrained numbered or line-art markers to communicate personal planning without adding unsupported statistics or testimonials.
- CTA reinforces that visitors can enquire across all six services.

### H. Closing invitation banner

- Cinematic Western Ghats image with controlled vignette, gold hairlines, editorial headline, supporting copy, and signature gold enquiry CTA.
- Ensure text contrast survives all responsive crops.

### I. Footer

- Deep forest directory with brand statement, six in-page service links, language control, and safe operational copy.
- Do not invent phone numbers, email addresses, office addresses, or legal identifiers. Provide a clear “Contact through enquiry” action and structure contact/legal constants for later replacement.
- Include a dynamic copyright year and a short note identifying the current enquiry as a prototype/demo where appropriate.

## 5. Bilingual Content Architecture

- Define a strict `Locale = 'en' | 'kn'` type.
- Centralize all visible copy in a typed translation object rather than scattering ternaries through JSX.
- Keep stable service IDs independent from translated labels.
- Provide a small `useLocale` hook/context at the app level that:
  - safely reads/writes `localStorage`;
  - updates `<html lang>` to `en` or `kn`;
  - supplies the selected locale and setter;
  - falls back to English if stored data is invalid or storage is unavailable.
- Apply locale-aware font classes so Kannada uses the Noto families and English uses Cormorant/Inter.
- Translate validation, progress labels, screen-reader labels, dialog controls, and confirmation copy—not only marketing headlines.
- Keep Kannada text editable in the translation dictionary for later linguist approval.

## 6. Universal Enquiry Flow

### Dialog behavior

- Open from all primary/contextual enquiry CTAs; contextual entry points preselect the associated service.
- Render as a centered modal on larger screens and a full-height bottom sheet/full-screen dialog on small screens.
- Include backdrop dismissal, explicit close button, Escape handling, focus containment, initial focus, and focus restoration to the invoking CTA.
- Lock background scrolling while open.
- Warn before accidental close only after meaningful input has been entered; allow explicit discard.

### Step 1 — Choose service

- Six selectable service options with localized label and concise prompt.
- Preserve a contextual preselection but allow the visitor to change it.

### Step 2 — Service details

Render typed, service-specific fields:

- **Holiday Packages:** domestic/international/custom interest, destination idea, flexible or preferred dates, travellers.
- **Educational Tours:** institution/type, group size, age/class band, destination or learning objective, preferred dates.
- **Corporate & Events:** event type, attendees, preferred location, dates.
- **Transportation & Bookings:** transport/booking need, pickup and destination, passengers, date.
- **Visa & Passport:** assistance type, destination country if relevant, intended travel/deadline.
- **Catering & Hospitality:** event type, location, date, guest count, dietary preferences.

Only the selected service’s relevant details are required and validated.

### Step 3 — Contact preferences

- Name, phone, email, preferred contact method, optional notes, and consent checkbox.
- Require name plus at least one valid contact route; if a preferred method is chosen, require the corresponding contact field.
- Use sensible input types, autocomplete tokens, inline errors connected with `aria-describedby`, and a summary/focus strategy after failed progression.

### Step 4 — Review and demo completion

- Summarize the selected service, details, and contact preferences with “Edit” links back to the appropriate step.
- Show an explicit note before submission: this prototype does not send or save information.
- Call a small `submitEnquiry(payload)` adapter that currently resolves locally and can later be replaced by an API/WhatsApp/email integration without rewriting modal state.
- Prevent duplicate submission while pending; handle adapter rejection with an inline retryable error.
- On success, show a localized confirmation, clearly restate that no enquiry was transmitted in this demo, and offer “Start another enquiry” and close actions.
- Reset form state only after success is acknowledged or the user explicitly discards it.

## 7. Component and File Structure

Keep `src/App.tsx` as the composition root and split substantial behavior into focused files:

- `src/App.tsx` — locale provider/use, section composition, dialog/menu state orchestration.
- `src/content.ts` — typed bilingual homepage copy, service metadata, navigation items, and safe placeholder business details.
- `src/types.ts` — locale, service, and enquiry payload/form types.
- `src/components/BrandMark.tsx` — original replaceable SVG brand lockup.
- `src/components/Icons.tsx` — small consistent inline SVG icon set.
- `src/components/Header.tsx` — sticky desktop/mobile navigation and language controls.
- `src/components/Hero.tsx`
- `src/components/Affiliations.tsx`
- `src/components/Services.tsx`
- `src/components/CateringFeature.tsx`
- `src/components/JourneyProcess.tsx`
- `src/components/InvitationBanner.tsx`
- `src/components/Footer.tsx`
- `src/components/EnquiryDialog.tsx` — dialog shell, stepper, validation, review, and completion.
- `src/hooks/useLocale.ts` — language persistence and document-language synchronization.
- `src/lib/enquiry.ts` — validation helpers and replaceable `submitEnquiry` adapter.
- `src/index.css` — font imports, Tailwind v4 theme variables, base rules inside `@layer base`, reusable motif/animation utilities, dialog states, and reduced-motion overrides.
- `public/images/*` — downloaded and optimized replaceable photography.

If implementation shows that a proposed component is too small to justify a file, keep it colocated rather than creating abstraction for its own sake.

## 8. Responsive and Interaction Requirements

- **Desktop (approximately 1280px+):** full navigation, asymmetrical editorial grids, generous negative space, layered photography.
- **Tablet (approximately 768–1279px):** compact navigation/menu as needed, two-column services, preserved image/copy balance.
- **Mobile (approximately 320–767px):** one-column narrative, touch targets of at least 44px, readable edge gutters, full-width form controls, no clipped Kannada glyphs, no horizontal scrolling.
- Use CSS fluid sizing (`clamp`) for major headings and section spacing.
- Provide visible focus styles, semantic landmarks/headings, label every control, and maintain WCAG AA contrast for normal text and UI controls.
- Avoid motion that blocks interaction; hover enhancements must have equivalent focus treatment.
- Ensure all anchor destinations account for the sticky header using scroll margin.

## 9. Metadata and Safe Defaults

- Update `index.html` title/description if the project shell requires it, while preserving Figma Make comment slots and plugin wiring.
- Set a descriptive page title and metadata appropriate to Inchara Holidays without keyword stuffing or unsupported superlatives.
- Keep social/favicons unchanged unless approved assets are supplied.

## 10. Verification and Acceptance Criteria

### Automated checks

- Run `pnpm exec oxfmt --check` on the changed source/config files; if needed, run the repository’s `pnpm format` script and then repeat the check.
- Run `pnpm build` and require a zero exit code.
- Do not start a second development server; use the already supervised Figma Make preview.

### Functional verification in preview

- Inspect desktop, tablet, and narrow mobile widths.
- Verify the sticky header, every in-page anchor, mobile menu open/close behavior, and all CTA entry points.
- Verify service CTAs open the enquiry modal with the correct service preselected.
- Exercise all six service branches through validation and review.
- Verify invalid/partial contact states, consent, back/edit navigation, pending state, simulated failure handling where feasible, success reset, discard behavior, Escape/backdrop close, and reopening.
- Verify language switching updates all visible content, modal copy, errors, `html[lang]`, and persists after reload.
- Keyboard-test navigation, menu, modal focus containment/restoration, step progression, and close controls.
- Confirm no horizontal overflow, broken image crops, missing alt text, or unreadable overlay text at target widths.
- Confirm reduced-motion behavior and that below-fold imagery is lazy loaded.

### Definition of done

- Homepage visually communicates the agreed heritage-luxury direction and uses the confirmed tokens.
- All six services are represented and connect to the enquiry flow.
- English and Kannada experiences are complete, consistent, and persistent.
- The enquiry workflow is accessible, service-aware, validated, reviewable, and transparent that it is not transmitting data.
- No fake factual claims or contact details ship.
- Build and formatting checks pass, and responsive/manual behavior is verified in the existing preview.

## 11. Explicitly Deferred

- Secondary/service-detail pages and client-side routing.
- A CMS, admin panel, database, or analytics.
- Live email, CRM, WhatsApp, payment, booking, or API integrations.
- Real package inventory, pricing, schedules, availability, testimonials, metrics, and legal/compliance content.
- Official organization logos or verified membership assertions.
- Final production logo, approved contact details, original photography, and linguist-approved Kannada copy.
- Production SEO assets such as final favicon and Open Graph artwork.

These deferred items can be connected later through the centralized content model, replaceable assets, and enquiry submission adapter without redesigning the homepage structure.
