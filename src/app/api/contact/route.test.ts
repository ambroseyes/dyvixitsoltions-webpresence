// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/mail/send", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/mail/send")>()),
  sendMail: vi.fn(),
}));

import { sendMail } from "@/lib/mail/send";
import { POST } from "./route";

const valid = {
  name: "Amina Njoya",
  organisation: "Meridian Microfinance",
  email: "amina@example.cm",
  scopes: ["cybersecurity"],
  timeline: "quarter",
  message: "Our branch links drop weekly and backups are untested.",
  locale: "fr",
};

const SMTP = {
  SMTP_HOST: "mail.dyvixitsolutions.com",
  SMTP_USER: "site@dyvixitsolutions.com",
  SMTP_PASS: "pw",
};
const configure = (env: Record<string, string>) => {
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
};

let client = 0;
const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      // A fresh client address per request, so the rate limit stays out of the way.
      headers: { "content-type": "application/json", "x-forwarded-for": `198.51.100.${++client}` },
      body: JSON.stringify(body),
    }),
  );

describe("POST /api/contact — delivery", () => {
  beforeEach(() => {
    vi.mocked(sendMail).mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  const loggedLine = () => String(vi.mocked(console.error).mock.calls[0]?.[0]);

  test("sends the enquiry to the team and returns its reference", async () => {
    configure(SMTP);
    vi.mocked(sendMail).mockResolvedValue(undefined);

    const res = await post(valid);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, error: null });
    expect(body.data.reference).toMatch(/^DYX-[A-HJKMNP-Z2-9]{6}$/);

    const [config, message] = vi.mocked(sendMail).mock.calls[0]!;
    expect(config).toMatchObject({
      host: "mail.dyvixitsolutions.com",
      to: "contact@dyvixitsolutions.com",
    });
    expect(message.subject).toContain(body.data.reference);
    expect(message.replyTo).toEqual({ name: "Amina Njoya", address: "amina@example.cm" });
    expect(message.text).toContain("français");
  });

  test("answers 502 'delivery' when the mail server fails, and logs no personal data", async () => {
    configure(SMTP);
    vi.mocked(sendMail).mockRejectedValue(
      Object.assign(new Error("Invalid login: 535"), { code: "EAUTH", responseCode: 535 }),
    );

    const res = await post(valid);

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ success: false, data: null, error: "delivery" });
    expect(loggedLine()).toMatch(/^\[enquiry\] DYX-\w{6} not sent: EAUTH 535/);
    expect(loggedLine()).not.toContain("amina@example.cm");
    expect(loggedLine()).not.toContain("Meridian");
  });

  test("answers 503 'delivery' when mail is not configured, and says what is missing", async () => {
    configure({ SMTP_HOST: "", SMTP_USER: "", SMTP_PASS: "" });

    const res = await post(valid);

    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ success: false, data: null, error: "delivery" });
    expect(sendMail).not.toHaveBeenCalled();
    expect(loggedLine()).toContain("SMTP_HOST is missing");
  });

  test("drops a filled honeypot without sending anything", async () => {
    configure(SMTP);

    const res = await post({ ...valid, website: "http://spam.example" });

    expect(res.status).toBe(200);
    expect((await res.json()).data.reference).toBe("DYX-000000");
    expect(sendMail).not.toHaveBeenCalled();
  });
});
