import { google } from "googleapis";
import { oauth2Client, SCOPES } from "../config/google.config.js";
import { prisma } from "../lib/prisma.js";
import { generateAuthToken } from "../utils/auth.util.js";
import * as authService from "../services/auth.service.js";

// DESKTOP: Generate QR
export const getQR = async (req, res, next) => {
  try {
    const session = await authService.initQRLogin({
      ip: req.ip,
      ua: req.headers["user-agent"],
    });
    res.json({ sessionId: session.sessionId });
  } catch (err) {
    next(err);
  }
};

// MOBILE: Approve Scan
export const approveQR = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    await authService.finalizeQRLogin(sessionId, req.user.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * Step 1: Standard Login (Authentication Only)
 * Used on the Login page. Only asks for email/profile.
 */
const initiateGoogleAuth = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    // Use 'select_account' for login to allow users to switch accounts
    prompt: "select_account",
    scope: SCOPES.BASIC,
  });
  return res.status(200).json({ success: true, url });
};

/**
 * Step 1b: Incremental Authorization (Calendar Only)
 * Triggered from Dashboard when clicking "Connect Google Calendar"
 */
const requestCalendarAccess = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    // 'consent' is mandatory here to ensure we get a refresh_token for the calendar
    prompt: "consent",
    scope: SCOPES.CALENDAR,
    // THIS IS THE KEY: it combines previous scopes with the new ones
    include_granted_scopes: true,
    state: req.user.id,
  });
  return res.status(200).json({ success: true, url });
};

/**
 * Step 2: Unified Callback Handler
 * Handles both the initial Login and the later Calendar Sync
 */
const googleCallback = async (req, res) => {
  const { code, state } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    // SCENARIO A: Incremental Auth (User was already logged in)
    if (state) {
      const isCalendarGranted = tokens.scope.includes("https://www.googleapis.com/auth/calendar");

      if (!isCalendarGranted) {
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=calendar_not_granted`);
      }

      // Update the existing user in Postgres
      await prisma.user.update({
        where: { id: state },
        data: {
          googleRefreshToken: tokens.refresh_token, // Crucial for offline appointment creation
          calendarConnected: true,
        },
      });

      return res.redirect(`${process.env.FRONTEND_URL}/dashboard?success=calendar_synced`);
    }

    // SCENARIO B: Standard Login/Signup Flow
    let user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          googleId: data.id,
          // We don't assume calendar access here during initial login
        },
      });
    }

    const token = generateAuthToken(user.id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

/**
 * @desc Get Profile
 */
const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        calendarConnected: user.calendarConnected,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { initiateGoogleAuth, googleCallback, requestCalendarAccess, getMe };
