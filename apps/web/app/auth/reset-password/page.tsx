"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthLayout from "@/app/_components/AuthLayout";
import ResetPasswordCard from "@/app/_components/ResetPasswordCard";
import { useAuth } from "@/app/_hooks/useAuth";

function NewPasswordContent() {
  const searchParams = useSearchParams();
  const { handleFinalPasswordReset, isLoading, error } = useAuth();

  const [passwords, setPasswords] = useState({ new: "", confirm: "" });

  const target = searchParams.get("target") || "";
  const code = searchParams.get("code") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match.");
      return;
    }

    const result = await handleFinalPasswordReset(
      target,
      code,
      passwords.new,
      passwords.confirm,
    );

    if (result?.success) {
      console.log("Credentials updated successfully.");
    }
  };

  return (
    <AuthLayout>
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

export default function NewPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center font-bold text-[#1A4F95]">
          Loading Secure Layer...
        </div>
      }
    >
      <NewPasswordContent />
    </Suspense>
  );
}
