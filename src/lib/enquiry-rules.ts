/**
 * Enquiry field rules — the single source of truth for both validators.
 *
 * Zero dependencies by design. The client form imports this module for inline
 * validation; the server derives a Zod schema from the same constants in
 * lib/validation.ts. Keeping them in one place means the two validators cannot
 * drift, while keeping Zod (67 kB gzipped) out of the browser bundle entirely.
 */

export const SCOPES = [
  "software-engineering",
  "infrastructure-cloud",
  "cybersecurity",
  "data-documents",
  "applied-ai",
  "managed-services",
  "technical-training",
  "audit",
  "discovery",
] as const;

export const TIMELINES = ["urgent", "quarter", "half-year", "exploring"] as const;

export type Scope = (typeof SCOPES)[number];
export type Timeline = (typeof TIMELINES)[number];

export const SCOPE_LABELS: Record<Scope, string> = {
  "software-engineering": "Software engineering",
  "infrastructure-cloud": "Infrastructure & cloud",
  cybersecurity: "Cybersecurity",
  "data-documents": "Data, geospatial & documents",
  "applied-ai": "Applied AI",
  "managed-services": "Managed services",
  "technical-training": "Technical training",
  audit: "Audit / assessment",
  discovery: "Not sure yet",
};

export const TIMELINE_LABELS: Record<Timeline, string> = {
  urgent: "Urgent — we have a live problem",
  quarter: "This quarter",
  "half-year": "Within six months",
  exploring: "Exploring options",
};

export const LIMITS = {
  name: { min: 2, max: 120 },
  organisation: { min: 2, max: 160 },
  email: { max: 200 },
  phone: { max: 40 },
  message: { min: 20, max: 4000 },
  website: { max: 200 },
} as const;

export const MESSAGES = {
  name: "Please enter your name.",
  nameLong: "That name is too long.",
  organisation: "Please enter your organisation.",
  organisationLong: "That organisation name is too long.",
  email: "Please enter a valid email address.",
  phoneLong: "That phone number is too long.",
  scopes: "Select at least one area.",
  timeline: "Please choose a timeline.",
  message: "A sentence or two about the situation helps us route this properly.",
  messageLong: "Please keep this under 4000 characters.",
} as const;

/**
 * Pragmatic email shape check for inline feedback only.
 * The server re-validates with Zod, which is the actual trust boundary — this
 * exists to tell someone they typed "amina@" before they hit send.
 */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type EnquiryInput = {
  name: string;
  organisation: string;
  email: string;
  phone?: string;
  scopes: readonly string[];
  timeline: string;
  message: string;
  website?: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

/** Returns a map of field to first error. Empty object means valid. */
export function validateEnquiry(v: EnquiryInput): FieldErrors {
  const e: FieldErrors = {};
  const name = v.name.trim();
  const organisation = v.organisation.trim();
  const email = v.email.trim();
  const message = v.message.trim();

  if (name.length < LIMITS.name.min) e.name = MESSAGES.name;
  else if (name.length > LIMITS.name.max) e.name = MESSAGES.nameLong;

  if (organisation.length < LIMITS.organisation.min) e.organisation = MESSAGES.organisation;
  else if (organisation.length > LIMITS.organisation.max)
    e.organisation = MESSAGES.organisationLong;

  if (!EMAIL_SHAPE.test(email) || email.length > LIMITS.email.max) e.email = MESSAGES.email;

  if ((v.phone ?? "").trim().length > LIMITS.phone.max) e.phone = MESSAGES.phoneLong;

  if (v.scopes.length === 0) e.scopes = MESSAGES.scopes;
  else if (!v.scopes.every((s) => (SCOPES as readonly string[]).includes(s)))
    e.scopes = MESSAGES.scopes;

  if (!(TIMELINES as readonly string[]).includes(v.timeline)) e.timeline = MESSAGES.timeline;

  if (message.length < LIMITS.message.min) e.message = MESSAGES.message;
  else if (message.length > LIMITS.message.max) e.message = MESSAGES.messageLong;

  return e;
}

/** Field ownership per form step, so step 1 is not blocked by step 3. */
export const STEP_FIELDS: (keyof EnquiryInput)[][] = [
  ["scopes"],
  ["timeline", "message"],
  ["name", "organisation", "email", "phone"],
];
