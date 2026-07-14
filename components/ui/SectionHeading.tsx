import type { HTMLAttributes, ReactNode } from "react";

interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: "h2" | "h3";
  stacked?: boolean;
}

export function SectionHeading({
  children,
  as: TagName = "h2",
  stacked = false,
  className = "",
  ...props
}: SectionHeadingProps) {
  return (
    <div className="inline-flex flex-col items-start gap-3">
      <span
        aria-hidden
        className="slant-chip glitch-texture h-2 w-16 opacity-80"
      />
      <TagName
        className={[
          "font-display text-h2 uppercase text-text-primary",
          stacked ? "leading-[0.9] tracking-tight" : "tracking-tight",
          className,
        ].join(" ")}
        {...props}
      >
        {children}
        <span className="text-accent-glow">_</span>
      </TagName>
    </div>
  );
}
