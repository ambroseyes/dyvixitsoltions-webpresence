import { NextResponse } from "next/server";
import { newEnquiryReference } from "@/lib/enquiry-reference";
import { readMailConfig } from "@/lib/mail/config";
import { composeEnquiryEmail } from "@/lib/mail/enquiry-email";
import { describeMailError, sendMail } from "@/lib/mail/send";
import { enquirySchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
/** Never cached, never prerendered — this route only ever handles POST. */
export const dynamic = "force-dynamic";

/**
 * Error codes, not sentences: the form renders them from the dictionary of
 * the page that submitted, so one endpoint serves every locale.
 */
type ApiError = "rateLimited" | "rejected" | "review" | "delivery" | "generic";

/** Consistent envelope, per the API response format rule. */
type ApiResponse = {
  success: boolean;
  data: { reference: string } | null;
  error: ApiError | null;
  fieldErrors?: Record<string, string[]>;
};

const json = (body: ApiResponse, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export async function POST(request: Request) {
  // 1. Rate limit before doing any parsing work.
  const key = clientKey(request.headers);
  const limit = rateLimit(key);
  if (!limit.ok) {
    return json({ success: false, data: null, error: "rateLimited" }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  // 2. Same-origin check. Complements CSP form-action and blocks trivial
  //    cross-site posting; this endpoint holds no session, so there is no
  //    ambient authority for a classic CSRF to abuse.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ success: false, data: null, error: "rejected" }, 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, data: null, error: "generic" }, 400);
  }

  // 3. Server-side validation is the trust boundary, not the client's.
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return json(
      {
        success: false,
        data: null,
        error: "review",
        fieldErrors: fieldErrors as Record<string, string[]>,
      },
      422,
    );
  }

  // 4. Honeypot. Return a normal-looking success so a bot gets no signal
  //    about why it failed, and drop the submission.
  if (parsed.data.website) {
    return json({ success: true, data: { reference: "DYX-000000" }, error: null }, 200);
  }

  const reference = newEnquiryReference();

  // 5. Delivery. Never report success for an enquiry nobody will receive:
  //    without mail settings, or when the mail server refuses, the visitor is
  //    told to write directly. The log line — stderr.log on cPanel — carries
  //    the reference and the cause, never the visitor's personal data.
  const mail = readMailConfig(process.env);
  if (!mail.ok) {
    console.error(
      `[enquiry] ${reference} not sent: mail is not configured (${mail.problems.join("; ")})`,
    );
    return json({ success: false, data: null, error: "delivery" }, 503);
  }

  try {
    const message = composeEnquiryEmail(parsed.data, {
      reference,
      from: mail.config.user,
      to: mail.config.to,
    });
    await sendMail(mail.config, message);
  } catch (error) {
    console.error(`[enquiry] ${reference} not sent: ${describeMailError(error)}`);
    return json({ success: false, data: null, error: "delivery" }, 502);
  }

  return json({ success: true, data: { reference }, error: null }, 200);
}

/** Anything other than POST is a client error. */
export async function GET() {
  return json({ success: false, data: null, error: "generic" }, 405);
}
