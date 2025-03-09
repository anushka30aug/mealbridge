import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"; 

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true, 
      auth: {
        token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
      },
    });
  }
  return socket;
};
