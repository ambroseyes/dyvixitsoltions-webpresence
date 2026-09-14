import type { Metadata } from "next";
import Link from "next/link";

import { HTML_LANG, localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { resolveLang } from "@/i18n/params";
import { getCompany } from "@/content/company";
import { getExpertise } from "@/content/expertise";
import { breadcrumbTrail } from "@/lib/nav";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { founder, partnerships, site, yearsInOperation } from "@/lib/site";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SpecRow } from "@/components/ui/SpecRow";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";
import { MethodTimeline } from "@/components/home/MethodTimeline";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({
    lang,
    title: getDictionary(lang).nav.about,
    description: getCompany(lang).entityStatement,
    path: "/about",
  });
}

/**
 * Tier 1 entity page (§88) — where an AI system looks to establish what kind
 * of organisation this is. Every assertion is sourced from the corporate
 * technical profile or the company deck, or explicitly marked unconfirmed.
 */
export default async function AboutPage({ params }: Props) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const t = dict.about;
  const company = getCompany(lang);
  const trail = breadcrumbTrail(lang, [{ name: dict.nav.about, path: "/about" }]);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "AboutPage",
          name: `${dict.nav.about} — ${site.legalName}`,
          url: absoluteUrl(localePath(lang, "/about")),
          description: company.entityStatement,
          inLanguage: HTML_LANG[lang],
        })}
      />

      <Breadcrumbs trail={trail} label={dict.nav.breadcrumbLabel} />

      <PageHero
        label={t.label}
        title={format(t.title, { years: yearsInOperation() })}
        standfirst={company.entityStatement}
      />

      <Container>
        <div className="border-t border-line">
          <SpecRow index="01" label={t.whatWeAre}>
            <div className="max-w-[64ch] space-y-5 text-(length:--text-base) leading-relaxed text-ink-muted">
              {company.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SpecRow>

          <SpecRow index="02" label={t.history}>
            <ol className="border-l border-line">
              {company.timeline.map((step) => (
                <li key={step.period} className="relative py-5 pl-8 first:pt-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-7 -left-[5px] size-2.5 skew-x-[-14deg] border border-primary bg-surface first:top-2"
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="rail-index">{step.period}</span>
                    <h3 className="text-(length:--text-h4) font-bold tracking-[-0.01em]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[60ch] text-(length:--text-base) text-ink-muted">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </SpecRow>

          <SpecRow index="03" label={t.team}>
            <p className="mb-7 max-w-[62ch] text-(length:--text-base) text-ink-muted">
              {t.teamNote}
            </p>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {company.team.map((m) => (
                <li key={m.name} className="bg-surface p-5">
                  <p className="text-(length:--text-base) font-bold">{m.name}</p>
                  <p className="mt-1 text-(length:--text-sm) text-ink-muted">{m.role}</p>
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="04" label={t.founder}>
            <h3 className="text-(length:--text-h3) font-bold tracking-[-0.012em]">
              {founder.name}
            </h3>
            <p className="mt-1.5 text-(length:--text-base) text-ink-muted">
              {company.founder.role} · {company.founder.title}
            </p>
            <p className="mt-5 max-w-[64ch] text-(length:--text-base) leading-relaxed text-ink-muted">
              {company.founder.bio}
            </p>

            <p className="rail-label mt-8 mb-3">{t.certifications}</p>
            <ul className="grid gap-2">
              {company.founder.certifications.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-(length:--text-sm) text-ink-muted"
                >
                  <span aria-hidden="true" className="chevron-mark mt-1.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <p className="rail-label mt-8 mb-2">{t.languages}</p>
            <p className="text-(length:--text-sm) text-ink-muted">
              {company.founder.languages.join(" · ")}
            </p>
          </SpecRow>

          <SpecRow index="05" label={t.standards}>
            <ul className="grid gap-4">
              {company.standards.map((s) => (
                <li key={s.name}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-(length:--text-base) font-bold">{s.name}</span>
                    <Badge tone={s.qualifier === "certified" ? "verified" : "neutral"}>
                      {dict.home.trust.qualifiers[s.qualifier]}
                    </Badge>
                  </div>
                  <p className="mt-1 text-(length:--text-sm) text-ink-muted">{s.note}</p>
                </li>
              ))}
            </ul>

            <p className="rail-label mt-8 mb-3">{t.partnerships}</p>
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
              {t.isoNote}
            </p>
          </SpecRow>

          <SpecRow index="06" label={t.deliver}>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {getExpertise(lang).map((e) => (
                <li key={e.slug} className="bg-surface">
                  <Link
                    href={localePath(lang, `/expertise/${e.slug}`)}
                    className="block h-full p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <span className="rail-index">{e.index}</span>
                    <p className="mt-2 text-(length:--text-base) font-bold">{e.name}</p>
                    <p className="mt-1 text-(length:--text-sm) text-ink-muted">{e.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow index="07" label={t.sectors}>
            <p className="rail-label mb-3">{t.sectorsDelivered}</p>
            <ul className="mb-8 flex flex-wrap gap-2">
              {company.sectors.map((s) => (
                <li key={s}>
                  <Badge tone="primary">{s}</Badge>
                </li>
              ))}
            </ul>

            <p className="rail-label mb-3">{t.areas}</p>
            <ul className="flex flex-wrap gap-2">
              {company.knowsAbout.map((k) => (
                <li
                  key={k}
                  className="rounded-(--radius-sm) border border-line bg-surface-raised px-2.5 py-1 font-mono text-(length:--text-micro) text-ink-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[62ch] text-(length:--text-sm) text-ink-faint">
              {t.areasNote}
            </p>
          </SpecRow>
        </div>
      </Container>

      <MethodTimeline lang={lang} index="08" />

      <CTABand
        title={t.ctaTitle}
        body={t.ctaBody}
        primary={{ label: dict.nav.startProject, href: localePath(lang, "/contact") }}
        secondary={{ label: t.seeProjects, href: localePath(lang, "/projects") }}
      />
    </>
  );
}
