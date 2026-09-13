import { describe, expect, test } from "vitest";
import { frenchTypography, mapStrings } from "./typography";
import { format } from "./format";

const NBSP = " ";
const NNBSP = " ";

describe("frenchTypography", () => {
  test("puts a narrow no-break space before ; ! ?", () => {
    expect(frenchTypography("Pourquoi ?")).toBe(`Pourquoi${NNBSP}?`);
    expect(frenchTypography("Enfin !")).toBe(`Enfin${NNBSP}!`);
    expect(frenchTypography("un ; deux")).toBe(`un${NNBSP}; deux`);
  });

  test("puts a no-break space before a colon and inside guillemets", () => {
    expect(frenchTypography("Technologies : Docker")).toBe(`Technologies${NBSP}: Docker`);
    expect(frenchTypography("« aligné »")).toBe(`«${NBSP}aligné${NBSP}»`);
  });

  test("keeps digit groups and percentages together", () => {
    expect(frenchTypography("plus de 3 500 To")).toBe(`plus de 3${NBSP}500 To`);
    expect(frenchTypography("environ 80 %")).toBe(`environ 80${NBSP}%`);
    expect(frenchTypography("1 000 000")).toBe(`1${NBSP}000${NBSP}000`);
  });

  test("leaves text without the patterns unchanged", () => {
    expect(frenchTypography("Depuis 2012")).toBe("Depuis 2012");
    expect(frenchTypography("de 2013 à 2021")).toBe("de 2013 à 2021");
  });
});

describe("mapStrings", () => {
  test("transforms nested prose without touching identifiers", () => {
    const input = {
      title: "Pourquoi ?",
      cta: { label: "Parler ?", href: "/contact?scope=x" },
      items: ["un ?", "deux ?"],
      slug: "que-faire ?",
    };
    const out = mapStrings(input, frenchTypography);
    expect(out.title).toBe(`Pourquoi${NNBSP}?`);
    expect(out.cta.label).toBe(`Parler${NNBSP}?`);
    expect(out.cta.href).toBe("/contact?scope=x");
    expect(out.items).toEqual([`un${NNBSP}?`, `deux${NNBSP}?`]);
    expect(out.slug).toBe("que-faire ?");
  });

  test("returns a new object and never mutates the input", () => {
    const input = { title: "Quoi ?" };
    const out = mapStrings(input, frenchTypography);
    expect(input.title).toBe("Quoi ?");
    expect(out).not.toBe(input);
  });

  test("passes numbers, booleans and null through", () => {
    const out = mapStrings({ n: 3, b: true, z: null }, frenchTypography);
    expect(out).toEqual({ n: 3, b: true, z: null });
  });
});

describe("format", () => {
  test("fills placeholders", () => {
    expect(format("{years} years", { years: 14 })).toBe("14 years");
    expect(format("{a} and {b}", { a: "x", b: "y" })).toBe("x and y");
  });

  test("leaves unknown placeholders visible", () => {
    expect(format("Hello {name}", {})).toBe("Hello {name}");
  });
});
