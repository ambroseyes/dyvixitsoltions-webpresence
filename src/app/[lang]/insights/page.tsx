import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleDashed } from "lucide-react";

import { HTML_LANG, localePath } from "@/i18n/config";
import { formatDate } from "@/i18n/date";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getArticles } from "@/content/insights";
import { getPages } from "@/content/pages";
import { breadcrumbTrail } from "@/lib/nav";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { ORG_ID, breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/lib/site";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABand } from "@/components/ui/CTABand";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return pageMeta({
    lang,
    title: dict.nav.insights,
    description: dict.insights.standfirst,
    path: "/insights",
  });
}

export default async function InsightsPage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const t = dict.insights;
  const articles = getArticles(lang);
  const planned = getPages(lang).insightsPlanned;
  const trail = breadcrumbTrail(lang, [{ name: dict.nav.insights, path: "/insights" }]);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "Blog",
          name: `${site.legalName} — ${t.label}`,
          url: absoluteUrl(localePath(lang, "/insights")),
          description: t.standfirst,
          publisher: { "@id": ORG_ID },
          inLanguage: HTML_LANG[lang],
        })}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero label={t.label} title={t.title} standfirst={t.standfirst} />

      <section aria-labelledby="articles-heading" className="border-b border-line">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2 id="articles-heading" className="rail-label mb-8">
              {t.published}
            </h2>

            <ul className="border-t border-line">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={localePath(lang, `/insights/${a.slug}`)}
                    className="group grid gap-4 border-b border-line py-9 transition-colors duration-(--duration-normal) hover:bg-surface-raised lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] lg:gap-10"
                  >
                    <div>
                      <time dateTime={a.published} className="rail-label block">
                        {formatDate(lang, a.published, "short")}
                      </time>
                      <span className="rail-label mt-1.5 block text-ink-faint">
                        {format(dict.common.minRead, { minutes: a.readingMinutes })}
                      </span>
                    </div>

                    <div>
                      <h3 className="max-w-[24ch] text-(length:--text-h3) font-semibold tracking-[-0.025em]">
                        {a.title}
                      </h3>
                      <p className="mt-3 max-w-[62ch] text-(length:--text-base) leading-relaxed text-ink-muted">
                        {a.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                        {a.topics.map((topic) => (
                          <li
                            key={topic}
                            className="font-mono text-(length:--text-micro) text-ink-faint"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ArrowUpRight
                      size={20}
                      aria-hidden="true"
                      className="hidden shrink-0 self-center text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-1 group-hover:-translate-y-1 lg:block"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="planned-heading" className="border-b border-line bg-surface-sunken">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <div className="flex items-center gap-3">
              <CircleDashed
                size={15}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-ink-faint"
              />
              <h2 id="planned-heading" className="rail-label">
                {t.queueTitle}
              </h2>
            </div>
            <p className="mt-5 max-w-[62ch] text-(length:--text-base) text-ink-muted">
              {t.queueNote}
            </p>
            <ul className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2">
              {planned.map((p, i) => (
                <li key={p} className="flex items-start gap-3 bg-surface p-5">
                  <span className="rail-index shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-(length:--text-sm) text-ink-muted">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABand
        title={t.ctaTitle}
        body={t.ctaBody}
        primary={{ label: dict.nav.startProject, href: localePath(lang, "/contact") }}
        secondary={{ label: dict.nav.requestAssessment, href: localePath(lang, "/request-audit") }}
      />
    </>
  );
}
