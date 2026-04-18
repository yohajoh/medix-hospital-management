/**
 * Handles all QR-related WebSocket events
 * @param {import("socket.io").Server} io
 * @param {import("socket.io").Socket} socket
 */
export const registerQRHandlers = (io, socket) => {
  // Desktop calls this to wait for the mobile scan
  socket.on("qr:join-session", (sessionId) => {
    // Join the specific room for this QR handshake
    socket.join(sessionId);

    console.log(`🖥️ Desktop [${socket.id}] joined QR room: ${sessionId}`);

    // Optional: Log if a guest vs authenticated user is joining
    if (!socket.user) {
      console.log(`ℹ️ Room ${sessionId} is being monitored by an unauthenticated guest.`);
    }
  });

  // Future-proofing: Add more QR-related events here
  // socket.on("qr:cancel", (sessionId) => { ... });
};
