"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { defaultTransition, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Below-fold fade+rise. Stays on initial until in view (no SSR/client fight). */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...defaultTransition, delay, duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
}
