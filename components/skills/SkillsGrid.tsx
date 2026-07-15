"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { SkillCategory, SkillsContent } from "@/lib/types";
import type { CSSProperties } from "react";

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

/** Stagger offsets — lighter on small screens so the cluster still breathes. */
const PANEL_OFFSET = [
  "mt-0 sm:mt-0 lg:mt-0",
  "mt-3 sm:mt-6 lg:mt-10",
  "mt-1 sm:mt-3 lg:mt-4",
  "mt-4 sm:mt-8 lg:mt-14",
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
        "skills-para-wrap relative w-full min-w-0",
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
          "skills-para relative flex min-h-[20rem] flex-col overflow-hidden sm:min-h-[22rem] lg:min-h-[28rem]",
          style.fill,
        ].join(" ")}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 3px, color-mix(in srgb, var(--bg-void) 45%, transparent) 3px, color-mix(in srgb, var(--bg-void) 45%, transparent) 4px)",
          }}
        />

        <div
          aria-hidden
          className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-[2] h-2 opacity-75"
        />

        <div
          aria-hidden
          className="absolute right-3 top-4 z-[2] flex gap-[3px] sm:right-4 sm:top-5"
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={["block w-[2px] -skew-x-[22deg]", style.tick].join(" ")}
              style={{ height: `${10 + (i % 3) * 4}px` }}
            />
          ))}
        </div>

        <div className="skills-para-content relative z-[1] flex h-full flex-col py-6 sm:py-8 md:py-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex gap-[2px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={[
                    "block h-2 w-[2px] -skew-x-[22deg]",
                    style.tick,
                  ].join(" ")}
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

          <ul className="mt-6 flex flex-1 flex-col gap-2.5 sm:mt-8 sm:gap-3.5 md:mt-10 md:gap-4">
            {category.skills.map((skill, skillIndex) => {
              const stepsFromBottom = category.skills.length - 1 - skillIndex;
              return (
                <li
                  key={skill}
                  className="skills-skill-item"
                  style={
                    {
                      ["--skill-indent" as string]: `${stepsFromBottom}`,
                      ["--skill-outdent" as string]: `${skillIndex}`,
                    } as CSSProperties
                  }
                >
                  <span
                    className={[
                      "block border-b pb-1.5 font-sans text-[0.85rem] font-semibold leading-snug sm:pb-2 sm:text-[0.95rem] md:text-body",
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

          <div className="mt-auto pt-5 sm:pt-6">
            <div className="skills-para-label mx-auto border border-accent-glow/25 bg-bg-void px-2.5 py-2 text-center sm:px-3 sm:py-2.5">
              <p className="font-display text-[clamp(0.85rem,2.8vw,1.2rem)] uppercase leading-none tracking-tight text-accent-glow">
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

      <div className="relative z-[1] pl-[5vw] pr-[5vw] sm:pl-[6vw] sm:pr-[6vw] md:pl-[10vw] md:pr-[8vw]">
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
          <p className="mb-8 max-w-md font-sans text-meta uppercase tracking-[0.12em] text-text-muted sm:mb-10 md:mb-14">
            Stack modules_ // loadout
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="skills-para-row grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4 lg:items-start lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
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
