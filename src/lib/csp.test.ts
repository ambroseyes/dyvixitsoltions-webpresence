import { describe, expect, test } from "vitest";
import { contentSecurityPolicy } from "./csp";

const directives = (csp: string) => csp.split("; ");
const directive = (csp: string, name: string) =>
  directives(csp).find((d) => d === name || d.startsWith(`${name} `));

describe("contentSecurityPolicy", () => {
  const prod = contentSecurityPolicy("abc123", { https: true, dev: false });

  test("scripts run by nonce only — no inline, no eval in production", () => {
    const scripts = directive(prod, "script-src")!;
    expect(scripts).toContain("'nonce-abc123'");
    expect(scripts).toContain("'strict-dynamic'");
    expect(scripts).not.toContain("'unsafe-inline'");
    expect(scripts).not.toContain("'unsafe-eval'");
  });

  test("allows eval only in development, for the refresh runtime", () => {
    const dev = contentSecurityPolicy("abc123", { https: false, dev: true });
    expect(directive(dev, "script-src")).toContain("'unsafe-eval'");
  });

  test("locks down framing, plugins, base URI and form targets", () => {
    expect(directive(prod, "frame-ancestors")).toBe("frame-ancestors 'none'");
    expect(directive(prod, "object-src")).toBe("object-src 'none'");
    expect(directive(prod, "base-uri")).toBe("base-uri 'self'");
    expect(directive(prod, "form-action")).toBe("form-action 'self'");
  });

  /**
   * Regression: sent over plain HTTP, the directive made WebKit request every
   * stylesheet, font and script from https://localhost — a TLS error, so the
   * page rendered with no styles and never hydrated.
   */
  test("upgrades insecure requests on HTTPS pages only", () => {
    expect(directive(prod, "upgrade-insecure-requests")).toBeDefined();
    const http = contentSecurityPolicy("abc123", { https: false, dev: false });
    expect(directive(http, "upgrade-insecure-requests")).toBeUndefined();
  });

  test("has no empty directives", () => {
    for (const d of directives(prod)) expect(d.trim()).toBe(d);
    for (const d of directives(prod)) expect(d.length).toBeGreaterThan(0);
  });
});
