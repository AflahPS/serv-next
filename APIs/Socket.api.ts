import { io } from "socket.io-client";

export const initializeSocket = () => {
  const socketUrl =
    process.env.NODE_ENV === "production"
      ? process.env.SOCKET_URL_PROD
      : process.env.SOCKET_URL_DEV;
  return io(socketUrl as string);
};
