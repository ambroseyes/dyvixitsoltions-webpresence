import type { Verification } from "@/lib/site";

export type FAQ = { q: string; a: string };

export type Capability = { title: string; description: string };

export type ApproachStep = { step: string; title: string; description: string };

/**
 * Solution content model.
 *
 * The field order deliberately mirrors §63 (AI-readable service pages):
 * definition -> audience -> problems -> capabilities -> approach ->
 * technologies -> outcomes -> evidence -> faqs -> cta.
 * Rendering follows the same order so the extractable structure and the
 * visual structure never diverge.
 */
export type Solution = {
  slug: string;
  /** Two-digit index rendered in the mono rail. */
  index: string;
  name: string;
  /** One-line nav/menu summary. */
  summary: string;
  headline: string;
  standfirst: string;
  /** §64 — an explicit, extractable definition. No inference required. */
  definition: string;
  whoNeedsIt: string[];
  problemsSolved: string[];
  capabilities: Capability[];
  approach: ApproachStep[];
  technologies: string[];
  outcomes: string[];
  /** null = no publishable case evidence yet. Rendered as a stated gap. */
  evidence: { claim: string; detail: string }[] | null;
  faqs: FAQ[];
  cta: { label: string; href: string };
  related: string[];
  /**
   * Traceability to the service line published on the current French site.
   * null means this is a stated capability with no current-site counterpart
   * and must be confirmed with the client before launch.
   */
  sourceService: string | null;
  verification: Verification;
};

export type Industry = {
  slug: string;
  index: string;
  name: string;
  summary: string;
  headline: string;
  standfirst: string;
  pressures: string[];
  risks: string[];
  /** Solution slugs, ordered by relevance to this sector. */
  solutions: string[];
  faqs: FAQ[];
  verification: Verification;
};

export type TechCategory = {
  id: string;
  label: string;
  /** Rendered as the category's technical annotation. */
  note: string;
  items: string[];
};

export type Problem = {
  id: string;
  index: string;
  label: string;
  symptom: string;
  consequence: string;
  response: string;
  solution: string;
};
