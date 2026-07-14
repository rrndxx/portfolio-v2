# Design Brief — Portfolio Website

## Who this is for
A full-stack developer (React, Next.js, TypeScript, Tailwind, NestJS, FastAPI, Node/Express,
PostgreSQL, MySQL, Redis, Supabase, Firebase, Docker, Meilisearch) based in Cebu City, Philippines.
BSIT graduate, Magna Cum Laude. Existing GitHub username `rrndxx`, existing portfolio domain
`rrndxx.netlify.app` (this project replaces it).

## The core visual idea
Two references were used to define this direction. Neither should be copied — both should be
**translated into an original layout**. If any AI reading this is tempted to reach for a generic
"modern dev portfolio" template (centered hero, symmetric 3-column cards, fade-up-on-scroll
everywhere, rounded cards with soft shadows), **stop — that is exactly what this project must not
look like.**

### Reference 1 — Hero language ("tech-hero")
- Split-panel background: a bold flat color block on the left edge bleeding into a dark panel
  that holds the main content.
- A thin vertical navigation rail on the far left edge, rotated 90°, small caps, minimal — reads
  top-to-bottom, not a hamburger menu.
- Centered, oversized bold display wordmark sitting behind/beside the hero figure, large enough
  that the figure overlaps and breaks the letterforms.
- A soft radial glow disc sits directly behind the hero figure, giving it depth without a hard
  background swap.
- Top-right holds only 1-2 minimal UI elements (a pill button, a locale/toggle chip) — the header
  is otherwise empty. Bottom-left holds a small monospace tag (like a catalog/version number).
  Bottom-right holds 2-3 social icons only.
- Faint horizontal glitch/scan-line accents and ghost letterforms sit in the negative space behind
  the wordmark — decorative, low-opacity, never competing with foreground content.

**For this project:** the hero figure is a stylized/illustrated avatar (not a photo cutout), the
flat color block and glow use the new indigo/purple palette (see 02_DESIGN_SYSTEM.md) instead of
orange, and the wordmark is the person's name or role headline.

### Reference 2 — Editorial/asymmetric language ("story-block")
- Content is NOT centered or grid-symmetric. Text blocks, images, and tags sit at different
  widths, different vertical rhythms, deliberately unaligned to a simple 12-column grid.
- Oversized vertical stacked text (single word broken across 2 lines, reading top-to-bottom or
  rotated) acts as a graphic anchor, not just a label — e.g. a word split as two stacked halves
  running down the left side of a block.
- A large character/subject image bleeds off the edge of its container, overlapping a bold color
  field behind it (no card boundary — the image and the color shape interlock).
- Small credential/meta tags (pill-shaped, low-key) are scattered near the bottom of a block
  rather than lined up in a row.
- Color blocking is confident and large — one section can be almost entirely a single saturated
  color field with white/black text directly on it, no card, no shadow.
- Photography/screenshot inserts are small, offset, and irregularly placed — never inside a
  uniform grid of equal-sized thumbnails.

**For this project:** this asymmetric/overlapping language is reserved specifically for the
**Projects/Case Studies section** — the 2-3 featured projects each get a fully custom, unique
asymmetric layout (see 04_SECTIONS.md). It is not applied uniformly to every section; overusing it
everywhere would flatten its impact and start to look templated again.

## Non-negotiable design principles
1. **No repeated section pattern.** Each section should feel like it was laid out by hand, not
   generated from one repeating component. Vary column widths, vertical rhythm, and alignment
   section to section.
2. **Asymmetry over symmetry.** Default to off-center compositions. If something looks like it
   could be a Bootstrap/shadcn starter template, redesign it.
3. **Big confident type as a layout tool**, not just content — headlines can be oversized, cropped
   by the viewport edge, rotated, or stacked, as long as legibility of the actual message survives.
4. **Color blocking, not cards-with-shadows.** Prefer flat color fields, diagonal/angled dividers,
   and overlapping shapes over soft drop-shadow cards.
5. **Motion is restrained and purposeful** (see 02_DESIGN_SYSTEM.md motion section) — never
   decorate every element with a fade-up; motion should draw attention to 1-2 focal changes per
   section.
6. **Everything editable lives in JSON**, not hardcoded in components (see 03_ARCHITECTURE.md).

## Explicit anti-patterns (do not do these)
- Centered hero with a profile photo in a plain circle and a typewriter-effect tagline.
- Three equal-width feature cards with icon-on-top, title, paragraph, all identical shape.
- A skills section rendered as a uniform grid of logo badges in white rounded squares.
- Generic glassmorphism cards floating on a gradient mesh background.
- A timeline rendered as a plain centered vertical line with alternating left/right cards.
- Any section that could be swapped with a different developer's name/photo and look identical to
  a thousand other AI-generated portfolios.
