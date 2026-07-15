import { ContactForm } from "@/components/contact/ContactForm";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { SiteConfig } from "@/lib/types";

interface ContactProps {
  config: SiteConfig;
}

export function Contact({ config }: ContactProps) {
  const hasEmail = Boolean(config.email) && !config.email.startsWith("TODO");
  const mailto = hasEmail ? `mailto:${config.email}` : undefined;

  return (
    <SectionShell
      id="contact"
      className="bg-bg-panel pb-20 md:pb-36"
      cut="blade-right"
      blendFrom="void"
      zIndex={7}
      style={{ ["--section-pad-y" as string]: "6rem" }}
    >
      <SectionAtmosphere variant="contact" />

      <div className="relative z-[1] mx-auto max-w-5xl px-6 md:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-16">
          <div className="md:pt-2">
            <SectionHeading className="text-left text-[clamp(2rem,4.5vw,3.25rem)]">
              {config.closingHeadline}
            </SectionHeading>

            {mailto ? (
              <a
                href={mailto}
                className="mt-6 inline-block break-all font-sans text-[clamp(1.05rem,2.2vw,1.45rem)] font-medium text-accent-electric transition-colors duration-300 hover:text-accent-glow md:mt-8"
              >
                {config.email}
              </a>
            ) : null}

            <div className="relative mt-10 pt-6 md:mt-12">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-border-subtle via-border-subtle to-transparent"
              />
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <a
                  href={config.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
                >
                  GitHub — rrndxx
                </a>
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
                {config.socials.facebook ? (
                  <a
                    href={config.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
                  >
                    Facebook
                  </a>
                ) : null}
                {config.socials.instagram ? (
                  <a
                    href={config.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-meta uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-accent-glow"
                  >
                    Instagram
                  </a>
                ) : null}
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
              </div>
            </div>

            <p className="mt-8 font-sans text-meta tracking-[0.06em] text-text-muted/80">
              {config.footerNote}
            </p>
          </div>

          <ContactForm copy={config.contactForm} />
        </div>
      </div>
    </SectionShell>
  );
}
