#!/usr/bin/env node
/** Prints the measured contrast of every text/surface token pair. */
import { readFileSync } from "node:fs";
import { contrastRatio } from "../src/lib/color.ts";

const css = readFileSync("src/app/globals.css", "utf8");

function tokensFor(selector) {
  const block = new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n\\}`).exec(css);
  const out = {};
  for (const [, k, v] of block[1].matchAll(/(--c-[a-z-]+):\s*(oklch\([^)]*\))/g)) out[k] = v;
  return out;
}

const themes = {
  Light: tokensFor(":root"),
  Dark: tokensFor("\\.dark"),
  "Inverse panel": tokensFor("\\.panel-inverse"),
};

const PAIRS = [
  ["--c-ink", "--c-surface"],
  ["--c-ink", "--c-surface-raised"],
  ["--c-ink", "--c-surface-sunken"],
  ["--c-ink-muted", "--c-surface"],
  ["--c-ink-muted", "--c-surface-raised"],
  ["--c-ink-muted", "--c-surface-sunken"],
  ["--c-ink-faint", "--c-surface"],
  ["--c-ink-faint", "--c-surface-raised"],
  ["--c-ink-faint", "--c-surface-sunken"],
  ["--c-brass", "--c-surface"],
  ["--c-brass", "--c-surface-raised"],
  ["--c-brass", "--c-surface-sunken"],
  ["--c-signal", "--c-surface"],
  ["--c-risk", "--c-surface"],
  ["--c-risk", "--c-surface-raised"],
  ["--c-verified", "--c-surface"],
  ["--c-verified", "--c-surface-raised"],
  ["--c-line-strong", "--c-surface"],
  ["--c-surface", "--c-brass"],
];

for (const [name, t] of Object.entries(themes)) {
  console.log(`\n${name}\n${"-".repeat(58)}`);
  for (const [fg, bg] of PAIRS) {
    if (!t[fg] || !t[bg]) continue;
    const r = contrastRatio(t[fg], t[bg]);
    const need = fg === "--c-line-strong" ? 3 : 4.5;
    const flag = r >= need ? "ok  " : "FAIL";
    console.log(`  ${flag} ${r.toFixed(2).padStart(5)}:1  (need ${need})  ${fg} on ${bg}`);
  }
}
