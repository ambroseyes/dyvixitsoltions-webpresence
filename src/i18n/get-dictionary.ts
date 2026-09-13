import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import { frenchTypography, mapStrings } from "./typography";

export type { Dictionary };

/**
 * Both dictionaries are small and loaded eagerly. French typography is
 * applied once here, at module load, rather than on every render.
 */
const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  fr: mapStrings(fr, frenchTypography),
};

export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang];
}
