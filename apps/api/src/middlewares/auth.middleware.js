import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js"; // Ensure this points to your Prisma singleton

/**
 * Middleware to protect routes - ensures user is logged in
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Extract token from Cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Fallback to Authorization Header (Standard for huge systems)
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, please login",
    });
  }

  try {
    // 3. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Database Check: Fetch only needed fields from Postgres
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        calendarConnected: true,
        createdAt: true,
        // password excluded for security
      },
    });

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "The user belonging to this token no longer exists.",
      });
    }

    // 5. Account Status Check
    if (currentUser.status === "BANNED") {
      return res.status(403).json({
        success: false,
        message: "This account has been suspended.",
      });
    }

    // 6. Final Grant: Attach user to Request object
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired",
    });
  }
};

/**
 * Middleware to restrict access based on UserRole Enums
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Convert allowed roles to Uppercase to match Postgres Enum standard
    const allowedRoles = roles.map((r) => r.toUpperCase());

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not authorized for this resource`,
      });
    }
    next();
  };
};
