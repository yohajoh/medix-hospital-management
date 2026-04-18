import express from "express";
import {
  login,
  initiateGoogleAuth,
  googleCallback,
  requestCalendarAccess,
  getMe,
  getQR,
  approveQR,
  requestLoginOTP, // New
  verifyOTPAndLogin, // New
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @desc Standard Form Login (Email/Phone + Password)
 * @access Public
 */
router.post("/login", login);

/**
 * @desc Passwordless Login Step 1: Request OTP code via Email/Phone
 * @access Public
 */
router.post("/otp/request", requestLoginOTP);

/**
 * @desc Passwordless Login Step 2: Verify OTP code and issue Session
 * @access Public
 */
router.post("/otp/verify", verifyOTPAndLogin);

// --- Standard Google OAuth Routes ---
router.get("/google", initiateGoogleAuth);
router.get("/google/callback", googleCallback);

// --- Incremental Auth / Profile ---
router.get("/google/calendar-sync", protect, requestCalendarAccess);
router.get("/me", protect, getMe);

// --- QR Code Login Handshake ---

/**
 * @desc Step 1: Desktop requests a QR session
 * @access Public
 */
router.get("/qr/generate", getQR);

/**
 * @desc Step 2: Mobile scans and approves the session
 * @access Private (Requires mobile app authentication)
 */
router.post("/qr/approve", protect, approveQR);

export default router;
