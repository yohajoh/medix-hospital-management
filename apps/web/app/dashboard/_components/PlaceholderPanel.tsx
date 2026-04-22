import { Badge } from "./Badge";

export function PlaceholderPanel({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="dash-glass p-8">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-extrabold tracking-tight">{title}</h2>
        <Badge tone="neutral">Mock</Badge>
      </div>
      {subtitle ? <p className="mt-2 dash-muted text-sm">{subtitle}</p> : null}
      <p className="mt-6 text-sm dash-muted">
        This section is a frontend-only placeholder. Wire it to real services
        later via `apps/web/app/dashboard/_lib/methods.ts`.
      </p>
    </div>
  );
}

