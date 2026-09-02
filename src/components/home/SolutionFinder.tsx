"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";

import { finderOptions } from "@/content/problems";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * §14 — Solution Finder.
 *
 * Maps a stated problem to a scoped engagement with named deliverables.
 * The result region is aria-live: unlike the hero diagram, the change here
 * is a consequence of a deliberate choice and is the answer the user asked
 * for, so announcing it is correct rather than noisy.
 */
export function SolutionFinder() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = finderOptions.find((o) => o.id === selectedId) ?? null;

  return (
    <Section
      id="solution-finder"
      index="03"
      label="Solution finder"
      title="What are you trying to solve?"
      standfirst="Pick the statement closest to your situation. You will get a specific engagement with named deliverables — not a brochure."
      className="border-b border-line"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <ul className="grid gap-2">
            {finderOptions.map((o) => {
              const isSelected = o.id === selectedId;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(isSelected ? null : o.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "group flex w-full items-center gap-4 border px-5 py-4 text-left transition-colors duration-(--duration-fast)",
                      isSelected
                        ? "border-primary bg-primary-soft/50 text-ink"
                        : "border-line bg-surface-raised text-ink-muted hover:border-line-strong hover:text-ink",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2 shrink-0 rotate-45 border transition-colors duration-(--duration-fast)",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-line-strong group-hover:border-primary",
                      )}
                    />
                    <span className="text-(length:--text-base)">{o.prompt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
          {!selected && (
            <div className="flex h-full min-h-72 flex-col justify-center border border-dashed border-line-strong p-8 text-center">
              <p className="rail-label">Awaiting selection</p>
              <p className="mt-4 text-(length:--text-base) text-ink-faint">
                Choose a statement and a scoped recommendation appears here.
              </p>
            </div>
          )}

          {selected && (
            <div className="brackets border border-line bg-surface-raised p-6 sm:p-8">
              <p className="rail-label">You selected</p>
              <p className="mt-2 text-(length:--text-base) text-ink-muted">“{selected.prompt}”</p>

              <div className="dimension-rule my-6" aria-hidden="true" />

              <p className="rail-label text-primary">Recommended engagement</p>
              <h3 className="mt-2 text-(length:--text-h3) font-semibold tracking-[-0.025em]">
                {selected.recommendation}
              </h3>
              <p className="mt-4 text-(length:--text-sm) leading-relaxed text-ink-muted">
                {selected.rationale}
              </p>

              <p className="rail-label mt-8">You will receive</p>
              <ul className="mt-3 grid gap-2">
                {selected.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-(length:--text-sm)">
                    <Check
                      size={14}
                      strokeWidth={2.25}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-verified"
                    />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={selected.cta.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-(--radius-sm) border border-primary bg-primary px-5 text-(length:--text-sm) font-medium text-surface transition-colors duration-(--duration-fast) hover:border-ink hover:bg-ink dark:hover:bg-ink-inverse dark:hover:text-surface"
                >
                  {selected.cta.label}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="inline-flex min-h-11 items-center gap-2 text-(length:--text-sm) text-ink-faint transition-colors hover:text-ink"
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
