# Adaptation decisions

Read alongside [DESIGN.md](DESIGN.md), the complete supplied Inspo reference. The reference is inspiration; the content and composition remain Saad Bayahia's.

- **Dominant surface:** `#b85546` across the page. The supplied palette takes precedence over the live reference's black page background.
- **Accent:** `#4e241e`, used for the primary action and the FFA workflow visual. Avoid using colour to encode hierarchy.
- **Supporting surfaces:** `#d4a8a4` and `#be8686` on two project illustrations, with dark text. `#a06260` is available for supporting graphic strokes.
- **Text:** warm white `#fffaf6` on terracotta and dark surfaces; `#361713` on pale surfaces. These additional text tokens allow readable contrast without changing the supplied palette of surfaces.
- **Typeface:** Inter, weights 300/400/500/600. “Inter 18pt” is the reference's font family/optical naming, not an instruction to make every element 18pt. Body copy is 16px; headings scale responsively.
- **Hierarchy:** thin large headlines, medium-weight product labels and compact monospaced metadata. Cartograph Mono CF was not supplied; system monospace is the fallback, avoiding a dependency on a paid font file.
- **Geometry:** square corners, 20px grid gaps and generous 80–150px section spacing. No rounded pills, glossy gradients, decorative shadows or loading screen.
- **Macrostructure:** an editorial hero and bento project grid, followed by method, background and contact. The FFA project spans both columns; secondary projects sit side by side; DTC spans the row.
- **Width:** 1120px for the bento composition, narrower measures for reading. This adapts the reference's reported 825px container to the project's two-column content; prose never stretches across the grid.
- **Media:** the existing Saad portrait is reused. Code-native diagrams explain the projects and are explicitly labelled as illustrations. They are not presented as screenshots of shipped interfaces.
- **Motion:** short hover transitions only; honour reduced-motion preferences. Native anchors and disclosures keep the page functional without JavaScript.
- **Content:** preserve the Product Owner positioning, claims and real contact links from the original portfolio. Do not copy Matveyan's identity, fintech claims, client logos or personal assets.

Reference verified on 7 October 2026. The original repository was cloned from `main`, commit `5a69054`; this adaptation is independent of the earlier optimisation branch.
