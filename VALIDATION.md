# Validation

## Curated floating toolkit — 10 October 2026

The latest focused suite passes 48 behavior checks: 24 software marks exclude FFA/Cardiag and method badges, include Power BI, and use 512px atlas cells. Larger circles span the header and drift in all four directions. Worker and main-thread renderers preserve individual hover freeze/resume, sibling movement, portrait eclipse, adaptive scroll-zoom resolution and global pause. At 320, 390, 768 and 1920px, circles remain inside the unzoomed scene, the page has no horizontal overflow, and reduced motion restores the static portrait. Low-power texture/pixel limits, six-tool no-JavaScript fallback and preserved project identity logos pass. No browser exceptions or missing resources are recorded.

Six further checks cover four scoped header axe WCAG 2 A/AA and 2.1 AA audits with zero violations, the main-thread renderer and unavailable-WebGL fallback. TypeScript, production build and whitespace checks pass. Desktop and mobile rest/zoom captures were visually reviewed. Automated audits do not replace a complete manual accessibility review; no new Lighthouse or field performance result is claimed. Reports in the parent workspace: `outputs/curated-toolkit-verification.json` and `outputs/curated-header-accessibility.json`. This revision supersedes the older 40-mark header selection; changes remain local.

## Immersive toolkit header — 10 October 2026

The focused behavior suite passes 75 checks across 320×700, 390×844, 768×1000, 1440×1000 and 1920×1080: all 38 marks load, portrait/title reveal and disappearance follow scroll, zoom stays bounded, sticky placement releases the next section, pause stops rendering and restores the portrait, reverse scrolling restores the same phase, and reduced motion uses a static single frame. Initial project hashes, context loss and no-JavaScript content/spacer behavior pass. No runtime exceptions or missing resources are recorded.

Six additional checks cover four scoped header axe WCAG 2 A/AA and 2.1 AA audits, the main-thread 38-mark renderer and unavailable-WebGL fallback. Automated audits report zero violations but are not a complete manual accessibility review. The eight existing motion checks and 38 project-action checks also pass. TypeScript and production build succeed; desktop and phone rest/focus captures were reviewed. No fresh Lighthouse or production field result is claimed.

Reports in the parent workspace: `outputs/immersive-hero-verification.json`, `outputs/immersive-hero-accessibility.json`, `outputs/creator-motion-verification.json` and `outputs/project-actions-verification.json`. Captures: `outputs/immersive-hero-{390,1440}-{rest,focus}.png`. This revision supersedes the older 15-circle/native-height zoom behavior below and remains local.

## Project action placement — 10 October 2026

The focused suite passes 38 checks: all twelve projects expose one native details control in their introductory action row and the four existing main links remain beside it. Both languages fit 320, 390, 768 and 1440px, with paired controls aligned and matching in height. Enter opens every original panel at full reading width; Space closes it while retaining focus. No-JavaScript disclosure behavior passes. The scoped Projects axe WCAG 2 A/AA and 2.1 AA audit reports zero violations; this is not a complete manual accessibility review. No browser runtime errors are recorded. TypeScript, production build and whitespace checks pass; desktop and phone captures were visually reviewed.

Report: `outputs/project-actions-verification.json` in the parent workspace. Captures: `outputs/project-actions-1440.png` and `outputs/project-actions-390.png`. Changes remain local.

## Cardiag product content and capture replacement — 10 October 2026

The focused suite passes 30 checks: all five lossless originals match the supplied PNGs pixel for pixel; old Cardiag artwork is absent from current production references; five new gallery destinations and both real-interface ribbon slots are present. EN/FR content covers the three audiences, novice-friendly inspection, 33 checks, the make/model catalogue, Gemini and PDF traceability. Copy and media fit 320, 390, 768 and 1440px in both languages.

Gallery opening, all five keyboard positions, Escape focus restoration and keyboard scrolling of the additional screenshot rail pass. The Cardiag-scoped axe WCAG 2 A/AA and 2.1 AA audit reports zero violations; this automated scoped audit is not a complete manual accessibility review. No-JavaScript HTML retains all five captures and the PDF explanation. No runtime exceptions or missing resources are recorded. TypeScript and the production build pass. Desktop/mobile captures were reviewed.

