/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

import type { TechCard } from "./types";

interface TechnologySectionProps {
  cards: TechCard[];
}

export function TechnologySection({
  cards,
}: TechnologySectionProps): JSX.Element {
  return (
    <section className="border-y border-(--ca-border) bg-(--ca-surface-soft) py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-5xl font-black tracking-[-0.04em] text-(--ca-text)">
          Cutting-Edge Technology
        </h2>
        <div className="mt-8 space-y-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="grid overflow-hidden rounded-2xl border border-(--ca-border) bg-(--ca-surface) lg:grid-cols-[1fr_1.1fr]"
            >
              {card.align === "right" ? null : card.image ? (
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full min-h-55 w-full object-cover"
                />
              ) : null}
              <div className="p-6 sm:p-8">
                <h3 className="text-4xl font-black tracking-[-0.03em] text-(--ca-text)">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-(--ca-text-muted)">
                  {card.description}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex text-sm font-semibold text-(--ca-brand-900)"
                >
                  {card.cta ?? "Learn More"} →
                </a>
              </div>
              {card.align === "right" && card.image ? (
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full min-h-55 w-full object-cover"
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
