# Performance — 8 October 2026

The optimized version preserves the reference-inspired design, nine animated 3D objects, scroll camera transition, grain, image effects, typography and full-resolution galleries. It improves loading and responsiveness through delivery changes and a worker renderer.

## Lighthouse comparison

Lighthouse 13.5.0 in local Chrome compares the previous version at commit `7c51c1e` with the compiled production build. Mobile uses Lighthouse's default simulated mobile/slow-4G profile and CPU slowdown; desktop uses a 1440×1000 viewport, 10 Mbps throughput, 40 ms RTT and no CPU slowdown. Audits run sequentially with fresh browser sessions. The production preview serves Brotli and the supplied cache headers; the baseline serves the original, unbundled source. These are local synthetic measurements, not production field data or a guarantee for every device/network.

| Category | Mobile before → after | Desktop before → after |
|---|---|---|
| Performance | **81 → 97** | **100 → 100** |
| Accessibility | 100 → 100 | 100 → 100 |
| Best practices | 96 → 100 | 100 → 100 |
| SEO | 91 → 100 | 91 → 100 |

| Metric | Mobile before → after | Desktop before → after |
|---|---|---|
| First contentful paint | 1.54 s → 0.76 s | 0.37 s → 0.27 s |
| Largest contentful paint | 2.68 s → 1.73 s | 0.53 s → 0.41 s |
| Total blocking time | 557 ms → 168 ms | 69 ms → 12 ms |
| Cumulative layout shift | 0.000948 → 0.000003 | 0 → 0.0000004 |
| Speed index | 2.96 s → 3.08 s | 0.75 s → 0.66 s |

Animation makes the visual-completeness speed index sensitive to capture timing; its mobile value did not improve. Mobile LCP improves by approximately 35%, and blocking time by approximately 70%. The scene starts after the semantic hero paints and is not disabled for the audit.

## Transfer measurements

A separate Playwright cold-load capture uses desktop 1440×1000 and mobile 390×844 viewports at DPR 1. Resource-body bytes are measured two seconds after load, excluding the main HTML document. A second capture requests all lazy images; it does not open the full-original galleries. Worker-internal resources are outside the page observer; the worker is bundled into its entry file.

| Page resource bodies | Mobile before → after | Desktop before → after |
|---|---|---|
| Initial bytes | 185,275 → 74,543 | 185,292 → 74,556 |
| Initial requests | 14 → 8 | 14 → 8 |
| After loading page previews | 1,040,975 → 364,549 | 1,043,930 → 418,993 |

Initial observed resource bytes fall by about **60%**. Loading all page previews costs about **65% less on mobile** and **60% less on desktop**. These totals differ from complete HTTP transfer sizes and intentionally exclude original images requested only when opening a gallery.

## Changes

- AVIF/WebP project previews at 320, 640 and 960 pixels; explicit full-original gallery sources; small avatar and portrait derivatives; smaller official Mirakl wordmark.
- Local fonts, one minified stylesheet and main script bundle, hashed assets and Brotli/gzip copies. The build has 68 fingerprinted media/font assets. The initial page does not download all of them.
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

Remaining production work: confirm the final public URL for canonical/social/structured-data URLs, provide a branded sharing cover, and verify real contact delivery and hosting headers after deployment. See `MISSING-ASSETS.md`. There is no production deployment in this change. See `VALIDATION.md` for 174 checks, twelve responsive layouts and eight automated accessibility audits.
