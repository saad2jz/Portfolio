# Performance

## Current personal identity revision — 10 October 2026

The current build measures 145,604 bytes minified CSS, 470,752 bytes minified client JavaScript and 151 unique fingerprinted assets. `brotliTextBytes` is 252,902 bytes across build text files, not a single-page transfer figure. These figures include the enriched education cards and curated 24-tool header and supersede earlier sizes; no fresh Lighthouse or real-user performance result is claimed.

Four local variable font subsets total 96,388 bytes; only requested character subsets are fetched, and the Latin Space Grotesk face is preloaded. The 218,603-byte transparent atlas supplies 24 marks in 512px cells on a 3072×2048 texture (24 MiB of RGBA texture storage); low-power devices downsample it to 2048×1365 (about 10.7 MiB). This is 56.5% fewer atlas file bytes and 40% less full-resolution texture storage than the previous 40-mark scene, while the circles are larger. Individual software SVGs are retained locally for provenance but are not requested at runtime. One shared bevelled mesh uses 64 segments on phones/low-power devices and 112 otherwise. Framebuffer resolution follows the CSS zoom in quarter-scale steps, capped at 6 million pixels on desktop, 3 million on phones or 2.2 million in low-power mode, plus the GPU renderbuffer limit. DPR is capped at two, or one in low-power mode. Geometry reads and quality updates happen on coalesced input/scroll/resize events, not inside the render loop. Worker rendering, 30/60fps scheduling caps, offscreen suspension and static fallback remain. No measured FPS or battery improvement is inferred.

The native sticky header adds 110svh of scroll travel in enhanced-motion mode. A single Framer Motion value drives separate CSS transform/opacity layers: portrait recession, title fade and scene zoom. It adds no dependency, wheel listener or per-frame layout writes. Pause restores original scale/portrait while preserving document position; reduced motion, WebGL failure and no JavaScript use one static frame. Startup deep links are realigned after enhanced layout so destinations remain visible.

The added depth controller reuses native Web Animations and IntersectionObserver. Entrances run once per surface; pointer writes are coalesced in requestAnimationFrame, with bounds measured on entry rather than on each movement. Tilt stays within four degrees and is disabled for touch/coarse pointers. Pause, reduced motion and hidden tabs cancel active entrances and pointer state immediately. Existing offscreen orbital suspension, lazy screenshot galleries and static semantic HTML remain. These implementation changes are verified behaviorally; no battery, FPS or loading-score gain is inferred.

## Current React creator revision — 9 October 2026

The current stack and visual direction supersede the earlier vanilla/Inter layouts. The old before/after tables below are historical and do not measure the React creator revision.

The following Lighthouse 13.5.0 runs precede the repository-description and ecosystem-logo enrichment. They use local Chrome and the compiled Brotli-serving preview. Mobile uses the default simulated slow-4G/CPU-slowdown profile; desktop uses 1440×1000, 10 Mbps, 40ms RTT and no CPU slowdown. Runs are sequential with fresh browsers. These are local synthetic measurements, not production field data. Animations remain enabled.

| Creator build before ecosystem enrichment | Mobile | Desktop |
|---|---|---|
| Performance / Accessibility / Best practices / SEO | 88 / 100 / 100 / 100 | 91 / 100 / 100 / 100 |
| First contentful paint | 1.52s | 0.51s |
| Largest contentful paint | 3.30s | 1.00s |
| Total blocking time | 229ms | 191ms |
| Layout shift | 0.009777 | 0.001457 |
| Speed index | 2.48s | 1.50s |

Source reports: parent workspace `outputs/lighthouse-creator-optimized-mobile.json` and `outputs/lighthouse-creator-optimized-desktop.json`, with matching HTML reports. Earlier audits during this revision recorded 90/99 before final media/reveal changes and 79/100 during delivery refinement; they are different intermediate builds, not a controlled same-version comparison. Device load and the live 3D/entrance timing affect these measurements. No improvement over the previous vanilla build is claimed.

Production sizes after the 10 October chapter-navigation refinement: 123,291 bytes minified CSS, 431,494 bytes minified client JavaScript, and 144 unique fingerprinted assets. The preceding extended-profile build measured 120,984 CSS / 431,546 JS bytes. The chapters reuse Framer/Lucide and add one local 131,658-byte SVG map; no runtime map library, remote atlas request, font or dependency is introduced. The map is lazy loaded with reserved dimensions. No new Lighthouse run measures this version. The client includes React, Framer’s LazyMotion/domAnimation and tree-shaken Lucide icons. It ships one compiled stylesheet and one client script, plus the worker renderer as needed. `brotliTextBytes` (231,208 bytes) is a build-wide total, not a single-page transfer figure.

