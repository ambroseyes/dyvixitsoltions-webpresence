import type { NextConfig } from "next";

/**
 * Security headers (§36).
 *
 * CSP is NOT set here — it needs a per-request nonce and is emitted by
 * middleware.ts. Everything below is request-independent, so it belongs in
 * static headers where it costs nothing.
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

const nextConfig: NextConfig = {
  // The home directory contains a stray package.json; without this Turbopack
  // walks up and tries to root the workspace at ~. Pin it to the project.
  turbopack: { root: __dirname },

  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
