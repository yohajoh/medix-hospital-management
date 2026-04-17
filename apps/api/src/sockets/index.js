// src/sockets/index.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie"; // You'll need: npm install cookie
import { setIO } from "../lib/socket.js";
import { registerNotificationHandlers } from "./handlers/notification.handler.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    // Expert settings for production/Docker
    pingTimeout: 60000,
    pingInterval: 25000,
    connectTimeout: 45000,
    maxHttpBufferSize: 1e6, // 1MB
  });

  setIO(io);

  // --- JWT & COOKIE AUTH MIDDLEWARE ---
  io.use((socket, next) => {
    try {
      const headerCookie = socket.handshake.headers.cookie;
      if (!headerCookie) return next(new Error("Authentication error: No cookies found"));

      const cookies = cookie.parse(headerCookie);
      const token = cookies.token; // Ensure this matches your cookie name

      if (!token) return next(new Error("Authentication error: Token missing"));

      // Verify the JWT
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error("Authentication error: Invalid token"));

        // Attach user info to socket for use in handlers
        socket.user = decoded;
        next();
      });
    } catch (error) {
      next(new Error("Internal auth error"));
    }
  });

  io.on("connection", (socket) => {
    // Join a room unique to this user based on their JWT ID
    const userId = socket.user.id;
    socket.join(`user:${userId}`);

    console.log(`📡 Socket Authenticated: ${socket.id} (User: ${userId})`);

    // Register Handlers
    registerNotificationHandlers(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`🔌 Disconnected: ${socket.id} Reason: ${reason}`);
    });
  });

  return io;
};
