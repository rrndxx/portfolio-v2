import type { ReactNode } from "react";

interface PlaceholderSectionProps {
  id: string;
  title: string;
  children?: ReactNode;
}

/** Temporary shell until the real section is built. */
export function PlaceholderSection({
  id,
  title,
  children,
}: PlaceholderSectionProps) {
  return (
    <section
      id={id}
      className="border-t border-border-subtle px-[8vw] py-24 md:py-36"
    >
      <h2 className="font-display text-h2 uppercase text-text-primary">{title}</h2>
      {children ? (
        <div className="mt-6 max-w-2xl font-sans text-body text-text-secondary">
          {children}
        </div>
      ) : (
        <p className="mt-4 font-sans text-meta uppercase tracking-[0.08em] text-text-muted">
          Section scaffold — next up
        </p>
      )}
    </section>
  );
}
