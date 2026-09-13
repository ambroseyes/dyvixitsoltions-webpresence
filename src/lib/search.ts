/**
 * Client-safe search primitives.
 *
 * The index itself is built on the server (lib/search-index.ts) and fetched on
 * first use: importing content here would put every page's copy into the
 * client bundle to serve the few visitors who open the palette.
 */

export type SearchGroup = "expertise" | "solutions" | "industries" | "insights" | "actions" | "pages";

export type SearchEntry = {
  label: string;
  /** Public, localised href. */
  href: string;
  group: SearchGroup;
  /** Pre-normalised haystack. Never rendered. */
  keywords: string;
};

/** Combining diacritical marks, left behind by NFD decomposition. */
const DIACRITICS = /[̀-ͯ]/g;
/** No-break and narrow no-break spaces, inserted by French typography. */
const NBSP = /[  ]/g;

/**
 * Lowercase and accent-free, with typeset spaces folded to plain ones — so
 * "securite" finds "sécurité" and a typed space matches a typeset one.
 */
export function normalizeText(value: string): string {
  return value.normalize("NFD").replace(DIACRITICS, "").replace(NBSP, " ").toLowerCase();
}

/** Substring match on the normalised haystack. Empty query returns everything. */
export function searchIndex(index: SearchEntry[], query: string): SearchEntry[] {
  const q = normalizeText(query.trim());
  if (!q) return index;
  return index.filter((e) => e.keywords.includes(q) || normalizeText(e.label).includes(q));
}
