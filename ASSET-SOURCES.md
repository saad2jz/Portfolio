# Project media sources

## Expanded header toolkit — 10 October 2026

The current header uses 24 software tools selected for the owner's product, commerce, automation and data profile. `assets/tool-medallions.png` contains 512px cells on a 3072×2048 texture (218,603 bytes). FFA/Cardiag, supplier/provider marks, standards and method badges are removed from the header selection; project and education content remain unchanged. Power BI reuses the sourced school-module mark in `assets/logos/powerbi.svg`; Stripe is rasterized from the [Simple Icons 16.1.0 geometry](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/stripe.svg) in `assets/hero-tools/stripe.svg`. Existing full-resolution tool cells are preserved, and new marks have transparent padding. Registry order and tints live in `hero-toolkit.json`. The parent-workspace asset script is `work/curate-header-tools.cjs`; its original atlas/registry backups stay in `work/`.

`assets/hero-tools/ffa.webp` uses the owner's 1400px supplied FFA logo (`codex-clipboard-8c6214af-98a9-470f-acdd-a25b711cdb12.png`), resized proportionally to 768px. `assets/hero-tools/cardiag.webp` uses the owner's supplied white-car/orange-pulse logo (`codex-clipboard-3d2a5424-07c5-4b24-ab52-e737745b9f21.png`), resized proportionally to 1200px. Both are lossless WebP derivatives, preserve their colours and remain in the corresponding project/employer titles. They are no longer used in the header atlas or static fallback. No logo is generated or redrawn.