Report: `outputs/cardiag-refresh-verification.json` in the parent workspace. Captures: `outputs/cardiag-refreshed-1440.png` and `outputs/cardiag-refreshed-390.png`. No deployment or real PDF-generation test was performed in the Cardiag application; this change updates its portfolio presentation.

## Hero scroll zoom and fifteen coloured circles — 10 October 2026

The focused suite passes 42 checks at 320, 390, 768 and 1440px: fifteen loaded logo marks, ten visible circles on phones, progressive bounded portrait/scene zoom, original section height, no horizontal overflow, readable unscaled heading, fixed navigation, pause/resume, reverse scrolling, reduced motion, return-to-top framing and visible no-JavaScript content. No runtime errors or missing resources are recorded. The eight existing motion regression checks also pass; TypeScript and the production build succeed. Automated zoom checks wait for the scroll motion value rather than a fixed frame delay.

Desktop/mobile captures were reviewed, including logo cutouts and the mid-scroll portrait. Reports: `outputs/hero-zoom-verification.json` and `outputs/creator-motion-verification.json` in the parent workspace. Captures: `outputs/header-circles-*.png` and `outputs/hero-scroll-zoom-*.png`. Earlier accessibility audits below precede this media-layer revision. No deployment or fresh Lighthouse run is claimed.

## Personal identity, typography and depth — 10 October 2026

- The dedicated personalization suite passes 74 checks. Header controls, portrait/role spacing and Expertise numeral gaps fit nine widths from 320 to 2560px in both English and French. Space Grotesk headings, DM Sans text and French font coverage pass.
- Four whole-page axe WCAG 2 A/AA and 2.1 AA audits report zero violations. Automated audits do not replace a complete manual accessibility review.
- All nine logo medals load in WebGL, including the main-thread fallback. Simulated context loss preserves four static local tool marks. No-JavaScript content retains the portrait and all twelve project destinations. Bounded pointer tilt, immediate shared pause and reduced-motion states pass.
- Regression suites pass 47 creator behavior checks, eight retained motion checks and 42 chapter/navigation checks. TypeScript and 32 production-build assertions pass; the final production build includes the phone Expertise spacing refinement. No runtime exceptions or missing resources are recorded.
- Desktop/mobile identity and chapter captures were reviewed. Hero captures await responsive portrait decoding; section captures hide only the fixed header and skip link during capture. Phone service numerals use intrinsic column widths and explicit gaps, keeping the new font clear of titles.

Reports are in the parent workspace at `outputs/personalization-verification.json`, `outputs/creator-verification.json`, `outputs/creator-motion-verification.json` and `outputs/chapter-polish-verification.json`; review captures use `outputs/personalized-*.png`. No fresh Lighthouse score, real message submission or deployment is claimed. Changes remain local.

## Chapter navigation and motion refinement — 10 October 2026

- The dedicated chapter-polish suite passes 42 checks: twelve numbered project destinations, native keyboard/no-JavaScript directory, preserved open state across EN/FR changes, current navigation state, chapter continuation links and full-width phone interest descriptions. Layouts fit eight widths from 320 to 1920px in both languages.
- Four whole-page axe WCAG 2 A/AA and 2.1 AA audits report zero violations. Automated audits do not replace a complete manual accessibility review. Destination headings receive focus below the fixed header; desktop and mobile current-location indications pass.
- Offscreen chapter decorations pause, visible chapters resume, shared pause overrides visibility and reduced motion removes decorative animation. The visibility check scrolls far enough to move the preceding chapter beyond the observer's 100px margin, rather than treating a partly visible chapter as offscreen.
- The extension regression passes 41 checks, creator behavior 47 and retained motion 8. TypeScript and all 32 production-build assertions pass. No runtime exceptions, broken internal destinations, duplicate IDs or missing resources are recorded.
- Desktop/mobile directory and Beyond work captures were visually reviewed. No new media or runtime dependency is added, and no fresh Lighthouse score is claimed. All changes remain local.

Reports are in the parent workspace at `outputs/chapter-polish-verification.json`, `outputs/extensions-verification.json`, `outputs/creator-verification.json` and `outputs/creator-motion-verification.json`. Review captures use `outputs/chapter-directory-*.png` and `outputs/chapter-beyond-*.png`.

