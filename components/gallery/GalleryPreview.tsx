"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import {
  GalleryCard,
  GalleryLightbox,
} from "@/components/gallery/GalleryCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { GalleryItem } from "@/lib/types";

interface GalleryPreviewProps {
  items: GalleryItem[];
  totalCount: number;
}

/** Homepage teaser — up to 6 tiles (2 rows × 3) + link to full archive. */
export function GalleryPreview({ items, totalCount }: GalleryPreviewProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const close = useCallback(() => setActive(null), []);
  const preview = items.slice(0, 6);

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
          <p className="mb-10 max-w-md font-sans text-meta uppercase tracking-[0.12em] text-text-muted md:mb-12">
            Visual buffer_ // {String(totalCount).padStart(2, "0")} captures
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {preview.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={setActive}
                dense
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 md:mt-12">
          <Link
            href="/gallery"
            className="work-cta work-cta-signal inline-flex items-center gap-2 px-7 py-3.5 font-sans text-meta uppercase tracking-[0.12em]"
          >
            Open full gallery
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>

      <AnimatePresence>
        {active ? <GalleryLightbox item={active} onClose={close} /> : null}
      </AnimatePresence>
    </SectionShell>
  );
}
