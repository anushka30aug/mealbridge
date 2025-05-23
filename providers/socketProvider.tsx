"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = getSocket();
    socketInstance.connect();

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket");

      const userId = localStorage.getItem("userId");
      if (userId) {
        socketInstance.emit("collector_connected", userId);
        console.log("Emitted collector_connected", userId);
      }
    });
    
    socketInstance.on("meal_reservation_cancelled_by_donor", (data) => {
      console.log("GHJKGFHJKGFHJ");
      console.log(data);
    });
    socketInstance.on("catchdonor", (data) => {
      alert(data);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
