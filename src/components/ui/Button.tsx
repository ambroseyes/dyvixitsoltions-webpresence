import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-(--radius-sm) " +
  "font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] " +
  "duration-(--duration-fast) ease-(--ease-out-expo) " +
  "disabled:pointer-events-none disabled:opacity-45 active:translate-y-px " +
  // Touch target floor (§40): never below 44px of hit area.
  "min-h-11";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-surface border border-primary hover:bg-ink hover:border-ink " +
    "dark:text-surface dark:hover:bg-ink-inverse dark:hover:text-surface",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-primary hover:text-primary",
  ghost:
    "border border-transparent bg-transparent text-ink-muted hover:text-primary hover:border-line",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-(length:--text-sm)",
  md: "px-5 py-2.5 text-(length:--text-sm)",
  lg: "px-7 py-3.5 text-(length:--text-base)",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string; external?: boolean };
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
