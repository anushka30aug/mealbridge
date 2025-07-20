"use client";

import { Button } from "@ui";
import clsx from "clsx";
import { Calendar, History, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function HeaderNavLinks({
  collectorId,
}: {
  collectorId: string;
}) {
  // TODO: change paths according to actual routes

  const NAV_ITEMS = [
    { label: "Home", path: "", Icon: Home },
    { label: "History", path: "history", Icon: History },
    { label: "Account", path: `profile/collector/${collectorId}`, Icon: User },
  ];

  const pathname = usePathname();

  const activeSection = useMemo(() => {
    if (pathname === "/") return "";
    const parts = pathname.split("/").filter(Boolean);
    return parts[0] || "";
  }, [pathname]);

  return (
    <ul className="hidden md:flex items-center space-x-2 text-lg font-semibold">
      {NAV_ITEMS.map(({ label, path, Icon }) => (
        <Button
          key={path}
          className={clsx(
            "bg-white text-[#005e38] hover:bg-green-100 transition-colors duration-300 cursor-pointer",
            activeSection === (path.split("/").filter(Boolean)[0] || "") &&
              "bg-[#005e38] text-white hover:bg-[#005e38]"
          )}
        >
          <Icon />
          {label === "Home" ? (
            <Link href={`/`}>{label}</Link>
          ) : (
            <Link href={`/${path}`}>{label}</Link>
          )}
        </Button>
      ))}
    </ul>
  );
}
