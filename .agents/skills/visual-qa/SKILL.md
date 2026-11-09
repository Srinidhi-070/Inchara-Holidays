---
name: visual-qa
description: >-
  Provides browser-based visual quality assurance, screenshot auditing, multi-viewport inspection,
  bilingual typography checks, and defect classification for Inchara Holidays. Use when auditing UI,
  verifying visual fidelity, or validating responsiveness.
---

# Inchara Holidays — Visual Quality Assurance

This skill defines the visual inspection protocol, screenshot capture runbook, multi-viewport verification criteria, and defect severity classification for the Inchara Holidays platform.

## When to Use This Skill
- Performing visual audits after modifying components, CSS, or assets.
- Checking layout fidelity across mobile, tablet, and desktop viewports.
- Verifying bilingual typography rendering (Kannada script and English editorial serif).
- Auditing alignment, borders, spacing, shadows, and image cropping.
- Documenting visual defects and providing verified screenshot evidence for `REPORT.md`.

---

## 1. Required Viewport Matrix

Visual QA must be systematically executed across four canonical device profiles:

| Viewport Profile | Width × Height | Emulated Device Context | Primary Focus Areas |
|---|---|---|---|
| **Compact Mobile** | 360 × 800 | Budget Android devices | Horizontal scroll prevention, compact header, button text wrapping |
| **Standard Mobile** | 390 × 844 | Modern iOS / flagship Android | Mobile drawer interaction, card stacking, touch target sizing (≥44px) |
| **Tablet Portrait** | 768 × 1024 | iPad / Android tablets | 2-column grids, modal dialog centering, navigation responsiveness |
| **Desktop High-Res** | 1440 × 900 | Standard laptop / desktop | Full editorial mosaic, sticky header transparency, hero spacing |

---

## 2. Visual Audit Runbook (Using Playwright MCP)

Follow this 5-step runbook for all visual inspections:

### Step 1: Set Viewport & Navigate
Navigate to the running local application (`http://localhost:5180/`):
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_resize",
  "Arguments": { "width": 1440, "height": 900 }
}
```
Then navigate:
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_navigate",
  "Arguments": { "url": "http://localhost:5180/" }
}
```

### Step 2: Capture Baseline Full-Page Screenshot
Take a high-resolution viewport or full-page snapshot:
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_take_screenshot",
  "Arguments": { "scale": "css" }
}
```

### Step 3: Inspect Key Interactive Components
1. **Header & Navigation**:
   - Verify logo clarity and wordmark legibility.
   - Verify active nav item styling and hover transitions.
   - Check language switch toggle (`EN` / `ಕ`) state and positioning.
   - Check `ENQUIRE NOW ↗` button alignment.
2. **Hero Section**:
   - Ensure headline text is balanced and line breaks are intentional.
   - Verify that no floating button covers the "SCROLL TO WANDER ⌵" indicator.
3. **Core Service & Feature Cards**:
   - Check card border styling (`border-[#D4AF37]/25`) and background tint (`#FBF8F1`).
   - Check that numbers (`01`–`06`) render in Kaavi Terracotta (`#9E3D28`).
   - Check badge alignment (e.g., `Inchara Standard ▲`).
4. **Modals & Overlays**:
   - Open `EnquiryDialog`, `DestinationModal`, or `ItineraryModal`.
   - Confirm modal backdrop is `z-[1050]` and sits completely over the site header.
   - Confirm close button (`X`) is clearly visible, accessible, and not clipped.

### Step 4: Bilingual Script Verification
- Switch to Kannada mode by clicking the language toggle.
- Verify:
  - Kannada font renders in `Noto Serif Kannada` (headings) and `Noto Sans Kannada` (body).
  - No broken boxes (tofu glyphs) or dropped subscript vowels (vattu/ottu).
  - Text container paddings allow sufficient line-height (`leading-relaxed`).
  - Button text does not overflow its boundaries.

### Step 5: Mobile Viewport Audit (390×844 & 360×800)
- Resize browser to 390×844:
  - Confirm hamburger menu is visible and desktop nav is hidden.
  - Open mobile navigation drawer; verify touch links and contact buttons.
  - Confirm that the page does not allow horizontal scroll.

---

## 3. Defect Classification & Severity Tiers

When recording visual bugs, assign one of these four severity levels:

```
[ P0: CRITICAL ] ──> Primary journey completely blocked (e.g., modal close button hidden, form cannot submit)
[ P1: HIGH     ] ──> Major visual defect or missing core section (e.g., clipped headlines, broken layout grid)
[ P2: MEDIUM   ] ──> Noticeable styling inconsistency (e.g., misaligned button icon, incorrect font weight)
[ P3: LOW      ] ──> Minor cosmetic polish (e.g., 2px spacing difference, subtle hover transition jitter)
```

### Standard Defect Reporting Template:
```markdown
### Visual Bug: [Brief Title]
- **Severity**: P0 / P1 / P2 / P3
- **Component / Location**: `src/components/...`
- **Viewport**: 360×800 / 390×844 / 768×1024 / 1440×900
- **Steps to Reproduce**:
  1. Navigate to ...
  2. Click ...
- **Expected Result**: ...
- **Actual Result**: ...
- **Evidence / Screenshot**: `file:///.../screenshot.png`
- **Root Cause & Fix**: ...
```

---

## 4. Acceptance Criteria for Passing Visual QA

- [ ] Zero P0 or P1 visual defects.
- [ ] Layout verified at all 4 target viewports (360×800, 390×844, 768×1024, 1440×900).
- [ ] No horizontal scrollbars or element clipping on mobile screens.
- [ ] Bilingual text (English & Kannada) renders with verified font families.
- [ ] All screenshots archived and documented in the milestone report.
