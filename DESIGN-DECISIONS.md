# Adaptation decisions

## Immersive toolkit chapter — 10 October 2026

The requested scroll sequence supersedes the earlier simultaneous portrait/background zoom. A native sticky hero reserves 110svh of scroll travel: the portrait recedes and fades first, then the title clears while the background grows up to 1.7× on desktop and 1.5× on phones. The scene releases into the screenshot ribbons through ordinary page scrolling; no wheel interception or forced advancement is used. Contact and navigation remain available. Pause restores portrait/title/scale without moving the document; reduced motion, missing WebGL and no JavaScript omit the transition spacer.

The latest request curates the scene to 24 actual software tools, including Power BI from the documented data curriculum. FFA/Cardiag project identities and standards/method badges leave the header while remaining in relevant page content. Larger medallions use deterministic best-candidate placement across the full header; placement margins account for viewport aspect ratio, circle radius and orbit amplitude. Independent slow elliptical, diagonal and figure-eight trajectories alternate clockwise/counterclockwise direction, with varied speeds and phases. Hover freezes the whole selected pose (position, depth and rotation); leaving resumes its local clock without a jump. Canvas-local hit testing follows the sticky CSS zoom. A single 6×4 atlas has 512px tiles, and the framebuffer increases resolution in quarter-scale steps during zoom within a pixel budget. Low-power devices use a smaller texture. Initial hash navigation remains focused and realigned after the enhanced chapter sets its height.

## Project action placement — 10 October 2026

All project introductions remain visible even on short laptop screens. The shared card-height observer enables stacking only when the complete card fits below the navigation with 32px of breathing room. Larger cards remain in normal document flow; ResizeObserver also follows font, translation and disclosure changes. Without JavaScript, cards use normal flow. Existing focus, open-disclosure, phone, pause and reduced-motion overrides remain. FFA and Cardiag titles now use the same decorative identity-image convention as other branded projects. Career highlights replace repeated 01–03 counters with relevant line pictograms; certification rows reuse available Shopify/Cisco/HubSpot marks and use neutral security/process/code symbols for the remaining subjects. The shared muted teal palette unifies these panels with the education cards without adding qualification claims.

All twelve project disclosures now share the introductory action row with any existing project destination. The original native details/summary elements and contents are moved rather than duplicated. Flex and grid layout keep paired controls together, with the expanded panel on its own full-width row before the visuals. The browser's native `::details-content` wrapper receives the same row sizing to preserve layout for short panels. Keyboard and no-JavaScript behavior remain native. Career disclosures are outside this change.

## Current direction — 9 October 2026

The supplied creator prompt now takes precedence over the earlier Matveyan and Deadwater type/layout interpretations below. Keep Saad’s actual Product Owner profile and authentic portfolio evidence while adapting the prompt’s visual language:

- `#0C0C0C` page surfaces; local Kanit 300–900; silver `#646973` → `#BBCCD7` heading gradient; light `#D7E2EA` reading copy. Hierarchy comes from size, weight and space. Colour is concentrated in the contact pill and original copper scene.
- A single-viewport hero, enormous “Hi, I’m Saad”, authentic grayscale portrait with restrained magnetic movement, concise product positioning and a visible contact action. The earlier 185svh hero spacer is removed.
- Two counter-scrolling photo ribbons, eight distinct local project visuals with silent duplicate links. Responsive delivery previews replace unrelated remote GIFs.
- A spacious About section with four original CSS/Lucide dimensional ornaments and a character reveal. Minimum opacity is .65 for readability; screen readers receive a single complete paragraph. One Framer scroll value drives a CSS custom property on the paragraph, and CSS interpolates character opacity without hundreds of motion subscriptions. Profile facts, CV and LinkedIn stay visible; detailed career information is expandable.
- A white expertise section with rounded top corners and five numbered, profile-relevant contributions instead of fictional 3D-modelling services or invented pricing.
- Three desktop sticky/scaling selected-project cards with three-image collages. A stable marker drives each scale transition; sticky positioning itself is not used as the scroll measurement target. On mobile, shared pause, reduced motion, expanded details and keyboard focus, cards return to normal flow.
- All additional project evidence, native horizontal rails and the full-resolution gallery remain. The page avoids repeating an additional project index or a global logo band; genuine tool logos appear in the relevant project context.
- React/TypeScript and Framer Motion supply the new interactions. Tailwind 4 is used with the current PostCSS plugin; Lucide icons are tree-shaken. Build-time rendering keeps semantic content available before hydration and without JavaScript.
- The LCP portrait translates into place without fading its image to zero opacity, preserving the requested entrance without delaying the first readable portrait. New ribbon derivatives preserve aspect ratio; full originals are unchanged.

