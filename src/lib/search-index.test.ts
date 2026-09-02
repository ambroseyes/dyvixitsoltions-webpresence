import { describe, expect, test } from "vitest";
import { buildSearchIndex, searchIndex } from "./search-index";

const index = buildSearchIndex();

describe("search index", () => {
  test("covers solutions, industries, insights, actions and pages", () => {
    const groups = new Set(index.map((e) => e.group));
    expect([...groups].sort()).toEqual(["Actions", "Industries", "Insights", "Pages", "Solutions"]);
  });

  test("every entry points at an internal path", () => {
    for (const e of index) expect(e.href, e.label).toMatch(/^\/|^\/#/);
  });

  test("keywords are pre-lowercased so matching needs no per-query work", () => {
    for (const e of index) expect(e.keywords).toBe(e.keywords.toLowerCase());
  });

  test("an empty query returns everything", () => {
    expect(searchIndex(index, "   ")).toHaveLength(index.length);
  });

  /**
   * People search for the problem, not our service name. Each of these terms
   * previously returned nothing because the index was built from titles only.
   */
  test.each([
    ["firewall", "/solutions/cybersecurity"],
    ["backup", "/solutions/infrastructure-cloud"],
    ["disaster recovery", "/solutions/infrastructure-cloud"],
    ["ransomware", "/industries/financial-services"],
    ["postgis", "/solutions/data-documents"],
    ["fortigate", "/solutions/cybersecurity"],
    ["virtualisation", "/solutions/infrastructure-cloud"],
    ["audit", "/request-audit"],
  ])("searching %j finds %s", (query, expectedHref) => {
    const hrefs = searchIndex(index, query).map((e) => e.href);
    expect(hrefs).toContain(expectedHref);
  });

  test("matching is case-insensitive", () => {
    expect(searchIndex(index, "FortiGate").length).toBeGreaterThan(0);
  });

  test("a nonsense query returns nothing rather than everything", () => {
    expect(searchIndex(index, "zzzzqqqq")).toHaveLength(0);
  });
});
