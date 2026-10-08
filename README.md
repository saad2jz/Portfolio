# Saad Bayahia — Matveyan-inspired landing page

A separate adaptation cloned from the original [`saad2jz/Portfolio`](https://github.com/saad2jz/Portfolio) `main` branch, commit `5a69054`. The original profile remains Product Owner / E-Commerce & B2B. The visual direction adapts the supplied reference rather than copying Matveyan's identity or project assets.

## Open locally

No dependencies or build step are required. Open `index.html` or serve this folder:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`.

## Contents

- `index.html` — new landing page.
- `portfolio.html` — identical entry point preserving the original filename.
- `styles.css` — black viewport frame, full-screen hero, alternating project rows and responsive typography.
- `refinements.css` — editorial type hierarchy, lighter project framing, personal-project bento, portrait, contact treatment and image-gallery styles.
- `reference-effects.css` — uniform reference typography/surfaces, eight-brand logo band, grain, crosshair controls, hover zoom/glitch and cursor styles.
- `reference-effects.js` — word-by-word title reveals, image effects and the shared motion pause, including a non-WebGL fallback.
- `assets/toolkit/` — eight official tool logos, served locally and displayed in monochrome.
- `assets/page-grain.svg` — original lightweight grain texture.
- `script.js` — safe text-only EN/FR translations, mobile navigation and contact form.
- `hero-scene.js` — nine original animated WebGL meshes, perspective lighting, hover rotation, scroll dispersion and a persistent pause control.
- `motion.js` — project depth/tilt and scroll reveal choreography.
- `gallery.js` — native dialog image viewer with keyboard navigation, translated controls and focus restoration; original image links remain usable without JavaScript.
- `assets/product-orbit.svg` and `assets/product-orbit-mobile.svg` — original static desktop/mobile scene fallbacks.
- `assets/saad-portrait.webp` — local copy of the existing portrait.
- `assets/favicon.svg` — local favicon.
- `assets/logos/` — five official site/repository brand assets.
- `assets/ffa-products.webp` and `assets/cardiag-inspection.webp` — official product photography and presentation artwork.
- `assets/leadhunt-{agents,copilot,map,integrations,campaigns,sending,extension}.webp` — seven product captures supplied by Saad, losslessly encoded at original dimensions.
- `assets/secoursnow-{home,profile,triage,tutorial,contacts,help}.webp` — six supplied mobile prototype captures, losslessly encoded at original dimensions.
- LeadHunt and SecoursNow `*-thumb.webp` files — lightweight gallery previews that open the full originals.
- `assets/career-ops-{desktop,mobile}.webp` — actual public access screens, captured 8 October 2026.
- `ASSET-SOURCES.md` — media provenance and capture limits.
- `avatar.jpg` — original repository illustration, retained; it is not the portrait used in the landing page.
- `DESIGN.md` — complete downloaded Inspo reference.
- `DESIGN-DECISIONS.md` — how the reference was adapted to this content.
- `MISSING-ASSETS.md` — prioritised list of evidence, files, links and publication details still needed.

After editing `index.html`, mirror it to `portfolio.html`:

```sh
cp index.html portfolio.html
```

PowerShell: `Copy-Item index.html portfolio.html`.

## Content and behaviour

The page contains FFA, LeadHunt, Cardiag and DTC work, plus four repository-backed explorations: SecoursNow, Rencontre, Career Ops Workspace and Remote Copilot. Project descriptions were checked against the original portfolio and current READMEs. Private source repositories are not exposed as broken public links; Career Ops Workspace credits its open-source upstream.

Selected project rows use real FFA product photography, seven supplied LeadHunt product captures and Cardiag presentation artwork. Five official logos identify their projects; Career Ops includes an actual public access capture. LeadHunt has a dedicated seven-image gallery, including its Chrome extension shown on Saad’s LinkedIn profile; SecoursNow has a separate six-image gallery. SecoursNow uses a wider image/text row with portrait mobile screenshots and a visible phase-one demonstration label. Its original warnings remain in the supplied images. Personal projects use a two-column bento with wide SecoursNow and Career Ops rows, stacking on mobile. Images open in a native dialog with previous/next controls, arrow-key navigation, Escape closing, focus restoration and an original-file link. Desktop/mobile access captures are selected responsively, and below-the-fold media is lazy-loaded with explicit dimensions. Without JavaScript, the existing file links still open the original images. The FFA workflow drawing remains an explicit illustration inside its case study. Public access screenshots are identified as access screens. No unauthorised customer data, fabricated shipped-product screenshots or made-up project results are used.

Native anchors, case-study disclosures and the form's HTML action work without JavaScript. JavaScript adds saved language choice, mobile menu controls and a submit flow with a 15-second timeout, duplicate-submit prevention and an accessible status. The existing Formspree endpoint and real contact/CV links are retained.

## Design references

- [Matveyan](https://matveyan.com/) — visual inspiration.
- [Inspo design reference](https://inspomcp.dev/d/matveyan-com/DESIGN.md) — saved in `DESIGN.md`, accessed 7 October 2026.

The 8 October revision follows the live reference: black surfaces, a full-screen cinematic hero, a fine viewport frame, crosshair details, small uppercase headings and alternating project rows. Copper tones colour nine original 3D objects with independent hover rotation, cursor parallax and scroll-driven dispersion. The shared pause control and reduced-motion support cover grain, glitches, title reveals and 3D motion. Reference-style outward-moving crosshairs, image zoom/desaturation and cursor labels use the portfolio’s own media. An official eight-logo toolkit band replaces the text-only strip. All sections share the same neutral surfaces and type scale. Inter is served locally through `fonts.css` and two WOFF2 subsets in `assets/fonts/`, with a Latin preload, font-display swap and system fallbacks. The font's OFL licence is included. The visible portrait is also local. See `DESIGN-DECISIONS.md` for the latest direction and inspection limits.

The five existing career entries are visible directly beside the portrait and biography. Education has its own native disclosure. Timeline entries and headings use the shared scroll entrances. SecoursNow and Career Ops previews also respond to pointer movement in perspective; shared pause and reduced motion disable this depth interaction.

## Publishing

Publish the HTML, CSS, JS and `assets/` directory together. Relative resource paths support GitHub Pages subfolders as well as domain-root hosting. Confirm the public URL before adding canonical, Open Graph URL and structured-data URL fields. See `MISSING-ASSETS.md` for all remaining inputs.

This repo adaptation does not create or publish a Higgsfield-hosted site. There is no deployed production version in this change.
