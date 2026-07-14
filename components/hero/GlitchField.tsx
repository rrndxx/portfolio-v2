type GlitchTone = "primary" | "glow" | "electric" | "white";

interface GlitchStreak {
  top: string;
  left: string;
  width: string;
  tone: GlitchTone;
  height?: string;
  opacity?: number;
}

const toneClass: Record<GlitchTone, string> = {
  primary: "bg-accent-primary",
  glow: "bg-accent-glow",
  electric: "bg-accent-electric",
  white: "bg-text-primary",
};

/**
 * Short horizontal streaks — tech-hero glitch language.
 * Kept decorative and low-opacity so they never compete with type.
 */
const STREAKS: GlitchStreak[] = [
  { top: "12%", left: "8%", width: "3.5rem", tone: "glow", opacity: 0.55 },
  { top: "14%", left: "18%", width: "1.25rem", tone: "electric", opacity: 0.4 },
  { top: "18%", left: "72%", width: "2.75rem", tone: "primary", opacity: 0.45 },
  { top: "22%", left: "6%", width: "5rem", tone: "white", opacity: 0.18, height: "1px" },
  { top: "28%", left: "55%", width: "1.75rem", tone: "glow", opacity: 0.5 },
  { top: "31%", left: "62%", width: "0.85rem", tone: "electric", opacity: 0.55 },
  { top: "36%", left: "10%", width: "2.25rem", tone: "primary", opacity: 0.35 },
  { top: "41%", left: "78%", width: "4rem", tone: "glow", opacity: 0.4 },
  { top: "44%", left: "84%", width: "1.1rem", tone: "white", opacity: 0.25 },
  { top: "52%", left: "14%", width: "1.5rem", tone: "electric", opacity: 0.45 },
  { top: "55%", left: "20%", width: "3.25rem", tone: "primary", opacity: 0.3 },
  { top: "58%", left: "68%", width: "2rem", tone: "glow", opacity: 0.5 },
  { top: "63%", left: "48%", width: "0.75rem", tone: "electric", opacity: 0.6 },
  { top: "68%", left: "8%", width: "2.5rem", tone: "white", opacity: 0.15 },
  { top: "72%", left: "75%", width: "3.5rem", tone: "primary", opacity: 0.35 },
  { top: "76%", left: "82%", width: "1.25rem", tone: "glow", opacity: 0.45 },
  { top: "24%", left: "40%", width: "1rem", tone: "electric", opacity: 0.35 },
  { top: "48%", left: "38%", width: "2rem", tone: "primary", opacity: 0.25 },
];

export function GlitchField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden md:left-[22vw]"
    >
      {STREAKS.map((streak, index) => (
        <span
          key={`${streak.top}-${streak.left}-${index}`}
          className={[
            "absolute block",
            toneClass[streak.tone],
            streak.height ? "" : "h-[2px]",
          ].join(" ")}
          style={{
            top: streak.top,
            left: streak.left,
            width: streak.width,
            height: streak.height,
            opacity: streak.opacity ?? 0.4,
          }}
        />
      ))}

      {/* Sparse scan-row clusters — short dashes grouped like a glitch burst */}
      <div className="absolute top-[33%] left-[8%] flex gap-1 opacity-50">
        <span className="block h-[2px] w-3 bg-accent-glow" />
        <span className="block h-[2px] w-1.5 bg-accent-electric" />
        <span className="block h-[2px] w-5 bg-accent-primary" />
      </div>
      <div className="absolute top-[61%] right-[12%] flex gap-1 opacity-45">
        <span className="block h-[2px] w-4 bg-accent-primary" />
        <span className="block h-[2px] w-2 bg-text-primary/80" />
        <span className="block h-[2px] w-3 bg-accent-glow" />
      </div>
    </div>
  );
}