## Extended profile chapters — 10 October 2026

Approach, International and Beyond work expand the existing owner's portfolio content. They replace the compressed languages/interests disclosure in About, whose three new chapter links provide direct access. The original twelve projects, twelve career cards and 27 gallery originals remain.

- The dedicated extension suite passes 41 checks: four ordered method stages, original language levels, 36 unique destinations, four interest cards, no duplicate long paragraphs, native anchors, keyboard expansion, live orbital motion, shared pause, reduced motion, pre-rendered content and static no-JavaScript decorations.
- Expanded destination content and chapter layouts fit eight widths (320–1920px) in both English and French. Four whole-page axe WCAG 2 A/AA and 2.1 AA audits report zero violations. Automated audits do not replace a complete manual accessibility review.
- The updated creator regression passes 47 checks, including existing gallery arrows/Escape/focus restoration, screenshot rails, translations, sticky release, mobile menu and no-JavaScript content. All eight retained motion checks, TypeScript and 32 production-build assertions pass. No runtime exceptions or missing resources are recorded.
- Desktop/mobile sections were visually reviewed. Language cards become full-width rows below 480px; country lists stay in a single native disclosure. Review captures hide the fixed header and skip link only during capture to prevent screenshot stitching overlays; these controls remain unchanged in the website.

Reports are in the parent workspace at `outputs/extensions-verification.json`, `outputs/creator-verification.json` and `outputs/creator-motion-verification.json`; captures use `outputs/extension-*.png`. No new Lighthouse result is claimed. Earlier consistency reports below describe the preceding About disclosure layout.

## Site consistency and redundancy cleanup — 10 October 2026

Projects and Career now expose one main native disclosure per record, without duplicate internal header actions. Four nested disclosures become ordinary sections inside their parent. Introductory copy no longer repeats the full ALX/academic descriptions, and Remote Copilot's overlapping note is consolidated. All gallery originals and substantive case-study/career content remain.

- The dedicated consistency suite passes 43 checks: unified Kanit controls, 23 main disclosures, no nested disclosures or duplicate long paragraphs, valid anchors/unique IDs, responsive Contact, fixed mobile navigation, keyboard access and no-JavaScript expansion. Expanded content fits eight widths from 320 to 1920px in English and French. Four whole-page axe WCAG 2 A/AA and 2.1 AA audits report zero violations; automated audits do not constitute a complete manual accessibility review.
- The career regression passes 49 checks, unified projects 43, creator behavior 47 and motion 8. TypeScript and all 32 production-build assertions pass. No runtime exceptions or missing media are recorded.
- Contact success/error behavior is tested with intercepted requests; no real message is sent. Mobile navigation remains visible after deep scrolling, closes on selection/Escape and focuses headings below the fixed header.
- Desktop/mobile Contact, LeadHunt and experience layouts are visually reviewed. LeadHunt review captures explicitly decode lazy images before capture. WebGL, magnetic portrait, opposite-direction ribbons, character reveal, stacking and shared pause still work.

Reports live in the parent workspace at `outputs/consistency-verification.json` and the regression reports listed below; screenshots use `outputs/consistent-*.png`. No fresh Lighthouse score is claimed for this revision. The changes remain local.

## Current career navigation and phone refinement — 10 October 2026

Career now follows Projects and precedes Contact, using the same card component, numbering, typography, disclosures and stacking effects. About no longer repeats the full career records.

- The dedicated career suite passes 49 checks: seven experiences, four education paths, six certification/continuing-education records, preserved chronology, undated early missions, qualified ISO awareness/ISEN track wording, counted chapter links, eleven index destinations with matching numbering, distinct introductions/details, keyboard focus, sticky release, reduced motion and no-JavaScript content. The indexes work without JavaScript too.
- Expanded career content and navigation fit eight widths (320, 390, 560, 768, 901, 1024, 1440 and 1920px) in both languages. Phone checks also verify a visible gap between every project/career numeral and its heading. Four whole-page axe WCAG 2 A/AA and 2.1 AA audits with expanded career details report zero violations. Automated audits do not replace a complete manual accessibility review.
- The updated creator regression passes 47 checks, the unified-project regression passes 43 and motion passes 8. TypeScript and all 32 portable production-build assertions pass. No runtime exceptions or missing media are recorded.
- Desktop experience and mobile certification layouts were visually reviewed, including readable mission summaries, dates, shared card hierarchy and the qualified ISO label. Translations preserve open disclosure state.
- The index/summary continuation passes 47 creator regression checks. The final phone-spacing refinement reruns the 49 career checks, 43 unified-project checks, TypeScript and 32 build assertions. Desktop/mobile indexes and shorter introductions were visually reviewed, including full-width phone summaries and clearer heading/numeral separation. The eight WebGL motion checks below precede this spacing refinement.

