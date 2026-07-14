type AtmosphereVariant = "experience" | "skills" | "gallery";

interface SectionAtmosphereProps {
  variant?: AtmosphereVariant;
}

/**
 * Soft geometric / glitch fillers for otherwise empty side space.
 * Decorative only — never competes with copy.
 */
export function SectionAtmosphere({
  variant = "experience",
}: SectionAtmosphereProps) {
  if (variant === "experience") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Large soft orbs — fill the blank right half */}
        <div
          className="absolute -right-[8%] top-[8%] hidden h-[min(52vw,440px)] w-[min(52vw,440px)] rounded-full md:block"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 35%, transparent) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute right-[6%] top-[38%] hidden h-[min(28vw,260px)] w-[min(28vw,260px)] rounded-full border border-accent-glow/15 md:block"
        />
        <div
          className="absolute right-[18%] bottom-[12%] hidden h-[min(36vw,300px)] w-[min(36vw,300px)] rounded-full md:block"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-glow) 22%, transparent) 0%, transparent 70%)",
          }}
        />

        {/* Ring + small solid dots as geometric combo */}
        <div className="absolute right-[28%] top-[22%] hidden h-3 w-3 rounded-full bg-accent-electric/40 md:block" />
        <div className="absolute right-[12%] top-[58%] hidden h-2 w-2 rounded-full bg-accent-glow/50 md:block" />
        <div
          className="absolute right-[34%] bottom-[28%] hidden h-16 w-16 rounded-full border border-accent-primary/20 md:block"
        />

        {/* Glitch ticks in the empty zone */}
        <span className="absolute right-[22%] top-[18%] hidden h-[2px] w-12 bg-accent-glow/35 md:block" />
        <span className="absolute right-[20%] top-[20%] hidden h-[2px] w-5 bg-accent-electric/40 md:block" />
        <span className="absolute right-[30%] top-[48%] hidden h-[2px] w-9 bg-text-primary/15 md:block" />
        <span className="absolute right-[14%] top-[50%] hidden h-[2px] w-4 bg-accent-primary/45 md:block" />
        <span className="absolute right-[26%] bottom-[22%] hidden h-[2px] w-14 bg-accent-glow/25 md:block" />
        <span className="absolute right-[24%] bottom-[24%] hidden h-[2px] w-6 bg-accent-electric/30 md:block" />

        <div className="absolute right-[16%] top-[64%] hidden gap-1 opacity-50 md:flex">
          <span className="h-[2px] w-3 bg-accent-glow" />
          <span className="h-[2px] w-1.5 bg-accent-electric" />
          <span className="h-[2px] w-5 bg-accent-primary" />
        </div>
      </div>
    );
  }

  if (variant === "skills") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute -left-[12%] bottom-[-10%] h-[320px] w-[320px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 28%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-6%] top-[10%] h-[240px] w-[240px] rounded-full border border-border-subtle/80"
        />
        <span className="absolute right-[10%] top-[28%] h-[2px] w-10 bg-accent-glow/30" />
        <span className="absolute right-[8%] top-[30%] h-[2px] w-4 bg-accent-electric/35" />
      </div>
    );
  }

  // gallery
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute -left-[8%] bottom-[-8%] h-[280px] w-[280px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-[4%] top-[12%] h-[180px] w-[180px] rounded-full border border-accent-glow/10"
      />
      <span className="absolute left-[12%] top-[20%] h-[2px] w-8 bg-accent-glow/25" />
      <span className="absolute left-[14%] top-[22%] h-[2px] w-3 bg-text-primary/20" />
    </div>
  );
}
