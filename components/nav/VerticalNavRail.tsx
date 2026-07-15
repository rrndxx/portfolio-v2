"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { defaultTransition } from "@/lib/motion";
import type { NavItem } from "@/lib/types";

interface VerticalNavRailProps {
  items: NavItem[];
}

function navKeyFromHref(href: string): string {
  if (href.startsWith("/") && !href.includes("#")) {
    const segment = href.replace(/^\//, "").split("/")[0];
    return segment || "hero";
  }
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

function routeActiveId(pathname: string, navIds: string[]): string | null {
  if (pathname === "/gallery" || pathname.startsWith("/gallery/")) {
    return navIds.includes("gallery") ? "gallery" : null;
  }
  if (pathname === "/work" || pathname.startsWith("/work/")) {
    if (navIds.includes("projects")) return "projects";
    if (navIds.includes("work")) return "work";
  }
  return null;
}

export function VerticalNavRail({ items }: VerticalNavRailProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(
    () => navKeyFromHref(items[0]?.href ?? "hero"),
  );

  const activeItem =
    items.find((item) => navKeyFromHref(item.href) === activeId) ?? items[0];
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => navKeyFromHref(item.href) === activeId),
  );

  useEffect(() => {
    const navIds = items.map((item) => navKeyFromHref(item.href));
    const fromRoute = routeActiveId(pathname, navIds);

    if (fromRoute) {
      setActiveId(fromRoute);
      return;
    }

    if (pathname !== "/") return;

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
  }, [items, pathname]);

  return (
    <>
      {/* Sits under hero CTA — selected sector nameplate */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-[4.5rem] z-40 md:right-6 md:top-[5.25rem] lg:right-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 16, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 12, y: -6 }}
            transition={defaultTransition}
            className="nav-sector-hud relative min-w-[9.5rem] px-4 py-3 md:min-w-[11rem] md:px-5 md:py-3.5"
          >
            <div
              aria-hidden
              className="glitch-texture pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
            />
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="font-sans text-[0.58rem] uppercase tracking-[0.18em] text-accent-glow">
                Sector_
              </span>
              <span className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-text-muted">
                {String(activeIndex + 1).padStart(2, "0")}/
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <p className="font-display text-[1.15rem] uppercase leading-none tracking-tight text-text-primary md:text-[1.35rem]">
              {activeItem?.label ?? "Home"}
              <span className="text-accent-glow">_</span>
            </p>
            <div aria-hidden className="mt-2 flex items-center gap-1.5">
              <span className="h-px flex-1 bg-gradient-to-r from-accent-electric/80 to-transparent" />
              <span className="flex gap-[2px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-2 w-[2px] -skew-x-[22deg] bg-accent-electric"
                  />
                ))}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <nav
        aria-label="Primary"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-dvh w-16 md:block lg:w-[4.5rem]"
      >
        <ul className="pointer-events-auto flex h-full flex-col items-center justify-center gap-1 py-12 lg:gap-1.5">
          {items.map((item) => {
            const id = navKeyFromHref(item.href);
            const isActive = activeId === id;

            return (
              <li
                key={item.href}
                className="relative flex h-[4rem] w-full items-center justify-center lg:h-[4.5rem]"
              >
                {isActive ? (
                  <span
                    aria-hidden
                    className="nav-rail-plate absolute left-1/2 top-1/2 z-0 h-9 w-[4.75rem] -translate-x-[18%] -translate-y-1/2 lg:h-10 lg:w-[5.25rem]"
                  />
                ) : null}

                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute right-0.5 top-1/2 z-20 h-2 w-2 -translate-y-1/2 rounded-full bg-accent-glow shadow-[0_0_12px_var(--accent-glow)] lg:right-1"
                  />
                ) : null}

                <a
                  href={item.href}
                  onClick={() => setActiveId(id)}
                  className={[
                    "nav-rail-link relative z-10 font-sans text-meta uppercase whitespace-nowrap tracking-[0.14em]",
                    isActive
                      ? "nav-rail-link-active font-semibold"
                      : "text-text-primary/45",
                  ].join(" ")}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden className="text-accent-electric">
                        ›
                      </span>
                      {item.label}
                      <span aria-hidden className="text-accent-electric">
                        ‹
                      </span>
                    </span>
                  ) : (
                    item.label
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
