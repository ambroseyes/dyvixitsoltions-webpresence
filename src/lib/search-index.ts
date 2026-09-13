import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getExpertise } from "@/content/expertise";
import { getIndustries } from "@/content/industries";
import { getArticles } from "@/content/insights";
import { getProducts } from "@/content/products";
import { productHref } from "./nav";
import { normalizeText, type SearchEntry } from "./search";

type Part = string | null | undefined | readonly string[];

const words = (...parts: Part[]) =>
  normalizeText(
    parts
      .flat()
      .filter((p): p is string => typeof p === "string" && p.length > 0)
      .join(" "),
  );

/**
 * Keywords for actions and pages carry both languages: a bilingual reader
 * types whichever word comes first, and these entries are few.
 */
const KEYWORDS = {
  assessment: "audit assessment security infrastructure review posture scan evaluation diagnostic",
  project: "contact project quote enquiry brief email phone projet devis demande",
  finder: "finder recommend help where to start unsure advice recommandation aide commencer",
  expertise: "expertise domains capabilities services poles domaines competences",
  solutions: "solutions products platforms back-node sacrecheici lexora aegis produits plateformes",
  projects: "case studies work evidence portfolio references clients realisations",
  insights: "articles blog engineering writing guides publications analyses",
  about: "company who we are team history entreprise equipe histoire",
  contact: "email phone whatsapp reach us address location telephone adresse",
} as const;

/**
 * Search index for the command palette, per locale.
 *
 * Keywords include capability descriptions and the problems each domain
 * solves. People search for the thing they need — "firewall", "backup",
 * "disaster recovery" — not for the name of a service line.
 */
export function buildSearchIndex(lang: Locale): SearchEntry[] {
  const dict = getDictionary(lang);
  const L = (href: string) => localePath(lang, href);

  const expertise: SearchEntry[] = getExpertise(lang).map((e) => ({
    label: e.name,
    href: L(`/expertise/${e.slug}`),
    group: "expertise",
    keywords: words(
      e.name,
      e.shortName,
      e.summary,
      e.definition,
      e.technologies,
      e.capabilities.map((c) => `${c.title} ${c.description}`),
      e.problemsSolved,
      e.approach.map((a) => `${a.title} ${a.description}`),
      e.outcomes,
    ),
  }));

  const products: SearchEntry[] = getProducts(lang).map((p) => ({
    label: p.name,
    href: L(productHref(p)),
    group: "solutions",
    keywords: words(
      p.name,
      p.tagline,
      p.description,
      p.stack,
      p.capabilities.map((c) => `${c.title} ${c.description}`),
    ),
  }));

  const industries: SearchEntry[] = getIndustries(lang).map((i) => ({
    label: i.name,
    href: L(`/industries/${i.slug}`),
    group: "industries",
    keywords: words(i.name, i.summary, i.pressures, i.risks),
  }));

  const articles: SearchEntry[] = getArticles(lang).map((a) => ({
    label: a.title,
    href: L(`/insights/${a.slug}`),
    group: "insights",
    keywords: words(a.title, a.description, a.topics),
  }));

  const a = dict.command.actions;
  const n = dict.nav;
  const fixed: SearchEntry[] = [
    { label: a.assessment, href: L("/request-audit"), group: "actions", keywords: words(a.assessment, KEYWORDS.assessment) },
    { label: a.project, href: L("/contact"), group: "actions", keywords: words(a.project, KEYWORDS.project) },
    { label: a.finder, href: L("/#solution-finder"), group: "actions", keywords: words(a.finder, KEYWORDS.finder) },
    { label: n.expertise, href: L("/expertise"), group: "pages", keywords: words(n.expertise, KEYWORDS.expertise) },
    { label: n.solutions, href: L("/solutions"), group: "pages", keywords: words(n.solutions, KEYWORDS.solutions) },
    { label: n.projects, href: L("/projects"), group: "pages", keywords: words(n.projects, KEYWORDS.projects) },
    { label: n.insights, href: L("/insights"), group: "pages", keywords: words(n.insights, KEYWORDS.insights) },
    { label: n.about, href: L("/about"), group: "pages", keywords: words(n.about, KEYWORDS.about) },
    { label: n.contact, href: L("/contact"), group: "pages", keywords: words(n.contact, KEYWORDS.contact) },
  ];

  return [...expertise, ...products, ...industries, ...articles, ...fixed];
}
