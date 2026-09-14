// @vitest-environment node
import { describe, expect, test } from "vitest";
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import nextConfig from "../../next.config";
import { site } from "@/lib/site";

type Redirect = {
  source: string;
  destination: string;
  permanent?: boolean;
  has?: { type: string; value?: string }[];
};

async function redirects(): Promise<Redirect[]> {
  return ((await nextConfig.redirects?.()) ?? []) as Redirect[];
}

/** The first redirect that applies to a request, the way Next resolves them. */
async function resolve(path: string, host = new URL(site.url).host) {
  for (const r of await redirects()) {
    const hostRule = r.has?.find((h) => h.type === "host");
    if (hostRule && hostRule.value !== host) continue;
    const params = getPathMatch(r.source, { removeUnnamedParams: true, strict: true })(path);
    if (!params) continue;
    const to = r.destination.replace(/:(\w+)\*?/g, (_, key: string) => {
      const value = params[key];
      return Array.isArray(value) ? value.join("/") : (value ?? "");
    });
    return { to, permanent: r.permanent };
  }
  return null;
}

describe("canonical host", () => {
  test("www redirects permanently to the canonical origin, path intact", async () => {
    expect(await resolve("/fr/about", "www.dyvixitsolutions.com")).toEqual({
      to: `${site.url}/fr/about`,
      permanent: true,
    });
  });

  test("the canonical host itself is never redirected", async () => {
    expect(await resolve("/fr/about")).toBeNull();
    expect(await resolve("/")).toBeNull();
  });
});

/**
 * Addresses of the previous site (a React single-page app). They never loaded
 * directly — the server answered 404 — but they survive in bookmarks and old
 * links, so they land on the closest page of the new site.
 */
describe("addresses of the previous site", () => {
  test.each([
    ["/service/1", "/fr/expertise"],
    ["/service/6", "/fr/expertise"],
    ["/news", "/fr/insights"],
    ["/politics", "/fr/privacy"],
  ])("%s redirects permanently to %s", async (from, to) => {
    expect(await resolve(from)).toEqual({ to, permanent: true });
  });

  test.each(["/", "/about", "/contact", "/fr", "/expertise/cybersecurity", "/insights"])(
    "the current page %s is not redirected",
    async (path) => {
      expect(await resolve(path)).toBeNull();
    },
  );
});
