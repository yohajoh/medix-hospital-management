backend/
├── prisma/
│ ├── migrations/ # DB version control
│ ├── seeds/ # Initial test data
│
├── src/
│ ├── config/ # Env, DB, Redis, Google OAuth config
│ ├── constants/ # Roles, status codes, errors
│ ├── controllers/ # HTTP request handlers
│ ├── services/ # Business logic + Prisma calls
│ ├── routes/ # API endpoints
│ ├── middlewares/ # Auth, rate limit, error handling
│ ├── validators/ # Input validation rules
│ ├── sockets/ # Real-time chat & notifications
│ ├── video/ # Video call integration
│ ├── queues/ # Background tasks (emails, SMS)
│ ├── jobs/ # Scheduled cron jobs
│ ├── events/ # Event definitions
│ ├── integrations/ # Payment, SMS, Google Calendar, storage APIs
│ ├── templates/ # Email, SMS, PDF templates
│ ├── utils/ # JWT, hashing, logger, calendar helpers
│ ├── types/ # TypeScript interfaces
│ ├── webhooks/ # Google Calendar push notification handler
│
├── tests/
│ ├── unit/ # Service tests
│ ├── integration/ # API endpoint tests
│
├── scripts/ # Automation scripts
├── logs/ # App logs
├── uploads/ # Temp file storage

// import { google } from "googleapis";
// import { oauth2Client, SCOPES } from "../config/google.config.js";
// import { prisma } from "../lib/prisma.js"; // Ensure this matches your folder structure
// import { generateAuthToken } from "../utils/auth.util.js"; // Standardized utility

// // Step 1: Initiate Login
// const initiateGoogleAuth = (req, res) => {
// const url = oauth2Client.generateAuthUrl({
// access_type: "offline",
// prompt: "consent",
// scope: SCOPES.BASIC,
// include_granted_scopes: true,
// });
// return res.status(200).json({ success: true, url });
// };

// // Step 1b: Request Calendar Access (Incremental)
// const requestCalendarAccess = (req, res) => {
// const url = oauth2Client.generateAuthUrl({
// access_type: "offline",
// prompt: "consent",
// scope: SCOPES.CALENDAR,
// include_granted_scopes: true,
// state: req.user.id, // Set by your 'protect' middleware
// });
// return res.status(200).json({ success: true, url });
// };

// // Step 2: Unified Callback Handler
// const googleCallback = async (req, res) => {
// const { code, state } = req.query;

// try {
// const { tokens } = await oauth2Client.getToken(code);
// oauth2Client.setCredentials(tokens);

// const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
// const { data } = await oauth2.userinfo.get();

// let user;

// // SCENARIO A: Incremental Calendar Auth
// if (state) {
// user = await prisma.user.findUnique({ where: { id: state } });
// }

// // SCENARIO B: Login/Signup
// if (!user) {
// user = await prisma.user.findUnique({ where: { email: data.email } });
// }

// if (!user) {
// // Create new user in PostgreSQL
// user = await prisma.user.create({
// data: {
// name: data.name,
// email: data.email,
// googleId: data.id,
// googleRefreshToken: tokens.refresh_token,
// calendarConnected: tokens.scope.includes("https://www.googleapis.com/auth/calendar"),
// },
// });
// } else {
// // Update existing record
// const updateData = {};
// if (tokens.refresh_token) updateData.googleRefreshToken = tokens.refresh_token;
// if (tokens.scope.includes("https://www.googleapis.com/auth/calendar")) {
// updateData.calendarConnected = true;
// }

// if (Object.keys(updateData).length > 0) {
// user = await prisma.user.update({
// where: { id: user.id },
// data: updateData,
// });
// }
// }

// // Use the utility function since Prisma doesn't have instance methods
// const token = generateAuthToken(user.id, user.role);

// res.cookie("token", token, {
// httpOnly: true,
// secure: process.env.NODE*ENV === "production",
// sameSite: "Lax",
// maxAge: 7 * 24 _ 60 _ 60 \_ 1000,
// });

// res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
// } catch (error) {
// console.error("Google Auth Error:", error);
// res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
// }
// };

// /\*_
// _ @desc Get Profile
// \*/
// const getMe = async (req, res) => {
// try {
// const user = await prisma.user.findUnique({
// where: { id: req.user.id },
// });

// if (!user) {
// return res.status(404).json({ success: false, message: "User not found" });
// }

// res.status(200).json({
// success: true,
// user: {
// id: user.id,
// name: user.name,
// email: user.email,
// role: user.role,
// calendarConnected: user.calendarConnected,
// status: user.status,
// createdAt: user.createdAt,
// },
// });
// } catch (error) {
// res.status(500).json({ success: false, message: "Server Error" });
// }
// };

// export { initiateGoogleAuth, googleCallback, requestCalendarAccess, getMe };
