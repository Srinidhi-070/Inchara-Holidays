---
name: browser-testing
description: >-
  Executes browser automation, end-to-end user journey tests, form validation checks,
  modal interactions, and bilingual switching using Playwright MCP. Use when testing user flows,
  verifying interactive behavior, or capturing E2E test evidence.
---

# Inchara Holidays — Browser Automation & Testing

This skill provides the automated testing runbook and procedure for verifying user journeys, form validation, state persistence, and interactive flows using the native Playwright MCP integration.

## When to Use This Skill
- Testing interactive user flows (e.g., submitting an enquiry, filtering tour packages).
- Verifying client-side form validation (required fields, phone formats, consent check).
- Validating state transitions in multi-step wizards (`EnquiryDialog` steps 01–04).
- Testing modal open/close transitions, backdrop clicks, and keyboard traps.
- Checking language switching persistence across interactions.

---

## 1. Core Testing Suite: Critical User Journeys

The following six automated test suites must be executed to validate platform functionality:

### Suite 1: Navigation & Anchor Jumps
- **Test Objective**: Verify header navigation links scroll to target sections smoothly without being obscured by the fixed header.
- **Actions**:
  1. Click `Holidays` -> verify scroll position lands on `#holidays`.
  2. Click `Educational` -> verify scroll position lands on `#educational`.
  3. Click `Corporate` -> verify scroll position lands on `#corporate`.
  4. Click `Transport` -> verify scroll position lands on `#transport`.
  5. Click `Pure Veg Catering` -> verify scroll position lands on `#catering`.
  6. Click `Destinations` -> verify scroll position lands on `#destinations`.
- **Pass Criteria**: Section titles are fully visible below the 80px fixed header.

### Suite 2: Bilingual Context Switching
- **Test Objective**: Verify that clicking the language toggle switches all text and attributes between English (`EN`) and Kannada (`ಕ`).
- **Actions**:
  1. Click `ಕ` button in header.
  2. Assert `html[lang="kn"]` or check header button text becomes `ವಿಚಾರಿಸಿ ↗`.
  3. Check hero headline displays `ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ, ಸಾಮನ್ಯತೆಯನ್ನು ಮೀರಿ.`
  4. Click `EN` button -> verify return to English copy.
- **Pass Criteria**: Zero untranslated strings in active language mode; zero layout breaks.

### Suite 3: Tour Package Category Filtering
- **Test Objective**: Verify package filter pills toggle packages accurately.
- **Actions**:
  1. Navigate to `#holidays` / `PackagesSection`.
  2. Click `Karnataka Heritage` filter -> verify displayed cards match category.
  3. Click `South India Pilgrim` -> verify list updates.
  4. Click `North India & Beyond` -> verify list updates.
  5. Click a package card's `View Itinerary` -> verify `ItineraryModal` opens with full day-by-day plan.
- **Pass Criteria**: Correct package cards render; modal displays accurate days, stops, and inclusions.

### Suite 4: Universal 4-Step Enquiry Wizard
- **Test Objective**: Test the complete end-to-end conversion flow across all 6 services.
- **Actions**:
  1. Click `Enquire Now ↗` in header -> assert `EnquiryDialog` is open at Step 01.
  2. Step 01: Click `Holiday Packages` card -> assert active border highlight -> click `CONTINUE →`.
  3. Step 02: Attempt to click `CONTINUE →` with empty required inputs -> assert Zod/form validation error flags appear.
  4. Step 02: Fill valid fields (e.g., Destination: "Coorg", Duration: "3 Days", Travellers: "4") -> click `CONTINUE →`.
  5. Step 03: Test invalid phone number -> assert error. Enter valid name, email, and 10-digit mobile number -> click `CONTINUE →`.
  6. Step 04: Assert summary card accurately reflects all chosen parameters -> check consent box -> click `SUBMIT ENQUIRY`.
  7. Success State: Assert unique reference ID generated (`ICH-2026-XXXX`). Assert one-click WhatsApp button contains pre-composed message with reference ID.
- **Pass Criteria**: Submission persists inquiry in `localStorage`, displays reference code, and formats valid WhatsApp URL.

### Suite 5: Service-Specific Deep-Linking
- **Test Objective**: Test that clicking service CTAs across the homepage opens `EnquiryDialog` with the respective service pre-selected.
- **Actions**:
  1. Click `Plan Educational Tour` in `InstitutionalCorporateHighlight` -> assert dialog opens with Step 02 tailored to Educational details (Institution, student count).
  2. Click `Book Chauffeur Fleet` in `TravelLogisticsAssistance` -> assert dialog opens with Step 02 tailored to Transport fleet selection.
  3. Click `Catering Consultation` in `CateringShowcase` -> assert dialog opens with Step 02 tailored to Catering event specifications.
- **Pass Criteria**: Stepper initializes at Step 02 with correct category pre-selected and back button allows return to Step 01.

### Suite 6: Mobile Drawer & Touch Navigation
- **Test Objective**: Verify mobile drawer interactions on 390×844 viewport.
- **Actions**:
  1. Resize viewport to 390×844.
  2. Click hamburger menu button -> verify drawer opens with backdrop overlay.
  3. Click a service link in drawer -> verify drawer closes and page scrolls to section.
  4. Reopen drawer -> click outside on backdrop -> verify drawer closes.
- **Pass Criteria**: Smooth animations, zero stuck overlay states, immediate touch response.

---

## 2. Playwright MCP Tool Invocation Examples

### Navigating & Waiting for Selector
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_navigate",
  "Arguments": { "url": "http://localhost:5180/" }
}
```

### Clicking Elements & Submitting Forms
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_click",
  "Arguments": { "target": "button[aria-label='Enquire Now']" }
}
```

### Evaluating State or LocalStorage
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_evaluate",
  "Arguments": {
    "function": "() => localStorage.getItem('inchara_inquiries')"
  }
}
```

---

## 3. Test Reporting Standards

Every test session must conclude with an itemized summary in the active report:
- **Total Tests Executed**: Count of flows tested.
- **Passed**: Count of verified flows.
- **Failed**: Count of failing flows with reproducible steps and console logs.
- **Evidence**: Paths to captured screenshots.
