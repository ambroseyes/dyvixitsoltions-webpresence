/**
 * French typographic spacing, applied once when French content is loaded.
 *
 * French sets a non-breaking space before : and inside « », and a narrow
 * non-breaking space before ; ! ?. Without them a question mark can wrap onto
 * its own line. Authors write ordinary spaces; this fixes them centrally so
 * no content file has to contain invisible characters.
 */

const NBSP = " ";
const NNBSP = " ";

/** Keys whose values are identifiers or code, never prose. */
const SKIP_KEYS = new Set(["href", "slug", "code", "id", "url", "src", "email", "phone", "ctaHref"]);

export function frenchTypography(text: string): string {
  return text
    .replace(/ ([;!?])/g, `${NNBSP}$1`)
    .replace(/ :/g, `${NBSP}:`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`)
    .replace(/ %/g, `${NBSP}%`)
    .replace(/(?<=\d) (?=\d{3}(?!\d))/g, NBSP);
}

/** Returns a deep copy with fn applied to every prose string. Never mutates. */
export function mapStrings<T>(value: T, fn: (s: string) => string, key?: string): T {
  if (typeof value === "string") {
    return (key && SKIP_KEYS.has(key) ? value : fn(value)) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => mapStrings(item, fn, key)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, mapStrings(v, fn, k)]),
    ) as T;
  }
  return value;
}
