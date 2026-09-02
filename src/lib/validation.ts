import { z } from "zod";
import { LIMITS, MESSAGES, SCOPES, TIMELINES } from "./enquiry-rules";

export * from "./enquiry-rules";

/**
 * Server-side enquiry schema — the actual trust boundary.
 *
 * Built from the shared constants in enquiry-rules.ts so it cannot drift from
 * the client's inline validation. This module is imported only by the route
 * handler, which keeps Zod out of the browser bundle.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(LIMITS.name.min, MESSAGES.name)
    .max(LIMITS.name.max, MESSAGES.nameLong),
  organisation: z
    .string()
    .trim()
    .min(LIMITS.organisation.min, MESSAGES.organisation)
    .max(LIMITS.organisation.max, MESSAGES.organisationLong),
  email: z.email(MESSAGES.email).max(LIMITS.email.max),
  phone: z.string().trim().max(LIMITS.phone.max, MESSAGES.phoneLong).optional().or(z.literal("")),
  scopes: z.array(z.enum(SCOPES)).min(1, MESSAGES.scopes).max(SCOPES.length),
  timeline: z.enum(TIMELINES, { message: MESSAGES.timeline }),
  message: z
    .string()
    .trim()
    .min(LIMITS.message.min, MESSAGES.message)
    .max(LIMITS.message.max, MESSAGES.messageLong),
  /**
   * Honeypot. Real users never see this field, so any value means a bot.
   * Preferred over a CAPTCHA, which taxes every legitimate visitor —
   * particularly on the slow connections this site is built for (§42).
   *
   * Deliberately NOT rejected here: failing validation would return a 422
   * naming this field, handing a bot the exact signal it needs. The route
   * handler absorbs it with an ordinary-looking success instead.
   */
  website: z.string().max(LIMITS.website.max).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;
