import { prisma } from "../lib/prisma.js";
import { getIO } from "../lib/socket.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { QRType } from "@prisma/client";
import { generateAuthToken, comparePassword, hashPassword } from "../utils/auth.util.js"; // Adjust path if needed

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
  // const isMatch = password === user.password; // Replace with actual hash comparison in production
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

  for (let i = 0; i < 5; i++) {
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
  getIO().to(sessionId).emit("qr:success", { token });

  return { success: true };
};

/**
 * Handles the logic of updating a user's password in the database.
 * This is called only after the OTP has been successfully verified.
 */
export const updatePasswordAfterReset = async (email, newPassword, confirmPassword) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Backend Security: Ensure passwords match even if the frontend was bypassed
  if (newPassword !== confirmPassword) {
    const error = new Error("Passwords do not match.");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 8) {
    const error = new Error("Password must be at least 8 characters long.");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(newPassword);

  return await prisma.user.update({
    where: { email: normalizedEmail },
    data: { password: hashedPassword },
  });
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
