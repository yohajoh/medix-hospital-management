// src/sockets/handlers/notification.handler.js
export const registerNotificationHandlers = (io, socket) => {
  socket.on("notification:read_all", async () => {
    const userId = socket.user.id;
    // Call your repository/service here to update PostgreSQL
    console.log(`User ${userId} marked all notifications as read`);
  });
};