The local UI/UX design-system query matched Minimalism/Swiss guidance on spacing and clear type hierarchy. The supplied brief determines the actual palette/font. The attempted React reduced-motion search did not return a relevant stack-specific match; it is not treated as verification. Motion safeguards are implemented and checked directly in the browser.

This is an adaptation of the prompt to Saad’s evidence, not a claim that he is a professional 3D artist. The random template portrait, sample studio projects, decorative remote PNGs and 21 unrelated GIFs are not used. The older decisions below describe previous revisions and do not override this section.


The revision follows the user's 8 October 2026 request to make the portfolio look like the live [Matveyan site](https://matveyan.com/). This supersedes the earlier interpretation of the extracted palette as the page background. `DESIGN.md` retains the original Inspo extraction as reference material.

- **Composition:** full-screen cinematic hero, fixed compact navigation, a thin viewport frame, corner crosshairs, outlined buttons and a small portrait near the bottom edge.
- **Surfaces:** near-black `#080808`, white type and muted neutral labels. The supplied terracotta/copper colours now belong to the original hero sculpture, rather than every page surface.
- **Typography:** Inter, 26px hero heading, 30px section headings, 24px project headings and 14px primary reading copy, following the inspected live reference. Light weights, uppercase headings and controlled tracking follow the observed live type scale. Case-study and supporting copy uses 14px. Section headings share the same 30px desktop / 26px mobile scale throughout the page. Important phrases use weight 600. System monospace replaces the unavailable licensed Cartograph font.
- **Layout:** centered introduction with an 825px reading width. Selected work alternates image-left and image-right across a 1000px container, with 128px between rows. Extra projects form a two-column bento with full-width SecoursNow and Career Ops rows; tablet and mobile progressively stack the content.
- **Hero media:** nine original bevelled 3D objects with embossed abstract product symbols, built from reusable triangle meshes. Depth testing, perspective projection, world-space normals and reflected lighting provide actual volume. Desktop and mobile SVG fallbacks reproduce the composition. No Matveyan model, video, source code, font files or personal assets are copied into the portfolio.
- **Motion:** independent rotations and gentle levitation; hovering an object accelerates its own spin. A native sticky stage lasts 185svh: scrolling changes camera distance and spreads the objects away from the hero. The center copy recedes subtly. Pointer movement adds camera-like parallax; project previews tilt in depth and enter with perspective. Rendering uses requestAnimationFrame, with pixel ratio capped at 1.5 and the canvas longest edge capped at 1600px. Mesh buffers are reused. Rendering stops outside the hero and when the tab is hidden. A keyboard-accessible pause button remembers its setting. Reduced motion stops the automatic scene, removes the pinned extra scroll distance and disables project motion. No scroll interception or forced loader.
- **Edge details:** the bottom ticker shows existing portfolio outcomes instead of invented market prices. Cursor coordinates are decorative and hidden from assistive technology. A local copy of the existing Saad portrait removes the visible portrait's Cloudinary dependency; sharing metadata still uses the existing remote image until the public domain is confirmed.
- **Content:** Saad's Product Owner identity, real contacts, current GitHub project descriptions, prototype labels and upstream attribution are preserved. Project media captions distinguish official photographs, presentation artwork, access captures and the illustrated FFA workflow.
- **Progressive enhancement:** native anchors, case-study disclosures and the form's HTML action continue to work without JavaScript. Failure or loss of WebGL leaves the static sculpture visible.

