"use client";

import Link from "next/link";
import { ProjectBlock } from "@/components/projects/ProjectBlock";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { Project } from "@/lib/types";

interface FeaturedProjectsProps {
  projects: Project[];
  totalCount: number;
}

export function FeaturedProjects({ projects, totalCount }: FeaturedProjectsProps) {
  return (
    <SectionShell
      id="projects"
      className="bg-bg-void pb-10 md:pb-16"
      cut="blade-left"
      blendFrom="panel"
      zIndex={3}
      style={{ ["--section-pad-y" as string]: "3.5rem" }}
    >
      <SectionAtmosphere variant="projects" />

      <div className="relative z-[1] pl-[6vw] pr-[4vw] md:pl-[12vw] md:pr-[6vw]">
        <Reveal>
          <div className="mb-3 flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </div>
          <SectionHeading className="mb-3 md:mb-4">Work</SectionHeading>
          <p className="mb-10 max-w-lg font-sans text-meta uppercase tracking-[0.12em] text-text-muted md:mb-14">
            Featured deployments_ // case files
          </p>
        </Reveal>
      </div>

      <div className="relative z-[1] flex flex-col gap-12 md:gap-16">
        {projects.map((project, index) => (
          <ProjectBlock key={project.slug} project={project} index={index} />
        ))}
      </div>

      <Reveal className="relative z-[1] mt-12 px-[6vw] pb-8 md:mt-16 md:px-[12vw] md:pb-12">
        <Link
          href="/work"
          className="work-cta work-cta-signal inline-flex items-center gap-2 px-7 py-3.5 font-sans text-meta uppercase tracking-[0.12em]"
        >
          View all work
          <span
            className="ml-1 inline-flex items-center border border-accent-electric/80 bg-bg-void/70 px-2 py-0.5 text-[0.68rem] leading-none tracking-[0.16em] text-accent-electric"
            aria-label={`${totalCount} total projects in archive`}
          >
            {String(totalCount).padStart(2, "0")}
          </span>
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </SectionShell>
  );
}
