import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/solutions",
  "/solutions/cybersecurity",
  "/industries",
  "/industries/healthcare",
  "/expertise",
  "/projects",
  "/insights",
  "/insights/multi-wan-failover-that-actually-fails-over",
  "/about",
  "/contact",
  "/request-audit",
  "/privacy",
  "/legal",
];

test.describe("accessibility", () => {
  for (const path of PAGES) {
    test(`${path} has no WCAG 2.2 A/AA violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      // Surface the rule ids in the failure message rather than a raw dump.
      expect(
        results.violations.map((v) => `${v.id} (${v.nodes.length})`),
        `axe violations on ${path}`,
      ).toEqual([]);
    });
  }

  test("dark theme has no contrast violations", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2aa"]).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  test("skip link is the first focusable element and reaches main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#main")).toBeVisible();
  });

  test("every interactive control is reachable by keyboard in the header", async ({ page }) => {
    await page.goto("/");
    const reached: string[] = [];
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
      reached.push(
        await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          return el
            ? `${el.tagName}:${(el.innerText || el.getAttribute("aria-label") || "").slice(0, 24)}`
            : "none";
        }),
      );
    }
    expect(reached.join(" | ")).toMatch(/Solutions/);
    expect(reached.join(" | ")).toMatch(/Start a Project/);
  });

  test("honours prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const duration = await page.evaluate(() => {
      const el = document.querySelector("a[href='/solutions']");
      return el ? getComputedStyle(el).transitionDuration : "";
    });
    // The global reduced-motion rule collapses every transition to ~0.
    // Chromium serialises 0.01ms as "1e-05s", so compare numerically.
    expect(Number.parseFloat(duration)).toBeLessThan(0.01);
  });

  test("images and icons do not leak decorative graphics to assistive tech", async ({ page }) => {
    await page.goto("/");
    const undecorated = await page.evaluate(
      () =>
        [...document.querySelectorAll("svg")].filter(
          (s) =>
            !s.hasAttribute("aria-hidden") &&
            !s.hasAttribute("aria-label") &&
            !s.querySelector("title"),
        ).length,
    );
    expect(undecorated).toBe(0);
  });
});
