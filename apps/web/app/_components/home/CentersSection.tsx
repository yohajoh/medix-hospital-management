/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

import type { TagCard } from "./types";

interface CentersSectionProps {
  cards: TagCard[];
}

export function CentersSection({ cards }: CentersSectionProps): JSX.Element {
  return (
    <section className="border-t border-[var(--ca-border)] bg-[var(--ca-surface-soft)] py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-5xl font-black tracking-[-0.04em] text-[var(--ca-text)]">Centers of Excellence</h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-[var(--ca-border)] bg-[var(--ca-surface)]">
              {card.image ? <img src={card.image} alt={card.title} className="h-40 w-full object-cover" /> : null}
              <div className="p-4">
                <h3 className="text-3xl font-black tracking-[-0.03em] text-[var(--ca-text)]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ca-text-muted)]">{card.description}</p>
                <a href="#" className="mt-3 inline-flex text-sm font-semibold text-[var(--ca-brand-900)]">
                  {card.cta ?? "Learn More"} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
