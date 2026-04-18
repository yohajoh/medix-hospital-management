"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Mail, Lock, LogIn, Tablet, ShieldCheck, HeartPulse, HelpCircle } from "lucide-react";
import { useQRLogin } from "@/app/_hooks/useQRLogin";
import { useAuth } from "@/app/_hooks/useAuth";

const ASSETS = {
  GOOGLE_ICON: "https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png",
  MEDICAL_BG: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
};

export default function LoginPage() {
  const { sessionId } = useQRLogin();
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    isLoading,
    error,
    handleNormalLogin,
    handleGoogleLogin,
    handleOTPLogin,
  } = useAuth();

  const [capsLock, setCapsLock] = useState(false);

  const checkCapsLock = (e: React.KeyboardEvent) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  // This determines the base URL dynamically if the env is missing
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_FRONTEND_URL) {
      return process.env.NEXT_PUBLIC_FRONTEND_URL;
    }
    // Fallback to the current browser origin (e.g., http://localhost:3000)
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "http://localhost:3000";
  };

  const qrValue = `${getBaseUrl()}/auth/scan?sid=${sessionId}`;
  console.log(qrValue);

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col font-sans selection:bg-[#1A4F95]/10">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#1A4F95] font-bold text-xl">
          <HeartPulse className="w-8 h-8" />
          <span className="tracking-tight">Clinical Architect Portal</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <HeartPulse className="w-5 h-5 cursor-pointer hover:text-[#1A4F95] transition-colors" />
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-[#1A4F95] transition-colors" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex max-w-5xl w-full overflow-hidden min-h-[620px] border border-gray-100">
          {/* Left Side: Traditional Credentials */}
          <div className="flex-1 p-12 flex flex-col">
            <h1 className="text-3xl font-black text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-8 text-sm">Secure access for clinical staff and patient care management.</p>

            {/* Error Message Display */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-1">
                <p className="text-[#A13D2D] text-[10px] font-black uppercase tracking-tight">
                  Authentication Error: {error}
                </p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleNormalLogin}>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1.5">
                  Username / Email / Phone
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your credentials"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3.5 px-4 outline-none focus:ring-4 focus:ring-[#1A4F95]/5 focus:border-[#1A4F95] transition-all placeholder:text-gray-300 disabled:opacity-50"
                  />
                  <Mail className="absolute right-4 top-4 w-5 h-5 text-gray-300 group-focus-within:text-[#1A4F95] transition-colors" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Password</label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[10px] font-black text-[#1A4F95] uppercase hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    required
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={checkCapsLock}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3.5 px-4 outline-none focus:ring-4 focus:ring-[#1A4F95]/5 focus:border-[#1A4F95] transition-all placeholder:text-gray-300 disabled:opacity-50"
                  />
                  <Lock className="absolute right-4 top-4 w-5 h-5 text-gray-300 group-focus-within:text-[#1A4F95] transition-colors" />
                </div>
                {capsLock && (
                  <p className="text-[#A13D2D] text-[10px] mt-2 flex items-center gap-1 font-bold bg-[#FDF2F0] w-fit px-2 py-1 rounded">
                    <Tablet className="w-3 h-3 rotate-180" /> CAPS LOCK IS ON
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1A4F95] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#15407a] active:scale-[0.98] transition-all shadow-lg shadow-[#1A4F95]/20 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  "Validating..."
                ) : (
                  <>
                    Login <LogIn className="w-5 h-5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOTPLogin}
                disabled={isLoading}
                className="w-full bg-[#E2E8F0] text-gray-700 font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                Login with OTP <Tablet className="w-5 h-5" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100"></span>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase text-gray-400">
                <span className="bg-white px-4 tracking-[0.2em]">Stakeholder SSO</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full border border-gray-200 py-3.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all text-sm font-semibold text-gray-600 cursor-pointer disabled:opacity-50"
            >
              <Image src={ASSETS.GOOGLE_ICON} alt="Google" width={20} height={20} unoptimized />
              {isLoading ? "Redirecting..." : "Continue with Google"}
            </button>

            <p className="text-center mt-auto pt-6 text-xs text-gray-400 font-medium tracking-tight">
              New patient?{" "}
              <Link href="/register" className="text-[#1A4F95] font-bold hover:underline">
                Register for Portal Access
              </Link>
            </p>
          </div>

          {/* Right Side: QR Scan Section */}
          <div className="hidden lg:flex flex-1 bg-[#F9FBFC] border-l border-gray-100 flex-col items-center justify-center relative p-12 text-center">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <Image src={ASSETS.MEDICAL_BG} alt="hospital backdrop" fill className="object-cover grayscale" priority />
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] z-10 mb-8 border border-gray-50">
              {sessionId ? (
                <QRCodeSVG value={qrValue} size={190} level="H" includeMargin={false} />
              ) : (
                <div className="w-[190px] h-[190px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[#1A4F95] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-black text-gray-800 z-10 mb-3 tracking-tight">Fast Scan Access</h2>
            <p className="text-gray-400 text-[13px] z-10 max-w-[260px] leading-relaxed font-medium">
              Clinicians with the <span className="text-gray-600 font-bold">Medix Mobile App</span> can scan to
              instantly authenticate on this workstation.
            </p>

            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent my-10 z-10" />

            <div className="flex gap-8 z-10 text-gray-300">
              <ShieldCheck className="w-6 h-6 hover:text-[#1A4F95] transition-colors" />
              <Lock className="w-6 h-6 hover:text-[#1A4F95] transition-colors" />
              <HeartPulse className="w-6 h-6 hover:text-[#1A4F95] transition-colors" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 bg-white border-t border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase flex flex-wrap items-center justify-center gap-4">
          <span>© 2026 CLINICAL ARCHITECT HEALTH SYSTEMS.</span>
          <span className="hidden lg:inline text-gray-200">|</span>
          <span>HIPAA COMPLIANT ENVIRONMENT</span>
          <div className="bg-[#FFF5F4] text-[#C53030] px-4 py-1.5 rounded-full font-black border border-[#FED7D7]">
            ⚠ SHARED COMPUTER SAFETY: ALWAYS LOGOUT AFTER USE.
          </div>
        </div>
        <div className="flex gap-8 text-[11px] font-black text-gray-500 uppercase tracking-widest">
          <Link href="/security" className="hover:text-[#1A4F95] transition-colors">
            Security
          </Link>
          <Link href="/terms" className="hover:text-[#1A4F95] transition-colors">
            Terms
          </Link>
          <Link href="/status" className="hover:text-[#1A4F95] transition-colors">
            System
          </Link>
          <Link href="/support" className="hover:text-[#1A4F95] transition-colors">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
