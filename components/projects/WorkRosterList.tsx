"use client";

import Image from "next/image";
import type { Project } from "@/lib/types";

interface WorkRosterListProps {
  projects: Project[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  listRef?: React.RefObject<HTMLDivElement | null>;
  slotRefs: React.MutableRefObject<Map<string, HTMLLIElement>>;
}

/**
 * Vertical archive index — row-based roster without skew overflow clipping.
 */
export function WorkRosterList({
  projects,
  activeSlug,
  onSelect,
  listRef,
  slotRefs,
}: WorkRosterListProps) {
  const active =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];

  return (
    <div
      ref={listRef}
      className="work-roster-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-4 md:pb-16"
    >
      <ul
        className="flex flex-col gap-2 md:gap-2.5"
        role="listbox"
        aria-label="Project roster"
        aria-activedescendant={active ? `work-slot-${active.slug}` : undefined}
      >
        {projects.map((project, index) => {
          const isActive = project.slug === activeSlug;

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
              className="work-roster-row"
            >
              <button
                type="button"
                onClick={() => onSelect(project.slug)}
                className={[
                  "work-roster-btn group flex w-full items-center gap-3 px-2 py-2.5 text-left transition-[background-color,border-color,transform] duration-300 md:gap-3.5 md:px-2.5 md:py-3",
                  isActive
                    ? "work-roster-btn-active"
                    : "hover:-translate-y-px hover:bg-bg-panel/70",
                ].join(" ")}
                aria-pressed={isActive}
              >
                <span
                  className={[
                    "work-roster-index shrink-0 font-sans text-[0.62rem] uppercase tracking-[0.16em]",
                    isActive ? "text-accent-glow" : "text-text-muted",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="work-roster-thumb relative h-14 w-14 shrink-0 overflow-hidden bg-bg-panel-raised md:h-16 md:w-16">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-bg-void/75 via-transparent to-transparent"
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={[
                      "block truncate font-display text-sm uppercase leading-tight tracking-tight md:text-[0.95rem]",
                      isActive ? "text-text-primary" : "text-text-secondary",
                    ].join(" ")}
                  >
                    {project.name}
                  </span>
                  {project.featured ? (
                    <span className="mt-1 block font-sans text-[0.55rem] uppercase tracking-[0.14em] text-accent-electric/90">
                      Featured_
                    </span>
                  ) : (
                    <span className="mt-1 block font-sans text-[0.55rem] uppercase tracking-[0.12em] text-text-muted">
                      Archive entry_
                    </span>
                  )}
                </span>

                <span
                  aria-hidden
                  className={[
                    "shrink-0 font-sans text-lg leading-none transition-opacity",
                    isActive
                      ? "text-accent-glow opacity-100"
                      : "text-text-muted opacity-0 group-hover:opacity-60",
                  ].join(" ")}
                >
                  ›
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
