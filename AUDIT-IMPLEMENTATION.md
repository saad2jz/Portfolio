# Audit implementation — 15 October 2026

## Shipped changes

- Viewport-sized hero at desktop, phone and landscape sizes. Product Owner / Paris is more legible, and contact plus CV actions fit the tested first screens.
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

TypeScript checks passed. The production build suite passed 82 checks across FR/EN, root/subfolder/local builds, all nine projects, the 27 gallery links, unique IDs, direct scheduling, local CVs, metadata and delivered assets.

Browser checks cover 320×740, 390×844, 844×390 and 1280×720: first-screen actions, overflow, menu and Escape, gallery controls and keyboard, LeadHunt tour, education navigation, header-to-About zoom and reading/immersive switching. No real contact message was sent and no appointment booked.

Local Lighthouse 13.5.0 diagnostics after the main optimisation, animations enabled: mobile performance 75, desktop 99; automated accessibility, best practices and SEO 100 on both. Mobile TBT approximately 442 ms; desktop 63 ms. These are synthetic local measurements, not public-host comparisons or physical-device FPS/INP measurements. Reports are in the parent workspace under `work/audit-applied-20261015/local-final/`.

## Evidence still dependent on owner records

See `AUDIT-FOLLOW-UP.md`: baseline/period/method for FFA's reported −40% and zero manual entries; measured industrial-quality outcomes; commerce financial results; individual Ansys role/team and supporting event evidence; personal credential verification; authorised recommendations. Facts remain present, with their existing qualification, until supporting records can be added.

Analytics remains inactive because no provider account is configured. Form delivery has not been validated with a real message. No hosting migration, history rewrite or new external service is introduced by this change.
