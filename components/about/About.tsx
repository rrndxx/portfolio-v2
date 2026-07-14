"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import type { AboutContent } from "@/lib/types";

interface AboutProps {
  content: AboutContent;
}

const credentialOffsets = [
  "ml-0 mt-0",
  "ml-6 mt-3 md:ml-14 md:mt-1",
  "ml-2 mt-4 md:ml-8 md:mt-6",
];

export function About({ content }: AboutProps) {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border-subtle bg-bg-void py-16 md:py-32"
    >
      {/* Diagonal accent edge into this section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px right-0 h-24 w-[42vw] bg-accent-primary/15"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="pl-[8vw] pr-[4vw] md:pl-[14vw] md:pr-[8vw]">
        <Reveal>
          <SectionHeading className="mb-10 md:mb-14">About</SectionHeading>
        </Reveal>

        <div className="max-w-3xl">
          <Reveal delay={0.05}>
            <p className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-accent-glow">
              {content.pullQuote}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl font-sans text-body-lg text-text-secondary md:mt-10 md:ml-[8%]">
              {content.paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-12 flex flex-col items-start gap-1 md:mt-16">
              {content.credentials.map((credential, index) => (
                <li key={credential} className={credentialOffsets[index] ?? "ml-4 mt-2"}>
                  <Tag>{credential}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
