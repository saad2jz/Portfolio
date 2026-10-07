# Validation

Checked locally on 7 October 2026 in Chrome using Playwright.

- 33 checks passed; no JavaScript errors.
- 12 responsive layouts checked: 320, 390, 560, 768, 1024 and 1440 pixels, in English and French. No horizontal overflow.
- Four axe-core WCAG 2 A/AA and 2.1 AA audits passed without reported violations: mobile and desktop, in both languages, with all case-study disclosures open. Automated audits do not replace a full manual accessibility review.
- Keyboard language switching, mobile menu closing with Escape and focus restoration, native deep links and project disclosures checked.
- Contact success and failure paths checked using intercepted requests, without sending a real message. A deployed end-to-end test remains necessary.
- Native disclosures, page fit and HTML form action checked with JavaScript disabled; reduced-motion preference checked.
- Desktop, mobile, bento, project lab and contact layouts visually reviewed.
- JavaScript syntax and Git whitespace checks passed. The two HTML entry points are identical.

The public LeadHunt sign-in screen was captured and identified accurately. Project diagrams are labelled illustrations. Authenticated product workflows, the CV's access permissions, the final Cardiag demo and existing portfolio outcome claims remain to be confirmed. See `MISSING-ASSETS.md`.

No production deployment has been made.
