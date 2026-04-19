import { prisma } from "../lib/prisma.js";
import { MailService } from "./mail.service.js";

export const OTPService = {
  requestLoginOTP: async (identifier, purpose = "LOGIN") => {
    const normalizedTarget = identifier.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: normalizedTarget }, { phone: normalizedTarget }] },
    });

    if (!user)
      return { success: false, status: 404, message: "Account not found." };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

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

  verifyLoginOTP: async (identifier, otp, purpose) => {
    const normalizedTarget = identifier.toLowerCase().trim();

    try {
      const record = await prisma.verificationToken.findUnique({
        where: {
          target_purpose: {
            target: normalizedTarget,
            purpose,
          },
        },
      });

      if (!record) {
        return {
          success: false,
          status: 401,
          message: "No active code found for this user.",
        };
      }

      if (record.token !== otp) {
        return { success: false, status: 401, message: "Invalid code." };
      }

      if (record.expiresAt < new Date()) {
        return { success: false, status: 401, message: "Code has expired." };
      }

      if (purpose === "LOGIN") {
        await prisma.verificationToken.delete({ where: { id: record.id } });
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: normalizedTarget }, { phone: normalizedTarget }],
        },
      });

      return { success: true, user };
    } catch (error) {
      console.error("Prisma Error:", error);
      return {
        success: false,
        status: 500,
        message: "Database verification failed.",
      };
    }
  },
};
