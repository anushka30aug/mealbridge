"use client";
import { logout } from "../../../lib/logout";
import { Button } from "@ui";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(router);
  };
  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-red-500 px-2 hover:bg-red-50 hover:text-red-600 hover:border-red-500  cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
