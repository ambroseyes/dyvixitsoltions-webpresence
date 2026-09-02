import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "info" | "risk" | "verified";

const tones: Record<Tone, string> = {
  neutral: "border-line text-ink-muted",
  primary: "border-primary/45 text-primary bg-primary-soft/45",
  info: "border-info/45 text-info bg-info-soft/45",
  risk: "border-risk/45 text-risk",
  verified: "border-verified/45 text-verified",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-(--radius-sm) border px-2 py-0.5",
        "font-mono text-(length:--text-micro) tracking-(--tracking-label) uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
