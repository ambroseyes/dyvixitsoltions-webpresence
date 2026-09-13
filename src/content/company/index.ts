import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import { yearsInOperation } from "@/lib/site";
import type { CompanyContent } from "../types";
import { companyEn } from "./en";
import { companyFr } from "./fr";

const TEXT: Record<Locale, CompanyContent> = {
  en: companyEn,
  fr: mapStrings(companyFr, frenchTypography),
};

/** Fills `{years}` so the founder bio and trust figure never go stale. */
export function getCompany(lang: Locale): CompanyContent {
  const text = TEXT[lang];
  const years = yearsInOperation();
  return {
    ...text,
    founder: { ...text.founder, bio: format(text.founder.bio, { years }) },
    trust: text.trust.map((t) => ({ ...t, value: format(t.value, { years }) })),
  };
}
