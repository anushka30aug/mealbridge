"use client";

import React, { useContext, createContext, useEffect, useState } from "react";

export type Notification = {
  id: string;
  title: string;
  message: string;
  link: string;
  image: string;
  foodDesc: string;
  type:
    | "meal_reservation_cancelled_by_donor"
    | "meal_cancelled"
    | "meal_expired"
    | "meal_received";
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  hasUnseenNotifications: boolean;
  setHasUnseenNotifications: (hasUnssen: boolean) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }
  return context;
};

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("notifications");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) setNotifications(JSON.parse(stored));
  }, []);

  const saveToStorage = (updated: Notification[]) => {
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const addNotification = (notification: Notification) => {
    const current: Notification[] = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );

    const updated = [
      notification,
      ...current.filter((n) => {
        const currentMealId = n.link.split("/").pop();
        const newMealId = notification.link.split("/").pop();
        return currentMealId !== newMealId;
      }),
    ];
    setNotifications(updated);
    saveToStorage(updated);
    setHasUnseenNotifications(true);
    console.log(updated);
  };

  const removeNotification = (id: string) => {
    const current: Notification[] = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    const updated = current.filter((n) => n.id !== id);
    setNotifications(updated);
    saveToStorage(updated);
  };

  const handleDialogOpen = (open: boolean) => {
    setIsDrawerOpen(open);
    if (open) setHasUnseenNotifications(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        isDrawerOpen,
        setIsDrawerOpen: handleDialogOpen,
        hasUnseenNotifications,
        setHasUnseenNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
