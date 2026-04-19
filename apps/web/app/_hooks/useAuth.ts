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

  const getApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;

    if (typeof window !== "undefined") {
      const host = window.location.hostname;

      if (host.includes("onrender.com") || host === "your-domain.com") {
        return "https://medix-api-re2o.onrender.com/api";
      }
    }

    return "http://localhost:5000/api";
  };

  const API_URL = getApiUrl();

  const getPurpose = (mode: string | null) =>
    mode === "reset" ? "PASSWORD_RESET" : "LOGIN";

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

  const handleOTPRequest = async (
    e?: React.FormEvent,
    manualIdentifier?: string,
    mode: string | null = null,
  ) => {
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
          purpose: getPurpose(mode),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send code.");

      const modeQuery = mode ? `&mode=${mode}` : "";
      router.push(
        `/auth/verify-otp?target=${encodeURIComponent(target)}${modeQuery}`,
      );

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (
    otpCode: string,
    target: string,
    mode: string | null,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: target,
          otp: otpCode,
          purpose: getPurpose(mode),
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Invalid or expired code.");

      if (mode === "reset") {
        router.push(
          `/auth/reset-password?target=${encodeURIComponent(target)}&code=${otpCode}`,
        );
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

      router.push(
        `/auth/verify-otp?target=${encodeURIComponent(identifier)}&mode=reset`,
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalPasswordReset = async (
    email: string,
    otp: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
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
      if (!response.ok)
        throw new Error(data.message || "Password reset failed.");

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
