import { type JSX, type ReactNode } from "react";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-slate-200/80 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-sky-800">
              Clinical Access
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-[-0.06em] text-slate-950 sm:text-[2.6rem]">{title}</h1>
              <p className="max-w-lg text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
            </div>
          </div>

          <div className="mt-8">{children}</div>
        </div>

        <aside className="relative overflow-hidden rounded-b-[2rem] bg-[linear-gradient(180deg,#eff5fb_0%,#e8eef6_100%)] p-6 sm:p-8 lg:rounded-l-none lg:rounded-r-[2rem] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(11,78,162,0.09),_transparent_40%),linear-gradient(135deg,_rgba(255,255,255,0.55),_rgba(255,255,255,0.08))]" />
          <div className="relative h-full min-h-[340px] rounded-[1.6rem] border border-white/70 bg-white/65 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)]">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
                    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM7 8h10v1.8H7zM7 11.5h7v1.8H7zM7 15h10v1.8H7z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-[-0.05em] text-slate-950">Fast scan access</h2>
                  <p className="max-w-sm text-sm leading-6 text-slate-600">
                    Login and verification data are represented through live, deterministic QR payloads so the preview
                    always reflects the current form state.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Validation</div>
                  <p className="mt-2 leading-6">Live feedback is driven by shared schema rules, not static copy.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Data Binding</div>
                  <p className="mt-2 leading-6">
                    The preview payload updates when the user changes any credential field.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
