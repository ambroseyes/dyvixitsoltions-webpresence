// @vitest-environment node
import { describe, expect, test } from "vitest";
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import nextConfig from "../../next.config";
import { DEFAULT_LOCALE, LOCALES } from "./config";

type Rule = { source: string; destination: string };

async function afterFiles(): Promise<Rule[]> {
  const rewrites = await nextConfig.rewrites!();
  if (Array.isArray(rewrites)) throw new Error("expected phased rewrites");
  return (rewrites.afterFiles ?? []) as Rule[];
}

/** Applies the rules the way Next does: the first match wins. */
async function resolve(path: string): Promise<string | null> {
  for (const rule of await afterFiles()) {
    const params = getPathMatch(rule.source, { removeUnnamedParams: true, strict: true })(path);
    if (!params) continue;
    const filled = rule.destination.replace(/:(\w+)\*?/g, (_, key: string) => {
      const value = params[key];
      return Array.isArray(value) ? value.join("/") : (value ?? "");
    });
    return filled.replace(/\/+$/, "") || "/";
  }
  return null;
}

/**
 * The unprefixed English URL space is mapped onto app/[lang] with lang=en by
 * next.config.ts. This pins that mapping: what is rewritten, and what must
 * reach the app untouched.
 */
describe("default-locale rewrites", () => {
  test.each([
    ["/", "/en"],
    ["/about", "/en/about"],
    ["/expertise/cybersecurity", "/en/expertise/cybersecurity"],
    ["/french", "/en/french"],
    // An unknown locale prefix lands in the English tree, where it 404s.
    ["/de/about", "/en/de/about"],
  ])("rewrites %s to %s", async (path, expected) => {
    expect(await resolve(path)).toBe(expected);
  });

  test.each([
    "/api/search/en",
    "/api/contact",
    "/_next/static/chunk.js",
    // Redirected to the public URL by proxy.ts before rewrites run.
    "/en",
    "/en/about",
  ])("leaves %s alone", async (path) => {
    expect(await resolve(path)).toBeNull();
  });

  test("every prefixed locale reaches [lang] unrewritten", async () => {
    for (const lang of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
      expect(await resolve(`/${lang}`), lang).toBeNull();
      expect(await resolve(`/${lang}/about`), lang).toBeNull();
    }
  });
});
