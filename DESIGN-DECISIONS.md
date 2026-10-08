# Adaptation decisions

The revision follows the user's 8 October 2026 request to make the portfolio look like the live [Matveyan site](https://matveyan.com/). This supersedes the earlier interpretation of the extracted palette as the page background. `DESIGN.md` retains the original Inspo extraction as reference material.

- **Composition:** full-screen cinematic hero, fixed compact navigation, a thin viewport frame, corner crosshairs, outlined buttons and a small portrait near the bottom edge.
- **Surfaces:** near-black `#080808`, white type and muted neutral labels. The supplied terracotta/copper colours now belong to the original hero sculpture, rather than every page surface.
- **Typography:** Inter, 26px hero heading, 30px section headings, 24px project headings and 14px body copy. Light weights, uppercase headings and controlled tracking follow the observed live type scale. Important phrases use weight 600. System monospace replaces the unavailable licensed Cartograph font.
- **Layout:** centered introduction with an 825px reading width. Selected work alternates image-left and image-right across a 1000px container, with 150px between rows. Extra projects remain in a compact two-column grid. On mobile the rows stack with the visual first.
- **Hero media:** original procedural WebGL sculpture and an original code-generated SVG fallback. No Matveyan sculpture, video, source code, font files or personal assets are copied into the portfolio.
- **Motion:** slow sculpture movement, capped at 20 rendered frames per second and 900px maximum canvas dimension. Rendering stops when the hero leaves the viewport or the tab is hidden. Reduced motion produces a still image. No forced loader or scroll interception.
- **Edge details:** the bottom ticker shows existing portfolio outcomes instead of invented market prices. Cursor coordinates are decorative and hidden from assistive technology. A local copy of the existing Saad portrait removes the visible portrait's Cloudinary dependency; sharing metadata still uses the existing remote image until the public domain is confirmed.
- **Content:** Saad's Product Owner identity, real contacts, current GitHub project descriptions, prototype labels and upstream attribution are preserved. Project visuals remain explicitly labelled illustrations.
- **Progressive enhancement:** native anchors, case-study disclosures and the form's HTML action continue to work without JavaScript. Failure or loss of WebGL leaves the static sculpture visible.

Live layout and typography were inspected in Chrome at 1440px and 390px. The reference site's background video and scene assets did not finish loading in the inspection browser; its frame, typography, spacing and project layout were directly observed. The original hero artwork here is an adaptation, not a claim of an exact asset match.