The current-location indicator uses IntersectionObserver rather than a continuous scroll handler, with viewport-height-based pixel margins rebuilt on resize. International and Beyond work pause CSS decorations when their sections leave a 100px visibility margin, in addition to shared user-pause, reduced-motion and hidden-tab handling. The project directory uses native details/anchors, without a carousel or extra runtime. An unused legacy profile fragment is removed from the content payload; its facts remain in the visible chapters. Browser checks verify pause/resume, not a measured battery or frame-rate improvement.

Delivery decisions:

- Render semantic React HTML at build time before hydration; actual content, anchors and native disclosures are available without JavaScript.
- Serve local Kanit faces with font-display swap and a 900-weight preload. Runtime font-service requests are absent.
- Keep the full-resolution portrait and evidence originals; use responsive, aspect-preserving delivery images and lazy loading below the fold. The ribbons now use dedicated quality-78 WebP derivatives instead of oversized source previews or remote GIFs.
- Translate the LCP portrait into place without fading it to zero opacity. The requested visible motion is retained without an intentional image-opacity delay.
- Drive the character reveal through one Framer scroll value and a paragraph CSS custom property, avoiding hundreds of individual motion-value subscriptions.
- Keep the existing capped-resolution worker WebGL renderer, visibility suspension, static fallback and shared pause/reduced-motion handling.
- Keep mature gallery/contact behavior, Brotli/gzip responses, immutable fingerprinted-asset caching and root/subfolder metadata checks.

Remaining measured opportunities include unused client code, further image delivery savings and render-blocking CSS. Mobile LCP is about 3.3 seconds in the simulated slow-4G audit; this is not described as a perfect-performance result. Further optimisation should preserve the requested motion and real screenshots, and should be measured on the actual host after publication.

## Historical measurements — 8 October 2026


The optimized version preserves the reference-inspired design, nine animated 3D objects, scroll camera transition, grain, image effects, typography and full-resolution galleries. It improves loading and responsiveness through delivery changes and a worker renderer.

## Lighthouse comparison

Lighthouse 13.5.0 in local Chrome compares the previous version at commit `7c51c1e` with the compiled production build after the domain/social/feedback continuation, before the eight supplied FFA captures were added. Mobile uses Lighthouse's default simulated mobile/slow-4G profile and CPU slowdown; desktop uses a 1440×1000 viewport, 10 Mbps throughput, 40 ms RTT and no CPU slowdown. Audits run sequentially with fresh browser sessions. The production preview serves Brotli and the supplied cache headers; the baseline serves the original, unbundled source. These are local synthetic measurements, not production field data or a guarantee for every device/network.

| Category | Mobile before → after | Desktop before → after |
|---|---|---|
| Performance | **81 → 98** | **100 → 100** |
| Accessibility | 100 → 100 | 100 → 100 |
| Best practices | 96 → 100 | 100 → 100 |
| SEO | 91 → 100 | 91 → 100 |

| Metric | Mobile before → after | Desktop before → after |
|---|---|---|
| First contentful paint | 1.54 s → 0.76 s | 0.37 s → 0.27 s |
| Largest contentful paint | 2.68 s → 1.73 s | 0.53 s → 0.41 s |
| Total blocking time | 557 ms → 160 ms | 69 ms → 9 ms |
| Cumulative layout shift | 0.000948 → 0.000003 | 0 → 0.0000004 |
| Speed index | 2.96 s → 1.79 s | 0.75 s → 0.65 s |

Animation makes the visual-completeness speed index sensitive to capture timing; an earlier audit measured 3.08 s on mobile with the same preserved effects. Optimized mobile performance scores have been 97–98 across repeated audits; the table records the final run after the domain/social/feedback continuation. Mobile LCP improves by approximately 35%, and blocking time by approximately 71%. The scene starts after the semantic hero paints and is not disabled for the audit.

## Continued reference adaptation

