import type { HTMLAttributes, ReactNode } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: "default" | "accent";
}

export function Tag({
  children,
  tone = "default",
  className = "",
  ...props
}: TagProps) {
  const toneClasses =
    tone === "accent"
      ? "bg-accent-primary/20 text-accent-glow border-accent-primary/40"
      : "bg-bg-panel-raised text-text-secondary border-border-subtle hover:text-accent-electric";

  return (
    <span
      className={[
        "inline-block border px-3 py-1.5 font-sans text-meta uppercase tracking-[0.08em] rounded",
        "transition-colors duration-300",
        toneClasses,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
