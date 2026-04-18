import type { JSX } from "react";

interface TrustBarProps {
  logos: string[];
}

export function TrustBar({ logos }: TrustBarProps): JSX.Element {
  return (
    <section className="mt-8 border-y border-[var(--ca-border)] bg-[var(--ca-surface)] py-7">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-xs font-black uppercase tracking-[0.28em] text-[var(--ca-text-subtle)]">
          Trusted By Lead Institutions
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
          {logos.map((logo) => (
            <div key={logo} className="text-3xl font-black tracking-[-0.03em] text-[var(--ca-text-subtle)]">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
