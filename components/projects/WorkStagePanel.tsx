"use client";

import Link from "next/link";
import { CyberDesktopScreen } from "@/components/projects/CyberDesktopScreen";
import type { Project } from "@/lib/types";

interface WorkStagePanelProps {
  project: Project;
}

/**
 * Selected project stage — desktop preview + copy in a responsive grid.
 */
export function WorkStagePanel({ project }: WorkStagePanelProps) {
  const tech = project.techStack.filter((item) => !item.startsWith("TODO"));

  return (
    <div className="work-stage-grid grid w-full min-w-0 grid-cols-1 gap-6 sm:gap-7 md:grid-cols-[minmax(12rem,42%)_minmax(0,1fr)] md:items-start md:gap-6 lg:grid-cols-[minmax(14rem,44%)_minmax(0,1fr)] lg:gap-8">
      <div className="relative min-w-0 md:sticky md:top-20">
        <div
          aria-hidden
          className="work-stage-plate pointer-events-none absolute -inset-x-3 -inset-y-4 bg-accent-primary/30 md:-inset-x-4"
        />
        <div className="relative z-[1]">
          <CyberDesktopScreen
            project={project}
            tone={project.featured ? "electric" : "primary"}
            lean="none"
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 42vw, 380px"
          />
        </div>
      </div>

      <div className="work-stage-copy relative z-[2] min-w-0">
        <div className="mb-2 flex gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
            />
          ))}
        </div>
        <p className="font-sans text-meta uppercase tracking-[0.2em] text-text-muted">
          {project.featured ? "Featured deployment_" : "Deployment_"}
        </p>

        <div className="relative mt-2 md:mt-3">
          <span
            aria-hidden
            className="project-title-ghost pointer-events-none absolute -left-1 -top-3 select-none font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-none opacity-35 md:-top-4 md:text-[clamp(2rem,4vw,3.25rem)]"
          >
            {project.name}
          </span>
          <h2 className="relative font-display text-[clamp(1.65rem,4.5vw,2.75rem)] uppercase leading-[0.92] tracking-tight text-text-primary lg:text-[clamp(1.85rem,3vw,2.5rem)]">
            {project.name}
          </h2>
        </div>

        <p className="mt-4 font-sans text-body leading-relaxed text-text-secondary md:mt-5 md:text-body-lg">
          {project.description}
        </p>

        {tech.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
            {tech.map((item, i) => (
              <li
                key={item}
                className="slant-chip flex items-center gap-2 border border-border-subtle bg-bg-void/50 px-2.5 py-1.5"
              >
                <span className="font-sans text-[0.6rem] uppercase tracking-[0.14em] text-accent-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[0.68rem] uppercase tracking-[0.06em] text-text-primary">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2.5 md:mt-8 md:gap-3">
          <Link
            href={`/work/${project.slug}`}
            className="work-cta work-cta-primary px-5 py-2.5 font-sans text-meta uppercase tracking-[0.1em] text-text-on-accent md:px-6 md:py-3"
          >
            Case study →
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="work-cta work-cta-ghost px-5 py-2.5 font-sans text-meta uppercase tracking-[0.1em] text-text-primary md:px-6 md:py-3"
            >
              Live →
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="work-cta work-cta-ghost px-5 py-2.5 font-sans text-meta uppercase tracking-[0.1em] text-text-primary md:px-6 md:py-3"
            >
              Repo →
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
