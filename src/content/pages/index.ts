import type { Locale } from "@/i18n/config";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import type { PagesContent } from "../types";
import { pagesEn } from "./en";
import { pagesFr } from "./fr";

const TEXT: Record<Locale, PagesContent> = {
  en: pagesEn,
  fr: mapStrings(pagesFr, frenchTypography),
};

export function getPages(lang: Locale): PagesContent {
  return TEXT[lang];
}
