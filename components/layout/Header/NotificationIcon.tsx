"use client";
import { useNotifications } from "@/providers/notification_provider";
import { Badge, Button } from "@ui";
import { set } from "date-fns";
import { Bell } from "lucide-react";

export default function NotificationIcon() {
  const { hasUnseenNotifications, setIsDrawerOpen } = useNotifications();
  return (
    <div
      className="relative rounded-full p-2 border border-gray-200 hover:bg-gray-100 transition-colors duration-300 cursor-pointer text-[#005e38]"
      onClick={() => {
        setIsDrawerOpen(true);
      }}
    >
      <Bell />
      {hasUnseenNotifications && (
        <Badge
          variant="destructive"
          className="absolute top-1 right-2 h-2 w-2 flex items-center justify-center p-0 text-xs"
        ></Badge>
      )}
    </div>
  );
}
