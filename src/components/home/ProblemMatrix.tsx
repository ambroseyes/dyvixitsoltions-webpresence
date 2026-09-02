"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { problems } from "@/content/problems";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * §12 — the problem section, as a vertical tab set.
 *
 * Implements the WAI-ARIA tabs pattern with manual activation on arrow keys,
 * so a keyboard user can traverse the list without triggering a panel change
 * on every keypress. All six panels are rendered; inactive ones are hidden
 * with the `hidden` attribute, which keeps the copy in the DOM for crawlers
 * while removing it from the accessibility tree.
 */
export function ProblemMatrix() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = problems.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section
      id="problems"
      index="01"
      label="The stakes"
      title="Your technology should never become your business risk."
      standfirst="Six failure modes account for most of what goes wrong. Each has a recognisable symptom, a cost, and a response that is well understood."
      className="border-b border-line"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div
          role="tablist"
          aria-label="Common technology risks"
          aria-orientation="vertical"
          className="border-t border-line"
        >
          {problems.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`problem-tab-${p.id}`}
                aria-selected={isActive}
                aria-controls={`problem-panel-${p.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "group flex w-full items-baseline gap-4 border-b border-line py-5 text-left transition-colors duration-(--duration-fast)",
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                <span className={cn("rail-index shrink-0", !isActive && "text-ink-faint")}>
                  {p.index}
                </span>
                <span className="flex-1 text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                  {p.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 shrink-0 rotate-45 self-center transition-all duration-(--duration-normal) ease-(--ease-out-expo)",
                    isActive
                      ? "scale-100 bg-primary"
                      : "scale-0 bg-line-strong group-hover:scale-100",
                  )}
                />
              </button>
            );
          })}
        </div>

        <div>
          {problems.map((p, i) => (
            <div
              key={p.id}
              role="tabpanel"
              id={`problem-panel-${p.id}`}
              aria-labelledby={`problem-tab-${p.id}`}
              hidden={i !== active}
              tabIndex={0}
              className="brackets border border-line bg-surface-raised p-6 sm:p-8"
            >
              <dl className="grid gap-7">
                <div>
                  <dt className="rail-label text-ink-faint">Symptom</dt>
                  <dd className="mt-2 text-(length:--text-lead) leading-snug font-medium">
                    {p.symptom}
                  </dd>
                </div>
                <div className="border-l-2 border-risk/50 pl-5">
                  <dt className="rail-label text-risk">Consequence</dt>
                  <dd className="mt-2 text-(length:--text-base) text-ink-muted">{p.consequence}</dd>
                </div>
                <div className="border-l-2 border-primary pl-5">
                  <dt className="rail-label text-primary">D’Yvix response</dt>
                  <dd className="mt-2 text-(length:--text-base) text-ink-muted">{p.response}</dd>
                </div>
              </dl>

              <Link
                href={`/solutions/${p.solution}`}
                className="mt-8 inline-flex items-center gap-2 text-(length:--text-sm) font-medium text-primary hover:underline"
              >
                See how we approach this
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