Live layout and typography were inspected in Chrome at 1440px and 390px. The reference background video and model did not complete their live render in the inspection browser. Read-only scene metadata confirmed a nine-object composition, and runtime inspection confirmed independent hover rotation and scroll dispersion. Those behaviours inform this original mesh implementation; the reference model and code are not included. The artwork is an adaptation, not an exact asset match.

## Official project media — 8 October 2026

Replace the selected-project concept panels with source-backed visual evidence: FFA product photography, supplied LeadHunt product screenshots and repository-supplied Cardiag presentation artwork. Put the FFA workflow diagram inside its disclosure. Preserve the reference's alternating image/text rows, dark framing and existing 3D tilt. Use official FFA, Cardiag, SecoursNow, Rencontre and Career Ops brand assets without recolouring their identities. Career Ops also includes its public access page.

All new media is served locally. Explicit image dimensions reserve space, responsive picture sources select mobile access captures, native full-image links support inspection, and lazy loading limits initial work. Captions distinguish product photographs, presentation artwork and access screenshots. No authenticated workflow is implied by a login capture. Source files and capture dates are recorded in `ASSET-SOURCES.md`.

## Editorial refinement and gallery — 8 October 2026

Reduce the selected-work frames to fine image edges, corner markers and source captions. Move project metadata above the image and use compact outlined native disclosure controls. Increase description sizes and the result figures to improve the reading hierarchy. Add minimal decorative browser chrome to the access captures without changing their pixels.

Arrange small explorations into a two-column bento and give the actual SecoursNow and Career Ops captures wider image/text rows. Keep its source attribution and private-workspace status. Reuse Saad's real portrait in the about section with a CSS grayscale treatment. Give contact the same neutral black surface, thin rule and light title scale as the other sections; stack its email arrow below the heading on narrow phones to avoid overflow.

A one-pixel reading ruler and current-work indicator follow native scrolling through a scheduled update. Native `dialog` supplies the image gallery's modal semantics, focus trapping and Escape behaviour. Explicit controls support previous/next, arrow keys, backdrop closing, returning focus to the opener, original-file access and French labels. The gallery uses the currently displayed responsive screenshot and retains the source caption. The ordinary image links remain the fallback without JavaScript. Reduced-motion preferences continue to disable nonessential transitions and automatic 3D movement.

## Supplied LeadHunt screens — 8 October 2026

Replace the access-page preview with the supplied AI agent hub and add six compact, labelled product thumbnails: copilot, map, connector setup, campaigns, sending studio and Chrome extension on LinkedIn. Give these seven views their own gallery group; the other project images remain in a separate group. Preserve original capture dimensions and pixels using lossless WebP. The copilot image is a portrait panel capture, not a mobile screen. All product views can be inspected at full size and retain native-file link fallbacks. Captions describe the visible interface, without promoting its internal counters to independently verified portfolio results.

## Supplied SecoursNow prototype evidence

Present the six original mobile captures in a dedicated gallery, with the home screen and five supporting portrait captures side by side in a compact neutral horizontal rail. Keep the phase-one demonstration label next to the project copy and preserve all source notices inside the images. Show the project description before the gallery on narrow screens. The supplied blue/green repository icon is retained as the existing official asset; the screenshots preserve their own red identity unchanged. Thumbnails reduce initial loading cost while the viewer opens the full-resolution lossless files. Missing public-demo, responder and consent evidence remains listed separately.

The supplied Chrome-extension capture retains the whole browser context and Saad’s own profile. It is added to the existing LeadHunt group, with a translated caption and a full-resolution original behind a lightweight thumbnail. The supporting views now share the horizontal rail with the main capture. No store listing or distribution status is inferred from the screenshot.

## Uniform live-reference design and effects

The latest user request applies the reference’s visual language throughout the page. `reference-effects.css` centralises the shared heading scale, neutral surfaces, thin borders and spacing. The earlier copper contact glow and red-tinted prototype stage are superseded. Hero copper objects and actual project screenshots preserve their own identity and colours.

An eight-logo toolkit band sits between the selected-work introduction and the project rows. Official Shopify, n8n, Mirakl, HubSpot, Erplain, GitHub, Colissimo and Pennylane identities replace the former text-only strip. The desktop row becomes four columns on tablet and two on phones. It is labelled as tools, not clients; Erplain is deduplicated.

