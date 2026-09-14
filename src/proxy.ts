import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, localeFromPathname } from "@/i18n/config";
import { contentSecurityPolicy } from "@/lib/csp";

/**
 * Two jobs, both per request.
 *
 * 1. Locale. Every page renders from app/[lang]/...; English, the default,
 *    has no public prefix, and next.config.ts rewrites /about onto /en/about.
 *    This proxy forwards the locale as `x-locale` for the root layout's
 *    <html lang>, and redirects a direct request for /en/... to the public
 *    URL so each English page has exactly one address.
 *
 *    It never rewrites. A proxy rewrite is an absolute URL, and on a server
 *    bound to a loopback address Next mistakes it for an external one — see
 *    the note on rewrites() in next.config.ts and proxy.test.ts.
 *
 * 2. Nonce-based Content Security Policy — see lib/csp.ts. The inline theme
 *    script in layout.tsx reads the nonce from `x-nonce`.
 *
 * Trade-off, stated plainly: a per-request nonce means HTML cannot be cached
 * by a CDN and pages render dynamically. These pages do no data fetching, so
 * the render cost is small.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const internalPrefix = `/${DEFAULT_LOCALE}`;

  if (pathname === internalPrefix || pathname.startsWith(`${internalPrefix}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(internalPrefix.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-locale", localeFromPathname(pathname));

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicy(nonce, {
      https: request.nextUrl.protocol === "https:",
      dev: process.env.NODE_ENV === "development",
    }),
  );
  return response;
}

export const config = {
  matcher: [
    // Pages only. API routes, Next internals, generated metadata files and
    // static assets are neither localised nor HTML, so they skip both jobs.
    // Router prefetches are deliberately NOT skipped: their payloads must
    // carry the same locale as the page they prefetch.
    "/((?!api/|_next/static|_next/image|opengraph-image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|txt|xml)$).*)",
  ],
};
