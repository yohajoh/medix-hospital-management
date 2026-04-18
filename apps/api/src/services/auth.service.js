import {prisma} from "../lib/prisma.js";
import { getIO } from "../lib/socket.js";
import jwt from "jsonwebtoken";

/**
 * Step 1: Desktop generates a session
 */
export const initQRLogin = async (metadata) => {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 mins

  return await prisma.qRCode.create({
    data: {
      sessionId,
      type: "LOGIN",
      expiresAt,
      ipAddress: metadata.ip,
      deviceInfo: metadata.ua,
    },
  });
};

/**
 * Step 2: Mobile scan approves the session
 */
export const finalizeQRLogin = async (sessionId, userId) => {
  // Find valid, unused, and non-expired session
  const session = await prisma.qRCode.findFirst({
    where: {
      sessionId,
      isUsed: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!session) {
    throw new Error("Invalid, used, or expired session");
  }

  // Atomically update DB
  await prisma.qRCode.update({
    where: { sessionId },
    data: { userId, isApproved: true, isUsed: true },
  });

  // Generate JWT for Desktop
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // PUSH TO DESKTOP ROOM
  // Note: Event name matches what frontend expects
  getIO().to(sessionId).emit("qr:authorized", { token });

  return { success: true };
};
