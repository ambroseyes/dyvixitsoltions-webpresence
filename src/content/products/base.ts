import type { ProductBase } from "../types";

/**
 * D’Yvix platforms. Status is stated only as far as a source supports it:
 * SaCrècheIci is "proven in production" per the company deck; Back-Node's
 * repository is under active development; Lexora AI and AEGIS have no
 * documented stage, so they are "forthcoming" rather than guessed.
 */
export const PRODUCT_BASE: ProductBase[] = [
  { slug: "back-node", name: "Back-Node", status: "development" },
  { slug: "sacrecheici", name: "SaCrècheIci", status: "production" },
  { slug: "lexora-ai", name: "Lexora AI", status: "forthcoming" },
  { slug: "aegis", name: "AEGIS / AEGIS-IA", status: "forthcoming" },
];
