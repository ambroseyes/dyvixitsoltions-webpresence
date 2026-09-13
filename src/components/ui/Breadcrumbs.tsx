import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";

/**
 * Breadcrumb trail. Rendered visually AND emitted as BreadcrumbList schema by
 * the page — §72 wants the hierarchy discoverable, not just decorative.
 * `trail` paths are public, already-localised paths.
 */
export function Breadcrumbs({ trail, label }: { trail: { name: string; path: string }[]; label: string }) {
  return (
    <nav aria-label={label} className="border-b border-line">
      <Container>
        <ol className="flex flex-wrap items-center gap-1.5 py-3.5">
          {trail.map((t, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={t.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={11} aria-hidden="true" className="text-ink-faint" />}
                {isLast ? (
                  <span className="rail-label text-ink-muted" aria-current="page">
                    {t.name}
                  </span>
                ) : (
                  <Link href={t.path} className="rail-label transition-colors hover:text-primary">
                    {t.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
