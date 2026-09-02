import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { site, trustMetrics, standards, partnerships, sectorsServed } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

/**
 * §29 — the trust layer.
 *
 * Every figure here now carries a documented source. Where a claim is weaker
 * than it could be stated — ISO/IEC 27001 is "aligned", not certified — the
 * weaker wording is the one published. Overstating a standard is the fastest
 * way to fail the procurement check it exists to pass.
 */
export function TrustLayer() {
  return (
    <Section
      id="trust"
      index="07"
      label="Evidence"
      title="Fourteen years, and the receipts to go with them."
      standfirst="Every number below comes from our own delivery record. Where a claim is qualified, the qualification is published with it."
      className="border-b border-line"
    >
      <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {trustMetrics.map((m) => (
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
          <h3 className="rail-label">Standards</h3>
          <ul className="mt-5 grid gap-4">
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
          <p className="mt-6 max-w-[52ch] text-(length:--text-sm) leading-relaxed text-ink-faint">
            “Aligned” means the practices are in place and applied — signed NDAs before any access
            to sensitive systems, least-privilege access limited to assigned team members, secure
            development practices. Ask us for the current certification position before relying on
            it in a tender; we will not overstate it.
          </p>
        </div>

        <div className="bg-surface p-6 sm:p-8">
          <h3 className="rail-label">Technology partnerships</h3>
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

          <h3 className="rail-label mt-8">Sectors delivered into</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {sectorsServed.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2.5 text-(length:--text-sm) text-ink-muted"
              >
                <Check
                  size={13}
                  strokeWidth={2.25}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-primary"
                />
                {s}
              </li>
            ))}
          </ul>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 text-(length:--text-sm) font-bold text-primary hover:underline"
          >
            See the engagements behind these numbers
            <ArrowRight size={13} aria-hidden="true" />
          </Link>

          <p className="rail-label mt-8">Operating from</p>
          <p className="mt-2 text-(length:--text-sm) text-ink-muted">
            {site.address.locality} &amp; {site.address.secondaryLocality},{" "}
            {site.address.countryName}
          </p>
        </div>
      </div>
    </Section>
  );
}