Reports are in the parent workspace at `outputs/journey-verification.json`, `outputs/creator-verification.json`, `outputs/unified-projects-verification.json` and `outputs/creator-motion-verification.json`. Career captures use `outputs/journey-*.png`. This revision remains local; Lighthouse scores below predate the career content.

## Unified project cards and conversational copilots — 9 October 2026

This continuation supersedes the separate lab layout and white ecosystem groups described in earlier revision records. All twelve portfolio entries now share the Projects stack, sequential numbering, heading/intro/action, visual panel, contextual tool row and native case-study disclosure. Seven visual panels are explicitly labelled workflow illustrations; existing real screenshots retain their originals and gallery boundaries.

- The unified-project suite passes 43 checks, including every card, contextual monochrome logos, conversational copy, status preservation, keyboard details, SecoursNow/Career Ops original-image viewers and no-JavaScript content.
- All cards and logo rows fit seven widths from 320 to 1920px in both languages. Four expanded-project axe WCAG 2 A/AA and 2.1 AA audits report zero violations. Automated audits are not a complete manual accessibility review.
- The updated creator regression suite passes 47 checks, motion passes 8, TypeScript passes and the portable production build passes 32 assertions. The final visual-filter refinement was checked by rerunning the unified-project suite and inspecting the desktop LeadHunt and mobile SecoursNow/Remote Copilot captures.
- LeadHunt explicitly supports conversation-led prospecting with a Gemini copilot. Cardiag describes iterative probable-root-cause investigation, indicative repair cost/time, Gemini API use and its documented catalogue of 201 makes and 2,697 model entries. Integration setup states remain inside the case studies.

Reports are in the parent workspace at `outputs/unified-projects-verification.json`, `outputs/creator-verification.json` and `outputs/creator-motion-verification.json`; visual captures use `outputs/unified-*.png`. This version remains local and has not been published. Lighthouse scores below belong to earlier builds.

## Repository ecosystem enrichment — 9 October 2026

- The dedicated ecosystem suite passes 26 checks: requested LeadHunt/Cardiag brands, repository-derived descriptions, integration states, other project groups, 22 contextual logo images, named destinations, keyboard access, no-JavaScript content and no private repository links.
- Expanded project content fits 320, 390, 768 and 1440px in both languages. Four expanded-content axe WCAG 2 A/AA and 2.1 AA scenarios report zero violations. Desktop LeadHunt/Cardiag groups and the mobile Cardiag group were visually reviewed.
- After the final asset-path and stylesheet-order cleanup, the existing creator suite passes all 47 checks and the motion suite passes all 8 checks. TypeScript checking and all 32 reproducible production-build assertions pass. No missing logo/media requests or runtime exceptions were recorded.
- The additional content and compact brand groups preserve working galleries, translations, magnetic portrait, WebGL frames, scrolling ribbons, sticky scaling, shared pause and reduced-motion behavior. The enrichment is local; it has not been pushed or deployed.

The new report is saved outside the deliverable at `outputs/ecosystem-verification.json`, with desktop/mobile captures named `outputs/ecosystem-*.png`. Existing Lighthouse measurements predate this content enrichment; no fresh performance score is claimed for the enriched build.

## Current React creator revision — 9 October 2026

