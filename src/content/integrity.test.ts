import { describe, expect, test } from "vitest";

import { LOCALES } from "@/i18n/config";
import { getFooterNav, getPrimaryNav } from "@/lib/nav";
import { getCompany } from "./company";
import { EXPERTISE_SLUGS, getExpertise } from "./expertise";
import { EXPERTISE_BASE } from "./expertise/base";
import { getHome } from "./home";
import { INDUSTRY_SLUGS, getIndustries } from "./industries";
import { ARTICLE_SLUGS, getArticles } from "./insights";
import { getPages } from "./pages";
import { PRODUCT_SLUGS, getProducts, hasDetailPage } from "./products";
import { PROJECT_SLUGS, getProjects } from "./projects";

/**
 * Content-graph integrity.
 *
 * §70 forbids orphan pages and dangling internal links; the content model
 * forbids a claim in one language that the other does not make. These tests
 * enforce both: a domain added without wiring, a relation to a slug that
 * does not exist, or a French page missing an item the English one has,
 * fails the build rather than shipping.
 */

const unique = (xs: readonly string[]) => new Set(xs).size === xs.length;

/** Keys whose values are identifiers or code, never prose. */
const NOT_PROSE = new Set([
  "href",
  "slug",
  "code",
  "id",
  "url",
  "src",
  "email",
  "phone",
  "ctaHref",
]);

function prose(value: unknown, key?: string): string[] {
  if (key && NOT_PROSE.has(key)) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((v) => prose(v));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => prose(v, k));
  return [];
}

/** Structure without the words: keys, array lengths and value types. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return value === null ? "null" : typeof value;
}

const everything = (lang: (typeof LOCALES)[number]) => ({
  expertise: getExpertise(lang),
  products: getProducts(lang),
  projects: getProjects(lang),
  industries: getIndustries(lang),
  articles: getArticles(lang),
  home: getHome(lang),
  company: getCompany(lang),
  pages: getPages(lang),
});

describe("expertise graph", () => {
  test("slugs and indices are unique; indices are two digits", () => {
    expect(unique(EXPERTISE_SLUGS)).toBe(true);
    const indices = EXPERTISE_BASE.map((e) => e.index);
    expect(unique(indices)).toBe(true);
    for (const i of indices) expect(i).toMatch(/^\d{2}$/);
  });

  test("every relation resolves, and no domain relates to itself", () => {
    for (const e of EXPERTISE_BASE) {
      expect(e.related, e.slug).not.toContain(e.slug);
      for (const r of e.related) expect(EXPERTISE_SLUGS, `${e.slug} -> ${r}`).toContain(r);
      for (const p of e.projects) expect(PROJECT_SLUGS, `${e.slug} -> ${p}`).toContain(p);
      for (const p of e.products) expect(PRODUCT_SLUGS, `${e.slug} -> ${p}`).toContain(p);
      expect(e.ctaHref, e.slug).toMatch(/^\//);
    }
  });

  test.each(LOCALES)("every domain carries what the §63 template renders (%s)", (lang) => {
    for (const e of getExpertise(lang)) {
      expect(e.definition.length, e.slug).toBeGreaterThan(80);
      // Named in the definition itself, so it can be extracted on its own.
      expect(e.definition, e.slug).toMatch(/D’Yvix/);
      for (const list of [
        e.whoNeedsIt,
        e.problemsSolved,
        e.capabilities,
        e.approach,
        e.technologies,
        e.outcomes,
        e.evidence,
      ]) {
        expect(list.length, e.slug).toBeGreaterThan(0);
      }
      expect(e.faqs.length, e.slug).toBeGreaterThanOrEqual(3);
      // §32 — contextual CTAs, never a bare "contact us".
      expect(e.ctaLabel.toLowerCase(), e.slug).not.toMatch(/^(contact us|contactez-nous)$/);
    }
  });

  test.each(LOCALES)(
    "every domain and sector is reachable from the header and footer (%s)",
    (lang) => {
      const header = getPrimaryNav(lang).flatMap((g) => (g.children ?? []).map((c) => c.href));
      const footer = getFooterNav(lang).flatMap((c) => c.links.map((l) => l.href));
      const prefix = lang === "fr" ? "/fr" : "";
      for (const slug of EXPERTISE_SLUGS) {
        expect(header).toContain(`${prefix}/expertise/${slug}`);
        expect(footer).toContain(`${prefix}/expertise/${slug}`);
      }
      for (const slug of INDUSTRY_SLUGS) expect(header).toContain(`${prefix}/industries/${slug}`);
    },
  );
});

describe("evidence and relations", () => {
  test("every project evidences at least one domain", () => {
    for (const p of getProjects("en")) expect(p.expertise.length, p.slug).toBeGreaterThan(0);
  });

  test("project slugs and indices are unique", () => {
    const projects = getProjects("en");
    expect(unique(projects.map((p) => p.slug))).toBe(true);
    expect(unique(projects.map((p) => p.index))).toBe(true);
  });

  test("every documented platform is linked from a domain", () => {
    for (const p of getProducts("en").filter(hasDetailPage))
      expect(p.expertise.length, p.slug).toBeGreaterThan(0);
  });

  test("every sector maps to real, distinct domains", () => {
    for (const i of getIndustries("en")) {
      expect(i.expertise.length, i.slug).toBeGreaterThan(0);
      expect(unique(i.expertise), i.slug).toBe(true);
      for (const s of i.expertise) expect(EXPERTISE_SLUGS, `${i.slug} -> ${s}`).toContain(s);
    }
  });

  test("article slugs are URL-safe, dates valid and heading ids unique", () => {
    for (const a of getArticles("en")) {
      expect(a.slug).toMatch(/^[a-z0-9-]+$/);
      expect(Number.isNaN(Date.parse(a.published)), a.slug).toBe(false);
      const ids = a.body.flatMap((b) => (b.type === "h2" ? [b.id] : []));
      expect(unique(ids), a.slug).toBe(true);
    }
    expect(unique(ARTICLE_SLUGS)).toBe(true);
  });
});

describe("homepage interactive content", () => {
  test.each(LOCALES)("problems and finder options map to real domains (%s)", (lang) => {
    const home = getHome(lang);
    for (const p of home.problems) expect(EXPERTISE_SLUGS, p.id).toContain(p.expertise);
    for (const o of home.finder) {
      expect(EXPERTISE_SLUGS, o.id).toContain(o.expertise);
      expect(o.deliverables.length, o.id).toBeGreaterThanOrEqual(4);
      expect(o.ctaHref, o.id).toMatch(/^\//);
    }
    expect(home.method).toHaveLength(8);
  });

  test("technology categories have unique ids and no repeated items", () => {
    const cats = getHome("en").techCategories;
    expect(unique(cats.map((c) => c.id))).toBe(true);
    for (const c of cats) expect(unique(c.items), c.id).toBe(true);
  });
});

describe("locale parity", () => {
  /**
   * The French site states exactly what the English site states: same items,
   * same lists, same lengths. Only the words differ.
   */
  test("every collection has the same structure in both languages", () => {
    const en = everything("en");
    const fr = everything("fr");
    for (const key of Object.keys(en) as (keyof typeof en)[]) {
      expect(shape(fr[key]), key).toEqual(shape(en[key]));
    }
  });

  test("names of people and platforms are identical across languages", () => {
    expect(getCompany("fr").team.map((m) => m.name)).toEqual(
      getCompany("en").team.map((m) => m.name),
    );
    expect(getProducts("fr").map((p) => p.name)).toEqual(getProducts("en").map((p) => p.name));
    // Client names are deliberately not compared: a public body's official
    // name is translated ("Ministère des Travaux Publics"), a company's is not.
  });
});

