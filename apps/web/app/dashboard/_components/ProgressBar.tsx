import { cn } from "./cn";

type Props = {
  value: number;
  max?: number;
  className?: string;
  tone?: "accent" | "neutral" | "danger" | "warning";
};

export function ProgressBar({
  value,
  max = 100,
  className,
  tone = "accent",
}: Props) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const bar =
    tone === "danger"
      ? "bg-red-500/80"
      : tone === "warning"
        ? "bg-amber-500/80"
        : tone === "neutral"
          ? "bg-slate-400/80"
          : "bg-[color:var(--dash-accent)]";

  return (
    <div
      className={cn(
        "h-2.5 w-full rounded-full bg-black/5 overflow-hidden",
        className,
      )}
    >
      <div className={cn("h-full rounded-full", bar)} style={{ width: `${pct}%` }} />
    </div>
  );
}

