import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
/** Never cached, never prerendered — this route only ever handles POST. */
export const dynamic = "force-dynamic";

/** Consistent envelope, per the API response format rule. */
type ApiResponse = {
  success: boolean;
  data: { reference: string } | null;
  error: string | null;
  fieldErrors?: Record<string, string[]>;
};

const json = (body: ApiResponse, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export async function POST(request: Request) {
  // 1. Rate limit before doing any parsing work.
  const key = clientKey(request.headers);
  const limit = rateLimit(key);
  if (!limit.ok) {
    return json(
      { success: false, data: null, error: "Too many submissions. Please try again shortly." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  // 2. Same-origin check. Complements CSP form-action and blocks trivial
  //    cross-site posting; this endpoint holds no session, so there is no
  //    ambient authority for a classic CSRF to abuse.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ success: false, data: null, error: "Rejected." }, 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, data: null, error: "Malformed request." }, 400);
  }

  // 3. Server-side validation is the trust boundary, not the client's.
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return json(
      {
        success: false,
        data: null,
        error: "Please correct the highlighted fields.",
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

  const reference = `DYX-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  /**
   * PLACEHOLDER — delivery is not wired up.
   *
   * The submission is validated and accepted but not yet sent anywhere. Wire
   * one of these before launch, using credentials from environment variables
   * only (see .env.example):
   *   - transactional email to site.contact.email (Resend / Postmark / SES)
   *   - or a CRM webhook
   *
   * Deliberately NOT logging the submission body: it contains personal data,
   * and application logs are the wrong place for it.
   */
  console.info(
    `[enquiry] ${reference} scopes=${parsed.data.scopes.join(",")} timeline=${parsed.data.timeline}`,
  );

  return json({ success: true, data: { reference }, error: null }, 200);
}

/** Anything other than POST is a client error, answered without a body. */
export async function GET() {
  return json({ success: false, data: null, error: "Method not allowed." }, 405);
}
