"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { ExperienceEntry } from "@/lib/types";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

const contentIndent = [
  "md:pl-0",
  "md:pl-10",
  "md:pl-5",
  "md:pl-16",
] as const;

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <SectionShell
      id="experience"
      className="bg-bg-panel pb-16 md:pb-32"
      cut="blade-right"
      blendFrom="void"
      zIndex={4}
      style={{ ["--section-pad-y" as string]: "5rem" }}
    >
      <SectionAtmosphere variant="experience" />

      <div className="relative z-[1] pl-[8vw] pr-[5vw] md:pl-[14vw] md:pr-[10vw]">
        <Reveal>
          <div className="mb-3 flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </div>
          <SectionHeading className="mb-3 md:mb-4">Experience</SectionHeading>
          <p className="mb-12 max-w-md font-sans text-meta uppercase tracking-[0.12em] text-text-muted md:mb-16">
            Career log_ // timeline
          </p>
        </Reveal>

        <div className="relative max-w-3xl">
          {/* Hard rail — not a soft centered timeline */}
          <div
            aria-hidden
            className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-accent-glow/0 via-accent-glow/50 to-accent-glow/0"
          />
          <div
            aria-hidden
            className="absolute left-[-3px] top-[12%] flex flex-col gap-1"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-[2px] w-2 bg-accent-electric/50"
              />
            ))}
          </div>

          <ol className="space-y-10 md:space-y-14">
            {entries.map((entry, index) => (
              <Reveal
                key={`${entry.role}-${entry.org}-${index}`}
                delay={index * 0.06}
              >
                <li className="relative pl-8 md:pl-10">
                  {/* Diamond node — hard edge, no round pill */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-accent-glow bg-accent-primary"
                  />

                  <div
                    className={[
                      "xp-entry relative",
                      contentIndent[index % contentIndent.length],
                    ].join(" ")}
                  >
                    <div
                      aria-hidden
                      className="glitch-texture pointer-events-none absolute inset-x-0 top-0 h-1 opacity-60"
                    />

                    <div className="relative border border-accent-glow/20 bg-bg-void/40 px-5 py-5 md:px-6 md:py-6">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="-skew-x-[12deg] bg-accent-primary px-3 py-1.5">
                          <p className="skew-x-[12deg] font-sans text-meta uppercase tracking-[0.1em] text-text-primary">
                            {entry.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-[0.6rem] uppercase tracking-[0.16em] text-text-muted">
                            Log_{String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="inline-flex gap-[2px]">
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className="block h-2 w-[2px] -skew-x-[22deg] bg-accent-glow/60"
                              />
                            ))}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-hero text-[clamp(1.05rem,2vw,1.35rem)] font-bold uppercase leading-snug tracking-[0.04em] text-text-primary">
                        {entry.role}
                      </h3>
                      <p className="mt-2 font-sans text-meta uppercase tracking-[0.1em] text-accent-electric">
                        {entry.org}_
                      </p>
                      <p className="mt-3 max-w-xl font-sans text-body text-text-secondary">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}
