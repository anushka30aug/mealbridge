"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";
import {
  handleMealCancelled,
  handleMealExpired,
  handleMealReceived,
  handleMealReservationCancelledByDonor,
} from "@/events";
import { useNotifications } from "./notification_provider";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { addNotification, setHasUnseenNotifications } = useNotifications();
  useEffect(() => {
    const socketInstance = getSocket();
    socketInstance.connect();

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket");

      const userId = localStorage.getItem("collector_id");
      if (userId) {
        socketInstance.emit("collector_connected", userId);
        console.log("Emitted collector_connected", userId);
      }
    });

    socketInstance.on("meal_reservation_cancelled_by_donor", (data) => {
      const notification = handleMealReservationCancelledByDonor(
        data,
        queryClient
      );
      addNotification(notification);
      setHasUnseenNotifications(true);
    });

    socketInstance.on("meal_cancelled", (data) => {
      const notification = handleMealCancelled(data, queryClient);
      addNotification(notification);
      setHasUnseenNotifications(true);
    });

    socketInstance.on("meal_expired", (data) => {
      const notification = handleMealExpired(data, queryClient);
      addNotification(notification);
      setHasUnseenNotifications(true);
    });

    socketInstance.on("meal_received", (data) => {
      const notification = handleMealReceived(data, queryClient);
      addNotification(notification);
      setHasUnseenNotifications(true);
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
