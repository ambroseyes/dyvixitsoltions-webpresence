import type { Locale } from "@/i18n/config";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import { EXPERTISE_BASE } from "../expertise/base";
import type { Product, ProductSlug, ProductText } from "../types";
import { PRODUCT_BASE } from "./base";
import { productsEn } from "./en";
import { productsFr } from "./fr";

const TEXT: Record<Locale, Record<ProductSlug, ProductText>> = {
  en: productsEn,
  fr: mapStrings(productsFr, frenchTypography),
};

/** Domains a product is built on, derived from the expertise table. */
const expertiseFor = (slug: ProductSlug) =>
  EXPERTISE_BASE.filter((e) => e.products.includes(slug)).map((e) => e.slug);

const BUILT: Record<Locale, Product[]> = {
  en: PRODUCT_BASE.map((b) => ({ ...b, ...TEXT.en[b.slug], expertise: expertiseFor(b.slug) })),
  fr: PRODUCT_BASE.map((b) => ({ ...b, ...TEXT.fr[b.slug], expertise: expertiseFor(b.slug) })),
};

export const PRODUCT_SLUGS: ProductSlug[] = PRODUCT_BASE.map((b) => b.slug);

export function getProducts(lang: Locale): Product[] {
  return BUILT[lang];
}

export function getProductBySlug(lang: Locale, slug: string): Product | undefined {
  return BUILT[lang].find((p) => p.slug === slug);
}

/** A product earns a detail page only once it has a confirmed description. */
export function hasDetailPage(product: Product): boolean {
  return product.description !== null;
}
