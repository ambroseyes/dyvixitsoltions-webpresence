import { describe, expect, test } from "vitest";
import { newEnquiryReference } from "./enquiry-reference";

describe("newEnquiryReference", () => {
  test("reads well aloud: DYX- then six characters, never 0/O or 1/I/L", () => {
    for (let i = 0; i < 200; i++) {
      expect(newEnquiryReference()).toMatch(/^DYX-[A-HJKMNP-Z2-9]{6}$/);
    }
  });

  test("does not repeat from one enquiry to the next", () => {
    const references = Array.from({ length: 100 }, () => newEnquiryReference());
    expect(new Set(references).size).toBe(references.length);
  });
});
