import { describe, expect, test } from "vitest";
import { LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProductBySlug } from "@/content/products";
import { breadcrumbTrail, getFooterNav, getPrimaryNav, productHref } from "./nav";

describe("breadcrumbTrail", () => {
  test("starts at Home and localises every path", () => {
    expect(breadcrumbTrail("fr", [{ name: "X", path: "/about" }])).toEqual([
      { name: getDictionary("fr").nav.home, path: "/fr" },
      { name: "X", path: "/fr/about" },
    ]);
  });

  test("leaves English paths unprefixed", () => {
    expect(breadcrumbTrail("en", [{ name: "X", path: "/about" }])).toEqual([
      { name: getDictionary("en").nav.home, path: "/" },
      { name: "X", path: "/about" },
    ]);
  });
});

describe("productHref", () => {
  test("a documented platform gets a page; the rest an anchor on /solutions", () => {
    expect(productHref(getProductBySlug("en", "back-node")!)).toBe("/solutions/back-node");
    expect(productHref(getProductBySlug("en", "aegis")!)).toBe("/solutions#aegis");
  });
});

describe.each(LOCALES)("navigation (%s)", (lang) => {
  const hrefs = [
    ...getPrimaryNav(lang).flatMap((g) => [
      g.href,
      ...(g.children ?? []).map((c) => c.href),
      ...(g.feature ? [g.feature.href] : []),
    ]),
    ...getFooterNav(lang).flatMap((c) => c.links.map((l) => l.href)),
  ];

  test("every link stays in the page's language", () => {
    for (const h of hrefs) {
      if (lang === "fr") expect(h).toMatch(/^\/fr(\/|#|$)/);
      else expect(h).not.toMatch(/^\/fr(\/|#|$)/);
    }
  });

  test("the primary groups' active-state paths are unique", () => {
    const matches = getPrimaryNav(lang).map((g) => g.match);
    expect(new Set(matches).size).toBe(matches.length);
  });
});
