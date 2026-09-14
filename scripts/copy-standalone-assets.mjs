#!/usr/bin/env node
/**
 * Completes the standalone build for self-hosting (cPanel with Passenger, a
 * VPS, Docker).
 *
 * `output: "standalone"` emits a minimal server in .next/standalone but, by
 * design, not the static assets it serves: Next expects a CDN in front. On a
 * single host there is none, so the assets are copied next to the server,
 * where server.js serves them itself. Runs automatically after
 * `npm run build` (the npm "postbuild" hook).
 */
import { cpSync, existsSync } from "node:fs";

const STANDALONE = ".next/standalone";

if (!existsSync(`${STANDALONE}/server.js`)) {
  console.error(
    `[standalone] ${STANDALONE}/server.js not found — is output: "standalone" set in next.config.ts?`,
  );
  process.exit(1);
}

cpSync(".next/static", `${STANDALONE}/.next/static`, { recursive: true });
if (existsSync("public")) cpSync("public", `${STANDALONE}/public`, { recursive: true });

console.log("[standalone] copied .next/static and public/ into .next/standalone");
