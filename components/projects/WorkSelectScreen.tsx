"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CyberAmbient } from "@/components/ui/CyberAmbient";
import { GlitchField } from "@/components/hero/GlitchField";
import { WorkRosterList } from "@/components/projects/WorkRosterList";
import { WorkStagePanel } from "@/components/projects/WorkStagePanel";
import { defaultTransition, hoverTransition } from "@/lib/motion";
import type { Project } from "@/lib/types";

interface WorkSelectScreenProps {
  projects: Project[];
}

/**
 * Character-select archive — scrollable roster + sticky stage panel.
 */
export function WorkSelectScreen({ projects }: WorkSelectScreenProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [hasMounted, setHasMounted] = useState(false);
  const rosterRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const reduceMotion = useReducedMotion();

  const active =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const activeIndex = projects.findIndex(
    (project) => project.slug === active?.slug,
  );

  const selectProject = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  const selectByOffset = useCallback(
    (offset: number) => {
      if (projects.length === 0) return;
      const currentIndex = projects.findIndex(
        (project) => project.slug === activeSlug,
      );
      const baseIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex =
        (baseIndex + offset + projects.length) % projects.length;
      setActiveSlug(projects[nextIndex].slug);
    },
    [activeSlug, projects],
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const slot = slotRefs.current.get(activeSlug);
    slot?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeSlug, reduceMotion]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const syncOverflow = () => {
      document.body.style.overflow = media.matches ? "hidden" : "";
    };

    syncOverflow();
    media.addEventListener("change", syncOverflow);
    return () => {
      media.removeEventListener("change", syncOverflow);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          event.target.closest("input, textarea, select, [contenteditable]"))
      ) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        selectByOffset(1);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        selectByOffset(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectByOffset]);

  if (!active) {
    return (
      <p className="font-sans text-body text-text-muted">No projects yet.</p>
    );
  }

  const motionEnabled = hasMounted && !reduceMotion;

  return (
    <div className="work-select relative min-h-dvh bg-bg-void md:h-dvh md:overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-panel" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 via-accent-primary-dim/30 to-bg-void work-stage-bg"
        />
        <div
          className="absolute inset-0 opacity-[0.12] work-stage-bg"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-22deg, transparent 0, transparent 26px, color-mix(in srgb, var(--bg-void) 55%, transparent) 26px, color-mix(in srgb, var(--bg-void) 55%, transparent) 28px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08] work-roster-bg"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--text-primary) 0 1px, transparent 1px 16px)",
          }}
        />
      </div>

      <CyberAmbient density="lite" className="z-[1]" />
      <GlitchField density="lite" className="z-[1] opacity-50" />

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

      <div className="work-select-shell relative z-10 grid min-h-dvh grid-rows-[auto_minmax(0,1fr)] md:h-full md:min-h-0 md:grid-cols-[clamp(16rem,30vw,22rem)_minmax(0,1fr)] md:grid-rows-1 lg:pl-[calc(3rem+3vw)]">
        <aside className="flex min-h-0 flex-col border-border-subtle/20 px-[5vw] pt-14 sm:pt-16 md:h-full md:border-r md:px-5 md:pb-6 md:pt-[4.5rem] lg:px-6 lg:pt-20">
          <div className="mb-3 flex shrink-0 items-end justify-between gap-4 md:mb-4">
            <div>
              <p className="font-sans text-meta uppercase tracking-[0.18em] text-accent-glow">
                Archive_
              </p>
              <h1 className="mt-1 font-display text-h2 uppercase tracking-tight text-text-primary">
                Work<span className="text-accent-glow">_</span>
              </h1>
              <p className="mt-1.5 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-text-muted">
                {String(activeIndex + 1).padStart(2, "0")}/
                {String(projects.length).padStart(2, "0")} loaded
              </p>
            </div>
            <Link
              href="/#projects"
              className="slant-chip shrink-0 border border-border-subtle bg-bg-void/80 px-3 py-2 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-electric hover:text-accent-glow"
            >
              ← Home
            </Link>
          </div>

          <div className="work-roster-shell min-h-0 max-h-[34vh] md:max-h-none md:flex-1">
            <WorkRosterList
              projects={projects}
              activeSlug={activeSlug}
              onSelect={selectProject}
              listRef={rosterRef}
              slotRefs={slotRefs}
            />
          </div>
        </aside>

        <section
          aria-live="polite"
          className="work-stage-shell relative flex min-h-0 min-w-0 flex-col px-[5vw] pb-10 pt-4 sm:px-6 md:sticky md:top-0 md:h-dvh md:overflow-hidden md:px-5 md:pb-16 md:pt-[4.5rem] lg:px-8 lg:pt-20"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              className="flex min-h-0 w-full min-w-0 flex-1 flex-col"
              initial={
                motionEnabled
                  ? { opacity: 0, x: 16, filter: "blur(4px)" }
                  : false
              }
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={
                motionEnabled
                  ? { opacity: 0, x: -10, filter: "blur(3px)" }
                  : { opacity: 0 }
              }
              transition={motionEnabled ? defaultTransition : hoverTransition}
            >
              <WorkStagePanel project={active} />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
