type BlendFrom = "void" | "panel";

interface SectionBlendProps {
  /** Background of the previous section — fades soft into this one. */
  from?: BlendFrom;
  /** Optional soft wash leaving toward the next section. */
  to?: BlendFrom;
}

const tone: Record<BlendFrom, string> = {
  void: "var(--bg-void)",
  panel: "var(--bg-panel)",
};

/**
 * Soft gradient seams between sections — replaces hard border/clip dividers.
 */
export function SectionBlend({ from = "void", to }: SectionBlendProps) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 md:h-36"
        style={{
          background: `linear-gradient(to bottom, ${tone[from]} 0%, transparent 100%)`,
        }}
      />
      {to ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 md:h-28"
          style={{
            background: `linear-gradient(to top, ${tone[to]} 0%, transparent 100%)`,
          }}
        />
      ) : null}
    </>
  );
}
