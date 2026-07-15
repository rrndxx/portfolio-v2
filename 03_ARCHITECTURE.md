# Architecture

## Stack
- Next.js (App Router), TypeScript strict mode
- Tailwind CSS (design tokens from 02_DESIGN_SYSTEM.md wired into `tailwind.config.ts`)
- Framer Motion for animation
- No CMS — content is local JSON files under `/data`, typed with TypeScript interfaces
- Deploy target: Netlify (matches existing `rrndxx.netlify.app`)

## Routes
- `/` — single-page scroll: Hero → About → Skills → Projects (featured, 2-3 only) → Experience →
  Gallery → Contact. Nav rail scroll-spies and jumps to anchors on this page.
- `/work` — overflow projects page. Simple, calmer grid layout (still on-brand, but NOT the full
  asymmetric treatment — that's reserved for the 2-3 featured projects on the homepage). This page
  lists every project in `projects.json`, including the featured ones, so it can serve as a full
  archive. Link to it from the end of the homepage Projects section ("View all work →").
- `/work/[slug]` — optional individual case study page per project (scaffold the route and a
  basic template now; content can be filled in later). Slug comes from each project's `slug`
  field in `projects.json`.

## Folder structure
```
/app
  /page.tsx                 → homepage, composes section components in order
  /work
    /page.tsx                → overflow grid of all projects
    /[slug]/page.tsx          → individual case study template
  /layout.tsx
  /globals.css               → CSS variable tokens from 02_DESIGN_SYSTEM.md
/components
  /nav
    VerticalNavRail.tsx
  /hero
    Hero.tsx
    GlowDisc.tsx
    HeroAvatar.tsx           → swappable illustrated avatar component
  /about
    About.tsx
  /skills
    SkillsGrid.tsx
  /projects
    FeaturedProjects.tsx     → homepage section, asymmetric layout, reads first 2-3 `featured: true` entries
    ProjectBlock.tsx          → one fully custom asymmetric layout per featured project (each variant intentionally different — do not make this one reusable symmetric template)
    ProjectArchiveGrid.tsx    → calmer grid used on /work
    ProjectCard.tsx            → card used inside the archive grid
  /experience
    ExperienceTimeline.tsx
  /gallery
    GalleryPreview.tsx       → homepage teaser (featured tiles + link to archive)
    GalleryArchive.tsx       → full /gallery page (filters + dense grid)
    GalleryCard.tsx          → shared cyber frame tile + lightbox
  /contact
    Contact.tsx
  /ui                         → small shared primitives (Button, Tag, SectionHeading)
/app
  /gallery/page.tsx          → full visual archive
  /work/...                  → project overflow + case study
/data
  site-config.json
  about.json
  skills.json
  experience.json
  projects.json
  gallery.json
/lib
  types.ts                   → TypeScript interfaces mirroring every JSON shape below
  motion.ts                  → shared Framer Motion variants (ease curve, durations from 02_DESIGN_SYSTEM.md)
/public
  /images
    /projects/...
    /gallery/...
    /avatar/...
```

## Content editing contract
Every piece of copy, project entry, skill, timeline item, and gallery item is defined in `/data/*.json`.
Components read from these files at build time (Server Components importing JSON directly, or a
small typed loader in `/lib`). **No section component should contain hardcoded copy** — if new
placeholder text is needed temporarily, put it in the JSON file with a clear `TODO` marker inside
the string itself, e.g. `"headline": "TODO: replace with your own tagline"`.

See `04_SECTIONS.md` for what each section needs from its JSON file, and the `/data/*.json` seed
files in this package for the actual shape + starter content.
