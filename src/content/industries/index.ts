import type { Locale } from "@/i18n/config";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import type { Industry, IndustrySlug, IndustryText } from "../types";
import { INDUSTRY_BASE } from "./base";
import { industriesEn } from "./en";
import { industriesFr } from "./fr";

const TEXT: Record<Locale, Record<IndustrySlug, IndustryText>> = {
  en: industriesEn,
  fr: mapStrings(industriesFr, frenchTypography),
};

const BUILT: Record<Locale, Industry[]> = {
  en: INDUSTRY_BASE.map((b) => ({ ...b, ...TEXT.en[b.slug] })),
  fr: INDUSTRY_BASE.map((b) => ({ ...b, ...TEXT.fr[b.slug] })),
};

export const INDUSTRY_SLUGS: IndustrySlug[] = INDUSTRY_BASE.map((b) => b.slug);

export function getIndustries(lang: Locale): Industry[] {
  return BUILT[lang];
}

export function getIndustryBySlug(lang: Locale, slug: string): Industry | undefined {
  return BUILT[lang].find((i) => i.slug === slug);
}
