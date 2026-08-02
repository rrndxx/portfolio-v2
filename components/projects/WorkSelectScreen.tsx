"use client";



import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { CyberAmbient } from "@/components/ui/CyberAmbient";

import { GlitchField } from "@/components/hero/GlitchField";

import { defaultTransition, hoverTransition } from "@/lib/motion";

import type { Project } from "@/lib/types";



interface WorkSelectScreenProps {

  projects: Project[];

}



function WorkStagePanel({ project }: { project: Project }) {

  const tech = project.techStack.filter((item) => !item.startsWith("TODO"));



  return (

    <>

      <div className="relative mx-auto w-full shrink-0 md:mx-0 md:self-end">

        <div

          aria-hidden

          className="work-stage-plate absolute inset-x-[6%] bottom-[4%] top-[8%] bg-accent-primary/45"

        />

        <div

          aria-hidden

          className="absolute inset-x-[10%] top-[6%] z-[2] h-1.5 glitch-texture opacity-70"

        />

        <div className="project-card-frame relative z-[1] mx-auto aspect-[3/4] w-[min(100%,300px)] overflow-hidden md:w-[min(100%,280px)] lg:w-[min(100%,320px)]">

          <Image

            src={project.image}

            alt={project.name}

            fill

            priority

            sizes="(max-width: 768px) 90vw, 320px"

            className="object-cover object-top"

          />

        </div>

      </div>



      <div className="work-stage-copy relative z-[2] mt-8 w-full md:mt-0 md:w-[min(100%,22rem)] md:shrink-0 md:self-end md:pb-6 lg:w-[min(100%,26rem)]">

        <div className="mb-2 flex gap-[3px]">

          {[0, 1, 2].map((i) => (

            <span

              key={i}

              className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"

            />

          ))}

        </div>

        <p className="font-sans text-meta uppercase tracking-[0.2em] text-text-muted">

          {project.featured ? "Featured project_" : "Project_"}

        </p>



        <div className="relative mt-3">

          <span

            aria-hidden

            className="project-title-ghost pointer-events-none absolute -left-1 -top-4 select-none font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-none opacity-40"

          >

            {project.name}

          </span>

          <h2 className="relative font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.92] tracking-tight text-text-primary">

            {project.name}

          </h2>

        </div>



        <p className="mt-5 font-sans text-body text-text-secondary md:text-body-lg">

          {project.description}

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

            href={`/work/${project.slug}`}

            className="work-cta work-cta-primary px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-on-accent"

          >

            Case study →

          </Link>

          {project.liveUrl ? (

            <a

              href={project.liveUrl}

              target="_blank"

              rel="noopener noreferrer"

              className="work-cta work-cta-ghost px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-primary"

            >

              Live →

            </a>

          ) : null}

          {project.repoUrl ? (

            <a

              href={project.repoUrl}

              target="_blank"

              rel="noopener noreferrer"

              className="work-cta work-cta-ghost px-6 py-3 font-sans text-meta uppercase tracking-[0.1em] text-text-primary"

            >

              Repo →

            </a>

          ) : null}

        </div>

      </div>

    </>

  );

}



/**

 * Character-select archive — scrollable roster + sticky stage panel.

 */