The inspected reference uses animated grain, outward-moving corner crosshairs, word-by-word blur/vertical title entrances, desaturated image previews that zoom to colour on hover, clipped image glitches and a translucent cursor label. These behaviours are rebuilt in `reference-effects.js` and CSS around the portfolio’s own media and native links. The existing nine-object 3D scene, hover rotations, scroll camera transition and depth tilt remain. The shared pause control now stops decorative grain, glitch, title entrances and tilt as well as the 3D scene. Reduced motion removes automatic effects; the pause control also works without WebGL or after GPU loss. No custom scroll interception or blocking loading screen is introduced.

## Career and lower-page continuation

Show the five existing career entries directly in the about section, beside the local portrait and biography, with fine dividing rules and a date/role layout. Stack dates above roles on narrow phones. Keep education in a separate native disclosure and preserve the existing dates and descriptions. Extend shared text and row entrances to this chronology, and the existing pointer-depth interaction to SecoursNow and Career Ops previews. Both obey pause and reduced motion. The contact arrow uses a small pointer-hover movement within the same visual language.

Serve Inter locally as Latin and Latin-extended WOFF2 subsets with the original OFL licence. Preload only the main Latin subset and use font-display swap, removing the runtime Google Fonts stylesheet and connection hints. This keeps the requested typography available without a third-party font connection.

## Performance without changing the reference direction

Keep the nine objects, shaders, hover rotation, scroll dispersion, grain and title/image effects. Move shader compilation, mesh construction and the render loop into an OffscreenCanvas worker so the page can paint and respond to input independently. The same renderer supports browsers without OffscreenCanvas; failed WebGL restores the original SVG scene. Mobile rendering uses 64 mesh segments, at most 30 frames per second and a 1.25x pixel ratio; desktop uses 100 segments, at most 60 frames per second and 1.5x. Large drawing buffers and low-memory/save-data devices have additional limits. Pause, reduced motion, hidden tabs, offscreen rendering and return-to-hero camera restoration are preserved.

Coalesce pointer writes into animation frames, reuse renderer arrays and prepare decorative image/corner effects only near the viewport. Animate the existing grain texture with a compositor transform. Supporting browsers skip offscreen layout for project cards, retaining intrinsic sizes and a 64px clip margin for their hover details. This enhancement is limited to scripting-enabled pages; native no-JavaScript links and disclosures retain their normal layout. Biography and contact sections retain ordinary layout for reliable chronology and anchor navigation.

Use local AVIF/WebP previews at 320, 640 and 960 pixels for the three selected projects, plus separate avatar/portrait sizes and a small lossless derivative of the official Mirakl logo. Gallery links explicitly retain the full originals. Build minified bundles and content-hashed assets with Brotli/gzip copies and cache headers. Optimize delivery rather than replacing real product evidence or suppressing the requested effects. See `PERFORMANCE.md` and `VALIDATION.md` for the measured results and checks.

## Sharing and resilient feedback

Use the same restrained black frame, Inter scale, personal monogram and original copper-object illustration in the 1200×630 social cover. Build absolute sharing URLs, a single canonical sitemap entry and structured identity URLs from the confirmed `https://saadbayahia.com/` address. Keep deployment configuration outside runtime JavaScript and exclude the editable cover template from production.

Keep feedback within the existing form/gallery layout. Form fields become read-only during the request, preventing accidental loss of new edits when success resets the submitted values. Failures/timeouts retain the draft; state labels follow language changes and new input clears stale feedback. Gallery loading/error text uses the existing monochrome type system, preserves the original-file recovery link and does not change image pixels, keyboard arrows or focus restoration.

## Supplied FFA evidence

Keep the official gift-box photograph as the main project image. Present the photograph and eight supplied product captures in one compact horizontal rail, with adjacent-card previews to signal navigation. Use the same sharp corners, outward crosshairs, grain, monochrome labels, image effects and shared motion controls as the other project galleries. Each preview opens the native-size capture in a dedicated nine-image group including the photograph. Labels and case-study context follow the existing English/French switch. The supplied FFA logo is reduced to a compact lossless derivative; product screenshots retain their own interface colours.

