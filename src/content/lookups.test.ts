import { describe, expect, test } from "vitest";
import { solutions, solutionBySlug } from "./solutions";
import { industries, industryBySlug } from "./industries";
import { articles, articleBySlug } from "./insights";
import { techCategories } from "./technologies";
import { method, personas } from "./problems";

describe("content lookups", () => {
  test("solutionBySlug resolves a known slug", () => {
    expect(solutionBySlug("cybersecurity")?.name).toBe("Cybersecurity & DevSecOps");
  });

  test("solutionBySlug returns undefined for an unknown slug", () => {
    expect(solutionBySlug("nope")).toBeUndefined();
  });

  test("industryBySlug resolves a known slug", () => {
    expect(industryBySlug("healthcare")?.name).toBe("Healthcare");
  });

  test("industryBySlug returns undefined for an unknown slug", () => {
    expect(industryBySlug("nope")).toBeUndefined();
  });

  test("articleBySlug resolves a known slug", () => {
    expect(articleBySlug(articles[0]!.slug)?.title).toBe(articles[0]!.title);
  });

  test("articleBySlug returns undefined for an unknown slug", () => {
    expect(articleBySlug("nope")).toBeUndefined();
  });

  test("every content collection is non-empty", () => {
    expect(solutions.length).toBe(7);
    expect(industries.length).toBe(6);
    expect(articles.length).toBeGreaterThan(0);
  });
});

describe("technology taxonomy", () => {
  test("category ids are unique", () => {
    const ids = techCategories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("no category is empty and no item repeats within a category", () => {
    for (const c of techCategories) {
      expect(c.items.length, c.id).toBeGreaterThan(0);
      expect(new Set(c.items).size, c.id).toBe(c.items.length);
    }
  });
});

describe("method and personas", () => {
  test("the method has eight sequentially numbered stages", () => {
    expect(method).toHaveLength(8);
    method.forEach((m, i) => expect(m.step).toBe(String(i + 1).padStart(2, "0")));
  });

  test("every persona routes to an internal path", () => {
    for (const p of personas) expect(p.route).toMatch(/^\//);
  });
});
