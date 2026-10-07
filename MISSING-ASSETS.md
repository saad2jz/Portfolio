# What is still needed to complete the portfolio

The landing page is implemented and usable. The remaining work is mainly real project evidence, destination links and final publishing details. Concept diagrams are clearly labelled; no fabricated screenshots, testimonials or project outcome numbers were added.

## Priority 1 — needed before publishing

| Item | What to supply or confirm | Suggested file / format | Current situation |
|---|---|---|---|
| Public address | Final domain and hosting choice | URL such as `https://your-domain.fr/` | No confirmed portfolio URL. The original `saad-bayahia.dev` did not resolve in the earlier check. Canonical, `og:url` and JSON-LD `url` must use the confirmed address. |
| FFA project evidence | Storefront, B2B portal and relevant workflow screenshots, with private/customer data removed | `assets/ffa-desktop.webp`, 1440 × 900; `assets/ffa-mobile.webp`, 390 × 844; `assets/ffa-workflow.webp` or `.svg` | The original portfolio supplies the case-study claims; the landing page has a labelled workflow illustration. The public FFA store is linked. |
| LeadHunt product evidence | An authenticated campaign/pipeline screen and a contact or outreach screen using demo data | `assets/leadhunt-pipeline.webp`, `assets/leadhunt-outreach.webp`, 1440 × 900 | Live sign-in verified and captured locally in `assets/leadhunt-login.webp`. Login is not evidence of the product's authenticated workflows. |
| Cardiag screenshots and final demo | A vehicle sheet, persona choice and exported report; confirm the accessible public demo | `assets/cardiag-vehicle.webp`, `assets/cardiag-report.webp`; final demo URL | Repo homepage declares `https://cardiag.online/`; a stable rendered public page could not be verified in this session. No unverified demo link is exposed on the page. |
| Role, dates and outcomes | Confirm your contribution, project dates, current availability, measurement period and evidence for `−40%`, `367 SKUs`, `20+ stores`, `5 integrations` | Short case-study notes; optional `case-studies/ffa.md` | Existing portfolio claims are reused. No independent verification of those outcomes was performed. Current copy avoids the now-past “starting September 2026” availability date. |
| CV | Latest CV and public viewer permissions, or a local PDF | `assets/saad-bayahia-cv.pdf` | Existing Google Drive URL is retained; document access and freshness remain unverified. |
| Contact form | Confirm the existing Formspree account receives messages and that notifications/reply address are correct | Test through the deployed form | Success and failure paths were tested with intercepted requests. No real message was sent. |

## Priority 2 — make the additional projects convincing

| Project | Assets / evidence to provide | Link or status to confirm |
|---|---|---|
| SecoursNow | Two mobile screens: consent/triage and responder flow; a demo video of at most 30–60 seconds if available. Use `assets/secoursnow-mobile-01.webp` and `assets/secoursnow-mobile-02.webp`, around 780 × 1688. | Confirm public prototype link. The README's GitHub Pages URL was not verified accessible. Keep the phase-one prototype status until deployment/validation is confirmed. |
| Rencontre | Published portfolio/profile, contact directory and QR exchange screens, with fictional contact data. Use `assets/rencontre-profile.webp` and `assets/rencontre-directory.webp`. | Final public demo or read-only demo; launch status. The README describes launch preparation and puts event functionality on the V2 roadmap. |
| Career Ops Workspace | An anonymised résumé studio and role-tracking view; explain your changes relative to the upstream project. Use `assets/career-ops-studio.webp`. | Optional read-only demo. The workspace is owner-only; no public visitors are sent to a private account page. Upstream attribution is included. |
| Remote Copilot | Connector setup and a short execution/audit walkthrough, with tokens, usernames and private file paths removed. Use `assets/remote-copilot-setup.webp` and optionally an MP4. | Whether this can have a public demo or sanitised technical case study. No private Telegram address or credentials should appear. |
| DTC experience | One or two storefront screenshots, your responsibilities and outcomes you can publish. | Brand/store URLs you are comfortable naming; the portfolio currently uses the existing aggregate `20+` claim. |

## Priority 3 — polish

- **Portrait source:** the existing Cloudinary portrait is reused. A local high-resolution original (`assets/saad-portrait.webp`, at least 800 × 1000) would remove the external image dependency. A new photo is optional.
- **Social preview:** a branded 1200 × 630 cover, for example `assets/og-cover.webp`. The current sharing image retains the original portrait URL.
- **Testimonials:** one or two attributable quotes with permission, name, role and exact wording. None are invented in this adaptation.
- **Brand assets:** official product logos only if you want them; the page uses text wordmarks and code-native diagrams. No third-party logo files are required for the current version.
- **Cartograph Mono CF:** licensed `.woff2` font files only if you want the exact reference button face. Inter and a system monospace fallback already work; this is optional.
- **Local Inter:** licensed/subset `.woff2` files if you want to remove Google Fonts. The current page has a standard font fallback.
- **App store links:** only for products already distributed publicly; otherwise keep prototype/demo wording.

## Repository visibility and links

Authenticated GitHub discovery confirmed `leadhunt`, `Cardiag`, `secoursnow`, `rencontre`, `career-ops-workspace` and `remote-copilot`. Their source repositories are currently private. Public visitors would not be able to follow those repository links, so those links are deliberately absent from the landing page. There is no need to make a private repo public: a read-only demo, sanitised case study or walkthrough is enough.

The page links your public GitHub profile, the public FFA storefront and LeadHunt's verified public sign-in page. Other product descriptions use their current repository READMEs, without copying configuration values or private code into this repository.

## Where Higgsfield can help

Higgsfield can generate a branded social cover or complementary abstract visuals, and can help edit a supplied product walkthrough. Real project screenshots, your role, client results and links must come from the actual products. Generated visuals should remain labelled as illustrations.

No Higgsfield website, paid generation or community publication was created by this repository task. A Higgsfield-hosted build would be a separate delivery destination.
