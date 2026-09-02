import { cn } from "@/lib/utils";

/**
 * Spec-sheet row: mono label in the left rail, content on the right.
 * The recurring structural device on interior pages.
 */
export function SpecRow({
  label,
  index,
  children,
  className,
}: {
  label: string;
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 border-b border-line py-9 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-12",
        className,
      )}
    >
      <div className="flex items-start gap-3 md:sticky md:top-24 md:self-start">
        {index && <span className="rail-index shrink-0">{index}</span>}
        <h2 className="rail-label">{label}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
