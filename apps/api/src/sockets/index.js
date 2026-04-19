import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { setIO } from "../lib/socket.js";
import { registerNotificationHandlers } from "./handlers/notification.handler.js";
import { registerQRHandlers } from "./handlers/qr.handler.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    connectTimeout: 45000,
    maxHttpBufferSize: 1e6,
  });

  setIO(io);

  io.use((socket, next) => {
    try {
      const headerCookie = socket.handshake.headers.cookie;

      console.log(
        `Checking Auth for ${socket.id}. Cookie Header present: ${!!headerCookie}`,
      );

      if (!headerCookie) {
        socket.user = null;
        return next();
      }

      const cookies = cookie.parse(headerCookie);
      const token = cookies.token;

      if (!token) {
        socket.user = null;
        return next();
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          socket.user = null;
          return next();
        }

        socket.user = decoded;
        next();
      });
    } catch (error) {
      next(new Error("Internal socket authentication error"));
    }
  });

  io.on("connection", (socket) => {
    if (socket.user) {
      const userId = socket.user.id;
      socket.join(`user:${userId}`);
      console.log(`📡 Authenticated: ${socket.id} (User: ${userId})`);
    } else {
      console.log(`📡 Guest Connected: ${socket.id}`);
    }

    registerNotificationHandlers(io, socket);
    registerQRHandlers(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`🔌 Disconnected: ${socket.id} | Reason: ${reason}`);
    });
  });

  return io;
};