A fresh sequential Lighthouse run after the FFA gallery, centred introductions, continuous grain, reading ruler and closing identity reports **97 performance / 100 accessibility / 100 best practices / 100 SEO on mobile**, and **100 in all four categories on desktop**. It uses the same profiles described above. Mobile FCP is 0.94s, LCP 1.75s, TBT 194ms and speed index 2.48s; desktop FCP is 0.34s, LCP 0.41s and TBT 9.65ms. CLS is 0.000003 on mobile and 0.000207 on desktop. These are separate current-version measurements; the earlier comparison table remains labelled with its measured revision.

The first continuation audit reported a startup forced layout. The scene now receives exact dimensions through its ResizeObserver entry before starting the renderer, the reading ruler batches geometry reads before style writes, and the already-present English copy is left intact at startup. The final audit no longer flags forced reflow. Animation timing and machine load still affect synthetic scores; effects remain enabled in the audit.

## Transfer measurements

A separate Playwright cold-load capture uses desktop 1440×1000 and mobile 390×844 viewports at DPR 1. Resource-body bytes are measured two seconds after load, excluding the main HTML document. A second capture requests all lazy images; it does not open the full-original galleries. Worker-internal resources are outside the page observer; the worker is bundled into its entry file.

| Page resource bodies | Mobile before → after | Desktop before → after |
|---|---|---|
| Initial bytes | 185,275 → 74,961 | 185,292 → 74,974 |
| Initial requests | 14 → 8 | 14 → 8 |
| After loading page previews | 1,040,975 → 364,967 | 1,043,930 → 419,411 |

Initial observed resource bytes fall by about **60%**. Loading all page previews costs about **65% less on mobile** and **60% less on desktop**. These totals differ from complete HTTP transfer sizes and intentionally exclude original images requested only when opening a gallery.

After adding the eight supplied FFA previews and replacing its logo, a fresh capture under the same Playwright setup measures initial resource bodies of **75,241 bytes on mobile** and **75,254 on desktop**, still eight initial requests. Loading every page preview now totals **438,739 bytes on mobile** and **493,183 on desktop**. This is approximately 58% and 53% below the baseline, respectively. The full-resolution FFA files are absent from the initial/page-preview requests and load only on gallery selection. These newer transfer measurements do not constitute a new Lighthouse audit.

## Changes

- AVIF/WebP project previews at 320, 640 and 960 pixels; explicit full-original gallery sources; small avatar and portrait derivatives; smaller official Mirakl wordmark.
- Local fonts, one minified stylesheet and main script bundle, hashed assets and Brotli/gzip copies. The build has 99 fingerprinted media/font assets, including the social cover and eight FFA full-size/thumbnail pairs. The initial page does not download all of them.
- WebGL compilation/rendering in an OffscreenCanvas worker, with shared-renderer and static-SVG fallbacks. Adaptive geometry, pixel ratio and frame rate retain the same lighting, objects and interactions.
- Reused render buffers, coalesced pointer updates, lazy decorative setup, compositor-based grain and offscreen project layout where supported.
- Paused, reduced-motion, hidden and offscreen rendering stops. Returning to the hero while paused restores the camera without restarting the animation clock.
- Reserved hero/control space, correct logo aspect ratios and a crawlable original-image link.

## Reproduce and publish

```sh
npm ci
npm run build
npm run preview
```

Audit `http://127.0.0.1:4175/` with Lighthouse. Publish the contents of `dist/`; use the supplied `_headers` where supported, or configure equivalent compression, correct MIME types, no-cache HTML and one-year immutable caching for fingerprinted assets. Precompressed `.br`/`.gz` files require hosting support and must not be linked as application assets. GitHub Pages and other static hosts may apply their own caching/compression rules.

The user-confirmed `https://saadbayahia.com/` is stored in `site.config.json`; production canonical/social/structured-data URLs and the sitemap use it automatically. A branded local 1200×630 JPEG cover is included. An explicit `SITE_URL` overrides the configured address for root/subfolder hosting; an empty value omits public metadata for local previews. `npm run test:build` verifies this configuration and restores the configured build afterward.

Remaining production work: hosting/DNS/HTTPS setup and verification of real contact delivery, sharing-image access and hosting headers after deployment. Publication treatment of the supplied FFA operational views is awaiting the owner's choice; the current new gallery is local only. See `MISSING-ASSETS.md`. There is no production deployment in this change. See `VALIDATION.md` for the recorded 394 checks, twelve responsive layouts and sixteen automated accessibility audit scenarios; 236 checks were rerun for the Deadwater continuation.

