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

    console.log(
      `ℹ️ Mobile [${socket.id}] requested QR verification for Room: ${sessionId}`,
    );
  });
};
