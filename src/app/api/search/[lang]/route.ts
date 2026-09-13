import { NextResponse } from "next/server";

import { LOCALES, isLocale } from "@/i18n/config";
import { buildSearchIndex } from "@/lib/search-index";

/**
 * Command-palette index, one JSON document per locale, generated at build.
 *
 * Static, so there is nothing to rate-limit: the response is a file, not a
 * computation. Fetched only when a visitor first opens the palette.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return NextResponse.json({ success: false, data: null, error: "Unknown locale" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: buildSearchIndex(lang), error: null });
}
