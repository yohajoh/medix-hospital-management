"use client";
import AuthLayout from "@/app/_components/AuthLayout";
import RecoveryCard from "@/app/_components/RecoveryCard";
import { useAuth } from "@/app/_hooks/useAuth";

export default function ForgotPasswordPage() {
  const { identifier, setIdentifier, isLoading, handleForgotPasswordRequest } = useAuth();

  return (
    <AuthLayout>
      <RecoveryCard
        identifier={identifier}
        setIdentifier={setIdentifier}
        onSubmit={handleForgotPasswordRequest}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
