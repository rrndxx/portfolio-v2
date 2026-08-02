"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAutoDismiss } from "@/lib/useAutoDismiss";
import { defaultTransition, hoverTransition } from "@/lib/motion";

interface NavSectorHudProps {
  label: string;
  index: number;
  total: number;
  /** Changes when the active sector changes — retriggers the 2s display window. */
  sectorKey: string;
  dismissMs?: number;
  className?: string;
}

/**
 * Floating sector nameplate — visible briefly after navigation, then fades out.
 */
export function NavSectorHud({
  label,
  index,
  total,
  sectorKey,
  dismissMs = 2000,
  className = "pointer-events-none fixed right-4 top-[4.5rem] z-40 md:right-6 md:top-[5.25rem] lg:right-8",
}: NavSectorHudProps) {
  const reduceMotion = useReducedMotion();
  const visible = useAutoDismiss(sectorKey, dismissMs);

  return (
    <div aria-live="polite" className={className}>
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={sectorKey}
            initial={{ opacity: 0, x: 16, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 12, y: -6 }}
            transition={reduceMotion ? hoverTransition : defaultTransition}
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
                {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </span>
            </div>
            <p className="font-display text-[1.15rem] uppercase leading-none tracking-tight text-text-primary md:text-[1.35rem]">
              {label}
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
        ) : null}
      </AnimatePresence>
    </div>
  );
}
