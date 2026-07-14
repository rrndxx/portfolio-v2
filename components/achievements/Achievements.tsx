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

export function Achievements({ items }: AchievementsProps) {
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
          <SectionHeading className="mb-12 md:mb-16">Achievements</SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 0.04} className="h-full">
              <AchievementCard achievement={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
