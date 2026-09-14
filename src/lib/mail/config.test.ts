import { describe, expect, test } from "vitest";
import { site } from "@/lib/site";
import { readMailConfig } from "./config";

const complete = {
  SMTP_HOST: "mail.dyvixitsolutions.com",
  SMTP_USER: "site@dyvixitsolutions.com",
  SMTP_PASS: "correct horse battery staple",
};

describe("readMailConfig", () => {
  test("defaults to implicit TLS on 465 and to the public contact address", () => {
    expect(readMailConfig(complete)).toEqual({
      ok: true,
      config: {
        host: "mail.dyvixitsolutions.com",
        port: 465,
        user: "site@dyvixitsolutions.com",
        pass: "correct horse battery staple",
        to: site.contact.email,
      },
    });
  });

  test("takes an explicit port and recipient, trimming stray spaces", () => {
    const result = readMailConfig({
      ...complete,
      SMTP_HOST: "  mail.example.cm ",
      SMTP_PORT: " 587 ",
      ENQUIRY_TO_EMAIL: " sales@dyvixitsolutions.com ",
    });
    expect(result).toMatchObject({
      ok: true,
      config: { host: "mail.example.cm", port: 587, to: "sales@dyvixitsolutions.com" },
    });
  });

  test("names every missing variable", () => {
    expect(readMailConfig({})).toEqual({
      ok: false,
      problems: ["SMTP_HOST is missing", "SMTP_USER is missing", "SMTP_PASS is missing"],
    });
  });

  test("treats blank values as missing", () => {
    expect(readMailConfig({ ...complete, SMTP_HOST: "   ", SMTP_PASS: "" })).toEqual({
      ok: false,
      problems: ["SMTP_HOST is missing", "SMTP_PASS is missing"],
    });
  });

  test.each(["smtp", "0", "65536", "25.5"])("rejects SMTP_PORT=%s", (port) => {
    expect(readMailConfig({ ...complete, SMTP_PORT: port })).toEqual({
      ok: false,
      problems: ["SMTP_PORT is not a port number"],
    });
  });

  test("requires an address wherever one is expected", () => {
    expect(readMailConfig({ ...complete, SMTP_USER: "site", ENQUIRY_TO_EMAIL: "contact" })).toEqual(
      {
        ok: false,
        problems: [
          "SMTP_USER is not an e-mail address",
          "ENQUIRY_TO_EMAIL is not an e-mail address",
        ],
      },
    );
  });

  test("never echoes a value, so its problems are safe to log", () => {
    const result = JSON.stringify(readMailConfig({ SMTP_PASS: "s3cret-value", SMTP_PORT: "nope" }));
    expect(result).not.toContain("s3cret-value");
    expect(result).not.toContain("nope");
  });
});
