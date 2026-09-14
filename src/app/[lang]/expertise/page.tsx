import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getExpertise } from "@/content/expertise";
import { getIndustries } from "@/content/industries";
import { breadcrumbTrail } from "@/lib/nav";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABand } from "@/components/ui/CTABand";
import { TechnologyEcosystem } from "@/components/home/TechnologyEcosystem";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return pageMeta({
    lang,
    title: dict.nav.expertise,
    description: dict.expertise.standfirst,
    path: "/expertise",
  });
}

/**
 * Expertise index — the pillar page for the capability cluster (§61). Every
 * domain page is linked from here, and every domain page links back.
 */
export default async function ExpertisePage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const t = dict.expertise;
  const domains = getExpertise(lang);
  const trail = breadcrumbTrail(lang, [{ name: dict.nav.expertise, path: "/expertise" }]);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: t.listHeading,
          itemListElement: domains.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.name,
            url: absoluteUrl(localePath(lang, `/expertise/${e.slug}`)),
          })),
        })}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero
        label={t.label}
        title={format(t.title, { count: domains.length })}
        standfirst={t.standfirst}
      />

      <section aria-labelledby="expertise-list-heading" className="border-b border-line">
        <Container>
          <h2 id="expertise-list-heading" className="sr-only">
            {t.listHeading}
          </h2>
          <ul className="border-t border-line">
            {domains.map((e) => (
              <li key={e.slug}>
                <Link
                  href={localePath(lang, `/expertise/${e.slug}`)}
                  className="group grid gap-5 border-b border-line py-9 transition-colors duration-(--duration-normal) hover:bg-surface-raised lg:grid-cols-[minmax(0,4rem)_minmax(0,20rem)_minmax(0,1fr)_auto] lg:items-baseline lg:gap-10"
                >
                  <span className="rail-index">{e.index}</span>
                  <h3 className="text-(length:--text-h3) font-semibold tracking-[-0.025em]">
                    {e.name}
                  </h3>
                  <div>
                    <p className="max-w-[58ch] text-(length:--text-base) leading-relaxed text-ink-muted">
                      {e.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                      {e.technologies.slice(0, 6).map((tech) => (
                        <li
                          key={tech}
                          className="font-mono text-(length:--text-micro) text-ink-faint"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="hidden shrink-0 text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-1 group-hover:-translate-y-1 lg:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <TechnologyEcosystem lang={lang} index="02" />

      <section aria-labelledby="sectors-heading" className="border-b border-line bg-surface-sunken">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2
              id="sectors-heading"
              className="text-(length:--text-h3) font-semibold tracking-[-0.025em]"
            >
              {t.sectorsTitle}
            </h2>
            <p className="mt-3 max-w-[62ch] text-(length:--text-base) text-ink-muted">
              {t.sectorsStandfirst}
            </p>
            <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {getIndustries(lang).map((i) => (
                <li key={i.slug} className="bg-surface">
                  <Link
                    href={localePath(lang, `/industries/${i.slug}`)}
                    className="group flex items-center justify-between gap-3 p-5 text-(length:--text-sm) transition-colors duration-(--duration-fast) hover:bg-surface-raised"
                  >
                    {i.name}
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABand
        title={t.ctaTitle}
        body={t.ctaBody}
        primary={{ label: dict.nav.requestAssessment, href: localePath(lang, "/request-audit") }}
        secondary={{ label: t.finder, href: localePath(lang, "/#solution-finder") }}
      />
    </>
  );
}
