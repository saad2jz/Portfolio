# Validation

Checked locally on 8 October 2026 in Chrome using Playwright after revising the page against the live reference.

- 95 checks passed: 38 portfolio checks, 15 dedicated 3D interaction checks, nine project-media checks, 16 gallery/refinement checks and 17 supplied-LeadHunt checks; no JavaScript errors.
- 12 responsive layouts checked: 320, 390, 560, 768, 1024 and 1440 pixels, in English and French. No horizontal overflow.
- Six axe-core WCAG 2 A/AA and 2.1 AA audits passed without reported violations: four page audits on mobile and desktop, in both languages, with all case-study disclosures open; two gallery audits on desktop in English and mobile in French. Automated audits do not replace a full manual accessibility review.
- Keyboard language switching, mobile menu closing with Escape and focus restoration, native deep links and project disclosures checked.
- Contact success and failure paths checked using intercepted requests, without sending a real message. A deployed end-to-end test remains necessary.
- Native disclosures, page fit and HTML form action checked with JavaScript disabled; reduced-motion preference checked.
- Full-screen hero, compact hero typography and alternating project rows checked.
- The mesh scene starts successfully and movement is visibly different between captured frames. Independent hover rotation, scroll-driven camera movement and project-preview tilt were verified.
- Keyboard pause, clock stopping, preference persistence and resume were verified. Reduced motion removes tilt and the extra sticky scroll stage. Rendering stops outside the hero. Loss of the GPU context restores a successfully loaded static SVG fallback.
- Desktop and mobile hero, alternating project rows, project lab and contact layouts visually reviewed alongside live-reference captures.
- JavaScript syntax and Git whitespace checks passed. The two HTML entry points are identical.
- All project images and official logos load on desktop and mobile. Responsive access captures select the correct source, full-image links return valid local images, and French captions identify provenance. FFA, LeadHunt and the project lab were visually reviewed in the rendered portfolio.
- Gallery keyboard opening, modal focus containment, previous/next arrow keys, source captions, mobile image selection, French control labels, Escape, close button, backdrop dismissal and focus restoration were verified. The original image links still open with JavaScript disabled.
- Reading progress and the active work indicator follow native scrolling. Refined project rows, the bento lab, portrait and contact were visually reviewed. A narrow-phone contact-heading overflow found during testing was corrected; all 12 page layouts pass.

Six LeadHunt product screenshots supplied by Saad replace the previous public sign-in preview. Their full-resolution WebP versions match the supplied PNGs pixel by pixel. Each view, caption, counter, group boundary and the copilot portrait on mobile were verified. Lightweight thumbnails load the full original in the viewer. Career Ops retains its accurately labelled public access captures. Five official project logos, FFA product photography and Cardiag presentation artwork are integrated locally. The FFA workflow diagram is labelled as an illustration; promotional artwork is not presented as a UI screenshot. Other authenticated product workflows, the CV's access permissions, the final Cardiag demo and existing portfolio outcome claims remain to be confirmed. See `ASSET-SOURCES.md` and `MISSING-ASSETS.md`.

No production deployment has been made.
