"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { defaultTransition, viewportOnce } from "@/lib/motion";
import { projectLinks } from "@/lib/projects";
import type { Project } from "@/lib/types";

interface ProjectBlockProps {
  project: Project;
  index?: number;
}

const PLATE_STYLES = [
  "bg-accent-primary/35",
  "bg-accent-primary-dim/55",
  "bg-accent-electric/30",
] as const;

function Layer({
  children,
  className = "",
  from,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from: "left" | "right" | "up" | "fade";
  delay?: number;
}) {
  const hidden =
    from === "left"
      ? { opacity: 0, x: -28 }
      : from === "right"
        ? { opacity: 0, x: 28 }
        : from === "up"
          ? { opacity: 0, y: 20 }
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

/**
 * Hybrid of cyber profile cards + angled game UI —
 * ghost titles, slant plates, glitch ticks, frame-breaking cover.
 */
export function ProjectBlock({ project, index = 0 }: ProjectBlockProps) {
  const visualOnEnd = index % 2 === 0;
  const plate = PLATE_STYLES[index % PLATE_STYLES.length];
  const tech = project.techStack.filter((t) => !t.startsWith("TODO"));
  const frameClass = visualOnEnd
    ? "project-card-frame"
    : "project-card-frame-flip";

  const copy = (
    <div
      className={[
        "relative z-10 flex flex-1 flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12",
        visualOnEnd ? "md:pr-4" : "md:pl-4 md:items-end md:text-right",
      ].join(" ")}
    >
      <Layer from={visualOnEnd ? "left" : "right"} delay={0.06}>
        <div
          className={[
            "flex flex-wrap gap-3",
            visualOnEnd ? "justify-start" : "justify-end",
          ].join(" ")}
        >
          <span className="slant-chip bg-accent-primary/25 px-3 py-1 font-sans text-meta uppercase tracking-[0.16em] text-accent-glow">
            Project_
          </span>
          <span className="slant-chip-flip border border-border-subtle px-3 py-1 font-sans text-meta uppercase tracking-[0.16em] text-text-muted">
            Case study_
          </span>
        </div>
      </Layer>

      <Layer from="up" delay={0.1} className="relative mt-6 md:mt-8">
        <span
          aria-hidden
          className="project-title-ghost pointer-events-none block select-none font-display text-[clamp(2.75rem,8vw,5.5rem)] uppercase leading-[0.85]"
        >
          {project.name}
        </span>
        <h3 className="relative z-[1] -mt-[0.55em] font-display text-[clamp(1.75rem,4.5vw,3rem)] uppercase leading-[0.9] tracking-tight text-text-primary">
          {project.name}
        </h3>
      </Layer>

      <Layer from="up" delay={0.16} className="mt-6 max-w-md md:mt-8">
        <p className="font-sans text-body text-text-secondary">
          {project.description}
        </p>
      </Layer>

      {tech.length > 0 ? (
        <Layer from="up" delay={0.2} className="mt-7">
          <ul
            className={[
              "flex flex-wrap gap-2",
              visualOnEnd ? "justify-start" : "justify-end",
            ].join(" ")}
          >
            {tech.map((item, i) => (
              <li key={item} className={i % 2 === 0 ? "mt-0" : "mt-1.5"}>
                <span className="slant-chip inline-block border border-border-subtle bg-bg-panel-raised/90 px-3 py-1.5 font-sans text-meta uppercase tracking-[0.08em] text-text-secondary transition-colors hover:border-accent-electric/50 hover:text-accent-electric">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Layer>
      ) : null}

      <Layer from="up" delay={0.24} className="mt-8">
        <div
          className={[
            "flex flex-wrap gap-3",
            visualOnEnd ? "justify-start" : "justify-end",
          ].join(" ")}
        >
          {projectLinks(project).map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="slant-chip bg-accent-primary px-4 py-2 font-sans text-meta uppercase tracking-[0.1em] text-text-on-accent transition-colors hover:bg-accent-glow"
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </Layer>
    </div>
  );

  const visual = (
    <div
      className={[
        "relative flex flex-1 items-end justify-center overflow-visible px-4 pb-0 pt-8 md:min-h-[420px] md:px-6 md:pt-6",
        visualOnEnd ? "md:justify-end" : "md:justify-start",
      ].join(" ")}
    >
      {/* Angled color plate (Destiny/Jessica hybrid) */}
      <Layer
        from="fade"
        delay={0.04}
        className={[
          "absolute top-[10%] h-[78%] w-[88%] md:top-[8%] md:h-[84%] md:w-[92%]",
          visualOnEnd ? "right-0" : "left-0",
          plate,
          visualOnEnd ? "slant-panel" : "slant-panel-flip",
        ].join(" ")}
      >
        <div className="project-orb-scanlines absolute inset-0 opacity-35" />
        {/* Glitch ticks on the plate */}
        <span className="absolute left-[12%] top-[16%] h-[2px] w-10 bg-accent-glow/70" />
        <span className="absolute left-[12%] top-[19%] h-[2px] w-4 bg-text-primary/40" />
        <span className="absolute right-[14%] top-[42%] h-[2px] w-8 bg-bg-void/50" />
        <span className="absolute right-[18%] bottom-[28%] h-[2px] w-12 bg-accent-electric/55" />
      </Layer>

      {/* Low-poly ghost figure */}
      <div
        aria-hidden
        className={[
          "poly-silhouette absolute top-[12%] z-[1] h-[70%] w-[70%] bg-accent-glow/20",
          visualOnEnd ? "right-[4%]" : "left-[4%]",
        ].join(" ")}
      />

      <Layer
        from={visualOnEnd ? "right" : "left"}
        delay={0.14}
        className={[
          "relative z-10 w-[min(78%,340px)] md:w-[min(85%,380px)]",
          "md:-mb-8 lg:-mb-12",
          visualOnEnd ? "md:mr-2 lg:mr-4" : "md:ml-2 lg:ml-4",
        ].join(" ")}
      >
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 78vw, 380px"
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg-panel to-transparent md:hidden" />
        </div>

        {tech[0] ? (
          <div
            className={[
              "absolute bottom-4 z-20 slant-chip bg-bg-void/85 px-3 py-1.5 backdrop-blur-sm",
              visualOnEnd ? "right-3" : "left-3",
            ].join(" ")}
          >
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-accent-glow">
              {tech[0]}_
            </span>
          </div>
        ) : null}
      </Layer>
    </div>
  );

  return (
    <article className="relative px-[4vw] md:px-[8vw]">
      <div className={["relative overflow-visible bg-bg-panel", frameClass].join(" ")}>
        <div
          aria-hidden
          className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-20 h-2 opacity-70"
        />

        <div
          className={[
            "relative flex min-h-[480px] flex-col md:min-h-[440px] md:flex-row lg:min-h-[480px]",
            visualOnEnd ? "" : "md:flex-row-reverse",
          ].join(" ")}
        >
          {copy}
          {visual}
        </div>
      </div>
    </article>
  );
}
