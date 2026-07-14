# Section-by-Section Spec

Read `01_DESIGN_BRIEF.md` and `02_DESIGN_SYSTEM.md` first — this file assumes those rules apply
throughout. Each section below states its layout intent, JSON source, and responsive notes.

---

## 1. Hero
**Reads from:** `site-config.json`

- Split background: a full-height flat `--accent-primary` block on the far left (~28vw on
  desktop, collapses to a thin top strip on mobile), rest of viewport is `--bg-void`.
- `VerticalNavRail` sits on the left edge, rotated text, items: Home / About / Work / Gallery /
  Contact — scroll-spy highlights the active section in `--accent-glow`.
- Centered oversized wordmark using `text-hero` (Chakra Petch) — the person's name or a short
  role headline (e.g. "FULL-STACK / DEVELOPER") — large enough that the illustrated avatar
  overlaps it, matching how reference 1's figure breaks the wordmark.
- `GlowDisc` behind the avatar using `--gradient-glow`, subtle scale-in on load.
- `HeroAvatar`: illustrated/stylized avatar image, swappable via `site-config.json` → `heroAvatar`
  path. Positioned so it breaks the wordmark baseline, bottom-anchored to viewport.
- Top-right: a single pill button (e.g. "Let's talk" → scrolls to Contact) + nothing else.
- Bottom-left: small monospace/meta tag, e.g. a version-style stamp (`"PORTFOLIO — 2026"`).
- Bottom-right: 2-3 social icons (GitHub, email, and one optional) linking from `site-config.json`.
- Faint decorative ghost letterforms / ultra-low-opacity ambient shapes behind the wordmark —
  purely decorative, `aria-hidden`.

## 2. About / Bio
**Reads from:** `about.json`

- NOT a centered symmetric two-column "photo + paragraph." Use an offset container
  (unequal left/right padding) with the bio copy set at `text-body-lg`, a short pull-quote-style
  line set larger in Big Shoulders Display breaking the paragraph rhythm.
- Small credential tags (BSIT — Magna Cum Laude, Cebu City PH) placed loosely near the bottom of
  the block, not in a neat row — offset vertically from each other slightly.
- Simple fade + 8px rise reveal on scroll (per motion rules, this section keeps it restrained).

## 3. Skills & Tech Stack
**Reads from:** `skills.json`

- Avoid the generic "grid of logo badges" anti-pattern. Instead: group skills by category
  (Frontend, Backend, Data/Infra, Tooling) and render each category as its own irregular cluster —
  vary tag sizes slightly by category weight, stagger vertical position per tag rather than a
  strict grid line-up.
- Tags use `--bg-panel-raised` fill, `--text-secondary`, small hover shift to `--accent-electric`
  text.

## 4. Projects / Case Studies (the centerpiece — heaviest asymmetric treatment)
**Reads from:** `projects.json` (entries where `featured: true`, expect exactly 2-3)

This is where the reference-2 "story-block" language fully applies. Requirements:

- Each featured project gets **its own unique `ProjectBlock` layout variant** — do not build one
  reusable symmetric template and repeat it 3 times with different text. Vary: which side the
  image sits on, how much it bleeds off the container edge, where the vertical stacked-text title
  sits, how large the color field behind it is, where the meta tags/tech-stack pills land.
- At least one project block should use the stacked/rotated vertical title treatment
  (`text-display`, Big Shoulders Display, split across two stacked lines — mirroring the
  "HIS/STORY" treatment from reference 2).
- Project image bleeds outside its notional container and overlaps a large flat color field
  behind it (`--accent-primary` or `--bg-panel-raised` depending on contrast needs) — no card
  border, no drop shadow.
- Each block shows: project name, one-line description, 3-5 tech-stack tags (loosely placed, not
  a straight row), and a link out (live URL and/or GitHub repo from the JSON).
- Layered scroll-in animation: image layer, color-field layer, and text layer enter from different
  directions/delays (per motion rules) rather than all fading in together.
- End of section: a clear "View all work →" link to `/work`.

### `/work` overflow page (separate route, calmer)
- Lists all entries from `projects.json` (including featured ones) in `ProjectArchiveGrid` — this
  can be a more standard responsive grid of `ProjectCard`s, since this page's job is scannability,
  not spectacle. Still uses the same color tokens/typography, just less choreography.

## 5. Experience / Timeline
**Reads from:** `experience.json`

- Avoid the generic centered-line-with-alternating-cards pattern. Instead: a left-aligned
  vertical rule with entries offset at varying indent depths, dates set in `text-meta` style,
  role/company in Inter 600. Keep motion simple (fade + rise), this section supports Projects
  rather than competing with it.

## 6. Gallery
**Reads from:** `gallery.json`

- Mixed content: project screenshots + any design/art assets. Render as an irregular
  masonry-style layout with varied image aspect ratios and slight vertical offsets — explicitly
  not a uniform square-thumbnail grid.
- Optional lightbox on click (simple, no heavy library needed — a basic Framer Motion
  fade/scale overlay is enough).

## 7. Contact / Footer
**Reads from:** `site-config.json`

- Large closing headline (`text-h2` or bigger), email address as a prominent mailto link styled
  in `--accent-electric`.
- Footer row: GitHub (`rrndxx`) and portfolio link, small copyright/meta line.
- This section can use the standard centered container — it's the one place full symmetry is
  fine, since it's meant to feel like a calm, confident close rather than a competing spectacle.
