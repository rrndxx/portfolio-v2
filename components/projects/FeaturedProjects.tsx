"use client";

import Link from "next/link";
import { ProjectBlock } from "@/components/projects/ProjectBlock";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBlend } from "@/components/ui/SectionBlend";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-bg-void py-10 md:py-16"
    >
      <SectionBlend from="panel" to="void" />

      <div className="relative z-[2] pl-[6vw] pr-[4vw] md:pl-[12vw] md:pr-[6vw]">
        <Reveal>
          <SectionHeading className="mb-4 md:mb-6">Work</SectionHeading>
          <p className="mb-10 max-w-lg font-sans text-body text-text-secondary md:mb-14">
            Featured case studies — profile cards with alternating visual sides.
          </p>
        </Reveal>
      </div>

      <div className="relative z-[2] flex flex-col gap-10 md:gap-14">
        {projects.map((project, index) => (
          <ProjectBlock key={project.slug} project={project} index={index} />
        ))}
      </div>

      <Reveal className="relative z-[2] mt-10 px-[6vw] pb-8 md:mt-16 md:px-[12vw] md:pb-12">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-sans text-meta uppercase tracking-[0.1em] text-accent-electric transition-colors hover:text-accent-glow"
        >
          View all work
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
