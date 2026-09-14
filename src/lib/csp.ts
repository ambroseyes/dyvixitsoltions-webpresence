/**
 * Content Security Policy (§36), built once per request by proxy.ts.
 *
 * Next.js inlines the RSC payload as a script on every page, so a policy
 * without 'unsafe-inline' needs a per-request nonce; 'strict-dynamic' lets the
 * nonced bootstrap load its own chunks without every chunk URL being listed.
 */
export function contentSecurityPolicy(
  nonce: string,
  { https, dev }: { https: boolean; dev: boolean },
): string {
  return [
    `default-src 'self'`,
    // 'unsafe-eval' is required by the dev-only React refresh runtime.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ""}`,
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
    /**
     * Only on pages served over HTTPS. On a plain-HTTP page it rewrites every
     * asset request to https://, which breaks the page wherever TLS is not
     * answering: WebKit applies it even to localhost, and a fresh cPanel
     * domain would load without styles or scripts until AutoSSL has issued
     * its certificate. Over HTTPS all assets are same-origin anyway.
     */
    ...(https ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}
