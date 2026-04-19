"use client";
import { Info, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Props {
  identifier: string;
  setIdentifier: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function RecoveryCard({
  identifier,
  setIdentifier,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] max-w-[540px] w-full p-14 border border-white/50">
      <h1 className="text-[34px] font-black text-[#1E293B] mb-4 tracking-tight">
        Account Recovery
      </h1>
      <p className="text-[#64748B] text-[15px] mb-10 leading-relaxed font-medium">
        To maintain a HIPPA compliant environment, enter your credentials below
        to begin the identity verification process.
      </p>

      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <label className="block text-[10.5px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-3">
            Username, Email, or Phone
          </label>
          <input
            type="text"
            placeholder="Enter your credentials"
            className="w-full bg-[#F1F5F9] border-none rounded-xl p-5 text-gray-700 placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#1A4F95] transition-all outline-none"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <p className="text-[10px] text-[#94A3B8] mt-3 font-bold leading-tight">
            Recovery instructions will be sent via your primary communication
            channel.
          </p>
        </div>

        <button
          disabled={isLoading || !identifier}
          className="w-full bg-[#1A4F95] text-white font-black py-4.5 rounded-xl hover:bg-[#15407a] transition-all disabled:bg-[#CBD5E1] shadow-2xl shadow-[#1A4F95]/20 text-sm uppercase tracking-wider flex justify-center items-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Send Recovery Code"
          )}
        </button>
      </form>

      <div className="mt-10 bg-[#F0F7FF] rounded-xl p-6 flex gap-4 items-start border border-[#D0E4FF]">
        <Info className="w-5 h-5 text-[#1A4F95] mt-0.5 shrink-0" />
        <p className="text-[11.5px] text-[#475569] leading-[1.6] font-medium">
          <span className="font-black text-[#1E293B] uppercase tracking-tighter mr-1">
            Security Protocol:
          </span>
          If a matching account exists in our health systems, a verification
          code has been dispatched. Please check your inbox or mobile device.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-[#1A4F95] font-black text-[13px] uppercase tracking-tight hover:underline transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          Back to Clinical Login
        </Link>
      </div>
    </div>
  );
}
