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

/** Denser, higher-contrast streaks for hero + section accents. */
const STREAKS: GlitchStreak[] = [
  { top: "10%", left: "22%", width: "4.5rem", tone: "glow", opacity: 0.75, height: "2px" },
  { top: "11%", left: "32%", width: "1.5rem", tone: "electric", opacity: 0.7, height: "2px" },
  { top: "14%", left: "68%", width: "3.25rem", tone: "primary", opacity: 0.65, height: "2px" },
  { top: "15%", left: "76%", width: "1.1rem", tone: "white", opacity: 0.45, height: "2px" },
  { top: "22%", left: "18%", width: "2.75rem", tone: "electric", opacity: 0.6, height: "2px" },
  { top: "28%", left: "55%", width: "5rem", tone: "glow", opacity: 0.55, height: "2px" },
  { top: "29%", left: "64%", width: "1.25rem", tone: "primary", opacity: 0.7, height: "3px" },
  { top: "36%", left: "26%", width: "3.5rem", tone: "white", opacity: 0.35, height: "2px" },
  { top: "42%", left: "72%", width: "2.5rem", tone: "glow", opacity: 0.7, height: "2px" },
  { top: "43%", left: "78%", width: "0.9rem", tone: "electric", opacity: 0.75, height: "3px" },
  { top: "48%", left: "20%", width: "4rem", tone: "primary", opacity: 0.55, height: "2px" },
  { top: "54%", left: "58%", width: "3rem", tone: "glow", opacity: 0.6, height: "2px" },
  { top: "58%", left: "30%", width: "1.75rem", tone: "electric", opacity: 0.65, height: "2px" },
  { top: "62%", left: "74%", width: "4.25rem", tone: "primary", opacity: 0.55, height: "2px" },
  { top: "63%", left: "82%", width: "1.4rem", tone: "white", opacity: 0.4, height: "2px" },
  { top: "70%", left: "24%", width: "2.25rem", tone: "glow", opacity: 0.65, height: "2px" },
  { top: "76%", left: "66%", width: "3.75rem", tone: "electric", opacity: 0.55, height: "2px" },
  { top: "80%", left: "34%", width: "1.5rem", tone: "primary", opacity: 0.6, height: "3px" },
  { top: "84%", left: "70%", width: "2.75rem", tone: "glow", opacity: 0.5, height: "2px" },
];

interface GlitchFieldProps {
  className?: string;
  density?: "full" | "lite";
}

export function GlitchField({ className = "", density = "full" }: GlitchFieldProps) {
  const streaks = density === "lite" ? STREAKS.filter((_, i) => i % 2 === 0) : STREAKS;

  return (
    <div
      aria-hidden
      className={["pointer-events-none absolute inset-0 z-[1] overflow-hidden", className].join(
        " ",
      )}
    >
      {streaks.map((streak, index) => (
        <span
          key={`${streak.top}-${streak.left}-${index}`}
          className={["absolute block", toneClass[streak.tone]].join(" ")}
          style={{
            top: streak.top,
            left: streak.left,
            width: streak.width,
            height: streak.height ?? "2px",
            opacity: streak.opacity ?? 0.55,
          }}
        />
      ))}

      <div className="absolute left-[26%] top-[32%] flex gap-1.5 opacity-70">
        <span className="block h-[3px] w-4 bg-accent-glow" />
        <span className="block h-[3px] w-2 bg-accent-electric" />
        <span className="block h-[3px] w-6 bg-accent-primary" />
      </div>
      <div className="absolute right-[16%] top-[58%] flex gap-1.5 opacity-65">
        <span className="block h-[3px] w-5 bg-accent-primary" />
        <span className="block h-[3px] w-2.5 bg-text-primary/70" />
        <span className="block h-[3px] w-4 bg-accent-glow" />
      </div>
    </div>
  );
}
