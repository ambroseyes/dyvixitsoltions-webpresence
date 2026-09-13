import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { FAQ } from "@/content/types";
import { Section } from "@/components/ui/Section";

/**
 * §62 — answer-engine content.
 *
 * The questions people actually put to an assistant about a company.
 * Answers are written for a human reader first (§82) and are plain
 * server-rendered <dl> markup so extraction needs no interaction. The page
 * passes the same array to FAQPage schema — the rendered copy and the
 * structured data are never allowed to diverge.
 */
export function AnswerLayer({ lang, answers }: { lang: Locale; answers: FAQ[] }) {
  const t = getDictionary(lang).home.answers;

  return (
    <Section
      id="answers"
      index="08"
      label={t.label}
      title={t.title}
      standfirst={t.standfirst}
      className="border-b border-line"
    >
      <dl className="grid gap-px border border-line bg-line md:grid-cols-2">
        {answers.map((f, i) => (
          <div key={f.q} className="bg-surface p-6 sm:p-8">
            {/* dt/dd must be direct children of this wrapper: a <dl> may only
                contain dt, dd, or a div grouping them. */}
            <dt className="flex items-baseline gap-3 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
              <span className="rail-index shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{f.q}</span>
            </dt>
            <dd className="mt-4 pl-9 text-(length:--text-sm) leading-relaxed text-ink-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
