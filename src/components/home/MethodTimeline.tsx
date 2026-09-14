import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getHome } from "@/content/home";
import { Container } from "@/components/ui/Container";

/**
 * §30 — the engineering method.
 *
 * A dimension line with eight stations. Horizontal scroll on narrow
 * viewports rather than a collapse to a plain list, so the sequence — which
 * is the actual content — survives at every width.
 */
export function MethodTimeline({ lang, index = "06" }: { lang: Locale; index?: string }) {
  const t = getDictionary(lang).home.method;
  const steps = getHome(lang).method;

  return (
    <section
      aria-labelledby="method-heading"
      className="panel-inverse grain relative overflow-hidden"
    >
      <div
        className="schematic-grid-fine pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="py-(--spacing-section)">
          <div className="mb-4 flex items-center gap-3">
            <span className="rail-index">{index}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="rail-label">{t.label}</span>
          </div>

          <h2 id="method-heading" className="max-w-[20ch] text-(length:--text-h2)">
            {t.title}
          </h2>
          <p className="mt-5 max-w-(--container-prose) text-(length:--text-lead) text-ink-muted">
            {t.standfirst}
          </p>

          {/* Scrolls sideways on narrow screens. Its steps contain nothing
              focusable, so the list itself takes focus — otherwise it could
              only be scrolled with a pointer (WCAG 2.1.1). */}
          <ol
            tabIndex={0}
            aria-labelledby="method-heading"
            className="mt-14 flex snap-x snap-mandatory gap-px overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 xl:grid-cols-8"
          >
            {steps.map((m, i) => (
              <li
                key={m.title}
                className="relative w-56 shrink-0 snap-start border-t border-line pt-8 pr-6 lg:w-auto lg:pr-4"
              >
                {/* Station marker sitting on the dimension line. */}
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 size-2.5 rotate-45 border border-primary bg-surface"
                  style={{ backgroundColor: i === 0 ? "var(--c-primary)" : undefined }}
                />
                <span className="rail-index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                  {m.title}
                </h3>
                <p className="mt-2.5 text-(length:--text-sm) leading-relaxed text-ink-muted">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
