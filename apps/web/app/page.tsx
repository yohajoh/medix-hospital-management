const primaryNav = ["Services", "Departments", "Patients", "Careers", "Contact"];

const serviceCards = [
  {
    title: "Emergency & Trauma",
    description: "24/7 triage with rapid diagnostics and dedicated resuscitation teams.",
    metric: "4 min avg response",
  },
  {
    title: "Outpatient Clinics",
    description: "Specialist-led clinics with digital queueing and integrated follow-up care.",
    metric: "42 specialties",
  },
  {
    title: "Surgical Center",
    description: "Modern theatres, perioperative analytics, and evidence-based recovery pathways.",
    metric: "98.7% protocol compliance",
  },
  {
    title: "Maternal & Child",
    description: "Family-centered maternity, neonatal monitoring, and pediatric expertise.",
    metric: "12,000+ annual deliveries",
  },
];

const quickStats = [
  { label: "Licensed Physicians", value: "420+" },
  { label: "Annual Patient Visits", value: "540k" },
  { label: "Bed Capacity", value: "780" },
  { label: "Digital Record Coverage", value: "100%" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(12,77,155,0.13),transparent_36%),linear-gradient(180deg,#f6f9fd_0%,#ecf2f9_100%)] text-slate-900">
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b4ea2] text-sm font-black text-white shadow-[0_10px_24px_rgba(11,78,162,0.25)]">
                MH
              </span>
              <div>
                <p className="text-lg font-black tracking-[-0.03em] text-slate-950">Medix Hospital Management</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Integrated Public Care Network
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
              {primaryNav.map((item) => (
                <a key={item} href="#" className="transition hover:text-[#0b4ea2]">
                  {item}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0b4ea2] px-5 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(11,78,162,0.3)] transition hover:-translate-y-0.5"
            >
              Book Appointment
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
          <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_rgba(15,23,42,0.08)] sm:p-9">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-blue-700">
              Trusted Tertiary Hospital
            </div>

            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              Public healthcare that feels
              <span className="text-[#0b4ea2]"> precise, human, and fast.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              From preventive care to critical intervention, Medix unifies clinical operations, diagnostics, inpatient
              flow, and patient communication into one coordinated experience.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0b4ea2] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(11,78,162,0.3)] transition hover:-translate-y-0.5"
              >
                Start Online Registration
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                View Service Directory
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {quickStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="relative overflow-hidden rounded-[2rem] border border-[#0a458f] bg-[linear-gradient(155deg,#0a458f_0%,#0f5dbf_48%,#0a458f_100%)] p-7 text-white shadow-[0_30px_72px_rgba(10,69,143,0.38)] sm:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.25),transparent_36%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.18),transparent_35%)]" />
            <div className="relative">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-blue-100">
                Realtime Hospital Board
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Today At Medix</h2>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/25 bg-white/10 p-4 backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-100">
                    Emergency Wait Time
                  </p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.04em]">9 min</p>
                </div>
                <div className="rounded-xl border border-white/25 bg-white/10 p-4 backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-100">
                    Operating Rooms Active
                  </p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.04em]">11 / 14</p>
                </div>
                <div className="rounded-xl border border-white/25 bg-white/10 p-4 backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-100">
                    ICU Bed Availability
                  </p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.04em]">18 beds</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-[1.6rem] border border-emerald-200 bg-[linear-gradient(90deg,#ecfff7_0%,#f5fffb_100%)] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">Public Advisory</p>
              <p className="mt-1 text-sm font-semibold text-emerald-900 sm:text-base">
                Digital registration is live for all outpatient departments. Walk-in emergency service remains available
                24/7.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Read Patient Guide
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
            >
              <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#0b4ea2]">{service.metric}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
