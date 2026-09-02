/**
 * OKLCH → sRGB → WCAG relative luminance.
 *
 * The design tokens are authored in OKLCH for perceptual control, but WCAG
 * contrast is defined on sRGB relative luminance. Without this conversion
 * there is no way to assert a contrast ratio in a test, and "looks fine" is
 * not a contrast check.
 */

export type Oklch = { l: number; c: number; h: number };

/** Parses `oklch(46% 0.017 240)`, with or without an alpha component. */
export function parseOklch(value: string): Oklch {
  const m = /oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)/.exec(value);
  if (!m) throw new Error(`Not an oklch() colour: ${value}`);
  return { l: Number(m[1]) / 100, c: Number(m[2]), h: Number(m[3]) };
}

/** OKLCH to linear-light sRGB. Components may fall outside [0,1] if out of gamut. */
export function oklchToLinearSrgb({ l, c, h }: Oklch): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;

  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** WCAG 2.x relative luminance. */
export function relativeLuminance(color: string): number {
  const [r, g, b] = oklchToLinearSrgb(parseOklch(color)).map(clamp01);
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

/** WCAG contrast ratio, 1–21. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi! + 0.05) / (lo! + 0.05);
}