Source originals stay outside the repository. The current local captures preserve their source pixels; publication treatment of the six operational views' visible customer/internal fields is pending the owner's choice. No edited interface or generated replacement screenshot is presented as authentic evidence.

## Continued comparison with the live reference

Rechecked [Matveyan](https://matveyan.com/) on 8 October 2026. Its specialty and selected-work introductions are centred, the fixed noise layer has opacity 0.09, a 250px side ruler follows reading progress, and a large closing identity has a soft optical fade. Apply those decisions to Saad's existing content: centre both introductions, remove the logo band's enclosing rules, retain the eight requested official logos, add the decorative ruler and close with a full-width `SAAD BAYAHIA` wordmark. The frame and the original nine-object hero scene remain integrated throughout.

Use a native-scroll-triggered 1.2s entrance for the closing wordmark, coordinated with the existing shared pause and reduced-motion settings. The default CSS state is visible without JavaScript; the duplicate blur layer and ruler are decorative and excluded from accessibility semantics. Reuse the existing reading-progress variable, without adding another scroll loop. The ruler is hidden on phones, and the closing wordmark fits from 320px upward.

Unify LeadHunt, FFA and SecoursNow preview framing with neutral surfaces, muted caption typography and fine rules. Keep LeadHunt’s main capture and six supporting previews together in one horizontal rail, with a larger preview area per capture. Preserve each authentic capture's proportions and original gallery file; effects change the on-page presentation only. Desktop and phone views of the centred introduction and closing wordmark were visually reviewed.

The continuation audit identified an initial forced layout in the scene controller. Use the ResizeObserver entry's content rectangle for exact hero dimensions and await its first delivery before initializing the deferred renderer. The model's temporary dimensions are never passed to the renderer. Let the body observer schedule the first reading-ruler update after layout and read scroll geometry before writing style variables. Keep the initial English text nodes already supplied by HTML and replace translated copy only when the selected language changes. These changes retain the same worker scene, mobile frame cap and visual composition while avoiding synchronous startup geometry reads and unnecessary copy mutations.

## Horizontal evidence navigation

Inspected [Archigreen Designs](https://archigreendesigns.com/) on 8 October 2026: its projects section translates the wide `.projectsHorizontal` strip during a pinned, scrubbed vertical ScrollTrigger sequence and tracks progress. Adapt the horizontal traversal and progress feedback within each existing project, keeping Matveyan’s visual language. Use native overflow instead of introducing GSAP or a long pinned spacer, because the requested result also reduces page length. Wheel conversion is bounded to a desktop gallery under the pointer, releases at both ends and is disabled for reduced motion/shared pause. Touch and horizontal trackpad gestures use native scrolling.

Retain all authentic views, captions, direct full-original links and gallery groups. Landscape cards show a sliver of the next capture; portrait rails show several complete phone views. Previous/Next, keyboard arrows, Home/End, a translated hint, a live counter and a fine progress rule make traversal discoverable. Observe rail geometry only near the viewport, cache slide offsets after layout, coalesce counter/progress writes in animation frames and avoid page-level wheel handlers. Several portrait cards share the last clamped offset; controls choose the next distinct reachable position so Previous cannot get stuck at the end. Keyboard focus still advances by individual capture.

The shared pause disables wheel conversion and smooth control navigation; image hover/depth effects continue to use the established motion system. Native overflow and original links survive without JavaScript. New 720px landscape derivatives improve readability without modifying full-size evidence. Cardiag retains its single labelled presentation image, and projects without supplied UI views do not gain invented captures.

## Richer content without a second visual language

Reuse the page's existing native disclosure pattern for imported missions, expertise, certifications and interests. Ten disclosures begin closed, use the same fine monochrome rules, small monospace summaries and outward-moving crosshairs, and remain operable without JavaScript. Body copy uses Inter with weight/scale hierarchy; two-column content groups stack on phones. The Ansys proposal spans the lab grid with a concise introduction and expandable four-offer detail. Four languages and mobility remain visible in the profile.

The local UI skill search returned no applicable content-density guidance, so this implementation follows the established native pattern and responsive/accessibility verification. Preserve the authentic screenshot rails and existing motion system. Source chronology conflicts stay documented instead of silently choosing new dates.

## Secondary reference: Deadwater

The live reference uses a very large Humane Medium identity, Humane 80px project labels with Inter metadata, clipped title entrances and project media selected by hover. Adapt these choices into a four-project native index, expressive selected-project headings and the closing name. Preserve Matveyan's frame, neutral surfaces, 3D hero and per-project screenshot rails. Body copy and compact capability disclosures retain Inter. The font is served locally with a metric-adjusted fallback and no external font stylesheet.

Use masked word entrances in the existing reveal controller, replacing its per-word blur. Preview image changes animate a horizontal clip and mild scale with cancellation on shared pause, reduced motion, tab hiding or leaving the viewport. Load previews only after selecting a desktop link; phone links do not trigger unused hidden-image downloads. Pointer hover and keyboard focus provide equivalent preview selection. Native anchors remain useful without JavaScript, and the decorative preview is excluded from accessibility semantics.

The UI/UX skill's verified Reduced Motion and Motion Sensitivity matches recommend presenting the final readable state without forced parallax or scroll interception. Retain the shared pause preference and the existing native scrolling instead of importing the reference's smooth-scroll runtime. Humane accents, responsive fit and the original gallery groups were checked.

## Contextual project ecosystems — 9 October 2026

Keep the page's dark Kanit direction and place discovery/vehicle-service logos below the relevant project collage. White, compact logo surfaces retain recognisable original marks; visible brand names and role/status text establish hierarchy. Long implementation descriptions live inside existing project disclosures. Smaller lab projects receive one compact ecosystem row, avoiding another repeated global logo wall. On phones, major groups use two columns and retain readable labels. Native HTTPS links, focus outlines and decorative empty image alt text prevent duplicate brand announcements. Cardiag's external-link and pending-configuration statuses are visible in both languages.

## One project sequence and monochrome tools — 9 October 2026

At the owner's request, the separate lab and additional-project cards are replaced by the same format used for FFA, LeadHunt and Cardiag. Twelve sequential entries use one component and shared heading/action/media/disclosure hierarchy. The stack's top offset is capped and scaling never enlarges later cards; open disclosures, keyboard focus, pause and small screens release sticky stacking.

All contextual tool marks now sit together in a single row per project. The former white capsules, side-by-side role cards and extra ecosystem blocks are removed. Recognisable source glyphs plus wordmark names use the same neutral grey treatment as n8n/HubSpot. Role/status copy remains inside project details, including external vehicle-service links and Stripe's pending configuration. SVG rendering filters remove source-background colours without rewriting supplied bitmap assets.

SecoursNow and Career Ops reuse only their real captures. Other projects receive deliberately schematic HTML/CSS workflow panels labelled as illustrations. These are editorial project summaries, not reconstructed application screens. Academic studies remain one six-study collection to avoid six thin, repetitive cards.

## Career in the shared card format — 9 October 2026

Reuse the Projects component for Career rather than introducing a separate timeline design. Seven professional experiences and four education paths receive numbered cards with the same large numeral, heading, concise introduction, action and native details. Domain-specific focus panels replace project screenshots. Six certification/continuing-education records share one visible collection card, following the existing academic collection approach and avoiding six sparse cards. No certificate artwork or employer imagery is fabricated.

Place Career immediately after Projects, with direct Experience, Education and Certifications anchors and a fifth header destination. Remove the former full career records from About; retain its language, mobility and interests content. Existing chronology stays unchanged, early missions remain undated, ISEN is described as a track and ISO 27001 as awareness. Short-view desktop summaries remain readable. Each group has its own bounded stack; keyboard focus, open details, shared pause, reduced motion and mobile layouts release sticky positioning through the existing rules.

The continuation adds compact company/school anchor indexes above their respective stacks, with card-matching numbering. Chapter counts distinguish seven experiences, four education paths and six certification records. Indexes use four columns on desktop and two on phones, with native links, visible focus and no extra scroll handler. Short introductory sentences replace repeated mission/qualification paragraphs; the complete sourced descriptions remain in native details. No additional credentials or dates are inferred. The skill database returned no relevant progressive-disclosure match after a narrower retry; the content-density choice follows the existing disclosure pattern and general UX guidance, verified in the rendered page.

## Phone readability — 10 October 2026

Reserve the actual numeral width in every phone project header instead of a fixed 48px column, which crowded two-digit numbers against titles. Career cards retain their number/title pairing, then place the short introduction across the full card width at 15px with 1.65 line height. Dates, role and action follow in explicit rows. The verified UI skill match for heading line balance supports natural balanced wrapping without inserted breaks; long school names remain responsive. No additional motion runtime or media is introduced.

## Site consistency and disclosure cleanup — 10 October 2026

Use one main native details row for each of the twelve projects and eleven individually expandable career records. Remove nineteen duplicate internal header actions while retaining real external links. Main summaries share full-width separators, clear plus indicators and Kanit typography. FFA capabilities, LeadHunt's earlier workflow, Cardiag inspection and About interests no longer require a second disclosure opening. Remove the repeated About contact pill and overlapping descriptions while retaining useful evidence and all original galleries.

Apply the current font to legacy controls/footer links and neutral dark surfaces to inherited components. Contact gets a silver gradient section title, a separate readable introduction, neutral form fields and consistent actions. Correct the inherited phone column rule so the title/email arrow share a row with a 44px target. Header layouts reserve an action column only when a genuine external action exists.

Fix mobile navigation to the viewport, bound its height and allow scrolling on short screens. Coordinate root scroll padding with small anchor margins to prevent doubled gaps; native links still focus destinations below the fixed header. The UI skill's focus-not-obscured guidance supports this correction. Keep the original 3D, gallery, ribbon and stacking behaviors, including keyboard/reduced-motion fallbacks. No new media or runtime dependency is required.

## Method, international profile and interests — 10 October 2026

Expand meaningful source content into three readable chapters rather than adding more repeated project cards. Method follows Expertise with a two-column principle/stage composition, four semantic list entries and a copper progress rail driven by section scroll. International follows Career with four self-described language levels and mobility; Beyond work follows with the original 36-destination map and four interest cards. About exposes three compact chapter links instead of duplicating languages/interests. The five primary navigation destinations stay concise.

Retain Kanit, dark surfaces, silver gradient headings, muted copper and the existing spacing/radius vocabulary. MotionSites' catalogue informs the broad visual direction; animations are purpose-built. A scroll-driven ring turns around the method's four stages; CSS orbital rings and line icons give the international/interest panels quiet depth. No extra sticky scroll sequence or scroll hijacking is added. The UI skill's verified reduced-motion/motion-sensitivity guidance supports static readable final states.

Reveal animations start from visible pre-rendered content. CSS decorations animate only after enhancements initialise, and pause through the shared motion context for user pause, hidden tabs or reduced motion. They remain paused without JavaScript. Native destination details work without scripting and do not add individual map paths to keyboard navigation. Below 480px, language cards use full-width rows to preserve comfortable line lengths. New visuals are diagrammatic, not fabricated travel photos or application captures.

## Chapter navigation and motion refinement — 10 October 2026

Add a collapsed native project directory under the Projects introduction. Twelve numbered destinations match the case-study cards; bilingual labels and a four/three/two-column grid keep it compact. Native anchors reuse focus and header-offset handling. Current primary-navigation links receive a neutral underline and aria-current location, keeping the existing five destinations: Method maps to Expertise, International/Beyond work to About. The UI skill search verified smooth-scroll and active-state guidance; the implementation retains existing native scrolling rather than adding a scrolling library.

Use IntersectionObserver to select the current content group. Its vertical margins derive from viewport height in pixels, because percentage root margins are relative to viewport width and can collapse the detection strip on wide screens. Rebuild on resize and clean up observers/listeners. End-of-chapter links continue International → Beyond work → Contact.

Pause new CSS decorations when their sections leave a 100px visibility margin, as well as through shared pause, hidden-tab and reduced-motion preferences. Give phone interest cards a separate 100px illustration band and full-width descriptions instead of a cramped side column. Remove duplicated decorative interest labels and the unused legacy profile payload; all source-backed visible records remain. No new imagery, dependency or public content claim is introduced.

## Personal identity, typography and spatial motion — 10 October 2026

Follow the owner's explicit request to revisit the header, photo treatment, colours and site-wide typography. Space Grotesk headings and DM Sans body text replace Kanit. The UI/UX skill's narrowed typography query returned the Tech Startup pairing, which fits the product/engineering profile; its broader generated light/e-commerce recommendation was not adopted or persisted. Local variable fonts cover both languages. Use normal casing and medium/semibold weight for section headings, with comfortable body line heights and less uppercase noise.

On phones, Expertise uses an intrinsic numeral column and an explicit gap to prevent the wider display numerals crowding service titles.

The read-only LeadHunt `design-system/leadhunt/MASTER.md` snapshot at the current master branch informs hierarchy through spacing, surfaces and typography. Treat that product's blue/Geist/dashboard specification as reference context, not a replacement for the user's portfolio direction. The research snapshot remains outside the deliverable at `work/leadhunt-design-master-20261010.md`.

Anthracite, ivory and restrained petrol/teal create a coherent identity. Replace the purple CTA with a teal pill and dark label; harmonise orbital accents and the map legend/highlights. The colour portrait uses its original photograph inside a rounded rectangular, double-line frame, with a discreet identity/location signature. The header uses a matching S.B tile and full name/role on desktop; 44px controls and concise primary navigation remain.

Nine authentic tool wordmarks replace the old generic symbols on the WebGL medals. A single local atlas retains logo shapes, with no copied MotionSites model or media. Position them around the photograph and below the title, reducing to six on phones. Worker, main-thread and static fallbacks preserve content. Keep pointer rotations bounded so logos remain recognisable rather than spinning continuously through their backs.

Use original perspective entrances on existing reveal wrappers, with at least .92 opacity so text remains readable throughout. Portrait/language surfaces get bounded four-degree pointer tilt and a soft reflected highlight; language/interest visuals get one native perspective entrance. Existing scroll ribbons, text reveals, methodology rings and project/career stacking remain. The UI/UX reduced-motion and motion-sensitivity matches support immediate static final states for shared pause, hidden tabs or system preference. Public MotionSites previews inform spatial composition and material depth; no paid prompts/assets or heavy animation framework are added.


## Scroll zoom and expanded tool constellation — 10 October 2026

The owner requests a scroll zoom followed by more animated circles, icons and colours. Keep the existing header navigation and title at normal scale. Separate portrait and scene transforms: over 80% of the hero scroll distance the portrait grows up to 24% and the scene 16%, or 14%/10% on phones. Native scrolling and section heights remain; reverse scroll restores the original framing. Pause, hidden tabs and reduced motion reset both media layers immediately. Framer Motion already supplies the scroll motion value. Disable the legacy camera/spread scroll path in this React hero to avoid moving the medallions out of view after the first pixel of scroll.

Expand to fifteen authentic toolkit/ecosystem marks, with individual muted brand-inspired medal tints and varied sizes. Add Hunter.io, Apollo, LinkedIn, Kaspr, Stripe and Cloudflare to the previous nine. Use screen-normalised anchors to reserve the title, portrait and bottom actions at different aspect ratios, reducing to ten medallions on phones. The atlas remains one local texture and shares one geometry buffer. Remove tile backgrounds in atlas derivatives while retaining original source files. No external dependency or factual product claim is added.

## Education hierarchy and curriculum detail — 10 October 2026

Use the owner’s CV order rather than an inferred chronology where dates are absent. Restart numbering for every career chapter and derive both directory and card numerals from entry position; the 02/03 chapter label remains independent. Keep the same project card anatomy: institution, precise qualification, short purpose, context/logo row, three icon-led domains and a native detail control. Expand curricula into a two-column definition list on desktop and a single column on phones, with 16px body text and linked official references. Institutional logos use the existing monochrome project format; original domain icons are decorative beside readable labels. The historical Franche-Comté emblem is paired with the accessible institution name and a readable uFC abbreviation. Preserve school/degree/track distinctions and avoid inferring a vendor certification from preparation in a syllabus.
