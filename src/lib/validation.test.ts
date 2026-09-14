import { describe, expect, test } from "vitest";
import { en } from "@/i18n/dictionaries/en";
import { enquirySchema } from "./validation";

const valid = {
  name: "Amina Njoya",
  organisation: "Meridian Microfinance",
  email: "amina@example.cm",
  phone: "+237 6 00 00 00 00",
  scopes: ["cybersecurity"] as const,
  timeline: "quarter" as const,
  message: "Our branch links drop weekly and we have never tested a restore.",
  website: "",
};

describe("enquirySchema", () => {
  test("accepts a complete, well-formed enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });

  test("accepts an enquiry with no phone number", () => {
    const { phone: _phone, ...rest } = valid;
    expect(enquirySchema.safeParse(rest).success).toBe(true);
  });

  test("rejects a malformed email address", () => {
    expect(enquirySchema.safeParse({ ...valid, email: "amina@" }).success).toBe(false);
  });

  test("rejects an empty scope selection with the language-free code", () => {
    const result = enquirySchema.safeParse({ ...valid, scopes: [] });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0]!.message).toBe("scopes");
  });

  test("every message it produces is a dictionary key the form can render", () => {
    const result = enquirySchema.safeParse({
      name: "",
      organisation: "",
      email: "x",
      scopes: [],
      timeline: "x",
      message: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      for (const issue of result.error.issues)
        expect(en.form.errors, issue.message).toHaveProperty(issue.message);
    }
  });

  test("rejects a scope outside the allowed set", () => {
    expect(enquirySchema.safeParse({ ...valid, scopes: ["quantum-blockchain"] }).success).toBe(
      false,
    );
  });

  test("rejects a message too short to route", () => {
    expect(enquirySchema.safeParse({ ...valid, message: "hi" }).success).toBe(false);
  });

  test("rejects a message beyond the length cap", () => {
    expect(enquirySchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false);
  });

  test("accepts a filled honeypot so the route can absorb it silently", () => {
    // Rejecting here would return a 422 naming the field and teach a bot how
    // to get through. Enforcement lives in the route handler instead.
    const result = enquirySchema.safeParse({ ...valid, website: "http://spam.example" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("http://spam.example");
  });

  test("trims surrounding whitespace from free-text fields", () => {
    const result = enquirySchema.safeParse({ ...valid, name: "   Amina Njoya   " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Amina Njoya");
  });

  test("rejects an unknown timeline value", () => {
    expect(enquirySchema.safeParse({ ...valid, timeline: "someday" }).success).toBe(false);
  });
});
