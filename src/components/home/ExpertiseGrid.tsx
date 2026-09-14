import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { localePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { getExpertise } from "@/content/expertise";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * The nine domains.
 *
 * A cascading 2 / 3 / 4 rhythm on a twelve-column track rather than a
 * uniform card grid: scale steps down row by row, so the page has a reading
 * order instead of nine items of equal weight.
 */
const TIER = (i: number) => (i < 2 ? "wide" : i < 5 ? "mid" : "narrow");

const SPAN = {
  wide: "lg:col-span-6",
  mid: "lg:col-span-4",
  narrow: "lg:col-span-3",
} as const;

const TECH_COUNT = { wide: 5, mid: 4, narrow: 3 } as const;

export function ExpertiseGrid({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home.expertise;
  const domains = getExpertise(lang);

  return (
    <Section
      id="expertise"
      index="04"
      label={t.label}
      title={format(t.title, { count: domains.length })}
      standfirst={t.standfirst}
      className="border-b border-line"
    >
      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-12">
        {domains.map((d, i) => {
          const tier = TIER(i);
          // An odd count leaves one orphan on the two-column track; it spans.
          const last = i === domains.length - 1 && domains.length % 2 === 1;
          return (
            <li
              key={d.slug}
              className={cn("bg-surface", SPAN[tier], last && "sm:col-span-2 lg:col-span-3")}
            >
              <Link
                href={localePath(lang, `/expertise/${d.slug}`)}
                className="group flex h-full flex-col p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rail-index">{d.index}</span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="-translate-x-1 translate-y-1 text-primary opacity-0 transition-all duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>

                <h3
                  className={cn(
                    "mt-6 font-semibold tracking-[-0.025em]",
                    tier === "wide" ? "text-(length:--text-h3)" : "text-(length:--text-h4)",
                  )}
                >
                  {d.name}
                </h3>

                <p className="mt-3 flex-1 text-(length:--text-sm) leading-relaxed text-ink-muted">
                  {d.summary}
                </p>

                <div className="dimension-rule mt-7 mb-4" aria-hidden="true" />

                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {d.technologies.slice(0, TECH_COUNT[tier]).map((tech) => (
                    <li key={tech} className="font-mono text-(length:--text-micro) text-ink-faint">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
