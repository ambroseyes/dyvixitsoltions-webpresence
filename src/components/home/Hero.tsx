import { ArrowRight } from "lucide-react";

import { site, yearsInOperation } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EcosystemDiagram } from "@/components/diagrams/EcosystemDiagram";

/**
 * Hero.
 *
 * Server-rendered apart from the diagram island, so the headline, the
 * standfirst and the canonical entity statement are all present in the
 * initial HTML — the single most important GEO property of the page.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grain relative overflow-hidden border-b border-line"
    >
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
              Since 2012
              <span className="text-line-strong" aria-hidden="true">
                /
              </span>
              {site.address.locality} &amp; {site.address.secondaryLocality}
              <span className="text-line-strong" aria-hidden="true">
                /
              </span>
              {site.areaServed.map((a) => a.name).join(" · ")}
            </p>

            <h1
              id="hero-heading"
              // Container-relative so the headline holds its intended three-line
              // break inside its own column at every width. Sized for
              // Quattrocento, which sets noticeably wider than a grotesque, and
              // tracked near zero because serifs crowd under tight tracking.
              className="mt-7 text-[clamp(2.125rem,8.4cqw,4rem)] leading-[1.02] font-bold tracking-[-0.012em]"
            >
              Systems the institution
              <br />
              cannot afford to lose
              <span className="text-signal">.</span>
              <br />
              <span className="text-ink-muted">Engineered here.</span>
            </h1>

            <p className="mt-8 max-w-[52ch] text-(length:--text-lead) leading-relaxed text-ink-muted">
              {site.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg">
                Start a Project
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
              <Button href="/solutions" size="lg" variant="secondary">
                Explore Solutions
              </Button>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-px border border-line bg-line">
              {[
                { k: "Since 2012", v: `${yearsInOperation()} years in operation` },
                { k: "60+", v: "Projects delivered" },
                { k: "7", v: "Sectors served" },
              ].map((item) => (
                <div key={item.k} className="bg-surface p-4">
                  <dt className="rail-index">{item.k}</dt>
                  <dd className="mt-2 text-(length:--text-sm) leading-snug text-ink-muted">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="rail-label mb-6 lg:text-right">The D’Yvix capability graph</p>
            <EcosystemDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
