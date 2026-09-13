import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALE, localePath, type Locale } from "@/i18n/config";
import { site } from "./site";

const BASE = site.url;

/** Absolute URL for a public (already localised) path. */
export const absoluteUrl = (path: string) => `${BASE}${path}`;

type PageMetaInput = {
  lang: Locale;
  title: string;
  description: string;
  /** Locale-agnostic path, e.g. "/expertise/cybersecurity". */
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  /** Skip the "— D’Yvix IT Solutions" title template (the homepage). */
  absoluteTitle?: boolean;
};

/**
 * Page metadata: canonical, hreflang alternates for every locale plus
 * x-default, and OG/X cards in the page's own locale.
 *
 * Every page must call this — a page without a canonical, or with alternates
 * that do not point back at each other, is a GEO defect (§72), not a
 * cosmetic omission.
 */
export function pageMeta({
  lang,
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  authors,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(localePath(lang, path));
  const fullTitle = absoluteTitle ? title : `${title} — ${site.legalName}`;
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, absoluteUrl(localePath(l, path))]),
  ) as Record<Locale, string>;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": languages[DEFAULT_LOCALE] },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.legalName,
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
      images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: site.legalName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: site.twitterHandle,
      images: [`${BASE}/opengraph-image`],
    },
  };
}
