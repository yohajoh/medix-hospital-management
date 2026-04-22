"use client";

import { dashboardMethods, type DashboardMethodKey } from "../_lib/methods";
import { cn } from "./cn";

type Props = {
  label: string;
  method: DashboardMethodKey;
  variant?: "default" | "accent" | "dark";
  className?: string;
  payload?: unknown;
};

export function ActionButton({
  label,
  method,
  variant = "default",
  className,
  payload,
}: Props) {
  const tone =
    variant === "accent"
      ? "dash-btn dash-btn-accent"
      : variant === "dark"
        ? "dash-btn dash-btn-dark"
        : "dash-btn";

  return (
    <button
      type="button"
      className={cn(tone, className)}
      onClick={() => void dashboardMethods[method](payload)}
    >
      {label}
    </button>
  );
}

