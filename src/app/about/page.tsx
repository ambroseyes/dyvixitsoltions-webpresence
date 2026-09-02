import Link from "next/link";

import {
  site,
  founder,
  team,
  timeline,
  standards,
  partnerships,
  sectorsServed,
  knowsAbout,
  yearsInOperation,
  FOUNDED_YEAR,
} from "@/lib/site";
import { solutions } from "@/content/solutions";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";
import { MethodTimeline } from "@/components/home/MethodTimeline";

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata = pageMeta({
  title: "About",
  description: site.entityStatement,
  path: "/about",
});

/**
 * Tier 1 entity page (§88) — where an AI system looks to establish what kind
 * of organisation this is. Every assertion is sourced from the corporate
 * technical profile or the company deck, or explicitly marked unconfirmed.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "AboutPage",
          name: `About ${site.legalName}`,
          url: `${site.url}/about`,
          description: site.entityStatement,
        })}
      />

      <Breadcrumbs trail={trail} />

      <PageHero
        label="The company"
        title={`${yearsInOperation()} years, built one client at a time.`}
        standfirst={site.entityStatement}
      />

      <Container>
        <div className="border-t border-line">
          <SpecRow index="01" label="What we are">
            <div className="max-w-[64ch] space-y-5 text-(length:--text-base) leading-relaxed text-ink-muted">
              <p>
                {site.legalName} was founded in Yaoundé in {FOUNDED_YEAR} on one conviction: Central
                Africa deserves the same technical rigour as Europe. It has grown into a
                seven-person permanent technical team delivering across seven service lines, with
                more than sixty completed projects for government ministries, diplomatic missions,
                international organisations, financial institutions, healthcare providers, telecom
                operators and private companies.
              </p>
              <p>
                The work is engineering rather than resale. We are not a channel for a vendor’s
                product catalogue, and the recommendation at the end of an assessment is frequently
                to change a configuration rather than to buy anything.
              </p>
              <p>
                Being African is not a marketing position here — it changes the engineering.
                Bandwidth cost, link reliability, latency to the nearest cloud region and data
                residency obligations are constraints we design around rather than footnotes. It is
                also the one thing a European or Asian vendor structurally cannot offer: real
                execution capacity on the ground, on West Africa Time.
              </p>
            </div>
          </SpecRow>

          <SpecRow index="02" label="How we got here">
            <ol className="border-l border-line">
              {timeline.map((t) => (
                <li key={t.period} className="relative py-5 pl-8 first:pt-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-7 -left-[5px] size-2.5 skew-x-[-14deg] border border-primary bg-surface first:top-2"
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="rail-index">{t.period}</span>
                    <h3 className="text-(length:--text-h4) font-bold tracking-[-0.01em]">
                      {t.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[60ch] text-(length:--text-base) text-ink-muted">
                    {t.detail}
                  </p>
                </li>
              ))}
            </ol>
          </SpecRow>

          <SpecRow index="03" label="Who we are">
            <p className="mb-7 max-w-[62ch] text-(length:--text-base) text-ink-muted">
              Seven people, direct access, no layers. Roughly 80% of the team is under 35 —
              personally invested in the company’s growth rather than rotating contractors.
            </p>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {team.map((m) => (
                <li key={m.name} className="bg-surface p-5">
                  <p className="text-(length:--text-base) font-bold">{m.name}</p>
                  <p className="mt-1 text-(length:--text-sm) text-ink-muted">{m.role}</p>
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="04" label="Founder">
            <h3 className="text-(length:--text-h3) font-bold tracking-[-0.012em]">
              {founder.name}
            </h3>
            <p className="mt-1.5 text-(length:--text-base) text-ink-muted">
              {founder.role} · {founder.title}
            </p>
            <p className="mt-5 max-w-[64ch] text-(length:--text-base) leading-relaxed text-ink-muted">
              {founder.bio}
            </p>

            <p className="rail-label mt-8 mb-3">Certifications & training</p>
            <ul className="grid gap-2">
              {founder.certifications.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-(length:--text-sm) text-ink-muted"
                >
                  <span aria-hidden="true" className="chevron-mark mt-1.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <p className="rail-label mt-8 mb-2">Languages</p>
            <p className="text-(length:--text-sm) text-ink-muted">
              {founder.languages.join(" · ")}
            </p>
          </SpecRow>

          <SpecRow index="05" label="Standards & partners">
            <ul className="grid gap-4">
              {standards.map((s) => (
                <li key={s.name}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-(length:--text-base) font-bold">{s.name}</span>
                    <Badge tone={s.qualifier === "certified" ? "verified" : "neutral"}>
                      {s.qualifier}
                    </Badge>
                  </div>
                  <p className="mt-1 text-(length:--text-sm) text-ink-muted">{s.note}</p>
                </li>
              ))}
            </ul>

            <p className="rail-label mt-8 mb-3">Technology partnerships</p>
            <ul className="flex flex-wrap gap-2">
              {partnerships.map((p) => (
                <li
                  key={p}
                  className="rounded-(--radius-sm) border border-line bg-surface-raised px-3 py-1.5 font-mono text-(length:--text-micro) text-ink-muted"
                >
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-[62ch] text-(length:--text-sm) leading-relaxed text-ink-faint">
              ISO/IEC 27001 is published here as <em>aligned</em> rather than certified. The
              practices are in place and applied; the wording stays conservative because overstating
              a standard is the fastest way to fail the procurement check it exists to pass. Ask us
              for the current position and we will tell you precisely.
            </p>
          </SpecRow>

          <SpecRow index="06" label="What we deliver">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {solutions.map((s) => (
                <li key={s.slug} className="bg-surface">
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="block p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <span className="rail-index">{s.index}</span>
                    <p className="mt-2 text-(length:--text-base) font-bold">{s.name}</p>
                    <p className="mt-1 text-(length:--text-sm) text-ink-muted">{s.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="07" label="Sectors & expertise">
            <p className="rail-label mb-3">Sectors with delivered work</p>
            <ul className="mb-8 flex flex-wrap gap-2">
              {sectorsServed.map((s) => (
                <li key={s}>
                  <Badge tone="primary">{s}</Badge>
                </li>
              ))}
            </ul>

            <p className="rail-label mb-3">Areas of expertise</p>
            <ul className="flex flex-wrap gap-2">
              {knowsAbout.map((k) => (
                <li
                  key={k}
                  className="rounded-(--radius-sm) border border-line bg-surface-raised px-2.5 py-1 font-mono text-(length:--text-micro) text-ink-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[62ch] text-(length:--text-sm) text-ink-faint">
              A controlled list. A topic appears here only where our delivery record evidences it.
            </p>
          </SpecRow>
        </div>
      </Container>

      <MethodTimeline />

      <CTABand
        title="Start with a conversation."
        body="Tell us what you operate and what worries you about it. We will tell you honestly whether we are the right people."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "See the projects", href: "/projects" }}
      />
    </>
  );
}
