import type { Locale } from "@/i18n/config";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import type { Article, ArticleSlug, ArticleText } from "../types";
import { ARTICLE_BASE } from "./base";
import { articlesEn } from "./en";
import { articlesFr } from "./fr";

/**
 * Code blocks are exempt from French typography: they are copied into
 * terminals, where a narrow no-break space is a bug, not a nicety.
 */
const TEXT: Record<Locale, Record<ArticleSlug, ArticleText>> = {
  en: articlesEn,
  fr: mapStrings(articlesFr, frenchTypography),
};

const BUILT: Record<Locale, Article[]> = {
  en: ARTICLE_BASE.map((b) => ({ ...b, ...TEXT.en[b.slug] })),
  fr: ARTICLE_BASE.map((b) => ({ ...b, ...TEXT.fr[b.slug] })),
};

export const ARTICLE_SLUGS: ArticleSlug[] = ARTICLE_BASE.map((b) => b.slug);

export function getArticles(lang: Locale): Article[] {
  return BUILT[lang];
}

export function getArticleBySlug(lang: Locale, slug: string): Article | undefined {
  return BUILT[lang].find((a) => a.slug === slug);
}
