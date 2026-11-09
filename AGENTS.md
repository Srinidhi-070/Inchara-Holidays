# INCHARA HOLIDAYS — MASTER PROJECT RULES
See canonical project rules in [.agents/AGENTS.md](.agents/AGENTS.md).

All agents operating in this workspace must strictly follow the rules defined in `.agents/AGENTS.md`:
1. Source-of-Truth Hierarchy (Approved Requirements > Original Website > Figma Design > Current Implementation > Reports).
2. Business & Cultural Constraints (Heritage-Modern South Indian, Forest Evergreen, Mysore Gold, Kasavu Gold, Kaavi Terracotta, Kolam watermark, Playfair Display + Plus Jakarta Sans + Noto Kannada).
3. 6 Core Services: Holiday Packages, Educational Tours, Corporate Tours, Transportation, Visa Assistance, Pure Veg Catering.
4. Engineering Standards: React 19 + TypeScript + Vite + Tailwind CSS v4. No unauthorized dependencies or rewrites.
5. Backend Implementation Gate: No backend, Supabase DB modifications, or auth implementation until frontend recovery is approved.
6. Verification & Reporting: `npx tsc --noEmit`, `npm run build`, multi-viewport Playwright testing (360×800, 390×844, 768×1024, 1440×900), and update `REPORT.md` every cycle.
