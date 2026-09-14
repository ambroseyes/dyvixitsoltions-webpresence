import { expect, type Locator, type Page } from "@playwright/test";
import { en } from "../src/i18n/dictionaries/en";

/**
 * Opens the command palette with its keyboard shortcut.
 *
 * page.goto resolves on "load", which can come before hydration: a shortcut
 * pressed before CommandMenu's effect attaches its keydown listener is lost,
 * and under a loaded test run that happens. So retry until the dialog shows —
 * checking first, because the shortcut toggles and a second press that lands
 * after the first would close it again.
 *
 * Control rather than Meta: headless shell swallows Cmd+K on macOS, and the
 * handler accepts either modifier, so this covers the same path.
 */
export async function openPaletteWithShortcut(
  page: Page,
  name = en.command.dialogLabel,
): Promise<Locator> {
  const dialog = page.getByRole("dialog", { name });
  await expect(async () => {
    if (!(await dialog.isVisible())) await page.keyboard.press("Control+k");
    await expect(dialog).toBeVisible({ timeout: 1_000 });
  }).toPass();
  return dialog;
}
