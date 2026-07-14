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

/** Per-card orb palette — stays inside design tokens, varies by slot. */
const ORB_STYLES = [
  {
    background:
      "radial-gradient(circle at 35% 30%, var(--accent-glow) 0%, var(--accent-primary) 42%, var(--accent-primary-dim) 72%, transparent 78%)",
  },
  {
    background:
      "radial-gradient(circle at 60% 40%, var(--accent-electric) 0%, var(--accent-primary) 48%, color-mix(in srgb, var(--accent-primary-dim) 70%, var(--bg-void)) 75%, transparent 80%)",
  },
  {
    background:
      "radial-gradient(circle at 40% 55%, var(--accent-glow) 0%, var(--accent-electric) 35%, var(--accent-primary-dim) 70%, transparent 78%)",
  },
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

function OrbGlitchMarks({ flip }: { flip?: boolean }) {
  const ticks = [
    { top: "18%", width: "2.75rem", tone: "bg-bg-void/50" },
    { top: "22%", width: "1.1rem", tone: "bg-text-primary/35" },
    { top: "34%", width: "3.5rem", tone: "bg-bg-void/40" },
    { top: "48%", width: "1.75rem", tone: "bg-accent-glow/45" },
    { top: "61%", width: "2.25rem", tone: "bg-bg-void/55" },
    { top: "72%", width: "0.9rem", tone: "bg-text-primary/30" },
    { top: "78%", width: "3rem", tone: "bg-accent-electric/40" },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
      {/* Scanline wash */}
      <div className="project-orb-scanlines absolute inset-0 opacity-40" />

      {ticks.map((tick, i) => (
        <span
          key={i}
          className={["absolute h-[2px]", tick.tone].join(" ")}
          style={{
            top: tick.top,
            width: tick.width,
            ...(flip
              ? { right: `${12 + (i % 3) * 8}%` }
              : { left: `${12 + (i % 3) * 8}%` }),
          }}
        />
      ))}

      <div
        className={[
          "absolute top-[40%] flex gap-1",
          flip ? "right-[18%]" : "left-[18%]",
        ].join(" ")}
      >
        <span className="h-[2px] w-4 bg-bg-void/60" />
        <span className="h-[2px] w-2 bg-accent-glow/70" />
        <span className="h-[2px] w-5 bg-text-primary/25" />
      </div>
    </div>
  );
}

/**
 * Character-card language: ghost outline title, solid name, orb + frame-breaking cover.
 * Alternates text/visual columns by index.
 */
export function ProjectBlock({ project, index = 0 }: ProjectBlockProps) {
  const visualOnEnd = index % 2 === 0;
  const orb = ORB_STYLES[index % ORB_STYLES.length];
  const tech = project.techStack.filter((t) => !t.startsWith("TODO"));

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
            "flex flex-wrap gap-x-8 gap-y-2",
            visualOnEnd ? "justify-start" : "justify-end",
          ].join(" ")}
        >
          <span className="font-sans text-meta uppercase tracking-[0.18em] text-text-muted">
            Project
          </span>
          <span className="font-sans text-meta uppercase tracking-[0.18em] text-text-muted">
            Case study
          </span>
        </div>
      </Layer>

      <Layer from="up" delay={0.1} className="relative mt-6 md:mt-8">
        <span
          aria-hidden
          className={[
            "project-title-ghost pointer-events-none select-none font-display uppercase leading-[0.85]",
            "text-[clamp(2.75rem,8vw,5.5rem)]",
            visualOnEnd ? "block" : "block",
          ].join(" ")}
        >
          {project.name}
        </span>
        <h3
          className={[
            "relative z-[1] -mt-[0.55em] font-display uppercase leading-[0.9] tracking-tight text-text-primary",
            "text-[clamp(1.75rem,4.5vw,3rem)]",
            visualOnEnd ? "" : "w-full",
          ].join(" ")}
        >
          {project.name}
        </h3>
      </Layer>

      <Layer from="up" delay={0.16} className="mt-6 max-w-md md:mt-8">
        <p className="font-sans text-body text-text-secondary">{project.description}</p>
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
                <span className="inline-block border border-border-subtle bg-bg-panel-raised/80 px-3 py-1.5 font-sans text-meta uppercase tracking-[0.08em] text-text-secondary transition-colors hover:border-accent-electric/40 hover:text-accent-electric">
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
            "flex flex-wrap gap-4",
            visualOnEnd ? "justify-start" : "justify-end",
          ].join(" ")}
        >
          {projectLinks(project).map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="font-sans text-meta uppercase tracking-[0.1em] text-accent-electric transition-colors hover:text-accent-glow"
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
      <Layer
        from="fade"
        delay={0.05}
        className="absolute left-1/2 top-[18%] h-[min(72vw,360px)] w-[min(72vw,360px)] -translate-x-1/2 md:top-[12%] md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px]"
      >
        <div
          className="project-orb relative h-full w-full rounded-full"
          style={orb}
        >
          <OrbGlitchMarks flip={!visualOnEnd} />
        </div>
      </Layer>

      <Layer
        from={visualOnEnd ? "right" : "left"}
        delay={0.14}
        className={[
          "relative z-10 w-[min(78%,340px)] md:w-[min(85%,380px)]",
          // Break the frame — extend past card edges
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
          {/* Soft edge fade into card so it doesn't look cut like a stamp */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg-panel to-transparent md:hidden" />
        </div>

        {tech[0] ? (
          <div
            className={[
              "absolute bottom-4 z-20 border border-border-subtle/80 bg-bg-void/80 px-3 py-1.5 backdrop-blur-sm",
              visualOnEnd ? "right-3" : "left-3",
            ].join(" ")}
          >
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-accent-glow">
              {tech[0]}
            </span>
          </div>
        ) : null}
      </Layer>
    </div>
  );

  return (
    <article className="relative px-[4vw] md:px-[8vw]">
      <div className="project-card-frame relative overflow-visible bg-bg-panel">
        {/* Hairline top edge accent */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-accent-glow/50 to-transparent"
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
