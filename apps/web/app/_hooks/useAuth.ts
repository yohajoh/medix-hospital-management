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
  const handleOTPVerify = async (otpCode: string, target: string, mode: string | null) => {
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

      // --- DYNAMIC REDIRECTION LOGIC ---
      if (mode === "reset") {
        // Redirect to new-password page with context
        // We include the code so the next page can use it for the final update
        router.push(`/auth/reset-password?target=${encodeURIComponent(target)}&code=${otpCode}`);
      } else {
        // Standard login success
        router.push("/dashboard");
      }

      return true; // Verification successful
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return false;
    }
  };

  // Add this inside your useAuth hook
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

      // Pass 'mode=reset' so the OTP page knows to redirect to 'new-password' after success
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

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed.");
      }

      // Success: Redirect to login with a success toast/query param
      router.push("/auth/login?reset=success");
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Add handleFinalPasswordReset to your return statement

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
    handleForgotPasswordRequest,
    handleFinalPasswordReset,
  };
};
