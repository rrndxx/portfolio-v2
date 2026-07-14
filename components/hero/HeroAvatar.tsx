"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { defaultTransition, reducedMotionFade } from "@/lib/motion";

interface HeroAvatarProps {
  src: string;
  alt: string;
}

export function HeroAvatar({ src, alt }: HeroAvatarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
      initial="hidden"
      animate="visible"
      variants={
        prefersReducedMotion
          ? reducedMotionFade
          : {
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...defaultTransition, delay: 0.2 },
              },
            }
      }
    >
      <div className="relative h-[52vh] w-[min(90vw,420px)] md:h-[70vh] md:w-[min(48vw,540px)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 48vw"
          className="object-contain object-bottom"
        />
      </div>
    </motion.div>
  );
}