## Compact horizontal galleries

FFA, LeadHunt, SecoursNow and Career Ops use native horizontal rails. Geometry is measured through ResizeObserver only near the viewport, retaining offscreen skipped layout; wheel handlers use cached offsets and counter/progress writes are coalesced into animation frames. No extra pinned scroll spacer or animation library is added. The 14 landscape screenshot pairs expose responsive small/720px previews; full-size originals remain viewer requests. The current build includes 99 fingerprinted assets because both preview sizes are retained.

Measured at the same English/reduced-motion settings with fonts loaded and all project layout settled:

| Width | Previous page height | Horizontal galleries | Reduction |
|---|---|---|---|
| 1440px | 9,557px | 8,742px | 815px / 8.5% |
| 390px | 13,188px | 11,562px | 1,626px / 12.3% |

The final sequential Lighthouse run after bounded measurement, responsive previews and compiled-request correction reports **95 performance / 100 accessibility / 100 best practices / 100 SEO on mobile**, and **100 / 100 / 100 / 100 on desktop** under the previously described local profiles. Mobile FCP is 0.76s, LCP 1.73s, TBT 172ms and speed index 3.95s. Desktop FCP is 0.28s, LCP 0.47s and TBT 57.3ms. No missing source-module/stylesheet requests remain. Synthetic animation timings continue to vary; no effects are suppressed for the audit.

Fresh page-resource measurements using the same DPR-1 setup are retained in the companion local `performance-horizontal-optimized.json` report. Both preview sizes are served according to screen size; forcing all lazy page previews does not open the full-original viewer. The added operational evidence remains local while publication treatment is pending.

| Current page resource bodies | Initial bytes / requests | All page previews |
|---|---|---|
| desktop | 77,283 / 8 | 755,298 bytes |
| mobile | 77,270 / 8 | 457,860 bytes |

These are encoded page-resource bodies excluding the main HTML and worker-internal resources, not total HTTP transfer sizes. All page previews are forced eager only in this measurement; the website uses lazy loading.

## Enriched profile — current local build

The imported portfolio content adds ten native disclosures and 95 French copy entries without another animation library or screenshot asset. The existing minified delivery, lazy galleries, worker renderer and shared motion controls remain. Main bundle sizes are 58,771 bytes of CSS and 45,369 bytes of JavaScript before transport compression. The page-height comparison above describes the preceding horizontal-gallery revision; it is not a new measurement of the enriched page.

A single fresh sequential Lighthouse run on the current `http://127.0.0.1:4175/` build on 8 October 2026 reports:

| Profile | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT |
|---|---|---|---|---|---|---|---|
| Mobile | 98 | 100 | 100 | 100 | 0.76s | 1.73s | 133ms |
| Desktop | 100 | 100 | 100 | 100 | 0.31s | 0.44s | 13.5ms |

Mobile speed index is 2.78s and desktop 0.69s; CLS is below 0.000003 in both profiles. Companion reports are `lighthouse-content-enriched-{mobile,desktop}.json/html` outside the repository. These are synthetic local measurements with animations active, using the same profiles as the preceding run; timing/score differences do not establish an improvement caused by copy enrichment. Hosting and real-user performance remain unmeasured.

## Deadwater-inspired typography and interaction

Humane Medium adds one unmodified 37,632-byte local WOFF2; there are now 100 fingerprinted assets. The project index reuses existing previews, requests only the selected desktop image and avoids loading its hidden image through phone focus. Title masks run inside the existing reveal controller; preview animation uses native Web Animations with cancellation and no continuous scroll loop. No extra animation dependency is introduced.

One sequential local Lighthouse run with effects active reports **96 / 100 / 100 / 100** on mobile and **100 / 100 / 100 / 100** on desktop (performance / accessibility / best practices / SEO). Mobile FCP is 1.06s, LCP 1.88s, TBT 199ms and speed index 2.94s. Desktop FCP is 0.32s, LCP 0.45s and TBT 14ms. CLS remains below 0.000003. Reports are `lighthouse-deadwater-{mobile,desktop}.json/html`. The later phone-only preview guard does not change the audit's initial-load path. These synthetic timings vary and do not measure production hosting or real-user experience; earlier scores above describe their respective revisions.
