/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

export function HeroSection(): JSX.Element {
  return (
    <section className="mx-auto mt-3 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1800&q=80"
          alt="Modern clinical corridor"
          className="h-125 w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,45,64,0.45),rgba(31,45,64,0.58))]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="max-w-3xl text-5xl font-black leading-[1.03] tracking-[-0.04em] text-white md:text-7xl">
            The Next Generation of Clinical Intelligence
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium text-(--ca-hero-subtext) md:text-2xl">
            A high-performance framework engineered for precision medicine and
            operational excellence.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex h-14 items-center rounded-xl border border-[#6f8db2] bg-(--ca-brand-900) px-8 text-lg font-semibold text-white shadow-[0_12px_26px_rgba(16,42,74,0.38)]"
          >
            Request Enterprise Demo
          </button>
        </div>
      </div>
    </section>
  );
}
