import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Crawl policy (§87).
 *
 * Documented decision: AI and answer-engine crawlers are ALLOWED. The whole
 * GEO strategy depends on assistants being able to read first-party facts
 * about D’Yvix — blocking GPTBot or ClaudeBot while asking to be cited in
 * assistants would be self-defeating.
 *
 * Disallowed: /api/ (no indexable content, POST-only) and Next internals.
 *
 * If D’Yvix later decides its content should not be used for model training
 * as distinct from retrieval, note that the two are not separable via
 * robots.txt for most crawlers — that is a terms-of-use decision, not a
 * robots one.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
