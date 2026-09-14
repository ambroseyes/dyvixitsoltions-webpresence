import type { Locale } from "@/i18n/config";
import { fr } from "@/i18n/dictionaries/fr";
import { LIMITS } from "@/lib/enquiry-rules";
import { site } from "@/lib/site";
import type { Enquiry } from "@/lib/validation";

/**
 * The notification the team receives for each enquiry.
 *
 * Plain text, in French — the team's language, whatever the visitor's. No
 * HTML, so nothing a visitor types can render or run in a mail client. The
 * visitor is the Reply-To, so answering the e-mail answers them; the From
 * stays the site's own mailbox, the only sender the mail server will sign.
 */
export type Mailbox = { name: string; address: string };

export type EnquiryEmail = {
  from: Mailbox;
  to: string;
  replyTo: Mailbox;
  subject: string;
  text: string;
};

type Context = { reference: string; from: string; to: string };

const NBSP = String.fromCharCode(0xa0);
const SUBJECT_ORGANISATION_MAX = 80;
const LANGUAGE: Record<Locale, string> = { en: "anglais", fr: "français" };

const isControl = (char: string) => {
  const code = char.charCodeAt(0);
  return code < 0x20 || code === 0x7f;
};

/** Header-safe text: control characters become spaces, whitespace collapses, length is capped. */
export function oneLine(value: string, max: number): string {
  const flat = Array.from(value, (char) => (isControl(char) ? " " : char))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/** French typography: a non-breaking space before the colon. */
const field = (label: string, value: string) => `${label}${NBSP}: ${value}`;

export function composeEnquiryEmail(
  enquiry: Enquiry,
  { reference, from, to }: Context,
): EnquiryEmail {
  const name = oneLine(enquiry.name, LIMITS.name.max);
  const organisation = oneLine(enquiry.organisation, LIMITS.organisation.max);
  const phone = enquiry.phone?.trim() ? oneLine(enquiry.phone, LIMITS.phone.max) : "non renseigné";
  const labels = fr.form;

  const text = [
    "Nouvelle demande envoyée depuis le formulaire du site.",
    "",
    field("Référence", reference),
    ...(enquiry.locale ? [field("Langue du visiteur", LANGUAGE[enquiry.locale])] : []),
    "",
    "CONTACT",
    field("Nom", name),
    field("Organisation", organisation),
    field("E-mail", enquiry.email),
    field("Téléphone", phone),
    "",
    "BESOIN",
    field("Domaines", enquiry.scopes.map((scope) => labels.scopes[scope]).join(", ")),
    field("Échéance", labels.timelines[enquiry.timeline]),
    "",
    "MESSAGE",
    enquiry.message.trim(),
    "",
    "—",
    `Répondez à cet e-mail pour écrire directement à ${name}.`,
  ].join("\n");

  return {
    from: { name: `Site ${site.shortName}`, address: from },
    to,
    replyTo: { name, address: enquiry.email },
    subject: `Demande ${reference} — ${oneLine(organisation, SUBJECT_ORGANISATION_MAX)}`,
    text,
  };
}
