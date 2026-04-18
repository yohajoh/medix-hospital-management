"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, HeartPulse, HelpCircle, Timer, AlertCircle } from "lucide-react";
import OTPInput from "@/app/_components/OTPInput";
import { useAuth } from "@/app/_hooks/useAuth";

function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const target = searchParams.get("target") || "Clinical User";

  const { handleOTPVerify, handleOTPRequest, isLoading, error } = useAuth();
  const [timeLeft, setTimeLeft] = useState(299); // 5 minutes

  // Countdown Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const onCodeComplete = (code: string) => {
    handleOTPVerify(code, target);
  };

  const handleResend = async () => {
    // We use the 'target' we already have from the URL
    const result = await handleOTPRequest(undefined, target);

    if (result?.success) {
      setTimeLeft(299); // Only reset timer if the API call actually worked
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col font-sans">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#1A4F95] font-bold text-xl">
          <HeartPulse className="w-8 h-8" />
          <span>Clinical Architect Portal</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <HeartPulse className="w-5 h-5 cursor-pointer hover:text-[#1A4F95]" />
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-[#1A4F95]" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] max-w-lg w-full p-12 text-center border border-gray-50">
          <div className="w-16 h-16 bg-[#DCE6F2] text-[#1A4F95] rounded-xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-gray-800 mb-2">Security Verification</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            To protect patient data, we've sent a 6-digit
            <br />
            verification code to:
            <br />
            <span className="font-bold text-[#1A4F95]">{target}</span>
          </p>

          {/* Error Message Display */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="mb-10">
            <OTPInput onComplete={onCodeComplete} disabled={isLoading} />
          </div>

          <button
            onClick={() => {}} // Controlled by onComplete for better UX
            disabled={isLoading}
            className="w-full bg-[#1A4F95] text-white font-bold py-4 rounded-lg hover:bg-[#15407a] transition-all disabled:bg-gray-300 shadow-lg shadow-[#1A4F95]/20 mb-6"
          >
            {isLoading ? "Validating..." : "Verify Identity"}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Timer className="w-4 h-4 text-red-500" />
            <span>
              Code expires in <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>
            </span>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Didn't receive code?</p>
            <button
              onClick={handleResend}
              disabled={isLoading || timeLeft > 240} // Prevent spamming resend
              className="text-[#1A4F95] font-black text-sm hover:underline uppercase tracking-tight disabled:text-gray-300"
            >
              Resend Code
            </button>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
          Secure Clinical Environment Layer
        </p>
      </footer>
    </div>
  );
}

// Wrap in Suspense because useSearchParams is used
export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center font-bold text-[#1A4F95]">
          Loading Secure Layer...
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
}
