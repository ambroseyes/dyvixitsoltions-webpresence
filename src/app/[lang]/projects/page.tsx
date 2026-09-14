import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getCompany } from "@/content/company";
import { getExpertiseBySlug } from "@/content/expertise";
import { getProjects } from "@/content/projects";
import type { Expertise } from "@/content/types";
import { breadcrumbTrail } from "@/lib/nav";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/lib/site";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return pageMeta({
    lang,
    title: dict.nav.projects,
    description: format(dict.projects.standfirst, { count: getProjects(lang).length }),
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const t = dict.projects;
  const projects = getProjects(lang);
  const trail = breadcrumbTrail(lang, [{ name: dict.nav.projects, path: "/projects" }]);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: `${site.legalName} — ${t.heading}`,
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${p.client} — ${p.title}`,
          })),
        })}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero
        label={t.label}
        title={t.title}
        standfirst={format(t.standfirst, { count: projects.length })}
      />

      <section aria-labelledby="projects-heading" className="border-b border-line">
        <Container>
          <h2 id="projects-heading" className="sr-only">
            {t.heading}
          </h2>

          <ul className="border-t border-line">
            {projects.map((p) => {
              const domains = p.expertise
                .map((slug) => getExpertiseBySlug(lang, slug))
                .filter((x): x is Expertise => x !== undefined);
              return (
                <li key={p.slug} id={p.slug} className="scroll-mt-24">
                  <article className="grid gap-6 border-b border-line py-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                      <div className="flex items-center gap-3">
                        <span className="rail-index">{p.index}</span>
                        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                        <span className="rail-label">{p.period}</span>
                      </div>
                      <h3 className="mt-4 text-(length:--text-h4) font-bold tracking-[-0.01em]">
                        {p.client}
                      </h3>
                      <p className="mt-1.5 text-(length:--text-sm) text-ink-faint">{p.sector}</p>

                      {p.metric && (
                        <div className="mt-6 border-l-2 border-primary pl-4">
                          <p className="font-display text-(length:--text-h3) leading-none font-bold tracking-[-0.02em] text-primary">
                            {p.metric.value}
                          </p>
                          <p className="mt-2 text-(length:--text-sm) leading-snug text-ink-muted">
                            {p.metric.label}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="max-w-[30ch] text-(length:--text-h3) font-bold tracking-[-0.012em]">
                        {p.title}
                      </h4>

                      <dl className="mt-6 grid gap-5">
                        <div>
                          <dt className="rail-label">{t.challenge}</dt>
                          <dd className="mt-1.5 max-w-[64ch] text-(length:--text-base) text-ink-muted">
                            {p.challenge}
                          </dd>
                        </div>
                        <div>
                          <dt className="rail-label">{t.whatWeDid}</dt>
                          <dd className="mt-1.5 max-w-[64ch] text-(length:--text-base) text-ink-muted">
                            {p.contribution}
                          </dd>
                        </div>
                        <div>
                          <dt className="rail-label text-primary">{t.outcome}</dt>
                          <dd className="mt-1.5 max-w-[64ch] text-(length:--text-base)">
                            {p.outcome}
                          </dd>
                        </div>
                      </dl>

                      <ul className="mt-6 flex flex-wrap gap-1.5">
                        {p.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-(--radius-sm) border border-line px-2 py-0.5 font-mono text-(length:--text-micro) text-ink-faint"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                        {domains.map((e) => (
                          <li key={e.slug}>
                            <Link
                              href={localePath(lang, `/expertise/${e.slug}`)}
                              className="group inline-flex items-center gap-1.5 text-(length:--text-sm) font-bold text-primary hover:underline"
                            >
                              {e.name}
                              <ArrowUpRight size={12} aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="sectors-heading" className="border-b border-line bg-surface-sunken">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2 id="sectors-heading" className="rail-label mb-6">
              {t.sectorsTitle}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {getCompany(lang).sectors.map((s) => (
                <li key={s}>
                  <Badge tone="primary">{s}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[64ch] text-(length:--text-sm) leading-relaxed text-ink-faint">
              {t.ndaNote}
            </p>
          </div>
        </Container>
      </section>

      <CTABand
        title={t.ctaTitle}
        body={t.ctaBody}
        primary={{ label: dict.nav.requestAssessment, href: localePath(lang, "/request-audit") }}
        secondary={{ label: t.seeExpertise, href: localePath(lang, "/expertise") }}
      />
    </>
  );
}
