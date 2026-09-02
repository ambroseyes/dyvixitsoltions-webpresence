import { cn } from "@/lib/utils";

/** Page gutter + max width. The only place horizontal rhythm is defined. */
export function Container({
  className,
  children,
  wide = false,
}: {
  className?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-(--spacing-gutter)",
        wide ? "max-w-[92rem]" : "max-w-(--container-rail)",
        className,
      )}
    >
      {children}
    </div>
  );
}
