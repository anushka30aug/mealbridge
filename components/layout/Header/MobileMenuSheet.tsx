import { GetCollectorProfileResponseDTO } from "@/apiCalls/collector/dto/response/get_collector_profile.dto";
import { logout } from "../../../lib/logout";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, Skeleton } from "@ui";
import { History, Home, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface props {
  collectorData: GetCollectorProfileResponseDTO | undefined;
  isSheetOpen: boolean;
  setIsSheetOpen: (isOpen: boolean) => void;
}
export default function MobileMenuSheet({
  collectorData,
  isSheetOpen,
  setIsSheetOpen,
}: props) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsSheetOpen(false);
    await logout(router);
  };

  const handleAccountClick = () => {
    setIsSheetOpen(false);
    router.push(`/profile/collector/${collectorData?._id}`);
  };

  const handleHistoryClick = () => {
    setIsSheetOpen(false);
  };

  const handleHomeClick = () => {
    setIsSheetOpen(false);
    router.push(`/`);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger
        className="cursor-pointer"
        onClick={() => setIsSheetOpen(true)}
      >
        <Menu size={24} />
      </SheetTrigger>

      <SheetContent className="w-[75%] [@media(min-width:500px)]:w-[55%] sm:w-[50%] bg-white rounded-lg shadow-lg p-6">
        <SheetTitle className="text-3xl font-bold text-[#005e38] text-center mb-6 select-none">
          MealBridge
        </SheetTitle>

        <div
          className="flex flex-col items-center gap-3 mt-2"
          onClick={handleAccountClick}
        >
          <div className="relative w-24 h-24 cursor-pointer">
            {!isImgLoaded && (
              <Skeleton className="rounded-full w-full h-full" />
            )}

            <Image
              src={collectorData?.profilePicture || "/default-profile.png"}
              alt="Profile"
              width={96}
              height={96}
              className={
                "rounded-full object-cover transition-opacity duration-300 " +
                (isImgLoaded ? "opacity-100" : "opacity-0")
              }
              onLoadingComplete={() => setIsImgLoaded(true)}
            />
          </div>

          <div className="text-[#005e38] font-semibold text-lg truncate max-w-full text-center cursor-pointer">
            {collectorData?.username || "Anonymous"}
          </div>
          <div className="text-sm text-gray-600 max-w-full text-center break-words cursor-pointer">
            {collectorData?.email || "No email available"}
          </div>
        </div>

        <ul className="flex flex-col gap-5 mt-12 text-gray-700 font-semibold px-1">
          {[
            { icon: <Home />, label: "Home", clickFunction: handleHomeClick },
            {
              icon: <History />,
              label: "History",
              clickFunction: handleHistoryClick,
            },
            {
              icon: <User />,
              label: "Account",
              clickFunction: handleAccountClick,
            },
            {
              icon: <LogOut />,
              label: "Logout",
              clickFunction: handleLogout,
            },
          ].map(({ icon, label, clickFunction }) => (
            <li
              key={label}
              onClick={clickFunction}
              className="flex items-center gap-3 px-5 py-3 rounded-md cursor-pointer hover:bg-[#e6f4ea] hover:text-[#005e38] transition-colors duration-300 select-none"
            >
              {icon}
              <span className="text-base">{label}</span>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
