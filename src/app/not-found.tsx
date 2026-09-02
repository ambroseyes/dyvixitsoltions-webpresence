import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { primaryNav } from "@/lib/nav";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section aria-labelledby="notfound-heading" className="grain relative overflow-hidden">
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-3xl py-(--spacing-section)">
          <p className="rail-index">404</p>
          <h1
            id="notfound-heading"
            className="mt-6 text-(length:--text-h1) leading-[0.98] font-semibold tracking-[-0.035em]"
          >
            This route does not resolve.
          </h1>
          <p className="mt-7 max-w-[52ch] text-(length:--text-lead) text-ink-muted">
            The page you asked for is not here. It may have moved, or the link may be wrong.
          </p>

          <nav aria-label="Suggested pages" className="mt-12">
            <p className="rail-label mb-4">Try one of these</p>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {primaryNav.map((n) => (
                <li key={n.href} className="bg-surface">
                  <Link
                    href={n.href}
                    className="group flex items-center justify-between gap-4 p-5 transition-colors duration-(--duration-normal) hover:bg-surface-raised"
                  >
                    <span className="text-(length:--text-base) font-medium">{n.label}</span>
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-primary transition-transform duration-(--duration-fast) group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-10 text-(length:--text-sm) text-ink-faint">
            Or press <kbd className="font-mono text-primary">⌘K</kbd> to search.
          </p>
        </div>
      </Container>
    </section>
  );
}
