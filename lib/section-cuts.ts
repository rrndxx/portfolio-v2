import type { CSSProperties } from "react";

export type SectionCutId =
  | "rise-left"
  | "rise-right"
  | "steep-left"
  | "steep-right"
  | "shallow-left"
  | "shallow-right";

type CutDef = {
  /** clip-path polygon — top edge is the diagonal seam */
  clipPath: string;
  /** How far the diagonal drops — used for -margin / +padding overlap */
  depth: string;
};

/**
 * Diagonal section seams (02_DESIGN_SYSTEM).
 * Alternate left/right lean — never reuse the same cut twice in a row.
 */
export const SECTION_CUTS: Record<SectionCutId, CutDef> = {
  "rise-left": {
    clipPath: "polygon(0 4vw, 100% 0, 100% 100%, 0 100%)",
    depth: "4vw",
  },
  "rise-right": {
    clipPath: "polygon(0 0, 100% 4vw, 100% 100%, 0 100%)",
    depth: "4vw",
  },
  "steep-left": {
    clipPath: "polygon(0 6vw, 100% 0, 100% 100%, 0 100%)",
    depth: "6vw",
  },
  "steep-right": {
    clipPath: "polygon(0 0, 100% 6vw, 100% 100%, 0 100%)",
    depth: "6vw",
  },
  "shallow-left": {
    clipPath: "polygon(0 2.75vw, 100% 0, 100% 100%, 0 100%)",
    depth: "2.75vw",
  },
  "shallow-right": {
    clipPath: "polygon(0 0, 100% 2.75vw, 100% 100%, 0 100%)",
    depth: "2.75vw",
  },
};

export function sectionCutStyle(id: SectionCutId): CSSProperties {
  const cut = SECTION_CUTS[id];
  return {
    clipPath: cut.clipPath,
    marginTop: `calc(-1 * ${cut.depth})`,
    paddingTop: `calc(var(--section-pad-y, 4rem) + ${cut.depth})`,
  };
}
