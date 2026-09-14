import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("renders the hero and the canonical positioning", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Systems");
    await expect(h1).toContainText("Engineered here");
  });

  test("states the entity, contact and geography without any interaction", async ({ page }) => {
    await page.goto("/");
    const body = await page.locator("body").innerText();
    expect(body).toContain("digital and technology engineering company");
    expect(body).toContain("contact@dyvixitsolutions.com");
    expect(body).toContain("Cameroon");
  });

  test("shows all nine domains", async ({ page }) => {
    await page.goto("/");
    const grid = page.locator("#expertise");
    await expect(grid.getByRole("link")).toHaveCount(9);
  });

  test("both primary calls to action are present and routed", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Start a Project" }).first()).toBeVisible();
    await page.getByRole("link", { name: "Explore our expertise" }).click();
    await expect(page).toHaveURL(/\/expertise$/);
  });

  test("logs no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/", { waitUntil: "networkidle" });
    expect(errors).toEqual([]);
  });

  // 320 is the narrowest width the responsive rules require support for.
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(() => {
        const d = document.documentElement;
        return d.scrollWidth - d.clientWidth;
      });
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
    });
  }
});
