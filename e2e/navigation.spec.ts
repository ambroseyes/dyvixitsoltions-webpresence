import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test.skip(({ isMobile }) => !!isMobile, "desktop mega menu");

  test("mega menu opens, exposes leaves and closes on Escape", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Solutions" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("link", { name: "Cybersecurity & DevSecOps", exact: true }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("command palette opens on the keyboard shortcut and navigates", async ({ page }) => {
    await page.goto("/");
    // Control rather than Meta: headless shell swallows Cmd+K on macOS.
    // The handler accepts either modifier, so this covers the same path.
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Search and commands" });
    await expect(dialog).toBeVisible();

    await page.getByRole("combobox", { name: "Search" }).fill("firewall");
    // Deterministic wait: assert the list has narrowed before acting on it.
    await expect(page.getByRole("option")).toHaveCount(1);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/solutions\/cybersecurity$/);
  });

  test("command palette closes on Escape and restores focus", async ({ page }) => {
    await page.goto("/");
    const opener = page.getByRole("button", { name: /Search/ });
    await opener.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test("theme toggle cycles light, dark and system", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /Theme|theme/ });
    const isDark = () => page.evaluate(() => document.documentElement.classList.contains("dark"));

    await toggle.click();
    const first = await isDark();
    await toggle.click();
    expect(await isDark()).not.toBe(first);
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("drawer opens, lists solutions and navigates", async ({ page }) => {
    await page.goto("/");
    // Located by aria-controls: the accessible name flips to "Close menu"
    // once open, so a name-based locator would stop resolving after the click.
    const burger = page.locator('[aria-controls="mobile-nav"]');
    await burger.click();
    await expect(burger).toHaveAttribute("aria-expanded", "true");

    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Cybersecurity & DevSecOps", exact: true }).click();
    await expect(page).toHaveURL(/\/solutions\/cybersecurity$/);
  });
});

test.describe("overlay geometry", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  /**
   * Regression: the header uses backdrop-filter, which makes it a containing
   * block for `position: fixed` descendants. When the drawer lived inside the
   * header it computed to 1px tall and rendered behind the page content.
   */
  test("mobile drawer fills the viewport below the header", async ({ page }) => {
    await page.goto("/");
    await page.locator('[aria-controls="mobile-nav"]').click();

    const box = await page.locator("#mobile-nav").boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThan(600);
    expect(box!.width).toBe(375);
  });

  test("command palette overlay covers the whole viewport", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    const overlay = page.locator('[role="dialog"]').locator("xpath=..");
    const box = await overlay.boundingBox();
    expect(box!.height).toBeGreaterThan(700);
  });
});
