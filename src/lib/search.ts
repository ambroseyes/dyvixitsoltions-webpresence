/**
 * Client-safe search primitives.
 *
 * The index itself is built on the server (lib/search-index.ts) and fetched on
 * first use: importing content here would put every page's copy into the
 * client bundle to serve the few visitors who open the palette.
 */

export type SearchGroup =
  "expertise" | "solutions" | "industries" | "insights" | "actions" | "pages";

export type SearchEntry = {
  label: string;
  /** Public, localised href. */
  href: string;
  group: SearchGroup;
  /** Pre-normalised haystack. Never rendered. */
  keywords: string;
};

/** Combining diacritical marks, left behind by NFD decomposition. */
const DIACRITICS = /[\u0300-\u036f]/g;
/** No-break and narrow no-break spaces, inserted by French typography. */
const NBSP = /[\u00a0\u202f]/g;

/**
 * Lowercase and accent-free, with typeset spaces folded to plain ones — so
 * "securite" finds "sécurité" and a typed space matches a typeset one.
 */
export function normalizeText(value: string): string {
  return value.normalize("NFD").replace(DIACRITICS, "").replace(NBSP, " ").toLowerCase();
}

/**
 * Substring match on the normalised haystack. Empty query returns everything.
 *
 * Groups keep their index order, so the palette's group headings never
 * repeat; within a group, an entry whose label matches outranks one that only
 * matches in its keywords. Without that, "sécurité" surfaced the cloud domain
 * — which mentions security checks — above the security domain itself.
 */
export function searchIndex(index: SearchEntry[], query: string): SearchEntry[] {
  const q = normalizeText(query.trim());
  if (!q) return index;

  const groupStart = new Map<SearchGroup, number>();
  index.forEach((e, i) => {
    if (!groupStart.has(e.group)) groupStart.set(e.group, i);
  });

  return index
    .map((entry, position) => ({
      entry,
      position,
      inLabel: normalizeText(entry.label).includes(q),
    }))
    .filter((hit) => hit.inLabel || hit.entry.keywords.includes(q))
    .sort(
      (a, b) =>
        groupStart.get(a.entry.group)! - groupStart.get(b.entry.group)! ||
        Number(b.inLabel) - Number(a.inLabel) ||
        a.position - b.position,
    )
    .map((hit) => hit.entry);
}
