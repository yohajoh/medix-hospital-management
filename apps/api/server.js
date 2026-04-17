// import app from "./app.js";

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// server.js
import { createServer } from "http";
import app from "./app.js";
import { initSocket } from "./src/sockets/index.js";

const PORT = process.env.PORT || 5000;

// Create the HTTP server wrapper
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

// Use httpServer to listen
httpServer.listen(PORT, () => {
  console.log(`🚀 Medix API running on http://localhost:${PORT}`);
  console.log(`⚡ WebSocket Handshake verification enabled via Cookies`);
});
