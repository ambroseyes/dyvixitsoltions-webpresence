import type { ProductSlug } from "@/content/types";
import { ACCENT, Glyph } from "./Glyph";

/**
 * One drawing per platform, kept as abstract as the claims on the page: a
 * shape for what the product does, never a mock screenshot of a product a
 * visitor cannot yet see.
 */
export const PRODUCT_GLYPHS: Record<ProductSlug, () => React.ReactElement> = {
  /** Services stacked behind one door: the back end as a single entry point. */
  "back-node": () => (
    <Glyph>
      <rect x="11" y="13" width="26" height="7" opacity="0.5" />
      <rect x="11" y="23" width="26" height="7" opacity="0.7" />
      <rect x="11" y="33" width="26" height="7" />
      <path
        d="M24 9v6"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:-translate-y-[2px]`}
      />
      <circle cx="33" cy="36.5" r="1.4" {...ACCENT} />
    </Glyph>
  ),

  /** Places in a week, filled one by one: a nursery's day, booked. */
  sacrecheici: () => (
    <Glyph>
      <rect x="10" y="12" width="28" height="24" opacity="0.6" />
      <path d="M10 19h28" opacity="0.6" />
      <path d="M17 12v-3M31 12v-3" opacity="0.6" />
      <rect x="14" y="23" width="6" height="5" opacity="0.45" />
      <rect
        x="22"
        y="23"
        width="6"
        height="5"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:scale-110`}
      />
      <rect x="30" y="23" width="4" height="5" opacity="0.45" />
    </Glyph>
  ),

  /** A page read into structure: lines of text becoming facts. */
  "lexora-ai": () => (
    <Glyph>
      <path d="M14 10h14l6 6v22H14z" opacity="0.6" />
      <path d="M28 10v6h6" opacity="0.6" />
      <path d="M18 22h8M18 27h12" opacity="0.5" />
      <path
        d="M18 32h6"
        {...ACCENT}
        className={`${ACCENT.className} group-hover:translate-x-[3px]`}
      />
      <circle cx="31" cy="32" r="1.6" {...ACCENT} />
    </Glyph>
  ),

  /** A shield under a sweep: watching, then deciding. */
  aegis: () => (
    <Glyph>
      <path d="M24 9l12 4.5v9c0 8.5-5 13.5-12 16.5-7-3-12-8-12-16.5v-9z" opacity="0.75" />
      <path d="M24 16v14" opacity="0.4" />
      <path
        d="M24 23l9-5"
        {...ACCENT}
        className={`${ACCENT.className} origin-[24px_23px] -rotate-[55deg] group-hover:rotate-0`}
      />
      <circle cx="24" cy="23" r="1.5" {...ACCENT} />
    </Glyph>
  ),
};
