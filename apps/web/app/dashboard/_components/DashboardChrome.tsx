"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, HelpCircle, Settings2 } from "lucide-react";
import type { RoleConfig, RoleNavItem } from "../_lib/roles";
import { mockProfiles } from "../_lib/mock/profile";
import { ICONS, type IconKey } from "./icons";
import { cn } from "./cn";
import { Avatar } from "./Avatar";
import { IconButton } from "./IconButton";
import { ActionButton } from "./ActionButton";
import type { DashboardMethodKey } from "../_lib/methods";

const buildHref = (role: string, item: RoleNavItem) => {
  if (item.key === "overview") return `/dashboard/${role}`;
  return `/dashboard/${role}/${item.key}`;
};

export function DashboardChrome({
  config,
  role,
  children,
}: {
  config: RoleConfig;
  role: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const profile = mockProfiles[config.role] ?? mockProfiles.patient;

  const rootTone =
    config.sidebarTone === "dark" ? "dash-dark-sidebar text-white" : "";

  const variantClass =
    config.variant === "nurse"
      ? "dash-variant-nurse"
      : config.variant === "lab"
        ? "dash-variant-lab"
        : config.variant === "admin"
          ? "dash-variant-admin"
          : config.variant === "it"
            ? "dash-variant-it"
            : config.variant === "insurance"
              ? "dash-variant-insurance"
              : config.variant === "pharmacy"
                ? "dash-variant-pharmacy"
                : "";

  const iconTone = config.sidebarTone === "dark" ? "dark" : "light";

  return (
    <div className={cn("dash-root", rootTone, variantClass)}>
      <div className="flex min-h-screen">
        <aside className={cn("dash-sidebar w-[272px] px-5 py-6", rootTone)}>
          <div className="flex items-center gap-3 mb-7">
            <div
              className={cn(
                "h-11 w-11 rounded-2xl grid place-items-center border",
                config.sidebarTone === "dark"
                  ? "bg-[rgba(255,255,255,0.10)] border-[rgba(255,255,255,0.12)]"
                  : "bg-white/60 border-black/5",
              )}
            >
              <span className="text-lg font-extrabold">+</span>
            </div>
            <div className="leading-tight">
              <div
                className={cn(
                  "text-[15px] font-extrabold tracking-tight",
                  config.sidebarTone === "dark" ? "text-white" : "text-slate-900",
                )}
              >
                {config.appName}
              </div>
              <div className={cn("text-[12px] font-semibold dash-muted")}>
                {config.moduleName}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div
              className={cn(
                "rounded-2xl px-4 py-3 border",
                config.sidebarTone === "dark"
                  ? "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.12)]"
                  : "bg-white/55 border-black/5",
              )}
            >
              <div className="text-[14px] font-extrabold tracking-tight">
                {config.moduleName}
              </div>
              <div className="text-[11px] font-semibold uppercase dash-subtle">
                {config.roleLabel}
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {config.nav.map((item) => {
              const href = buildHref(role, item);
              const isActive =
                pathname === href ||
                (item.key === "overview" && pathname === `/dashboard/${role}`);
              const Icon = ICONS[item.icon as IconKey];
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl border transition",
                    config.sidebarTone === "dark"
                      ? "border-white/0 hover:border-white/10 hover:bg-[rgba(255,255,255,0.07)]"
                      : "border-black/0 hover:border-black/5 hover:bg-white/60",
                    isActive && (config.sidebarTone === "dark"
                      ? "bg-[rgba(255,255,255,0.10)] border-[rgba(255,255,255,0.12)]"
                      : "dash-nav-active"),
                  )}
                >
                  <span
                    className={cn(
                      "h-9 w-9 rounded-xl grid place-items-center border",
                      config.sidebarTone === "dark"
                        ? "bg-[rgba(255,255,255,0.07)] border-[rgba(255,255,255,0.12)]"
                        : "bg-white border-black/5",
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <span
                    className={cn(
                      "text-[13px] font-semibold",
                      config.sidebarTone === "dark"
                        ? "text-white/90"
                        : "text-slate-700",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {config.emergencyCtaLabel ? (
            <div className="mt-6">
              <button
                type="button"
                className={cn(
                  "w-full h-12 rounded-2xl font-semibold border shadow-[0_18px_44px_rgba(16,41,69,0.08)] transition",
                  config.sidebarTone === "dark"
                    ? "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.12)]"
                    : "dash-accent-bg",
                )}
              >
                {config.emergencyCtaLabel}
              </button>
            </div>
          ) : null}
        </aside>

        <main className="flex-1">
          <div className="dash-topbar px-8 py-5">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1 max-w-[560px]">
                <div className="relative">
                  <input
                    className={cn(
                      "w-full h-12 rounded-2xl border px-12 text-[14px] outline-none",
                      config.sidebarTone === "dark"
                        ? "bg-white/80 border-black/5 text-slate-800"
                        : "bg-white/65 border-black/5 text-slate-800",
                    )}
                    placeholder={config.searchPlaceholder}
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <IconButton
                  icon={Bell}
                  label="Notifications"
                  tone={iconTone}
                  onClick={() => {}}
                />
                <IconButton
                  icon={Settings2}
                  label="Settings"
                  tone={iconTone}
                  onClick={() => {}}
                />
                <IconButton
                  icon={HelpCircle}
                  label="Help"
                  tone={iconTone}
                  onClick={() => {}}
                />
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-3 py-2",
                    config.sidebarTone === "dark"
                      ? "bg-[rgba(255,255,255,0.10)] border-[rgba(255,255,255,0.12)]"
                      : "bg-white/55 border-black/5",
                  )}
                >
                  <div className="text-right leading-tight hidden sm:block">
                    <div
                      className={cn(
                        "text-[12px] font-extrabold",
                        config.sidebarTone === "dark"
                          ? "text-white"
                          : "text-slate-900",
                      )}
                    >
                      {profile.name}
                    </div>
                    <div className="text-[10px] font-semibold uppercase dash-subtle">
                      {profile.subtitle}
                    </div>
                  </div>
                  <Avatar initials={profile.initials} tone={iconTone} />
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            {(config.secondaryAction || config.primaryAction) && (
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-[34px] leading-tight font-extrabold tracking-tight text-slate-900">
                    {config.headerTitle}
                  </h1>
                  <p className="mt-2 text-[13px] dash-muted">
                    Your health summary is updated as of today, Oct 24, 2023.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {config.secondaryAction ? (
                    <ActionButton
                      label={config.secondaryAction.label}
                      method={config.secondaryAction.actionKey as DashboardMethodKey}
                    />
                  ) : null}
                  {config.primaryAction ? (
                    <ActionButton
                      label={config.primaryAction.label}
                      method={config.primaryAction.actionKey as DashboardMethodKey}
                      variant="accent"
                      className="h-[44px] px-5 rounded-2xl"
                    />
                  ) : null}
                </div>
              </div>
            )}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
