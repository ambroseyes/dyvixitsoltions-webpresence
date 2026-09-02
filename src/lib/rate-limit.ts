/**
 * Fixed-window in-memory rate limiter.
 *
 * Deliberately simple and honest about its scope: state lives in the process,
 * so on a multi-instance or serverless deployment each instance keeps its own
 * counter and the effective limit is per instance. That is adequate as a
 * spam brake in front of a contact form; it is NOT adequate for protecting
 * an authentication endpoint. Move to a shared store (Redis, Upstash) before
 * relying on it for anything security-critical.
 */
type Entry = { count: number; resetAt: number };

/**
 * Configurable so a deployment can tune the brake, and so an E2E run — where
 * every worker shares one source IP — is not throttled by a limit meant for
 * real visitors. Production defaults are 5 requests per minute.
 */
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX ?? 5);
/** Bounds memory if a spray of unique IPs arrives. */
const MAX_TRACKED_KEYS = 10_000;

const store = new Map<string, Entry>();

function sweep(now: number) {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();

  if (store.size > MAX_TRACKED_KEYS) sweep(now);

  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Client IP from the proxy chain. The left-most x-forwarded-for entry is
 * client-controlled and therefore spoofable — acceptable for a spam brake,
 * but do not treat this value as identity.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
