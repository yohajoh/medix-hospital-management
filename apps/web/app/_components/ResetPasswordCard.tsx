"use client";

import React from "react";
import { Shield, CheckCircle2, Eye, ArrowRight, ArrowLeft, Circle } from "lucide-react";
import Link from "next/link";

interface Props {
  passwords: { new: string; confirm: string };
  setPasswords: (val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function ResetPasswordCard({ passwords, setPasswords, onSubmit, isLoading }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] max-w-5xl w-full flex overflow-hidden min-h-[600px] border border-white">
      {/* Left Column: Branding/Security Info */}
      <div className="w-[45%] bg-gradient-to-br from-[#1A4F95] to-[#12386A] p-16 text-white flex flex-col">
        <div className="bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center mb-10">
          <Shield className="w-8 h-8 text-white fill-white/20" />
        </div>

        <h2 className="text-[40px] font-black leading-[1.1] mb-6 tracking-tight">Secure Access Recovery</h2>

        <p className="text-blue-100/80 text-[16px] leading-relaxed mb-12 font-medium">
          Updating your security credentials to maintain HIPAA compliance and patient data integrity.
        </p>

        <div className="space-y-10">
          <div className="flex gap-5">
            <div className="bg-white/10 p-3 rounded-xl h-fit">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-[15px] mb-1 uppercase tracking-wider">End-to-End Encryption</h4>
              <p className="text-blue-100/60 text-xs leading-relaxed">
                Your new credentials are hashed using industry-standard SHA-256 protocols.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="bg-white/10 p-3 rounded-xl h-fit">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-[15px] mb-1 uppercase tracking-wider">Identity Verification</h4>
              <p className="text-blue-100/60 text-xs leading-relaxed">
                Session validated via secure multi-factor recovery tokens.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: The Form */}
      <div className="flex-1 p-16 flex flex-col justify-center">
        <h1 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">Reset Password</h1>
        <p className="text-gray-500 text-sm mb-10 font-medium">
          Please create a new password for your clinical account.
        </p>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* New Password Field */}
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-[#F3F6F9] border-none rounded-lg p-4.5 pr-12 text-gray-700 outline-none focus:ring-2 focus:ring-[#1A4F95] transition-all"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
              <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>

          {/* Validation Grid */}
          <div className="bg-[#F8FAFC] rounded-xl p-6 grid grid-cols-2 gap-y-4 gap-x-6 border border-gray-100">
            <Requirement label="Min. 12 characters" met={passwords.new.length >= 12} />
            <Requirement label="One uppercase letter" met={/[A-Z]/.test(passwords.new)} />
            <Requirement label="One special character" met={/[!@#$%^&*]/.test(passwords.new)} />
            <Requirement label="One numerical digit" met={/[0-9]/.test(passwords.new)} />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full bg-[#F3F6F9] border-none rounded-lg p-4.5 text-gray-700 outline-none focus:ring-2 focus:ring-[#1A4F95] transition-all"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || passwords.new !== passwords.confirm || passwords.new.length < 12}
            className="w-full bg-[#1A4F95] text-white font-black py-4.5 rounded-lg flex items-center justify-center gap-3 hover:bg-[#15407a] transition-all shadow-xl shadow-[#1A4F95]/20 uppercase text-sm tracking-widest disabled:bg-gray-200"
          >
            Update Credentials <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-12 flex justify-center">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-[#1A4F95] font-black text-xs uppercase tracking-tight hover:underline"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" /> Return to Secure Login
          </Link>
        </div>
      </div>
    </div>
  );
}

function Requirement({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {met ? (
        <div className="w-4 h-4 rounded-full bg-[#1A4F95] flex items-center justify-center">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      ) : (
        <Circle className="w-4 h-4 text-gray-300" />
      )}
      <span className={`text-[11px] font-bold ${met ? "text-gray-700" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}
