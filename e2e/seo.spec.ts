import { test, expect } from "@playwright/test";

const PAGES = [
  "/",
  "/expertise",
  "/expertise/cybersecurity",
  "/solutions/back-node",
  "/industries/healthcare",
  "/about",
  "/contact",
  "/fr",
  "/fr/expertise/cybersecurity",
  "/fr/about",
];

const url = (path: string) => new RegExp(`dyvixitsolutions\\.com${path === "/" ? "/?" : path}$`);

test.describe("SEO and GEO surface", () => {
  for (const path of PAGES) {
    test(`${path} declares canonical, description and Open Graph`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url(path));

      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc?.length ?? 0).toBeGreaterThan(80);

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    });
  }

  test("hreflang alternates are reciprocal between the two languages", async ({ page }) => {
    for (const [path, en, fr] of [
      ["/expertise/cybersecurity", "/expertise/cybersecurity", "/fr/expertise/cybersecurity"],
      ["/fr/expertise/cybersecurity", "/expertise/cybersecurity", "/fr/expertise/cybersecurity"],
      ["/", "/", "/fr"],
    ] as const) {
      await page.goto(path);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]'), path).toHaveAttribute(
        "href",
        url(en),
      );
      await expect(page.locator('link[rel="alternate"][hreflang="fr"]'), path).toHaveAttribute(
        "href",
        url(fr),
      );
      await expect(
        page.locator('link[rel="alternate"][hreflang="x-default"]'),
        path,
      ).toHaveAttribute("href", url(en));
    }
  });

  test("exactly one h1 per page", async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      expect(await page.locator("h1").count(), path).toBe(1);
    }
  });

  test("the homepage emits Organization, WebSite and FAQPage nodes in its language", async ({
    page,
  }) => {
    for (const [path, lang] of [
      ["/", "en"],
      ["/fr", "fr"],
    ] as const) {
      await page.goto(path);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const nodes = blocks.flatMap((b) => JSON.parse(b)["@graph"] ?? []);
      const types = nodes.map((n: { "@type": string }) => n["@type"]);
      expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "FAQPage"]));
      expect(nodes.find((n: { "@type": string }) => n["@type"] === "WebSite").inLanguage).toBe(
        lang,
      );
    }
  });

  test("domain pages link Service to the Organization node", async ({ page }) => {
    await page.goto("/expertise/cybersecurity");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = blocks.flatMap((b) => JSON.parse(b)["@graph"] ?? []);
    const service = nodes.find((n: { "@type": string }) => n["@type"] === "Service");
    expect(service.provider["@id"]).toContain("#organization");
  });

  test("the sitemap lists both languages with alternates", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const path of [
      "/expertise/cybersecurity",
      "/fr/expertise/cybersecurity",
      "/industries/financial-services",
      "/solutions/back-node",
    ]) {
      expect(xml).toContain(path);
    }
    expect(xml).toMatch(/hreflang="fr"/);
  });

  test("robots allows crawling and points at the sitemap", async ({ request }) => {
    const txt = await (await request.get("/robots.txt")).text();
    expect(txt).toContain("Allow: /");
    expect(txt).toContain("sitemap.xml");
    expect(txt).toContain("Disallow: /api/");
  });

  test("security headers are present", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["content-security-policy"]).toContain("nonce-");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["strict-transport-security"]).toContain("max-age=");
    expect(h["x-powered-by"]).toBeUndefined();
  });

  test("the internal /en prefix redirects permanently to the public URL", async ({ request }) => {
    const res = await request.get("/en/about", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toMatch(/\/about$/);
  });

  test("404 returns the correct status and a helpful page, in the URL's language", async ({
    page,
  }) => {
    const en = await page.goto("/this-route-does-not-exist");
    expect(en?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("does not resolve");

    const fr = await page.goto("/fr/cette-page-n-existe-pas");
    expect(fr?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });
});
