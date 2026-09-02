#!/usr/bin/env node
/**
 * GEO / AI-discoverability audit (§84, §85).
 *
 * Fetches each route from a running server and scores the RAW HTML — no
 * JavaScript is executed, deliberately: the whole point is to measure what a
 * crawler or answer engine sees on first fetch.
 *
 * Usage: node scripts/geo-audit.mjs [baseUrl]
 * Exits non-zero if any page scores below THRESHOLD.
 */

const BASE = process.argv[2] ?? "http://localhost:3100";
const THRESHOLD = 70;

/**
 * Routes are read from the site's own sitemap rather than hardcoded.
 * A hardcoded list silently rots: after the service taxonomy was reorganised
 * it was still auditing five retired slugs and missing two new pages.
 */
async function discoverRoutes(base) {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return locs
    .map((u) => new URL(u).pathname)
    .filter((p, i, all) => all.indexOf(p) === i)
    .sort();
}

const strip = (html) => {
  const noScript = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  return noScript
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const jsonLd = (html) => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const nodes = [];
  for (const [, raw] of blocks) {
    try {
      const parsed = JSON.parse(raw.replace(/\\u003c/g, "<"));
      nodes.push(...(parsed["@graph"] ?? [parsed]));
    } catch {
      /* malformed block scores zero rather than crashing the audit */
    }
  }
  return nodes;
};

/** Each criterion returns 0-10. */
function score(html, path) {
  const text = strip(html);
  const nodes = jsonLd(html);
  const types = nodes.map((n) => n["@type"]);
  const internalLinks = new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]));

  const has = (re) => re.test(html);
  const clamp = (n) => Math.max(0, Math.min(10, Math.round(n)));

  return {
    "Entity clarity": clamp(
      (/D.Yvix IT Solutions/i.test(text) ? 5 : 0) +
        (types.includes("Organization") ? 3 : 0) +
        (/\b(IT|technology) engineering company\b/i.test(text) ? 2 : 0),
    ),
    "Service clarity": clamp(
      (types.some((t) => ["Service", "ItemList", "Offer"].includes(t)) ? 4 : 0) +
        (/(designs?|builds?|secures?|operates?|provides?)/i.test(text) ? 3 : 0) +
        (text.length > 1500 ? 3 : text.length > 700 ? 2 : 0),
    ),
    "Topical depth": clamp(text.split(" ").length / 130),
    "Structured data": clamp(
      (nodes.length ? 4 : 0) +
        (types.includes("BreadcrumbList") || path === "/" ? 3 : 0) +
        (types.some((t) => ["FAQPage", "Service", "BlogPosting", "ItemList", "WebSite"].includes(t))
          ? 3
          : 0),
    ),
    "First-party evidence": clamp(
      (/(Delivered|Verified|aligned|certified|projects delivered|Outcome)/i.test(text) ? 5 : 0) +
        (/contact@dyvixitsolutions\.com/.test(text) ? 3 : 0) +
        (/(assessment|engagement|deliverable)/i.test(text) ? 2 : 0),
    ),
    "Internal linking": clamp(internalLinks.size / 4),
    "Content extractability": clamp(
      (text.length > 3000 ? 6 : text.length > 1200 ? 4 : 2) +
        (has(/<h1[^>]*>/) ? 2 : 0) +
        (has(/<h2[^>]*>/) ? 2 : 0),
    ),
    "Author authority": clamp(
      (types.includes("BlogPosting") ? 6 : 4) +
        (/D.Yvix Engineering|D.Yvix IT Solutions/i.test(text) ? 4 : 0),
    ),
    "Local relevance": clamp(
      (/Cameroon/.test(text) ? 4 : 0) +
        (/Africa/.test(text) ? 3 : 0) +
        (/(Yaound|Central Africa)/.test(text) ? 3 : 0),
    ),
    "Technical crawlability": clamp(
      (has(/rel="canonical"/) ? 3 : 0) +
        (has(/<meta name="description"/) ? 3 : 0) +
        (has(/property="og:title"/) ? 2 : 0) +
        (has(/<html lang="/) ? 2 : 0),
    ),
  };
}

const pad = (s, n) => String(s).padEnd(n);
const ROUTES = await discoverRoutes(BASE);

let failures = 0;
const totals = {};

console.log(`\nGEO / AI-discoverability audit — ${BASE}\n${"=".repeat(78)}\n`);

for (const path of ROUTES) {
  const res = await fetch(BASE + path);
  if (!res.ok) {
    console.log(`${pad(path, 52)} HTTP ${res.status}  FAIL`);
    failures++;
    continue;
  }
  const html = await res.text();
  const s = score(html, path);
  const total = Object.values(s).reduce((a, b) => a + b, 0);
  for (const [k, v] of Object.entries(s)) (totals[k] ??= []).push(v);

  const flag = total >= THRESHOLD ? "PASS" : "LOW ";
  if (total < THRESHOLD) failures++;
  console.log(`${pad(path, 52)} ${pad(total + "/100", 9)} ${flag}`);
}

console.log(`\n${"-".repeat(78)}\nAverage per criterion (all pages):\n`);
for (const [k, arr] of Object.entries(totals)) {
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
  const bar = "█".repeat(Math.round(avg)) + "·".repeat(10 - Math.round(avg));
  console.log(`  ${pad(k, 26)} ${bar}  ${avg.toFixed(1)}/10`);
}

const overall =
  Object.values(totals)
    .flat()
    .reduce((a, b) => a + b, 0) / ROUTES.length;
console.log(`\n  OVERALL ${overall.toFixed(1)}/100 across ${ROUTES.length} pages`);
console.log(
  `  ${failures === 0 ? "All pages at or above threshold." : failures + " page(s) below threshold " + THRESHOLD + "."}\n`,
);

process.exit(failures === 0 ? 0 : 1);
