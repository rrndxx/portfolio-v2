import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-text-on-accent hover:bg-accent-glow hover:text-text-on-accent",
  ghost:
    "bg-transparent text-text-primary border border-border-subtle hover:border-accent-electric hover:text-accent-electric",
  pill:
    "rounded-full bg-bg-panel-raised text-text-primary hover:bg-accent-primary hover:text-text-on-accent",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 px-5 py-2.5",
    "font-sans text-meta uppercase tracking-[0.08em]",
    "transition-colors duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-glow",
    variant === "pill" ? "rounded-full" : "rounded-md",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
