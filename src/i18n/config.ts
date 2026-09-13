/**
 * Locale configuration and path helpers.
 *
 * Routing model: English is the default and lives at the root (/about);
 * French lives under /fr (/fr/about). Internally every page is rendered from
 * app/[lang]/..., and src/proxy.ts rewrites unprefixed URLs to /en/... so the
 * public English URLs carry no prefix.
 *
 * Paths in content are written locale-agnostic ("/contact?scope=x") and are
 * only turned into public URLs at render time, through localePath().
 */

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const HTML_LANG: Record<Locale, string> = { en: "en", fr: "fr" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Every locale is recognised as a prefix, the default one included: public
 * English URLs carry none, but the internal rewrite target (/en/about) does,
 * and usePathname() can report either — stripping both keeps client-side
 * path logic identical whichever one it sees.
 */
function prefixOf(pathname: string): Locale | null {
  for (const lang of LOCALES) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) return lang;
  }
  return null;
}

/** The locale a public pathname belongs to. */
export function localeFromPathname(pathname: string): Locale {
  return prefixOf(pathname) ?? DEFAULT_LOCALE;
}

/** Locale-agnostic path for a public pathname: "/fr/about" -> "/about". */
export function stripLocale(pathname: string): string {
  const lang = prefixOf(pathname);
  if (!lang) return pathname;
  const rest = pathname.slice(lang.length + 1);
  return rest === "" ? "/" : rest;
}

/**
 * Public href for a locale-agnostic href, preserving query and hash.
 * External and non-path hrefs (mailto:, https:, tel:) pass through unchanged.
 */
export function localePath(lang: Locale, href: string): string {
  if (!href.startsWith("/") || lang === DEFAULT_LOCALE) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);
  return (path === "/" ? `/${lang}` : `/${lang}${path}`) + rest;
}

/** The same page in another locale. */
export function alternatePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocale(pathname));
}
