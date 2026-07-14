import type { CSSProperties, ReactNode } from "react";
import {
  SECTION_CUTS,
  type SectionCutId,
} from "@/lib/section-cuts";

type BlendFrom = "void" | "panel";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  className?: string;
  cut?: SectionCutId;
  zIndex?: number;
  blendFrom?: BlendFrom;
  style?: CSSProperties;
}

const blendTone: Record<BlendFrom, string> = {
  void: "var(--bg-void)",
  panel: "var(--bg-panel)",
};

/**
 * Diagonal seam shell — glitch-textured edge along the slant, soft under-bleed.
 */
export function SectionShell({
  id,
  children,
  className = "",
  cut,
  zIndex = 1,
  blendFrom,
  style,
}: SectionShellProps) {
  const cutDef = cut ? SECTION_CUTS[cut] : null;

  const cutStyles: CSSProperties = cutDef
    ? {
        clipPath: cutDef.clipPath,
        marginTop: `calc(-1 * ${cutDef.depth})`,
        paddingTop: `calc(var(--section-pad-y, 5rem) + ${cutDef.depth})`,
      }
    : {};

  return (
    <section
      id={id}
      className={["relative overflow-hidden", className].join(" ")}
      style={{
        zIndex,
        ...cutStyles,
        ...style,
      }}
    >
      {blendFrom && cutDef ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1]"
          style={{
            height: `calc(${cutDef.depth} + 3rem)`,
            background: `linear-gradient(to bottom, ${blendTone[blendFrom]} 0%, transparent 85%)`,
          }}
        />
      ) : null}

      {/* Glitch ribbon hugging the diagonal top edge */}
      {cutDef ? (
        <div
          aria-hidden
          className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-[1] opacity-55"
          style={{
            height: cutDef.depth,
            clipPath:
              cut === "rise-left" ||
              cut === "steep-left" ||
              cut === "shallow-left"
                ? "polygon(0 0, 100% 0, 100% 35%, 0 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 0 35%)",
          }}
        />
      ) : null}

      <div className="relative z-[2]">{children}</div>
    </section>
  );
}
