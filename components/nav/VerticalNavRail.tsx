"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NavSectorHud } from "@/components/nav/NavSectorHud";
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
  const navIds = useMemo(
    () => items.map((item) => navKeyFromHref(item.href)),
    [items],
  );
  const routeActive = routeActiveId(pathname, navIds);

  const [spyId, setSpyId] = useState(
    () => navKeyFromHref(items[0]?.href ?? "hero"),
  );

  useEffect(() => {
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

      setSpyId(resolveNavId(current, navIds));
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [navIds, pathname]);

  const activeId = routeActive ?? spyId;
  const activeItem =
    items.find((item) => navKeyFromHref(item.href) === activeId) ?? items[0];
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => navKeyFromHref(item.href) === activeId),
  );

  return (
    <>
      <NavSectorHud
        label={activeItem?.label ?? "Home"}
        index={activeIndex}
        total={items.length}
        sectorKey={activeId}
      />

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
                  onClick={() => setSpyId(id)}
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
