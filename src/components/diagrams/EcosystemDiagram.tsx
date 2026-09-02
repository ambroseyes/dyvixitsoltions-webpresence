"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The D’Yvix capability graph.
 *
 * Structure: a hub with six domain nodes on a hexagon. Nodes are real HTML
 * buttons layered over an aria-hidden SVG that draws only the connecting
 * lines — so the diagram is keyboard operable and every label is real text
 * rather than SVG paint (§73: interactive visuals must not be the only
 * carrier of the information).
 *
 * Coordinates are percentages of a square box, at 38% radius from centre.
 */
const NODES = [
  {
    id: "software-engineering",
    labelAbove: true,
    label: "Software",
    x: 50,
    y: 12,
    description:
      "Web platforms, REST APIs and microservices — built around how the organisation actually works, and documented so your team can change them.",
    tech: ["Python", "FastAPI", "React", "Laravel"],
  },
  {
    id: "infrastructure-cloud",
    labelAbove: false,
    label: "Infrastructure",
    x: 82.9,
    y: 31,
    description:
      "Networks, servers, virtualisation, storage and the pipelines that keep them current — designed so a single failure does not become an outage.",
    tech: ["VMware", "TrueNAS", "Docker", "Zabbix"],
  },
  {
    id: "cybersecurity",
    labelAbove: false,
    label: "Security",
    x: 82.9,
    y: 69,
    description:
      "Assess, protect, detect, respond and recover, run as a cycle. Continuous network security for a European diplomatic mission since 2019.",
    tech: ["FortiGate", "Kaspersky", "EDR", "ISO 27001"],
  },
  {
    id: "data-documents",
    labelAbove: false,
    label: "Data",
    x: 50,
    y: 88,
    description:
      "PostgreSQL and PostGIS, electronic document management and large-scale digitisation. Our most evidenced technical strength.",
    tech: ["PostGIS", "Dokmee", "SQL Server", "NAS"],
  },
  {
    id: "managed-services",
    labelAbove: false,
    label: "Managed",
    x: 17.1,
    y: 69,
    description:
      "L1/L2/L3 support and infrastructure monitoring. Several of these relationships have run past eight years.",
    tech: ["Grafana", "Prometheus", "UniFi", "MikroTik"],
  },
  {
    id: "applied-ai",
    labelAbove: false,
    label: "Applied AI",
    x: 17.1,
    y: 31,
    description:
      "Business automation, document processing and AI-assisted monitoring — with human review that is mandatory, not advisory.",
    tech: ["Self-hosted LLMs", "vLLM", "RAG", "Automation"],
  },
] as const;

const CENTER = { x: 50, y: 50 };

export function EcosystemDiagram() {
  // Derived, not a hardcoded slug: a taxonomy change silently repointed this
  // once already.
  const [activeId, setActiveId] = useState<string>(NODES[0].id);
  const active = NODES.find((n) => n.id === activeId) ?? NODES[0];

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
        {/* Line layer. Decorative: every relationship it draws is also stated
            in the node list and the detail panel below. */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
          <g className="stroke-line-strong" strokeWidth="0.22" fill="none">
            {NODES.map((n, i) => {
              const next = NODES[(i + 1) % NODES.length];
              return (
                <line
                  key={`ring-${n.id}`}
                  x1={n.x}
                  y1={n.y}
                  x2={next.x}
                  y2={next.y}
                  opacity="0.5"
                />
              );
            })}
          </g>
          <g strokeWidth="0.28" fill="none">
            {NODES.map((n) => (
              <line
                key={`spoke-${n.id}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={n.x}
                y2={n.y}
                className={cn(
                  "transition-[stroke,stroke-width] duration-(--duration-normal) ease-(--ease-out-expo)",
                  n.id === activeId ? "stroke-primary [stroke-width:0.55]" : "stroke-line-strong",
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
          <div className="node-bar flex size-16 items-center justify-center border-2 border-primary bg-surface-raised sm:size-20">
            <span className="skew-x-[14deg] font-display text-(length:--text-sm) font-bold tracking-[-0.01em]">
              D<span className="text-primary">’</span>Y
            </span>
          </div>
        </div>

        {/* Domain nodes */}
        <ul>
          {NODES.map((n) => {
            const isActive = n.id === activeId;
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
                    "group flex items-center gap-2.5 rounded-(--radius-sm) p-1",
                    // Label placed away from centre so it never sits on its own spoke.
                    n.labelAbove ? "flex-col-reverse" : "flex-col",
                  )}
                >
                  <span
                    className={cn(
                      "node-bar size-9 sm:size-11",
                      isActive
                        ? "border-primary bg-primary"
                        : "bg-surface-sunken group-hover:border-primary group-hover:bg-primary-soft",
                    )}
                  />
                  <span
                    className={cn(
                      "w-28 text-center font-mono text-(length:--text-micro) leading-[1.35] tracking-(--tracking-label) uppercase transition-colors duration-(--duration-fast)",
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
      <div
        id="ecosystem-detail"
        className="brackets mt-8 border border-line bg-surface-raised p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <span className="rail-index">{String(NODES.indexOf(active) + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <h3 className="font-mono text-(length:--text-label) tracking-(--tracking-label) uppercase">
            {active.label}
          </h3>
        </div>

        <p className="mt-4 text-(length:--text-sm) leading-relaxed text-ink-muted">
          {active.description}
        </p>

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
          href={`/solutions/${active.id}`}
          className="mt-6 inline-flex items-center gap-2 text-(length:--text-sm) font-medium text-primary hover:underline"
        >
          Explore {active.label}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
