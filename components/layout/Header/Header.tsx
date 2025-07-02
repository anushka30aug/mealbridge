"use client";
import { useEffect, useState } from "react";
import HeaderNavLinks from "./HeaderNavLinks";
import MobileMenuSheet from "./MobileMenuSheet";
import NotificationDrawer from "./NotificationDrawer";
import NotificationIcon from "./NotificationIcon";
import CollectorHooks from "@/api/collector/hooks";

export default function Header({ collectorId }: { collectorId: string }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data } = CollectorHooks.useGetCollectorProfile(collectorId);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSheetOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 px-6 border-b border-gray-200 mb-5">
      <h1 className="font-bold text-2xl text-[#005e38]">MealBridge</h1>
      <HeaderNavLinks />
      <div className="flex items-center gap-4">
        <NotificationIcon />
        <div className="md:hidden">
          <MobileMenuSheet
            collectorData={data}
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
          />
        </div>
      </div>
      <NotificationDrawer />
    </nav>
  );
}
