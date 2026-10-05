"use client";

import { useMemo } from "react";
import { AchievementCard } from "@/components/achievements/AchievementCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { Achievement } from "@/lib/types";

interface AchievementsProps {
  items: Achievement[];
}

export function Achievements({ items }: AchievementsProps) {
  const { featured, rest } = useMemo(() => {
    const featuredItems = items.filter((item) => item.featured);
    const restItems = items.filter((item) => !item.featured);
    // If nothing marked featured, elevate the first four for hierarchy.
    if (featuredItems.length === 0) {
      return {
        featured: items.slice(0, 4),
        rest: items.slice(4),
      };
    }
    return { featured: featuredItems, rest: restItems };
  }, [items]);

  return (
    <SectionShell
      id="achievements"
      className="bg-bg-void pb-16 md:pb-32"
      cut="blade-left"
      blendFrom="panel"
      zIndex={5}
      style={{ ["--section-pad-y" as string]: "5rem" }}
    >
      <SectionAtmosphere variant="achievements" />

      <div className="pl-[6vw] pr-[6vw] md:pl-[12vw] md:pr-[10vw]">
        <Reveal>
          <div className="mb-3 flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </div>
          <SectionHeading className="mb-3 md:mb-4">Achievements</SectionHeading>
          <p className="mb-10 max-w-xl font-sans text-meta uppercase tracking-[0.12em] text-text-muted md:mb-14">
            Proof log_ // {String(items.length).padStart(2, "0")} recorded · honors,
            eligibility, competition
          </p>
        </Reveal>

        {featured.length > 0 ? (
          <div className="mb-12 md:mb-16">
            <Reveal>
              <p className="mb-5 font-sans text-meta uppercase tracking-[0.14em] text-accent-glow">
                Headline wins_
              </p>
            </Reveal>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
              {featured.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={(index % 2) * 0.05}
                  className="h-full"
                >
                  <AchievementCard achievement={item} featured />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div>
            <Reveal>
              <p className="mb-5 font-sans text-meta uppercase tracking-[0.14em] text-text-muted">
                Full archive_
              </p>
            </Reveal>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              {rest.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={(index % 3) * 0.04}
                  className="h-full"
                >
                  <AchievementCard achievement={item} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
