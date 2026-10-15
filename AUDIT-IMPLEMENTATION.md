# Audit implementation — 15 October 2026

## Shipped changes

- Viewport-sized hero at desktop, phone and landscape sizes. Product Owner / Paris is more legible, and contact plus CV actions fit the tested first screens.
- Responsive portrait sizes match the actual image box (including frame padding); a 560px derivative fills the gap between 420px and 800px without changing the original portrait.
- English responsive-image URLs now account for React's `srcSet` casing, fixing the broken portrait under `/en/`.
- Calendar CTAs and both CVs point directly to the existing 30-minute Calendly event; copy consistently announces 30 minutes.
- Project navigation targets all nine projects. Mobile navigation adds education, certifications and the CV. Selected work retains the three quick-entry cards and links to the complete collection.
- Four React-rendered capture decks replace the post-hydration DOM rearrangement. All 27 original gallery positions are retained (FFA 9, LeadHunt 7, Cardiag 5, SecoursNow 6). Controls precede images; deck height does not change between captures. FFA opens with a real storefront view; its brand photograph is retained.
- LeadHunt offers a seven-image product tour without requiring sign-in. The authenticated live-product link remains separate. This is a real screenshot tour, not a claim of an unauthenticated interactive application.
- Chapter introduction wrappers are rendered in React rather than inserted around hydrated nodes. Card titles animate without being split into word-mask DOM trees. Initial hydration yields to the portrait/font paint and starts immediately on input; early clicks on enhanced controls are queued until their handlers are ready.
- A reading-view control shares the existing pause preference. Reading and reduced-motion styles remove sticky cards and extra motion tracks. Fragment navigation accounts for the reading layout; changing modes preserves the reading anchor.
- Shorter chapter introduction spacing on mobile retains the zoom rhythm while reducing blank scrolling.
- Nine concise case summaries use Problem, Role, Delivery, Result/status. Existing project details, metrics, career facts and owner-entered information are retained. Career Ops remains without screenshots.
- A cross-brand commerce case covers the owner-confirmed 20+ stores since 2019, branding, supplier negotiations, acquisition, operations, international sales and cash on delivery. It does not invent revenue or ROAS.
- Nine learning records distinguish ISEN academic modules, SAP learning in progress and continuing education. No missing award date, issuer or verification ID is fabricated. Ansys recognition is localised in French.
- Both one-page public CV PDFs include AWS and Power BI at ISEN alongside academic ISO/IEC 27001. FR and EN layouts were rendered and inspected.
- With explicit owner permission, 30 full-size/delivery capture files have opaque pixel redactions of reviewed client, order, contact, configuration and vehicle-registration data. Private originals are preserved outside the repository. Original-file gallery links use the sanitised files. Previous Git history and already-cached public exports are not rewritten.

## Validation

TypeScript checks passed. The production build suite now passes 88 checks across FR/EN, root/subfolder/local builds, all nine projects, the 27 gallery links, unique IDs, direct scheduling, local CVs, metadata, delivered assets and shared flow geometry.

Browser checks cover 320×740, 390×844, 844×390 and 1280×720: first-screen actions, overflow, menu and Escape, gallery controls and keyboard, LeadHunt tour, education navigation, header-to-About zoom and reading/immersive switching. No real contact message was sent and no appointment booked.

Local Lighthouse 13.5.0 diagnostics after the main optimisation, animations enabled: mobile performance 75, desktop 99; automated accessibility, best practices and SEO 100 on both. Mobile TBT approximately 442 ms; desktop 63 ms. These are synthetic local measurements, not public-host comparisons or physical-device FPS/INP measurements. Reports are in the parent workspace under `work/audit-applied-20261015/local-final/`.

Public-host checks at commit `5d6b675`, before the final portrait delivery refinement: mobile 59 in a contended run (CPU benchmark 1592) and 71 with the control browser's WebGL scene offscreen (benchmark 1775), desktop 99. The latter mobile FCP was 1.64 s, LCP 3.46 s and TBT 629 ms. The initial audit recorded 64 / 95 with mobile benchmark 1783. All runs are retained; results vary with machine load and are not field data. The remaining mobile loading margin is explicitly acknowledged.

## Evidence still dependent on owner records

See `AUDIT-FOLLOW-UP.md`: baseline/period/method for FFA's reported −40% and zero manual entries; measured industrial-quality outcomes; commerce financial results; individual Ansys role/team and supporting event evidence; personal credential verification; authorised recommendations. Facts remain present, with their existing qualification, until supporting records can be added.

Analytics remains inactive because no provider account is configured. Form delivery has not been validated with a real message. No hosting migration, history rewrite or new external service is introduced by this change.

## Scroll and mobile follow-up

- Replaced chapter-track bottom padding with an actual flow spacer. Padding did not provide the sticky introduction with usable travel: a mobile navigation to Skills left its title at 58px under an 80px header. The same navigation now places it at 138px. Verified at 320×740 and 390×844; desktop English deep links also keep their title below the header.
- The spacer collapses in reading/reduced-motion mode. Its mobile fallback changes a variable rather than overriding the reduced-motion height rule.
- Card handoff spacing is applied before measuring later chapters. A fresh, shared offset-ancestor cache reduces repeated geometry reads without using sticky screen rectangles or keeping stale positions across resizes/disclosures. Build tests verify all three properties.
- About retains its exact FR/EN copy and progressive scroll reveal, now by word. The French paragraph drops from 373 span elements / 40,013 bytes of markup to 56 / 9,773; the accessible text remains a single complete string.
- Removed the unused compact preference and StackCard flags. The responsive CSS already owns card layout; the redundant matchMedia update rerendered the mobile tree after hydration.
- Browser verification covers first menu activation, Skills/Projects/Education navigation, FFA-to-LeadHunt stacking in both directions, a gallery change with unchanged card height (1,477px at the tested size), reading mode and English rendering. No horizontal overflow or captured JavaScript errors in those checks.

Local Lighthouse experiments and the final measurement are retained outside Git under `work/audit-applied-20261015/mobile-pass2-*`. One-run scores vary and do not establish a field-performance improvement or physical-device frame rate. No content, projects or captures were removed to increase a score.
