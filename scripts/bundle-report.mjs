#!/usr/bin/env node
/**
 * Measures what a page actually downloads: every script and stylesheet the
 * HTML references, plus the HTML itself, as transferred over the wire.
 * Checked against the microsite/landing budgets.
 */
import { gzipSync } from "node:zlib";

const BASE = process.argv[2] ?? "http://localhost:3100";
const PAGES = ["/", "/solutions/cybersecurity", "/contact"];
const BUDGET_JS_KB = 150;
const BUDGET_CSS_KB = 30;

const kb = (n) => (n / 1024).toFixed(1);

for (const path of PAGES) {
  const html = await (await fetch(BASE + path)).text();

  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  const styles = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(
    (m) => m[1],
  );

  let js = 0,
    css = 0;
  for (const src of new Set(scripts)) {
    const body = await (await fetch(new URL(src, BASE))).arrayBuffer();
    js += gzipSync(Buffer.from(body)).length;
  }
  for (const href of new Set(styles)) {
    const body = await (await fetch(new URL(href, BASE))).arrayBuffer();
    css += gzipSync(Buffer.from(body)).length;
  }
  const htmlGz = gzipSync(Buffer.from(html)).length;

  const jsFlag = js / 1024 <= BUDGET_JS_KB ? "ok" : "OVER";
  const cssFlag = css / 1024 <= BUDGET_CSS_KB ? "ok" : "OVER";

  console.log(`\n${path}`);
  console.log(`  HTML (gzip)   ${kb(htmlGz).padStart(7)} kB`);
  console.log(
    `  JS   (gzip)   ${kb(js).padStart(7)} kB   ${jsFlag}  (budget ${BUDGET_JS_KB} kB, ${new Set(scripts).size} files)`,
  );
  console.log(
    `  CSS  (gzip)   ${kb(css).padStart(7)} kB   ${cssFlag}  (budget ${BUDGET_CSS_KB} kB, ${new Set(styles).size} files)`,
  );
  console.log(`  TOTAL         ${kb(htmlGz + js + css).padStart(7)} kB`);
}
