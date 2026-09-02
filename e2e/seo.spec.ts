import { test, expect } from "@playwright/test";

const PAGES = [
  "/",
  "/solutions",
  "/solutions/cybersecurity",
  "/industries/healthcare",
  "/about",
  "/contact",
];

test.describe("SEO and GEO surface", () => {
  for (const path of PAGES) {
    test(`${path} declares canonical, description and Open Graph`, async ({ page }) => {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute(
        "href",
        new RegExp(`dyvixitsolutions\\.com${path === "/" ? "/?$" : path}`),
      );

      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc?.length ?? 0).toBeGreaterThan(80);

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    });
  }

  test("exactly one h1 per page", async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      expect(await page.locator("h1").count(), path).toBe(1);
    }
  });

  test("homepage emits Organization, WebSite and FAQPage nodes", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.flatMap((b) => {
      const parsed = JSON.parse(b);
      return (parsed["@graph"] ?? [parsed]).map((n: { "@type": string }) => n["@type"]);
    });
    expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "FAQPage"]));
  });

  test("solution pages link Service to the Organization node", async ({ page }) => {
    await page.goto("/solutions/cybersecurity");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = blocks.flatMap((b) => JSON.parse(b)["@graph"] ?? []);
    const service = nodes.find((n: { "@type": string }) => n["@type"] === "Service");
    expect(service.provider["@id"]).toContain("#organization");
  });

  test("sitemap lists every solution and industry", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const slug of ["cybersecurity", "infrastructure-cloud", "managed-services"]) {
      expect(xml).toContain(`/solutions/${slug}`);
    }
    expect(xml).toContain("/industries/financial-services");
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

  test("404 returns the correct status and a helpful page", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("does not resolve");
  });
});
