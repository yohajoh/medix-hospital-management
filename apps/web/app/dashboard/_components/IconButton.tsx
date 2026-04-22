"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "./cn";

type Props = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  tone?: "light" | "dark";
};

export function IconButton({ icon: Icon, label, onClick, tone = "light" }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "h-10 w-10 grid place-items-center rounded-xl border transition",
        tone === "dark"
          ? "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.12)]"
          : "bg-white/70 border-black/5 text-slate-700 hover:bg-white",
      )}
    >
      <Icon size={18} />
    </button>
  );
}
