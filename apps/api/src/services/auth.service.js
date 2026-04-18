import { prisma } from "../lib/prisma.js";
import { getIO } from "../lib/socket.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { QRType } from "@prisma/client";
import { generateAuthToken, comparePassword } from "../utils/auth.util.js"; // Adjust path if needed

/**
 * Standard Credential Verification
 */
export const verifyCredentials = async (identifier, password) => {
  // 1. Find user by multiple possible identifiers
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { name: identifier },
        { phone: identifier }, // Uncomment if you add phone to schema
      ],
    },
  });

  // 2. Validate user existence and password presence (prevent OAuth-only users from bypass)
  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  // 3. Compare passwords
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 4. Generate the JWT
  const token = generateAuthToken(user.id, user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };
};

/**
 * Step 1: Desktop generates a session
 */
export const initQRLogin = async (metadata) => {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

  const data = {
    sessionId,
    expiresAt,
    type: QRType.LOGIN,
    ipAddress: metadata?.ip ?? null,
    deviceInfo: metadata?.ua ?? null,
  };

  for (let i = 0; i < 10; i++) {
    try {
      return await prisma.qRCode.create({ data });
    } catch (e) {
      if (e.code === "ETIMEDOUT") {
        console.log("Retry DB...");
        continue;
      }
      throw e;
    }
  }

  throw new Error("Database timeout after retries");
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

export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  // Return a clean object without the sensitive password field
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    calendarConnected: user.calendarConnected,
    status: user.status,
    createdAt: user.createdAt,
  };
};
