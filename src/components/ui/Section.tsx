import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * A page section with the mono annotation rail.
 *
 * The rail carries the section index and label — the device that makes a
 * D’Yvix page read as a spec sheet rather than a marketing page. On narrow
 * viewports the rail collapses above the heading instead of disappearing,
 * so the structural cue survives on mobile.
 */
export function Section({
  index,
  label,
  title,
  standfirst,
  children,
  className,
  id,
  tight = false,
  as: As = "section",
}: {
  index?: string;
  label?: string;
  title?: React.ReactNode;
  standfirst?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
  as?: "section" | "div";
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <As
      id={id}
      aria-labelledby={headingId}
      className={cn(tight ? "py-(--spacing-section-tight)" : "py-(--spacing-section)", className)}
    >
      <Container>
        {(index || label) && (
          <div className="mb-6 flex items-center gap-3">
            {index && <span className="rail-index">{index}</span>}
            {index && label && <span className="h-px w-8 bg-line-strong" aria-hidden="true" />}
            {label && <span className="rail-label">{label}</span>}
          </div>
        )}

        {title && (
          <h2 id={headingId} className="max-w-[22ch] text-(length:--text-h2)">
            {title}
          </h2>
        )}

        {standfirst && (
          <p className="mt-5 max-w-(--container-prose) text-(length:--text-lead) text-ink-muted">
            {standfirst}
          </p>
        )}

        {children && <div className={cn((title || standfirst) && "mt-12")}>{children}</div>}
      </Container>
    </As>
  );
}
