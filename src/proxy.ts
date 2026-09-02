import { NextResponse, type NextRequest } from "next/server";

/**
 * Nonce-based Content Security Policy (§36).
 *
 * Next.js inlines the RSC payload as a script on every page, so a policy
 * without 'unsafe-inline' requires a per-request nonce. Next picks the nonce
 * up from this header automatically and applies it to its own scripts; the
 * inline theme script in layout.tsx reads it from `x-nonce`.
 *
 * Trade-off, stated plainly: a per-request nonce means the HTML cannot be
 * cached by a CDN and pages render dynamically. These pages do no data
 * fetching, so the render cost is small. If HTML caching matters more than a
 * nonce policy for a given deployment, remove this file and move a
 * hash-based CSP into next.config.ts instead.
 *
 * 'strict-dynamic' lets the nonced Next bootstrap load its own chunks without
 * every chunk URL needing to be enumerated.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
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
  ]
    .filter(Boolean)
    .join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    // Skip static assets and prefetches — they need no policy and the
    // per-request work would be wasted.
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|txt|xml)$).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
