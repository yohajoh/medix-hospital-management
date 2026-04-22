import type { Metadata } from "next";
import { DashboardChrome } from "../_components/DashboardChrome";
import { getRoleConfig } from "../_lib/roles";

export const metadata: Metadata = {
  title: "Medix | Dashboard",
};

export default async function RoleLayout({
  params,
  children,
}: {
  params: Promise<{ role: string }>;
  children: React.ReactNode;
}) {
  const { role } = await params;
  const config = getRoleConfig(role);

  return (
    <DashboardChrome config={config} role={config.role}>
      {children}
    </DashboardChrome>
  );
}