describe("French typography", () => {
  const strings = prose(everything("fr"));

  test("no breakable space before ; : ! or ?", () => {
    const offenders = strings.filter((s) => / [;:!?]/.test(s));
    expect(offenders).toEqual([]);
  });

  test("no breakable space inside guillemets", () => {
    expect(strings.filter((s) => /« | »/.test(s))).toEqual([]);
  });
});

describe("honesty guards", () => {
  const all = LOCALES.flatMap((lang) => prose(everything(lang)));

  test("ISO/IEC 27001 is published as aligned, never certified", () => {
    for (const lang of LOCALES) {
      const iso = getCompany(lang).standards.find((s) => s.name === "ISO/IEC 27001");
      expect(iso?.qualifier, lang).toBe("aligned");
    }
  });

  test("every mention of drones carries the regulatory caveat", () => {
    // Questions are exempt: the answer printed beside them carries the caveat.
    const drones = all.filter((s) => /drone/i.test(s) && !s.trimEnd().endsWith("?"));
    expect(drones.length).toBeGreaterThan(0);
    for (const s of drones) expect(s).toMatch(/authoris|autorisation|regulat|réglement/i);
  });

  test("the DroneNet client programme is never presented as D’Yvix content", () => {
    expect(all.filter((s) => /dronenet/i.test(s))).toEqual([]);
  });

  test("no stray non-Latin script has crept into the copy", () => {
    expect(all.filter((s) => /[Ѐ-ӿ֐-ۿ一-鿿]/.test(s))).toEqual([]);
  });

  test("unconfirmed legal facts stay visibly marked as placeholders", () => {
    expect(prose(getPages("en").legal).some((s) => s.startsWith("PLACEHOLDER —"))).toBe(true);
    expect(prose(getPages("fr").legal).some((s) => s.startsWith("À COMPLÉTER —"))).toBe(true);
  });
});

/**
 * Link-graph guard: walks every internal href in content and navigation, in
 * both languages, and fails if one does not resolve to a real page.
 */
describe("no dangling internal links", () => {
  const corpus = LOCALES.map((lang) =>
    JSON.stringify([everything(lang), getPrimaryNav(lang), getFooterNav(lang)]),
  ).join(" ");
  const slugsAfter = (segment: string) => [
    ...new Set([...corpus.matchAll(new RegExp(`/${segment}/([a-z0-9-]+)`, "g"))].map((m) => m[1]!)),
  ];

  test("every /expertise/<slug> resolves", () => {
    for (const s of slugsAfter("expertise")) expect(EXPERTISE_SLUGS, s).toContain(s);
  });

  test("every /industries/<slug> resolves", () => {
    for (const s of slugsAfter("industries")) expect(INDUSTRY_SLUGS, s).toContain(s);
  });

  test("every /solutions/<slug> is a platform with a page", () => {
    const withPages = getProducts("en")
      .filter(hasDetailPage)
      .map((p) => p.slug as string);
    for (const s of slugsAfter("solutions")) expect(withPages, s).toContain(s);
  });

  test("every /insights/<slug> resolves", () => {
    for (const s of slugsAfter("insights")) expect(ARTICLE_SLUGS, s).toContain(s);
  });
});
