"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CyberAmbient } from "@/components/ui/CyberAmbient";
import { GlitchField } from "@/components/hero/GlitchField";
import type { Project } from "@/lib/types";

interface WorkSelectScreenProps {
  projects: Project[];
}

/**
 * Character-select archive — cyber parallelogram roster + diagonal stage.
 */
export function WorkSelectScreen({ projects }: WorkSelectScreenProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const active =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];

  if (!active) {
    return (
      <p className="font-sans text-body text-text-muted">No projects yet.</p>
    );
  }

  const tech = active.techStack.filter((item) => !item.startsWith("TODO"));

  return (
    <div className="work-select relative min-h-dvh overflow-hidden bg-bg-void">
      {/* Stage backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-panel" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 via-accent-primary-dim/30 to-bg-void"
          style={{
            clipPath: "polygon(36% 0, 100% 0, 100% 100%, 8% 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-22deg, transparent 0, transparent 26px, color-mix(in srgb, var(--bg-void) 55%, transparent) 26px, color-mix(in srgb, var(--bg-void) 55%, transparent) 28px)",
            clipPath: "polygon(36% 0, 100% 0, 100% 100%, 8% 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--text-primary) 0 1px, transparent 1px 16px)",
            clipPath: "polygon(0 0, 36% 0, 8% 100%, 0 100%)",
          }}
        />
      </div>

      <CyberAmbient density="lite" className="z-[1]" />
      <GlitchField density="lite" className="z-[1] opacity-50" />

      {/* Top / bottom cyber bands */}
      <div
        aria-hidden
        className="glitch-texture slant-band pointer-events-none absolute inset-x-0 top-0 z-20 h-8 opacity-85 md:h-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-2 z-20 flex gap-[3px] md:top-3"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block h-3 w-[2px] -skew-x-[28deg] bg-text-primary/60"
          />
        ))}
      </div>
      <div
        aria-hidden
        className="glitch-texture slant-band-flip pointer-events-none absolute inset-x-0 bottom-0 z-20 h-8 opacity-75 md:h-10"
      />

      <div className="relative z-10 flex min-h-dvh flex-col px-[5vw] pb-16 pt-16 md:flex-row md:items-stretch md:gap-8 md:px-[6vw] md:pb-20 md:pt-20 lg:gap-12 lg:pl-[calc(3rem+4vw)]">
        <aside className="flex w-full shrink-0 flex-col md:w-[200px] lg:w-[240px]">
          <div className="mb-6 flex items-end justify-between gap-4 md:mb-8 md:block">
            <div>
              <p className="font-sans text-meta uppercase tracking-[0.18em] text-accent-glow">
                Archive_
              </p>
              <h1 className="mt-1 font-display text-h2 uppercase tracking-tight text-text-primary">
                Work<span className="text-accent-glow">_</span>
              </h1>
            </div>
            <Link
              href="/#projects"
              className="slant-chip border border-border-subtle bg-bg-void/80 px-3 py-2 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-electric hover:text-accent-glow md:mt-4"
            >
              ← Home
            </Link>
          </div>

          <ul className="flex gap-4 overflow-x-auto pb-4 md:flex-col md:gap-5 md:overflow-visible md:pb-0">
            {projects.map((project, index) => {
              const isActive = project.slug === active.slug;
              return (
                <li
                  key={project.slug}
                  className="relative w-[140px] shrink-0 md:w-full"
                >
                  <div aria-hidden className="work-slot-shadow absolute inset-0" />
                  <button
                    type="button"
                    onClick={() => setActiveSlug(project.slug)}
                    className={[
                      "work-slot relative block w-full overflow-hidden text-left transition-[transform,filter] duration-300",
                      isActive
                        ? "work-slot-active scale-[1.02]"
                        : "hover:-translate-y-1.5 hover:brightness-110",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    <div className="work-slot-inner relative aspect-[4/5] bg-bg-panel-raised">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-void/90 via-transparent to-transparent" />
                      <div className="absolute left-2 top-2 flex gap-[2px]">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="block h-2 w-[2px] -skew-x-[22deg] bg-accent-glow/70"
                          />
                        ))}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-2.5">
                        <p className="font-sans text-[0.6rem] uppercase tracking-[0.14em] text-accent-glow/80">
                          {String(index + 1).padStart(2, "0")}_
                        </p>
                        <p className="mt-0.5 font-display text-sm uppercase leading-tight text-text-primary">
                          {project.name}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="relative mt-8 flex min-w-0 flex-1 flex-col md:mt-0 md:flex-row md:items-end md:gap-6 lg:gap-10">
          <div className="relative mx-auto w-full max-w-md flex-1 md:mx-0 md:max-w-none">
            <div
              aria-hidden
              className="work-stage-plate absolute inset-x-[6%] bottom-[4%] top-[8%] bg-accent-primary/45"
            />
            <div
              aria-hidden
              className="absolute inset-x-[10%] top-[6%] z-[2] h-1.5 glitch-texture opacity-70"
            />
            <div className="project-card-frame relative z-[1] mx-auto aspect-[3/4] w-[min(100%,380px)] overflow-hidden md:w-[min(100%,440px)] lg:w-[min(92%,520px)]">
              <Image
                src={active.image}
                alt={active.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 520px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="relative z-[2] mt-8 w-full max-w-lg md:mt-0 md:w-[42%] md:pb-6 lg:w-[38%]">
            <div className="mb-2 flex gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
                />
              ))}
            </div>
            <p className="font-sans text-meta uppercase tracking-[0.2em] text-text-muted">
              {active.featured ? "Featured project_" : "Project_"}
            </p>

            <div className="relative mt-3">
              <span
                aria-hidden
                className="project-title-ghost pointer-events-none absolute -left-1 -top-4 select-none font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-none opacity-40"
              >
                {active.name}
              </span>
              <h2 className="relative font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.92] tracking-tight text-text-primary">
                {active.name}
              </h2>
            </div>

            <p className="mt-5 font-sans text-body text-text-secondary md:text-body-lg">
              {active.description}
            </p>

            {tech.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-2">
                {tech.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3"
                    style={{ marginLeft: `${i * 0.55}rem` }}
                  >
                    <span className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-accent-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="border-b border-border-subtle pb-1 font-sans text-meta uppercase tracking-[0.08em] text-text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/work/${active.slug}`}
                className="work-cta work-cta-primary px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-on-accent"
              >
                Case study →
              </Link>
              {active.liveUrl ? (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-cta work-cta-ghost px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-primary"
                >
                  Live →
                </a>
              ) : null}
              {active.repoUrl ? (
                <a
                  href={active.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-cta work-cta-ghost px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-primary"
                >
                  Repo →
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
