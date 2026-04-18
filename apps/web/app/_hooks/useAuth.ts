"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type LoadingType = "normal" | "google" | "otp" | null;

export const useAuth = () => {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<LoadingType>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  /**
   * Helper to map URL 'mode' to Backend 'purpose'
   */
  const getPurpose = (mode: string | null) => (mode === "reset" ? "PASSWORD_RESET" : "LOGIN");

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
      if (!response.ok) throw new Error(data.message || "Unauthorized access.");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Connection to clinical server failed.");
    } finally {
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
      if (url) window.location.href = url;
      else throw new Error("Could not retrieve authentication URL.");
    } catch (err) {
      setError("Google SSO is currently unavailable.");
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  /**
   * Request OTP (Handles Login Resend and Forgot Password Resend)
   */
  const handleOTPRequest = async (e?: React.FormEvent, manualIdentifier?: string, mode: string | null = null) => {
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
        body: JSON.stringify({
          identifier: target,
          purpose: getPurpose(mode), // Map mode to purpose for the backend
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send code.");

      // Re-attach target and mode to preserve state
      const modeQuery = mode ? `&mode=${mode}` : "";
      router.push(`/auth/verify-otp?target=${encodeURIComponent(target)}${modeQuery}`);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify OTP (Handles both Login and Reset redirections)
   */
  const handleOTPVerify = async (otpCode: string, target: string, mode: string | null) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: target,
          otp: otpCode,
          purpose: getPurpose(mode), // Map mode to purpose so DB finds the record
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid or expired code.");

      if (mode === "reset") {
        router.push(`/auth/reset-password?target=${encodeURIComponent(target)}&code=${otpCode}`);
      } else {
        router.push("/dashboard");
      }

      return true;
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return false;
    }
  };

  /**
   * Initial Forgot Password Request
   */
  const handleForgotPasswordRequest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!identifier) {
      setError("Please enter your credentials.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Request failed");

      // Set mode=reset here
      router.push(`/auth/verify-otp?target=${encodeURIComponent(identifier)}&mode=reset`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalPasswordReset = async (email: string, otp: string, newPassword: string, confirmPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Password reset failed.");

      router.push("/auth/login?reset=success");
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    isLoading,
    loadingType,
    error,
    handleNormalLogin,
    handleGoogleLogin,
    handleOTPRequest,
    handleOTPVerify,
    handleForgotPasswordRequest,
    handleFinalPasswordReset,
  };
};
