"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { defaultTransition } from "@/lib/motion";
import type { GalleryItem, GalleryItemType } from "@/lib/types";

export function galleryTypeLabel(type: GalleryItemType): string {
  switch (type) {
    case "milestone":
      return "Shot_";
    case "project":
      return "Work_";
    case "keeps":
      return "Keep_";
    default:
      return "Shot_";
  }
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
  /** Compact uniform tile for archive density */
  dense?: boolean;
}

export function GalleryCard({
  item,
  index,
  onOpen,
  dense = false,
}: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={[
        "gallery-frame group relative block w-full overflow-hidden bg-bg-panel text-left",
        "transition-transform duration-300 hover:-translate-y-1",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-glow",
      ].join(" ")}
    >
      <div
        aria-hidden
        className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-20 h-1.5 opacity-75"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-2.5 top-2.5 z-20 flex gap-[2px] md:left-3 md:top-3"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-2.5 w-[2px] -skew-x-[22deg] bg-accent-glow/70"
          />
        ))}
      </div>

      <span className="absolute right-2.5 top-2.5 z-20 slant-chip bg-bg-void/85 px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.14em] text-accent-electric md:right-3 md:top-3">
        {galleryTypeLabel(item.type)}
      </span>

      <div
        className={[
          "relative w-full overflow-hidden",
          dense ? "aspect-[5/4]" : "aspect-[16/10]",
        ].join(" ")}
      >
        <Image
          src={item.image}
          alt={item.caption}
          fill
          sizes={
            dense
              ? "(max-width: 768px) 50vw, 25vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0, transparent 3px, color-mix(in srgb, var(--bg-void) 28%, transparent) 3px, color-mix(in srgb, var(--bg-void) 28%, transparent) 4px)",
            }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="-skew-x-[10deg] origin-bottom-left bg-bg-void/92 px-3 py-2.5 md:px-4 md:py-3">
          <div className="skew-x-[10deg] flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="font-sans text-[0.58rem] uppercase tracking-[0.16em] text-accent-glow/80">
                {String(index + 1).padStart(2, "0")}_
              </p>
              <p className="mt-0.5 truncate font-sans text-[0.7rem] uppercase tracking-[0.06em] text-text-primary md:text-meta">
                {item.caption}
              </p>
            </div>
            <span aria-hidden className="mb-0.5 flex shrink-0 gap-[2px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-2 w-[2px] -skew-x-[22deg] bg-accent-electric/60"
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function GalleryLightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-void/92 p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="gallery-frame relative max-h-[85vh] w-full max-w-5xl overflow-hidden bg-bg-panel"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={defaultTransition}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          aria-hidden
          className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-10 h-2 opacity-80"
        />
        <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
          <Image
            src={item.image}
            alt={item.caption}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-accent-glow/25 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex gap-[2px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-2 w-[2px] -skew-x-[22deg] bg-accent-electric"
                />
              ))}
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.14em] text-accent-glow">
                {galleryTypeLabel(item.type)}
              </p>
              <p className="truncate font-sans text-meta uppercase tracking-[0.08em] text-text-secondary">
                {item.caption}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="slant-chip shrink-0 border border-border-subtle px-3 py-1.5 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-glow hover:text-accent-glow"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
