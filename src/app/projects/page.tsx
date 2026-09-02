import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { site, sectorsServed } from "@/lib/site";
import { projects } from "@/content/projects";
import { solutionBySlug } from "@/content/solutions";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";

const trail = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
];

export const metadata = pageMeta({
  title: "Projects",
  description: `Delivered engagements from ${site.legalName}: virtualisation for public institutions, electronic document management for a government ministry, storage scaled to 3,500 TB, a 92-camera surveillance network, and continuous security for a European diplomatic mission.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: `${site.legalName} — delivered engagements`,
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${p.client} — ${p.title}`,
          })),
        })}
      />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="Evidence"
        title="Named clients. Stated numbers. Nothing rounded up."
        standfirst="Nine engagements drawn from our delivery record, several running five years or more. Where a client cannot be named, the sector is given instead — and no figure appears here that we could not evidence."
      />

      <section aria-labelledby="projects-heading" className="border-b border-line">
        <Container>
          <h2 id="projects-heading" className="sr-only">
            Delivered engagements
          </h2>

          <ul className="border-t border-line">
            {projects.map((p) => (
              <li key={p.slug}>
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
                        <dt className="rail-label">Challenge</dt>
                        <dd className="mt-1.5 max-w-[64ch] text-(length:--text-base) text-ink-muted">
                          {p.challenge}
                        </dd>
                      </div>
                      <div>
                        <dt className="rail-label">What we did</dt>
                        <dd className="mt-1.5 max-w-[64ch] text-(length:--text-base) text-ink-muted">
                          {p.contribution}
                        </dd>
                      </div>
                      <div>
                        <dt className="rail-label text-primary">Outcome</dt>
                        <dd className="mt-1.5 max-w-[64ch] text-(length:--text-base)">
                          {p.outcome}
                        </dd>
                      </div>
                    </dl>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <li
                          key={t}
                          className="rounded-(--radius-sm) border border-line px-2 py-0.5 font-mono text-(length:--text-micro) text-ink-faint"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {p.solutions.map((slug) => {
                        const s = solutionBySlug(slug);
                        if (!s) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/solutions/${slug}`}
                              className="group inline-flex items-center gap-1.5 text-(length:--text-sm) font-bold text-primary hover:underline"
                            >
                              {s.name}
                              <ArrowUpRight size={12} aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="sectors-heading" className="border-b border-line bg-surface-sunken">
        <Container>
          <div className="py-(--spacing-section-tight)">
            <h2 id="sectors-heading" className="rail-label mb-6">
              Sectors with delivered work
            </h2>
            <ul className="flex flex-wrap gap-2">
              {sectorsServed.map((s) => (
                <li key={s}>
                  <Badge tone="primary">{s}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[64ch] text-(length:--text-sm) leading-relaxed text-ink-faint">
              Some engagements are covered by confidentiality agreements and cannot be published in
              detail. Where that applies we can walk through comparable work in a scoping
              conversation under NDA — disclosure to a prospective client is a different question
              from publication.
            </p>
          </div>
        </Container>
      </section>

      <CTABand
        title="Judge us on the assessment."
        body="The fastest way to evaluate an engineering firm is to give it a small, bounded piece of work and read what comes back."
        primary={{ label: "Request an Assessment", href: "/request-audit" }}
        secondary={{ label: "See all solutions", href: "/solutions" }}
      />
    </>
  );
}
