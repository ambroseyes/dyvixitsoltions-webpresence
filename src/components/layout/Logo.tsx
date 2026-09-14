import Link from "next/link";

/**
 * Wordmark + mark.
 *
 * The mark is a simplified reconstruction of the D’Yvix logo: the upright
 * stem of the Y, with the two slanted bars — green above, red below — and the
 * small chevron that opens the composition. Drawn rather than shipped as an
 * image so it stays crisp at any size and both brand colours are token-driven.
 *
 * Fine detail from the full logo (the hairline inside the red bar, the exact
 * hook of the stem) is dropped deliberately: it disappears below ~40px and
 * only muddies the silhouette in a 26px header.
 */
export function Logo({
  href,
  label,
  className,
}: {
  /** Localised home href. */
  href: string;
  /** Accessible name, e.g. "D’Yvix IT Solutions — Home". */
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
      aria-label={label}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Upright stem of the Y */}
        <rect x="18.1" y="1" width="3.5" height="24" className="fill-brand" />

        {/* Upper arm — brand green */}
        <path
          d="M1.4 12.6 L17.2 5.4 L17.2 9.6 L1.4 16.8 Z"
          className="fill-brand transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:-translate-y-px"
        />

        {/* Lower arm — brand red */}
        <path
          d="M1.4 20.2 L15.4 13.8 L15.4 18 L1.4 24.4 Z"
          className="fill-signal transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-y-px"
        />

        {/* Opening chevron */}
        <path d="M4.6 1.4 L11.6 5 L4.6 8.6 Z" className="fill-brand" />
      </svg>

      <span className="font-display text-(length:--text-h4) leading-none font-bold tracking-[-0.015em]">
        D<span className="text-brand">’</span>Yvix
      </span>
    </Link>
  );
}
