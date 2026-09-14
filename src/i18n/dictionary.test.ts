import { describe, expect, test } from "vitest";
import { en } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import { getDictionary } from "./get-dictionary";

type Tree = { [key: string]: unknown };

/** Flattens a dictionary into "a.b.c" -> value pairs. */
function leaves(tree: unknown, prefix = ""): [string, unknown][] {
  if (tree && typeof tree === "object" && !Array.isArray(tree)) {
    return Object.entries(tree as Tree).flatMap(([k, v]) =>
      leaves(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [[prefix, tree]];
}

const placeholders = (s: unknown) =>
  typeof s === "string" ? [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]) : [];

describe("dictionary parity", () => {
  const enLeaves = new Map(leaves(en));
  const frLeaves = new Map(leaves(fr));

  test("French has exactly the English keys", () => {
    expect([...frLeaves.keys()].sort()).toEqual([...enLeaves.keys()].sort());
  });

  test("no value is empty in either language", () => {
    for (const [k, v] of [...enLeaves, ...frLeaves]) {
      if (typeof v === "string") expect(v.trim(), k).not.toBe("");
    }
  });

  test("lists have the same length in both languages", () => {
    for (const [k, v] of enLeaves) {
      if (Array.isArray(v)) expect((frLeaves.get(k) as unknown[]).length, k).toBe(v.length);
    }
  });

  test("French never introduces a placeholder English does not fill", () => {
    for (const [k, v] of frLeaves) {
      const allowed = new Set(placeholders(enLeaves.get(k)));
      for (const p of placeholders(v)) expect(allowed.has(p), `${k} uses {${p}}`).toBe(true);
    }
  });
});

describe("getDictionary", () => {
  test("returns the English reference untouched", () => {
    expect(getDictionary("en")).toBe(en);
  });

  test("applies French typography: no breakable space before ? in French", () => {
    const flat = leaves(getDictionary("fr"))
      .map(([, v]) => v)
      .filter((v) => typeof v === "string");
    for (const s of flat as string[]) expect(s).not.toMatch(/ [?!;:]/);
  });
});
