import Link from "next/link";

const modules = [
  {
    title: "Clinical Intelligence",
    description:
      "Real-time care coordination, bed allocation, order tracking, and decision support across the clinical floor.",
    tone: "light",
    tags: ["EMR ready", "Live ops"],
  },
  {
    title: "Revenue Cycle",
    description:
      "Streamlined billing workflows, eligibility checks, claim visibility, and reimbursement control.",
    tone: "dark",
    tags: ["Claims", "Billing"],
  },
  {
    title: "Patient Portals",
    description:
      "Appointment self-service, discharge instructions, results access, and secure messaging for families.",
    tone: "soft",
    tags: ["Appointments", "Messages"],
  },
  {
    title: "Infrastructure & Interoperability",
    description:
      "FHIR-friendly architecture, audit trails, and data exchange designed for multi-site health systems.",
    tone: "light",
    tags: ["FHIR", "Audit logs"],
  },
];

const trustItems = [
  {
    title: "HIPAA & GDPR Ready",
    description: "Built around access control, traceability, and privacy-first workflows.",
  },
  {
    title: "AES-256 Encryption",
    description: "Records and transmissions are protected in transit and at rest.",
  },
  {
    title: "Zero-Trust Access",
    description: "Role-based access keeps clinical, admin, and finance boundaries clear.",
  },
];

