import express from "express";
import { initiateGoogleAuth, googleCallback, requestCalendarAccess, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/google", initiateGoogleAuth);
router.get("/google/callback", googleCallback);

// Incremental path for existing users
router.get("/google/calendar-sync", protect, requestCalendarAccess);
router.get("/me", protect, getMe);

export default router;
