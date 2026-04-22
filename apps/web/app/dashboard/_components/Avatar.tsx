import { cn } from "./cn";

type Props = {
  initials: string;
  size?: number;
  tone?: "light" | "dark";
};

export function Avatar({ initials, size = 36, tone = "light" }: Props) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-xl font-semibold select-none",
        tone === "dark"
          ? "bg-[rgba(255,255,255,0.10)] text-white border border-[rgba(255,255,255,0.15)]"
          : "bg-black/5 text-slate-800 border border-black/5",
      )}
      style={{ width: size, height: size }}
      aria-label="Profile avatar"
    >
      <span style={{ fontSize: Math.max(12, Math.round(size * 0.36)) }}>
        {initials}
      </span>
    </div>
  );
}
