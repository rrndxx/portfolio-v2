"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Tag } from "@/components/ui/Tag";
import type { AboutContent } from "@/lib/types";

interface AboutProps {
  content: AboutContent;
}

const credentialOffsets = [
  "ml-0 mt-0",
  "ml-6 mt-3 md:ml-14 md:mt-1",
  "ml-2 mt-4 md:ml-8 md:mt-6",
  "ml-8 mt-2 md:ml-20 md:mt-3",
  "ml-3 mt-5 md:ml-10 md:mt-8",
];

/**
 * Offset bio + credential tags + proof highlight plates.
 */
export function About({ content }: AboutProps) {
  const highlights = content.highlights ?? [];

  return (
    <SectionShell
      id="about"
      className="bg-bg-void pb-16 md:pb-32"
      cut="rise-left"
      blendFrom="void"
      style={{ ["--section-pad-y" as string]: "4rem" }}
      zIndex={1}
    >
      <SectionAtmosphere variant="about" />

      <div className="pl-[8vw] pr-[4vw] pt-16 md:pl-[14vw] md:pr-[8vw] md:pt-32">
        <Reveal>
          <div className="mb-3 flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </div>
          <SectionHeading className="mb-10 md:mb-14">About</SectionHeading>
        </Reveal>

        <div className="max-w-4xl">
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

          {highlights.length > 0 ? (
            <Reveal delay={0.12}>
              <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
                {highlights.map((item, index) => (
                  <li
                    key={item.label}
                    className={[
                      "about-proof-plate relative px-4 py-3",
                      index % 2 === 1 ? "sm:translate-y-3" : "",
                    ].join(" ")}
                  >
                    <p className="font-sans text-[0.58rem] uppercase tracking-[0.16em] text-accent-electric">
                      {item.label}_
                    </p>
                    <p className="mt-1.5 font-display text-[clamp(0.95rem,1.8vw,1.15rem)] uppercase leading-tight tracking-tight text-text-primary">
                      {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {content.credentials.length > 0 ? (
            <Reveal delay={0.15}>
              <p className="mt-12 font-sans text-meta uppercase tracking-[0.14em] text-text-muted md:mt-14">
                Credentials_
              </p>
              <ul className="mt-4 flex flex-col items-start gap-1">
                {content.credentials.map((credential, index) => (
                  <li
                    key={credential}
                    className={credentialOffsets[index] ?? "ml-4 mt-2"}
                  >
                    <Tag tone={index < 2 ? "accent" : "default"}>
                      {credential}
                    </Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
