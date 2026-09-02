import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/** Final conversion band. Two paths: scoped assessment, or an open project brief. */
export function ClosingCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="grain relative overflow-hidden border-b border-line"
    >
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-1/4 -bottom-1/2 size-[55rem] max-w-[130vw] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--c-brand), transparent 65%)" }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-end gap-12 py-(--spacing-section) lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <p className="rail-label">
              <span
                className="mr-3 inline-block size-1.5 rotate-45 bg-primary align-middle"
                aria-hidden="true"
              />
              Next step
            </p>
            <h2
              id="cta-heading"
              className="mt-6 max-w-[16ch] text-(length:--text-h1) leading-[0.95] font-semibold tracking-[-0.04em]"
            >
              Let’s engineer your next digital system
              <span className="text-primary">.</span>
            </h2>
            <p className="mt-7 max-w-[48ch] text-(length:--text-lead) text-ink-muted">
              Start with an assessment if you want to know where you stand. Start with a project
              brief if you already know what you need built.
            </p>
          </div>

          <div className="grid gap-px border border-line bg-line">
            <Link
              href="/request-audit"
              className="group flex items-center justify-between gap-6 bg-surface p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised sm:p-7"
            >
              <span>
                <span className="rail-index">01</span>
                <span className="mt-2 block text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                  Request an assessment
                </span>
                <span className="mt-1.5 block text-(length:--text-sm) text-ink-muted">
                  Infrastructure, security, cloud or continuity.
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/contact"
              className="group flex items-center justify-between gap-6 bg-surface p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised sm:p-7"
            >
              <span>
                <span className="rail-index">02</span>
                <span className="mt-2 block text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                  Start a project
                </span>
                <span className="mt-1.5 block text-(length:--text-sm) text-ink-muted">
                  Tell us what you need built or operated.
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-1"
              />
            </Link>

            <a
              href={`mailto:${site.contact.email}`}
              className="group flex items-center justify-between gap-6 bg-surface p-6 transition-colors duration-(--duration-normal) hover:bg-surface-raised sm:p-7"
            >
              <span>
                <span className="rail-index">03</span>
                <span className="mt-2 block text-(length:--text-h4) font-semibold tracking-[-0.02em]">
                  Email us directly
                </span>
                <span className="mt-1.5 block font-mono text-(length:--text-sm) text-ink-muted">
                  {site.contact.email}
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-primary transition-transform duration-(--duration-normal) ease-(--ease-out-expo) group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
