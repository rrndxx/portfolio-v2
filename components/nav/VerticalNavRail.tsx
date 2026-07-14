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

export function VerticalNavRail({ items }: VerticalNavRailProps) {
  const [activeId, setActiveId] = useState(
    sectionIdFromHref(items[0]?.href ?? "hero"),
  );

  useEffect(() => {
    const ids = items.map((item) => sectionIdFromHref(item.href));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-dvh w-12 md:block lg:w-14"
    >
      <ul className="pointer-events-auto flex h-full flex-col items-center justify-center gap-2 py-16">
        {items.map((item) => {
          const id = sectionIdFromHref(item.href);
          const isActive = activeId === id;

          return (
            <li
              key={item.href}
              className="flex h-[4.75rem] w-full items-center justify-center"
            >
              <a
                href={item.href}
                className={[
                  "block origin-center -rotate-90 font-sans text-meta uppercase whitespace-nowrap",
                  "tracking-[0.14em] transition-colors duration-300",
                  isActive
                    ? "text-accent-glow"
                    : "text-text-primary/65 hover:text-text-primary",
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