Simple Icons is the source project for the software marks below ([repository](https://github.com/simple-icons/simple-icons), CC0 catalogue; brand rights remain with their respective owners). Apify uses the mark from its own website. Download URLs are pinned where available; no external image requests are made during page use.

| Mark | Source |
|---|---|
| Cisco | [cisco](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/cisco.svg) |
| AWS | [amazonaws](https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/amazonaws.svg) |
| SAP | [sap](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/sap.svg) |
| Google Ads | [googleads](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/googleads.svg) |
| Meta Ads | [meta](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/meta.svg) |
| Semrush | [semrush](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/semrush.svg) |
| Trello | [trello](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/trello.svg) |
| Python | [python](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/python.svg) |
| MySQL | [mysql](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/mysql.svg) |
| Java | [openjdk](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/openjdk.svg) |
| Brevo | [brevo](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/brevo.svg) |
| C++ | [cplusplus](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/cplusplus.svg) |
| JavaScript | [javascript](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/javascript.svg) |
| HTML | [html5](https://cdn.jsdelivr.net/npm/simple-icons@16.1.0/icons/html5.svg) |
| CSS | [css3](https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/css3.svg) |
| Microsoft Office | [microsoftoffice](https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/microsoftoffice.svg) |
| Apify | [apify](https://apify.com/img/apify-logo/wordmark-white.svg) |

## Cardiag product captures — 10 October 2026

Five owner-supplied screenshots in `C:/Users/Utilisateur/Pictures/Screenshots` replace all three older Cardiag promotional illustrations in the current card and its two scrolling ribbon slots. Original source files remain unchanged. Native-size lossless WebP originals match the PNGs pixel for pixel; 360px and 720px WebP previews preserve aspect ratio and are used for display. No generated screen, retouching or replacement UI is used.

| Source filename | Local original | Dimensions |
|---|---|---|
| `Capture d'écran 2026-10-10 113937.png` | `assets/cardiag-diagnostic.webp` | 904 × 934 |
| `Capture d'écran 2026-10-10 113815.png` | `assets/cardiag-makes.webp` | 790 × 939 |
| `Capture d'écran 2026-10-10 113728.png` | `assets/cardiag-faults.webp` | 924 × 946 |
| `Capture d'écran 2026-10-10 113602.png` | `assets/cardiag-owner.webp` | 1681 × 942 |
| `Capture d'écran 2026-10-10 113337.png` | `assets/cardiag-health.webp` | 1807 × 943 |

Owner, vehicle condition and diagnosis appear in the collage; makes and recurring faults use the native horizontal rail. The gallery opens all five full originals. Old Cardiag artwork stays in source history but is absent from current production references. No exported PDF was supplied or fabricated.

## Personal identity assets — 10 October 2026

- `assets/tool-medallions.png` is a local 2048×2048, 168,526-byte transparent atlas derived from the existing attributed toolkit/ecosystem logos: Shopify, n8n, HubSpot, GitHub, Mirakl, Erplain, Colissimo, Pennylane, Gemini, Hunter.io, Apollo, LinkedIn, Kaspr, Stripe and Cloudflare. Marks keep their original shapes in a pale monochrome treatment. Each occupies one of fifteen padded 512px tiles in a 4×4 atlas. One texture and one shared bevelled mesh replace the generic embossed symbols; source logo files are unchanged. Atlas derivatives remove the white/yellow/purple logo tile backgrounds before the monochrome treatment; per-tool medal colours supply the visual accents. Brand appearances identify the owner's toolkit, not partnerships or verified live API credentials.
- Local variable font subsets come from Fontsource Variable 5.3.0: [Space Grotesk](https://fontsource.org/fonts/space-grotesk) and [DM Sans](https://fontsource.org/fonts/dm-sans). Their four Latin/extended Latin WOFF2 files total 96,388 bytes. Full OFL texts are saved as `assets/fonts/SpaceGrotesk-OFL.txt` and `DMSans-OFL.txt` and copied to production. Font tooling stays outside the deliverable; the build does not depend on a font CDN or an additional runtime package.
- The owner's existing portrait and its responsive derivative are unchanged image files. CSS removes grayscale/masking, adds a subdued saturation adjustment and frames the photograph; no face alteration, generated portrait or background replacement is used.
- The source-backed travel map now uses the shared teal for its same 36 visited-country highlights. Geometry and destination records are unchanged. New depth effects are original Framer/native Web Animations/CSS code, informed by the public [MotionSites catalogue](https://motionsites.ai/). No paid template, GIF, video or external 3D model is included.

## Profile map — 10 October 2026

`assets/travel-world.svg` adapts the rendered map on [Saad's original portfolio](https://www.saadbayahia.com/). The source uses [world-atlas countries-110m](https://github.com/topojson/world-atlas), derived from Natural Earth, with a Natural Earth projection. [Natural Earth geography is public domain](https://www.naturalearthdata.com/about/terms-of-use/). The new local SVG preserves 177 country geometries and the source's 36 visited-country highlights; coordinates are rounded to one decimal place and colours match the current theme. It contains no scripts or external references. The complete bilingual destination list is in `src/travel.json`; the extraction snapshot stays outside the deliverable at `work/travel-map-source-20261010.json` in the parent workspace.

Other new illustrations are native CSS rings and existing Lucide icons. No MotionSites preview, portrait, generated travel photograph or external video is used as portfolio evidence.

Retrieved/captured on 8 October 2026. These files identify Saad's own projects and the FFA case study. Project logos retain their source colours. The requested toolkit band displays vendor logos in monochrome through CSS, while preserving their original shapes. No reference-site logos or 3D models were copied.

| Local asset | Origin | What the image shows |
|---|---|---|
| `assets/logos/ffa.webp` | FFA logo supplied by Saad on 8 October 2026, clipboard `8c6214af-98a9-470f-acdd-a25b711cdb12` | Transparent 1400 × 1400 source resized to 160 × 160 with lossless WebP encoding. Replaces the earlier official-site derivative. |
| `assets/ffa-products.webp` | [Official FFA photograph](https://ffaperitif.com/cdn/shop/files/coffret-cadeau-aperitif-ffa.webp?v=1762161579&width=1600) | An actual gift-box product photograph from the storefront, resized to 1200 × 1200 and compressed as WebP. This is not a storefront screenshot. |
| `assets/logos/cardiag.svg` | Saad's `Cardiag` repository, `assets/logo.svg` | Original SVG brand asset, unchanged. |
| `assets/cardiag-inspection.webp` | Saad's `Cardiag` repository, `assets/landing/cardiag-inspection.webp` | Original presentation artwork, unchanged, 1344 × 768. This is not a rendered vehicle-sheet or report screenshot. |
| `assets/logos/secoursnow.svg` | Saad's `secoursnow` repository, `apps/mobile/public/icon.svg` | Original application icon, unchanged. |
| `assets/logos/rencontre.svg` | Saad's `rencontre` repository, `public/favicon.svg` | Original application/favicon mark, unchanged. |
| `assets/logos/career-ops.svg` | Saad's `career-ops-workspace` repository, `public/favicon.svg` | Original application/favicon mark, unchanged. The project is an adaptation and retains its upstream attribution. |
| `assets/leadhunt-agents.webp` | Screenshot supplied by Saad on 8 October 2026 | Authenticated AI agent hub, 1909 × 943. |
| `assets/leadhunt-copilot.webp` | Screenshot supplied by Saad on 8 October 2026 | Contextual copilot panel, 547 × 771. This is a portrait panel capture, not a mobile app screenshot. |
| `assets/leadhunt-map.webp` | Screenshot supplied by Saad on 8 October 2026 | Prospect mapping view, 1918 × 952. |
| `assets/leadhunt-integrations.webp` | Screenshot supplied by Saad on 8 October 2026 | Connector setup view, 1918 × 949. |
| `assets/leadhunt-campaigns.webp` | Screenshot supplied by Saad on 8 October 2026 | Prospecting campaigns view, 1918 × 942. |
| `assets/leadhunt-sending.webp` | Screenshot supplied by Saad on 8 October 2026 | Email sending studio with test entries, 1918 × 936. |
| `assets/leadhunt-extension.webp` | Screenshot supplied by Saad on 8 October 2026 | Chrome extension open on Saad’s own LinkedIn profile, 1918 × 1017. Browser chrome and source UI are preserved. |
| `assets/secoursnow-home.webp` | Screenshot supplied by Saad on 8 October 2026 | SecoursNow phase-one prototype: home screen, 445 × 816. |
| `assets/secoursnow-profile.webp` | Screenshot supplied by Saad on 8 October 2026 | SecoursNow phase-one prototype: profile selection, 453 × 817. |
| `assets/secoursnow-triage.webp` | Screenshot supplied by Saad on 8 October 2026 | SecoursNow phase-one prototype: triage question, 447 × 817. |
| `assets/secoursnow-tutorial.webp` | Screenshot supplied by Saad on 8 October 2026 | SecoursNow phase-one prototype: prototype tutorial, 447 × 817. |
| `assets/secoursnow-contacts.webp` | Screenshot supplied by Saad on 8 October 2026 | SecoursNow phase-one prototype: emergency contacts, 448 × 814. |
| `assets/secoursnow-help.webp` | Screenshot supplied by Saad on 8 October 2026 | SecoursNow phase-one prototype: help journey, 430 × 817. |
| `assets/career-ops-desktop.webp`, `assets/career-ops-mobile.webp` | [Career Ops access page](https://career-ops-workspace-nine.vercel.app/), captured in Chrome | Public access page, 1440 × 900 and 390 × 844. The workspace is private; no sign-in performed. |

Repository source discovery used the owner's existing authenticated GitHub session. Only the listed image assets were incorporated into this portfolio; private application code, configuration and credentials were not included.

The LeadHunt repository's generic framework icon was deliberately omitted as a product logo. The supplied product captures include the site's displayed identity. Their capture dates are unknown; 8 October 2026 is the date of receipt. They are converted losslessly to WebP at original dimensions, with no retouching or altered UI content. Cardiag product captures could not be obtained with usable loaded content in this session; no incomplete or blank captures are included. Seven LeadHunt views, including the Chrome extension, and eight FFA views are now supplied. Optional Kanban/contact detail views and the other projects' evidence remain in `MISSING-ASSETS.md`. Screenshots show the interface state, without independently verifying the activity/performance claims displayed inside it.

Images open at full size through standard local links. Captures preserve the actual public interface; WebP encoding changes file format, not the screen's content.

LeadHunt's six `*-thumb.webp` files are 360px-wide preview derivatives. They preserve aspect ratios and use WebP quality 88 to reduce page loading cost. Each thumbnail links to the corresponding full-resolution lossless file; the viewer explicitly loads that original. The seven full-resolution captures were compared pixel by pixel against the supplied PNGs and match exactly.

Six SecoursNow mobile captures were supplied on 8 October 2026; their capture dates are unknown. Full-resolution WebP files retain every source pixel and the original dimensions. Five 220px-wide quality-88 thumbnails are preview derivatives; each opens the corresponding full original. The visible demonstration notices, prototype status and emergency-service information remain part of the actual screenshots. These captures document the prototype interface, not medical validation, deployment or emergency-service integration. No screenshot content was retouched.

## FFA captures and supplied logo — local review

Received on 8 October 2026. Dates embedded in filenames are not independently verified capture dates. Eight complete screenshots were converted to lossless WebP at their original dimensions and compared pixel by pixel with the supplied PNGs; the current local copies match exactly. Their `*-thumb.webp` previews are aspect-preserving 360px-wide WebP derivatives at quality 88. Only the previews load with the page; the viewer requests the full-resolution file when opened.

| Asset | Supplied source | Dimensions |
|---|---|---|
| `assets/ffa-storefront.webp` | Clipboard `56716f23-f1da-4bcf-8b24-b2729e77bcee` — Shopify storefront and assistant widget | 1918 × 894 |
| `assets/ffa-dashboard.webp` | `Capture d'écran 2026-08-30 144509.png` — Erplain dashboard | 1918 × 898 |
| `assets/ffa-b2b.webp` | `Capture d'écran 2026-08-30 140928.png` — Erplain B2B | 1918 × 901 |
| `assets/ffa-astore.webp` | `Capture d'écran 2026-08-30 141230.png` — Astore/Mirakl dashboard | 1918 × 894 |
| `assets/ffa-ankorstore.webp` | `Capture d'écran 2026-08-30 140704.png` — Ankorstore brand page | 1918 × 897 |
| `assets/ffa-kvist.webp` | `Capture d'écran 2026-08-30 140536.png` — Kvist catalogue | 1918 × 1014 |
| `assets/ffa-inbox.webp` | Clipboard `47406338-06b5-44af-a796-9d61dac6ad09` — AI support inbox | 1918 × 1078 |
| `assets/ffa-conversation.webp` | Clipboard `c70e4412-23a5-4c4c-9b86-8f465b3c992a` — AI support conversation | 1919 × 1041 |

The six operational captures show customer/account fields, order identifiers or internal amounts. Their publication treatment is awaiting the owner's choice. The new gallery remains local; these assets have not been pushed to GitHub or included in updated public delivery archives. Original PNGs remain in the user's supplied directories, outside the repository.

`assets/logos/ffa.webp` now uses the supplied clipboard `8c6214af-98a9-470f-acdd-a25b711cdb12` logo: a lossless 160 × 160 WebP derivative of the 1400 × 1400 transparent PNG (15,776 bytes). It preserves the identity and transparency. The original gift-box photograph remains the primary project image, followed by this dedicated eight-capture gallery; the workflow diagram remains labelled as an illustration.

## Connected toolkit — official brand assets

Retrieved on 8 October 2026 for the user-requested logo band. Erplain appears once. This is labelled as Saad’s toolkit, rather than a customer or endorsement list. Each logo links to its official vendor site; GitHub links to Saad’s profile.

| Local asset | Official origin | Treatment |
|---|---|---|
| `assets/toolkit/shopify.svg` | [Shopify brand assets](https://www.shopify.com/brand-assets), `shopify-logo-monotone-white-7edf88561b256e005e9b9d003c283c39dcbd74ec844dfc9a3912edeec39b4d7e.svg` from its CDN | Official monotone white logo, unchanged. |
| `assets/toolkit/n8n.svg` | [n8n](https://n8n.io/), inline navigation wordmark | Original path geometry; site-only attributes removed and an explicit white fill supplies the navigation’s CSS colour in a standalone SVG. |
| `assets/toolkit/mirakl.svg` | [Mirakl logo](https://www.mirakl.com/media/logos/mirakl/mirakl-logo.svg) | Original SVG, unchanged. |
| `assets/toolkit/hubspot.svg` | [HubSpot](https://www.hubspot.com/), inline data-URI navigation logo | Original SVG decoded without changing its geometry. |
| `assets/toolkit/erplain.webp` | [Erplain](https://www.erplain.com/en), `6273963f5466bb22c8036e9a_Erplain%20Logo%20Small.png` on its Webflow CDN | Transparent padding trimmed, resized to 420px wide and losslessly encoded as WebP. |
| `assets/toolkit/github.svg` | [GitHub brand toolkit](https://brand.github.com/foundations/logo), `GitHub_Logos.zip` → `GitHub Logos/SVG/GitHub_Lockup_White.svg` | Official white lockup, unchanged. |
| `assets/toolkit/colissimo.svg` | [Colissimo navigation logo](https://www.colissimo.entreprise.laposte.fr/themes/custom/pc_theme/colissimo.svg) | Original SVG, unchanged. |
| `assets/toolkit/pennylane.webp` | [Pennylane white logo](https://www.pennylane.com/_nuxt/logo-white.BdAS5uKh.png) | Transparent padding trimmed, resized to 420px wide and losslessly encoded as WebP. |

The band uses `brightness(0) invert(1)` only for its on-page monochrome presentation. Original shape and aspect ratio are retained; the screenshots elsewhere retain their source pixels. Screenshot hover uses a temporary zoom, desaturation and decorative clipped strips; the image viewer loads the original without those effects. The shared grain in `assets/page-grain.svg` is an original SVG noise filter, not a downloaded Matveyan texture.

## Local typography

Inter was retrieved on 8 October 2026 from the [Google Fonts Inter stylesheet](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap). Its original variable WOFF2 files are served without altering their contents:

- `assets/fonts/inter-latin.woff2`: [original Latin subset](https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2), 48,256 bytes.
- `assets/fonts/inter-latin-ext.woff2`: [original Latin-extended subset](https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2), 85,068 bytes.
- `assets/fonts/OFL.txt`: [original SIL Open Font License](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt), included with the font.

`fonts.css` retains the source Unicode ranges and exposes the used 300–700 weight range. Only the Latin subset is preloaded; the extended subset loads when needed. No Google Fonts runtime request remains in either HTML entry point.

## Responsive delivery derivatives

Created locally on 8 October 2026 from the existing assets; no replacement or retouching of screenshot content:

- `ffa-products-{320,640,960}.{avif,webp}`, `leadhunt-agents-{320,640,960}.{avif,webp}` and `cardiag-inspection-{320,640,960}.{avif,webp}` are aspect-preserving preview derivatives. AVIF uses quality 70 with 4:4:4 chroma; WebP uses quality 88. The browser chooses the appropriate width and supported format. These lossy previews are not pixel-identical to their sources; full-image links and the viewer retain the original files, including lossless supplied screenshots.
- `saad-avatar.webp` is a 120×120 attention crop of the existing portrait, WebP quality 85, for the small hero avatar. `saad-portrait-420.webp` is a 420px-wide quality-88 derivative for the biography. The original portrait remains available.
- `assets/toolkit/mirakl.webp` is a transparent, 360px-wide lossless rasterization of the unchanged official `mirakl.svg`. It preserves the wordmark proportions and reduces the delivered logo from 119,672 to 9,262 bytes. The original SVG remains in the source repository.

Production fingerprints only rename copied assets for caching. They do not change their pixels or file contents. Font licensing and original-media provenance remain as documented above.

## Branded social cover

`assets/og-cover.jpg` was rendered locally on 8 October 2026 from the editable `social-cover.html` composition at exactly 1200×630 pixels, JPEG quality 92 (67,653 bytes). It reuses the portfolio's original `product-orbit.svg` copper-object illustration, personal monogram, existing avatar and local Inter font. Embedded template assets keep it editable and self-contained. The artwork is a portfolio sharing cover, not a product screenshot; no project evidence was altered. Only the JPEG is copied to production, with an absolute URL under the user-confirmed domain.

## Horizontal capture-rail derivatives

Created locally on 8 October 2026 from the existing full supplied screenshots: eight `ffa-*-reel.webp` files and six `leadhunt-{copilot,map,integrations,campaigns,sending,extension}-reel.webp` files. Each is resized to at most 720px wide without enlargement, preserving its aspect ratio, and encoded at WebP quality 88. The copilot remains 547px wide. These lossy display derivatives replace the small landscape thumbnail references in the horizontal rails; the native-size lossless originals, linked by `data-full-src` and `href`, remain unchanged. SecoursNow keeps its existing portrait derivatives. No generated UI, retouching or masking is applied. The operational FFA assets remain local pending the existing publication choice.

The horizontal screenshot previews also reference their existing small thumbnail derivatives through `srcset`, with accurate file widths and responsive `sizes`. A narrow DPR-1 screen chooses the small derivative; wider/high-density screens can choose the larger rail preview. All source files retain the same original-image links.

## Humane display webfont — Deadwater inspiration

Inspected [Deadwater](https://www.deadwater.fr/) on 8 October 2026. Its display font is Humane V2 Medium (500), by Rajesh Rajput; body copy is Inter. `assets/fonts/humane-medium.woff2` is the unmodified 37,632-byte webfont served by the reference at `https://www.deadwater.fr/_astro/fonts/49bcf9504c41e9b4.woff2`. The embedded name table identifies version 2.000, the author and its freeware license allowing personal and commercial projects. The license text is preserved in `assets/fonts/Humane-LICENSE.txt` and copied to production; font bytes are not subsetted or converted.

Author distribution and commercial/personal-use statement: [Humane V2](https://rajputrajesh-448.gumroad.com/l/Humane999), [author announcement](https://rajputrajesh-448.gumroad.com/p/introducing-humane-v-2-0-bigger-bolder-better). This is a site webfont, not a separately distributed font product. French accents are present in its character map. Existing Inter and its OFL license remain. No Deadwater project images, branding or site scripts are imported; interactive previews reuse Saad's existing media and the behaviors are independently implemented.

## Creator revision assets — 9 October 2026

- `assets/cardiag-workshop.webp` and `assets/cardiag-bodywork.webp` are unchanged presentation artwork from Saad’s Cardiag repository (`assets/landing/hero-bg.webp` and `assets/landing/compare-before.webp`). The source repository is private; no public code link is implied. These depict a workshop and a stylised bodywork inspection, not validated application screens or diagnostic results. The additional 360/960-labelled WebP previews preserve aspect ratio, do not enlarge smaller sources and use quality 82. The full originals remain available in the gallery.
- `assets/logos/ansys.webp` derives from the [official Ansys brand logo](https://ansys.synopsys.com/content/dam/company/brand/logos/ansys-logos/ansys-logo.jpg), discovered through the official site’s structured metadata. Only white border trimming and an aspect-preserving 320px resize were applied, WebP quality 90. It identifies the labelled hackathon proposal, without implying employment or endorsement.
- `assets/fonts/kanit-{300,400,500,600,700,800,900}.woff2` are Latin WOFF2 faces from `@fontsource/kanit` 5.3.0, corresponding to [Google Fonts Kanit](https://github.com/google/fonts/tree/main/ofl/kanit). `Kanit-OFL.txt` preserves the SIL Open Font License. Fonts are local; the requested weights are available without runtime font-service requests.
- `assets/creator-ribbon-{1..8}-{360,720}.webp` are quality-78, aspect-preserving, non-enlarged delivery derivatives of existing FFA product photography, LeadHunt agents/map, Cardiag workshop/bodywork artwork, FFA storefront/Ankorstore and SecoursNow home capture. They are decorative ribbon previews, not substitute evidence. The corresponding full original files and existing gallery links remain unchanged. Responsive srcsets describe actual output widths.

The current page uses Saad’s existing portrait and authentic portfolio images instead of the prompt’s unrelated remote portrait, GIFs or sample projects. Earlier Inter/Humane provenance remains historical; Kanit is the current page face.

## Project ecosystem marks — 9 October 2026

Seventeen additional brand assets support visible, named project links. They identify tools or external services in context, without suggesting employment, endorsement or an active partnership. Existing GitHub artwork is reused for Career Ops.

| Local file | Source |
|---|---|
| `assets/ecosystems/hunter.webp` | [Vendor-hosted asset](https://hunter.io/assets/touch-icon-iphone-retina-toekunmu.png) |
| `assets/ecosystems/apollo.svg` | [Vendor-hosted asset](https://www.apollo.io/icon.svg?icon.11df6mby0rn6l.svg) |
| `assets/ecosystems/kaspr.webp` | [Vendor-hosted asset](https://www.kaspr.io/hubfs/2023%20-%20Kaspr%20Brand%20Logos/favicon.png) |
| `assets/ecosystems/linkedin.svg` | [Vendor-hosted asset](https://static.licdn.com/aero-v1/sc/h/8fkga714vy9b2wk5auqo5reeb) |
| `assets/ecosystems/carvertical.svg` | [Vendor-hosted asset](https://www.carvertical.com/logo.svg?dpl=dpl_GxxCjjk7tUkAshXgwGxAquBHLoQz) |
| `assets/ecosystems/stripe.svg` | [Vendor-hosted asset](https://images.stripeassets.com/fzn2n1nzq965/1hgcBNd12BfT9VLgbId7By/01d91920114b124fb4cf6d448f9f06eb/favicon.svg) |
| `assets/ecosystems/telegram.svg` | [Vendor-hosted asset](https://telegram.org/img/website_icon.svg?4) |
| `assets/ecosystems/gemini.webp` | [Vendor-hosted asset](https://www.gstatic.com/lamda/images/gemini_sparkle_4g_512_lt_f94943af3be039176192d.png) |
| `assets/ecosystems/firebase.webp` | [Vendor-hosted asset](https://www.gstatic.com/devrel-devsite/prod/v097103d8ccd7b257790809ea4cc5e5fee6daa6e24890a4af388296e58364bc31/firebase/images/touchicon-180.png) |
| `assets/ecosystems/resend.webp` | [Vendor-hosted asset](https://resend.com/static/favicons/favicon-marketing@120x120.png?v=1) |
| `assets/ecosystems/expo.webp` | [Vendor-hosted asset](https://static.expo.dev/static/brand/app-icon-512x512.png) |
| `assets/ecosystems/ollama.webp` | [Vendor-hosted asset](https://ollama.com/public/ollama-nav.png) |
| `assets/ecosystems/autodoc.webp` | [Vendor-hosted asset](https://autodoc.group/wp-content/uploads/2025/08/logo.webp) |
| `assets/ecosystems/cloudflare.svg` | [Vendor-hosted asset](https://www.cloudflare.com/img/logo-cloudflare-dark.svg) |
| `assets/ecosystems/turso.webp` | [Vendor-hosted asset](https://turso.tech/logokit/turso-logo-aqua.png) |
| `assets/ecosystems/ovoko.webp` | [Third-party cached site favicon](https://icons.duckduckgo.com/ip3/ovoko.fr.ico) |
| `assets/ecosystems/oscaro.webp` | [Third-party cached site favicon](https://icons.duckduckgo.com/ip3/oscaro.com.ico) |

SVG geometry is preserved. Raster icons are converted to compact, aspect-preserving WebP files; larger wordmarks are limited to 320px and most icons to 128px. Oscaro and Ovoko storefront asset requests were blocked; these two are genuine site favicons obtained through DuckDuckGo's favicon cache and are explicitly third-party cached sources, rather than direct official downloads. They are displayed as small icons alongside readable names. No logo was generated or redrawn. Assets are local, lazily loaded, dimensioned and fingerprinted in production.

## Unified-card rendering — 9 October 2026

Existing project and brand assets are reused. The new workflow visual panels are repository-authored HTML/CSS diagrams based on documented project flows; they are explicitly labelled illustrations and introduce no generated screenshots. Contextual logo rows use CSS and inline SVG colour/alpha filters for monochrome rendering, including background removal on opaque source icons. Vendor files and all full-resolution project originals remain unchanged. The additional Gemini placement on Cardiag reuses the existing locally sourced Gemini mark.

## Education marks — 10 October 2026

Five institutional marks use the same local, lazy-loaded, dimensioned monochrome row as the projects. No institutional logo is generated or redrawn. Raster files are trimmed and resized proportionally into lossless WebP; the UIR transparent monochrome variant avoids a rectangular background.

| Local asset | Original source |
|---|---|
| `assets/logos/kedge.svg` | [Official KEDGE SVG](https://etudiant.kedge.edu/asset/download/154681/svg/logo-kedgebs-2022.svg) |
| `assets/logos/isen.webp` | [Official ISEN PNG](https://isen-mediterranee.fr/wp-content/uploads/2022/08/ISEN-logo2-Q3.png) |
| `assets/logos/uir.webp` | [Official UIR transparent monochrome mark](https://www.uir.ac.ma/assets/_resources/img/mono-logo.png) |
| `assets/logos/nantes.webp` | [Official Nantes Université PNG](https://www.univ-nantes.fr/uas/institutionnel/LOGO/NantesUniversite.png) |
| `assets/logos/franche-comte.webp` | [Historical university icon hosted by its Centre Lucien Febvre](https://centre-lucien-febvre.univ-fcomte.fr/wp-content/uploads/2024/07/ico_ufc.png); paired with the readable abbreviation uFC, not a fabricated wordmark |
| `assets/logos/powerbi.svg` | [Simple Icons 11.15.0 Power BI](https://raw.githubusercontent.com/simple-icons/simple-icons/11.15.0/icons/powerbi.svg); the discontinued icon is retained as a historical tool mark |

AWS reuses `assets/hero-tools/amazonaws.svg` with its existing provenance. Ten subject pictograms are original inline SVG line illustrations (strategy, sales, projects, data, quality, networks and code). They label curriculum domains rather than imply vendor certification. Vendor/institution marks provide attribution, not an affiliation or endorsement claim.

Career harmonisation reuses the supplied FFA/Cardiag images in project titles and the FFA experience. The 21 experience pictograms and three neutral certification symbols are repository-authored SVG line illustrations. Shopify, Cisco and HubSpot certification rows reuse the existing sourced marks; the other subjects do not receive fabricated vendor logos or award seals. No new remote media source is introduced.
