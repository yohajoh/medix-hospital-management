import type { JSX } from "react";

const items = [
  {
    title: "HIPAA Compliant",
    detail: "Full adherence to enterprise healthcare standards.",
  },
  {
    title: "SOC2 Type II",
    detail: "Validated controls for secure digital operations.",
  },
  {
    title: "GDPR Ready",
    detail: "Global privacy controls for data in motion and at rest.",
  },
];

export function ComplianceStrip(): JSX.Element {
  return (
    <section className="bg-[linear-gradient(120deg,#061022_0%,#10264a_60%,#0c1f3d_100%)] py-8 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.9fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <h3 className="text-4xl font-black tracking-[-0.03em]">Security & Compliance</h3>
        </div>
        {items.map((item) => (
          <article key={item.title}>
            <h4 className="text-2xl font-black tracking-[-0.02em]">{item.title}</h4>
            <p className="mt-1 text-sm leading-6 text-[var(--ca-compliance-subtext)]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
