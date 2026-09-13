import type { Locale } from "@/i18n/config";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import type { Expertise, ExpertiseSlug, ExpertiseText } from "../types";
import { EXPERTISE_BASE } from "./base";
import { expertiseEn } from "./en";
import { expertiseFr } from "./fr";

const TEXT: Record<Locale, Record<ExpertiseSlug, ExpertiseText>> = {
  en: expertiseEn,
  fr: mapStrings(expertiseFr, frenchTypography),
};

/** Merged once per locale at module load; callers get the same arrays. */
const BUILT: Record<Locale, Expertise[]> = {
  en: EXPERTISE_BASE.map((b) => ({ ...b, ...TEXT.en[b.slug] })),
  fr: EXPERTISE_BASE.map((b) => ({ ...b, ...TEXT.fr[b.slug] })),
};

export const EXPERTISE_SLUGS: ExpertiseSlug[] = EXPERTISE_BASE.map((b) => b.slug);

export function getExpertise(lang: Locale): Expertise[] {
  return BUILT[lang];
}

export function getExpertiseBySlug(lang: Locale, slug: string): Expertise | undefined {
  return BUILT[lang].find((e) => e.slug === slug);
}
