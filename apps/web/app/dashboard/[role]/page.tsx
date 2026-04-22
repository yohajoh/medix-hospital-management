import Link from "next/link";
import { getRoleConfig } from "../_lib/roles";
import { PlaceholderPanel } from "../_components/PlaceholderPanel";
import { PatientOverview } from "./patient/PatientOverview";
import { NurseShiftOverview } from "./nurse/NurseShiftOverview";
import { LabDashboardOverview } from "./lab/LabDashboardOverview";
import { AdminSystemOverview } from "./admin/AdminSystemOverview";
import { ItInfrastructureCommand } from "./it/ItInfrastructureCommand";
import { InsuranceClaimsOverview } from "./insurance/InsuranceClaimsOverview";
import { PharmacyDashboardOverview } from "./pharmacy/PharmacyDashboardOverview";

const ROLE_PAGE: Record<string, React.ReactNode> = {
  patient: <PatientOverview />,
  nurse: <NurseShiftOverview />,
  lab: <LabDashboardOverview />,
  admin: <AdminSystemOverview />,
  it: <ItInfrastructureCommand />,
  insurance: <InsuranceClaimsOverview />,
  pharmacy: <PharmacyDashboardOverview />,
};

export default async function RoleDashboardPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const cfg = getRoleConfig(role);
  const content = ROLE_PAGE[cfg.role];

  return (
    <>
      {content ?? (
        <PlaceholderPanel
          title="Dashboard"
          subtitle="No mock page found for this role yet."
        />
      )}
      <div className="mt-10 text-xs text-slate-500">
        <Link className="underline" href="/dashboard">
          Back to dashboards list
        </Link>
      </div>
    </>
  );
}

