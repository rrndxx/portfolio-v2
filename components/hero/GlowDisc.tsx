"use client";

import { motion, useReducedMotion } from "framer-motion";
import { glowScale, reducedMotionFade } from "@/lib/motion";

export function GlowDisc() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[38%] h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
      style={{ background: "var(--gradient-glow)" }}
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? reducedMotionFade : glowScale}
    />
  );
}
