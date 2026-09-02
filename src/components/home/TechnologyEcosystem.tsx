import { techCategories } from "@/content/technologies";
import { Section } from "@/components/ui/Section";

/**
 * §15 — technology ecosystem.
 *
 * Fully server-rendered: every technology name is in the initial HTML, which
 * is what makes the organisation -> technology edge extractable (§58). An
 * interactive filter here would have hidden most of the list from crawlers
 * for no reader benefit.
 *
 * These are working technologies. No partner tiers, badges or certification
 * claims are implied — §15 forbids stating any that are unconfirmed.
 */
export function TechnologyEcosystem() {
  return (
    <Section
      id="technology"
      index="05"
      label="Technology"
      title="What we actually work with."
      standfirst="Tools we deploy and operate. Listed as capability, not as partnership or certification."
      className="border-b border-line"
    >
      <dl className="border-t border-line">
        {techCategories.map((cat) => (
          <div
            key={cat.id}
            className="group grid gap-4 border-b border-line py-7 transition-colors duration-(--duration-normal) hover:bg-surface-raised md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-10"
          >
            <dt>
              <h3 className="text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                {cat.label}
              </h3>
              <p className="mt-1.5 text-(length:--text-sm) leading-snug text-ink-faint">
                {cat.note}
              </p>
            </dt>
            <dd className="flex flex-wrap items-start gap-2 self-center">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-(--radius-sm) border border-line bg-surface px-2.5 py-1 font-mono text-(length:--text-micro) tracking-[0.02em] text-ink-muted transition-colors duration-(--duration-fast) group-hover:border-line-strong"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
