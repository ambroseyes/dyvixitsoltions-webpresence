import { test, expect } from "@playwright/test";

test.describe("enquiry form", () => {
  test("blocks progress until a scope is chosen, then advances", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("alert").filter({ hasText: /at least one/i })).toBeVisible();

    await form.getByText("Cybersecurity", { exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("group", { name: "Give us the context." })).toBeVisible();
  });

  test("prefills the scope from the query string", async ({ page }) => {
    await page.goto("/contact?scope=applied-ai");
    const preset = page.locator("label").filter({ hasText: /^Applied AI$/ });
    await expect(preset.locator("input[type=checkbox]")).toBeChecked();
  });

  test("completes end to end and shows a reference", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");

    await form.getByText("Cybersecurity", { exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await form.getByText("This quarter", { exact: true }).click();
    await page
      .getByLabel("What should we know?")
      .fill("Our branch links drop weekly and we have never tested a restore from backup.");
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByLabel("Your name").fill("Amina Njoya");
    await page.getByLabel("Organisation").fill("Meridian Microfinance");
    await page.getByLabel("Work email").fill("amina@example.cm");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.getByRole("heading", { name: /Received/ })).toBeVisible();
    await expect(page.getByText(/DYX-/)).toBeVisible();
  });

  test("surfaces an inline error for a malformed email", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await form.getByText("Cybersecurity", { exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await form.getByText("This quarter", { exact: true }).click();
    await page.getByLabel("What should we know?").fill("A message long enough to pass validation.");
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByLabel("Your name").fill("Amina");
    await page.getByLabel("Organisation").fill("Meridian");
    await page.getByLabel("Work email").fill("not-an-email");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.getByRole("alert").filter({ hasText: /valid email/i })).toBeVisible();
  });
});

test.describe("contact API", () => {
  test("rejects an invalid payload with 422 and field errors", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { name: "x" } });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.fieldErrors).toBeTruthy();
  });

  test("rejects a non-POST method", async ({ request }) => {
    expect((await request.get("/api/contact")).status()).toBe(405);
  });

  test("silently absorbs a filled honeypot without revealing why", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Bot",
        organisation: "Bot Co",
        email: "bot@example.com",
        scopes: ["applied-ai"],
        timeline: "urgent",
        message: "This is spam content long enough to pass length validation.",
        website: "http://spam.example",
      },
    });
    // A 200 with a dummy reference: the bot learns nothing from the response.
    expect(res.status()).toBe(200);
    expect((await res.json()).data.reference).toBe("DYX-000000");
  });
});
