import { cn } from "@/lib/utils";

/** Hairline rule with end ticks, as on a dimensioned drawing. */
export function DimensionRule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("dimension-rule my-0 w-full", className)} />;
}
