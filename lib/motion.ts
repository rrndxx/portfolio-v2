import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: easeOutExpo,
};

export const hoverTransition: Transition = {
  duration: 0.3,
  ease: easeOutExpo,
};

export const viewportOnce = {
  once: true,
  margin: "-10%" as const,
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const glowScale: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...defaultTransition, duration: 0.9 },
  },
};

export const reducedMotionFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};
