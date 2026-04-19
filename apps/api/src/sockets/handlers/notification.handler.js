export const registerNotificationHandlers = (io, socket) => {
  socket.on("notification:read_all", async () => {
    const userId = socket.user.id;
    console.log(`User ${userId} marked all notifications as read`);
  });
};
