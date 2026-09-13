import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

/**
 * Resolves the [lang] route segment. Anything that is not a supported locale
 * is a 404 — dynamicParams is false, so this is a second line of defence.
 */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
