"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { defaultTransition } from "@/lib/motion";
import type { GalleryAspect, GalleryItem } from "@/lib/types";

interface GalleryProps {
  items: GalleryItem[];
}

const aspectClass: Record<GalleryAspect, string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

/** Slight vertical + horizontal offset — irregular masonry, not a uniform grid. */
const slotClass = [
  "md:col-span-7 md:mt-0",
  "md:col-span-5 md:mt-14",
  "md:col-span-4 md:mt-6 md:ml-[6%]",
  "md:col-span-6 md:-mt-6",
  "md:col-span-5 md:mt-12",
  "md:col-span-7 md:mt-2",
];

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  const typeLabel = item.type === "art" ? "Art_" : "Shot_";

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={[
        "gallery-frame group relative block w-full overflow-hidden bg-bg-panel text-left",
        "transition-transform duration-300 hover:-translate-y-1",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-glow",
        slotClass[index % slotClass.length],
      ].join(" ")}
    >
      <div
        aria-hidden
        className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-20 h-1.5 opacity-75"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 z-20 flex gap-[2px]"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-2.5 w-[2px] -skew-x-[22deg] bg-accent-glow/70"
          />
        ))}
      </div>

      <span className="absolute right-3 top-3 z-20 slant-chip bg-bg-void/80 px-2 py-1 font-sans text-[0.6rem] uppercase tracking-[0.14em] text-accent-electric">
        {typeLabel}
      </span>

      <div className={["relative w-full", aspectClass[item.aspect]].join(" ")}>
        <Image
          src={item.image}
          alt={item.caption}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
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
        <div className="-skew-x-[10deg] origin-bottom-left bg-bg-void/90 px-4 py-3 backdrop-blur-[2px]">
          <div className="skew-x-[10deg] flex items-end justify-between gap-3">
            <div>
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.16em] text-accent-glow/80">
                {String(index + 1).padStart(2, "0")}_
              </p>
              <p className="mt-0.5 font-sans text-meta uppercase tracking-[0.08em] text-text-primary">
                {item.caption}
              </p>
            </div>
            <span
              aria-hidden
              className="mb-0.5 flex gap-[2px]"
            >
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

function Lightbox({
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
          <div className="flex items-center gap-3">
            <span className="inline-flex gap-[2px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-2 w-[2px] -skew-x-[22deg] bg-accent-electric"
                />
              ))}
            </span>
            <p className="font-sans text-meta uppercase tracking-[0.08em] text-text-secondary">
              {item.caption}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="slant-chip border border-border-subtle px-3 py-1.5 font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:border-accent-glow hover:text-accent-glow"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Gallery({ items }: GalleryProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <SectionShell
      id="gallery"
      className="bg-bg-void pb-16 md:pb-32"
      cut="rise-left"
      blendFrom="void"
      zIndex={6}
      style={{ ["--section-pad-y" as string]: "5rem" }}
    >
      <SectionAtmosphere variant="gallery" />

      <div className="relative z-[1] pl-[6vw] pr-[6vw] md:pl-[12vw] md:pr-[8vw]">
        <Reveal>
          <div className="mb-3 flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </div>
          <SectionHeading className="mb-3 md:mb-4">Gallery</SectionHeading>
          <p className="mb-10 max-w-md font-sans text-meta uppercase tracking-[0.12em] text-text-muted md:mb-14">
            Visual buffer_ // captures
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7">
            {items.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={setActive}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active ? <Lightbox item={active} onClose={close} /> : null}
      </AnimatePresence>
    </SectionShell>
  );
}
