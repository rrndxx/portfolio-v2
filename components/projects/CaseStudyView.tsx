import Image from "next/image";
import Link from "next/link";
import { CyberAmbient } from "@/components/ui/CyberAmbient";
import { GlitchField } from "@/components/hero/GlitchField";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/types";

interface CaseStudyViewProps {
  project: Project;
}

/**
 * Cyber case-study template — chamfered hero, slash accents, slant CTAs.
 */
export function CaseStudyView({ project }: CaseStudyViewProps) {
  const tech = project.techStack.filter((item) => !item.startsWith("TODO"));

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg-void">
      <CyberAmbient density="lite" className="z-[1]" />
      <GlitchField density="lite" className="z-[1] opacity-45" />

      {/* Hero media — chamfered + glitch ribbon */}
      <div className="relative z-[2]">
        <div className="project-card-frame relative aspect-[21/9] w-full overflow-hidden bg-bg-panel md:aspect-[24/9]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/50 to-transparent" />
          <div
            aria-hidden
            className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-10 h-3 opacity-80"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 top-5 z-10 flex gap-[3px] md:left-8 md:top-6"
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="block h-4 w-[2px] -skew-x-[28deg] bg-text-primary/70"
              />
            ))}
          </div>
        </div>
      </div>

      <article className="relative z-[2] mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
        <Link
          href="/work"
          className="slant-chip inline-flex border border-border-subtle bg-bg-panel px-3 py-2 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-electric hover:text-accent-glow"
        >
          ← All work
        </Link>

        <div className="mt-8 flex gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
            />
          ))}
        </div>

        <p className="mt-3 font-sans text-meta uppercase tracking-[0.18em] text-accent-glow">
          {project.featured ? "Featured case study_" : "Case study_"}
        </p>

        <div className="relative mt-4">
          <span
            aria-hidden
            className="project-title-ghost pointer-events-none absolute -left-1 -top-5 select-none font-display text-[clamp(2.75rem,8vw,5rem)] uppercase leading-none opacity-35"
          >
            {project.name}
          </span>
          <h1 className="relative font-display text-display uppercase leading-[0.95] tracking-tight text-text-primary">
            {project.name}
          </h1>
        </div>

        <p className="mt-6 font-sans text-body-lg text-text-secondary">
          {project.description}
        </p>

        {tech.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="work-cta work-cta-primary px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-on-accent"
            >
              Live site →
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="work-cta work-cta-ghost px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-primary"
            >
              Repository →
            </a>
          ) : null}
        </div>

        {/* Detail plate */}
        <div className="relative mt-16 -skew-x-[8deg] border border-accent-glow/30 bg-bg-panel px-6 py-8 shadow-[5px_5px_0_color-mix(in_srgb,var(--bg-void)_55%,transparent)] md:px-8">
          <div className="skew-x-[8deg]">
            <div className="mb-3 flex gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-2 w-[2px] -skew-x-[22deg] bg-accent-glow/70"
                />
              ))}
            </div>
            <p className="font-sans text-meta uppercase tracking-[0.14em] text-accent-electric">
              Notes_
            </p>
            <p className="mt-3 font-sans text-body text-text-muted">
              TODO: expand this case study with problem, approach, and outcomes
              when ready. Template scaffold is in place.
            </p>
          </div>
        </div>
      </article>

      {/* Bottom cyber band */}
      <div
        aria-hidden
        className="glitch-texture slant-band-flip pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 opacity-70"
      />
    </main>
  );
}
