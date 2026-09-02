import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { solutions } from "@/content/solutions";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Solution index.
 *
 * Asymmetric by intent: the two service lines with the deepest current
 * evidence occupy the wide cells. Uniform card grids give every item equal
 * weight, which is precisely the hierarchy we do not want here.
 */
export function SolutionsGrid() {
  return (
    <Section
      id="solutions"
      index="04"
      label="Capability"
      title="Seven lines of engineering."
      standfirst="Each is delivered as a defined engagement with a stated scope, not an open-ended retainer."
      className="border-b border-line"
    >
      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
        {solutions.map((s, i) => {
          // First two cells are wide on the 6-column track; the rest are 2-up.
          const wide = i < 2;
          return (
            <li key={s.slug} className={cn("bg-surface", wide ? "lg:col-span-3" : "lg:col-span-2")}>
              <Link
                href={`/solutions/${s.slug}`}
                className="group flex h-full flex-col p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rail-index">{s.index}</span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="-translate-x-1 translate-y-1 text-primary opacity-0 transition-all duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>

                <h3
                  className={cn(
                    "mt-6 font-semibold tracking-[-0.025em]",
                    wide ? "text-(length:--text-h3)" : "text-(length:--text-h4)",
                  )}
                >
                  {s.name}
                </h3>

                <p className="mt-3 flex-1 text-(length:--text-sm) leading-relaxed text-ink-muted">
                  {s.summary}
                </p>

                <div className="dimension-rule mt-7 mb-4" aria-hidden="true" />

                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {s.technologies.slice(0, wide ? 5 : 3).map((t) => (
                    <li key={t} className="font-mono text-(length:--text-micro) text-ink-faint">
                      {t}
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
