import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Surface card carrying the registration-bracket device.
 *
 * Hover raises the surface and extends the brackets — the elevation is done
 * with background and border colour rather than a box-shadow ramp, which
 * keeps both themes legible without a second shadow palette.
 */
export function Card({
  children,
  className,
  href,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  interactive?: boolean;
}) {
  const classes = cn(
    "brackets relative block border border-line bg-surface-raised",
    "transition-colors duration-(--duration-normal) ease-(--ease-out-expo)",
    (interactive || href) &&
      "hover:border-line-strong hover:bg-surface focus-within:border-line-strong",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
