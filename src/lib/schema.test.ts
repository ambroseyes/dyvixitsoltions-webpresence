import { describe, expect, test } from "vitest";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from "./schema";
import { site, knowsAbout } from "./site";
import { solutions } from "@/content/solutions";

describe("organizationSchema", () => {
  const org = organizationSchema();

  test("uses the canonical legal name and lists brand variants", () => {
    expect(org.name).toBe(site.legalName);
    expect(org.alternateName).toContain("DYVIX");
  });

  test("description is the exact canonical entity statement (§57 consistency)", () => {
    expect(org.description).toBe(site.entityStatement);
  });

  test("does not claim a street address that has not been confirmed", () => {
    // site.address.street is null; emitting one would be fabrication (§59).
    expect(org.address).not.toHaveProperty("streetAddress");
    expect(org.address.addressCountry).toBe("CM");
  });

  test("sameAs contains only absolute https URLs", () => {
    expect(org.sameAs.length).toBeGreaterThan(0);
    for (const url of org.sameAs) expect(url).toMatch(/^https:\/\//);
  });

  test("knowsAbout mirrors the controlled taxonomy exactly", () => {
    expect(org.knowsAbout).toEqual([...knowsAbout]);
  });

  test("offers one Service per published solution", () => {
    expect(org.makesOffer).toHaveLength(solutions.length);
    const names = org.makesOffer.map((o) => o.itemOffered.name);
    for (const s of solutions) expect(names).toContain(s.name);
  });

  test("emits no rating or review, since none are legitimate", () => {
    expect(org).not.toHaveProperty("aggregateRating");
    expect(org).not.toHaveProperty("review");
  });
});

describe("serviceSchema", () => {
  test("links every service back to the organisation node by @id", () => {
    for (const s of solutions) {
      const node = serviceSchema(s.slug)!;
      expect(node.provider).toEqual({ "@id": `${site.url}/#organization` });
      expect(node.url).toBe(`${site.url}/solutions/${s.slug}`);
      expect(node.description).toBe(s.definition);
    }
  });

  test("returns null for an unknown slug rather than throwing", () => {
    expect(serviceSchema("does-not-exist")).toBeNull();
  });
});

describe("breadcrumbSchema", () => {
  test("positions are 1-indexed and URLs absolute", () => {
    const b = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solutions", path: "/solutions" },
    ]);
    expect(b.itemListElement[0]!.position).toBe(1);
    expect(b.itemListElement[1]!.item).toBe(`${site.url}/solutions`);
  });
});

describe("faqSchema", () => {
  test("returns null for an empty list so no empty node is emitted", () => {
    expect(faqSchema([])).toBeNull();
  });

  test("maps each entry to a Question with an accepted answer", () => {
    const node = faqSchema([{ q: "Does D’Yvix support FortiGate?", a: "Yes." }])!;
    expect(node.mainEntity[0]!.name).toBe("Does D’Yvix support FortiGate?");
    expect(node.mainEntity[0]!.acceptedAnswer.text).toBe("Yes.");
  });
});

describe("graph", () => {
  test("drops null nodes and attaches the schema.org context", () => {
    const g = graph(websiteSchema(), null, faqSchema([]));
    expect(g["@context"]).toBe("https://schema.org");
    expect(g["@graph"]).toHaveLength(1);
  });
});

describe("articleSchema", () => {
  test("falls back to the published date when no update date is given", async () => {
    const { articleSchema } = await import("./schema");
    const node = articleSchema({
      title: "T",
      description: "D",
      slug: "s",
      published: "2026-08-26",
      authorName: "D’Yvix Engineering",
      authorPath: "/about",
    });
    expect(node.datePublished).toBe("2026-08-26");
    expect(node.dateModified).toBe("2026-08-26");
    expect(node.author.name).toBe("D’Yvix Engineering");
    expect(node.publisher).toEqual({ "@id": `${site.url}/#organization` });
  });

  test("prefers the update date when one is given", async () => {
    const { articleSchema } = await import("./schema");
    const node = articleSchema({
      title: "T",
      description: "D",
      slug: "s",
      published: "2026-08-26",
      updated: "2026-09-01",
      authorName: "D’Yvix Engineering",
      authorPath: "/about",
    });
    expect(node.dateModified).toBe("2026-09-01");
  });
});
