import { test, expect } from "@playwright/test";
import { fr } from "../src/i18n/dictionaries/fr";
import { en } from "../src/i18n/dictionaries/en";
import { expertiseFr } from "../src/content/expertise/fr";
import { openPaletteWithShortcut } from "./helpers";

test.describe("bilingual routing", () => {
  test("English lives at the root and French under /fr, each with its <html lang>", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.goto("/fr");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(fr.home.hero.headline3);
  });

  test("the language switch keeps the page and updates the document language", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "the header link is desktop-only; the drawer repeats it");
    await page.goto("/expertise/cybersecurity");

    const toFrench = page.getByRole("link", { name: en.nav.languageLinkAria });
    await expect(toFrench).toHaveAttribute("href", "/fr/expertise/cybersecurity");
    await toFrench.click();

    await expect(page).toHaveURL(/\/fr\/expertise\/cybersecurity$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByRole("link", { name: fr.nav.languageLinkAria })).toHaveAttribute(
      "href",
      "/expertise/cybersecurity",
    );
  });

  test("links on a French page stay in French", async ({ page }) => {
    await page.goto("/fr/expertise");
    const hrefs = await page
      .locator("main a[href^='/']")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? ""));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const h of hrefs) expect(h).toMatch(/^\/fr(\/|#|\?|$)/);
  });

  test("the /en prefix is not a second address for English pages", async ({ page }) => {
    await page.goto("/en/about");
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("an unsupported locale prefix is a 404, not a page", async ({ page }) => {
    const res = await page.goto("/de/about");
    expect(res?.status()).toBe(404);
  });

  test("the French palette finds a domain typed without accents", async ({ page }) => {
    await page.goto("/fr");
    await openPaletteWithShortcut(page, fr.command.dialogLabel);
    await page.getByRole("combobox", { name: fr.command.inputLabel }).fill("securite");
    await expect(page.getByRole("option").first()).toHaveText(expertiseFr.cybersecurity.name);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/fr\/expertise\/cybersecurity$/);
  });
});
