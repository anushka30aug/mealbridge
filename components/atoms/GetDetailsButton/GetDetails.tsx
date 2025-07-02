"use client";

import { useRouter } from "next/navigation";
import { Button } from "@ui";
import { ChevronRight } from "lucide-react";

interface param {
  id: string;
  endpoint: string;
}

export default function GetDetails({ id, endpoint }: param) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`${endpoint}/${id}`);
  };
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      onClick={handleClick}
      className="bg-[#005e38] text-white font-semibold px-6 py-3 rounded-md shadow-sm select-none flex items-center gap-2 cursor-pointer hover:bg-[#00734a] w-full"
      aria-label="Get Meal Details"
    >
      <span className="flex items-center">Get Details</span>
      <span className="flex items-center justify-center">
        <ChevronRight className="w-4 h-4" />
      </span>
    </Button>
  );
}
