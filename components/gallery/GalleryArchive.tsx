"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import {
  GalleryCard,
  GalleryLightbox,
} from "@/components/gallery/GalleryCard";
import { CyberAmbient } from "@/components/ui/CyberAmbient";
import { GlitchField } from "@/components/hero/GlitchField";
import type { GalleryItem, GalleryItemType } from "@/lib/types";

interface GalleryArchiveProps {
  items: GalleryItem[];
}

type FilterId = "all" | GalleryItemType;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All_" },
  { id: "milestone", label: "Shot_" },
  { id: "project", label: "Work_" },
  { id: "keeps", label: "Keep_" },
];

/**
 * Full gallery archive — dense uniform cyber grid + type filters.
 */
export function GalleryArchive({ items }: GalleryArchiveProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.type === filter);
  }, [filter, items]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg-void">
      <CyberAmbient density="lite" className="z-[1]" />
      <GlitchField density="lite" className="z-[1] opacity-40" />

      <div
        aria-hidden
        className="glitch-texture slant-band pointer-events-none absolute inset-x-0 top-0 z-20 h-8 opacity-80 md:h-10"
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

      <div className="relative z-10 px-[5vw] pb-20 pt-20 md:px-[8vw] md:pb-28 md:pt-24 lg:pl-[calc(3rem+5vw)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <div className="mb-3 flex gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
                />
              ))}
            </div>
            <p className="font-sans text-meta uppercase tracking-[0.18em] text-accent-glow">
              Archive_
            </p>
            <h1 className="mt-1 font-display text-h2 uppercase tracking-tight text-text-primary">
              Gallery<span className="text-accent-glow">_</span>
            </h1>
            <p className="mt-3 font-sans text-meta uppercase tracking-[0.12em] text-text-muted">
              {String(filtered.length).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")} buffers loaded
            </p>
          </div>

          <Link
            href="/#gallery"
            className="slant-chip border border-border-subtle bg-bg-panel px-3 py-2 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-electric hover:text-accent-glow"
          >
            ← Home
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 md:mb-10">
          {FILTERS.map((chip) => {
            const isActive = filter === chip.id;
            const count =
              chip.id === "all"
                ? items.length
                : items.filter((item) => item.type === chip.id).length;

            if (chip.id !== "all" && count === 0) return null;

            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={[
                  "slant-chip px-4 py-2 font-sans text-meta uppercase tracking-[0.1em] transition-colors",
                  isActive
                    ? "bg-accent-primary text-text-on-accent"
                    : "border border-border-subtle bg-bg-panel/60 text-text-muted hover:border-accent-glow hover:text-accent-glow",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {chip.label}
                <span className="ml-2 opacity-60">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="font-sans text-body text-text-muted">
            No captures in this buffer yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {filtered.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={setActive}
                dense
              />
            ))}
          </div>
        )}
      </div>

      <div
        aria-hidden
        className="glitch-texture slant-band-flip pointer-events-none absolute inset-x-0 bottom-0 z-20 h-8 opacity-70 md:h-10"
      />

      <AnimatePresence>
        {active ? <GalleryLightbox item={active} onClose={close} /> : null}
      </AnimatePresence>
    </div>
  );
}