- TypeScript checking passes. Production build checks pass all 32 assertions for assets, canonical/social/schema metadata, root/subfolder configurations, compression and invalid URL rejection.
- The dedicated creator browser suite passes 47 checks; a separate interaction suite passes 8 checks. An additional scroll test confirms that character opacity advances as the paragraph crosses the viewport. These are current-revision results, not totals accumulated from earlier designs.
- Seven widths (320, 390, 560, 768, 1024, 1440 and 1920px) in both English and French have no horizontal overflow. Four axe WCAG 2 A/AA and 2.1 AA scenarios on desktop/mobile in both languages report no violations. Automated audits do not replace a complete manual accessibility review.
- Confirmed actual WebGL frames, magnetic portrait displacement, opposite ribbon directions, readable character reveal, project-card scaling and shared pause reset/persistence. The Vite TypeScript entry hydrates successfully.
- Verified the three selected collages, 9/7/3 original gallery groups, all six SecoursNow captures, the five independent-work cards and eight contextually placed tool wordmarks. Additional screenshot rails work with controls, Home/End and native overflow without JavaScript.
- Keyboard focus and open project disclosures release sticky stacking. Original-image dialogs support navigation, Escape and focus restoration. About’s full career/mission content remains available and translations preserve disclosure state.
- Reduced motion, responsive mobile menu and semantic content without JavaScript pass. No runtime JavaScript errors or missing HTTP media/module requests were recorded. Desktop/mobile hero, About, expertise and project layouts were visually reviewed.
- npm audit reported zero known vulnerabilities after the Tailwind 4 dependency update. Contact delivery and CV permissions remain external follow-up items; no real message was sent.

Reports and visual captures are saved in the parent workspace’s `outputs/creator-*.json` and `outputs/creator-*.png`. Fresh Lighthouse measurements are documented in `PERFORMANCE.md`. This revision remains local and has not been pushed or deployed.

## Historical validation — earlier 8 October revisions

The results below describe superseded layouts and interactions. They are retained as a development record and are not claimed as current React-suite coverage.


Checked locally on 8 October 2026 in Chrome using Playwright after revising the page against the live reference.

- The recorded verification set now has 394 passing checks across successive revisions: 38 portfolio checks, 15 dedicated 3D interaction checks, nine project-media checks, 16 gallery/refinement checks, 25 supplied-LeadHunt checks, 22 supplied-SecoursNow checks, 30 shared-reference-effects checks, 19 production/performance checks, 22 sharing/form/gallery-feedback checks, 32 reproducible build checks, 30 supplied-FFA checks, 19 continued-reference checks, 49 horizontal-gallery checks, 31 imported-content checks and 37 Deadwater-adaptation checks; no JavaScript errors. The suites cover the worker renderer, responsive previews, offscreen layout, compiled production, confirmed domain and interrupted-network feedback. The Deadwater continuation reruns 236 checks: portfolio, portable build, horizontal galleries, imported content, shared effects, reference continuation and new interactions.
- 12 responsive layouts checked: 320, 390, 560, 768, 1024 and 1440 pixels, in English and French. No horizontal overflow.
- Sixteen axe-core WCAG 2 A/AA and 2.1 AA audit scenarios have passed without reported violations: four page audits on mobile and desktop, in both languages, with all case-study disclosures open; two gallery audits on desktop in English and mobile in French; SecoursNow and FFA gallery audits on mobile in French; a compiled-production page audit, a compiled horizontal-gallery page audit, four expanded-content audits on desktop/mobile in both languages and two compiled Deadwater-adaptation audits. Automated audits do not replace a full manual accessibility review.
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
- The eight requested tool logos load locally in the correct order and link to genuine vendor/profile destinations. They appear once each above the project rows and fit in a two-column phone layout. The desktop and mobile band were visually reviewed.
- Shared heading scale, neutral surfaces, outward-moving control crosshairs, word-by-word title entrances, image hover glitch/zoom, cursor-label translations and shared pause were checked. Pause persists across reloads and remains usable without WebGL and after GPU loss. Reduced motion disables grain and glitches; the toolkit works without JavaScript. A narrow-phone DTC heading overflow introduced by the shared title scale was corrected by stacking the metric and heading.

