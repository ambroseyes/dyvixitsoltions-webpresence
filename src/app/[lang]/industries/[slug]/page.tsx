import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react";

import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getExpertiseBySlug } from "@/content/expertise";
import { INDUSTRY_SLUGS, getIndustryBySlug } from "@/content/industries";
import type { Expertise } from "@/content/types";
import { breadcrumbTrail } from "@/lib/nav";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";
import { Button } from "@/components/ui/Button";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { CTABand } from "@/components/ui/CTABand";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

async function load(params: Props["params"]) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const industry = getIndustryBySlug(lang, slug);
  if (!industry) notFound();
  return { lang, industry };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, industry } = await load(params);
  return pageMeta({
    lang,
    title: industry.name,
    description: `${industry.summary} ${industry.standfirst}`,
    path: `/industries/${industry.slug}`,
  });
}

/**
 * Sector page. Describes the pressures and risks characteristic of the
 * sector — it does not claim delivered work there; evidence lives on the
 * expertise pages and in projects.
 */
export default async function IndustryPage({ params }: Props) {
  const { lang, industry } = await load(params);
  const dict = getDictionary(lang);
  const t = dict.industries.detail;
  const L = (href: string) => localePath(lang, href);

  const trail = breadcrumbTrail(lang, [
    { name: dict.nav.industries, path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ]);
  const mapped = industry.expertise
    .map((slug) => getExpertiseBySlug(lang, slug))
    .filter((x): x is Expertise => x !== undefined);

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(industry.faqs))} />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero
        index={industry.index}
        label={`${t.label} — ${industry.name}`}
        title={industry.headline}
        standfirst={industry.standfirst}
      >
        <Button href={L("/request-audit")} size="lg">
          {dict.nav.requestAssessment}
          <ArrowRight size={15} aria-hidden="true" />
        </Button>
      </PageHero>

      <Container>
        <div className="border-t border-line">
          <SpecRow index="01" label={t.pressures}>
            <ul className="grid gap-px border border-line bg-line">
              {industry.pressures.map((p) => (
                <li
                  key={p}
                  className="bg-surface px-5 py-4 text-(length:--text-base) text-ink-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="02" label={t.risks}>
            <ul className="grid gap-3">
              {industry.risks.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 border-l-2 border-risk/50 py-1 pl-5 text-(length:--text-base)"
                >
                  <TriangleAlert
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-risk"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="03" label={t.whereWeStart}>
            <ol className="grid gap-px border border-line bg-line">
              {mapped.map((e, n) => (
                <li key={e.slug} className="bg-surface">
                  <Link
                    href={L(`/expertise/${e.slug}`)}
                    className="group flex items-start justify-between gap-6 p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="rail-index">{String(n + 1).padStart(2, "0")}</span>
                        <h3 className="text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                          {e.name}
                        </h3>
                      </div>
                      <p className="mt-2 pl-9 text-(length:--text-sm) leading-relaxed text-ink-muted">
                        {e.summary}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-primary opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-[62ch] text-(length:--text-sm) text-ink-faint">
              {t.orderNote}
            </p>
          </SpecRow>
        </div>
      </Container>

      <FaqBlock
        faqs={industry.faqs}
        index="04"
        title={format(dict.common.faqTitle, { name: industry.name })}
        label={dict.common.questions}
      />

      <CTABand
        title={t.ctaTitle}
        body={t.ctaBody}
        primary={{ label: dict.nav.requestAssessment, href: L("/request-audit") }}
        secondary={{ label: t.allIndustries, href: L("/industries") }}
      />
    </>
  );
}
