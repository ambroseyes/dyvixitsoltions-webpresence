import { describe, expect, test } from "vitest";
import { en } from "@/i18n/dictionaries/en";
import { STEP_FIELDS, SCOPES, TIMELINES, isScope, validateEnquiry } from "./enquiry-rules";

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
    ["name", { name: "A" }, "name"],
    ["organisation", { organisation: "" }, "organisation"],
    ["email", { email: "amina@" }, "email"],
    ["email", { email: "no-at-sign" }, "email"],
    ["scopes", { scopes: [] }, "scopes"],
    ["scopes", { scopes: ["quantum-blockchain"] }, "scopes"],
    ["timeline", { timeline: "someday" }, "timeline"],
    ["message", { message: "too short" }, "message"],
    ["name", { name: "x".repeat(121) }, "nameLong"],
    ["message", { message: "x".repeat(4001) }, "messageLong"],
    ["phone", { phone: "9".repeat(41) }, "phoneLong"],
  ] as const)("flags %s with the %s-appropriate code", (field, override, code) => {
    expect(validateEnquiry({ ...valid, ...override })[field]).toBe(code);
  });

  test("every error code has copy in the dictionary", () => {
    const codes = [
      validateEnquiry({
        ...valid,
        name: "",
        organisation: "",
        email: "",
        scopes: [],
        timeline: "",
        message: "",
      }),
      validateEnquiry({
        ...valid,
        name: "x".repeat(121),
        organisation: "x".repeat(161),
        phone: "9".repeat(41),
        message: "x".repeat(4001),
      }),
    ].flatMap((e) => Object.values(e));
    expect(codes.length).toBeGreaterThan(0);
    for (const code of codes) expect(en.form.errors, code).toHaveProperty(code);
  });

  test("ignores surrounding whitespace when measuring length", () => {
    expect(validateEnquiry({ ...valid, name: "  A  " })).toHaveProperty("name");
    expect(validateEnquiry({ ...valid, name: "  Amina  " })).not.toHaveProperty("name");
  });

  test("does not flag a filled honeypot — the route absorbs it silently", () => {
    expect(validateEnquiry({ ...valid, website: "http://spam.example" })).toEqual({});
  });
});

describe("scopes", () => {
  test("every scope has a label in the dictionary", () => {
    for (const s of SCOPES) expect(en.form.scopes, s).toHaveProperty(s);
  });

  test("isScope accepts declared scopes only", () => {
    expect(isScope("iot-edge")).toBe(true);
    expect(isScope("applied-ai")).toBe(false);
  });
});

describe("step field ownership", () => {
  test("covers every validated field exactly once", () => {
    const flat = STEP_FIELDS.flat();
    expect(new Set(flat).size).toBe(flat.length);
    expect([...flat].sort()).toEqual(
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
