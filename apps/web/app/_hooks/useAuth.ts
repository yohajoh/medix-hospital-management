"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the types of loading states
export type LoadingType = "normal" | "google" | "otp" | null;

export const useAuth = () => {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<LoadingType>(null); // New state
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleNormalLogin = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!identifier || !password) {
      setError("Please enter both credentials.");
      return;
    }

    setIsLoading(true);
    setLoadingType("normal");
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unauthorized access.");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Connection to clinical server failed.");
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoadingType("google");
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/google`);
      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Could not retrieve authentication URL.");
      }
    } catch (err) {
      setError("Google SSO is currently unavailable.");
      setIsLoading(false);
      setLoadingType(null);
    }
  };
  /**
   * Step 1: Request the OTP code
   * Called from the main Login page
   */
  // const handleOTPRequest = async (e?: React.FormEvent, manualIdentifier?: string) => {
  //   if (e) e.preventDefault();

  //   // Use the manual identifier (from URL) or the state identifier (from login form)
  //   const target = manualIdentifier || identifier;

  //   if (!target) {
  //     setError("Please enter your email or phone number first.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setLoadingType("otp");
  //   setError(null);

  //   try {
  //     const response = await fetch(`${API_URL}/auth/otp/request`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ identifier: target }), // Use the 'target' variable
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to send verification code.");
  //     }

  //     // Success: Code sent! Now navigate to the verification input page
  //     // We pass the identifier in the URL query so the verify page knows who to verify
  //     router.push(`/auth/verify-otp?target=${encodeURIComponent(identifier)}`);
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //     setLoadingType(null);
  //   }
  // };

  const handleOTPRequest = async (e?: React.FormEvent, manualIdentifier?: string) => {
    if (e) e.preventDefault();

    const target = manualIdentifier || identifier;

    if (!target) {
      setError("Please enter your email or phone number first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: target }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to send code.");

      // IMPORTANT: Re-attach the target to the URL so it doesn't disappear
      router.push(`/auth/verify-otp?target=${encodeURIComponent(target)}`);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Step 2: Verify the code and Login
   * Called from the Verify OTP Page
   */
  const handleOTPVerify = async (otpCode: string, target: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: target, otp: otpCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired code.");
      }

      // Success: Session cookie is set by server, go to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return false; // Return false so the UI component can reset
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    isLoading,
    loadingType, // Exported to differentiate buttons
    error,
    handleNormalLogin,
    handleGoogleLogin,
    handleOTPRequest,
    handleOTPVerify,
  };
};
