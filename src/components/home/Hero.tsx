import { ArrowRight } from "lucide-react";

import { localePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { getCompany } from "@/content/company";
import { getExpertise } from "@/content/expertise";
import { site, yearsInOperation } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EcosystemDiagram, type DiagramNode } from "@/components/diagrams/EcosystemDiagram";

/**
 * Hero.
 *
 * Server-rendered apart from the diagram island, so the headline, the
 * standfirst and the canonical description are all present in the initial
 * HTML — the single most important GEO property of the page.
 */
export function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home.hero;
  const company = getCompany(lang);
  const stat = (i: number) => company.trust[i]?.value ?? "";

  const nodes: DiagramNode[] = getExpertise(lang).map((e) => ({
    id: e.slug,
    label: e.shortName,
    name: e.name,
    description: e.summary,
    tech: e.technologies.slice(0, 4),
    href: localePath(lang, `/expertise/${e.slug}`),
  }));

  const stats = [
    { k: t.since, v: format(t.statYears, { years: yearsInOperation() }) },
    { k: stat(1), v: t.statProjects },
    { k: stat(2), v: t.statSectors },
  ];

  return (
    <section aria-labelledby="hero-heading" className="grain relative overflow-hidden border-b border-line">
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Single soft light source, top-left, to give the sheet some depth
          without resorting to a floating gradient blob. */}
      <div
        className="pointer-events-none absolute -top-1/3 -left-1/4 size-[70rem] max-w-[140vw] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--c-primary), transparent 65%)" }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 py-(--spacing-section) lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="@container">
            <p className="rail-label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="chevron-mark" aria-hidden="true" />
              {t.since}
              <span className="text-line-strong" aria-hidden="true">
                /
              </span>
              {site.address.locality} &amp; {site.address.secondaryLocality}
              <span className="text-line-strong" aria-hidden="true">
                /
              </span>
              {company.areaServed.join(" · ")}
            </p>

            <h1
              id="hero-heading"
              // Container-relative so the headline holds its intended three-line
              // break inside its own column at every width. Sized for
              // Quattrocento, which sets noticeably wider than a grotesque, and
              // tracked near zero because serifs crowd under tight tracking.
              className="mt-7 text-[clamp(2.125rem,8.4cqw,4rem)] leading-[1.02] font-bold tracking-[-0.012em]"
            >
              {t.headline1}
              <br />
              {t.headline2}
              <span className="text-signal">.</span>
              <br />
              <span className="text-ink-muted">{t.headline3}</span>
            </h1>

            <p className="mt-8 max-w-[52ch] text-(length:--text-lead) leading-relaxed text-ink-muted">
              {company.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={localePath(lang, "/contact")} size="lg">
                {t.ctaPrimary}
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
              <Button href={localePath(lang, "/expertise")} size="lg" variant="secondary">
                {t.ctaSecondary}
              </Button>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-px border border-line bg-line">
              {stats.map((item) => (
                <div key={item.v} className="bg-surface p-4">
                  <dt className="rail-index">{item.k}</dt>
                  <dd className="mt-2 text-(length:--text-sm) leading-snug text-ink-muted">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="rail-label mb-6 lg:text-right">{t.graph}</p>
            <EcosystemDiagram nodes={nodes} exploreLabel={t.explore} />
          </div>
        </div>
      </Container>
    </section>
  );
}
