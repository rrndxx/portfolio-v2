interface CyberAmbientProps {
  /** Hero uses full; sections use lite so hierarchy stays clear. */
  density?: "full" | "lite";
  className?: string;
}

/**
 * Hard cyber geometry — slash bands, corner cuts, barcode ticks, glitch marks.
 */
export function CyberAmbient({
  density = "lite",
  className = "",
}: CyberAmbientProps) {
  const lite = density === "lite";

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        lite ? "cyber-ambient-lite" : "cyber-ambient-full",
        className,
      ].join(" ")}
    >
      <div className="cyber-slash-wash absolute inset-0" />

      <div className="cyber-slash cyber-slash-a" />
      <div className="cyber-slash cyber-slash-b" />
      {!lite ? (
        <>
          <div className="cyber-slash cyber-slash-c" />
          <div className="cyber-slash cyber-slash-d" />
        </>
      ) : (
        <div className="cyber-slash cyber-slash-c" />
      )}

      <div className="cyber-cut cyber-cut-tl" />
      <div className="cyber-cut cyber-cut-br" />

      {/* Barcode ticks */}
      <div className="absolute left-[6%] top-[16%] flex gap-1 md:left-[9%]">
        {[0, 1, 2, 3, ...(lite ? [] : [4])].map((i) => (
          <span
            key={`t-${i}`}
            className="cyber-tick block w-[2px] -skew-x-[28deg] bg-text-primary"
            style={{ height: `${12 + (i % 3) * 7}px` }}
          />
        ))}
      </div>
      <div className="absolute bottom-[18%] right-[8%] flex gap-1 md:right-[11%]">
        {[0, 1, 2].map((i) => (
          <span
            key={`b-${i}`}
            className="cyber-tick block w-[2px] -skew-x-[28deg] bg-accent-glow"
            style={{ height: `${14 + ((i + 1) % 3) * 6}px` }}
          />
        ))}
      </div>

      {/* Sparse glitch marks */}
      <div className="cyber-glitch-mark absolute left-[22%] top-[38%] flex gap-1">
        <span className="glitch-anim-blink block h-[2px] w-8 bg-accent-electric" />
        <span className="block h-[2px] w-3 bg-text-primary/50" />
      </div>
      <div className="cyber-glitch-mark absolute right-[18%] top-[55%] flex gap-1">
        <span
          className="glitch-anim-flicker block h-[2px] w-10 bg-accent-glow"
          style={{ animationDelay: "1.2s" }}
        />
        <span className="block h-[2px] w-2 bg-accent-primary/60" />
      </div>
      {!lite ? (
        <div className="cyber-glitch-mark absolute left-[40%] bottom-[30%] flex gap-1.5">
          <span className="block h-[3px] w-4 bg-accent-glow/80" />
          <span className="glitch-anim-scan block h-[3px] w-6 bg-accent-primary" />
          <span className="block h-[3px] w-2 bg-text-primary/50" />
        </div>
      ) : (
        <div className="cyber-glitch-mark absolute left-[48%] bottom-[28%]">
          <span
            className="glitch-anim-blink block h-[2px] w-12 bg-accent-primary/70"
            style={{ animationDelay: "0.8s" }}
          />
        </div>
      )}

      {/* Hard diamond flecks — no soft circles */}
      <div className="cyber-fleck absolute right-[14%] top-[24%] hidden h-2 w-2 rotate-45 border border-accent-glow/40 md:block" />
      <div className="cyber-fleck absolute left-[16%] bottom-[34%] hidden h-1.5 w-1.5 rotate-45 bg-accent-electric/30 md:block" />
    </div>
  );
}
