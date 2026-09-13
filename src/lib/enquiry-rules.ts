/**
 * Enquiry field rules — the single source of truth for both validators.
 *
 * Zero dependencies and no language: the client form imports this module for
 * inline validation and the server derives a Zod schema from the same
 * constants in lib/validation.ts. Errors are codes, not sentences — the form
 * turns them into copy from the dictionary of the page it is on, so the rules
 * cannot drift between validators or between languages.
 */

/** One per expertise domain, plus the two engagement entry points. */
export const SCOPES = [
  "digital-engineering",
  "cloud-infrastructure",
  "cybersecurity",
  "ai-data",
  "networks-telecom",
  "iot-edge",
  "product-engineering",
  "consulting-rd",
  "managed-services",
  "audit",
  "discovery",
] as const;

export const TIMELINES = ["urgent", "quarter", "half-year", "exploring"] as const;

export type Scope = (typeof SCOPES)[number];
export type Timeline = (typeof TIMELINES)[number];

export const LIMITS = {
  name: { min: 2, max: 120 },
  organisation: { min: 2, max: 160 },
  email: { max: 200 },
  phone: { max: 40 },
  message: { min: 20, max: 4000 },
  website: { max: 200 },
} as const;

/** Field error codes; each is a key of the dictionary's `form.errors`. */
export type ErrorCode =
  | "name"
  | "nameLong"
  | "organisation"
  | "organisationLong"
  | "email"
  | "phoneLong"
  | "scopes"
  | "timeline"
  | "message"
  | "messageLong";

export const isScope = (value: string): value is Scope => (SCOPES as readonly string[]).includes(value);
export const isTimeline = (value: string): value is Timeline => (TIMELINES as readonly string[]).includes(value);

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

export type FieldErrors = Partial<Record<keyof EnquiryInput, ErrorCode>>;

/** Returns a map of field to first error code. Empty object means valid. */
export function validateEnquiry(v: EnquiryInput): FieldErrors {
  const e: FieldErrors = {};
  const name = v.name.trim();
  const organisation = v.organisation.trim();
  const email = v.email.trim();
  const message = v.message.trim();

  if (name.length < LIMITS.name.min) e.name = "name";
  else if (name.length > LIMITS.name.max) e.name = "nameLong";

  if (organisation.length < LIMITS.organisation.min) e.organisation = "organisation";
  else if (organisation.length > LIMITS.organisation.max) e.organisation = "organisationLong";

  if (!EMAIL_SHAPE.test(email) || email.length > LIMITS.email.max) e.email = "email";

  if ((v.phone ?? "").trim().length > LIMITS.phone.max) e.phone = "phoneLong";

  if (v.scopes.length === 0 || !v.scopes.every(isScope)) e.scopes = "scopes";

  if (!isTimeline(v.timeline)) e.timeline = "timeline";

  if (message.length < LIMITS.message.min) e.message = "message";
  else if (message.length > LIMITS.message.max) e.message = "messageLong";

  return e;
}

/** Field ownership per form step, so step 1 is not blocked by step 3. */
export const STEP_FIELDS: (keyof EnquiryInput)[][] = [
  ["scopes"],
  ["timeline", "message"],
  ["name", "organisation", "email", "phone"],
];
