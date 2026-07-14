import type { Achievement } from "@/lib/types";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

type FrameVariant =
  | "bracket"
  | "datalink"
  | "capsule"
  | "hazard"
  | "octagon"
  | "blade";

const VARIANTS: FrameVariant[] = [
  "bracket",
  "datalink",
  "capsule",
  "hazard",
  "octagon",
  "blade",
];

const STROKE = "var(--accent-glow)";
const FILL = "color-mix(in srgb, var(--accent-primary) 22%, transparent)";
const SOLID = "var(--accent-electric)";

function FrameSvg({ variant }: { variant: FrameVariant }) {
  switch (variant) {
    case "bracket":
      return (
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 160 220"
          preserveAspectRatio="none"
        >
          {/* Outer chamfered body */}
          <path
            d="M16 28 H144 L152 36 V184 L144 192 H16 L8 184 V36 Z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Header trapezoid fill */}
          <path d="M40 8 H120 L132 28 H28 Z" fill={SOLID} opacity="0.9" />
          <path
            d="M16 28 H144"
            stroke={STROKE}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          {/* Footer trapezoid fill */}
          <path d="M28 192 H132 L120 212 H40 Z" fill={SOLID} opacity="0.9" />
          <path
            d="M16 192 H144"
            stroke={STROKE}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );

    case "datalink":
      return (
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 160 220"
          preserveAspectRatio="none"
        >
          <path
            d="M12 32 H128 L148 20 V40 L152 44 V176 L148 180 V200 L128 188 H12 L8 184 V36 Z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <rect x="118" y="8" width="28" height="6" fill={SOLID} opacity="0.95" />
          <rect x="132" y="16" width="14" height="4" fill={STROKE} opacity="0.7" />
          <path
            d="M12 32 H128"
            stroke={STROKE}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M12 188 H128"
            stroke={STROKE}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <rect x="118" y="206" width="28" height="6" fill={SOLID} opacity="0.95" />
          <rect x="132" y="200" width="14" height="4" fill={STROKE} opacity="0.7" />
        </svg>
      );

    case "capsule":
      return (
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 160 220"
          preserveAspectRatio="none"
        >
          <path
            d="M20 36 H140 L152 48 V172 L140 184 H20 L8 172 V48 Z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Hex capsule header */}
          <path d="M36 8 H124 L136 20 H120 L112 28 H48 L40 20 H24 Z" fill={SOLID} />
          <path
            d="M8 48 H20 M140 48 H152"
            stroke={STROKE}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M20 36 H140 M20 184 H140"
            stroke={STROKE}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          {/* Hex capsule footer */}
          <path d="M48 192 H112 L120 200 H136 L124 212 H36 L24 200 H40 Z" fill={SOLID} />
          <path
            d="M8 172 H20 M140 172 H152"
            stroke={STROKE}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );

    case "hazard":
      return (
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 160 220"
          preserveAspectRatio="none"
        >
          <path
            d="M14 34 H146 L152 40 V180 L146 186 H14 L8 180 V40 Z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Segmented header rule */}
          <path
            d="M14 34 H52 M64 34 H96 M108 34 H146"
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Hazard stripes top */}
          <path d="M58 10 L66 26 H60 L52 10 Z" fill={SOLID} />
          <path d="M76 10 L84 26 H78 L70 10 Z" fill={SOLID} />
          <path d="M94 10 L102 26 H96 L88 10 Z" fill={SOLID} />
          {/* Segmented footer rule */}
          <path
            d="M14 186 H52 M64 186 H96 M108 186 H146"
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M58 194 L66 210 H60 L52 194 Z" fill={SOLID} />
          <path d="M76 194 L84 210 H78 L70 194 Z" fill={SOLID} />
          <path d="M94 194 L102 210 H96 L88 194 Z" fill={SOLID} />
        </svg>
      );

    case "octagon":
      return (
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 160 220"
          preserveAspectRatio="none"
        >
          {/* Wide octagonal silhouette */}
          <path
            d="M28 40 H132 L148 56 V164 L132 180 H28 L12 164 V56 Z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M4 28 H156 L148 40 H12 Z"
            fill="none"
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M52 12 L64 32 H56 L44 12 Z" fill={SOLID} />
          <path d="M74 12 L86 32 H78 L66 12 Z" fill={SOLID} />
          <path d="M96 12 L108 32 H100 L88 12 Z" fill={SOLID} />
          <path
            d="M4 192 H156 L148 180 H12 Z"
            fill="none"
            stroke={STROKE}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M52 188 L64 208 H56 L44 188 Z" fill={SOLID} />
          <path d="M74 188 L86 208 H78 L66 188 Z" fill={SOLID} />
          <path d="M96 188 L108 208 H100 L88 188 Z" fill={SOLID} />
        </svg>
      );

    case "blade":
      return (
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 160 220"
          preserveAspectRatio="none"
        >
          <path
            d="M12 36 H120 L128 28 L140 28 L152 40 V60 L146 66 V154 L152 160 V180 L140 192 L128 192 L120 184 H40 L28 192 L16 192 L8 180 V160 L14 154 V66 L8 60 V40 Z"
            fill={FILL}
            stroke={STROKE}
            strokeWidth="1.5"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
          {/* Broken line gaps feel */}
          <path
            d="M20 36 H70 M82 36 H110"
            stroke={STROKE}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M50 184 H90 M102 184 H140"
            stroke={STROKE}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <rect x="128" y="10" width="18" height="5" fill={SOLID} />
          <rect x="14" y="205" width="18" height="5" fill={SOLID} />
        </svg>
      );
  }
}

/**
 * HUD achievement frame — title + year only; six Tech Gear silhouettes.
 */
export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const variant = VARIANTS[index % VARIANTS.length];

  return (
    <article
      className={[
        "group relative aspect-[160/220] w-full max-w-[220px]",
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1.5",
      ].join(" ")}
      style={{
        filter:
          "drop-shadow(0 0 10px color-mix(in srgb, var(--accent-glow) 32%, transparent))",
      }}
    >
      <FrameSvg variant={variant} />

      <div className="relative z-[1] flex h-full flex-col items-center justify-center px-6 text-center">
        <h3 className="font-display text-[clamp(1.05rem,2.2vw,1.35rem)] uppercase leading-[1.05] tracking-tight text-text-primary">
          {achievement.title}
        </h3>
        <p className="mt-4 font-sans text-meta uppercase tracking-[0.2em] text-accent-glow">
          {achievement.year}
        </p>
      </div>
    </article>
  );
}
