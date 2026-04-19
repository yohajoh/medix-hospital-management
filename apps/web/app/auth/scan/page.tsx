"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQRLogin } from "@/app/_hooks/useQRLogin"; // Ensure this path matches your project
import { CheckCircle2, Loader2, XCircle, ShieldCheck } from "lucide-react";

export default function ScanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyScannerSession, isVerifying } = useQRLogin();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const sid = searchParams.get("sid");
  // Flexible: You can pass ?type=patient or ?type=login in the QR URL
  const type = searchParams.get("type") || "login";

  useEffect(() => {
    const handleVerification = async () => {
      if (!sid) {
        setStatus("error");
        setMessage("Invalid session. Please try scanning again.");
        return;
      }

      // 1. Determine the endpoint based on the QR type
      const endpoint = type === "login" ? "/auth/qr/verify" : `/actions/${type}/verify`;

      // 2. Call the flexible logic from your hook
      const result = await verifyScannerSession(sid, endpoint);

      if (result.success) {
        setStatus("success");
        setMessage(type === "login" ? "Desktop login authorized successfully!" : "Action verified successfully!");

        // 3. Redirect the mobile user to their dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setStatus("error");
        setMessage(result.data?.message || "Verification failed. The session may have expired.");
      }
    };

    handleVerification();
  }, [sid, type]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-orange-50 rounded-full">
            <ShieldCheck className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Medix Secure Scan</h1>

        <div className="mt-8 mb-6">
          {(isVerifying || status === "idle") && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
              <p className="text-gray-600">Verifying security credentials...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-lg font-medium text-gray-800">{message}</p>
              <p className="text-sm text-gray-500 mt-2">Redirecting you now...</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center animate-in fade-in duration-300">
              <XCircle className="w-16 h-16 text-red-500 mb-4" />
              <p className="text-lg font-medium text-gray-800">{message}</p>
              <button
                onClick={() => router.push("/auth/login")}
                className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-8 uppercase tracking-widest">Medix Clinical Architect Systems</p>
      </div>
    </div>
  );
}
