// /**
//  * Handles all QR-related WebSocket events
//  * @param {import("socket.io").Server} io
//  * @param {import("socket.io").Socket} socket
//  */
// export const registerQRHandlers = (io, socket) => {
//   // 1. Desktop joins and waits
//   socket.on("qr:join-session", (sessionId) => {
//     socket.join(sessionId);
//     console.log(`🖥️ Desktop [${socket.id}] joined QR room: ${sessionId}`);

//     if (!socket.user) {
//       console.log(`ℹ️ Room ${sessionId} is being monitored by an unauthenticated guest.`);
//     }
//   });

//   // 2. Mobile calls this AFTER the fetch verification is successful
//   socket.on("qr:verify", ({ sessionId, userData }) => {
//     // SECURITY: Ensure the sender (mobile) is actually authenticated
//     if (!socket.user) {
//       console.log(`❌ Unauthorized scan attempt from socket: ${socket.id}`);
//       return;
//     }

//     console.log(`✅ Mobile [${socket.id}] authorized Room: ${sessionId}`);

//     // Emit to everyone in the room EXCEPT the sender (the desktop)
//     // We send the user data so the desktop can log in
//     io.to(sessionId).emit("qr:success", {
//       user: userData || socket.user,
//       // You could also generate a temporary login token here if needed
//     });
//   });
// };

export const registerQRHandlers = (io, socket) => {
  socket.on("qr:join-session", (sessionId) => {
    socket.join(sessionId);
    console.log(`🖥️ Desktop [${socket.id}] joined room: ${sessionId}`);
  });

  socket.on("qr:verify", ({ sessionId }) => {
    if (!socket.user) {
      console.log(`❌ Unauthorized scan attempt`);
      return;
    }

    console.log(`ℹ️ Mobile [${socket.id}] requested QR verification for Room: ${sessionId}`);
  });
};
