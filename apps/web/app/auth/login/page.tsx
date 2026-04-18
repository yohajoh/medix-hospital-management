"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Imported Next.js Link
import { QRCodeSVG } from "qrcode.react";
import { Mail, Lock, LogIn, Tablet, ShieldCheck, HeartPulse, HelpCircle } from "lucide-react";
import { useQRLogin } from "@/app/_hooks/useQRLogin";

export default function LoginPage() {
  const { sessionId } = useQRLogin();
  const [capsLock, setCapsLock] = useState(false);

  const checkCapsLock = (e: React.KeyboardEvent) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col font-sans">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 text-[#1A4F95] font-bold text-xl">
          <HeartPulse className="w-8 h-8" />
          <span>Clinical Architect Portal</span>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <HeartPulse className="w-5 h-5 cursor-pointer hover:text-[#1A4F95] transition" />
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-[#1A4F95] transition" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl flex max-w-5xl w-full overflow-hidden min-h-[600px]">
          {/* Left Side: Standard Login */}
          <div className="flex-1 p-12 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-8">Secure access for clinical staff and patient care management.</p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Username / Email / Phone
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your credentials"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-4 outline-none focus:ring-2 focus:ring-[#1A4F95]/20 transition"
                  />
                  <Mail className="absolute right-4 top-3.5 w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
                  <Link
                    href="/auth/forgot-password"
                    // size="sm"
                    className="text-[10px] font-bold text-[#1A4F95] uppercase hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    onKeyDown={checkCapsLock}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-4 outline-none focus:ring-2 focus:ring-[#1A4F95]/20"
                  />
                  <Lock className="absolute right-4 top-3.5 w-5 h-5 text-gray-300" />
                </div>
                {capsLock && (
                  <p className="text-[#A13D2D] text-[10px] mt-2 flex items-center gap-1 font-bold">
                    <Tablet className="w-3 h-3 rotate-180" /> Caps Lock is ON
                  </p>
                )}
              </div>

              <button className="w-full bg-[#1A4F95] text-white font-bold py-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#15407a] transition shadow-lg shadow-blue-900/20">
                Login <LogIn className="w-5 h-5" />
              </button>

              <button
                type="button"
                className="w-full bg-[#E2E8F0] text-gray-700 font-bold py-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-300 transition"
              >
                Login with OTP <Tablet className="w-5 h-5" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase text-gray-400">
                <span className="bg-white px-4 tracking-widest">Stakeholder SSO</span>
              </div>
            </div>

            <button className="w-full border border-gray-200 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium text-gray-600">
              <Image src="/google-icon.png" alt="Google" width={20} height={20} />
              Continue with Google
            </button>

            <p className="text-center mt-auto text-sm text-gray-500">
              New patient?{" "}
              <Link href="/register" className="text-[#1A4F95] font-bold underline hover:text-[#15407a]">
                Register for Portal Access
              </Link>
            </p>
          </div>

          {/* Right Side: QR Access */}
          <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100 border-l border-gray-100 flex-col items-center justify-center relative p-12 text-center">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Image src="/medical-bg.jpg" alt="background corridor" fill className="object-cover" />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl z-10 mb-8 border border-gray-100">
              {sessionId ? (
                <QRCodeSVG
                  value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/scan?sid=${sessionId}`}
                  size={180}
                  level="H"
                />
              ) : (
                <div className="w-[180px] h-[180px] bg-gray-100 animate-pulse rounded" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 z-10 mb-4">Fast Scan Access</h2>
            <p className="text-gray-400 text-sm z-10 max-w-xs leading-relaxed">
              Clinicians with the Architect Mobile App can scan to instantly authenticate on this workstation.
            </p>

            <div className="w-40 h-[1px] bg-gray-200 my-8 z-10" />

            <div className="flex gap-6 z-10 text-gray-400">
              <ShieldCheck className="w-6 h-6" />
              <Lock className="w-6 h-6" />
              <HeartPulse className="w-6 h-6" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-4 bg-white border-t border-gray-200">
        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
          © 2026 CLINICAL ARCHITECT HEALTH SYSTEMS. HIPPA COMPLIANT ENVIRONMENT.
          <div className="inline-block bg-[#FDF2F0] text-[#A13D2D] px-3 py-1 rounded-full ml-4 font-bold border border-[#F5E1DE]">
            ⚠ SHARED COMPUTER SAFETY: ALWAYS LOGOUT AFTER USE.
          </div>
        </div>
        <div className="flex gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
          <Link href="/security" className="hover:text-[#1A4F95] transition">
            Security Policy
          </Link>
          <Link href="/terms" className="hover:text-[#1A4F95] transition">
            Terms of Service
          </Link>
          <Link href="/status" className="hover:text-[#1A4F95] transition">
            System Status
          </Link>
          <Link href="/support" className="hover:text-[#1A4F95] transition">
            Emergency Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
