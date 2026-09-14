import { z } from "zod";
import { LOCALES } from "@/i18n/config";
import { LIMITS, SCOPES, TIMELINES, type ErrorCode } from "./enquiry-rules";

export * from "./enquiry-rules";

/** Zod messages are the same language-free codes the client uses. */
const code = (c: ErrorCode) => c;

/**
 * Server-side enquiry schema — the actual trust boundary.
 *
 * Built from the shared constants in enquiry-rules.ts so it cannot drift from
 * the client's inline validation. This module is imported only by the route
 * handler, which keeps Zod out of the browser bundle.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(LIMITS.name.min, code("name")).max(LIMITS.name.max, code("nameLong")),
  organisation: z
    .string()
    .trim()
    .min(LIMITS.organisation.min, code("organisation"))
    .max(LIMITS.organisation.max, code("organisationLong")),
  email: z.email(code("email")).max(LIMITS.email.max, code("email")),
  phone: z.string().trim().max(LIMITS.phone.max, code("phoneLong")).optional().or(z.literal("")),
  scopes: z.array(z.enum(SCOPES)).min(1, code("scopes")).max(SCOPES.length, code("scopes")),
  timeline: z.enum(TIMELINES, { message: code("timeline") }),
  message: z
    .string()
    .trim()
    .min(LIMITS.message.min, code("message"))
    .max(LIMITS.message.max, code("messageLong")),
  /** Language of the page the enquiry came from, so the team replies in it. */
  locale: z.enum(LOCALES).optional(),
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
