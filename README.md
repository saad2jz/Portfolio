# Saad Bayahia — Product Owner & Digital Builder

Publication: [www.saadbayahia.com](https://www.saadbayahia.com/). GitHub Pages builds `main` automatically; see [deployment setup](DEPLOYMENT.md).

## Current structure — 15 October 2026

This section supersedes the historical revision descriptions below. Product Owner in Paris is the primary positioning; business engineering and industrial quality remain supporting expertise. The initial document is French at `/`, with a separately rendered English page at `/en/`, reciprocal hreflang, language-specific metadata and stable asset paths. Language controls navigate between documents while preserving the current fragment.

Hero/About → Selected work → Expertise → Skills → Approach (including quality-to-product methods) → three flagship case studies → collapsed other projects → independent commerce → professional experience → education → continuing development → international → compact interests → visible contact form → legal/privacy information.

FFA, LeadHunt and Cardiag share Problem / Role / Delivery / Result. The six secondary projects retain supplied technical descriptions and genuine captures in collapsed records. FFA's owner-reported −40% and zero manual-entry outcomes remain in its details with measurement context marked as pending. Later explicit owner corrections take precedence over older wording.

Confirmed chronology: ALLIANCES 2015, TGR 2016, UIR/Nantes 2012–2016, Franche-Comté 2016–2018, ISEN/KEDGE and FFA work-study 2025–2026, independent commerce since 2019. FFA role: B2B e-commerce Project Lead / Product Manager. ISO 27001 is an academic ISEN module; SAP S/4HANA Cloud Public Edition and PPL are in progress. SAP/AWS/Cisco are learning subjects rather than hero mastery medals.

Public CVs are delivered at `/cv/` and `/cv/en/` with local FR/EN PDFs. These are newly typeset public versions based on confirmed portfolio facts, without personal phone/email. `scripts/generate-public-cv.py` is optional authoring tooling; CI copies committed PDFs without Python. Edit `src/localization.ts` and `src/ecosystem-copy.json` for French; `src/copy-en.json` is generated from trusted native content during build.

Motion respects reduced-motion, manual pause and hidden tabs. Decorative WebGL starts after initial load/idle or interaction and stays static when reduced motion is active. Keyboard access, anchor navigation and refresh-to-top remain. `portfolio-focus.css` styles selected work, secondary records, the quality bridge, contact and privacy information.

CTA analytics are **prepared but inactive**, because no provider account was supplied. See [analytics setup and outstanding evidence](AUDIT-FOLLOW-UP.md). `npm run typecheck` and `npm run test:build` validate both languages, PDFs, assets, root/subfolder deployments and unconfigured previews.

Client startup uses the language already rendered in the document instead of loading another English-copy dictionary and rewriting metadata. French build/hydration imports only the French ecosystem copy. This removes about 60 KB of uncompressed JavaScript; source content, captures and PDFs remain unchanged. Decorative WebGL waits for portrait decoding, font readiness and a paint opportunity, while direct input can start it immediately. A saved pause exposes Resume after reloading, even before WebGL exists. Contact errors now point to the visible Calendly option instead of an email that is no longer displayed.

A separate adaptation of [`saad2jz/Portfolio`](https://github.com/saad2jz/Portfolio), initially cloned from `main` at `5a69054`. The 10 October personalisation refines the creator composition around Saad’s product, e-commerce, B2B and engineering profile: local Space Grotesk/DM Sans typography, ivory/teal accents, a colour portrait and real tool logos in WebGL.

## Run locally

Use Node.js 20.19+ or 22.12+, as required by the installed Vite release.

```sh
npm ci
npm run build
npm run dev
```

Vite serves the editable React/TypeScript app at `http://127.0.0.1:4174/`. The initial build generates the HTML entry points and Tailwind stylesheet. For the compiled production preview:

```sh
npm run build
npm run preview
```

Open `http://127.0.0.1:4175/`. The production build renders the page’s semantic HTML before hydration, bundles the client, fingerprints assets, and writes Brotli/gzip copies. Native links, disclosures, original-image links and the form’s HTML action remain usable without JavaScript.

## Edit the page

| Source | Purpose |
|---|---|
| `src/App.tsx` | React sections, bilingual new copy, magnetic portrait, ribbons, text reveals and stacking cards |
| `src/content.json` | Trusted repository-owned HTML for retained case studies, galleries and contact, plus bilingual project index labels |
| `src/journey.json` | Seven professional experiences, four education paths and six certification/continuing-education records |
| `project-layout.js` | Shared card-height observer; only cards that fit below navigation retain sticky stacking |
| `src/ExtensionSections.tsx`, `extensions.css` | Product methodology, international profile and interests, with shared motion preferences |
| `src/travel.json`, `assets/travel-world.svg` | The 36 owner-listed destinations and a local, pre-rendered world map |
| `src/main.tsx`, `src/render.tsx` | Browser hydration and build-time rendering |
| `src/legacy.ts` | Retained navigation, contact, gallery, horizontal-rail and WebGL enhancements |
| `creator.css` | Base creator composition, dark/light surfaces, spacing, responsive layout and motion fallbacks |
| `personality.css`, `depth-effects.js` | Current Space Grotesk/DM Sans hierarchy, teal identity, portrait frame, pointer depth and once-only spatial entrances |
| `tailwind-input.css`, `postcss.config.js` | Tailwind 4 generation |
| `page-template.html` | Document metadata, stylesheet references and React entry point |
| `script.js` | Retained EN/FR dictionary, menu and contact-form behavior |
| `src/ecosystem-copy.json`, `ecosystems.css` | Bilingual integration roles/statuses, contextual brand groups and final shared card/disclosure/Contact styles |
| `hero-scene.js`, `hero-worker.js`, `hero-renderer.js` | Thirty-two coloured WebGL tool medals, local logo atlas and worker/main-thread/static fallbacks |
| `gallery.js`, `project-reels.js` | Full-image dialog and native horizontal screenshot rails |
| `styles.css`, `refinements.css`, `reference-effects.css`, `profile-content.css`, `project-reels.css`, `deadwater.css` | Retained component styles, overridden where necessary by `creator.css` |
| `site.config.json`, `scripts/` | Confirmed domain, reproducible build and compressed local preview |

`index.html`, `portfolio.html` and `generated-tailwind.css` are generated by the build. Edit their source files rather than copying changes between HTML entry points. `motion.js` and the Humane font belong to earlier revisions and are not active in the current client entry.

The stack uses React 18, TypeScript, Framer Motion 12, Lucide React and Tailwind 4. Space Grotesk (300–700) and DM Sans (100–1000) use local variable WOFF2 files, with Latin/extended Latin coverage and their OFL licences. There is no external font-service request. Earlier Kanit/Inter font files remain archived in source but their faces are no longer included in the compiled CSS.

## Content and interaction

The section order is Hero/About → Expertise → Skills & Stack → Approach → Projects → Commerce → Career → Education → Certifications → International → Beyond work → Contact. Saad's Product Owner, Business Engineer and Quality Engineer profile uses local Space Grotesk/DM Sans type and an authentic framed colour portrait. The header displays 32 curated software medallions, including Amazon, eBay, WordPress, Vercel, Render, WooCommerce, TypeScript and PostgreSQL, on a shared mesh and 512px-per-cell atlas. Independent floating paths stop individually on hover. Native sticky scrolling recedes the portrait, zooms the scene and grows the About title; short visual damping also joins chapter zoom and card handoffs without intercepting wheel/touch input. Low-power, pause, reduced-motion and WebGL/static fallbacks remain. The previous screenshot ribbons have been removed; each project retains its own compact gallery.

The white expertise section presents five relevant areas: product strategy, commerce/B2B, automation/integrations, applied AI and quality/systems. All twelve portfolio entries share one numbered Projects stack: FFA, LeadHunt, Cardiag, SecoursNow, Rencontre, Career Ops, Remote Copilot, Ansys, independent commerce, Débarra, ALX and academic studies. Each card has the same heading, presentation, action, visual and case-study structure. Real gallery groups remain 9 / 7 / 5 / 6 / 2 images. SecoursNow shows three captures plus a remaining three-image rail; Career Ops shows its two public access captures. Projects without application captures use explicitly labelled HTML/CSS workflow illustrations. Academic studies remain a six-study collection within one numbered entry.

Each project has one contextual monochrome tool row. New LeadHunt providers appear alongside n8n and HubSpot; Cardiag includes vehicle services, app tooling and Gemini. All roles, configuration states and provider prerequisites remain in the project details. Browser SVG filters preserve recognisable marks when source icons include a background; the source assets are unchanged. Media provenance distinguishes real captures, official photographs, promotional illustrations and public access screens. No fictional template projects or unrelated GIF galleries were introduced. Cardiag uses five supplied interface captures and its action opens the real owner-workspace screenshot. Its bilingual case study explains buyer/owner/mechanic journeys, support for beginners, model-specific recurring faults, Gemini diagnosis and detailed inspection PDFs for pre-purchase checks and vehicle traceability. No public demo or sample PDF is invented.

Shared pause, reduced-motion preferences and hidden-tab handling govern the nonessential motion. Stacking becomes normal document flow on phones, when paused, when project details are open or when keyboard focus enters the stack. All actual controls stay reachable. Gallery dialogs support arrows, Escape, original files and focus restoration. Saved EN/FR preference covers both the React sections and retained content.

The Career section follows the same numbered-card format and shared component as Projects. Seven professional experiences and four education paths have their own cards; six certifications/continuing-education records share one collection card. Three counted chapter links separate experience, education and certifications. Compact company/school indexes link directly to all eleven card headings, using the same numbering. Brief introductions explain each entry's focus; native disclosures retain the full missions and qualification titles without repeating the introduction. Existing dates, undated early missions, the ISEN track and ISO 27001 awareness wording remain qualified in both languages.

Three chapters expand the original portfolio content. Approach follows Expertise with four product stages and a scroll-driven progress rail. International follows Career with the four original language levels, working contexts and mobility. Beyond work presents the 36-destination map, pilot training, rally safety, personal mechanics and simracing. About links to these chapters rather than repeating their records. The map is a lazy local SVG, with a native disclosure for the complete destination list; no runtime map library or CDN is required. Orbital decorations pause with the existing control, reduced-motion preference and hidden-tab state. Without JavaScript they stay static.

Each of the twelve projects has one native details control in its introductory action row, beside the existing project link when supplied. Expanded content occupies the row below, before the images; phone buttons share equal columns and stretch to the same height. Career disclosures retain their full-width format. Nineteen redundant internal header buttons are removed; genuine external project destinations remain. Technical case-study subsections and profile interests no longer require nested disclosure openings. Short ALX/academic introductions and the consolidated Remote Copilot note avoid repeating full descriptions. All original gallery groups, missions, qualifications and integration states remain available.

Space Grotesk covers headings and DM Sans covers body text, controls and footer links. Ivory headings, teal accents and a pale neutral Expertise surface replace the earlier copper/purple mix. Contact shares the heading hierarchy, neutral fields and pill actions. The mobile menu stays fixed in the viewport after deep scrolling, and internal destinations use one coordinated header offset.

The header pairs a framed S.B mark with Saad's name and role on desktop. All language/motion/menu controls reserve 44px targets. Portrait and language cards use bounded four-degree pointer tilt; language and interest visuals enter with a restrained perspective movement. Existing heading entrances, ribbons, methodology progress, galleries and stacking remain. The new effects cancel immediately with shared pause, reduced motion, hidden tabs and pointer departure. No-JavaScript/WebGL-loss states show local static tool logos; they never hide the original portrait or substantive content.

A collapsed native directory at the start of Projects links directly to all twelve numbered headings. It works with the keyboard and without JavaScript, and keeps its open state when changing language. The five main navigation links underline the current content group: Approach belongs to Expertise, while International and Beyond work belong to About. End-of-chapter links continue from International to Beyond work and then Contact. New chapter decorations also pause offscreen; phone interest cards give their descriptions the full card width, with a separate illustration band.

The contact form retains its existing Formspree destination, timeout, duplicate-submit prevention and translated feedback. Development checks intercept form requests; no real message was sent. Real CV, LinkedIn, email and telephone links are retained.

## Validation and delivery

```sh
npm run typecheck
npm run test:build
```

See `VALIDATION.md` for the current browser checks and `PERFORMANCE.md` for dated Lighthouse measurements. Historical revision results are explicitly separate from the current React build.

`site.config.json` contains `https://saadbayahia.com/`. The build injects the canonical, social URLs, structured identity, sitemap and robots declaration; `SITE_URL` can override it for another domain/subfolder. Hosting should serve the supplied Brotli/gzip files and immutable fingerprinted-asset cache headers. `_headers` is provided for compatible hosts.

This revision is a **local preview**, not a deployment. Supplied FFA operational screenshots still await the owner’s publication treatment for visible customer/account fields and internal figures. Do not publish the current captures without resolving that existing choice. `MISSING-ASSETS.md` lists remaining evidence, dates, CV access, final demo and deployment checks. No Higgsfield-hosted site or paid generation was created.

## References and evidence

- The user’s 9 October creator prompt is the current layout, type and motion direction.
- [Matveyan](https://matveyan.com/) informed the earlier original 3D scene and dark editorial treatment; the raw Inspo extraction remains in `DESIGN.md`.
- [Archigreen Designs](https://archigreendesigns.com/) informed compact horizontal screenshot navigation.
- [Deadwater](https://www.deadwater.fr/) informed earlier masked entrances. Its condensed font and redundant project index are superseded by Kanit and the current composition.
- `DESIGN-DECISIONS.md` records revision decisions; its older entries are historical.
- `ASSET-SOURCES.md` records local media/font provenance, including the supplied full originals and their delivery derivatives.
- `CONTENT-SOURCES.md` records imported live-portfolio content, owner-reported outcomes and chronology discrepancies.

## Repository enrichment — 9 October 2026

Seven other owner repositories supply additional project information. Seventeen new logo assets appear in 23 contextual placements, alongside the eight existing tool wordmarks. LeadHunt includes Hunter, Apollo, LinkedIn and Kaspr; Cardiag includes carVertical, Oscaro, Ovoko, AUTODOC and Stripe. Smaller groups cover actual project tooling. Bilingual copy preserves roles and setup states inside the native case studies, with project types, illustration labels and conversational descriptions translated too. Integration documentation is not presented as proof of live credentials, automatic partner APIs or partnerships. See `CONTENT-SOURCES.md` and `ASSET-SOURCES.md` for snapshot and media provenance.

## Education curricula and institutional marks — 10 October 2026

Education now follows the supplied CV: KEDGE, ISEN, Franche-Comté, UIR/Nantes. Each career chapter numbers its cards from 01 using the same array position as its index; chapter totals derive from the content data (six certification records are grouped in one card). Four bilingual cards show precise qualification titles, locations, three subject icons and local institutional logos. Native disclosures contain readable curriculum domains and primary-source links. Dates remain unchanged; ISEN is presented as a track, with certification preparation distinct from awarded credentials. See CONTENT-SOURCES.md and ASSET-SOURCES.md.
