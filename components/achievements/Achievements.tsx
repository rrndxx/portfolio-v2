"use client";

import { AchievementCard } from "@/components/achievements/AchievementCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { Achievement } from "@/lib/types";

interface AchievementsProps {
  items: Achievement[];
}

const OFFSETS = [
  "md:mt-0",
  "md:mt-8",
  "md:mt-3",
  "md:mt-12",
  "md:mt-5",
  "md:mt-10",
] as const;

export function Achievements({ items }: AchievementsProps) {
  return (
    <SectionShell
      id="achievements"
      className="bg-bg-void pb-16 md:pb-32"
      cut="shallow-left"
      blendFrom="panel"
      zIndex={5}
      style={{ ["--section-pad-y" as string]: "5rem" }}
    >
      <SectionAtmosphere variant="achievements" />

      <div className="pl-[8vw] pr-[6vw] md:pl-[14vw] md:pr-[10vw]">
        <Reveal>
          <SectionHeading className="mb-12 md:mb-16">Achievements</SectionHeading>
        </Reveal>

        <div className="flex flex-wrap items-start gap-8 md:gap-x-10 md:gap-y-12">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.08}
              className={OFFSETS[index % OFFSETS.length]}
            >
              <AchievementCard achievement={item} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
