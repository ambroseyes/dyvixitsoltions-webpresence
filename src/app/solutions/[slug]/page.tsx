import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CircleDashed } from "lucide-react";

import { solutions, solutionBySlug } from "@/content/solutions";
import { VERIFICATION } from "@/lib/site";
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

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.name} Services`,
    // The definition doubles as the meta description: one extractable
    // statement, identical in the DOM, the description and Service schema.
    description: s.definition,
    path: `/solutions/${s.slug}`,
    keywords: s.technologies,
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: s.name, path: `/solutions/${s.slug}` },
  ];

  const related = s.related.map(solutionBySlug).filter(Boolean);

  return (
    <>
      <JsonLd data={graph(serviceSchema(s.slug), breadcrumbSchema(trail), faqSchema(s.faqs))} />

      <Breadcrumbs trail={trail} />

      <PageHero index={s.index} label="Solution" title={s.headline} standfirst={s.standfirst}>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={s.cta.href} size="lg">
            {s.cta.label}
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Talk to an engineer
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
              What this is
            </h2>
            <p className="max-w-[62ch] text-(length:--text-lead) leading-relaxed">{s.definition}</p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="border-t border-line">
          <SpecRow index="01" label="Who needs it">
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.whoNeedsIt.map((w) => (
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

          <SpecRow index="02" label="Problems solved">
            <ul className="grid gap-px border border-line bg-line">
              {s.problemsSolved.map((p) => (
                <li
                  key={p}
                  className="bg-surface px-5 py-3.5 text-(length:--text-base) text-ink-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="03" label="What we provide">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {s.capabilities.map((c) => (
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

          <SpecRow index="04" label="How we approach it">
            <ol className="grid gap-0">
              {s.approach.map((a) => (
                <li
                  key={a.step}
                  className="relative grid gap-2 border-l border-line py-4 pl-8 last:pb-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-6 -left-[5px] size-2.5 rotate-45 border border-primary bg-surface"
                  />
                  <h3 className="flex items-baseline gap-3 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                    <span className="rail-index">{a.step}</span>
                    {a.title}
                  </h3>
                  <p className="text-(length:--text-base) text-ink-muted">{a.description}</p>
                </li>
              ))}
            </ol>
          </SpecRow>

          <SpecRow index="05" label="Technologies">
            <ul className="flex flex-wrap gap-2">
              {s.technologies.map((t) => (
                <li
                  key={t}
                  className="rounded-(--radius-sm) border border-line bg-surface-raised px-3 py-1.5 font-mono text-(length:--text-micro) text-ink-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[60ch] text-(length:--text-sm) text-ink-faint">
              Technologies we deploy and operate. Listed as working capability — not as vendor
              partnership, certification or accreditation.
            </p>
          </SpecRow>

          <SpecRow index="06" label="Expected outcomes">
            <ul className="grid gap-3">
              {s.outcomes.map((o) => (
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

          {/* §16/§29 — evidence is stated, and its absence is stated too. */}
          <SpecRow index="07" label="Evidence">
            {s.evidence ? (
              <ul className="grid gap-4">
                {s.evidence.map((e) => (
                  <li key={e.claim}>
                    <h3 className="text-(length:--text-h4) font-semibold">{e.claim}</h3>
                    <p className="mt-1.5 text-(length:--text-sm) text-ink-muted">{e.detail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border border-dashed border-line-strong p-6">
                <div className="flex items-center gap-3">
                  <CircleDashed
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-ink-faint"
                  />
                  <p className="rail-label">No published case study yet</p>
                </div>
                <p className="mt-4 max-w-[62ch] text-(length:--text-sm) leading-relaxed text-ink-muted">
                  Case studies require client approval before publication. Rather than describe
                  unnamed projects that cannot be checked, this section stays open until a
                  client-approved account is available. We will walk through relevant work directly
                  in a scoping conversation.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-(length:--text-sm) font-medium text-primary hover:underline"
                >
                  Ask about comparable work
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            )}

            {s.sourceService ? (
              <p className="mt-6 flex flex-wrap items-center gap-2 text-(length:--text-sm) text-ink-faint">
                <Badge tone="verified">Delivered service line</Badge>
                <span>{s.sourceService}</span>
              </p>
            ) : (
              <p className="mt-6 flex flex-wrap items-center gap-2 text-(length:--text-sm) text-ink-faint">
                <Badge tone="neutral">Stated capability</Badge>
                <span>Confirm scope with us before relying on this for procurement.</span>
              </p>
            )}
          </SpecRow>
        </div>
      </Container>

      <FaqBlock faqs={s.faqs} index="08" title={`${s.name}: common questions`} />

      {/* §70 — contextual internal links. No solution page is a dead end. */}
      <section aria-labelledby="related-heading" className="border-b border-line">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2 id="related-heading" className="rail-label mb-8">
              Related solutions
            </h2>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {related.map((r) => (
                <li key={r!.slug} className="bg-surface">
                  <Link
                    href={`/solutions/${r!.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rail-index">{r!.index}</span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="text-primary opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="mt-5 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                      {r!.name}
                    </h3>
                    <p className="mt-2 text-(length:--text-sm) text-ink-muted">{r!.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABand
        title={s.cta.label + "."}
        body={
          s.verification === VERIFICATION.verified
            ? "Scoped, time-boxed and delivered as a written report you can act on."
            : "Start with a scoping conversation so we can confirm fit before anything is committed."
        }
        primary={{ label: s.cta.label, href: s.cta.href }}
        secondary={{ label: "See all solutions", href: "/solutions" }}
      />
    </>
  );
}
