# Portfolio UI / UX — 5 November 2026

The primary audience is a recruiter or product team assessing Saad's profile,
project experience and fit before opening his CV or making contact.

## Direction

An editorial portfolio with ink, ivory and a restrained champagne accent.
Use local Inter variable fonts throughout, with genuine project images.
Put Saad's name and Product Owner role ahead of the toolkit. Give the three main
projects larger previews, explicit case-study links and direct navigation.

The user explicitly requested retaining the scroll-driven zoom and card stacking.
Preserve the existing hero zoom, chapter transitions, StackCard geometry controller,
pause control and reduced-motion behavior. Do not replace them with static cards.

## Constraints

- Preserve all eleven projects, factual claims, chronology, FR / EN pages, CVs,
  original galleries, contact handling, privacy content and source attribution.
- Keep anchor links and keyboard focus working with sticky cards.
- Make primary navigation and tap targets easy to identify on small screens.
- Changes remain on `codex/ui-ux-redesign` for review before publication.

## References applied

The user's UI/UX skills chat identifies the installed UI/UX Resource Library.
Relevant guides: UI/UX Pro Max, UX Laws, Fixing Accessibility and Fixing Motion
Performance. UI/UX Pro Max's portfolio search supports a minimal editorial grid
and clear type hierarchy; retained local typography takes precedence over its
generic ecommerce font suggestion.

## Section navigation — added 5 November

Six sections (Introduction, Projects, Expertise, Career, Profile and Contact)
replace the single continuous document after enhancement. The scrollable tab bar,
arrows, keyboard navigation, horizontal touch gestures and horizontal trackpad
gestures select the current section. Each section retains its vertical position;
mounted galleries, disclosures and form fields keep their state.

Transitions animate a few visible headings/previews only. The latest navigation
always wins and vertical input cancels entrance animations. Rapid horizontal
gestures can skip multiple sections. Gallery gestures and form controls are
excluded. Hidden sections are inert; native anchors reveal their target section.
The static HTML still contains all content and working links without JavaScript.

Sticky and zoom geometry now includes the tab bar height and is refreshed when
switching sections. Off-screen sections do not participate in the scroll effects.

## Verification

- TypeScript: `npm run typecheck` passes.
- Production: `npm run test:build` passes all 129 checks across domain, subfolder
  and unconfigured builds, including both languages, CVs and retained captures.
- Browser: hero zoom increases with scrolling; the preceding project shrinks as
  the following card overlaps it, using the existing sticky controller.
- Gallery: next capture, enlarged dialog, Escape and focus restoration work.
- Contact: empty submission produces three linked field errors, focuses the first
  field and does not send a message.
- Responsive layouts checked at 375, 768, 1024 and 1440 pixels without horizontal
  overflow. Mobile menu opens, closes with Escape and restores trigger focus.
- Language navigation renders the English page; pause/resume disables and
  restores sticky effects and the reading-progress line.

Section navigation verified in the browser: one visible panel; horizontal wheel
gesture skips from Projects to Contact; keyboard arrows/Home/End; browser Back
including the empty initial hash; a cross-section Skills link; FR/EN fragment
preservation; form text and reading position retained on tab return; no horizontal
page overflow at 375px. Touch swipe handlers are implemented; physical touch input
was not available in the desktop browser test surface.

## Typography, palette and vertical continuity

The latest owner request replaces the previous font pairing with local Inter
(400 body, 450 navigation, 500–550 headings). Headings use a consistent scale and
less compressed tracking; body copy stays readable at normal weight. Inter's
existing OFL licence is delivered with the build; the primary Latin face is
preloaded instead of the archived fonts.

- Canvas: #101317; raised surfaces: #191e24.
- Main text: #f5f3ee; secondary text: #aab0b8.
- Paper: #f1efe9; paper text: #24282d.
- Accent: #d8c7a6. Primary actions use ivory with dark text.
- Active tabs use an ivory selection tile, with a 340ms interruptible transform.
- Section entrances use 420ms transform/opacity easing. Further input remains
  available immediately and vertical scrolling settles unfinished entrances.

Vertical wheel input remains native within a section. At its end, additional
scroll intent advances to the following section at its start. Scrolling upward
from the start returns to the previous section's end. A 64px accumulated intent
threshold avoids tiny accidental boundary changes. Horizontal navigation and
keyboard alternatives remain; input fields, galleries and nested scrollers keep
their own interactions. Vertical touch boundary handlers are implemented; physical
touch remains unverified on the desktop test surface.

Browser checks cover forward and reverse wheel boundary transitions, normal
scrolling within Projects, the live Inter face, selected-tab geometry, and retained
zoom/stacking behavior. Project previews now use width-based responsive sources.

