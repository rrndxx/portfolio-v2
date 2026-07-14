"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import { defaultTransition, viewportOnce } from "@/lib/motion";
import { projectLinks, splitStackedTitle } from "@/lib/projects";
import type { Project } from "@/lib/types";

interface ProjectBlockProps {
  project: Project;
}

function TechTags({
  stack,
  className = "",
}: {
  stack: string[];
  className?: string;
}) {
  const nudges = ["mt-0", "mt-3", "-mt-1", "mt-2", "mt-1"];

  return (
    <ul className={["flex flex-wrap items-start gap-2", className].join(" ")}>
      {stack
        .filter((tech) => !tech.startsWith("TODO"))
        .map((tech, index) => (
          <li key={tech} className={nudges[index % nudges.length]}>
            <Tag>{tech}</Tag>
          </li>
        ))}
    </ul>
  );
}

function OutLinks({ project }: { project: Project }) {
  const links = projectLinks(project);

  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          className="font-sans text-meta uppercase tracking-[0.08em] text-accent-electric transition-colors hover:text-accent-glow"
          {...(link.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {link.label} →
        </Link>
      ))}
    </div>
  );
}

function Layer({
  children,
  className = "",
  from,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from: "left" | "right" | "up" | "down" | "fade";
  delay?: number;
}) {
  const hidden =
    from === "left"
      ? { opacity: 0, x: -40 }
      : from === "right"
        ? { opacity: 0, x: 40 }
        : from === "up"
          ? { opacity: 0, y: 32 }
          : from === "down"
            ? { opacity: 0, y: -24 }
            : { opacity: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Variant A — stacked vertical title (HIS/STORY), image bleeds right over accent field. */
function StackedTitleLeftBleed({ project }: ProjectBlockProps) {
  const [lineA, lineB] = splitStackedTitle(project.name);

  return (
    <article className="relative min-h-[70vh] overflow-hidden py-16 md:py-24">
      <Layer
        from="left"
        className="absolute inset-y-[10%] right-0 w-[58%] bg-accent-primary md:w-[52%]"
        delay={0}
      >
        <span className="sr-only">Color field</span>
      </Layer>

      <div className="relative z-10 grid items-center gap-8 pl-[6vw] pr-0 md:grid-cols-12 md:gap-4 md:pl-[10vw]">
        <Layer from="up" delay={0.12} className="md:col-span-3">
          <h3
            aria-label={project.name}
            className="font-display text-display uppercase leading-[0.85] tracking-tight text-text-primary"
          >
            <span className="block">{lineA}</span>
            <span className="block text-accent-glow">{lineB}</span>
          </h3>
        </Layer>

        <Layer
          from="right"
          delay={0.2}
          className="relative md:col-span-6 md:col-start-5 md:-mr-[6vw]"
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-bg-panel-raised shadow-none">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </Layer>

        <Layer from="up" delay={0.28} className="md:col-span-3 md:col-start-4 md:row-start-2 md:mt-6">
          <p className="max-w-sm font-sans text-body text-text-secondary">
            {project.description}
          </p>
          <TechTags stack={project.techStack} className="mt-6" />
          <div className="mt-6">
            <OutLinks project={project} />
          </div>
        </Layer>
      </div>
    </article>
  );
}

/** Variant B — image bleeds left; text + diagonal panel on the right. */
function RightBleedDiagonal({ project }: ProjectBlockProps) {
  return (
    <article className="relative overflow-hidden py-16 md:py-28">
      <Layer
        from="right"
        delay={0}
        className="absolute inset-y-[8%] left-[18%] right-0 md:left-[32%]"
      >
        <div
          className="absolute inset-0 bg-bg-panel-raised"
          style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
      </Layer>

      <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-end md:gap-0">
        <Layer from="left" delay={0.15} className="w-full md:w-[58%] md:-ml-[4vw]">
          <div className="relative aspect-[5/4] w-full overflow-hidden bg-bg-panel md:aspect-[16/11]">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        </Layer>

        <Layer
          from="up"
          delay={0.25}
          className="relative z-20 px-[6vw] pb-4 md:w-[42%] md:px-10 lg:px-14"
        >
          <p className="font-sans text-meta uppercase tracking-[0.12em] text-text-muted">
            Featured
          </p>
          <h3 className="mt-3 font-display text-h2 uppercase leading-[0.95] text-text-primary">
            {project.name}
          </h3>
          <p className="mt-5 max-w-md font-sans text-body text-text-secondary">
            {project.description}
          </p>
          <TechTags stack={project.techStack} className="mt-6 max-w-sm" />
          <div className="mt-8">
            <OutLinks project={project} />
          </div>
        </Layer>
      </div>
    </article>
  );
}

/** Variant C — full accent color field; image overlaps bottom-right; title top-left. */
function FullBleedColorField({ project }: ProjectBlockProps) {
  return (
    <article className="relative overflow-hidden py-10 md:py-16">
      <Layer from="fade" delay={0} className="relative mx-[4vw] bg-accent-primary md:mx-[8vw]">
        <div className="relative min-h-[62vh] px-[6vw] py-14 md:min-h-[70vh] md:px-12 md:py-20 lg:px-16">
          <Layer from="up" delay={0.1}>
            <h3 className="max-w-[12ch] font-display text-display uppercase leading-[0.9] tracking-tight text-text-on-accent">
              {project.name}
            </h3>
          </Layer>

          <Layer from="up" delay={0.18} className="mt-8 max-w-md">
            <p className="font-sans text-body-lg text-text-on-accent/85">
              {project.description}
            </p>
          </Layer>

          <Layer from="up" delay={0.24} className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {project.techStack
                .filter((tech) => !tech.startsWith("TODO"))
                .map((tech, index) => (
                  <li
                    key={tech}
                    className={index % 2 === 0 ? "translate-y-0" : "translate-y-2"}
                  >
                    <span className="inline-block rounded border border-text-on-accent/25 bg-text-on-accent/10 px-3 py-1.5 font-sans text-meta uppercase tracking-[0.08em] text-text-on-accent">
                      {tech}
                    </span>
                  </li>
                ))}
            </ul>
          </Layer>

          <Layer from="up" delay={0.3} className="mt-8">
            <div className="flex flex-wrap gap-4">
              {projectLinks(project).map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="font-sans text-meta uppercase tracking-[0.08em] text-text-on-accent transition-opacity hover:opacity-80"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </Layer>

          <Layer
            from="right"
            delay={0.2}
            className="relative mt-12 md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[52%] md:translate-x-[8%] md:translate-y-[12%]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-void/20">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Layer>
        </div>
      </Layer>
    </article>
  );
}

export function ProjectBlock({ project }: ProjectBlockProps) {
  switch (project.layoutVariant) {
    case "stacked-title-left-bleed":
      return <StackedTitleLeftBleed project={project} />;
    case "right-bleed-diagonal":
      return <RightBleedDiagonal project={project} />;
    case "full-bleed-color-field":
      return <FullBleedColorField project={project} />;
    default: {
      const _exhaustive: never = project.layoutVariant;
      return _exhaustive;
    }
  }
}
