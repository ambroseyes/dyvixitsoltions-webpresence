import { describe, expect, test } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  test("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  test("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, null, "c")).toBe("a c");
  });

  test("later Tailwind utilities win over earlier conflicting ones", () => {
    expect(cn("p-2", "p-6")).toBe("p-6");
    expect(cn("text-ink", "text-primary")).toBe("text-primary");
  });

  test("keeps utilities that only look like conflicts", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });
});
