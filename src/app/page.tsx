import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { faqSchema, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

import { Hero } from "@/components/home/Hero";
import { ProblemMatrix } from "@/components/home/ProblemMatrix";
import { BuildSecureOperate } from "@/components/home/BuildSecureOperate";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { TechnologyEcosystem } from "@/components/home/TechnologyEcosystem";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { TrustLayer } from "@/components/home/TrustLayer";
import { AnswerLayer, homeFaqs } from "@/components/home/AnswerLayer";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export const metadata = pageMeta({
  title: `${site.legalName} — ${site.tagline}`,
  description: site.entityStatement,
  path: "/",
  keywords: [
    "IT engineering Cameroon",
    "cybersecurity Cameroon",
    "IT infrastructure Africa",
    "cloud migration Cameroon",
    "software engineering Yaoundé",
    "managed IT services Cameroon",
  ],
});

/**
 * Homepage.
 *
 * Section order follows the §11 attention architecture:
 * attention (hero) -> curiosity (problems) -> relevance (proposition) ->
 * understanding (finder, solutions, technology) -> trust (method, evidence,
 * answers) -> action (CTA).
 *
 * Only three sections ship client JS — the diagram, the problem tabs and the
 * finder. Everything else is server-rendered HTML.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(faqSchema(homeFaqs))} />
      <Hero />
      <ProblemMatrix />
      <BuildSecureOperate />
      <SolutionFinder />
      <SolutionsGrid />
      <TechnologyEcosystem />
      <MethodTimeline />
      <TrustLayer />
      <AnswerLayer />
      <ClosingCTA />
    </>
  );
}