const navItems = ["Solutions", "Platform", "Network", "Insights"];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-sky-800 shadow-sm">
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <Badge>{eyebrow}</Badge>
      <h2 className="text-3xl font-black leading-[0.95] tracking-[-0.05em] text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(90,132,211,0.14),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#f4f7fb_38%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pb-8 pt-4 sm:px-8 lg:px-10">
        <header className="sticky top-0 z-20 mb-6 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 backdrop-blur-md shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 text-[15px] font-black tracking-[-0.04em] text-slate-950">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0b4ea2] text-sm text-white shadow-[0_10px_24px_rgba(11,78,162,0.35)]">
                M
              </span>
              <span>MedArch</span>
            </Link>

            <nav className="hidden items-center gap-8 text-[13px] font-medium text-slate-600 md:flex">
              {navItems.map((item) => (
                <a key={item} href="#" className="transition-colors hover:text-slate-950">
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="#"
                className="hidden rounded-xl px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:inline-flex"
              >
                Sign In
              </Link>
              <Link
                href="#"
                className="inline-flex rounded-xl bg-[#0b4ea2] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(11,78,162,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#0a458f]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 rounded-[2rem] px-1 py-4 lg:grid-cols-[1.02fr_0.98fr] lg:px-0 lg:py-10">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-6">
              <Badge>Clinical Excellence</Badge>
              <div className="space-y-4">
                <h1 className="max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-slate-950 sm:text-6xl lg:text-[5.2rem]">
                  Engineering
                  <span className="block text-[#0b4ea2]">Precision Care.</span>
                </h1>
                <p className="max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                  A hospital operating system for teams that need calmer workflows, cleaner handoffs, and sharper visibility across the full care journey.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#"
                className="inline-flex rounded-xl bg-[#0b4ea2] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(11,78,162,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#093f82]"
              >
                Request Demo
              </Link>
              <Link
                href="#modules"
                className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                Explore Platform
              </Link>
            </div>

            <div className="grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["99.8%", "Diagnostic accuracy"],
                ["24/7", "Operations visibility"],
                ["FHIR", "Interoperability ready"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.05)] backdrop-blur">
                  <div className="text-2xl font-black tracking-[-0.05em] text-slate-950">{value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-sky-300/25 blur-3xl" />
            <div className="absolute bottom-14 right-0 h-24 w-24 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-[linear-gradient(180deg,#101826_0%,#17243a_100%)] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.22)] sm:p-8">
              <div className="flex h-full min-h-[520px] items-center justify-center rounded-[1.6rem] border border-cyan-400/30 bg-[radial-gradient(circle_at_center,_rgba(41,211,255,0.12),_transparent_48%),linear-gradient(180deg,_rgba(18,28,45,0.6),_rgba(8,16,28,0.15))] p-6">
                <div className="relative flex h-[320px] w-[320px] flex-col items-center justify-center rounded-[1.5rem] border border-cyan-400/55 bg-[linear-gradient(180deg,_rgba(15,25,40,0.75),_rgba(10,16,27,0.38))] shadow-[inset_0_0_0_1px_rgba(125,211,252,0.08)]">
                  <div className="text-xl font-semibold tracking-[0.18em] text-cyan-300">PRECISION</div>
                  <div className="relative my-6 flex h-36 w-36 items-center justify-center">
                    <div className="absolute h-32 w-32 rounded-full border border-cyan-300/70 shadow-[0_0_40px_rgba(34,211,238,0.35)]" />
                    <div className="absolute h-24 w-24 rounded-full bg-cyan-400/15 blur-xl" />
                    <div className="absolute h-20 w-20 rounded-full border border-cyan-200/55" />
                    <div className="absolute h-28 w-28 rounded-[42%] border border-cyan-200/40 rotate-45" />
                    <div className="absolute top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border border-cyan-300/35" />
                    <div className="absolute top-10 h-14 w-14 rounded-full border border-cyan-200/40" />
                  </div>
                  <div className="text-xl font-semibold tracking-[0.18em] text-cyan-300">MEDICINE</div>
                  <div className="mt-8 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/80">
                    Safe Work
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 w-[220px] -translate-x-1/2 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-[0_16px_34px_rgba(15,23,42,0.14)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM7 7.5A1.5 1.5 0 1 0 7 10.5a1.5 1.5 0 0 0 0-3zm3.8 1.3h6.7v1.4H10.8zm0 3.8h6.7v1.4H10.8zM7 12.8A1.5 1.5 0 1 0 7 15.8a1.5 1.5 0 0 0 0-3zm3.8 1.4h6.7v1.4H10.8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-black tracking-[-0.04em] text-slate-950">99.8%</div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Diagnostic accuracy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="space-y-8 py-10 sm:py-14">
          <SectionHeading
            eyebrow="Precision Modules"
            title="Interconnected systems designed to move from intake to discharge without friction."
            description="A single operational surface for clinicians, administrators, and revenue teams to coordinate care with fewer gaps and less manual follow-up."
          />

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#eef2f7] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8">
              <div className="absolute right-8 top-8 h-44 w-44 rounded-full border-[14px] border-slate-300/80 opacity-60" />
              <div className="absolute right-20 top-20 h-6 w-6 rounded-full bg-slate-300/90" />
              <div className="relative z-10 max-w-xl space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b4ea2] text-white shadow-[0_12px_22px_rgba(11,78,162,0.24)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M11 4h2v4h4v2h-4v4h-2v-4H7V8h4z" />
                    <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17.5z" opacity="0.2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black tracking-[-0.05em] text-[#0b4ea2] sm:text-[2rem]">
                  Clinical Intelligence
                </h3>
                <p className="max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                  Real-time care orchestration with bed management, escalation tracking, and clinician alerts that reduce avoidable delays.
                </p>
                <div className="flex flex-wrap gap-2">
                  {modules[0].tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <article className="flex min-h-full flex-col justify-between rounded-[2rem] bg-[#11172a] p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M6 5.5A1.5 1.5 0 0 1 7.5 4h9A1.5 1.5 0 0 1 18 5.5v13A1.5 1.5 0 0 1 16.5 20h-9A1.5 1.5 0 0 1 6 18.5zM8 7h8v10H8z" />
                    <path d="M10 9h4v1.4h-4zM10 12h4v1.4h-4z" fillOpacity="0.35" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black tracking-[-0.05em] sm:text-[2rem]">Revenue Cycle</h3>
                <p className="max-w-sm text-sm leading-6 text-slate-300">
                  Faster pre-authorization, billing transparency, and reimbursement controls that keep finance and operations in sync.
                </p>
              </div>

              <Link href="#" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white">
                View Workflows
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {modules.slice(2).map((module) => (
              <article
                key={module.title}
                className={`rounded-[1.8rem] border p-6 shadow-[0_16px_36px_rgba(15,23,42,0.05)] sm:p-7 ${
                  module.tone === "soft"
                    ? "border-slate-200 bg-[#edf1f6]"
                    : "border-slate-200 bg-[#f7f9fc]"
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0b4ea2] shadow-sm ring-1 ring-slate-200">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                        <path d="M12 20.2 10.6 19C6 15.1 3 12.4 3 8.9 3 6.1 5.1 4 7.9 4c1.6 0 3.1.8 4.1 2.1C13 4.8 14.5 4 16.1 4 18.9 4 21 6.1 21 8.9c0 3.5-3 6.2-7.6 10.1z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black tracking-[-0.04em] text-slate-950">{module.title}</h3>
                    <p className="max-w-md text-sm leading-6 text-slate-600">{module.description}</p>
                  </div>
                  {module.title === "Infrastructure & Interoperability" ? (
                    <div className="hidden h-24 w-28 rounded-xl bg-[linear-gradient(180deg,#243146,#111827)] p-2 shadow-[0_12px_24px_rgba(15,23,42,0.16)] md:block">
                      <div className="grid h-full grid-cols-4 gap-1">
                        {Array.from({ length: 12 }).map((_, index) => (
                          <span
                            key={index}
                            className={`rounded-sm ${index % 3 === 0 ? "bg-[#73b0ff]" : "bg-[#35567f]"}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-14">
          <div className="space-y-6">
            <div className="h-1 w-10 rounded-full bg-[#0b4ea2]" />
            <SectionHeading
              eyebrow="Compliance Layer"
              title="Fortified by design. Compliant by necessity."
              description="MedArch keeps security controls visible instead of buried in policy docs, so governance is part of the workflow and not an afterthought."
            />

            <div className="space-y-4">
              {trustItems.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="m9.5 16.2-3.7-3.8 1.4-1.4 2.3 2.3 6.9-6.9 1.4 1.4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-[-0.03em] text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["SOC 2 Type II", "light"],
              ["Active Audit", "dark"],
              ["Biometric Auth", "light"],
              ["Auto-Rotate Keys", "blue"],
            ].map(([label, tone]) => (
              <div
                key={label}
                className={`flex min-h-40 items-end rounded-[1.75rem] border p-5 shadow-[0_18px_36px_rgba(15,23,42,0.06)] ${
                  tone === "dark"
                    ? "border-slate-950 bg-[#11172a] text-white"
                    : tone === "blue"
                      ? "border-[#0b4ea2] bg-[#0b4ea2] text-white"
                      : "border-slate-200 bg-[#f7f9fc] text-slate-950"
                }`}
              >
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] opacity-70">Security</div>
                  <div className="text-xl font-black tracking-[-0.05em]">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#25314d] bg-[linear-gradient(180deg,_rgba(19,29,49,0.88),_rgba(19,29,49,0.94)),radial-gradient(circle_at_top,_rgba(52,120,246,0.28),_transparent_48%)] px-6 py-14 text-center text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10 sm:py-16">
            <div className="absolute inset-0 opacity-25">
              <div className="absolute left-10 top-8 h-44 w-44 rounded-full bg-sky-500/30 blur-3xl" />
              <div className="absolute right-8 bottom-6 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-3xl space-y-6">
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Architecting the future of your facility.
              </h2>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Deploy a clean, public-facing hospital operations platform that gives leadership, clinical teams, and patients one shared source of truth.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link href="#" className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5">
                  Book a Private Demo
                </Link>
                <Link href="#" className="inline-flex rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
                  Contact Sales Engineering
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-4 border-t border-slate-200/80 py-6 text-sm text-slate-500">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-base font-black tracking-[-0.04em] text-[#0b4ea2]">MedArch</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Clinical architecture for precision care.
              </div>
            </div>
            <div className="flex flex-wrap gap-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              <a href="#">Privacy</a>
              <a href="#">Security</a>
              <a href="#">HIPAA Compliance</a>
              <a href="#">Resources</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}