export function WorkSelectScreen({ projects }: WorkSelectScreenProps) {

  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");

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

    const slot = slotRefs.current.get(activeSlug);

    slot?.scrollIntoView({

      behavior: reduceMotion ? "auto" : "smooth",

      block: "nearest",

      inline: "nearest",

    });

  }, [activeSlug, reduceMotion]);



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



  useEffect(() => {

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {

      document.body.style.overflow = previousOverflow;

    };

  }, []);



  if (!active) {

    return (

      <p className="font-sans text-body text-text-muted">No projects yet.</p>

    );

  }



  const stageMotion = reduceMotion

    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

    : {

        initial: { opacity: 0, x: 28, filter: "blur(6px)" },

        animate: { opacity: 1, x: 0, filter: "blur(0px)" },

        exit: { opacity: 0, x: -18, filter: "blur(4px)" },

      };



  return (

    <div className="work-select relative h-dvh overflow-hidden bg-bg-void">

      {/* Stage backdrop */}

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">

        <div className="absolute inset-0 bg-bg-panel" />

        <div

          className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 via-accent-primary-dim/30 to-bg-void"

          style={{

            clipPath: "polygon(42% 0, 100% 0, 100% 100%, 10% 100%)",

          }}

        />

        <div

          className="absolute inset-0 opacity-[0.12]"

          style={{

            backgroundImage:

              "repeating-linear-gradient(-22deg, transparent 0, transparent 26px, color-mix(in srgb, var(--bg-void) 55%, transparent) 26px, color-mix(in srgb, var(--bg-void) 55%, transparent) 28px)",

            clipPath: "polygon(42% 0, 100% 0, 100% 100%, 10% 100%)",

          }}

        />

        <div

          className="absolute inset-0 opacity-[0.08]"

          style={{

            backgroundImage:

              "repeating-linear-gradient(135deg, var(--text-primary) 0 1px, transparent 1px 16px)",

            clipPath: "polygon(0 0, 42% 0, 10% 100%, 0 100%)",

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



      <div className="relative z-10 grid h-full min-h-0 grid-cols-1 md:grid-cols-[clamp(18rem,32vw,24rem)_minmax(0,1fr)] lg:pl-[calc(3rem+4vw)]">

        {/* Scrollable roster — left on desktop, top strip on mobile */}

        <aside className="flex min-h-0 flex-col border-border-subtle/20 px-[5vw] pt-16 md:h-full md:border-r md:px-6 md:pb-20 md:pt-20 lg:px-8">

          <div className="mb-4 flex shrink-0 items-end justify-between gap-4 md:mb-6 md:block">

            <div>

              <p className="font-sans text-meta uppercase tracking-[0.18em] text-accent-glow">

                Archive_

              </p>

              <h1 className="mt-1 font-display text-h2 uppercase tracking-tight text-text-primary">

                Work<span className="text-accent-glow">_</span>

              </h1>

              <p className="mt-2 hidden font-sans text-[0.62rem] uppercase tracking-[0.14em] text-text-muted md:block">

                {String(activeIndex + 1).padStart(2, "0")}/

                {String(projects.length).padStart(2, "0")} loaded

              </p>

            </div>

            <Link

              href="/#projects"

              className="slant-chip border border-border-subtle bg-bg-void/80 px-3 py-2 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-electric hover:text-accent-glow md:mt-4"

            >

              ← Home

            </Link>

          </div>



          <div

            ref={rosterRef}

            className="work-roster-scroll shrink-0 overflow-x-auto overflow-y-hidden pb-4 md:min-h-0 md:flex-1 md:overflow-x-visible md:overflow-y-auto md:pb-16"

          >

            <ul

              className="flex gap-4 md:flex-col md:gap-5"

              role="listbox"

              aria-label="Project roster"

              aria-activedescendant={`work-slot-${active.slug}`}

            >

              {projects.map((project, index) => {

                const isActive = project.slug === active.slug;

                return (

                  <li

                    key={project.slug}

                    id={`work-slot-${project.slug}`}

                    ref={(node) => {

                      if (node) slotRefs.current.set(project.slug, node);

                      else slotRefs.current.delete(project.slug);

                    }}

                    role="option"

                    aria-selected={isActive}

                    className="relative w-[148px] shrink-0 sm:w-[160px] md:w-full"

                  >

                    <div

                      aria-hidden

                      className="work-slot-shadow absolute inset-0"

                    />

                    <button

                      type="button"

                      onClick={() => selectProject(project.slug)}

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

                          sizes="(max-width: 768px) 160px, 320px"

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

          </div>

        </aside>



        {/* Sticky stage — fixed in viewport while roster scrolls */}

        <section

          aria-live="polite"

          className="relative flex min-h-0 flex-col overflow-hidden px-[5vw] pb-16 pt-2 md:sticky md:top-0 md:h-dvh md:items-start md:justify-end md:px-6 md:pb-20 md:pt-20 lg:px-10"

        >

          <AnimatePresence mode="wait">

            <motion.div

              key={active.slug}

              className="flex min-h-0 w-full max-w-[52rem] flex-col md:flex-row md:items-end md:gap-6 lg:gap-8"

              initial={stageMotion.initial}

              animate={stageMotion.animate}

              exit={stageMotion.exit}

              transition={reduceMotion ? hoverTransition : defaultTransition}

            >

              <WorkStagePanel project={active} />

            </motion.div>

          </AnimatePresence>

        </section>

      </div>

    </div>

  );

}


