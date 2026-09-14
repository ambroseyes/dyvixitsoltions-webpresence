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
  // Both languages: French labels run longer and overflowed where English fit.
  for (const path of ["/", "/fr"]) {
    for (const width of [320, 375, 768, 1024, 1440, 1920]) {
      test(`${path} has no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const overflow = await page.evaluate(() => {
          const d = document.documentElement;
          return d.scrollWidth - d.clientWidth;
        });
        expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
      });
    }
  }

  /**
   * The desktop header appears at 1024px. A label that wraps there (French
   * "À propos" did) means the row is out of room before it overflows. Every
   * control is a single line of text: 44px at most, including touch padding.
   */
  for (const path of ["/", "/fr"]) {
    for (const width of [1024, 1280]) {
      test(`${path} keeps every header control on one line at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const wrapped = await page.locator("header").evaluate((header) =>
          [...header.querySelectorAll("a, button")]
            .map((el) => ({ text: el.textContent?.trim(), box: el.getBoundingClientRect() }))
            .filter(({ box }) => box.width > 0 && box.height > 48)
            .map(({ text, box }) => `${text} (${Math.round(box.height)}px)`),
        );
        expect(wrapped).toEqual([]);
      });
    }
  }
});
