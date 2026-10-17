"use client";

import Image from "next/image";
import type { Project } from "@/lib/types";

type ScreenTone = "primary" | "dim" | "electric";

interface CyberDesktopScreenProps {
  project: Project;
  /** Visual variant so featured blocks don't all look identical. */
  tone?: ScreenTone;
  /** Slight perspective lean — keep subtle. */
  lean?: "left" | "right" | "none";
  priority?: boolean;
  className?: string;
  sizes?: string;
}

const TONE_GLOW: Record<ScreenTone, string> = {
  primary: "from-accent-primary/50 via-accent-glow/20 to-transparent",
  dim: "from-accent-primary-dim/55 via-accent-primary/20 to-transparent",
  electric: "from-accent-electric/45 via-accent-glow/18 to-transparent",
};

const TONE_EDGE: Record<ScreenTone, string> = {
  primary: "border-accent-primary/50",
  dim: "border-accent-primary-dim/60",
  electric: "border-accent-electric/55",
};

/**
 * Cyber browser / desktop viewport for web-app screenshots.
 * Rectangular landscape frame — not a photo card.
 */
export function CyberDesktopScreen({
  project,
  tone = "primary",
  lean = "none",
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 90vw, 520px",
}: CyberDesktopScreenProps) {
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.local`;

  const leanClass =
    lean === "left"
      ? "md:-rotate-1 md:origin-bottom-left"
      : lean === "right"
        ? "md:rotate-1 md:origin-bottom-right"
        : "";

  return (
    <div className={["relative w-full", className].join(" ")}>
      {/* Soft ground glow — monitor light on the desk */}
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute -inset-x-[8%] -bottom-[12%] h-[40%] bg-gradient-to-t blur-2xl",
          TONE_GLOW[tone],
        ].join(" ")}
      />

      <div
        className={[
          "cyber-desktop relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          leanClass,
        ].join(" ")}
      >
        {/* Outer bezel */}
        <div
          className={[
            "cyber-desktop-bezel relative border bg-bg-panel-raised",
            TONE_EDGE[tone],
          ].join(" ")}
        >
          {/* Title / browser chrome */}
          <div className="relative flex items-center gap-2 border-b border-border-subtle bg-bg-void/90 px-2.5 py-2 md:px-3 md:py-2.5">
            <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
              <span className="cyber-desktop-led bg-accent-primary" />
              <span className="cyber-desktop-led bg-accent-glow/80" />
              <span className="cyber-desktop-led bg-accent-electric/70" />
            </div>

            <div className="cyber-desktop-url min-w-0 flex-1">
              <span className="truncate font-mono text-[0.58rem] uppercase tracking-[0.14em] text-text-muted md:text-[0.62rem]">
                <span className="text-accent-electric">https://</span>
                {host}
              </span>
            </div>

            <span
              className="hidden shrink-0 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-text-muted sm:inline"
              aria-hidden
            >
              {project.featured ? "LIVE_" : "NODE_"}
            </span>
          </div>

          {/* Viewport */}
          <div className="group relative aspect-[16/10] w-full overflow-hidden bg-bg-void">
            <Image
              src={project.image}
              alt={`${project.name} — interface preview`}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />

            {/* Scanlines + vignette */}
            <div
              aria-hidden
              className="project-orb-scanlines pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,color-mix(in_srgb,var(--bg-void)_55%,transparent)_100%)]"
            />
            <div
              aria-hidden
              className="glitch-texture pointer-events-none absolute inset-x-0 top-0 h-1 opacity-60"
            />

            {/* Corner HUD ticks */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent-electric/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-accent-glow/60"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent-glow/50"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent-electric/60"
            />

            {/* Status strip */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-bg-void/90 via-bg-void/40 to-transparent px-3 pb-2.5 pt-8">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent-glow">
                {project.name}_
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-text-muted">
                16:10 · WEB
              </span>
            </div>
          </div>

          {/* Bottom chin / stand cue */}
          <div
            aria-hidden
            className="flex items-center justify-center gap-3 border-t border-border-subtle bg-bg-void/80 py-1.5"
          >
            <span className="h-[2px] w-8 bg-border-subtle" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent-electric/50 shadow-[0_0_8px_var(--accent-glow)]" />
            <span className="h-[2px] w-8 bg-border-subtle" />
          </div>
        </div>

        {/* Monitor stand */}
        <div aria-hidden className="cyber-desktop-stand mx-auto">
          <div className="cyber-desktop-neck" />
          <div className="cyber-desktop-base" />
        </div>
      </div>
    </div>
  );
}
