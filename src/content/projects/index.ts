import type { Locale } from "@/i18n/config";
import { frenchTypography, mapStrings } from "@/i18n/typography";
import { EXPERTISE_BASE } from "../expertise/base";
import type { Project, ProjectSlug, ProjectText } from "../types";
import { PROJECT_BASE } from "./base";
import { projectsEn } from "./en";
import { projectsFr } from "./fr";

const TEXT: Record<Locale, Record<ProjectSlug, ProjectText>> = {
  en: projectsEn,
  fr: mapStrings(projectsFr, frenchTypography),
};

/** Domains a project evidences, derived from the expertise table. */
const expertiseFor = (slug: ProjectSlug) =>
  EXPERTISE_BASE.filter((e) => e.projects.includes(slug)).map((e) => e.slug);

const BUILT: Record<Locale, Project[]> = {
  en: PROJECT_BASE.map((b) => ({ ...b, ...TEXT.en[b.slug], expertise: expertiseFor(b.slug) })),
  fr: PROJECT_BASE.map((b) => ({ ...b, ...TEXT.fr[b.slug], expertise: expertiseFor(b.slug) })),
};

export const PROJECT_SLUGS: ProjectSlug[] = PROJECT_BASE.map((b) => b.slug);

export function getProjects(lang: Locale): Project[] {
  return BUILT[lang];
}

export function getProjectsBySlugs(lang: Locale, slugs: readonly ProjectSlug[]): Project[] {
  return BUILT[lang].filter((p) => slugs.includes(p.slug));
}
