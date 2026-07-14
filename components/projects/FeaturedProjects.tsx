"use client";

import Link from "next/link";
import { ProjectBlock } from "@/components/projects/ProjectBlock";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-border-subtle bg-bg-void py-10 md:py-16"
    >
      <div className="pl-[6vw] pr-[4vw] md:pl-[12vw] md:pr-[6vw]">
        <Reveal>
          <SectionHeading className="mb-4 md:mb-6">Work</SectionHeading>
          <p className="mb-10 max-w-lg font-sans text-body text-text-secondary md:mb-14">
            Featured case studies — each layout built custom, not from a card template.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-6 md:gap-10">
        {projects.map((project) => (
          <ProjectBlock key={project.slug} project={project} />
        ))}
      </div>

      <Reveal className="mt-10 px-[6vw] pb-8 md:mt-16 md:px-[12vw] md:pb-12">
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
