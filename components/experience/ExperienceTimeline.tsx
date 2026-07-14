"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ExperienceEntry } from "@/lib/types";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

/** Content indent only — dots stay locked to the left rule. */
const contentIndent = [
  "md:pl-0",
  "md:pl-12",
  "md:pl-6",
  "md:pl-20",
];

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-border-subtle bg-bg-void py-16 md:py-32"
    >
      <div className="pl-[8vw] pr-[5vw] md:pl-[14vw] md:pr-[10vw]">
        <Reveal>
          <SectionHeading className="mb-12 md:mb-16">Experience</SectionHeading>
        </Reveal>

        <div className="relative max-w-3xl">
          <div
            aria-hidden
            className="absolute bottom-2 left-0 top-2 w-px bg-border-subtle"
          />

          <ol className="space-y-12 md:space-y-16">
            {entries.map((entry, index) => (
              <Reveal key={`${entry.role}-${entry.org}-${index}`} delay={index * 0.06}>
                <li className="relative pl-8 md:pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent-glow bg-accent-primary/50"
                  />

                  <div className={contentIndent[index % contentIndent.length]}>
                    <p className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted">
                      {entry.date}
                    </p>
                    <h3 className="mt-2 font-sans text-body-lg font-semibold text-text-primary">
                      {entry.role}
                    </h3>
                    <p className="mt-1 font-sans text-body text-accent-electric">
                      {entry.org}
                    </p>
                    <p className="mt-3 max-w-xl font-sans text-body text-text-secondary">
                      {entry.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
