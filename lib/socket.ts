import { io, Socket } from "socket.io-client";

let SOCKET_URL = "http://localhost:3001";
if (process.env.ENV === "production") {
  SOCKET_URL = process.env.BACKEND_URL!;
}

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
      auth: {
        token:
          typeof window !== "undefined" ? localStorage.getItem("token") : "",
      },
    });
  }
  return socket;
};
