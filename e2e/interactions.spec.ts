import { test, expect } from "@playwright/test";

test.describe("homepage interactions", () => {
  test("solution finder maps a problem to a scoped engagement", async ({ page }) => {
    await page.goto("/#solution-finder");
    await expect(page.getByText("Awaiting selection")).toBeVisible();

    await page.getByRole("button", { name: "I need better cybersecurity." }).click();
    await expect(page.getByRole("heading", { name: "Security Posture Assessment" })).toBeVisible();
    await expect(page.getByText("Firewall and perimeter configuration review")).toBeVisible();

    await page.getByRole("button", { name: "Reset" }).click();
    await expect(page.getByText("Awaiting selection")).toBeVisible();
  });

  test("problem tabs follow the ARIA tabs pattern and respond to arrow keys", async ({ page }) => {
    await page.goto("/#problems");
    const tablist = page.getByRole("tablist", { name: "Common technology risks" });
    const first = tablist.getByRole("tab").first();

    await first.click();
    await expect(first).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("ArrowDown");
    const second = tablist.getByRole("tab").nth(1);
    await expect(second).toBeFocused();
    await expect(second).toHaveAttribute("aria-selected", "true");
    await expect(first).toHaveAttribute("aria-selected", "false");
  });

  test("capability graph shows all nine domains and swaps its detail panel", async ({ page }) => {
    await page.goto("/");
    const detail = page.locator("#ecosystem-detail");
    await expect(detail).toContainText("Digital & Software Engineering");
    await expect(
      page.locator("#ecosystem-detail").locator("xpath=preceding-sibling::div//button"),
    ).toHaveCount(9);

    await page.getByRole("button", { name: "Security", exact: true }).click();
    await expect(detail).toContainText("digital threats");
  });
});
