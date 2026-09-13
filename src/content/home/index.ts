import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import { site, yearsInOperation } from "@/lib/site";
import { getCompany } from "../company";
import type { HomeContent } from "../types";
import { homeEn } from "./en";
import { homeFr } from "./fr";

const TEXT: Record<Locale, HomeContent> = {
  en: homeEn,
  fr: mapStrings(homeFr, frenchTypography),
};

/**
 * Answers are templated so the entity statement, contact details and the
 * company’s age are never retyped. Values are inserted after typography, so
 * the phone number keeps its own spacing.
 */
export function getHome(lang: Locale): HomeContent {
  const text = TEXT[lang];
  const vars = {
    entity: getCompany(lang).entityStatement,
    years: yearsInOperation(),
    email: site.contact.email,
    phone: site.contact.phoneDisplay,
  };
  return { ...text, answers: text.answers.map((f) => ({ q: f.q, a: format(f.a, vars) })) };
}
