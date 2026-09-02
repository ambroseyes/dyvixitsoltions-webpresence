import { describe, expect, test } from "vitest";
import { STEP_FIELDS, SCOPES, TIMELINES, validateEnquiry } from "./enquiry-rules";

const valid = {
  name: "Amina Njoya",
  organisation: "Meridian Microfinance",
  email: "amina@example.cm",
  phone: "+237 6 00 00 00 00",
  scopes: ["cybersecurity"],
  timeline: "quarter",
  message: "Our branch links drop weekly and we have never tested a restore.",
  website: "",
};

describe("validateEnquiry (client-side, dependency-free)", () => {
  test("returns no errors for a valid enquiry", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  test("accepts a missing phone number", () => {
    const { phone: _phone, ...rest } = valid;
    expect(validateEnquiry(rest)).toEqual({});
  });

  test.each([
    ["name", { name: "A" }],
    ["organisation", { organisation: "" }],
    ["email", { email: "amina@" }],
    ["email", { email: "no-at-sign" }],
    ["scopes", { scopes: [] }],
    ["scopes", { scopes: ["quantum-blockchain"] }],
    ["timeline", { timeline: "someday" }],
    ["message", { message: "too short" }],
  ])("flags %s", (field, override) => {
    expect(validateEnquiry({ ...valid, ...override })).toHaveProperty(field);
  });

  test("flags values beyond their length caps", () => {
    expect(validateEnquiry({ ...valid, name: "x".repeat(121) })).toHaveProperty("name");
    expect(validateEnquiry({ ...valid, message: "x".repeat(4001) })).toHaveProperty("message");
    expect(validateEnquiry({ ...valid, phone: "9".repeat(41) })).toHaveProperty("phone");
  });

  test("ignores surrounding whitespace when measuring length", () => {
    expect(validateEnquiry({ ...valid, name: "  A  " })).toHaveProperty("name");
    expect(validateEnquiry({ ...valid, name: "  Amina  " })).not.toHaveProperty("name");
  });

  test("does not flag a filled honeypot — the route absorbs it silently", () => {
    expect(validateEnquiry({ ...valid, website: "http://spam.example" })).toEqual({});
  });
});

describe("step field ownership", () => {
  test("covers every validated field exactly once", () => {
    const flat = STEP_FIELDS.flat();
    expect(new Set(flat).size).toBe(flat.length);
    expect(flat.sort()).toEqual(
      ["email", "message", "name", "organisation", "phone", "scopes", "timeline"].sort(),
    );
  });
});

/**
 * The two validators are derived from one set of constants but are separate
 * implementations, so this pins their agreement on the cases that matter.
 */
describe("client and server validators agree", () => {
  test.each([
    ["valid enquiry", valid, true],
    ["bad email", { ...valid, email: "amina@" }, false],
    ["no scope", { ...valid, scopes: [] }, false],
    ["short message", { ...valid, message: "hi" }, false],
    ["unknown timeline", { ...valid, timeline: "someday" }, false],
    ["filled honeypot", { ...valid, website: "http://spam.example" }, true],
  ])("%s", async (_label, input, expected) => {
    const { enquirySchema } = await import("./validation");
    const clientOk = Object.keys(validateEnquiry(input)).length === 0;
    const serverOk = enquirySchema.safeParse(input).success;
    expect(clientOk).toBe(expected);
    expect(serverOk).toBe(expected);
  });

  test("both accept every declared scope and timeline", async () => {
    const { enquirySchema } = await import("./validation");
    for (const scope of SCOPES) {
      for (const timeline of TIMELINES) {
        const input = { ...valid, scopes: [scope], timeline };
        expect(validateEnquiry(input), `${scope}/${timeline}`).toEqual({});
        expect(enquirySchema.safeParse(input).success, `${scope}/${timeline}`).toBe(true);
      }
    }
  });
});
