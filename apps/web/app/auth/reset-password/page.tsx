"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthLayout from "@/app/_components/AuthLayout";
import ResetPasswordCard from "@/app/_components/ResetPasswordCard";
import { useAuth } from "@/app/_hooks/useAuth";

export default function NewPasswordPage() {
  const searchParams = useSearchParams();
  const { handleFinalPasswordReset, isLoading, error } = useAuth();

  // State for the passwords
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });

  // Get data from the previous step (OTP Page)
  const target = searchParams.get("target") || "";
  const code = searchParams.get("code") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend Guard: Ensure passwords match before hitting the API
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match.");
      return;
    }

    const result = await handleFinalPasswordReset(target, code, passwords.new, passwords.confirm);

    if (result?.success) {
      console.log("Credentials updated successfully.");
    }
  };

  return (
    <AuthLayout>
      {/* Display error if one exists */}
      {error && (
        <div className="absolute top-10 bg-red-50 text-red-600 px-6 py-3 rounded-lg border border-red-100 font-bold text-sm animate-bounce">
          {error}
        </div>
      )}

      <ResetPasswordCard
        passwords={passwords}
        setPasswords={setPasswords}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
