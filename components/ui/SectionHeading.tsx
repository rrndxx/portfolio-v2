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
    <TagName
      className={[
        "font-display text-h2 uppercase text-text-primary",
        stacked ? "leading-[0.9] tracking-tight" : "tracking-tight",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </TagName>
  );
}
