import type { JSX, ReactNode } from "react";

export default function AutLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,78,162,0.12),_transparent_35%),linear-gradient(180deg,#f7f9fc_0%,#eef3f9_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between rounded-[1.6rem] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_14px_36px_rgba(15,23,42,0.05)] backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0b4ea2] text-sm font-black text-white shadow-[0_12px_24px_rgba(11,78,162,0.22)]">
              M
            </span>
            <div>
              <div className="text-sm font-black tracking-[-0.04em] text-slate-950 sm:text-base">
                Medix Hospital Management
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                Authentication suite
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 text-[12px] font-semibold text-slate-500 sm:flex">
            <span>Secure access</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>HIPAA-compliant UI</span>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="mt-6 flex flex-col gap-3 rounded-[1.4rem] border border-white/70 bg-white/75 px-4 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>© 2024 Medix Hospital Management</div>
          <div className="flex flex-wrap gap-4">
            <span>Security Policy</span>
            <span>Terms of Service</span>
            <span>System Status</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
