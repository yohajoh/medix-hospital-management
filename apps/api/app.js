import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";

// 1. Initialize Configuration
dotenv.config();

const app = express();

// 2. Define CORS Options
const corsOptions = {
  // Ensure this matches your Next.js URL exactly (no trailing slash)
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Required to accept HTTP-Only cookies from Next.js
  optionsSuccessStatus: 200,
};

// --- MIDDLEWARE ORDER ---

// 3. CORS must be at the very top to handle pre-flight (OPTIONS) requests
app.use(cors(corsOptions));

// 4. Cookie Parser must come before routes so req.cookies is available
app.use(cookieParser());

// 5. Body Parsers (limit size to prevent DOS attacks in a hospital system)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 6. Routes
app.use("/api/auth", authRoutes);

// 7. Global Error Handler (Real-world necessity)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
