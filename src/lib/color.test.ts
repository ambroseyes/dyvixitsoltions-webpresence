import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { contrastRatio, parseOklch, relativeLuminance } from "./color";

const css = readFileSync("src/app/globals.css", "utf8");

/** Pulls the --c-* tokens out of one selector block in globals.css. */
function tokensFor(selector: string): Record<string, string> {
  const block = new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n\\}`).exec(css);
  if (!block) throw new Error(`No block for ${selector}`);
  const out: Record<string, string> = {};
  for (const [, k, v] of block[1]!.matchAll(/(--c-[a-z-]+):\s*(oklch\([^)]*\))/g)) out[k] = v;
  return out;
}

const THEMES = {
  light: tokensFor(":root"),
  dark: tokensFor("\\.dark"),
  inverse: tokensFor("\\.panel-inverse"),
};

const SURFACES = ["--c-surface", "--c-surface-raised", "--c-surface-sunken"];
/** Tokens that carry text. --c-brand is excluded: see the fills-only test. */
const TEXT_TOKENS = [
  "--c-ink",
  "--c-ink-muted",
  "--c-ink-faint",
  "--c-primary",
  "--c-signal",
  "--c-info",
];

describe("colour maths", () => {
  test("parses an oklch string", () => {
    expect(parseOklch("oklch(53% 0.128 68)")).toEqual({ l: 0.53, c: 0.128, h: 68 });
  });

  test("rejects a non-oklch value", () => {
    expect(() => parseOklch("#ff0000")).toThrow(/oklch/);
  });

  test("luminance ordering matches lightness ordering", () => {
    expect(relativeLuminance("oklch(99% 0 0)")).toBeGreaterThan(
      relativeLuminance("oklch(20% 0 0)"),
    );
  });

  test("black on white is the maximum WCAG ratio", () => {
    expect(contrastRatio("oklch(0% 0 0)", "oklch(100% 0 0)")).toBeCloseTo(21, 0);
  });

  test("a colour against itself is 1:1", () => {
    expect(contrastRatio("oklch(53% 0.128 68)", "oklch(53% 0.128 68)")).toBeCloseTo(1, 5);
  });
});

/**
 * WCAG 2.2 AA enforcement on the design tokens themselves.
 *
 * This is the guard that keeps the palette honest: a designer nudging a
 * lightness value for aesthetic reasons finds out immediately if it drops a
 * pairing below AA, in every theme, rather than at the next axe run.
 */
describe.each(Object.entries(THEMES))("%s theme meets WCAG 2.2 AA", (_name, tokens) => {
  test.each(TEXT_TOKENS.flatMap((fg) => SURFACES.map((bg) => [fg, bg] as const)))(
    "%s on %s is at least 4.5:1",
    (fg, bg) => {
      expect(contrastRatio(tokens[fg]!, tokens[bg]!)).toBeGreaterThanOrEqual(4.5);
    },
  );

  test("--c-line-strong meets the 3:1 floor for UI component borders", () => {
    for (const bg of SURFACES) {
      expect(contrastRatio(tokens["--c-line-strong"]!, tokens[bg]!)).toBeGreaterThanOrEqual(3);
    }
  });

  test("text on a filled primary button meets 4.5:1", () => {
    expect(contrastRatio(tokens["--c-surface"]!, tokens["--c-primary"]!)).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  test("--c-brand, the untouched logo green, is defined in every theme", () => {
    expect(tokens["--c-brand"]).toBeTruthy();
  });

  test("the focus ring is distinguishable from the surface it sits on", () => {
    expect(contrastRatio(tokens["--c-focus"]!, tokens["--c-surface"]!)).toBeGreaterThanOrEqual(3);
  });
});

/**
 * Why --c-primary exists at all.
 *
 * The logo green (#579C32) is too light to carry text on the cream ground:
 * it measures below AA. Rather than alter the brand colour, the system keeps
 * it as --c-brand for marks and fills and derives --c-primary at the same hue
 * and chroma but a solved lightness. This test pins that reasoning in place so
 * the two tokens are never collapsed back into one.
 */
describe("brand green versus primary green", () => {
  const light = THEMES.light;

  test("the untouched logo green would fail as text on the light ground", () => {
    expect(contrastRatio(light["--c-brand"]!, light["--c-surface"]!)).toBeLessThan(4.5);
  });

  test("the derived primary passes, and keeps the brand hue", () => {
    expect(contrastRatio(light["--c-primary"]!, light["--c-surface"]!)).toBeGreaterThanOrEqual(4.5);
    expect(parseOklch(light["--c-primary"]!).h).toBeCloseTo(parseOklch(light["--c-brand"]!).h, 1);
    expect(parseOklch(light["--c-primary"]!).c).toBeCloseTo(parseOklch(light["--c-brand"]!).c, 2);
  });
});
