import { prisma } from "../lib/prisma.js";
import { MailService } from "./mail.service.js";

export const OTPService = {
  /**
   * Core Logic: Check if user exists and send OTP
   */
  requestLoginOTP: async (identifier, purpose = "LOGIN") => {
    // 1. Normalize identifier immediately
    const normalizedTarget = identifier.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: normalizedTarget }, { phone: normalizedTarget }] },
    });

    if (!user) return { success: false, status: 404, message: "Account not found." };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 2. Use normalized target for the composite key
    await prisma.verificationToken.upsert({
      where: {
        target_purpose: {
          target: normalizedTarget,
          purpose: purpose,
        },
      },
      update: {
        token: otp,
        expiresAt,
        createdAt: new Date(),
      },
      create: {
        target: normalizedTarget,
        token: otp,
        expiresAt,
        purpose,
      },
    });

    await MailService.sendOTP(normalizedTarget, otp, purpose);
    return { success: true };
  },

  /**
   * Core Logic: Validate OTP and fetch user
   */
  verifyLoginOTP: async (identifier, otp, purpose = "LOGIN") => {
    // 1. Normalize identifier immediately
    const normalizedTarget = identifier.toLowerCase().trim();

    // 2. Search using the same normalized identifier used during creation
    const record = await prisma.verificationToken.findUnique({
      where: {
        target_purpose: {
          target: normalizedTarget,
          purpose: purpose,
        },
      },
    });

    if (!record) {
      return { success: false, status: 401, message: "No active code found for this user." };
    }

    if (record.token !== otp) {
      return { success: false, status: 401, message: "Invalid code. Please check your latest email." };
    }

    if (record.expiresAt < new Date()) {
      return { success: false, status: 401, message: "Code has expired." };
    }

    // Success: Clean up and find user
    await prisma.verificationToken.delete({ where: { id: record.id } });

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: normalizedTarget }, { phone: normalizedTarget }] },
    });

    return { success: true, user };
  },
};
