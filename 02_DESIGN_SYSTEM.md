# Design System

## Color tokens
Dark mode only — no light mode toggle. Define these as CSS variables in `globals.css` and mirror
them in `tailwind.config.ts` under `theme.extend.colors`. Never hardcode hex values inside
components; always reference the token.

```css
:root {
  /* Base */
  --bg-void: #0A0A14;        /* page background, near-black with purple undertone */
  --bg-panel: #15151F;       /* section/panel backgrounds, one step lighter than void */
  --bg-panel-raised: #1C1C2A; /* cards, raised surfaces, hover states */
  --border-subtle: #2A2A3D;  /* hairline borders, dividers */

  /* Accent (this is the #5C5CFF replacement) */
  --accent-primary: #6C5CE7;   /* core indigo-violet — primary buttons, key highlights, hero glow core */
  --accent-primary-dim: #4A3FA8; /* pressed/muted state of primary accent */
  --accent-glow: #A78BFA;      /* lighter lavender — glow discs, hover text, decorative accents */
  --accent-electric: #8B7CFF;  /* slightly brighter mid-tone, for links/interactive text */

  /* Text */
  --text-primary: #F1F0FF;   /* headings, primary copy */
  --text-secondary: #C7C4E0; /* body copy on dark panels */
  --text-muted: #8A8AA3;     /* meta text, tags, captions */
  --text-on-accent: #0A0A14; /* text placed on top of accent-colored fields */

  /* Utility */
  --success: #4ADE80;
  --warning: #FBBF24;
}
```

Gradients (used sparingly — hero glow, section dividers only):
- `--gradient-glow: radial-gradient(circle, var(--accent-primary) 0%, var(--accent-glow) 40%, transparent 70%);`
- `--gradient-panel-edge: linear-gradient(135deg, var(--accent-primary) 0%, transparent 60%);`

## Typography
Load via `next/font/google`. Three distinct families, each with one clear job — do not blend
their roles.

| Role | Font | Weight(s) | Where used |
|---|---|---|---|
| Hero display / tech wordmark | **Chakra Petch** | 600, 700 | Hero name/headline only |
| Editorial section headers | **Big Shoulders Display** | 800, 900 | Section titles, stacked/vertical text blocks, the "story-block" treatment in Projects |
| Body / UI text | **Inter** | 400, 500, 600 | Paragraphs, nav labels, buttons, tags, form fields |

Type scale (Tailwind `fontSize` extension, mobile value → desktop value):
- `text-hero`: 2.75rem → 6.5rem (Chakra Petch 700, tight leading, negative tracking ~-0.02em)
- `text-display`: 2rem → 4.5rem (Big Shoulders Display 900, used for stacked/rotated headers)
- `text-h2`: 1.5rem → 2.5rem (Big Shoulders Display 800)
- `text-body-lg`: 1.125rem (Inter 400)
- `text-body`: 1rem (Inter 400)
- `text-meta`: 0.75rem, uppercase, letter-spacing 0.08em (Inter 500) — for tags, nav rail labels

## Spacing & grid
- Base unit: 4px. Section vertical padding: 96px–160px desktop, 56px–80px mobile.
- Do NOT use a uniform centered max-width container for every section. Alternate between:
  - Full-bleed (content touches viewport edge, e.g. hero color block, project image bleed)
  - Offset container (e.g. `padding-left: 12vw; padding-right: 4vw` — deliberately unequal)
  - Standard centered container (`max-width: 1280px`, mx-auto) — reserve this for About/Contact
    only, where symmetry is fine because there's no competing asymmetric content.

## Shape language
- Diagonal dividers between sections using `clip-path: polygon(...)` — vary the angle per section,
  don't reuse the same cut twice in a row.
- Overlapping layers: an image or color block that partially covers an adjacent block (achieved
  with negative margins or absolute positioning + z-index), specifically in the Projects section.
- Avoid `border-radius` beyond small values (4-8px) on buttons/tags only. No large rounded cards —
  this is a hard-edged, architectural aesthetic, not a soft SaaS-app aesthetic.

## Motion (Framer Motion)
- Default ease: `[0.22, 1, 0.36, 1]` (custom cubic-bezier, confident deceleration).
- Default duration: 0.6s for section-level reveals, 0.3s for hover/interactive states.
- Scroll reveals: use `whileInView` with `viewport={{ once: true, margin: "-10%" }}` — animate in
  once, never re-trigger on scroll-up (avoids the "everything jitters" feeling).
- Vary the reveal per section: hero uses a scale+fade on the glow disc and a staggered
  letter/word reveal on the wordmark; Projects section uses layered elements sliding in from
  different directions per layer (not all from the same side); About/Skills can use a simple
  fade+8px rise — reserve the more elaborate choreography for Hero and Projects only.
- Hover states: interactive elements (project cards, nav rail items) get a subtle
  color/opacity shift and a 2-4px transform, never a large scale jump.
- Respect `prefers-reduced-motion`: disable transforms, keep opacity fades only.