Seven LeadHunt screenshots supplied by Saad replace the previous public sign-in preview, including the Chrome extension open on Saad’s LinkedIn profile. Their full-resolution WebP versions match the supplied PNGs pixel by pixel. Each view, caption, counter, group boundary and the copilot portrait on mobile were verified. The Chrome extension opens as image 7 / 7 with French/English captions; its mobile modal fits, and the updated thumbnail layout has no overflow at 320, 768 and 1440 pixels. Desktop/mobile extension views were visually reviewed. Lightweight thumbnails load the full original in the viewer. Six supplied SecoursNow captures also match the PNG pixels exactly and have their own group. Full-image navigation, French/English labels, portrait proportions, mobile fit, focus restoration and the original-file link without JavaScript were verified. The widened prototype row and mobile layout were visually reviewed. Career Ops retains its accurately labelled public access captures. Five official project logos, FFA product photography and Cardiag presentation artwork are integrated locally. The FFA workflow diagram is labelled as an illustration; promotional artwork is not presented as a UI screenshot. Other authenticated product workflows, the CV's access permissions, the final Cardiag demo and existing portfolio outcome claims remain to be confirmed. See `ASSET-SOURCES.md` and `MISSING-ASSETS.md`.

No production deployment has been made.

The five career entries are visible without opening a disclosure. Education remains independently expandable and translates correctly into French. SecoursNow and Career Ops previews tilt in perspective under the pointer; shared pause and reduced motion prevent this movement. Local Inter WOFF2 loading was verified without a Google Fonts stylesheet. The updated career chronology was visually reviewed on desktop and mobile; all twelve page layouts still pass, alongside the additional production accessibility audit.

## Production optimization checks

The esbuild production build completes successfully with 99 fingerprinted media/font assets, one minified stylesheet and one main script bundle, plus the worker and shared-renderer fallback. Source and production HTML entry points match their respective mirrors. Brotli, gzip, disabled-encoding handling, ETag revalidation, immutable fingerprint caching, WOFF2 MIME type and private-path rejection were verified against the local production server.

The hero paints before the worker reports scene readiness. Rendering runs in the worker on compatible browsers; its fallback starts when OffscreenCanvas is unavailable. A high-DPR phone is capped at 1.25x and no more than 30 frames per second. Pause stops rendering. Returning to the hero while paused restores its camera without advancing the animation clock. Hidden/offscreen handling, reduced motion and GPU-loss restoration are also covered by the interaction suites.

Production selects local AVIF previews while the viewer opens the explicitly linked full original. All thirteen supplied LeadHunt/SecoursNow images still match the PNG source pixels. Both languages, native no-JavaScript links and the static hero remain available in the compiled version. Updated desktop/mobile production views were visually reviewed.

Lighthouse 13.5 audits compare the previous source with the optimized production build under the same device profiles. See `PERFORMANCE.md` for scores, timings, transfer sizes and measurement limits. Final hosting compression/caching and real Formspree delivery must still be checked after deployment.

## Confirmed-domain and feedback continuation

Production canonical, Open Graph URL, absolute social-image URL, structured identity, sitemap and robots sitemap declaration use the user-confirmed `https://saadbayahia.com/`. The local server delivers the cover as JPEG at exactly 1200×630 pixels, and sitemap as XML. The editable cover template is excluded from production. The 26 portable `npm run test:build` checks verify both HTML aliases, root/subfolder deployments, an intentionally unconfigured preview, invalid-address rejection before destructive build work, every referenced asset and exact Brotli/gzip round trips; the configured domain build is restored afterward.

The 22 continuation checks exercise form language changes during sending, read-only fields, duplicate-submit prevention, translated success/error status, clearing stale status, native email validation and timeout recovery with the draft retained. All requests are intercepted; no real message is sent. Slow/failed gallery loads expose translated feedback while preserving the full-original recovery link; navigation recovers to the next image and Escape restores focus. The existing portfolio, production and three gallery suites were rerun after these changes, including the twelve responsive layouts and eight accessibility audits.

## Supplied FFA continuation — local review

Eight supplied captures and the supplied FFA logo are integrated. The photograph plus these captures form a dedicated nine-image group. The 30 added checks verify exact source pixels, every full-size image, counters and wraparound, translated labels, four responsive widths, the mobile viewer, keyboard focus restoration, no-JavaScript links and an additional accessibility audit. Desktop and mobile gallery layouts were visually reviewed. The 38-check portfolio suite, nine media checks, 16 gallery checks and 19 production checks were rerun after integration and pass. Production is rebuilt with 85 fingerprinted assets; native-size captures are requested on demand, while page previews remain lightweight.

