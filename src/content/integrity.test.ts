import { describe, expect, test } from "vitest";
import { solutions, solutionSlugs } from "./solutions";
import { industries } from "./industries";
import { articles } from "./insights";
import { finderOptions, method, personas, problems } from "./problems";
import { projects } from "./projects";
import { primaryNav, footerNav } from "@/lib/nav";

/**
 * Content-graph integrity.
 *
 * §70 forbids orphan pages and dangling internal links. These are the tests
 * that actually enforce it: adding a solution without wiring it into the
 * graph, or pointing `related` at a slug that does not exist, fails the build
 * rather than shipping a broken link.
 */
describe("solution graph", () => {
  test("slugs are unique", () => {
    expect(new Set(solutionSlugs).size).toBe(solutionSlugs.length);
  });

  test("indices are unique and two digits", () => {
    const indices = solutions.map((s) => s.index);
    expect(new Set(indices).size).toBe(indices.length);
    for (const i of indices) expect(i).toMatch(/^\d{2}$/);
  });

  test("every related slug resolves to a real solution", () => {
    for (const s of solutions) {
      for (const slug of s.related) {
        expect(solutionSlugs, `${s.slug} -> ${slug}`).toContain(slug);
      }
    }
  });

  test("no solution lists itself as related", () => {
    for (const s of solutions) expect(s.related).not.toContain(s.slug);
  });

  test("every solution is reachable from the primary navigation", () => {
    const navHrefs = primaryNav.flatMap((g) => (g.children ?? []).map((c) => c.href));
    for (const s of solutions) {
      expect(navHrefs).toContain(`/solutions/${s.slug}`);
    }
  });

  test("every solution is reachable from the footer", () => {
    const footerHrefs = footerNav.flatMap((c) => c.links.map((l) => l.href));
    for (const s of solutions) {
      expect(footerHrefs).toContain(`/solutions/${s.slug}`);
    }
  });

  test("every solution carries the fields the §63 page template renders", () => {
    for (const s of solutions) {
      expect(s.definition.length, s.slug).toBeGreaterThan(80);
      expect(s.whoNeedsIt.length, s.slug).toBeGreaterThan(0);
      expect(s.problemsSolved.length, s.slug).toBeGreaterThan(0);
      expect(s.capabilities.length, s.slug).toBeGreaterThan(0);
      expect(s.approach.length, s.slug).toBeGreaterThan(0);
      expect(s.technologies.length, s.slug).toBeGreaterThan(0);
      expect(s.outcomes.length, s.slug).toBeGreaterThan(0);
      expect(s.faqs.length, s.slug).toBeGreaterThanOrEqual(3);
    }
  });

  test("the definition names the organisation so it is extractable standalone", () => {
    for (const s of solutions) {
      expect(s.definition, s.slug).toMatch(/D’Yvix/);
    }
  });

  test("CTA labels are contextual, never a bare 'Contact us' (§32)", () => {
    for (const s of solutions) {
      expect(s.cta.label.toLowerCase(), s.slug).not.toBe("contact us");
    }
  });
});

describe("industry graph", () => {
  test("slugs are unique", () => {
    const slugs = industries.map((i) => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("every mapped solution slug resolves", () => {
    for (const i of industries) {
      expect(i.solutions.length).toBeGreaterThan(0);
      for (const slug of i.solutions) {
        expect(solutionSlugs, `${i.slug} -> ${slug}`).toContain(slug);
      }
    }
  });

  test("every industry is reachable from the primary navigation", () => {
    const navHrefs = primaryNav.flatMap((g) => (g.children ?? []).map((c) => c.href));
    for (const i of industries) expect(navHrefs).toContain(`/industries/${i.slug}`);
  });
});

describe("homepage interactive content", () => {
  test("every problem maps to a real solution", () => {
    for (const p of problems) expect(solutionSlugs).toContain(p.solution);
  });

  test("every finder option maps to a real solution and names deliverables", () => {
    for (const o of finderOptions) {
      expect(solutionSlugs, o.id).toContain(o.solution);
      expect(o.deliverables.length, o.id).toBeGreaterThanOrEqual(4);
      expect(o.cta.href, o.id).toMatch(/^\//);
    }
  });
});

describe("articles", () => {
  test("slugs are unique and URL-safe", () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
  });

  test("published dates are valid ISO dates", () => {
    for (const a of articles) {
      expect(Number.isNaN(Date.parse(a.published)), a.slug).toBe(false);
    }
  });

  test("every related solution slug resolves", () => {
    for (const a of articles) {
      for (const slug of a.relatedSolutions) expect(solutionSlugs).toContain(slug);
    }
  });

  test("heading ids are unique within an article, so the contents rail works", () => {
    for (const a of articles) {
      const ids = a.body.filter((b) => b.type === "h2").map((b) => b.id);
      expect(new Set(ids).size, a.slug).toBe(ids.length);
    }
  });
});

/**
 * Link-graph guard.
 *
 * The service taxonomy was reorganised after the brand refresh, which is
 * exactly the change that leaves dangling internal links behind. This walks
 * every /solutions/ and /industries/ href embedded anywhere in the content
 * layer and fails if it does not resolve to a real page.
 */
describe("no dangling internal links in content", () => {
  const CONTENT = [
    JSON.stringify(solutions),
    JSON.stringify(industries),
    JSON.stringify(articles),
    JSON.stringify(finderOptions),
    JSON.stringify(problems),
    JSON.stringify(method),
    JSON.stringify(personas),
    JSON.stringify(projects),
    JSON.stringify(primaryNav),
    JSON.stringify(footerNav),
  ].join(" ");

  const solutionHrefs = [...CONTENT.matchAll(/\/solutions\/([a-z0-9-]+)/g)].map((m) => m[1]!);
  const industryHrefs = [...CONTENT.matchAll(/\/industries\/([a-z0-9-]+)/g)].map((m) => m[1]!);

  test("every /solutions/<slug> reference resolves", () => {
    for (const slug of new Set(solutionHrefs)) {
      expect(solutionSlugs, `/solutions/${slug}`).toContain(slug);
    }
  });

  test("every /industries/<slug> reference resolves", () => {
    const known = industries.map((i) => i.slug);
    for (const slug of new Set(industryHrefs)) {
      expect(known, `/industries/${slug}`).toContain(slug);
    }
  });

  test("every project maps to real solution slugs", () => {
    for (const p of projects) {
      expect(p.solutions.length, p.slug).toBeGreaterThan(0);
      for (const slug of p.solutions) expect(solutionSlugs, `${p.slug} -> ${slug}`).toContain(slug);
    }
  });

  test("project slugs and indices are unique", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.index)).size).toBe(projects.length);
  });
});
