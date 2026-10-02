import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { EXPERTISE_SLUGS } from "@/content/expertise";
import { PRODUCT_SLUGS } from "@/content/products";
import { EXPERTISE_GLYPHS } from "./expertise-glyphs";
import { PRODUCT_GLYPHS } from "./product-glyphs";

/**
 * A domain or product added without its drawing would ship a card with a
 * hole in it, so the maps are pinned to the content, both ways.
 */
describe("service glyphs", () => {
  test("there is exactly one per domain and one per product", () => {
    expect(Object.keys(EXPERTISE_GLYPHS).sort()).toEqual([...EXPERTISE_SLUGS].sort());
    expect(Object.keys(PRODUCT_GLYPHS).sort()).toEqual([...PRODUCT_SLUGS].sort());
  });

  test.each(EXPERTISE_SLUGS)("%s draws a decorative svg carrying the accent", (slug) => {
    const { container } = render(EXPERTISE_GLYPHS[slug]());
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(svg?.getAttribute("focusable")).toBe("false");
    expect(container.querySelector("[data-accent]")).not.toBeNull();
  });

  test.each(PRODUCT_SLUGS)("%s draws a decorative svg carrying the accent", (slug) => {
    const { container } = render(PRODUCT_GLYPHS[slug]());
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(svg?.getAttribute("focusable")).toBe("false");
    expect(container.querySelector("[data-accent]")).not.toBeNull();
  });
});
