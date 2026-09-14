import { describe, expect, test } from "vitest";

import { LOCALES, localePath } from "@/i18n/config";
import { getCompany } from "@/content/company";
import { getExpertise } from "@/content/expertise";
import { getProductBySlug } from "@/content/products";
import {
  ORG_ID,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  serviceSchema,
  softwareSchema,
  websiteSchema,
} from "./schema";
import { site } from "./site";

describe.each(LOCALES)("organizationSchema (%s)", (lang) => {
  const org = organizationSchema(lang);
  const company = getCompany(lang);

  test("uses the canonical legal name and lists brand variants", () => {
    expect(org.name).toBe(site.legalName);
    expect(org.alternateName).toContain("DYVIX");
  });

  test("description is the exact canonical entity statement (§57 consistency)", () => {
    expect(org.description).toBe(company.entityStatement);
  });

  test("keeps one @id in every language — one organisation, not two", () => {
    expect(org["@id"]).toBe(ORG_ID);
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
    expect(org.knowsAbout).toEqual(company.knowsAbout);
  });

  test("areaServed carries the localised names in site order", () => {
    expect(org.areaServed.map((a) => a.name)).toEqual(company.areaServed);
  });

  test("offers one Service per expertise domain, pointing at its page in this locale", () => {
    const domains = getExpertise(lang);
    expect(org.makesOffer).toHaveLength(domains.length);
    for (const [i, e] of domains.entries()) {
      expect(org.makesOffer[i]!.itemOffered.url).toBe(
        `${site.url}${localePath(lang, `/expertise/${e.slug}`)}`,
      );
    }
  });

  test("never emits ISO/IEC 27001 as a credential — it is aligned, not certified", () => {
    const names = org.hasCredential.map((c) => c.name);
    expect(names).not.toContain("ISO/IEC 27001");
    expect(names).toEqual(
      expect.arrayContaining(["ITIL Foundation", "AWS Certified Cloud Practitioner"]),
    );
  });

  test("emits no rating or review, since none are legitimate", () => {
    expect(org).not.toHaveProperty("aggregateRating");
    expect(org).not.toHaveProperty("review");
  });
});

describe("websiteSchema", () => {
  test("declares the page language and a distinct @id per locale", () => {
    expect(websiteSchema("en").inLanguage).toBe("en");
    expect(websiteSchema("fr").inLanguage).toBe("fr");
    expect(websiteSchema("en")["@id"]).not.toBe(websiteSchema("fr")["@id"]);
    expect(websiteSchema("fr").url).toBe(`${site.url}/fr`);
  });
});

describe("serviceSchema", () => {
  test.each(LOCALES)("links every domain back to the organisation node (%s)", (lang) => {
    for (const e of getExpertise(lang)) {
      const node = serviceSchema(lang, e.slug)!;
      expect(node.provider).toEqual({ "@id": ORG_ID });
      expect(node.url).toBe(`${site.url}${localePath(lang, `/expertise/${e.slug}`)}`);
      expect(node.description).toBe(e.definition);
    }
  });

  test("returns null for an unknown slug rather than throwing", () => {
    expect(serviceSchema("en", "does-not-exist")).toBeNull();
  });
});

describe("softwareSchema", () => {
  test("describes a documented platform with no offers or ratings", () => {
    const node = softwareSchema("en", getProductBySlug("en", "back-node")!)!;
    expect(node.creator).toEqual({ "@id": ORG_ID });
    expect(node).not.toHaveProperty("offers");
    expect(node).not.toHaveProperty("aggregateRating");
  });

  test("returns null for a platform whose description is not yet confirmed", () => {
    expect(softwareSchema("en", getProductBySlug("en", "aegis")!)).toBeNull();
  });
});

describe("breadcrumbSchema", () => {
  test("positions are 1-indexed and URLs absolute", () => {
    const b = breadcrumbSchema([
      { name: "Accueil", path: "/fr" },
      { name: "Expertises", path: "/fr/expertise" },
    ]);
    expect(b.itemListElement[0]!.position).toBe(1);
    expect(b.itemListElement[1]!.item).toBe(`${site.url}/fr/expertise`);
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
    const g = graph(websiteSchema("en"), null, faqSchema([]));
    expect(g["@context"]).toBe("https://schema.org");
    expect(g["@graph"]).toHaveLength(1);
  });
});

describe("articleSchema", () => {
  const base = {
    title: "T",
    description: "D",
    slug: "s",
    published: "2026-08-26",
    authorName: "D’Yvix Engineering",
    authorPath: "/about",
  };

  test("falls back to the published date when no update date is given", () => {
    const node = articleSchema("en", base);
    expect(node.datePublished).toBe("2026-08-26");
    expect(node.dateModified).toBe("2026-08-26");
    expect(node.author.name).toBe("D’Yvix Engineering");
    expect(node.publisher).toEqual({ "@id": ORG_ID });
  });

  test("prefers the update date when one is given", () => {
    expect(articleSchema("en", { ...base, updated: "2026-09-01" }).dateModified).toBe("2026-09-01");
  });

  test("uses the localised URL and language", () => {
    const node = articleSchema("fr", base);
    expect(node.url).toBe(`${site.url}/fr/insights/s`);
    expect(node.inLanguage).toBe("fr");
  });
});
