import type { Metadata } from "next";
import { site } from "./site";

const BASE = site.url;

type PageMetaInput = {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/solutions/cybersecurity". */
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

/**
 * Builds page metadata with a canonical URL, OG and X cards.
 * Every page must call this — a page without a canonical is a GEO defect
 * (§72), not a cosmetic omission.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  authors,
}: PageMetaInput): Metadata {
  const url = `${BASE}${path}`;
  const fullTitle = path === "/" ? title : `${title} — ${site.legalName}`;

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        fr: `${BASE}/fr${path === "/" ? "" : path}`,
        "x-default": url,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.legalName,
      locale: "en",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
      images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: site.legalName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: "@d_yvix",
      images: [`${BASE}/opengraph-image`],
    },
  };
}

export const absoluteUrl = (path: string) => `${BASE}${path}`;
