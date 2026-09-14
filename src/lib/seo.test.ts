import { describe, expect, test } from "vitest";
import { absoluteUrl, pageMeta } from "./seo";
import { site } from "./site";

const input = {
  title: "Cybersecurity",
  description: "Assess, protect, detect, respond and recover.",
  path: "/expertise/cybersecurity",
};

describe("pageMeta", () => {
  const en = pageMeta({ lang: "en", ...input });
  const fr = pageMeta({ lang: "fr", ...input });

  test("sets an absolute canonical URL in the page's own locale", () => {
    expect(en.alternates?.canonical).toBe(`${site.url}/expertise/cybersecurity`);
    expect(fr.alternates?.canonical).toBe(`${site.url}/fr/expertise/cybersecurity`);
  });

  test("declares every language plus x-default, identically from either locale", () => {
    const langs = en.alternates?.languages as Record<string, string>;
    expect(langs.en).toBe(`${site.url}/expertise/cybersecurity`);
    expect(langs.fr).toBe(`${site.url}/fr/expertise/cybersecurity`);
    expect(langs["x-default"]).toBe(langs.en);
    // Reciprocity: hreflang sets that disagree between pages are ignored.
    expect(fr.alternates?.languages).toEqual(en.alternates?.languages);
  });

  test("the French homepage alternate does not end in a stray slash", () => {
    const langs = pageMeta({ lang: "en", title: "Home", description: "d", path: "/" }).alternates
      ?.languages as Record<string, string>;
    expect(langs.fr).toBe(`${site.url}/fr`);
  });

  test("sets the Open Graph locale and its alternate", () => {
    expect(en.openGraph).toMatchObject({ locale: "en_US", alternateLocale: ["fr_FR"] });
    expect(fr.openGraph).toMatchObject({ locale: "fr_FR", alternateLocale: ["en_US"] });
  });

  test("leaves interior titles to the layout template but pins the homepage title", () => {
    expect(en.title).toBe("Cybersecurity");
    expect(en.openGraph?.title).toBe(`Cybersecurity — ${site.legalName}`);
    const home = pageMeta({
      lang: "en",
      title: "D’Yvix",
      description: "d",
      path: "/",
      absoluteTitle: true,
    });
    expect(home.title).toEqual({ absolute: "D’Yvix" });
    expect(home.openGraph?.title).toBe("D’Yvix");
  });

  test("emits a large-image X card pointing at the generated OG image", () => {
    expect(en.twitter).toMatchObject({ card: "summary_large_image", site: site.twitterHandle });
    expect(en.openGraph?.images).toEqual([
      expect.objectContaining({ url: `${site.url}/opengraph-image`, width: 1200, height: 630 }),
    ]);
  });
});

describe("absoluteUrl", () => {
  test("prefixes the canonical origin", () => {
    expect(absoluteUrl("/fr/about")).toBe(`${site.url}/fr/about`);
  });
});

describe("pageMeta for articles", () => {
  test("carries article type, published time and authors into Open Graph", () => {
    const meta = pageMeta({
      lang: "en",
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
    expect(
      pageMeta({ lang: "en", title: "t", description: "d", path: "/x" }).keywords,
    ).toBeUndefined();
  });
});
