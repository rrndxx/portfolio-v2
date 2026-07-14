# Portfolio Context Package

This is the full context package for building the portfolio site in Cursor.

## How to use this
1. Copy everything in this folder into the root of a new (or existing) project folder that you'll
   open in Cursor. Keep `.cursorrules` at the project root — Cursor reads it automatically.
2. Keep `/data/*.json` where they are relative to root, or move them into the project's `/data`
   folder as described in `03_ARCHITECTURE.md` once the Next.js project is scaffolded.
3. Start a Cursor chat/composer session and say something like: *"Read all the context files in
   this project (01-04, .cursorrules, and /data) and scaffold the Next.js project according to
   them, starting with the design tokens and folder structure."*
4. Let it work through the workflow in `.cursorrules` step by step rather than asking for the
   whole site in one shot — this gives you checkpoints to review the layout language before it
   compounds across every section.

## File map
- `01_DESIGN_BRIEF.md` — the vision, translated reference language, and anti-patterns
- `02_DESIGN_SYSTEM.md` — colors, type, spacing, shape, motion
- `03_ARCHITECTURE.md` — stack, routes, folder structure, content contract
- `04_SECTIONS.md` — per-section layout + content spec
- `.cursorrules` — the operating instructions Cursor will follow automatically
- `/data/*.json` — real seed content (your actual tech stack and three real projects — NetDetect,
  Everyshelf, QR Wise Clinics — with `TODO:` markers where you still need to fill in specifics)

## Things you'll still want to do
- Replace `TODO:` strings in `/data/*.json` with real copy (bio, project descriptions, timeline,
  contact headline).
- Commission or generate the illustrated hero avatar and drop it at
  `/public/images/avatar/hero-avatar.png`.
- Add real project screenshots to `/public/images/projects/<slug>/` and gallery assets to
  `/public/images/gallery/`.
