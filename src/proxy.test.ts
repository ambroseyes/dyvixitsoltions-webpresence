// @vitest-environment node
import { describe, expect, test } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

const run = (url: string) => proxy(new NextRequest(url));

describe("proxy: locale", () => {
  /**
   * Regression guard. The proxy used to rewrite /about to /en/about itself.
   * NextURL normalises 127.0.0.1 to localhost, so on a server bound to a
   * loopback address that absolute rewrite no longer matched the server's own
   * origin: Next proxied it as an external request, the proxied /en was
   * redirected back to /, and the English homepage looped on 308. The rewrite
   * now lives in next.config.ts (see src/i18n/rewrites.test.ts), and the proxy
   * must never emit one.
   */
  test.each([
    "https://dyvixitsolutions.com/",
    "https://dyvixitsolutions.com/about",
    "http://127.0.0.1:3100/",
    "https://dyvixitsolutions.com/fr/about",
  ])("never rewrites %s", (url) => {
    const res = run(url);
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  test.each([
    ["https://dyvixitsolutions.com/", "en"],
    ["https://dyvixitsolutions.com/about", "en"],
    ["https://dyvixitsolutions.com/english", "en"],
    ["https://dyvixitsolutions.com/fr", "fr"],
    ["https://dyvixitsolutions.com/fr/about", "fr"],
  ])("forwards the locale of %s as %s", (url, lang) => {
    expect(run(url).headers.get("x-middleware-request-x-locale")).toBe(lang);
  });

  test.each([
    ["/en", "/", ""],
    ["/en/about", "/about", ""],
    ["/en/contact?scope=ai-data", "/contact", "?scope=ai-data"],
  ])("redirects %s permanently to %s, query intact", (from, path, search) => {
    const res = run(`https://dyvixitsolutions.com${from}`);
    expect(res.status).toBe(308);
    const location = new URL(res.headers.get("location")!);
    expect(location.origin).toBe("https://dyvixitsolutions.com");
    expect(location.pathname).toBe(path);
    expect(location.search).toBe(search);
  });

  test("does not mistake a path that merely starts with 'en' for the prefix", () => {
    expect(run("https://dyvixitsolutions.com/english").status).not.toBe(308);
  });
});

describe("proxy: content security policy", () => {
  const scriptSrc = (csp: string) => csp.split("; ").find((d) => d.startsWith("script-src")) ?? "";

  test("sets a nonce policy and forwards the same nonce to the app", () => {
    const res = run("https://dyvixitsolutions.com/");
    const csp = res.headers.get("content-security-policy")!;
    const nonce = res.headers.get("x-middleware-request-x-nonce")!;
    expect(nonce).toBeTruthy();
    expect(scriptSrc(csp)).toContain(`'nonce-${nonce}'`);
    expect(scriptSrc(csp)).not.toContain("'unsafe-inline'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  test("applies the policy to French pages too", () => {
    expect(run("https://dyvixitsolutions.com/fr").headers.get("content-security-policy")).toContain(
      "nonce-",
    );
  });

  test("issues a fresh nonce on every request", () => {
    const a = run("https://dyvixitsolutions.com/").headers.get("x-middleware-request-x-nonce");
    const b = run("https://dyvixitsolutions.com/").headers.get("x-middleware-request-x-nonce");
    expect(a).not.toBe(b);
  });
});
