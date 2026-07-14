interface GhostMarksProps {
  /** Letter seeds shown as ultra-low-opacity ambient glyphs. */
  letters?: string[];
  className?: string;
}

const DEFAULT_LETTERS = ["P", "R", "E", "S", "D"];

/**
 * Scattered ghost letterforms — Tech Gear ambient marks for any section.
 * A couple of glyphs drift slowly; the rest stay still.
 */
export function GhostMarks({
  letters = DEFAULT_LETTERS,
  className = "",
}: GhostMarksProps) {
  const placements = [
    { className: "left-[6%] top-[12%] text-[min(18vw,140px)]", drift: true, delay: "0s" },
    { className: "right-[8%] top-[28%] text-[min(14vw,110px)]", drift: false },
    { className: "left-[40%] bottom-[18%] text-[min(12vw,96px)]", drift: true, delay: "2.2s" },
    { className: "right-[22%] bottom-[32%] text-[min(10vw,80px)]", drift: false },
    { className: "left-[18%] top-[55%] text-[min(11vw,88px)]", drift: false },
  ];

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none",
        className,
      ].join(" ")}
    >
      {letters.slice(0, placements.length).map((letter, index) => {
        const placement = placements[index];
        return (
          <span
            key={`${letter}-${index}`}
            className={[
              "absolute font-hero font-bold leading-none text-text-primary/[0.05]",
              placement.className,
              placement.drift ? "ghost-drift" : "",
            ].join(" ")}
            style={placement.delay ? { animationDelay: placement.delay } : undefined}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}
