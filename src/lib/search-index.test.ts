import { describe, expect, test } from "vitest";
import { LOCALES } from "@/i18n/config";
import { buildSearchIndex } from "./search-index";
import { normalizeText, searchIndex } from "./search";

describe.each(LOCALES)("search index (%s)", (lang) => {
  const index = buildSearchIndex(lang);

  test("covers every group the palette renders", () => {
    const groups = [...new Set(index.map((e) => e.group))].sort();
    expect(groups).toEqual([
      "actions",
      "expertise",
      "industries",
      "insights",
      "pages",
      "solutions",
    ]);
  });

  test("every href is internal and in this locale", () => {
    for (const e of index) {
      expect(e.href, e.label).toMatch(/^\//);
      if (lang === "fr") expect(e.href, e.label).toMatch(/^\/fr(\/|#|$)/);
      else expect(e.href, e.label).not.toMatch(/^\/fr(\/|#|$)/);
    }
  });

  test("keywords are pre-normalised so matching needs no per-query work", () => {
    for (const e of index) expect(e.keywords).toBe(normalizeText(e.keywords));
  });

  test("hrefs are unique, so the palette never lists a page twice", () => {
    const hrefs = index.filter((e) => e.group !== "actions").map((e) => e.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

/**
 * People search for the problem, not our service name — and in French they
 * may type it without accents.
 */
describe("search finds pages by the problem they solve", () => {
  test.each([
    ["en", "firewall", "/expertise/cybersecurity"],
    ["en", "backup", "/expertise/cloud-infrastructure"],
    ["en", "disaster recovery", "/expertise/cloud-infrastructure"],
    ["en", "ransomware", "/industries/financial-services"],
    ["en", "postgis", "/expertise/ai-data"],
    ["en", "drones", "/expertise/iot-edge"],
    ["en", "rpa", "/solutions/back-node"],
    ["en", "audit", "/request-audit"],
    ["fr", "pare-feu", "/fr/expertise/cybersecurity"],
    ["fr", "securite", "/fr/expertise/cybersecurity"],
    ["fr", "sauvegarde", "/fr/expertise/cloud-infrastructure"],
    ["fr", "devis", "/fr/contact"],
  ] as const)("%s: %j finds %s", (lang, query, expected) => {
    const hrefs = searchIndex(buildSearchIndex(lang), query).map((e) => e.href);
    expect(hrefs).toContain(expected);
  });
});
