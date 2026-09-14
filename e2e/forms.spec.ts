import { test, expect, type APIRequestContext, type Page } from "@playwright/test";
import { en } from "../src/i18n/dictionaries/en";
import { fr } from "../src/i18n/dictionaries/fr";
import sink from "./support/sink.json";

type Mailbox = { address: string; name: string };
type SinkMessage = {
  authUser: string;
  envelope: { from: string; to: string[] };
  from: Mailbox | null;
  replyTo: Mailbox | null;
  subject: string;
  text: string;
};

/**
 * What the local SMTP sink has received. The route answers only after the
 * mail server accepted the message, so by then it is already listed.
 */
const received = async (request: APIRequestContext): Promise<SinkMessage[]> =>
  (await request.get(`http://${sink.host}:${sink.httpPort}/messages`)).json();

const messageFor = async (request: APIRequestContext, reference: string) =>
  (await received(request)).find((message) => message.subject.includes(reference));

/** Walks the three steps as a visitor would, then sends. */
async function sendEnquiry(page: Page, message: string) {
  await page.goto("/contact");
  const form = page.locator("form");

  await form.getByText("Cybersecurity", { exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await form.getByText("This quarter", { exact: true }).click();
  await page.getByLabel("What should we know?").fill(message);
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Your name").fill("Amina Njoya");
  await page.getByLabel("Organisation").fill("Meridian Microfinance");
  await page.getByLabel("Work email").fill("amina@example.cm");
  await page.getByRole("button", { name: "Send enquiry" }).click();
}

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

  /**
   * Regression: "Continue" and "Send" used to be one reused <button> whose
   * type flipped to submit during the click, so the browser submitted the
   * form the moment the last step appeared and flagged every empty field.
   */
  test("opens the details step without submitting or flagging anything", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await form.getByText("Cybersecurity", { exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await form.getByText("This quarter", { exact: true }).click();
    await page
      .getByLabel("What should we know?")
      .fill("Our branch links drop weekly and we have never tested a restore.");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByLabel("Your name")).toBeVisible();
    await expect(form.getByRole("alert")).toHaveCount(0);
  });

  test("prefills the scope from the query string", async ({ page }) => {
    await page.goto("/contact?scope=ai-data");
    const preset = page.locator("label").filter({ hasText: /^AI, data & automation$/ });
    await expect(preset.locator("input[type=checkbox]")).toBeChecked();
  });

  test("completes end to end, and the team receives it by e-mail", async ({ page, request }) => {
    const message = "Our branch links drop weekly and we have never tested a restore from backup.";
    await sendEnquiry(page, message);

    await expect(page.getByRole("heading", { name: /Received/ })).toBeVisible();
    const shown = await page.getByText(/DYX-/).textContent();
    const reference = shown?.match(/DYX-[A-Z0-9]{6}/)?.[0];
    expect(reference).toBeTruthy();

    const mail = await messageFor(request, reference!);
    expect(mail).toMatchObject({
      authUser: sink.user,
      envelope: { from: sink.user, to: ["contact@dyvixitsolutions.com"] },
      replyTo: { address: "amina@example.cm", name: "Amina Njoya" },
    });
    for (const expected of [
      "Meridian Microfinance",
      fr.form.scopes.cybersecurity,
      fr.form.timelines.quarter,
      message,
      "anglais",
    ]) {
      expect(mail?.text).toContain(expected);
    }
  });

  test("tells the visitor when the enquiry could not be sent, and keeps their answers", async ({
    page,
  }) => {
    await sendEnquiry(page, `The mail server will refuse this one. ${sink.rejectMarker}`);

    await expect(
      page.getByRole("alert").filter({ hasText: en.form.errors.delivery }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Received/ })).toHaveCount(0);
    await expect(page.getByLabel("Your name")).toHaveValue("Amina Njoya");
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

  test("speaks French on the French page", async ({ page }) => {
    await page.goto("/fr/contact");
    await page.getByRole("button", { name: fr.form.continue }).click();
    await expect(page.getByRole("alert").filter({ hasText: fr.form.errors.scopes })).toBeVisible();
  });
});

test.describe("contact API", () => {
  const enquiry = {
    name: "Amina Njoya",
    organisation: "Meridian Microfinance",
    email: "amina@example.cm",
    scopes: ["ai-data"],
    timeline: "urgent",
    message: "We need our data platform audited before the next board meeting.",
  };

  test("rejects an invalid payload with 422, a code and field errors", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { name: "x" } });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe("review");
    expect(body.fieldErrors).toBeTruthy();
  });

  test("rejects a non-POST method", async ({ request }) => {
    expect((await request.get("/api/contact")).status()).toBe(405);
  });

  test("delivers a valid enquiry by e-mail and returns its reference", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...enquiry, locale: "fr" } });
    expect(res.status()).toBe(200);
    const { data } = await res.json();
    expect(data.reference).toMatch(/^DYX-[A-HJKMNP-Z2-9]{6}$/);

    const mail = await messageFor(request, data.reference);
    expect(mail?.text).toContain("français");
    expect(mail?.text).toContain(fr.form.scopes["ai-data"]);
  });

  test("answers 502 with the delivery code when the mail server refuses", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { ...enquiry, message: `${enquiry.message} ${sink.rejectMarker}` },
    });
    expect(res.status()).toBe(502);
    expect(await res.json()).toEqual({ success: false, data: null, error: "delivery" });
  });

  test("silently absorbs a filled honeypot without revealing why", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Bot",
        organisation: "Bot Co",
        email: "bot@example.com",
        scopes: ["ai-data"],
        timeline: "urgent",
        message: "This is spam content long enough to pass length validation.",
        website: "http://spam.example",
      },
    });
    // A 200 with a dummy reference: the bot learns nothing from the response.
    expect(res.status()).toBe(200);
    expect((await res.json()).data.reference).toBe("DYX-000000");
    // Dropped, not delivered: nothing from the bot reaches the team.
    expect((await received(request)).some((m) => m.text.includes("Bot Co"))).toBe(false);
  });
});
