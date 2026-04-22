import { cn } from "./cn";

type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "accent";
  className?: string;
};

export function Badge({ children, tone = "neutral", className }: Props) {
  const styles =
    tone === "success"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : tone === "warning"
        ? "bg-amber-100 text-amber-900 border-amber-200"
        : tone === "danger"
          ? "bg-red-100 text-red-900 border-red-200"
          : tone === "accent"
            ? "bg-[color:rgba(127,198,189,0.22)] text-slate-900 border-[color:rgba(127,198,189,0.3)]"
            : "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
        styles,
        className,
      )}
    >
      {children}
    </span>
  );
}

