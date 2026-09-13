import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, localeFromPathname } from "@/i18n/config";

/**
 * Two jobs, both per request.
 *
 * 1. Locale routing. Every page renders from app/[lang]/..., but English — the
 *    default — has no public prefix: /about is rewritten to /en/about, /fr/...
 *    passes through, and a direct request for /en/... is redirected to the
 *    unprefixed URL so each English page has exactly one address. The locale
 *    is forwarded as `x-locale` for the root layout's <html lang>.
 *
 * 2. Nonce-based Content Security Policy (§36). Next.js inlines the RSC
 *    payload as a script on every page, so a policy without 'unsafe-inline'
 *    needs a per-request nonce; Next applies it to its own scripts and the
 *    inline theme script in layout.tsx reads it from `x-nonce`.
 *
 * Trade-off, stated plainly: a per-request nonce means HTML cannot be cached
 * by a CDN and pages render dynamically. These pages do no data fetching, so
 * the render cost is small. 'strict-dynamic' lets the nonced Next bootstrap
 * load its own chunks without every chunk URL being enumerated.
 */
function contentSecurityPolicy(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";
  return [
    `default-src 'self'`,
    // 'unsafe-eval' is required by the dev-only React refresh runtime.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ""}`,
    // Tailwind and next/font emit inline style; no style hash is stable here.
    `style-src 'self' 'unsafe-inline'`,
    // Fonts are self-hosted by next/font — no third-party font origin needed.
    `font-src 'self'`,
    `img-src 'self' blob: data:`,
    `connect-src 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `upgrade-insecure-requests`,
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const internalPrefix = `/${DEFAULT_LOCALE}`;

  if (pathname === internalPrefix || pathname.startsWith(`${internalPrefix}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(internalPrefix.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const lang = localeFromPathname(pathname);
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-locale", lang);

  let response: NextResponse;
  if (lang === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = `${internalPrefix}${pathname === "/" ? "" : pathname}`;
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } });
  }

  response.headers.set("Content-Security-Policy", contentSecurityPolicy(nonce));
  return response;
}

export const config = {
  matcher: [
    // Pages only. API routes, Next internals, generated metadata files and
    // static assets are neither localised nor HTML, so they skip both jobs.
    // Router prefetches are deliberately NOT skipped: they must be rewritten
    // like any other request, or every English prefetch would miss.
    "/((?!api/|_next/static|_next/image|opengraph-image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|txt|xml)$).*)",
  ],
};
