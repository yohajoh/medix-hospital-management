import express from "express";
import {
  initiateGoogleAuth,
  googleCallback,
  requestCalendarAccess,
  getMe,
  getQR, // New QR controller
  approveQR, // New QR controller
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// --- Standard Google OAuth Routes ---
router.get("/google", initiateGoogleAuth);
router.get("/google/callback", googleCallback);

// --- Incremental Auth / Profile ---
router.get("/google/calendar-sync", protect, requestCalendarAccess);
router.get("/me", protect, getMe);

// --- QR Code Login Handshake ---

/**
 * @desc Step 1: Desktop requests a QR session
 * @access Public (Desktop is not logged in yet)
 */
router.get("/qr/generate", getQR);

/**
 * @desc Step 2: Mobile scans and approves the session
 * @access Private (Mobile must be logged in to authorize)
 */
router.post("/qr/approve", protect, approveQR);

export default router;
