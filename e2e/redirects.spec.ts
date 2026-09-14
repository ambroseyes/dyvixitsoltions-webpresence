import { test, expect } from "@playwright/test";

const pathOf = (location: string | undefined) =>
  new URL(location ?? "", "http://placeholder").pathname;

test.describe("redirects", () => {
  for (const [from, to] of [
    ["/service/1", "/fr/expertise"],
    ["/service/6", "/fr/expertise"],
    ["/news", "/fr/insights"],
    ["/politics", "/fr/privacy"],
  ]) {
    test(`the previous site's ${from} redirects permanently to ${to}`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(pathOf(res.headers().location)).toBe(to);
    });
  }

  test("www redirects to the canonical host", async ({ request }) => {
    const res = await request.get("/about", {
      headers: { host: "www.dyvixitsolutions.com" },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toBe("https://dyvixitsolutions.com/about");
  });
});