The six operational views currently retain visible customer/internal fields. Their public treatment awaits the owner's choice. This continuation is local only: no push, deployment or delivery-archive refresh includes these additions yet.

## Reference composition continuation

The 19 additional production checks cover centred introductions, continuous grain, native reading-progress ruler, neutral product preview framing, the closing wordmark's scroll entrance and shared pause cancellation, optical fade, fit at 320/390/560/768/1440px, reduced motion, no-JavaScript visibility and native back-to-top links. Desktop/mobile introduction and footer screenshots were visually reviewed. The main 38-check responsive/accessibility suite, 30 shared-effect checks, supplied FFA/LeadHunt/SecoursNow checks, 19 production checks and 26 portable build checks were rerun after this change and pass.

After the startup geometry optimization, all 15 dedicated 3D checks and the 19 continued-reference checks pass. The 19 production checks pass when run alone. One concurrent GPU-heavy run failed the frame-count sampling assertion; the isolated rerun confirms the mobile frame cap, pause, camera restoration, worker path and main-thread fallback without changing that assertion.

## Horizontal-gallery continuation

49 added production checks cover four rails with 9/7/6/2 authentic images, initial counters, Next/Previous including duplicate portrait end offsets, Home/End, wheel-to-horizontal movement with stable page position, no snap-back, release at both ends, native horizontal gestures, individual keyboard focus, full-size viewer opening/Escape focus restoration, French names, shared pause, reduced motion and fit at 320/390/560/768/1024/1440px. A real CDP-dispatched mobile touch gesture advances the native rail. No-JavaScript rails retain original-file links and hide inactive controls. An additional axe-core WCAG audit reports zero violations; no JavaScript errors occur.

The existing 38-check portfolio suite, nine media checks, 16 viewer checks, supplied FFA/LeadHunt/SecoursNow checks, 30 shared-effect checks, 19 continued-reference checks, 19 production checks and 32 portable build checks pass after this change. Prior grid-specific assertions were updated to verify clipped native horizontal overflow and page fit; image-loading helpers traverse offscreen slides before decoding them. Desktop/mobile rails were visually reviewed. Original supplied pixels, viewer group boundaries and portrait proportions remain verified. Source HTML mirrors and Git whitespace/syntax checks pass.

Page-height comparison uses the same 1440/390px widths, 1000px viewport height, English content, reduced motion, loaded fonts and settled project layout before/after. The desktop page is 815px shorter (8.5%); the mobile page is 1,626px shorter (12.3%). No tall pinned spacer or vertical page-scroll interception outside a rail is introduced. The current continuation stays local under the existing FFA publication constraint.

The first horizontal-gallery Lighthouse audit exposed stale source-script requests and a stylesheet request left by normalized HTML boolean attributes. Bundle stripping now derives from the actual input lists and handles serialized attributes. Six added portable build checks verify that all HTML script/stylesheet requests resolve and that only the two compiled bundles remain. The compiled rail suite also records HTTP error responses and checks that no asset/module request is missing.

Rail geometry is observed only near the viewport, preserving skipped offscreen layout at startup. A fresh 390px viewport also verifies automatic selection of the small screenshot derivative; the viewer keeps its full original. The final compiled rail suite passes after these delivery changes.

## Live-portfolio content enrichment

31 new checks verify 95 French content keys against the imported map, all ten disclosures closed initially, keyboard opening and preservation through language changes, six correctly qualified certifications, four language levels without self-rating bars, employer names, telephone/CV/ALX links, the Ansys proposal and four offers, undated early missions and the five unchanged chronology dates. All disclosures expanded fit at 320/390/560/768/1024/1440px in both languages; four expanded-content axe audits report zero violations. Native project/certification disclosures work with JavaScript disabled. All four screenshot groups and their 9/7/6/2 images remain intact; no HTTP or JavaScript errors are recorded.

The 38-check portfolio, 49-check compiled horizontal-gallery and 32-check portable build suites pass after enrichment. The portfolio keyboard selector now addresses the direct case-study summary because a nested capability disclosure is intentionally present. Imported language, skill and Ansys mobile/desktop renders were visually reviewed. Source mirrors have identical SHA-256 hashes; JavaScript syntax and Git whitespace checks pass. The build has 99 fingerprinted assets, one 58,771-byte stylesheet and one 45,369-byte main script bundle, with the existing worker/fallback.

