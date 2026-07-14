"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionBlend } from "@/components/ui/SectionBlend";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import type { SkillCategory, SkillsContent } from "@/lib/types";

interface SkillsGridProps {
  content: SkillsContent;
}

const categoryWeight: Record<string, "lg" | "md" | "sm"> = {
  Frontend: "lg",
  Backend: "lg",
  "Data & Infra": "md",
  Tooling: "sm",
};

const sizeClass = {
  lg: "px-4 py-2 text-[0.8rem]",
  md: "px-3 py-1.5 text-meta",
  sm: "px-2.5 py-1 text-[0.65rem]",
} as const;

const tagNudge = [
  "translate-y-0",
  "translate-y-3",
  "-translate-y-2",
  "translate-y-1",
  "-translate-y-1",
  "translate-y-2",
];

const clusterLayout: Record<string, string> = {
  Frontend: "md:col-start-1 md:row-start-1 md:mt-0",
  Backend: "md:col-start-2 md:row-start-1 md:mt-16 md:ml-4",
  "Data & Infra": "md:col-start-1 md:row-start-2 md:mt-4 md:ml-[10%]",
  Tooling: "md:col-start-2 md:row-start-2 md:mt-8 md:ml-12",
};

function SkillCluster({ category }: { category: SkillCategory }) {
  const weight = categoryWeight[category.name] ?? "md";

  return (
    <div className={["relative", clusterLayout[category.name] ?? ""].join(" ")}>
      <p className="mb-4 font-sans text-meta uppercase tracking-[0.12em] text-text-muted">
        {category.name}
      </p>
      <ul className="flex flex-wrap items-start gap-x-2 gap-y-3">
        {category.skills.map((skill, index) => (
          <li key={skill} className={tagNudge[index % tagNudge.length]}>
            <Tag className={sizeClass[weight]}>{skill}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsGrid({ content }: SkillsGridProps) {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-bg-panel py-16 md:py-32"
    >
      <SectionBlend from="void" to="void" />
      <SectionAtmosphere variant="skills" />

      <div className="relative z-[2] pl-[6vw] pr-[8vw] md:pl-[12vw] md:pr-[6vw]">
        <Reveal>
          <SectionHeading className="mb-12 md:mb-16">Skills</SectionHeading>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-6 lg:max-w-5xl">
            {content.categories.map((category) => (
              <SkillCluster key={category.name} category={category} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
