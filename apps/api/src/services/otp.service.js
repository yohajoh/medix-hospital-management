import { prisma } from "../lib/prisma.js";
import { MailService } from "./mail.service.js";

export const OTPService = {
  /**
   * Core Logic: Check if user exists and send OTP
   */
  requestLoginOTP: async (identifier, purpose) => {
    // 1. Database access is now here in the service
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user) return { success: false, status: 404, message: "No clinical account found." };

    // 2. Generate and store
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verificationToken.upsert({
      where: { target_purpose: { target: identifier, purpose } },
      update: { token: otp, expiresAt },
      create: { target: identifier, token: otp, expiresAt, purpose },
    });

    // 3. Send Email
    await MailService.sendOTP(identifier, otp, purpose);

    return { success: true };
  },

  /**
   * Core Logic: Validate OTP and fetch user
   */
  verifyLoginOTP: async (identifier, otp, purpose) => {
    const record = await prisma.verificationToken.findUnique({
      where: { target_purpose: { target: identifier, purpose } },
    });

    if (!record || record.token !== otp || record.expiresAt < new Date()) {
      return { success: false, status: 401, message: "Invalid or expired code." };
    }

    // Clean up used token
    await prisma.verificationToken.delete({ where: { id: record.id } });

    // Fetch user for the controller
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: identifier }, { phone: identifier }] },
    });

    return { success: true, user };
  },
};
