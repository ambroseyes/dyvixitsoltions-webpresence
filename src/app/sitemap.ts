import type { MetadataRoute } from "next";

import { DEFAULT_LOCALE, LOCALES, localePath } from "@/i18n/config";
import { EXPERTISE_SLUGS } from "@/content/expertise";
import { INDUSTRY_SLUGS } from "@/content/industries";
import { getArticles } from "@/content/insights";
import { getProducts, hasDetailPage } from "@/content/products";
import { site } from "@/lib/site";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

const url = (lang: (typeof LOCALES)[number], path: string) => `${site.url}${localePath(lang, path)}`;

/**
 * One entry per page per locale, each carrying the full hreflang set — the
 * sitemap-side mirror of the <link rel="alternate"> tags on every page.
 */
function entries(path: string, priority: number, changeFrequency: Freq, lastModified: Date): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(LOCALES.map((l) => [l, url(l, path)])),
    "x-default": url(DEFAULT_LOCALE, path),
  };
  return LOCALES.map((lang) => ({
    url: url(lang, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

/**
 * Generated from content, not hand-maintained — a new domain, product, sector
 * or article is in the sitemap the moment it exists. A hand-written sitemap
 * drifts, and a drifted sitemap is a crawlability defect (§72).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: [string, number, Freq][] = [
    ["/", 1, "weekly"],
    ["/expertise", 0.9, "monthly"],
    ["/solutions", 0.8, "monthly"],
    ["/projects", 0.7, "monthly"],
    ["/industries", 0.8, "monthly"],
    ["/insights", 0.7, "weekly"],
    ["/about", 0.9, "monthly"],
    ["/contact", 0.8, "yearly"],
    ["/request-audit", 0.8, "yearly"],
    ["/privacy", 0.2, "yearly"],
    ["/legal", 0.2, "yearly"],
  ];

  return [
    ...staticRoutes.flatMap(([path, priority, freq]) => entries(path, priority, freq, now)),
    ...EXPERTISE_SLUGS.flatMap((slug) => entries(`/expertise/${slug}`, 0.85, "monthly", now)),
    ...getProducts(DEFAULT_LOCALE)
      .filter(hasDetailPage)
      .flatMap((p) => entries(`/solutions/${p.slug}`, 0.75, "monthly", now)),
    ...INDUSTRY_SLUGS.flatMap((slug) => entries(`/industries/${slug}`, 0.7, "monthly", now)),
    ...getArticles(DEFAULT_LOCALE).flatMap((a) =>
      entries(`/insights/${a.slug}`, 0.6, "yearly", new Date(a.updated ?? a.published)),
    ),
  ];
}
