import { google } from "googleapis";
import { oauth2Client, SCOPES } from "../config/google.config.js";
import { prisma } from "../lib/prisma.js";
import { generateAuthToken } from "../utils/auth.util.js";
import * as authService from "../services/auth.service.js";
import { OTPService } from "../services/otp.service.js"; // Import the new service
import { OTPPurpose } from "@prisma/client"; // Import the Enum from Prisma

/**
 * @desc Request OTP (Step 1)
 */
const requestLoginOTP = async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) return res.status(400).json({ success: false, message: "Identifier required" });

    const result = await OTPService.requestLoginOTP(identifier, OTPPurpose.LOGIN);

    if (!result.success) {
      return res.status(result.status).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, message: "Verification code sent." });
  } catch (error) {
    console.error("Request OTP Controller Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc Verify OTP & Login (Step 2)
 */
// const verifyOTPAndLogin = async (req, res) => {
//   try {
//     const { identifier, otp } = req.body;
//     if (!identifier || !otp) return res.status(400).json({ success: false, message: "Credentials missing" });

//     const result = await OTPService.verifyLoginOTP(identifier, otp, OTPPurpose.LOGIN);

//     if (!result.success) {
//       return res.status(result.status).json({ success: false, message: result.message });
//     }

//     // Standardize user data through authService helper
//     const userProfile = await authService.getUserProfile(result.user.id);
//     const token = generateAuthToken(result.user.id, result.user.role);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.status(200).json({
//       success: true,
//       user: userProfile,
//     });
//   } catch (error) {
//     console.error("Verify OTP Controller Error:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

const verifyOTPAndLogin = async (req, res) => {
  try {
    // 1. Extract purpose from req.body (defaulting to LOGIN if not provided)
    const { identifier, otp, purpose } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ success: false, message: "Credentials missing" });
    }

    // 2. Pass the purpose dynamically to the service
    // We use purpose || OTPPurpose.LOGIN to handle standard logins safely
    const result = await OTPService.verifyLoginOTP(identifier, otp, purpose || OTPPurpose.LOGIN);

    if (!result.success) {
      return res.status(result.status).json({ success: false, message: result.message });
    }

    // 3. Logic for standard Login (if purpose is LOGIN or not provided)
    // If the purpose is PASSWORD_RESET, we don't necessarily want to set a login cookie yet
    if (!purpose || purpose === OTPPurpose.LOGIN) {
      const userProfile = await authService.getUserProfile(result.user.id);
      const token = generateAuthToken(result.user.id, result.user.role);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Required for HTTPS on Render
        sameSite: "none", // CRITICAL: Allows the cookie to be sent during the scan
        path: "/", // Ensure it's available site-wide
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        success: true,
        user: userProfile,
      });
    }

    // 4. Logic for Password Reset (Success but no login)
    // We just return success so the frontend knows the OTP was valid
    return res.status(200).json({
      success: true,
      message: "Identity verified successfully.",
    });
  } catch (error) {
    console.error("Verify OTP Controller Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DESKTOP: Generate QR
export const getQR = async (req, res) => {
  try {
    const qr = await authService.initQRLogin(req.metadata);

    if (!qr) {
      return res.status(500).json({ error: "QR generation failed" });
    }

    res.json({ sessionId: qr.sessionId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

// MOBILE: Approve Scan
export const approveQR = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    // req.user is already there because of your 'Authenticated: true' logs
    const result = await authService.finalizeQRLogin(sessionId, req.user.id);

    // Return the user data so the mobile frontend 'result.success' works
    res.json({
      success: true,
      user: req.user,
      message: "Authorized",
    });
  } catch (err) {
    // If finalizeQRLogin throws "Invalid session", it lands here
    res.status(400).json({ success: false, message: err.message });
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
          password: "john@0234",
          // We don't assume calendar access here during initial login
        },
      });
    }

    const token = generateAuthToken(user.id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS on Render
      sameSite: "none", // CRITICAL: Allows the cookie to be sent during the scan
      path: "/", // Ensure it's available site-wide
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

/**
 * @desc Standard Form Login (Email/Username/phone + Password)
 */
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both identifier and password.",
      });
    }

    // Call the service to handle the logic
    const { token, user } = await authService.verifyCredentials(identifier, password);

    // Set the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS on Render
      sameSite: "none", // CRITICAL: Allows the cookie to be sent during the scan
      path: "/", // Ensure it's available site-wide
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    // Handle the specific error thrown by the service
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        success: false,
        message: "Invalid clinical credentials.",
      });
    }

    console.error("Login Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc Phase 1: Request a password reset code
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required." });

    // Use the flexible service with the PASSWORD_RESET purpose
    const result = await OTPService.requestLoginOTP(email, "PASSWORD_RESET");

    if (!result.success) {
      return res.status(result.status).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, message: "A recovery code has been sent." });
  } catch (error) {
    console.error("Forgot Password Controller Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * @desc Phase 2: Verify code and update the password
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // 1. Verify the OTP (Logic inside OTP Service)
    const verification = await OTPService.verifyLoginOTP(email, otp, "PASSWORD_RESET");

    if (!verification.success) {
      return res.status(verification.status).json({
        success: false,
        message: verification.message,
      });
    }

    // 2. Perform the Update (Logic inside Auth Service)
    await authService.updatePasswordAfterReset(email, newPassword, confirmPassword);

    await prisma.verificationToken.deleteMany({
      where: {
        target: email.toLowerCase().trim(),
        purpose: "PASSWORD_RESET",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password successfully updated. Please login.",
    });
  } catch (error) {
    console.error("Reset Password Controller Error:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update password.",
    });
  }
};

/**
 * @desc Get Profile
 */
const getMe = async (req, res) => {
  try {
    // req.user.id comes from your 'protect' middleware
    const userProfile = await authService.getUserProfile(req.user.id);

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: userProfile,
    });
  } catch (error) {
    console.error("GetMe Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export {
  initiateGoogleAuth,
  googleCallback,
  requestCalendarAccess,
  login,
  requestLoginOTP,
  verifyOTPAndLogin,
  forgotPassword,
  resetPassword,
  getMe,
};
