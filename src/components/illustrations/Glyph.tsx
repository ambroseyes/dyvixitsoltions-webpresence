import { cn } from "@/lib/utils";

/**
 * The frame every service glyph is drawn in.
 *
 * A 48-unit square in the vocabulary of the rest of the sheet: hairline
 * strokes, registration brackets at the corners, the brand green reserved
 * for the one element that carries the idea. Strokes inherit currentColor,
 * so a card tints its glyph by setting a text colour.
 *
 * Decorative by definition — every card states its name in text — so the
 * whole drawing is hidden from assistive technology (§73).
 */
export function Glyph({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn(
        "size-12 text-ink-faint transition-colors duration-(--duration-normal) ease-(--ease-out-expo) group-hover:text-ink-muted group-focus-visible:text-ink-muted",
        className,
      )}
    >
      <g opacity="0.4">
        <path d="M1.5 6.5v-5h5" />
        <path d="M41.5 1.5h5v5" />
        <path d="M46.5 41.5v5h-5" />
        <path d="M6.5 46.5h-5v-5" />
      </g>
      {children}
    </svg>
  );
}

/** The one element that carries the idea: brand green, lifted on hover. */
export const ACCENT = {
  "data-accent": "",
  stroke: "var(--c-primary)",
  className:
    "opacity-65 transition-all duration-(--duration-normal) ease-(--ease-out-expo) group-hover:opacity-100 group-focus-visible:opacity-100",
} as const;
