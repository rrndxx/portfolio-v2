"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/types";

interface VerticalNavRailProps {
  items: NavItem[];
}

function sectionIdFromHref(href: string): string {
  const hash = href.includes("#") ? href.split("#")[1] : href.replace(/^#/, "");
  return hash || "hero";
}

/** All homepage sections — spy this list, then map onto the nearest nav item. */
const SPY_ORDER = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "achievements",
  "gallery",
  "contact",
] as const;

function resolveNavId(sectionId: string, navIds: string[]): string {
  if (navIds.includes(sectionId)) return sectionId;

  const aliases: Record<string, string> = {
    skills: "about",
  };

  const aliased = aliases[sectionId];
  if (aliased && navIds.includes(aliased)) return aliased;

  const idx = SPY_ORDER.indexOf(sectionId as (typeof SPY_ORDER)[number]);
  if (idx === -1) return navIds[0] ?? "hero";

  for (let i = idx; i >= 0; i--) {
    const id = SPY_ORDER[i];
    if (navIds.includes(id)) return id;
  }

  return navIds[0] ?? "hero";
}

export function VerticalNavRail({ items }: VerticalNavRailProps) {
  const [activeId, setActiveId] = useState(
    () => sectionIdFromHref(items[0]?.href ?? "hero"),
  );

  useEffect(() => {
    const navIds = items.map((item) => sectionIdFromHref(item.href));
    const elements = SPY_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    if (elements.length === 0) return;

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.28;
      let current = elements[0].id;

      for (const el of elements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = el.id;
      }

      setActiveId(resolveNavId(current, navIds));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-dvh w-12 md:block lg:w-14"
    >
      <ul className="pointer-events-auto flex h-full flex-col items-center justify-center gap-1 py-12 lg:gap-1.5">
        {items.map((item) => {
          const id = sectionIdFromHref(item.href);
          const isActive = activeId === id;

          return (
            <li
              key={item.href}
              className="relative flex h-[3.85rem] w-full items-center justify-center lg:h-[4.25rem]"
            >
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute right-1.5 top-1/2 z-10 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent-glow shadow-[0_0_10px_var(--accent-glow)] lg:right-2"
                />
              ) : null}
              <a
                href={item.href}
                onClick={() => setActiveId(id)}
                className={[
                  "relative block origin-center -rotate-90 font-sans text-meta uppercase whitespace-nowrap",
                  "tracking-[0.14em] transition-[color,transform] duration-300",
                  isActive
                    ? "scale-105 text-accent-glow"
                    : "text-text-primary/55 hover:scale-105 hover:text-text-primary",
                ].join(" ")}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
