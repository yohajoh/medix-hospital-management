"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQRLogin } from "@/app/_hooks/useQRLogin";
import { CheckCircle2, Loader2, XCircle, ShieldCheck } from "lucide-react";

function ScanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyScannerSession, isVerifying } = useQRLogin();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Prevents multiple API calls if the component re-renders
  const verificationStarted = useRef(false);

  const sid = searchParams.get("sid");

  useEffect(() => {
    const handleVerification = async () => {
      // 1. Validation and Guard
      if (!sid) {
        setStatus("error");
        setMessage("Invalid session link. Please scan the QR code again.");
        return;
      }

      if (verificationStarted.current) return;
      verificationStarted.current = true;

      console.log(`[Scan] Starting secure handshake for SID: ${sid}`);

      // 2. Execute Verification
      // This hits your backend, which then emits 'qr:success' to the desktop
      const result = await verifyScannerSession(sid, "/auth/qr/verify");

      if (result.success) {
        setStatus("success");
        setMessage("Desktop login authorized!");

        // 3. Optional: Move mobile user to dashboard after success
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setStatus("error");
        // Pull error from backend or use fallback
        const errorMsg = result.data?.message || "Verification failed. Please log in on this browser first.";
        setMessage(errorMsg);
        console.error("Verification failed:", result.data);
      }
    };

    if (sid && status === "idle") {
      handleVerification();
    }
  }, [sid, verifyScannerSession, status, router]);

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100 text-center">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-orange-50 rounded-full">
          <ShieldCheck className="w-8 h-8 text-orange-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Medix Secure Scan</h1>
      <p className="text-sm text-gray-500 mb-8">Authorizing your desktop session</p>

      <div className="mb-6 min-h-[160px] flex flex-col justify-center">
        {/* Loading State */}
        {(isVerifying || status === "idle") && (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
            <p className="text-gray-600 font-medium text-sm">Synchronizing systems...</p>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-gray-800">{message}</p>
            <p className="text-sm text-gray-500 mt-2">Check your desktop screen now.</p>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-md font-medium text-gray-800 px-4">{message}</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-all active:scale-95"
            >
              Retry Login
            </button>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-gray-50 mt-4">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
          Medix Clinical Architect Systems
        </p>
      </div>
    </div>
  );
}

export default function ScanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Suspense
        fallback={
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
            <p className="text-gray-500 text-sm">Initializing Secure Scanner...</p>
          </div>
        }
      >
        <ScanContent />
      </Suspense>
    </div>
  );
}
