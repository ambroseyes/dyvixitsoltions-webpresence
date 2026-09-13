"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type DiagramNode = {
  id: string;
  /** Short label for the ring. */
  label: string;
  /** Full domain name for the detail panel. */
  name: string;
  description: string;
  tech: string[];
  /** Public, localised href. */
  href: string;
};

/**
 * The D’Yvix capability graph.
 *
 * Structure: a hub with one node per expertise domain, evenly spaced on a
 * ring starting at twelve o’clock. Nodes are real HTML buttons layered over
 * an aria-hidden SVG that draws only the connecting lines — so the diagram is
 * keyboard operable and every label is real text rather than SVG paint (§73:
 * interactive visuals must not be the only carrier of the information).
 *
 * Coordinates are percentages of a square box. Positions are rounded so the
 * server and client render byte-identical style attributes.
 */
const RADIUS = 36;
const CENTER = { x: 50, y: 50 };

const round = (n: number) => Math.round(n * 100) / 100;

function place(nodes: DiagramNode[]) {
  return nodes.map((n, i) => {
    const angle = ((-90 + (360 / nodes.length) * i) * Math.PI) / 180;
    const sin = Math.sin(angle);
    return {
      ...n,
      x: round(CENTER.x + RADIUS * Math.cos(angle)),
      y: round(CENTER.y + RADIUS * sin),
      // Label placed away from centre so it never sits on its own spoke.
      labelAbove: sin < -0.2,
    };
  });
}

export function EcosystemDiagram({ nodes, exploreLabel }: { nodes: DiagramNode[]; exploreLabel: string }) {
  const placed = place(nodes);
  const [activeId, setActiveId] = useState<string>(placed[0]?.id ?? "");
  const activeIndex = Math.max(
    0,
    placed.findIndex((n) => n.id === activeId),
  );
  const active = placed[activeIndex];
  if (!active) return null;

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
        {/* Line layer. Decorative: every relationship it draws is also stated
            in the node list and the detail panel below. */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
          <g className="stroke-line-strong" strokeWidth="0.22" fill="none">
            {placed.map((n, i) => {
              const next = placed[(i + 1) % placed.length]!;
              return <line key={`ring-${n.id}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} opacity="0.5" />;
            })}
          </g>
          <g strokeWidth="0.28" fill="none">
            {placed.map((n) => (
              <line
                key={`spoke-${n.id}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={n.x}
                y2={n.y}
                className={cn(
                  "transition-[stroke,stroke-width] duration-(--duration-normal) ease-(--ease-out-expo)",
                  n.id === active.id ? "stroke-primary [stroke-width:0.55]" : "stroke-line-strong",
                )}
              />
            ))}
          </g>
        </svg>

        {/* Hub */}
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
        >
          <div className="node-bar flex size-14 items-center justify-center border-2 border-primary bg-surface-raised sm:size-20">
            <span className="skew-x-[14deg] font-display text-(length:--text-sm) font-bold tracking-[-0.01em]">
              D<span className="text-primary">’</span>Y
            </span>
          </div>
        </div>

        {/* Domain nodes */}
        <ul>
          {placed.map((n) => {
            const isActive = n.id === active.id;
            return (
              <li
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(n.id)}
                  onFocus={() => setActiveId(n.id)}
                  onClick={() => setActiveId(n.id)}
                  aria-pressed={isActive}
                  aria-describedby="ecosystem-detail"
                  className={cn(
                    "group flex items-center gap-2 rounded-(--radius-sm) p-1",
                    n.labelAbove ? "flex-col-reverse" : "flex-col",
                  )}
                >
                  <span
                    className={cn(
                      "node-bar size-7 sm:size-9",
                      isActive
                        ? "border-primary bg-primary"
                        : "bg-surface-sunken group-hover:border-primary group-hover:bg-primary-soft",
                    )}
                  />
                  <span
                    className={cn(
                      "w-20 text-center font-mono text-(length:--text-micro) leading-[1.3] tracking-(--tracking-label) uppercase transition-colors duration-(--duration-fast) sm:w-24",
                      isActive ? "text-primary" : "text-ink-faint group-hover:text-ink",
                    )}
                  >
                    {n.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail panel. aria-live is deliberately omitted: the change is driven
          by the user's own hover or focus, so announcing it would be noise. */}
      <div id="ecosystem-detail" className="brackets mt-8 border border-line bg-surface-raised p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="rail-index">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <h3 className="font-mono text-(length:--text-label) tracking-(--tracking-label) uppercase">{active.name}</h3>
        </div>

        <p className="mt-4 text-(length:--text-sm) leading-relaxed text-ink-muted">{active.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {active.tech.map((t) => (
            <li
              key={t}
              className="rounded-(--radius-sm) border border-line px-2 py-0.5 font-mono text-(length:--text-micro) text-ink-faint"
            >
              {t}
            </li>
          ))}
        </ul>

        <Link
          href={active.href}
          className="mt-6 inline-flex items-center gap-2 text-(length:--text-sm) font-medium text-primary hover:underline"
        >
          {exploreLabel}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
