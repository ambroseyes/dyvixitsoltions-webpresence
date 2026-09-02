import { describe, expect, test } from "vitest";
import { absoluteUrl, pageMeta } from "./seo";
import { site } from "./site";

describe("pageMeta", () => {
  const meta = pageMeta({
    title: "Cybersecurity",
    description: "Assess, protect, detect, respond and recover.",
    path: "/solutions/cybersecurity",
  });

  test("sets an absolute canonical URL", () => {
    expect(meta.alternates?.canonical).toBe(`${site.url}/solutions/cybersecurity`);
  });

  test("declares both language alternates plus x-default", () => {
    const langs = meta.alternates?.languages as Record<string, string>;
    expect(langs.en).toBe(`${site.url}/solutions/cybersecurity`);
    expect(langs.fr).toBe(`${site.url}/fr/solutions/cybersecurity`);
    expect(langs["x-default"]).toBe(langs.en);
  });

  test("the French alternate for the homepage does not end in a stray slash", () => {
    const langs = pageMeta({ title: "Home", description: "d", path: "/" }).alternates
      ?.languages as Record<string, string>;
    expect(langs.fr).toBe(`${site.url}/fr`);
  });

  test("suffixes the brand on interior pages but not the homepage", () => {
    expect(meta.openGraph?.title).toBe(`Cybersecurity — ${site.legalName}`);
    const home = pageMeta({ title: "D’Yvix", description: "d", path: "/" });
    expect(home.openGraph?.title).toBe("D’Yvix");
  });

  test("emits a large-image X card pointing at the generated OG image", () => {
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", site: "@d_yvix" });
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: `${site.url}/opengraph-image`, width: 1200, height: 630 }),
    ]);
  });
});

describe("absoluteUrl", () => {
  test("prefixes the canonical origin", () => {
    expect(absoluteUrl("/about")).toBe(`${site.url}/about`);
  });
});

describe("pageMeta for articles", () => {
  test("carries article type, published time and authors into Open Graph", () => {
    const meta = pageMeta({
      title: "Multi-WAN failover",
      description: "d",
      path: "/insights/multi-wan",
      type: "article",
      publishedTime: "2026-08-26",
      authors: ["D’Yvix Engineering"],
      keywords: ["SD-WAN", "Networking"],
    });
    expect(meta.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-08-26",
      authors: ["D’Yvix Engineering"],
    });
    expect(meta.keywords).toEqual(["SD-WAN", "Networking"]);
  });

  test("omits keywords entirely when none are supplied", () => {
    expect(pageMeta({ title: "t", description: "d", path: "/x" }).keywords).toBeUndefined();
  });
});
