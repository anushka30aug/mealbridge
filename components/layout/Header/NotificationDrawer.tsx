"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/providers/notification_provider";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@ui";
import { cn } from "@/lib/utils";

const getNotificationStyle = (type: string) => {
  switch (type) {
    case "meal_received":
      return "bg-[#f3fef9] border-[#005e38]";
    case "meal_expired":
      return "bg-[#fff5f5] border-[#cc0000]";
    case "meal_cancelled":
      return "bg-[#fff7ed] border-[#d97706]";
    case "meal_reservation_cancelled_by_donor":
      return "bg-[#fff7ed] border-[#d97706]";
    default:
      return "bg-gray-50 border-gray-300";
  }
};

export default function NotificationDrawer() {
  const { notifications, isDrawerOpen, setIsDrawerOpen, removeNotification } =
    useNotifications();

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent className="rounded-t-2xl px-4 pb-4 pt-2 min-h-[40vh]">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-center text-[#005e38]">
            Notifications
          </DrawerTitle>
        </DrawerHeader>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-[600px] space-y-4 overflow-y-auto px-1">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                No new notifications.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl border",
                    getNotificationStyle(n.type)
                  )}
                >
                  {n.image && (
                    <div className="min-w-[60px] h-[60px] relative rounded-md overflow-hidden">
                      <Image
                        src={n.image}
                        alt="Meal"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <Link
                      href={n.link}
                      onClick={() => setIsDrawerOpen(false)}
                      className="block font-semibold text-sm text-[#005e38] hover:underline"
                    >
                      {n.title}
                    </Link>
                    <p className="text-sm text-gray-700">{n.message}</p>
                    {n.foodDesc && (
                      <p className="text-xs text-gray-500 mt-1 italic line-clamp-2">
                        “{n.foodDesc}”
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={() => removeNotification(n.id)}
                  >
                    ×
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
