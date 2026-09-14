import type { Locale } from "./config";

const DATE_LOCALE: Record<Locale, string> = { en: "en-GB", fr: "fr-FR" };

/**
 * Formats an ISO date (YYYY-MM-DD) for display. Pinned to UTC: a bare date
 * parses as UTC midnight, and formatting it in a server timezone west of
 * Greenwich would print the day before.
 */
export function formatDate(lang: Locale, iso: string, month: "long" | "short" = "long"): string {
  return new Date(iso).toLocaleDateString(DATE_LOCALE[lang], {
    day: "2-digit",
    month,
    year: "numeric",
    timeZone: "UTC",
  });
}
