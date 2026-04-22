import Link from "next/link";
import { DASHBOARD_ROLES, getRoleConfig } from "./_lib/roles";

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-10 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">
        Dashboards
      </h1>
      <p className="text-sm text-slate-600 mb-8">
        Frontend-only replicas using mock data. Pick a role dashboard to view.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DASHBOARD_ROLES.map((role) => {
          const cfg = getRoleConfig(role);
          return (
            <Link
              key={role}
              href={`/dashboard/${role}`}
              className="dash-card p-6 hover:shadow-[0_18px_44px_rgba(16,41,69,0.10)] transition"
            >
              <div className="text-sm font-semibold text-slate-500">
                {cfg.moduleName}
              </div>
              <div className="mt-1 text-xl font-extrabold tracking-tight">
                {role.toUpperCase()}
              </div>
              <div className="mt-2 text-sm text-slate-600">{cfg.headerTitle}</div>
              <div className="mt-5 text-[12px] text-slate-500">
                Route: <span className="font-mono">/dashboard/{role}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
