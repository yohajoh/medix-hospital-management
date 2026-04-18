/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

import type { PersonCard } from "./types";

interface SpecialistsSectionProps {
  cards: PersonCard[];
}

export function SpecialistsSection({ cards }: SpecialistsSectionProps): JSX.Element {
  return (
    <section className="bg-(--ca-surface) py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-5xl font-black tracking-[-0.04em] text-(--ca-text)">
          Meet Our Specialists
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl border border-(--ca-border) bg-(--ca-surface)"
            >
              {card.image ? <img src={card.image} alt={card.title} className="h-40 w-full object-cover" /> : null}
              <div className="p-4">
                <h3 className="text-2xl font-black tracking-[-0.03em] text-(--ca-text)">{card.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--ca-text-subtle)">
                  {card.role}
                </p>
                <p className="mt-2 text-sm leading-6 text-(--ca-text-muted)">{card.description}</p>
                <a href="#" className="mt-3 inline-flex text-sm font-semibold text-(--ca-brand-900)">
                  {card.cta ?? "View Profile"} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
