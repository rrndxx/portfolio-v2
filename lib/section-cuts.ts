import type { CSSProperties } from "react";

export type SectionCutId =
  | "rise-left"
  | "rise-right"
  | "steep-left"
  | "steep-right"
  | "shallow-left"
  | "shallow-right"
  | "blade-left"
  | "blade-right";

type CutDef = {
  /** clip-path polygon — top edge is the diagonal seam */
  clipPath: string;
  /** How far the diagonal drops — used for -margin / +padding overlap */
  depth: string;
  lean: "left" | "right";
};

/**
 * Diagonal / blade section seams (cyber language).
 * Alternate left/right lean — never reuse the same cut twice in a row.
 */
export const SECTION_CUTS: Record<SectionCutId, CutDef> = {
  "rise-left": {
    clipPath: "polygon(0 4.5vw, 100% 0, 100% 100%, 0 100%)",
    depth: "4.5vw",
    lean: "left",
  },
  "rise-right": {
    clipPath: "polygon(0 0, 100% 4.5vw, 100% 100%, 0 100%)",
    depth: "4.5vw",
    lean: "right",
  },
  "steep-left": {
    clipPath: "polygon(0 7vw, 100% 0, 100% 100%, 0 100%)",
    depth: "7vw",
    lean: "left",
  },
  "steep-right": {
    clipPath: "polygon(0 0, 100% 7vw, 100% 100%, 0 100%)",
    depth: "7vw",
    lean: "right",
  },
  "shallow-left": {
    clipPath: "polygon(0 3vw, 100% 0, 100% 100%, 0 100%)",
    depth: "3vw",
    lean: "left",
  },
  "shallow-right": {
    clipPath: "polygon(0 0, 100% 3vw, 100% 100%, 0 100%)",
    depth: "3vw",
    lean: "right",
  },
  /** Notched blade — hard cyber step in the seam */
  "blade-left": {
    clipPath:
      "polygon(0 5.5vw, 48% 1.75vw, 52% 3.75vw, 100% 0, 100% 100%, 0 100%)",
    depth: "5.5vw",
    lean: "left",
  },
  "blade-right": {
    clipPath:
      "polygon(0 0, 48% 3.75vw, 52% 1.75vw, 100% 5.5vw, 100% 100%, 0 100%)",
    depth: "5.5vw",
    lean: "right",
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

export function isLeftLean(id: SectionCutId): boolean {
  return SECTION_CUTS[id].lean === "left";
}
