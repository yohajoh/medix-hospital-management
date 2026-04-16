import type { JSX } from "react";

const toneClasses = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
  info: "border-sky-200 bg-sky-50 text-sky-800",
} as const;

export function AuthStatus({
  tone,
  title,
  description,
}: {
  tone: keyof typeof toneClasses;
  title: string;
  description: string;
}): JSX.Element {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneClasses[tone]}`}>
      <div className="text-xs font-black uppercase tracking-[0.24em]">{title}</div>
      <p className="mt-1 text-sm leading-6">{description}</p>
    </div>
  );
}
