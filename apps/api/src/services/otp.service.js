import { prisma } from "../lib/prisma.js";
import { MailService } from "./mail.service.js";

export const OTPService = {
  /**
   * Core Logic: Check if user exists and send OTP
   */
  requestLoginOTP: async (identifier, purpose) => {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: identifier }, { phone: identifier }] },
    });

    if (!user) return { success: false, status: 404, message: "Account not found." };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.verificationToken.upsert({
      where: {
        target_purpose: {
          target: identifier,
          purpose: purpose,
        },
      },
      update: {
        token: otp,
        expiresAt,
        createdAt: new Date(), // Force update the timestamp to now
      },
      create: {
        target: identifier,
        token: otp,
        expiresAt,
        purpose,
      },
    });

    await MailService.sendOTP(identifier, otp, purpose);
    return { success: true };
  },

  /**
   * Core Logic: Validate OTP and fetch user
   */
  verifyLoginOTP: async (identifier, otp, purpose) => {
    // Always normalize the identifier (lowercase) to prevent casing issues
    const normalizedTarget = identifier.toLowerCase().trim();

    const record = await prisma.verificationToken.findUnique({
      where: {
        target_purpose: {
          target: normalizedTarget,
          purpose: purpose,
        },
      },
    });

    // Log for debugging (Remove in production)
    console.log(`Verifying: ${otp} against DB token: ${record?.token}`);

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
