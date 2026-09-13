/**
 * Content model.
 *
 * Every entity is split into a locale-independent base (slug, relations,
 * links) and per-locale text. Text files are typed Record<Slug, Text>, so an
 * entity added to the base without a translation fails to compile, and a
 * translation for an entity that does not exist fails too.
 *
 * Nothing here is invented: every evidence item traces to the corporate
 * technical profile, the company deck, the Back-Node repository or the
 * previous site. See README "Content sourcing".
 */

export type FAQ = { q: string; a: string };
export type Capability = { title: string; description: string };
export type Step = { title: string; description: string };
export type EvidenceItem = { claim: string; detail: string };

export type ExpertiseSlug =
  | "digital-engineering"
  | "cloud-infrastructure"
  | "cybersecurity"
  | "ai-data"
  | "networks-telecom"
  | "iot-edge"
  | "product-engineering"
  | "consulting-rd"
  | "managed-services";

export type ProductSlug = "back-node" | "sacrecheici" | "lexora-ai" | "aegis";

export type ProjectSlug =
  | "creolink-storage"
  | "sopecam-surveillance"
  | "ministry-public-works-edm"
  | "cyberlink-wireless"
  | "fodecc-security"
  | "feicom-virtualization"
  | "pndp-cnc-virtualization"
  | "welldone-call-centre"
  | "diplomatic-mission-security";

export type IndustrySlug =
  | "financial-services"
  | "government"
  | "healthcare"
  | "education"
  | "sme"
  | "critical-infrastructure";

export type ArticleSlug = "multi-wan-failover-that-actually-fails-over";

/* ---------- Expertise (the nine domains) ---------- */

export type ExpertiseBase = {
  slug: ExpertiseSlug;
  index: string;
  related: ExpertiseSlug[];
  /** Delivered engagements that evidence this domain. */
  projects: ProjectSlug[];
  /** D’Yvix platforms built on this domain. */
  products: ProductSlug[];
  /** The service line as published on the previous French site, or null. */
  historicalService: string | null;
  ctaHref: string;
};

export type ExpertiseText = {
  name: string;
  /** Short label for the capability graph and compact menus. */
  shortName: string;
  summary: string;
  headline: string;
  standfirst: string;
  /** §64 — an explicit, extractable definition naming the organisation. */
  definition: string;
  whoNeedsIt: string[];
  problemsSolved: string[];
  capabilities: Capability[];
  approach: Step[];
  technologies: string[];
  outcomes: string[];
  evidence: EvidenceItem[];
  faqs: FAQ[];
  ctaLabel: string;
};

export type Expertise = ExpertiseBase & ExpertiseText;

/* ---------- Products (what D’Yvix has built) ---------- */

export type ProductStatus = "production" | "development" | "forthcoming";

export type ProductBase = { slug: ProductSlug; name: string; status: ProductStatus };

export type ProductText = {
  tagline: string | null;
  /** null = not yet documented: the product gets a card, not a page. */
  description: string | null;
  capabilities: Capability[];
  architecture: string[];
  stack: string[];
};

/** `expertise` is derived from EXPERTISE_BASE.products, never stored twice. */
export type Product = ProductBase & ProductText & { expertise: ExpertiseSlug[] };

/* ---------- Projects (delivered engagements) ---------- */

export type ProjectBase = { slug: ProjectSlug; index: string };

export type ProjectText = {
  client: string;
  sector: string;
  period: string;
  title: string;
  challenge: string;
  contribution: string;
  outcome: string;
  technologies: string[];
  metric: { value: string; label: string } | null;
};

/** `expertise` is derived from EXPERTISE_BASE.projects, never stored twice. */
export type Project = ProjectBase & ProjectText & { expertise: ExpertiseSlug[] };

/* ---------- Industries ---------- */

export type IndustryBase = { slug: IndustrySlug; index: string; expertise: ExpertiseSlug[] };

export type IndustryText = {
  name: string;
  summary: string;
  headline: string;
  standfirst: string;
  pressures: string[];
  risks: string[];
  faqs: FAQ[];
};

export type Industry = IndustryBase & IndustryText;

/* ---------- Homepage ---------- */

export type Problem = {
  id: string;
  label: string;
  symptom: string;
  consequence: string;
  response: string;
  expertise: ExpertiseSlug;
};

export type FinderOption = {
  id: string;
  prompt: string;
  recommendation: string;
  rationale: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
  expertise: ExpertiseSlug;
};

export type Pillar = { verb: string; lede: string; items: string[]; href: string };

export type TechCategory = { id: string; label: string; note: string; items: string[] };

export type HomeContent = {
  problems: Problem[];
  finder: FinderOption[];
  pillars: Pillar[];
  method: Step[];
  answers: FAQ[];
  techCategories: TechCategory[];
};

/* ---------- Company ---------- */

export type Standard = { name: string; qualifier: "aligned" | "certified"; note: string };

export type CompanyContent = {
  /** §79 — the canonical sentence. Identical in the DOM, meta and schema. */
  entityStatement: string;
  tagline: string;
  description: string;
  countryName: string;
  /** Same order as site.areaServed. */
  areaServed: string[];
  intro: string[];
  timeline: { period: string; title: string; detail: string }[];
  team: { name: string; role: string }[];
  founder: {
    role: string;
    title: string;
    bio: string;
    certifications: string[];
    languages: string[];
  };
  standards: Standard[];
  sectors: string[];
  knowsAbout: string[];
  trust: { label: string; value: string; source: string }[];
};

/* ---------- Insights ---------- */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; lang: string; code: string };

export type ArticleBase = {
  slug: ArticleSlug;
  published: string;
  updated?: string;
  readingMinutes: number;
  expertise: ExpertiseSlug[];
};

export type ArticleText = { title: string; description: string; topics: string[]; body: Block[] };

export type Article = ArticleBase & ArticleText;

/* ---------- Pages with long-form copy ---------- */

export type LegalSection = { label: string; paragraphs: string[]; placeholder?: string };

export type LegalPage = {
  /** Hero rail label and <title>; `description` may use {legalName} / {url}. */
  label: string;
  metaTitle: string;
  description: string;
  title: string;
  standfirst: string;
  sections: LegalSection[];
};

export type PagesContent = {
  privacy: LegalPage;
  legal: LegalPage & {
    publisherLabels: { name: string; email: string; phone: string; location: string };
  };
  auditFaqs: FAQ[];
  insightsPlanned: string[];
};
