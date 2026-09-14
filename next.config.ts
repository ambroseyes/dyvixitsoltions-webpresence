import type { NextConfig } from "next";

/**
 * Security headers (§36).
 *
 * CSP is NOT set here — it needs a per-request nonce and is emitted by
 * src/proxy.ts (built by src/lib/csp.ts). Everything below is
 * request-independent, so it belongs in static headers where it costs nothing.
 */
const securityHeaders = [
  // Two years, subdomains included, preload-eligible.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Redundant with frame-ancestors in CSP, retained for older agents.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/**
 * The bare domain is canonical. site.url in src/lib/site.ts drives links and
 * metadata; src/i18n/redirects.test.ts fails if the two drift apart.
 */
const CANONICAL_HOST = "dyvixitsolutions.com";

const nextConfig: NextConfig = {
  // The home directory contains a stray package.json; without this Turbopack
  // walks up and tries to root the workspace at ~. Pin it to the project.
  turbopack: { root: __dirname },

  /**
   * Self-contained server for hosts with plain Node.js and no Next-aware
   * platform (cPanel with Passenger, a VPS, Docker): `.next/standalone`
   * holds `server.js` plus only the traced dependencies, so the host needs
   * no `npm install` at runtime. scripts/copy-standalone-assets.mjs adds
   * the static files after every build.
   */
  output: "standalone",
  // Same reason as turbopack.root: trace from the project, not from ~,
  // or the standalone folder nests the whole home-directory path.
  outputFileTracingRoot: __dirname,

  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * English, the default locale, has no URL prefix: /about is served by
   * app/[lang]/about with lang=en.
   *
   * This is a config rewrite, deliberately not a proxy one. A proxy rewrite
   * is an absolute URL, which Next compares with an origin built from the
   * server's bind address — while NextURL normalises loopback hosts to
   * "localhost". On a server bound to 127.0.0.1 the two differ, Next proxies
   * the rewrite as an external request, and /en is redirected back to /: an
   * infinite loop. Config rewrites are resolved internally.
   *
   * afterFiles, so static files, metadata files and fixed routes (icons,
   * sitemap, /api/contact) match first; before dynamic routes, so [lang]
   * cannot swallow "/about" as a locale. /fr, /en (redirected by proxy.ts),
   * /api and /_next are excluded. Keep "fr" in step with LOCALES in
   * src/i18n/config.ts — src/i18n/rewrites.test.ts fails if they drift.
   */
  async rewrites() {
    const notReserved = "(?!(?:fr|en|api|_next)(?:/|$))";
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/en" },
        { source: `/:first(${notReserved}[^/]+)/:rest*`, destination: "/en/:first/:rest*" },
      ],
      fallback: [],
    };
  },

  /**
   * Permanent (308) redirects, checked before proxy.ts and the rewrites.
   *
   * www has no pages of its own: every address moves to the bare domain,
   * path and query intact, so links and search results converge on one URL.
   * HTTP → HTTPS is left to the host (cPanel "Force HTTPS Redirect"), which
   * sees the scheme before Node does.
   *
   * The previous site, a French single-page app, had /service/:id, /news and
   * a /politics link. Those addresses live on in bookmarks and search
   * results; each lands on the closest French page.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      { source: "/service/:id", destination: "/fr/expertise", permanent: true },
      { source: "/news", destination: "/fr/insights", permanent: true },
      { source: "/politics", destination: "/fr/privacy", permanent: true },
    ];
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
