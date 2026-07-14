"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { GlowDisc } from "@/components/hero/GlowDisc";
import { GlitchField } from "@/components/hero/GlitchField";
import { HeroAvatar } from "@/components/hero/HeroAvatar";
import type { SiteConfig } from "@/lib/types";

interface HeroProps {
  config: SiteConfig;
}

function Wordmark({ text }: { text: string }) {
  const parts = text
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <h1 className="relative z-10 w-full max-w-none text-center font-hero text-[clamp(2.5rem,11vw,7.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-text-primary md:text-left">
      {parts.map((part) => (
        <span key={part} className="block whitespace-nowrap">
          {part}
        </span>
      ))}
    </h1>
  );
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
      className="text-text-muted transition-colors duration-300 hover:text-accent-glow"
    >
      {children}
    </a>
  );
}

export function Hero({ config }: HeroProps) {
  const mailto = config.email.startsWith("TODO")
    ? "/#contact"
    : `mailto:${config.email}`;

  return (
    <section
      id="hero"
      className="relative min-h-dvh overflow-hidden bg-bg-void"
    >
      {/* Left accent strip */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-1.5 bg-accent-primary md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-[22vw]"
      />

      {/* Ghost letterforms */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none md:left-[22vw]"
      >
        <span className="absolute left-[6%] top-[14%] font-hero text-[min(22vw,180px)] font-bold leading-none text-text-primary/[0.04]">
          F
        </span>
        <span className="absolute right-[6%] top-[36%] font-hero text-[min(18vw,140px)] font-bold leading-none text-text-primary/[0.035]">
          S
        </span>
        <span className="absolute bottom-[28%] left-[28%] font-hero text-[min(14vw,110px)] font-bold leading-none text-text-primary/[0.03]">
          D
        </span>
      </div>

      <GlitchField />
      <GlowDisc />

      <div className="absolute right-4 top-4 z-30 md:right-8 md:top-8">
        <Button variant="pill" href={config.heroCta.href}>
          {config.heroCta.label}
        </Button>
      </div>

      {/* Wordmark behind avatar — wide, breaks past the figure */}
      <div className="absolute inset-0 z-10 flex items-center px-5 pt-10 md:left-[22vw] md:px-10 md:pt-0 lg:px-16">
        <div className="w-full max-w-[1100px] -translate-y-[8%] md:-translate-y-[4%]">
          <Wordmark text={config.heroHeadline} />
        </div>
      </div>

      <HeroAvatar src={config.heroAvatar} alt={`${config.name} avatar`} />

      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-4 pb-5 md:left-[22vw] md:px-10 md:pb-8">
        <p className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted">
          {config.heroTag}
        </p>
        <div className="flex items-center gap-4">
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
