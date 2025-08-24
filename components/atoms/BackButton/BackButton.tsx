"use client";

import { useRouter } from "next/navigation";
import { Button } from "@ui";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className={cn(
        "text-[#005e38] font-medium flex items-center gap-1 leading-none cursor-pointer",
        className
      )}
      aria-label="Go back to previous page"
    >
      <span className="flex items-center justify-center">
        <ChevronLeft className="w-4 h-4" />
      </span>
      <span className="flex items-center">Back</span>
    </Button>
  );
}
