import type { Metadata } from "next";

import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getCompany } from "@/content/company";
import { getHome } from "@/content/home";
import { pageMeta } from "@/lib/seo";
import { faqSchema, graph } from "@/lib/schema";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

import { Hero } from "@/components/home/Hero";
import { ProblemMatrix } from "@/components/home/ProblemMatrix";
import { BuildSecureOperate } from "@/components/home/BuildSecureOperate";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { ExpertiseGrid } from "@/components/home/ExpertiseGrid";
import { TechnologyEcosystem } from "@/components/home/TechnologyEcosystem";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { TrustLayer } from "@/components/home/TrustLayer";
import { AnswerLayer } from "@/components/home/AnswerLayer";
import { ClosingCTA } from "@/components/home/ClosingCTA";

type Props = { params: Promise<{ lang: string }> };

const KEYWORDS: Record<Locale, string[]> = {
  en: [
    "digital engineering Cameroon",
    "IT engineering company Yaoundé",
    "cybersecurity Cameroon",
    "cloud infrastructure Africa",
    "software engineering Cameroon",
    "AI and automation Cameroon",
    "managed IT services Cameroon",
  ],
  fr: [
    "ingénierie numérique Cameroun",
    "société d’ingénierie informatique Yaoundé",
    "cybersécurité Cameroun",
    "infrastructure cloud Afrique",
    "développement logiciel Cameroun",
    "IA et automatisation Cameroun",
    "infogérance Cameroun",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const company = getCompany(lang);
  return pageMeta({
    lang,
    title: `${site.legalName} — ${company.tagline}`,
    description: company.entityStatement,
    path: "/",
    keywords: KEYWORDS[lang],
    absoluteTitle: true,
  });
}

/**
 * Homepage.
 *
 * Section order follows the §11 attention architecture:
 * attention (hero) -> curiosity (problems) -> relevance (proposition) ->
 * understanding (finder, domains, technology) -> trust (method, evidence,
 * answers) -> action (CTA).
 *
 * Only three sections ship client JS — the diagram, the problem tabs and the
 * finder. Everything else is server-rendered HTML.
 */
export default async function HomePage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const home = getHome(lang);

  return (
    <>
      <JsonLd data={graph(faqSchema(home.answers))} />
      <Hero lang={lang} />
      <ProblemMatrix
        problems={home.problems.map((p) => ({ ...p, href: localePath(lang, `/expertise/${p.expertise}`) }))}
        labels={dict.home.problems}
      />
      <BuildSecureOperate lang={lang} />
      <SolutionFinder
        options={home.finder.map((o) => ({ ...o, href: localePath(lang, o.ctaHref) }))}
        labels={dict.home.finder}
      />
      <ExpertiseGrid lang={lang} />
      <TechnologyEcosystem lang={lang} />
      <MethodTimeline lang={lang} />
      <TrustLayer lang={lang} />
      <AnswerLayer lang={lang} answers={home.answers} />
      <ClosingCTA lang={lang} />
    </>
  );
}
