"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CyberAmbient } from "@/components/ui/CyberAmbient";
import { GlitchField } from "@/components/hero/GlitchField";
import { CyberDesktopScreen } from "@/components/projects/CyberDesktopScreen";
import { Tag } from "@/components/ui/Tag";
import { defaultTransition, viewportOnce } from "@/lib/motion";
import type { CaseStudy, CaseStudyOutcome, ProductBrief, Project } from "@/lib/types";

interface CaseStudyViewProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right";
}) {
  const hidden =
    from === "left"
      ? { opacity: 0, x: -20 }
      : from === "right"
        ? { opacity: 0, x: 20 }
        : { opacity: 0, y: 14 };

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

function SlashAccent({ count = 3 }: { count?: number }) {
  return (
    <div aria-hidden className="flex gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
        />
      ))}
    </div>
  );
}

function MetaPlate({ label, value }: { label: string; value: string }) {
  return (
    <div className="case-meta-plate px-3 py-2.5 md:px-4 md:py-3">
      <p className="font-sans text-[0.58rem] uppercase tracking-[0.16em] text-accent-glow">
        {label}_
      </p>
      <p className="mt-1 font-sans text-meta uppercase tracking-[0.06em] text-text-primary">
        {value}
      </p>
    </div>
  );
}

function ContentPlate({
  eyebrow,
  title,
  children,
  tone = "panel",
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: "panel" | "accent";
}) {
  return (
    <div
      className={[
        "case-content-plate px-5 py-6 md:px-7 md:py-8",
        tone === "accent" ? "case-content-plate-accent" : "",
      ].join(" ")}
    >
      <SlashAccent />
      <p className="mt-3 font-sans text-meta uppercase tracking-[0.14em] text-accent-electric">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-h2 uppercase leading-tight tracking-tight text-text-primary">
        {title}
      </h2>
      <div className="mt-4 font-sans text-body leading-relaxed text-text-secondary md:text-body-lg">
        {children}
      </div>
    </div>
  );
}

function OutcomeCard({ outcome, index }: { outcome: CaseStudyOutcome; index: number }) {
  return (
    <li
      className="case-outcome-card px-4 py-4 md:px-5 md:py-5"
      style={{ marginLeft: index % 2 === 1 ? "0.75rem" : undefined }}
    >
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.16em] text-accent-glow">
        {outcome.label}_
      </p>
      <p className="mt-2 font-display text-lg uppercase leading-snug tracking-tight text-text-primary md:text-xl">
        {outcome.value}
      </p>
    </li>
  );
}

function ProductBriefPlate({ brief }: { brief: ProductBrief }) {
  const rows: { label: string; value: string }[] = [
    { label: "Platform", value: brief.platform },
    { label: "Audience", value: brief.audience },
    { label: "Primary goal", value: brief.primaryGoal },
    { label: "Tone", value: brief.tone },
  ];

  return (
    <ContentPlate eyebrow="Product brief" title="Design intent">
      <p className="text-text-primary">{brief.pitch}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="border border-border-subtle/80 bg-bg-void/40 px-3 py-2.5"
          >
            <dt className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-text-muted">
              {row.label}
            </dt>
            <dd className="mt-1 font-sans text-meta uppercase tracking-[0.05em] text-text-primary">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 border-t border-border-subtle/60 pt-4 text-body text-text-muted">
        Success criteria: {brief.successCriteria}
      </p>
    </ContentPlate>
  );
}

function FallbackCaseStudy({ project }: { project: Project }) {
  return (
    <ContentPlate eyebrow="Overview" title={project.name}>
      <p>{project.description}</p>
      <p className="mt-4 text-text-muted">
        TODO: Add a full caseStudy block to projects.json for this entry.
      </p>
    </ContentPlate>
  );
}

/**
 * Cyber case-study template — JSON-driven sections, chamfered plates, slant CTAs.
 */
