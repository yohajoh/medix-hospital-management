import { google } from "googleapis";
import { oauth2Client, SCOPES } from "../config/google.config.js";
import { prisma } from "../lib/prisma.js";
import { generateAuthToken } from "../utils/auth.util.js";
import * as authService from "../services/auth.service.js";
import { OTPService } from "../services/otp.service.js";
import { OTPPurpose } from "@prisma/client";

const requestLoginOTP = async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier)
      return res
        .status(400)
        .json({ success: false, message: "Identifier required" });

    const result = await OTPService.requestLoginOTP(
      identifier,
      OTPPurpose.LOGIN,
    );

    if (!result.success) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    return res
      .status(200)
      .json({ success: true, message: "Verification code sent." });
  } catch (error) {
    console.error("Request OTP Controller Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const verifyOTPAndLogin = async (req, res) => {
  try {
    const { identifier, otp, purpose } = req.body;

    if (!identifier || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Credentials missing" });
    }

    const result = await OTPService.verifyLoginOTP(
      identifier,
      otp,
      purpose || OTPPurpose.LOGIN,
    );

    if (!result.success) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    if (!purpose || purpose === OTPPurpose.LOGIN) {
      const userProfile = await authService.getUserProfile(result.user.id);
      const token = generateAuthToken(result.user.id, result.user.role);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        user: userProfile,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Identity verified successfully.",
    });
  } catch (error) {
    console.error("Verify OTP Controller Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

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

export const approveQR = async (req, res, next) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is missing" });
    }

    await authService.finalizeQRLogin(sessionId, req.user.id);

    return res.status(200).json({
      success: true,
      user: req.user,
      message: "Authorized",
    });
  } catch (err) {
    console.error("QR Approval Error:", err.message);

    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

const initiateGoogleAuth = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "select_account",
    scope: SCOPES.BASIC,
  });
  return res.status(200).json({ success: true, url });
};

const requestCalendarAccess = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES.CALENDAR,
    include_granted_scopes: true,
    state: req.user.id,
  });
  return res.status(200).json({ success: true, url });
};

const googleCallback = async (req, res) => {
  const { code, state } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    if (state) {
      const isCalendarGranted = tokens.scope.includes(
        "https://www.googleapis.com/auth/calendar",
      );

      if (!isCalendarGranted) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/dashboard?error=calendar_not_granted`,
        );
      }

      await prisma.user.update({
        where: { id: state },
        data: {
          googleRefreshToken: tokens.refresh_token,
          calendarConnected: true,
        },
      });

      return res.redirect(
        `${process.env.FRONTEND_URL}/dashboard?success=calendar_synced`,
      );
    }

    let user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          googleId: data.id,
          password: "john@0234",
        },
      });
    }

    const token = generateAuthToken(user.id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both identifier and password.",
      });
    }

    const { token, user } = await authService.verifyCredentials(
      identifier,
      password,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const result = await OTPService.requestLoginOTP(email, "PASSWORD_RESET");

    if (!result.success) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    return res
      .status(200)
      .json({ success: true, message: "A recovery code has been sent." });
  } catch (error) {
    console.error("Forgot Password Controller Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const verification = await OTPService.verifyLoginOTP(
      email,
      otp,
      "PASSWORD_RESET",
    );

    if (!verification.success) {
      return res.status(verification.status).json({
        success: false,
        message: verification.message,
      });
    }

    await authService.updatePasswordAfterReset(
      email,
      newPassword,
      confirmPassword,
    );

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

const getMe = async (req, res) => {
  try {
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
