import { describe, expect, test } from "vitest";
import { normalizeText, searchIndex, type SearchEntry } from "./search";

describe("normalizeText", () => {
  test("lowercases and strips accents", () => {
    expect(normalizeText("Cybersécurité & Résilience")).toBe("cybersecurite & resilience");
  });

  test("folds French typographic spaces to plain spaces", () => {
    expect(normalizeText("a b c")).toBe("a b c");
  });
});

describe("searchIndex", () => {
  const index: SearchEntry[] = [
    {
      label: "Cybersécurité",
      href: "/fr/expertise/cybersecurity",
      group: "expertise",
      keywords: normalizeText("pare-feu FortiGate"),
    },
    {
      label: "Réseaux",
      href: "/fr/expertise/networks-telecom",
      group: "expertise",
      keywords: normalizeText("fibre optique"),
    },
  ];

  test("an empty query returns everything", () => {
    expect(searchIndex(index, "   ")).toHaveLength(index.length);
  });

  test("matches regardless of accents and case, in keywords or label", () => {
    expect(searchIndex(index, "SECURITE").map((e) => e.href)).toEqual([
      "/fr/expertise/cybersecurity",
    ]);
    expect(searchIndex(index, "réseaux").map((e) => e.href)).toEqual([
      "/fr/expertise/networks-telecom",
    ]);
    expect(searchIndex(index, "Pare-Feu")).toHaveLength(1);
  });

  test("a nonsense query returns nothing rather than everything", () => {
    expect(searchIndex(index, "zzzzqqqq")).toHaveLength(0);
  });

  test("within a group, a label match outranks a keyword-only match", () => {
    const ranked: SearchEntry[] = [
      {
        label: "Cloud",
        href: "/cloud",
        group: "expertise",
        keywords: normalizeText("contrôles de sécurité"),
      },
      { label: "Cybersécurité", href: "/cyber", group: "expertise", keywords: "" },
      {
        label: "Demander un audit",
        href: "/audit",
        group: "actions",
        keywords: normalizeText("sécurité"),
      },
    ];
    expect(searchIndex(ranked, "securite").map((e) => e.href)).toEqual([
      "/cyber",
      "/cloud",
      "/audit",
    ]);
  });

  test("groups keep their order so headings never repeat", () => {
    const mixed: SearchEntry[] = [
      { label: "A", href: "/a", group: "expertise", keywords: "x" },
      { label: "x", href: "/b", group: "actions", keywords: "" },
      { label: "C", href: "/c", group: "expertise", keywords: "x" },
    ];
    const groups = searchIndex(mixed, "x").map((e) => e.group);
    expect(groups).toEqual(["expertise", "expertise", "actions"]);
  });
});
