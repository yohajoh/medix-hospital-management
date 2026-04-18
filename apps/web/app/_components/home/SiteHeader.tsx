"use client"; // Required for useRouter

import type { JSX } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the router hook

interface SiteHeaderProps {
  navItems: string[];
}

export function SiteHeader({ navItems }: SiteHeaderProps): JSX.Element {
  const router = useRouter(); // Initialize the router

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-(--ca-border) bg-(--ca-surface)/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--ca-border) bg-(--ca-surface-soft) text-[11px] font-black text-(--ca-text)">
              M
            </span>
            <div className="text-[26px] leading-5 font-black tracking-[-0.04em] text-(--ca-text)">
              <div>Medix</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-[15px] font-medium text-(--ca-text-muted) lg:flex">
            {navItems.map((item) => (
              <Link key={item} href="#" className="transition hover:text-(--ca-text)">
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* UPDATED: Changed from Link to a Button with programmatic navigation */}
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="inline-flex h-10 items-center rounded-lg border border-(--ca-border) bg-(--ca-surface-soft) px-4 text-sm font-medium text-(--ca-text-muted) hover:text-(--ca-text) transition-colors cursor-pointer"
          >
            Login
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center rounded-lg border border-[#3a5e86] bg-(--ca-brand-900) px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(8,30,56,0.25)] cursor-pointer hover:bg-[#2d4a6b] transition-all"
          >
            Request Demo
          </button>
        </div>
      </div>
    </header>
  );
}
