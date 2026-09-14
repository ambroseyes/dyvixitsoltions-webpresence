import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getExpertise } from "@/content/expertise";
import { getIndustries } from "@/content/industries";
import { getProducts, hasDetailPage } from "@/content/products";
import type { Product } from "@/content/types";

export type NavLeaf = { label: string; href: string; note?: string };

export type NavGroup = {
  label: string;
  /** Public, localised href. */
  href: string;
  /** Locale-agnostic path used for the active state. */
  match: string;
  allLabel?: string;
  children?: NavLeaf[];
  feature?: NavLeaf;
};

export type FooterColumn = { label: string; links: NavLeaf[] };

export type Crumb = { name: string; path: string };

/**
 * Breadcrumb trail starting at Home. Takes locale-agnostic paths and returns
 * public ones, ready for both <Breadcrumbs> and BreadcrumbList schema.
 */
export function breadcrumbTrail(lang: Locale, items: Crumb[]): Crumb[] {
  const home = getDictionary(lang).nav.home;
  return [
    { name: home, path: localePath(lang, "/") },
    ...items.map((c) => ({ ...c, path: localePath(lang, c.path) })),
  ];
}

/** Products without a confirmed description are cards on /solutions, not pages. */
export function productHref(product: Product): string {
  return hasDetailPage(product) ? `/solutions/${product.slug}` : `/solutions#${product.slug}`;
}

/**
 * Primary navigation, derived from content so a new domain, product or sector
 * appears in the menu, the sitemap and the internal-link graph at once — §70
 * forbids orphan pages, and generating the menu is how that is enforced.
 */
export function getPrimaryNav(lang: Locale): NavGroup[] {
  const dict = getDictionary(lang);
  const d = dict.nav;
  const L = (href: string) => localePath(lang, href);

  return [
    {
      label: d.expertise,
      href: L("/expertise"),
      match: "/expertise",
      allLabel: d.allExpertise,
      children: getExpertise(lang).map((e) => ({
        label: e.name,
        href: L(`/expertise/${e.slug}`),
        note: e.summary,
      })),
      feature: { label: d.finderLabel, href: L("/#solution-finder") },
    },
    {
      label: d.solutions,
      href: L("/solutions"),
      match: "/solutions",
      allLabel: d.allSolutions,
      children: getProducts(lang).map((p) => ({
        label: p.name,
        href: L(productHref(p)),
        note: p.tagline ?? dict.solutions.status[p.status],
      })),
    },
    { label: d.projects, href: L("/projects"), match: "/projects" },
    {
      label: d.industries,
      href: L("/industries"),
      match: "/industries",
      allLabel: dict.industries.detail.allIndustries,
      children: getIndustries(lang).map((i) => ({
        label: i.name,
        href: L(`/industries/${i.slug}`),
        note: i.summary,
      })),
    },
    { label: d.insights, href: L("/insights"), match: "/insights" },
    { label: d.about, href: L("/about"), match: "/about" },
  ];
}

export function getFooterNav(lang: Locale): FooterColumn[] {
  const dict = getDictionary(lang);
  const d = dict.nav;
  const L = (href: string) => localePath(lang, href);

  return [
    {
      label: d.expertise,
      links: getExpertise(lang).map((e) => ({ label: e.name, href: L(`/expertise/${e.slug}`) })),
    },
    {
      label: d.bySector,
      links: getIndustries(lang).map((i) => ({ label: i.name, href: L(`/industries/${i.slug}`) })),
    },
    {
      label: dict.footer.company,
      links: [
        { label: d.about, href: L("/about") },
        { label: d.solutions, href: L("/solutions") },
        { label: d.projects, href: L("/projects") },
        { label: d.insights, href: L("/insights") },
        { label: d.contact, href: L("/contact") },
      ],
    },
    {
      label: dict.footer.engage,
      links: [
        { label: d.requestAssessment, href: L("/request-audit") },
        { label: d.startProject, href: L("/contact") },
        { label: dict.footer.privacy, href: L("/privacy") },
        { label: dict.footer.legal, href: L("/legal") },
      ],
    },
  ];
}
