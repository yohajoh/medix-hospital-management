"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  // --- State Management ---
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  /**
   * 1. Normal Credentials Login
   * Relies on the backend to set the 'Set-Cookie' header on success.
   */
  const handleNormalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please enter both credentials.");
      return;
    }

    setIsLoading(true);
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

      // If backend handles cookies, we just verify success and redirect
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Connection to clinical server failed.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 2. Google OAuth Logic
   * Fetches the dynamic OAuth URL from the backend and redirects the window.
   */
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch the generated Google Auth URL from your backend
      const response = await fetch(`${API_URL}/auth/google`);
      const { url } = await response.json();

      if (url) {
        // Redirect the entire window to the Google Consent screen
        window.location.href = url;
      } else {
        throw new Error("Could not retrieve authentication URL.");
      }
    } catch (err) {
      setError("Google SSO is currently unavailable.");
      setIsLoading(false);
    }
  };

  /**
   * 3. OTP Login Redirect
   */
  const handleOTPLogin = () => {
    router.push("/auth/otp-login");
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    isLoading,
    error,
    handleNormalLogin,
    handleGoogleLogin,
    handleOTPLogin,
  };
};
