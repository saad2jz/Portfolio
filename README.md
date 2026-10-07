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
- `styles.css` — responsive bento layout, terracotta surfaces and typography.
- `script.js` — safe text-only EN/FR translations, mobile navigation and contact form.
- `assets/favicon.svg` — local favicon.
- `assets/leadhunt-login.webp` — actual public LeadHunt sign-in screen, captured 7 October 2026.
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

The workflow drawings are explicit illustrations. A public login screenshot is identified as a login screen. No unauthorised customer data, fabricated shipped-product screenshots or made-up project results are used.

Native anchors, case-study disclosures and the form's HTML action work without JavaScript. JavaScript adds saved language choice, mobile menu controls and a submit flow with a 15-second timeout, duplicate-submit prevention and an accessible status. The existing Formspree endpoint and real contact/CV links are retained.

## Design references

- [Matveyan](https://matveyan.com/) — visual inspiration.
- [Inspo design reference](https://inspomcp.dev/d/matveyan-com/DESIGN.md) — saved in `DESIGN.md`, accessed 7 October 2026.

The supplied palette is preserved. Large type, weight and spacing carry the hierarchy; the dark accent is used sparingly. Inter is loaded from Google Fonts with system fallbacks. Square corners and an asymmetric two-column bento grid replace the previous dark-and-gold layout.

## Publishing

Publish the HTML, CSS, JS and `assets/` directory together. Relative resource paths support GitHub Pages subfolders as well as domain-root hosting. Confirm the public URL before adding canonical, Open Graph URL and structured-data URL fields. See `MISSING-ASSETS.md` for all remaining inputs.

This repo adaptation does not create or publish a Higgsfield-hosted site. There is no deployed production version in this change.
