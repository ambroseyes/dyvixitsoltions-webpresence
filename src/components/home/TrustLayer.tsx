import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { localePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { getCompany } from "@/content/company";
import { partnerships, site, yearsInOperation } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

/**
 * §29 — the trust layer.
 *
 * Every figure here carries a documented source. Where a claim is weaker
 * than it could be stated — ISO/IEC 27001 is "aligned", not certified — the
 * weaker wording is the one published. Overstating a standard is the fastest
 * way to fail the procurement check it exists to pass.
 */
export function TrustLayer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home.trust;
  const company = getCompany(lang);

  return (
    <Section
      id="trust"
      index="07"
      label={t.label}
      title={format(t.title, { years: yearsInOperation() })}
      standfirst={t.standfirst}
      className="border-b border-line"
    >
      <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {company.trust.map((m) => (
          <div key={m.label} className="bg-surface p-6">
            <dd className="font-display text-(length:--text-h2) leading-none font-bold tracking-[-0.02em] text-primary">
              {m.value}
            </dd>
            {/* The source line lives inside the <dt>: a <dl> group may contain
                only dt and dd, so a sibling <p> here invalidates the list. */}
            <dt className="mt-3 text-(length:--text-base)">
              {m.label}
              <span className="rail-label mt-4 block">{m.source}</span>
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
        <div className="bg-surface p-6 sm:p-8">
          <h3 className="rail-label">{t.standards}</h3>
          <ul className="mt-5 grid gap-4">
            {company.standards.map((s) => (
              <li key={s.name}>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-(length:--text-base) font-bold">{s.name}</span>
                  <Badge tone={s.qualifier === "certified" ? "verified" : "neutral"}>{t.qualifiers[s.qualifier]}</Badge>
                </div>
                <p className="mt-1 text-(length:--text-sm) text-ink-muted">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[52ch] text-(length:--text-sm) leading-relaxed text-ink-faint">{t.alignedNote}</p>
        </div>

        <div className="bg-surface p-6 sm:p-8">
          <h3 className="rail-label">{t.partnerships}</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {partnerships.map((p) => (
              <li
                key={p}
                className="rounded-(--radius-sm) border border-line bg-surface-raised px-3 py-1.5 font-mono text-(length:--text-micro) text-ink-muted"
              >
                {p}
              </li>
            ))}
          </ul>

          <h3 className="rail-label mt-8">{t.sectors}</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {company.sectors.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-(length:--text-sm) text-ink-muted">
                <Check size={13} strokeWidth={2.25} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                {s}
              </li>
            ))}
          </ul>

          <Link
            href={localePath(lang, "/projects")}
            className="mt-8 inline-flex items-center gap-2 text-(length:--text-sm) font-bold text-primary hover:underline"
          >
            {t.seeEngagements}
            <ArrowRight size={13} aria-hidden="true" />
          </Link>

          <p className="rail-label mt-8">{t.operatingFrom}</p>
          <p className="mt-2 text-(length:--text-sm) text-ink-muted">
            {site.address.locality} &amp; {site.address.secondaryLocality}, {company.countryName}
          </p>
        </div>
      </div>
    </Section>
  );
}
