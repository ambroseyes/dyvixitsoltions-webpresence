import { contrastRatio } from "../src/lib/color.ts";

// Find the L (in %) that first satisfies `need` against every background.
function solve({ c, h, backgrounds, need, direction }) {
  const range =
    direction === "darken"
      ? Array.from({ length: 900 }, (_, i) => 90 - i * 0.1) // search downward
      : Array.from({ length: 900 }, (_, i) => 10 + i * 0.1); // search upward
  for (const L of range) {
    const fg = `oklch(${L.toFixed(1)}% ${c} ${h})`;
    if (backgrounds.every((bg) => contrastRatio(fg, bg) >= need)) {
      return {
        L: Number(L.toFixed(1)),
        ratios: backgrounds.map((bg) => contrastRatio(fg, bg).toFixed(2)),
      };
    }
  }
  return null;
}

const lightBg = ["oklch(97.6% 0.005 85)", "oklch(99.4% 0.003 85)", "oklch(94.4% 0.008 85)"];
const darkBg = ["oklch(16.5% 0.019 236)", "oklch(20.5% 0.021 236)", "oklch(13% 0.017 236)"];
const invBg = ["oklch(12.5% 0.017 236)", "oklch(17.5% 0.02 236)", "oklch(10% 0.015 236)"];

console.log(
  "LIGHT ink-faint  ",
  solve({ c: 0.013, h: 240, backgrounds: lightBg, need: 4.6, direction: "darken" }),
);
console.log(
  "LIGHT brass      ",
  solve({ c: 0.128, h: 68, backgrounds: lightBg, need: 4.6, direction: "darken" }),
);
console.log(
  "LIGHT line-strong",
  solve({ c: 0.015, h: 240, backgrounds: lightBg, need: 3.1, direction: "darken" }),
);
console.log(
  "DARK  ink-faint  ",
  solve({ c: 0.014, h: 232, backgrounds: darkBg, need: 4.6, direction: "lighten" }),
);
console.log(
  "DARK  line-strong",
  solve({ c: 0.026, h: 236, backgrounds: darkBg, need: 3.1, direction: "lighten" }),
);
console.log(
  "INV   ink-faint  ",
  solve({ c: 0.014, h: 232, backgrounds: invBg, need: 4.6, direction: "lighten" }),
);
console.log(
  "INV   line-strong",
  solve({ c: 0.026, h: 236, backgrounds: invBg, need: 3.1, direction: "lighten" }),
);