export function CaseStudyView({ project, prev, next }: CaseStudyViewProps) {
  const tech = project.techStack.filter((item) => !item.startsWith("TODO"));
  const study = project.caseStudy;
  const summary = study?.summary ?? project.description;

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-bg-void">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-panel" />
        <div className="case-study-bg absolute inset-0 bg-gradient-to-br from-accent-primary/25 via-bg-void to-bg-void" />
      </div>

      <CyberAmbient density="lite" className="z-[1]" />
      <GlitchField density="lite" className="z-[1] opacity-40" />

      <div className="relative z-[2] overflow-hidden border-b border-border-subtle bg-bg-panel/40 px-[5vw] pb-10 pt-16 sm:px-6 md:pb-14 md:pt-20 lg:pl-[calc(3rem+4vw)] lg:pr-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-transparent to-transparent"
        />
        <div className="relative mx-auto w-full max-w-4xl">
          <CyberDesktopScreen
            project={project}
            tone="electric"
            lean="none"
            priority
            sizes="(max-width: 768px) 90vw, 896px"
          />
        </div>
      </div>

      <article className="relative z-[2] mx-auto w-full max-w-5xl px-[5vw] pb-20 pt-8 sm:px-6 md:pb-24 md:pt-10 lg:pl-[calc(3rem+4vw)] lg:pr-10">
        <Reveal>
          <Link
            href="/work"
            className="slant-chip inline-flex border border-border-subtle bg-bg-panel px-3 py-2 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-electric hover:text-accent-glow"
          >
            ← All work
          </Link>
        </Reveal>

        <Reveal className="mt-8" delay={0.05}>
          <SlashAccent />
          <p className="mt-3 font-sans text-meta uppercase tracking-[0.18em] text-accent-glow">
            {project.featured ? "Featured case study_" : "Case study_"}
          </p>
          <div className="relative mt-4 max-w-4xl">
            <span
              aria-hidden
              className="project-title-ghost pointer-events-none absolute -left-1 -top-4 select-none font-display text-[clamp(2rem,7vw,4.5rem)] uppercase leading-none opacity-30 md:-top-5"
            >
              {project.name}
            </span>
            <h1 className="relative font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.92] tracking-tight text-text-primary">
              {project.name}
            </h1>
          </div>
          <p className="mt-5 max-w-3xl font-sans text-body-lg leading-relaxed text-text-secondary">
            {summary}
          </p>
        </Reveal>

        {study ? (
          <Reveal className="mt-6 flex flex-wrap gap-2 md:mt-8" delay={0.08}>
            <MetaPlate label="Role" value={study.role} />
            <MetaPlate label="Timeline" value={study.timeline} />
          </Reveal>
        ) : null}

        {tech.length > 0 ? (
          <Reveal className="mt-6 md:mt-8" delay={0.1}>
            <ul className="flex flex-wrap gap-2">
              {tech.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal className="mt-8 flex flex-wrap gap-2.5 md:mt-10" delay={0.12}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="work-cta work-cta-primary px-5 py-2.5 font-sans text-meta uppercase tracking-[0.1em] text-text-on-accent md:px-6 md:py-3"
            >
              Live site →
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="work-cta work-cta-ghost px-5 py-2.5 font-sans text-meta uppercase tracking-[0.1em] text-text-primary md:px-6 md:py-3"
            >
              Repository →
            </a>
          ) : null}
        </Reveal>

        <div className="mt-14 space-y-8 md:mt-16 md:space-y-10">
          {study ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                <Reveal from="left">
                  <ContentPlate eyebrow="Problem" title="The challenge">
                    <p>{study.problem}</p>
                  </ContentPlate>
                </Reveal>
                <Reveal from="right" delay={0.08}>
                  <ContentPlate eyebrow="Approach" title="What we built" tone="accent">
                    <p>{study.approach}</p>
                  </ContentPlate>
                </Reveal>
              </div>

              {study.highlights.length > 0 ? (
                <Reveal>
                  <ContentPlate eyebrow="Highlights" title="Key capabilities">
                    <ul className="space-y-3">
                      {study.highlights.map((item, i) => (
                        <li
                          key={item}
                          className="flex gap-3"
                          style={{ marginLeft: `${i * 0.45}rem` }}
                        >
                          <span className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-accent-electric">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="border-b border-border-subtle/70 pb-2 text-text-primary">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </ContentPlate>
                </Reveal>
              ) : null}

              {study.outcomes.length > 0 ? (
                <Reveal>
                  <div className="mb-4">
                    <SlashAccent />
                    <p className="mt-3 font-sans text-meta uppercase tracking-[0.14em] text-accent-electric">
                      Outcomes_
                    </p>
                    <h2 className="mt-1 font-display text-h2 uppercase tracking-tight text-text-primary">
                      Results
                    </h2>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {study.outcomes.map((outcome, index) => (
                      <OutcomeCard key={outcome.label} outcome={outcome} index={index} />
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {study.sections?.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.05}>
                  <ContentPlate eyebrow="Deep dive" title={section.heading}>
                    <p>{section.body}</p>
                  </ContentPlate>
                </Reveal>
              ))}

              {project.productBrief ? (
                <Reveal>
                  <ProductBriefPlate brief={project.productBrief} />
                </Reveal>
              ) : null}
            </>
          ) : (
            <Reveal>
              <FallbackCaseStudy project={project} />
            </Reveal>
          )}
        </div>

        {(prev || next) && (
          <Reveal className="mt-16 border-t border-border-subtle/60 pt-8 md:mt-20">
            <p className="font-sans text-meta uppercase tracking-[0.14em] text-text-muted">
              Continue archive_
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  href={`/work/${prev.slug}`}
                  className="case-nav-link group flex min-w-0 flex-col border border-border-subtle bg-bg-panel/60 px-4 py-3 transition-colors hover:border-accent-electric"
                >
                  <span className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-text-muted">
                    ← Previous
                  </span>
                  <span className="mt-1 truncate font-display text-sm uppercase text-text-primary group-hover:text-accent-glow">
                    {prev.name}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className="case-nav-link group flex min-w-0 flex-col border border-border-subtle bg-bg-panel/60 px-4 py-3 text-right transition-colors hover:border-accent-electric sm:items-end"
                >
                  <span className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-text-muted">
                    Next →
                  </span>
                  <span className="mt-1 truncate font-display text-sm uppercase text-text-primary group-hover:text-accent-glow">
                    {next.name}
                  </span>
                </Link>
              ) : null}
            </div>
          </Reveal>
        )}
      </article>

      <div
        aria-hidden
        className="glitch-texture slant-band-flip pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 opacity-70"
      />
    </main>
  );
}
