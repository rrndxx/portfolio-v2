import type { CSSProperties, ReactNode } from "react";
import {
  SECTION_CUTS,
  isLeftLean,
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
 * Cyber diagonal seam shell — glitch ribbon, barcode ticks along the cut.
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
  const leftLean = cut ? isLeftLean(cut) : false;

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

      {cutDef ? (
        <>
          {/* Primary glitch ribbon on the seam */}
          <div
            aria-hidden
            className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-[1] opacity-70"
            style={{
              height: cutDef.depth,
              clipPath: leftLean
                ? "polygon(0 0, 100% 0, 100% 40%, 0 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 0 40%)",
            }}
          />
          {/* Hard hairline along the cut */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] border-t border-accent-glow/35"
            style={{ height: cutDef.depth }}
          />
          {/* Barcode ticks riding the seam */}
          <div
            aria-hidden
            className={[
              "pointer-events-none absolute z-[1] flex gap-[3px]",
              leftLean ? "left-[8%] top-[0.6vw]" : "right-[8%] top-[0.6vw]",
            ].join(" ")}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="block w-[2px] -skew-x-[28deg] bg-text-primary/55"
                style={{ height: `${8 + (i % 3) * 5}px` }}
              />
            ))}
          </div>
          <div
            aria-hidden
            className={[
              "pointer-events-none absolute z-[1] h-[2px] w-10 bg-accent-electric/50",
              leftLean ? "right-[14%] top-[1.2vw]" : "left-[14%] top-[1.2vw]",
            ].join(" ")}
          />
        </>
      ) : null}

      <div className="relative z-[2]">{children}</div>
    </section>
  );
}
