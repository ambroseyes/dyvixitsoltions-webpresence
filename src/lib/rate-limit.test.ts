import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { clientKey, rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  test("allows requests up to the limit", () => {
    const key = `allow-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(key).ok).toBe(true);
    }
  });

  test("blocks the request after the limit is exceeded", () => {
    const key = `block-${Math.random()}`;
    for (let i = 0; i < 5; i++) rateLimit(key);
    const blocked = rateLimit(key);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  test("keys are isolated from one another", () => {
    const a = `iso-a-${Math.random()}`;
    const b = `iso-b-${Math.random()}`;
    for (let i = 0; i < 6; i++) rateLimit(a);
    expect(rateLimit(a).ok).toBe(false);
    expect(rateLimit(b).ok).toBe(true);
  });

  test("the window reopens once it has elapsed", () => {
    const key = `window-${Math.random()}`;
    for (let i = 0; i < 6; i++) rateLimit(key);
    expect(rateLimit(key).ok).toBe(false);

    vi.advanceTimersByTime(61_000);
    expect(rateLimit(key).ok).toBe(true);
  });
});

describe("clientKey", () => {
  test("takes the left-most entry of x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "41.202.1.5, 10.0.0.1, 10.0.0.2" });
    expect(clientKey(headers)).toBe("41.202.1.5");
  });

  test("falls back to x-real-ip", () => {
    expect(clientKey(new Headers({ "x-real-ip": "41.202.1.9" }))).toBe("41.202.1.9");
  });

  test("returns a stable placeholder when no client address is present", () => {
    expect(clientKey(new Headers())).toBe("unknown");
  });
});
