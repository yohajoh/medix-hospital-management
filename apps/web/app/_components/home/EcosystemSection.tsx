import type { JSX } from "react";

import type { TagCard } from "./types";

interface EcosystemSectionProps {
  cards: TagCard[];
}

export function EcosystemSection({ cards }: EcosystemSectionProps): JSX.Element {
  return (
    <section className="bg-[var(--ca-surface)] py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-black uppercase tracking-[0.24em] text-[var(--ca-text-subtle)]">
          Ecosystem Mastery
        </p>
        <h2 className="mt-3 text-center text-5xl font-black tracking-[-0.04em] text-[var(--ca-text)]">
          Interoperability Redefined
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-[var(--ca-border)] bg-[var(--ca-surface)] p-5">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--ca-surface-soft)] text-xl">
                {card.icon}
              </div>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[var(--ca-text)]">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ca-text-muted)]">{card.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--ca-border)] bg-[var(--ca-surface-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ca-text-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