Source chronology contradictions and owner-reported certification/award claims are documented in `CONTENT-SOURCES.md`. This remains a local adaptation; no deployment or repository push is performed.

## Deadwater secondary-reference continuation

37 added checks verify local fingerprinted Humane loading, retained Inter body copy, four native project destinations, four authentic pointer previews, equivalent keyboard previews, horizontal image wipes and per-word masked entrances, focus/deep-link behavior, French metadata, pause cancellation, responsive fit at six widths in both languages, disabled hidden-image selection on phones, mobile identity fit, reduced motion, no-JavaScript navigation, all original image groups, included font license and no runtime/missing-asset errors. Two compiled WCAG audits report zero violations. The index, FFA heading/composition and closing identity were visually reviewed on desktop/mobile.

The 38 portfolio, 30 shared-effect, 19 reference-continuation, 49 horizontal-gallery, 31 imported-content and 32 portable-build checks pass after this direction. The old hover assertion now waits for fonts and the existing figure entrance to settle before moving the pointer; its real hover/glitch/source assertion is unchanged. Source mirrors remain identical; syntax and whitespace checks pass. Current production has 100 fingerprinted assets, a 62,319-byte CSS bundle and a 46,829-byte main JS bundle. Font bytes match the inspected original exactly.

A single fresh sequential Lighthouse run reports mobile 96/100/100/100 and desktop 100/100/100/100. See `PERFORMANCE.md` for timings and local-measurement limits. The new index and masked entrances respect existing pause/reduced-motion behavior; no production deployment or push is performed.

## Education order, curricula and logos — 10 October 2026

48 focused browser checks pass (`outputs/education-verification.json`): CV order; chapter-local 01–04 numbering matching the directory; actual chapter counts; unique IDs; retained dates; five school marks and twelve subject icons; precise track/dual-qualification copy in EN/FR; expanded curriculum fit at 320, 390, 768 and 1440px; minimum 16px subject text; image loading; native keyboard toggles; no-JavaScript subjects/sources; no runtime or local request errors. Scoped WCAG 2 A/AA and 2.1 AA axe audit reports zero violations. Shared project-action regression: 38 checks pass. Desktop, mobile, expanded curriculum and the four school cards were visually reviewed. TypeScript, production build and whitespace validation pass. No production publication.

## Floating toolkit and zoom detail — 10 October 2026

36 focused browser checks pass (`outputs/floating-toolkit-verification.json`): 40 marks including supplied FFA/Cardiag; full 4096×2560 atlas; irregular placement and varying sizes; independent floating; exact hovered-pose/clock freeze while the other 39 move; correct canvas-local hit testing under scroll zoom; resumed motion; global pause; worker and main-thread paths; responsive fit at 320, 390, 768 and 1920px; higher zoom framebuffer resolution within budgets; reduced motion; smaller low-power texture; no runtime or missing-asset errors. Desktop rest/zoom and mobile zoom captures were visually reviewed.

The updated immersive-header regression passes 75 checks, including portrait eclipse, reverse scroll, normal section release, direct project anchors, context loss and no-JavaScript fallback. Six fallback/accessibility checks pass, including four scoped WCAG 2 A/AA and 2.1 AA axe audits with zero violations. TypeScript and the production build pass. This remains a local preview.

## Readable cards and career consistency — 10 October 2026

51 focused checks pass (`outputs/readable-cards-verification.json`): every card retains its introduction; all sticky cards fit below navigation; FR/EN layouts at 1440×600, 1440×800, 1440×1000, 320×700 and 390×844; no overflow; three identity placements; 21 experience pictograms and six certification markers; expanded curriculum flow; visible keyboard access to source links; stacking adapts after viewport resize; no-JavaScript summaries and supplied marks; no runtime/missing-asset errors. A whole-page French WCAG 2 A/AA and 2.1 AA axe audit has zero violations. Laptop Cardiag, mobile FFA experience and settled desktop certification views were visually reviewed. The 38 project-action and 48 education regressions, TypeScript, build and whitespace checks also pass. No publishing step is performed.
