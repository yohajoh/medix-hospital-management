import express from "express";
import {
  login,
  initiateGoogleAuth,
  googleCallback,
  requestCalendarAccess,
  getMe,
  getQR,
  approveQR,
  requestLoginOTP,
  verifyOTPAndLogin,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/otp/request", requestLoginOTP);
router.post("/otp/verify", verifyOTPAndLogin);
router.get("/google", initiateGoogleAuth);
router.get("/google/callback", googleCallback);
router.get("/google/calendar-sync", protect, requestCalendarAccess);
router.get("/me", protect, getMe);
router.get("/qr/generate", getQR);
router.post("/qr/approve", protect, approveQR);
router.post("/qr/verify", protect, approveQR);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
