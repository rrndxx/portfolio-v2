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

/** Slight vertical + horizontal offset per slot — irregular masonry, not a uniform grid. */
const slotClass = [
  "md:col-span-7 md:mt-0",
  "md:col-span-5 md:mt-16",
  "md:col-span-4 md:mt-4 md:ml-[8%]",
  "md:col-span-6 md:-mt-8",
  "md:col-span-5 md:mt-10",
  "md:col-span-7 md:mt-0",
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
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={[
        "group relative block w-full overflow-hidden bg-bg-panel-raised text-left",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-glow",
        slotClass[index % slotClass.length],
      ].join(" ")}
    >
      <div className={["relative w-full", aspectClass[item.aspect]].join(" ")}>
        <Image
          src={item.image}
          alt={item.caption}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-void/90 to-transparent px-4 pb-4 pt-10 font-sans text-meta uppercase tracking-[0.08em] text-text-secondary opacity-90 transition-opacity duration-300 group-hover:opacity-100">
        {item.caption}
      </span>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-void/90 p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden bg-bg-panel"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={defaultTransition}
        onClick={(event) => event.stopPropagation()}
      >
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
        <div className="flex items-center justify-between gap-4 border-t border-border-subtle px-4 py-3">
          <p className="font-sans text-meta uppercase tracking-[0.08em] text-text-secondary">
            {item.caption}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
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
      blendFrom="panel"
      zIndex={5}
      style={{ ["--section-pad-y" as string]: "5rem" }}
    >
      <SectionAtmosphere variant="gallery" />

      <div className="pl-[6vw] pr-[6vw] md:pl-[12vw] md:pr-[8vw]">
        <Reveal>
          <SectionHeading className="mb-10 md:mb-14">Gallery</SectionHeading>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
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
