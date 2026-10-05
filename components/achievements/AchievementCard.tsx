import type { Achievement } from "@/lib/types";

interface AchievementCardProps {
  achievement: Achievement;
  featured?: boolean;
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
 * Lower-third plate — light title field + purple end cap; year on the seam.
 */
export function AchievementCard({
  achievement,
  featured = false,
}: AchievementCardProps) {
  return (
    <article
      className={[
        "achieve-lt group relative w-full pb-4 pt-1",
        featured ? "achieve-lt-featured" : "",
      ].join(" ")}
    >
      <div aria-hidden className="achieve-lt-outline pointer-events-none absolute" />

      <div className="relative z-[1]">
        <div
          className={[
            "relative",
            featured ? "min-h-[4.5rem] md:min-h-[5rem]" : "min-h-[3.75rem] md:min-h-[4rem]",
          ].join(" ")}
        >
          <div
            aria-hidden
            className="achieve-lt-plate achieve-lt-shadow absolute inset-y-0 right-0 w-[22%]"
            style={{ background: GRAD_PURPLE }}
          />
          <div
            className="achieve-lt-plate achieve-lt-shadow absolute inset-y-0 left-0 right-[14%]"
            style={{ background: GRAD_LIGHT }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-[10%] right-[20%] z-[1] w-px -skew-x-[14deg] bg-bg-void/50"
          />

          <div
            className={[
              "relative z-[2] flex items-center justify-between gap-3 py-2.5 pl-4 pr-[28%] md:pl-5",
              featured ? "min-h-[4.5rem] md:min-h-[5rem]" : "min-h-[3.75rem] md:min-h-[4rem]",
            ].join(" ")}
          >
            <div className="min-w-0">
              {(achievement.category || achievement.organization) && (
                <p className="mb-1 font-sans text-[0.55rem] uppercase tracking-[0.14em] text-accent-primary/80">
                  {[achievement.category, achievement.organization]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              <h3
                className={[
                  "min-w-0 font-hero font-bold uppercase leading-[1.15] tracking-[0.03em] text-accent-primary",
                  featured
                    ? "text-[clamp(0.85rem,1.5vw,1.15rem)]"
                    : "text-[clamp(0.72rem,1.2vw,0.95rem)]",
                ].join(" ")}
              >
                {achievement.title}
              </h3>
            </div>
            <HatchMarks />
          </div>

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
