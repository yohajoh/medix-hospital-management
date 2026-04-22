/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

import type { TechCard } from "./types";

interface TechnologySectionProps {
  cards: TechCard[];
}

const PlaceholderImage = ({ title }: { title: string }) => (
  <div className="flex h-full min-h-80 w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-700/50">
        <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className="mt-1 text-xs text-slate-500">Image coming soon</p>
    </div>
  </div>
);

export function TechnologySection({
  cards,
}: TechnologySectionProps): JSX.Element {
  return (
    <section className="relative overflow-hidden border-y border-(--ca-border) bg-(--ca-surface-soft) py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.06),transparent_50%)]" />
      
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full border border-[var(--ca-brand-900)]/30 bg-[var(--ca-brand-900)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ca-brand-900)]">
            Advanced Technology
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-(--ca-text) md:text-5xl lg:text-6xl">
            Cutting-Edge Innovation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-(--ca-text-muted)">
            Experience the future of healthcare with our state-of-the-art medical technologies
            and advanced surgical systems.
          </p>
        </div>

        <div className="mt-12 space-y-8 lg:space-y-10">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`group relative overflow-hidden rounded-3xl border border-(--ca-border) bg-(--ca-surface) shadow-2xl transition-all duration-500 hover:shadow-3xl lg:rounded-[2rem] ${
                card.align === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
              } lg:flex`}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[55%] lg:min-h-80">
                {card.image ? (
                  <>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                  </>
                ) : (
                  <PlaceholderImage title={card.title} />
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {index === 0 ? "Robotic Assistance" : "AI-Powered"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col justify-center p-6 sm:p-8 lg:w-[45%] lg:p-10">
                <div className="relative">
                  <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-[var(--ca-brand-900)]/10 blur-2xl" />
                  <h3 className="relative text-3xl font-black tracking-[-0.03em] text-(--ca-text) md:text-4xl">
                    {card.title}
                  </h3>
                </div>
                <p className="relative mt-4 text-base leading-7 text-(--ca-text-muted) md:text-lg">
                  {card.description}
                </p>
                
                <div className="mt-8 flex flex-wrap gap-3">
                  {index === 0 ? (
                    <>
                      <span className="rounded-lg border border-[var(--ca-brand-900)]/20 bg-[var(--ca-brand-900)]/5 px-3 py-1.5 text-xs font-medium text-[var(--ca-brand-900)]">
                        Da Vinci Xi
                      </span>
                      <span className="rounded-lg border border-[var(--ca-brand-900)]/20 bg-[var(--ca-brand-900)]/5 px-3 py-1.5 text-xs font-medium text-[var(--ca-brand-900)]">
                        Minimally Invasive
                      </span>
                      <span className="rounded-lg border border-[var(--ca-brand-900)]/20 bg-[var(--ca-brand-900)]/5 px-3 py-1.5 text-xs font-medium text-[var(--ca-brand-900)]">
                        98.5% Accuracy
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="rounded-lg border border-[var(--ca-brand-900)]/20 bg-[var(--ca-brand-900)]/5 px-3 py-1.5 text-xs font-medium text-[var(--ca-brand-900)]">
                        AI-Assisted
                      </span>
                      <span className="rounded-lg border border-[var(--ca-brand-900)]/20 bg-[var(--ca-brand-900)]/5 px-3 py-1.5 text-xs font-medium text-[var(--ca-brand-900)]">
                        Real-Time
                      </span>
                      <span className="rounded-lg border border-[var(--ca-brand-900)]/20 bg-[var(--ca-brand-900)]/5 px-3 py-1.5 text-xs font-medium text-[var(--ca-brand-900)]">
                        HD Resolution
                      </span>
                    </>
                  )}
                </div>

                <a
                  href="#"
                  className="group/cta mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--ca-brand-900)] transition-colors hover:text-[var(--ca-brand-700)]"
                >
                  {card.cta ?? "Learn More"}
                  <svg className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {[
            { value: "500+", label: "Robotic Surgeries" },
            { value: "99.2%", label: "Accuracy Rate" },
            { value: "50+", label: "Specialists" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-(--ca-border) bg-(--ca-surface) p-6 text-center lg:rounded-3xl lg:p-8"
            >
              <div className="text-3xl font-black tracking-[-0.02em] text-[var(--ca-brand-900)] md:text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-(--ca-text-muted)">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}