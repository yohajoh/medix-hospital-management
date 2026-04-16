"use client";

import { type JSX, useMemo, useState } from "react";

import { AuthQrPreview } from "@repo/ui/auth-qr-preview";
import { AuthShell } from "@repo/ui/auth-shell";
import { AuthStatus } from "@repo/ui/auth-status";
import { buildAuthQrPayload, passwordStrengthScore, summarizeAuthTarget } from "@repo/utils";
import { loginCredentialsSchema, type LoginCredentialsInput } from "@repo/validators";

const initialValues: LoginCredentialsInput = {
  identifier: "",
  password: "",
  rememberDevice: true,
};

export default function LoginPage(): JSX.Element {
  const [values, setValues] = useState<LoginCredentialsInput>(initialValues);
  const parsed = useMemo(() => loginCredentialsSchema.safeParse(values), [values]);

  const passwordLength = values.password.length;
  const strengthScore = passwordStrengthScore(values.password);
  const identifierPreview = summarizeAuthTarget(values.identifier);
  const qrPayload = buildAuthQrPayload(values);

  const feedback = (() => {
    if (!values.identifier.trim() && !values.password) {
      return {
        tone: "info" as const,
        title: "Ready to sign in",
        description: "Enter your clinical credentials and the preview will update instantly.",
      };
    }

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return {
        tone: "error" as const,
        title: "Validation issue",
        description: firstIssue.message,
      };
    }

    if (strengthScore <= 2) {
      return {
        tone: "warning" as const,
        title: "Password warning",
        description: "Use a longer password with mixed characters for stronger access protection.",
      };
    }

    return {
      tone: "success" as const,
      title: "Credentials ready",
      description: "The current form satisfies the local validation rules and the QR payload is synchronized.",
    };
  })();

  return (
    <AuthShell
      title="Welcome Back"
      description="Secure access for clinical staff and administrative users. This page is built as a standalone auth module inside the shared aut folder."
    >
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <label className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">
              Username / Email / Phone
            </span>
            <input
              value={values.identifier}
              onChange={(event) => setValues((current) => ({ ...current, identifier: event.target.value }))}
              placeholder="Enter your credentials"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-[#0b4ea2] focus:bg-white"
              autoComplete="username"
            />
          </label>

          <label className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">Password</span>
            <input
              type="password"
              value={values.password}
              onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
              placeholder="Enter password"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-[#0b4ea2] focus:bg-white"
              autoComplete="current-password"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={values.rememberDevice}
              onChange={(event) => setValues((current) => ({ ...current, rememberDevice: event.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-[#0b4ea2] focus:ring-[#0b4ea2]"
            />
            Remember this device
          </label>

          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Preview target: {identifierPreview}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_0.92fr]">
          <div className="space-y-4">
            <AuthStatus tone={feedback.tone} title={feedback.title} description={feedback.description} />

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Password length</div>
                <div className="mt-2 text-2xl font-black tracking-[-0.06em] text-slate-950">
                  {passwordLength || "--"}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Strength score</div>
                <div className="mt-2 text-2xl font-black tracking-[-0.06em] text-slate-950">{strengthScore}/5</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Device memory</div>
                <div className="mt-2 text-lg font-black tracking-[-0.05em] text-slate-950">
                  {values.rememberDevice ? "Enabled" : "Disabled"}
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Real-time notes</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>• The schema state is validated locally through a shared zod definition.</li>
                <li>• Error messages appear immediately when the current data becomes invalid.</li>
                <li>• The QR preview payload changes as soon as the identifier or password changes.</li>
              </ul>
            </div>
          </div>

          <AuthQrPreview
            payload={qrPayload}
            caption="Use this preview to authenticate on a scanner or kiosk that accepts the current session payload."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            disabled={!parsed.success}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#0b4ea2] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(11,78,162,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            Login
          </button>

          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Login with OTP
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
