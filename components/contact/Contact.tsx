import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteConfig } from "@/lib/types";

interface ContactProps {
  config: SiteConfig;
}

export function Contact({ config }: ContactProps) {
  const emailIsTodo = config.email.startsWith("TODO");
  const mailto = emailIsTodo ? undefined : `mailto:${config.email}`;

  return (
    <section
      id="contact"
      className="relative border-t border-border-subtle bg-bg-panel py-20 md:py-36"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
        <SectionHeading className="text-[clamp(2rem,5vw,3.5rem)]">
          {config.closingHeadline}
        </SectionHeading>

        {mailto ? (
          <a
            href={mailto}
            className="mt-8 inline-block break-all font-sans text-[clamp(1.25rem,3vw,2rem)] font-medium text-accent-electric transition-colors duration-300 hover:text-accent-glow md:mt-10"
          >
            {config.email}
          </a>
        ) : (
          <p className="mt-8 break-all font-sans text-[clamp(1.25rem,3vw,2rem)] font-medium text-accent-electric md:mt-10">
            {config.email}
          </p>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 border-t border-border-subtle pt-8 md:mt-16">
          <a
            href={config.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
          >
            GitHub — rrndxx
          </a>
          {config.socials.portfolio ? (
            <a
              href={config.socials.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
            >
              Portfolio
            </a>
          ) : null}
          {config.socials.linkedin ? (
            <a
              href={config.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
            >
              LinkedIn
            </a>
          ) : null}
        </div>

        <p className="mt-6 font-sans text-meta tracking-[0.06em] text-text-muted/80">
          {config.footerNote}
        </p>
      </div>
    </section>
  );
}
