import { Container } from "./Container";

/**
 * Shared page opener.
 *
 * Deliberately quieter than the homepage hero: an interior page's job is to
 * answer a question, so the eye should reach the body copy quickly.
 */
export function PageHero({
  index,
  label,
  title,
  standfirst,
  children,
}: {
  index?: string;
  label: string;
  title: string;
  standfirst: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-heading"
      className="grain relative overflow-hidden border-b border-line"
    >
      <div className="schematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-1/2 -left-1/5 size-[48rem] max-w-[130vw] rounded-full opacity-[0.13] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--c-primary), transparent 65%)" }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="max-w-4xl py-(--spacing-section-tight)">
          <p className="rail-label flex items-center gap-3">
            {index && <span className="rail-index">{index}</span>}
            {index && <span className="h-px w-8 bg-line-strong" aria-hidden="true" />}
            {label}
          </p>
          <h1
            id="page-heading"
            className="mt-6 max-w-[18ch] text-(length:--text-h1) leading-[0.98] font-semibold tracking-[-0.035em]"
          >
            {title}
          </h1>
          <p className="mt-7 max-w-[58ch] text-(length:--text-lead) leading-relaxed text-ink-muted">
            {standfirst}
          </p>
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
