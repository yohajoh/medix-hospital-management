import type { JSX, ReactNode } from "react";

interface ReusableCardProps {
  title: string;
  description: string;
  topSlot?: ReactNode;
  bottomSlot?: ReactNode;
  className?: string;
}

export function ReusableCard({
  title,
  description,
  topSlot,
  bottomSlot,
  className = "",
}: ReusableCardProps): JSX.Element {
  return (
    <article className={`rounded-2xl border border-[var(--ca-border)] bg-[var(--ca-surface)] p-5 ${className}`}>
      {topSlot}
      <h3 className="mt-3 text-[30px] leading-[1.08] font-black tracking-[-0.03em] text-[var(--ca-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--ca-text-muted)]">{description}</p>
      {bottomSlot ? <div className="mt-4">{bottomSlot}</div> : null}
    </article>
  );
}
