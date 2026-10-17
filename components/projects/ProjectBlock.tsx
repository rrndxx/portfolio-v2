"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CyberDesktopScreen } from "@/components/projects/CyberDesktopScreen";
import { defaultTransition, viewportOnce } from "@/lib/motion";
import { projectLinks } from "@/lib/projects";
import type { Project } from "@/lib/types";

interface ProjectBlockProps {
  project: Project;
  index?: number;
}

const PLATE_STYLES = [
  "bg-accent-primary/40",
  "bg-accent-primary-dim/60",
  "bg-accent-electric/35",
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

function Barcode({
  className = "",
  tone = "glow",
  count = 3,
}: {
  className?: string;
  tone?: "glow" | "electric" | "light";
  count?: number;
}) {
  const color =
    tone === "glow"
      ? "bg-accent-glow/65"
      : tone === "electric"
        ? "bg-accent-electric/55"
        : "bg-text-primary/55";

  return (
    <div aria-hidden className={["flex gap-[3px]", className].join(" ")}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={["block w-[2px] -skew-x-[22deg]", color].join(" ")}
          style={{ height: `${10 + (i % 3) * 4}px` }}
        />
      ))}
    </div>
  );
}

/**
 * Cyber profile project block — chamfered frame, slant plates, glitch ticks.
 */
export function ProjectBlock({ project, index = 0 }: ProjectBlockProps) {
  const visualOnEnd = index % 2 === 0;
  const plate = PLATE_STYLES[index % PLATE_STYLES.length];
  const tech = project.techStack.filter((t) => !t.startsWith("TODO"));
  const indexLabel = String(index + 1).padStart(2, "0");

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
            "flex flex-wrap items-center gap-3",
            visualOnEnd ? "justify-start" : "justify-end",
          ].join(" ")}
        >
          <Barcode tone="glow" />
          <span className="slant-chip bg-accent-primary/30 px-3 py-1 font-sans text-meta uppercase tracking-[0.16em] text-accent-glow">
            File_{indexLabel}
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
              "flex flex-col gap-2",
              visualOnEnd ? "items-start" : "items-end",
            ].join(" ")}
          >
            {tech.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-3"
                style={{
                  marginLeft: visualOnEnd ? `${i * 0.45}rem` : undefined,
                  marginRight: visualOnEnd ? undefined : `${i * 0.45}rem`,
                }}
              >
                <span className="font-sans text-[0.6rem] uppercase tracking-[0.14em] text-accent-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="border-b border-border-subtle pb-1 font-sans text-meta uppercase tracking-[0.08em] text-text-secondary transition-colors hover:border-accent-electric/50 hover:text-accent-electric">
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
          {projectLinks(project).map((link, i) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={[
                "work-cta px-4 py-2 font-sans text-meta uppercase tracking-[0.1em]",
                i === 0
                  ? "work-cta-primary text-text-on-accent"
                  : "work-cta-ghost text-text-primary",
              ].join(" ")}
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

  const screenTone =
    index % 3 === 0 ? "primary" : index % 3 === 1 ? "electric" : "dim";
  const screenLean = visualOnEnd ? "right" : "left";

  const visual = (
    <div
      className={[
        "relative flex flex-1 items-center justify-center overflow-visible px-4 py-8 md:min-h-[420px] md:px-5 md:py-10 lg:px-8",
        visualOnEnd ? "md:justify-end" : "md:justify-start",
      ].join(" ")}
    >
      <Layer
        from="fade"
        delay={0.04}
        className={[
          "absolute top-[12%] h-[70%] w-[92%] md:top-[10%] md:h-[76%] md:w-[96%]",
          visualOnEnd ? "right-[-2%]" : "left-[-2%]",
          plate,
          visualOnEnd ? "slant-panel" : "slant-panel-flip",
        ].join(" ")}
      >
        <div className="project-orb-scanlines absolute inset-0 opacity-40" />
        <span className="absolute left-[10%] top-[14%] h-[2px] w-10 bg-accent-glow/70" />
        <span
          className="glitch-anim-flicker absolute left-[10%] top-[17%] h-[2px] w-4 bg-text-primary/40"
          style={{ animationDelay: `${0.4 + index * 0.35}s` }}
        />
        <span className="absolute right-[12%] top-[38%] h-[2px] w-8 bg-bg-void/50" />
        <span className="absolute right-[16%] bottom-[24%] h-[2px] w-12 bg-accent-electric/55" />
      </Layer>

      <Layer
        from={visualOnEnd ? "right" : "left"}
        delay={0.14}
        className={[
          "relative z-10 w-full max-w-[520px]",
          visualOnEnd
            ? "md:translate-x-2 lg:translate-x-4"
            : "md:-translate-x-2 lg:-translate-x-4",
          "md:mb-[-0.5rem] lg:mb-[-1rem]",
        ].join(" ")}
      >
        <CyberDesktopScreen
          project={project}
          tone={screenTone}
          lean={screenLean}
          sizes="(max-width: 768px) 90vw, 520px"
        />

        {tech[0] ? (
          <div
            className={[
              "absolute -bottom-1 z-20 slant-chip border border-accent-glow/30 bg-bg-void/90 px-3 py-1.5",
              visualOnEnd ? "left-2 md:left-4" : "right-2 md:right-4",
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
      <div className={["relative overflow-hidden bg-bg-panel", "project-card-frame"].join(" ")}>
        <div
          aria-hidden
          className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-20 h-2.5 opacity-80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-3 top-4 z-20"
        >
          <Barcode tone="glow" count={3} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-4 z-20"
        >
          <Barcode tone="electric" count={4} />
        </div>
        <p
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 z-20 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-text-muted/70"
        >
          {indexLabel}_
        </p>

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
