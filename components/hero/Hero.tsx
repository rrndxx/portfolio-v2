"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { GlitchField } from "@/components/hero/GlitchField";
import { HeroAvatar } from "@/components/hero/HeroAvatar";
import type { SiteConfig } from "@/lib/types";

interface HeroProps {
  config: SiteConfig;
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  if (!href) return null;

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="text-text-primary/70 transition-[color,transform] duration-300 hover:scale-110 hover:text-text-primary"
    >
      {children}
    </a>
  );
}

/** Hard geometric slash bands — no curves. */
function SlashLayer() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {/* Thick accent slash */}
      <div className="hero-slash hero-slash-a" />
      <div className="hero-slash hero-slash-b" />
      <div className="hero-slash hero-slash-c" />
      <div className="hero-slash hero-slash-d" />
      {/* Corner cut plates */}
      <div className="hero-cut hero-cut-tl" />
      <div className="hero-cut hero-cut-br" />
      {/* Hard barcode ticks */}
      <div className="absolute left-[8%] top-[22%] flex gap-1 md:left-[12%]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="block h-8 w-[3px] -skew-x-[28deg] bg-text-primary/40"
            style={{ height: `${18 + (i % 3) * 10}px` }}
          />
        ))}
      </div>
      <div className="absolute right-[10%] top-[58%] flex gap-1 md:right-[14%]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block h-10 w-[3px] -skew-x-[28deg] bg-accent-glow/50"
            style={{ height: `${22 + ((i + 1) % 3) * 8}px` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Cyber fight-poster hero — hard diagonals, slash bands, cut plates.
 */
export function Hero({ config }: HeroProps) {
  const mailto = config.email.startsWith("TODO")
    ? "/#contact"
    : `mailto:${config.email}`;

  const brand = config.name.startsWith("TODO") ? "PORTFOLIO" : config.name;
  const backdrop = config.heroBackdrop?.trim() || "DEV";
  const headlineParts = config.heroHeadline
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="hero" className="hero-fight relative min-h-dvh overflow-hidden">
      <div aria-hidden className="hero-fight-field absolute inset-0 z-0" />
      <div aria-hidden className="hero-fight-slashes pointer-events-none absolute inset-0 z-[1]" />
      <SlashLayer />
      <GlitchField className="z-[3] opacity-70" />

      {/* Mega backdrop word */}
      <div
        aria-hidden
        className="hero-enter-word pointer-events-none absolute inset-x-0 top-[10%] z-[5] flex justify-center md:top-[5%]"
      >
        <span className="hero-fight-mega select-none font-display font-black uppercase leading-none text-bg-void">
          {backdrop}
        </span>
      </div>

      {/* Ghost headline — hard type only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[36%] z-[6] flex flex-col items-center px-4 opacity-20 md:top-[32%]"
      >
        {headlineParts.map((part) => (
          <span
            key={part}
            className="font-hero text-[clamp(1.75rem,8vw,5rem)] font-bold uppercase tracking-[0.14em] text-text-primary"
          >
            {part}
          </span>
        ))}
      </div>

      <div className="hero-enter-ui absolute left-4 top-5 z-30 md:left-16 md:top-7 lg:left-20">
        <p className="font-hero text-sm font-bold uppercase tracking-[0.35em] text-text-primary md:text-base md:tracking-[0.4em]">
          {brand}
        </p>
      </div>

      <div className="hero-enter-ui absolute right-4 top-4 z-30 md:right-8 md:top-6">
        <Button variant="slant" href={config.heroCta.href}>
          {config.heroCta.label}
        </Button>
      </div>

      {/* Left plate */}
      <div className="hero-enter-ui absolute left-4 top-[42%] z-30 hidden max-w-[11rem] md:left-16 md:block lg:left-20">
        <div className="hero-fight-plate -skew-x-[14deg] border border-accent-glow/40 bg-bg-void/70 px-4 py-3">
          <div className="skew-x-[14deg]">
            <div className="mb-2 flex gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
                />
              ))}
            </div>
            <p className="font-sans text-meta uppercase leading-relaxed tracking-[0.1em] text-text-primary">
              {config.location}
            </p>
          </div>
        </div>
      </div>

      {/* Right plate */}
      <div className="hero-enter-ui absolute right-4 top-[38%] z-30 hidden max-w-[13rem] md:right-8 md:block lg:right-10">
        <div className="hero-fight-plate -skew-x-[14deg] bg-text-primary px-4 py-3 shadow-[5px_5px_0_var(--bg-void)]">
          <div className="skew-x-[14deg]">
            <p className="font-sans text-meta uppercase tracking-[0.1em] text-text-on-accent">
              {config.role}
            </p>
            <p className="mt-1 font-hero text-lg font-bold uppercase tracking-wide text-accent-primary">
              {brand}
            </p>
          </div>
        </div>
      </div>

      <HeroAvatar src={config.heroAvatar} alt={`${config.name} avatar`} />

      <div className="hero-enter-ui absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-4 pb-6 md:pb-8">
        <p className="mb-2 flex items-center gap-3 font-sans text-meta uppercase tracking-[0.18em] text-text-primary">
          <span className="inline-flex gap-[2px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </span>
          {headlineParts.join(" / ")}
          <span className="inline-flex gap-[2px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-[3px] -skew-x-[22deg] bg-accent-electric"
              />
            ))}
          </span>
        </p>

        <h1 className="hero-fight-title text-center font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight text-text-primary">
          {config.role}
        </h1>

        <div className="mt-3 w-full max-w-md -skew-x-[14deg] bg-text-primary px-5 py-2 shadow-[4px_4px_0_var(--bg-void)]">
          <p className="skew-x-[14deg] text-center font-sans text-meta uppercase tracking-[0.12em] text-text-on-accent">
            {config.heroTag}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <SocialIcon href={config.socials.github} label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.22.682-.486 0-.243-.01-1.04-.015-1.89-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .269.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10Z" />
            </svg>
          </SocialIcon>
          <SocialIcon href={mailto} label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 7 9-7" />
            </svg>
          </SocialIcon>
          {config.socials.linkedin ? (
            <SocialIcon href={config.socials.linkedin} label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V23H.22V8.5zM8.34 8.5h4.37v1.98h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7V23h-4.56v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23H8.34V8.5z" />
              </svg>
            </SocialIcon>
          ) : null}
        </div>
      </div>
    </section>
  );
}
