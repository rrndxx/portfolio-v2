import type { Achievement } from "@/lib/types";

interface AchievementCardProps {
  achievement: Achievement;
}

const GRAD_LIGHT =
  "linear-gradient(90deg, color-mix(in srgb, var(--text-primary) 97%, var(--accent-glow)) 0%, color-mix(in srgb, var(--text-primary) 88%, var(--accent-electric)) 100%)";
const GRAD_PURPLE =
  "linear-gradient(135deg, var(--accent-glow) 0%, var(--accent-primary) 50%, var(--accent-primary-dim) 100%)";

function HatchMarks({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={["flex shrink-0 gap-[3px]", className].join(" ")}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-[11px] w-[3px] -skew-x-[22deg] bg-accent-primary"
        />
      ))}
    </div>
  );
}

/**
 * Lower-third plate — light title field + purple end cap; purple type;
 * year centered on the main bar’s bottom edge (half overlap, bottom-right).
 */
export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <article className="achieve-lt group relative w-full pb-4 pt-1">
      <div aria-hidden className="achieve-lt-outline pointer-events-none absolute" />

      <div className="relative z-[1]">
        <div className="relative min-h-[3.75rem] md:min-h-[4rem]">
          {/* Purple end cap (was light) */}
          <div
            aria-hidden
            className="achieve-lt-plate achieve-lt-shadow absolute inset-y-0 right-0 w-[22%]"
            style={{ background: GRAD_PURPLE }}
          />
          {/* Light title field (was purple) */}
          <div
            className="achieve-lt-plate achieve-lt-shadow absolute inset-y-0 left-0 right-[14%]"
            style={{ background: GRAD_LIGHT }}
          />
          {/* Seam */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-[10%] right-[20%] z-[1] w-px -skew-x-[14deg] bg-bg-void/50"
          />

          <div className="relative z-[2] flex min-h-[3.75rem] items-center justify-between gap-3 py-2.5 pl-4 pr-[28%] md:min-h-[4rem] md:pl-5">
            <h3 className="min-w-0 font-hero text-[clamp(0.72rem,1.2vw,0.95rem)] font-bold uppercase leading-[1.15] tracking-[0.03em] text-accent-primary">
              {achievement.title}
            </h3>
            <HatchMarks />
          </div>

          {/* Year — bottom edge of main = vertical center of year */}
          <div className="absolute bottom-0 right-[6%] z-[3] w-[42%] max-w-[9.5rem] translate-y-1/2">
            <div
              className="achieve-lt-plate achieve-lt-shadow"
              style={{ background: GRAD_PURPLE }}
            >
              <div className="achieve-lt-unskew flex items-center justify-center px-3 py-1.5">
                <p className="font-sans text-meta uppercase tracking-[0.14em] text-text-primary">
                  {achievement.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
