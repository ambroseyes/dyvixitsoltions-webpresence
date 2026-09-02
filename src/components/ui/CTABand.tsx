import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./Container";

/** Contextual conversion band. Every page gets one; none of them say "Contact us". */
export function CTABand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="panel-inverse grain relative overflow-hidden"
    >
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="flex flex-col items-start gap-10 py-(--spacing-section-tight) lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="cta-band-heading"
              className="max-w-[18ch] text-(length:--text-h2) leading-[0.98] font-semibold tracking-[-0.035em]"
            >
              {title}
            </h2>
            <p className="mt-5 text-(length:--text-lead) text-ink-muted">{body}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={primary.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-(--radius-sm) border border-primary bg-primary px-6 font-medium text-ink-inverse transition-colors duration-(--duration-fast) hover:border-ink-inverse hover:bg-ink-inverse"
            >
              {primary.label}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex min-h-12 items-center rounded-(--radius-sm) border border-line-strong px-6 font-medium transition-colors duration-(--duration-fast) hover:border-primary hover:text-primary"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
