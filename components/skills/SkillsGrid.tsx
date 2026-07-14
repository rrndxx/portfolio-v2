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
    rule: "border-text-primary/35",
    meta: "text-text-primary/75",
    tick: "bg-text-primary/60",
  },
  {
    fill: "bg-accent-primary-dim",
    indexTone: "1",
    text: "text-text-primary",
    rule: "border-text-primary/35",
    meta: "text-text-primary/75",
    tick: "bg-accent-glow/70",
  },
  {
    fill: "bg-accent-electric",
    indexTone: "2",
    text: "text-text-primary",
    rule: "border-text-primary/35",
    meta: "text-text-primary/75",
    tick: "bg-text-primary/55",
  },
  {
    fill: "bg-accent-glow",
    indexTone: "3",
    text: "text-text-on-accent",
    rule: "border-text-on-accent/30",
    meta: "text-text-on-accent/70",
    tick: "bg-text-on-accent/55",
  },
] as const;

const PANEL_OFFSET = [
  "md:mt-0",
  "md:mt-10",
  "md:mt-4",
  "md:mt-14",
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
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:scale-[1.01]",
        PANEL_OFFSET[index % PANEL_OFFSET.length],
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
          "skills-para relative flex h-[440px] flex-col overflow-hidden md:h-[520px] lg:h-[560px]",
          style.fill,
        ].join(" ")}
      >
        {/* Scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 3px, color-mix(in srgb, var(--bg-void) 45%, transparent) 3px, color-mix(in srgb, var(--bg-void) 45%, transparent) 4px)",
          }}
        />

        {/* Glitch ribbon */}
        <div
          aria-hidden
          className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-[2] h-2 opacity-75"
        />

        {/* Barcode ticks */}
        <div
          aria-hidden
          className="absolute right-4 top-5 z-[2] flex gap-[3px]"
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={["block w-[2px] -skew-x-[22deg]", style.tick].join(" ")}
              style={{ height: `${10 + (i % 3) * 4}px` }}
            />
          ))}
        </div>

        <div className="skills-para-content relative z-[1] flex h-full flex-col py-8 md:py-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex gap-[2px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={["block h-2 w-[2px] -skew-x-[22deg]", style.tick].join(
                    " ",
                  )}
                />
              ))}
            </span>
            <p
              className={[
                "font-sans text-[0.65rem] uppercase tracking-[0.2em]",
                style.meta,
              ].join(" ")}
            >
              Unit_{String(index + 1).padStart(2, "0")}
            </p>
          </div>

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
                    <span className="ml-1 opacity-40">_</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-6">
            <div className="skills-para-label mx-auto border border-accent-glow/25 bg-bg-void px-3 py-2.5 text-center">
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
      cut="blade-right"
      blendFrom="void"
      zIndex={2}
      style={{ ["--section-pad-y" as string]: "5rem" }}
    >
      <SectionAtmosphere variant="skills" />

      <div className="relative z-[1] pl-[6vw] pr-[6vw] md:pl-[10vw] md:pr-[8vw]">
        <Reveal>
          <div className="mb-3 flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </div>
          <SectionHeading className="mb-3 md:mb-4">Skills</SectionHeading>
          <p className="mb-10 max-w-md font-sans text-meta uppercase tracking-[0.12em] text-text-muted md:mb-14">
            Stack modules_ // loadout
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="skills-para-row flex items-start gap-5 overflow-x-auto px-1 pb-8 md:gap-6 md:overflow-visible md:px-2 md:pb-6 lg:gap-8 lg:px-4">
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
