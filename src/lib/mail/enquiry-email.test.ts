import { describe, expect, test } from "vitest";
import { fr } from "@/i18n/dictionaries/fr";
import type { Enquiry } from "@/lib/validation";
import { composeEnquiryEmail, oneLine } from "./enquiry-email";

const NBSP = String.fromCharCode(0xa0);

const enquiry: Enquiry = {
  name: "Amina Njoya",
  organisation: "Meridian Microfinance",
  email: "amina@example.cm",
  phone: "+237 6 99 00 00 00",
  scopes: ["cybersecurity", "audit"],
  timeline: "quarter",
  message: "Our branch links drop weekly.\nWe have never tested a restore.",
  locale: "en",
};

const context = {
  reference: "DYX-ABC234",
  from: "site@dyvixitsolutions.com",
  to: "contact@dyvixitsolutions.com",
};

describe("composeEnquiryEmail", () => {
  test("sends from the site's mailbox and replies to the visitor", () => {
    const mail = composeEnquiryEmail(enquiry, context);
    expect(mail.from).toEqual({
      name: expect.stringContaining("D’Yvix"),
      address: "site@dyvixitsolutions.com",
    });
    expect(mail.to).toBe("contact@dyvixitsolutions.com");
    expect(mail.replyTo).toEqual({ name: "Amina Njoya", address: "amina@example.cm" });
  });

  test("puts the reference and the organisation in the subject", () => {
    expect(composeEnquiryEmail(enquiry, context).subject).toBe(
      "Demande DYX-ABC234 — Meridian Microfinance",
    );
  });

  test("lists every answer, in French, for the team", () => {
    const { text } = composeEnquiryEmail(enquiry, context);
    for (const expected of [
      `Référence${NBSP}: DYX-ABC234`,
      `Langue du visiteur${NBSP}: anglais`,
      `Nom${NBSP}: Amina Njoya`,
      `Organisation${NBSP}: Meridian Microfinance`,
      `E-mail${NBSP}: amina@example.cm`,
      `Téléphone${NBSP}: +237 6 99 00 00 00`,
      `Domaines${NBSP}: ${fr.form.scopes.cybersecurity}, ${fr.form.scopes.audit}`,
      `Échéance${NBSP}: ${fr.form.timelines.quarter}`,
      "Our branch links drop weekly.\nWe have never tested a restore.",
    ]) {
      expect(text).toContain(expected);
    }
  });

  test("says when the phone was left blank, and omits an unknown language", () => {
    const { text } = composeEnquiryEmail({ ...enquiry, phone: "", locale: undefined }, context);
    expect(text).toContain(`Téléphone${NBSP}: non renseigné`);
    expect(text).not.toContain("Langue du visiteur");
  });

  test("names a French-speaking visitor's language", () => {
    expect(composeEnquiryEmail({ ...enquiry, locale: "fr" }, context).text).toContain(
      `Langue du visiteur${NBSP}: français`,
    );
  });

  test("keeps the subject on one line whatever the visitor typed", () => {
    const { subject } = composeEnquiryEmail(
      { ...enquiry, organisation: "Evil Corp\r\nBcc: victim@example.com" },
      context,
    );
    expect(subject).toBe("Demande DYX-ABC234 — Evil Corp Bcc: victim@example.com");
  });
});

describe("oneLine", () => {
  test("turns control characters into spaces and collapses whitespace", () => {
    expect(oneLine(`  a\tb${String.fromCharCode(0)}c\n\n d  `, 50)).toBe("a b c d");
  });

  test("caps the length with an ellipsis", () => {
    expect(oneLine("x".repeat(100), 10)).toBe(`${"x".repeat(9)}…`);
  });
});