The final polish also removes the perspective tilt from text entrances, keeps
navigation surfaces opaque, and styles the no-WebGL fallback in the same palette.
The tab bar's initial layout now matches its enhanced layout, reducing its first
paint jump. The local production build and TypeScript checks pass after these
adjustments. The latest full production suite passed 129 checks.

References considered: [Bencho tab-bar interaction](https://bencho.dev/blocks/tab-bar)
and [UI Skills](https://www.ui-skills.com/skills), together with the installed UI/UX
Pro Max, UX Laws, accessibility and motion-performance guides. No remote component
code or additional runtime dependency was added.

## Navigation hardening

Horizontal momentum is now owned by a single gesture and resets when a tab,
keyboard action, touch gesture, history entry or vertical navigation takes over.
Reversing a gesture can return to its original section. Extra travel beyond the
first or last section is discarded, allowing an immediate reversal.

Mobile navigation exposes both previous and next arrows with 44px hit areas.
If activating an arrow disables that focused button at an end, focus moves to the
selected tab. Shift plus an arrow/Page key retains native text-selection behavior.

`npm run test:navigation` checks input-sequence and reading-position scenarios independently of
browser frame timing. It uses the existing esbuild dependency; no new dependency
is needed. TypeScript and production checks remain separate.

Browser verification of the hardening: both mobile arrows measure 44px with no
horizontal page overflow; the final next arrow moves focus to the Contact tab
when it becomes disabled; the first previous arrow symmetrically focuses
Introduction. Ctrl+End and Ctrl+Home scroll the Projects panel while preserving
the selected tab; unmodified End still selects Contact. Modifier combinations
are no longer consumed by the tab keyboard handler. Shift+ArrowUp preserves the
current section. The seven input-sequence tests, TypeScript and the production
build pass; the production suite also passed all 129 checks during this pass.

## Responsive reading bookmarks

Tab returns now remember a semantic section, chapter or project marker and its
distance below the fixed navigation, rather than only an absolute scroll value.
This preserves the current project when another tab is open during a viewport
change. Top and bottom bookmarks follow their corresponding new document edge.
Missing anchors fall back to a bounded absolute position. Geometry is measured
only when leaving or entering a tab, using cached flow offsets for sticky cards.
The same anchor collection serves browser-history restoration.

Browser reproduction: open Cardiag at desktop width, switch to Contact, resize to
390px, then return to Projects. Cardiag stays 16px below navigation (desktop
151px top with 135px navigation; mobile 147px with 131px navigation). The previous
absolute bookmark incorrectly returned to FFA/LeadHunt. The navigation suite now
covers 12 scenarios, including responsive reflow, the fragment-link reading
gutter, exact same-layout return, edge preservation and missing-anchor fallback.

## Bounded project frames

The tall-card bottom pin used a negative sticky top, allowing project content to
pass beneath the fixed navigation. Stack cards now have a frame bounded by the
available viewport below the header and tabs. Native document scroll moves the
inner content with a transform, while the card border stays in place. There is
no nested wheel scroller. The handoff reserves the full reading distance before
the next card covers it or scaling begins. ResizeObserver watches the inner
content so disclosures and responsive reflow update that distance too.

The prior details-open CSS fallback now applies only to unframed cards. Paused
motion and very short viewports expose complete content in normal flow. Keyboard
focus clearance uses the inner frame, including its padding. No-JavaScript cards
also remain complete and unconstrained.

Browser checks at 1440×900 and 390×844 confirm a pinned FFA frame stays below the
navigation and 24px above the bottom edge, including while reading expanded
details. `npm run test:stacks` exercises six geometry and reading scenarios using
the real controller with deterministic layout measurements.

## Project reading context

The main project frames now retain a compact identity bar above the moving
content: the real project name, its position in the eleven-project collection,
and named previous/next links. These links use native fragments and preserve
the existing history and keyboard behavior. The first and last project do not
cycle around. Controls have 44px hit areas; long labels truncate visually while
the article heading and accessible link names remain complete.

A thin decorative indicator reflects the amount of overflowing content revealed
by native scroll, including reverse scrolling. It is not a timer, an estimated
reading duration or an announcement on each scroll frame. All geometry stays in
the shared controller; React does not re-render during scrolling. The inner
viewport is also observed for font, toolbar and responsive sizing changes.

Frames with a toolbar require at least 300px of available height. Short landscape
screens, paused motion and reduced motion keep full content in ordinary flow.
The toolbar is hidden without the enhancement, leaving every case study intact.
The stack suite now checks eight scenarios; the production suite checks named,
ordered navigation in both languages (132 checks total).

Browser verification for this pass: FFA → LeadHunt via the project toolbar;
English LeadHunt → Cardiag with Enter and focus on the destination heading;
French/English labels retain the current fragment; Ansys at 320px truncates only
the compact visual name while both arrows remain 44px and the page has no
horizontal overflow; 844×390 landscape releases the frame into normal flow.
