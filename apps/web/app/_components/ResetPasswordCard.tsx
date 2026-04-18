"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, Eye, EyeOff, ArrowRight, ArrowLeft, Circle, Loader2 } from "lucide-react";
import Link from "next/link";

interface Props {
  passwords: { new: string; confirm: string };
  setPasswords: (val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function ResetPasswordCard({ passwords, setPasswords, onSubmit, isLoading }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  // Strength Validation Logic
  const validation = {
    length: passwords.new.length >= 12,
    uppercase: /[A-Z]/.test(passwords.new),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(passwords.new),
    number: /[0-9]/.test(passwords.new),
  };

  const isFormValid =
    validation.length &&
    validation.uppercase &&
    validation.special &&
    validation.number &&
    passwords.new === passwords.confirm &&
    passwords.confirm !== "";

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] max-w-5xl w-full flex overflow-hidden min-h-[520px] border border-white">
      {/* Left Column: Branding/Security Info */}
      <div className="w-[45%] bg-gradient-to-br from-[#1A4F95] to-[#12386A] p-12 text-white flex flex-col justify-center">
        <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-8">
          <Shield className="w-6 h-6 text-white fill-white/20" />
        </div>

        <h2 className="text-[36px] font-black leading-[1.1] mb-5 tracking-tight">Secure Access Recovery</h2>

        <p className="text-blue-100/80 text-[14px] leading-relaxed mb-10 font-medium">
          Updating your security credentials to maintain HIPAA compliance and patient data integrity.
        </p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="bg-white/10 p-2.5 rounded-lg h-fit">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-[13px] mb-0.5 uppercase tracking-wider">End-to-End Encryption</h4>
              <p className="text-blue-100/60 text-[11px] leading-relaxed">Hashed using industry-standard protocols.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/10 p-2.5 rounded-lg h-fit">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-[13px] mb-0.5 uppercase tracking-wider">Identity Verification</h4>
              <p className="text-blue-100/60 text-[11px] leading-relaxed">Validated via secure multi-factor tokens.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: The Form */}
      <div className="flex-1 p-12 flex flex-col justify-center">
        <h1 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">Reset Password</h1>
        <p className="text-gray-500 text-xs mb-8 font-medium">Create a new password for your clinical account.</p>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* New Password Field */}
          <div className="space-y-2">
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-[#F3F6F9] border-none rounded-lg p-4 pr-12 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#1A4F95] transition-all"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A4F95] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Validation Grid */}
          <div className="bg-[#F8FAFC] rounded-xl p-5 grid grid-cols-2 gap-y-3 gap-x-4 border border-gray-100">
            <Requirement label="Min. 12 characters" met={validation.length} />
            <Requirement label="One uppercase letter" met={validation.uppercase} />
            <Requirement label="One special character" met={validation.special} />
            <Requirement label="One numerical digit" met={validation.number} />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full bg-[#F3F6F9] border-none rounded-lg p-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#1A4F95] transition-all"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full bg-[#1A4F95] text-white font-black py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-[#15407a] transition-all shadow-xl shadow-[#1A4F95]/20 uppercase text-[11px] tracking-widest disabled:bg-gray-200 disabled:shadow-none"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Update Credentials <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex justify-center">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-[#1A4F95] font-black text-[10px] uppercase tracking-tight hover:underline"
          >
            <ArrowLeft className="w-3 h-3 stroke-[3]" /> Return to Secure Login
          </Link>
        </div>
      </div>
    </div>
  );
}

function Requirement({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {met ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-[#1A4F95] fill-[#1A4F95]/10" />
      ) : (
        <Circle className="w-3.5 h-3.5 text-gray-300" />
      )}
      <span className={`text-[10px] font-bold transition-colors ${met ? "text-gray-700" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}
