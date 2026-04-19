import { createServer } from "http";
import app from "./app.js";
import { initSocket } from "./src/sockets/index.js";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
initSocket(httpServer);
httpServer.listen(PORT, () => {
  console.log(`🚀 Medix API running on http://localhost:${PORT}`);
  console.log(`⚡ WebSocket Handshake verification enabled via Cookies`);
});
