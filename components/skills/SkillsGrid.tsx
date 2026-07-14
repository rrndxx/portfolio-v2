"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { SkillCategory, SkillsContent } from "@/lib/types";

interface SkillsGridProps {
  content: SkillsContent;
}

/** Token fills; lightest panel uses dark type for contrast. */
const PANEL_STYLES = [
  {
    fill: "bg-accent-primary",
    indexTone: "0",
    text: "text-text-primary",
    rule: "border-text-primary/30",
    meta: "text-text-primary/75",
  },
  {
    fill: "bg-accent-primary-dim",
    indexTone: "1",
    text: "text-text-primary",
    rule: "border-text-primary/30",
    meta: "text-text-primary/75",
  },
  {
    fill: "bg-accent-electric",
    indexTone: "2",
    text: "text-text-primary",
    rule: "border-text-primary/30",
    meta: "text-text-primary/75",
  },
  {
    fill: "bg-accent-glow",
    indexTone: "3",
    text: "text-text-on-accent",
    rule: "border-text-on-accent/25",
    meta: "text-text-on-accent/70",
  },
] as const;

function SkillParallelogram({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const style = PANEL_STYLES[index % PANEL_STYLES.length];

  return (
    <div
      className={[
        "relative w-full max-w-[240px] shrink-0 md:max-w-none md:flex-1",
        "transition-transform duration-300 hover:-translate-y-2",
      ].join(" ")}
      style={{ zIndex: index + 1 }}
    >
      <div
        aria-hidden
        className="skills-para skills-para-shadow absolute inset-0"
      />

      <div
        data-tone={style.indexTone}
        className={[
          "skills-para relative flex h-[420px] flex-col overflow-hidden md:h-[500px] lg:h-[540px]",
          style.fill,
        ].join(" ")}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 3px, color-mix(in srgb, var(--bg-void) 40%, transparent) 3px, color-mix(in srgb, var(--bg-void) 40%, transparent) 4px)",
          }}
        />

        <div className="skills-para-content relative z-[1] flex h-full flex-col py-8 md:py-10">
          <p
            className={[
              "font-sans text-[0.65rem] uppercase tracking-[0.2em]",
              style.meta,
            ].join(" ")}
          >
            {String(index + 1).padStart(2, "0")}_
          </p>

          <ul className="mt-8 flex flex-1 flex-col gap-3.5 md:mt-10 md:gap-4">
            {category.skills.map((skill, skillIndex) => {
              const stepsFromBottom = category.skills.length - 1 - skillIndex;
              return (
                <li
                  key={skill}
                  style={{
                    marginLeft: `${stepsFromBottom * 0.85}rem`,
                    marginRight: `${skillIndex * 0.35}rem`,
                  }}
                >
                  <span
                    className={[
                      "block border-b pb-2 font-sans text-[0.95rem] font-semibold leading-snug md:text-body",
                      style.text,
                      style.rule,
                    ].join(" ")}
                  >
                    {skill}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-6">
            <div className="skills-para-label mx-auto bg-bg-void px-3 py-2.5 text-center">
              <p className="font-display text-[clamp(0.9rem,1.5vw,1.2rem)] uppercase leading-none tracking-tight text-accent-glow">
                {category.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsGrid({ content }: SkillsGridProps) {
  return (
    <SectionShell
      id="skills"
      className="bg-bg-panel pb-16 md:pb-32"
      cut="rise-right"
      blendFrom="void"
      zIndex={2}
      style={{ ["--section-pad-y" as string]: "5rem" }}
    >
      <SectionAtmosphere variant="skills" />

      <div className="pl-[6vw] pr-[6vw] md:pl-[10vw] md:pr-[8vw]">
        <Reveal>
          <SectionHeading className="mb-10 md:mb-14">Skills</SectionHeading>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="skills-para-row flex items-stretch gap-5 overflow-x-auto px-1 pb-8 md:gap-6 md:overflow-visible md:px-2 md:pb-6 lg:gap-8 lg:px-4">
            {content.categories.map((category, index) => (
              <SkillParallelogram
                key={category.name}
                category={category}
                index={index}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
