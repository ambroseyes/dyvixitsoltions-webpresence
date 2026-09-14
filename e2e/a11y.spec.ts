import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/expertise",
  "/expertise/cybersecurity",
  "/expertise/iot-edge",
  "/solutions",
  "/solutions/back-node",
  "/industries",
  "/industries/healthcare",
  "/projects",
  "/insights",
  "/insights/multi-wan-failover-that-actually-fails-over",
  "/about",
  "/contact",
  "/request-audit",
  "/privacy",
  "/legal",
  "/fr",
  "/fr/expertise/cybersecurity",
  "/fr/solutions",
  "/fr/about",
  "/fr/contact",
];

/**
 * WebKit follows the macOS default, where Tab skips links and buttons unless
 * "Press Tab to highlight each item" is turned on; Option+Tab reaches every
 * control, which is what a keyboard user on Safari actually presses.
 */
const tabKey = (browserName: string) => (browserName === "webkit" ? "Alt+Tab" : "Tab");

test.describe("accessibility", () => {
  for (const path of PAGES) {
    test(`${path} has no WCAG 2.2 A/AA violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      // Surface the rule ids in the failure message rather than a raw dump.
      expect(
        results.violations.map(
          (v) =>
            `${v.id} (${v.nodes.length}): ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(" "))
              .join(", ")}`,
        ),
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

  test("skip link is the first focusable element and reaches main", async ({
    page,
    browserName,
  }) => {
    await page.goto("/");
    await page.keyboard.press(tabKey(browserName));
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#main")).toBeVisible();
  });

  test("every interactive control is reachable by keyboard in the header", async ({
    page,
    browserName,
  }) => {
    await page.goto("/");
    const reached: string[] = [];
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press(tabKey(browserName));
      reached.push(
        await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          return el
            ? `${el.tagName}:${(el.innerText || el.getAttribute("aria-label") || "").slice(0, 24)}`
            : "none";
        }),
      );
    }
    // Case-insensitive: on mobile the header nav is in the drawer, and the
    // first "expertise" reached is the hero's "Explore our expertise".
    expect(reached.join(" | ")).toMatch(/expertise/i);
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
