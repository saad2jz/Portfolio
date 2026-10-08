# Validation

Checked locally on 8 October 2026 in Chrome using Playwright after revising the page against the live reference.

- 53 checks passed: 38 portfolio checks and 15 dedicated 3D interaction checks; no JavaScript errors.
- 12 responsive layouts checked: 320, 390, 560, 768, 1024 and 1440 pixels, in English and French. No horizontal overflow.
- Four axe-core WCAG 2 A/AA and 2.1 AA audits passed without reported violations: mobile and desktop, in both languages, with all case-study disclosures open. Automated audits do not replace a full manual accessibility review.
- Keyboard language switching, mobile menu closing with Escape and focus restoration, native deep links and project disclosures checked.
- Contact success and failure paths checked using intercepted requests, without sending a real message. A deployed end-to-end test remains necessary.
- Native disclosures, page fit and HTML form action checked with JavaScript disabled; reduced-motion preference checked.
- Full-screen hero, compact hero typography and alternating project rows checked.
- The mesh scene starts successfully and movement is visibly different between captured frames. Independent hover rotation, scroll-driven camera movement and project-preview tilt were verified.
- Keyboard pause, clock stopping, preference persistence and resume were verified. Reduced motion removes tilt and the extra sticky scroll stage. Rendering stops outside the hero. Loss of the GPU context restores a successfully loaded static SVG fallback.
- Desktop and mobile hero, alternating project rows, project lab and contact layouts visually reviewed alongside live-reference captures.
- JavaScript syntax and Git whitespace checks passed. The two HTML entry points are identical.

The public LeadHunt sign-in screen was captured and identified accurately. Project diagrams are labelled illustrations. Authenticated product workflows, the CV's access permissions, the final Cardiag demo and existing portfolio outcome claims remain to be confirmed. See `MISSING-ASSETS.md`.

No production deployment has been made.
