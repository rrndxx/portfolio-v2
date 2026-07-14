interface GhostMarksProps {
  /** Letter seeds shown as ultra-low-opacity ambient glyphs. */
  letters?: string[];
  className?: string;
}

const DEFAULT_LETTERS = ["P", "R", "E", "S", "D"];

/**
 * Scattered ghost letterforms — Tech Gear ambient marks for any section.
 */
export function GhostMarks({
  letters = DEFAULT_LETTERS,
  className = "",
}: GhostMarksProps) {
  const placements = [
    "left-[6%] top-[12%] text-[min(18vw,140px)]",
    "right-[8%] top-[28%] text-[min(14vw,110px)]",
    "left-[40%] bottom-[18%] text-[min(12vw,96px)]",
    "right-[22%] bottom-[32%] text-[min(10vw,80px)]",
    "left-[18%] top-[55%] text-[min(11vw,88px)]",
  ];

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none",
        className,
      ].join(" ")}
    >
      {letters.slice(0, placements.length).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={[
            "absolute font-hero font-bold leading-none text-text-primary/[0.05]",
            placements[index],
          ].join(" ")}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
