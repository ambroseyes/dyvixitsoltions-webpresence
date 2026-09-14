import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { EXPERTISE_SLUGS, getExpertiseBySlug } from "@/content/expertise";
import { getProducts } from "@/content/products";
import { getProjectsBySlugs } from "@/content/projects";
import type { Expertise, ProductStatus } from "@/content/types";
import { breadcrumbTrail, productHref } from "@/lib/nav";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { CTABand } from "@/components/ui/CTABand";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return EXPERTISE_SLUGS.map((slug) => ({ slug }));
}

const STATUS_TONE: Record<ProductStatus, "verified" | "info" | "neutral"> = {
  production: "verified",
  development: "info",
  forthcoming: "neutral",
};

async function load(params: Props["params"]) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const expertise = getExpertiseBySlug(lang, slug);
  if (!expertise) notFound();
  return { lang, expertise };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, expertise: e } = await load(params);
  return pageMeta({
    lang,
    title: e.name,
    // The definition doubles as the meta description: one extractable
    // statement, identical in the DOM, the description and Service schema.
    description: e.definition,
    path: `/expertise/${e.slug}`,
    keywords: e.technologies,
  });
}

export default async function ExpertiseDomainPage({ params }: Props) {
  const { lang, expertise: e } = await load(params);
  const dict = getDictionary(lang);
  const t = dict.expertise.detail;
  const L = (href: string) => localePath(lang, href);

  const trail = breadcrumbTrail(lang, [
    { name: dict.nav.expertise, path: "/expertise" },
    { name: e.name, path: `/expertise/${e.slug}` },
  ]);
  const related = e.related
    .map((slug) => getExpertiseBySlug(lang, slug))
    .filter((x): x is Expertise => x !== undefined);
  const projects = getProjectsBySlugs(lang, e.projects);
  const products = getProducts(lang).filter((p) => e.products.includes(p.slug));

  // Rows are numbered as rendered, so an omitted row never leaves a gap.
  let row = 0;
  const next = () => String(++row).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={graph(serviceSchema(lang, e.slug), breadcrumbSchema(trail), faqSchema(e.faqs))}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero index={e.index} label={t.label} title={e.headline} standfirst={e.standfirst}>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={L(e.ctaHref)} size="lg">
            {e.ctaLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
          <Button href={L(`/contact?scope=${e.slug}`)} size="lg" variant="secondary">
            {t.talkToEngineer}
          </Button>
        </div>
      </PageHero>

      {/* §64 — the explicit definition, given its own weight. */}
      <section
        aria-labelledby="definition-heading"
        className="border-b border-line bg-surface-sunken"
      >
        <Container>
          <div className="grid gap-6 py-(--spacing-section-tight) md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-12">
            <h2 id="definition-heading" className="rail-label">
              {t.whatThisIs}
            </h2>
            <p className="max-w-[62ch] text-(length:--text-lead) leading-relaxed">{e.definition}</p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="border-t border-line">
          <SpecRow index={next()} label={t.whoNeedsIt}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {e.whoNeedsIt.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 text-(length:--text-base) text-ink-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-primary"
                  />
                  {w}
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index={next()} label={t.problemsSolved}>
            <ul className="grid gap-px border border-line bg-line">
              {e.problemsSolved.map((p) => (
                <li
                  key={p}
                  className="bg-surface px-5 py-3.5 text-(length:--text-base) text-ink-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index={next()} label={t.whatWeProvide}>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {e.capabilities.map((c) => (
                <li key={c.title} className="bg-surface p-6">
                  <h3 className="text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-(length:--text-sm) leading-relaxed text-ink-muted">
                    {c.description}
                  </p>
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index={next()} label={t.approach}>
            <ol className="grid gap-0">
              {e.approach.map((a, i) => (
                <li
                  key={a.title}
                  className="relative grid gap-2 border-l border-line py-4 pl-8 last:pb-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-6 -left-[5px] size-2.5 rotate-45 border border-primary bg-surface"
                  />
                  <h3 className="flex items-baseline gap-3 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                    <span className="rail-index">{String(i + 1).padStart(2, "0")}</span>
                    {a.title}
                  </h3>
                  <p className="text-(length:--text-base) text-ink-muted">{a.description}</p>
                </li>
              ))}
            </ol>
          </SpecRow>

          <SpecRow index={next()} label={t.technologies}>
            <ul className="flex flex-wrap gap-2">
              {e.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-(--radius-sm) border border-line bg-surface-raised px-3 py-1.5 font-mono text-(length:--text-micro) text-ink-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[60ch] text-(length:--text-sm) text-ink-faint">
              {t.technologiesNote}
            </p>
          </SpecRow>

          <SpecRow index={next()} label={t.outcomes}>
            <ul className="grid gap-3">
              {e.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-(length:--text-base)">
                  <Check
                    size={15}
                    strokeWidth={2.25}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-verified"
                  />
                  {o}
                </li>
              ))}
            </ul>
          </SpecRow>

          {/* §16/§29 — evidence is stated with its source, never inflated. */}
          <SpecRow index={next()} label={t.evidence}>
            <ul className="grid gap-4">
              {e.evidence.map((ev) => (
                <li key={ev.claim}>
                  <h3 className="text-(length:--text-h4) font-semibold">{ev.claim}</h3>
                  <p className="mt-1.5 text-(length:--text-sm) text-ink-muted">{ev.detail}</p>
                </li>
              ))}
            </ul>

            {projects.length > 0 && (
              <>
                <p className="rail-label mt-8 mb-3">{dict.nav.projects}</p>
                <ul className="grid gap-2">
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={L(`/projects#${p.slug}`)}
                        className="inline-flex items-baseline gap-2 text-(length:--text-sm) text-primary hover:underline"
                      >
                        {p.client} — {p.title}
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {e.historicalService && (
              <p className="mt-6 flex flex-wrap items-center gap-2 text-(length:--text-sm) text-ink-faint">
                <Badge tone="verified">{t.continuity}</Badge>
                <span>{e.historicalService}</span>
              </p>
            )}
          </SpecRow>

          {products.length > 0 && (
            <SpecRow index={next()} label={t.solutionsBuilt}>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {products.map((p) => (
                  <li key={p.slug} className="bg-surface">
                    <Link
                      href={L(productHref(p))}
                      className="group flex h-full flex-col p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                    >
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                          {p.name}
                        </span>
                        <Badge tone={STATUS_TONE[p.status]}>
                          {dict.solutions.status[p.status]}
                        </Badge>
                      </div>
                      {p.tagline && (
                        <p className="mt-2.5 text-(length:--text-sm) leading-relaxed text-ink-muted">
                          {p.tagline}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </SpecRow>
          )}
        </div>
      </Container>

      <FaqBlock
        faqs={e.faqs}
        index={next()}
        title={format(dict.common.faqTitle, { name: e.name })}
        label={dict.common.questions}
      />

      {/* §70 — contextual internal links. No domain page is a dead end. */}
      <section aria-labelledby="related-heading" className="border-b border-line">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2 id="related-heading" className="rail-label mb-8">
              {t.related}
            </h2>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="bg-surface">
                  <Link
                    href={L(`/expertise/${r.slug}`)}
                    className="group flex h-full flex-col p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rail-index">{r.index}</span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="text-primary opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="mt-5 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-(length:--text-sm) text-ink-muted">{r.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABand
        title={`${e.ctaLabel}.`}
        body={t.ctaBody}
        primary={{ label: e.ctaLabel, href: L(e.ctaHref) }}
        secondary={{ label: t.allExpertise, href: L("/expertise") }}
      />
    </>
  );
}
