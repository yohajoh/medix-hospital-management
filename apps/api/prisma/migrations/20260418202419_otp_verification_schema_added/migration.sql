-- CreateEnum
CREATE TYPE "OTPPurpose" AS ENUM ('LOGIN', 'PASSWORD_RESET', 'PHONE_VERIFICATION', 'APPOINTMENT_CONFIRMATION', 'TRANSACTION_AUTHORIZATION');

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "purpose" "OTPPurpose" NOT NULL DEFAULT 'LOGIN',
    "metadata" JSONB,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VerificationToken_target_idx" ON "VerificationToken"("target");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_target_purpose_key" ON "VerificationToken"("target", "purpose");
