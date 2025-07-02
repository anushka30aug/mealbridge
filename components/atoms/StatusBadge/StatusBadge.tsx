import { cn } from "@/lib/utils";
import { Badge } from "@ui";

export default function StatusBadge({
  status,
}: {
  status: "available" | "reserved" | "delivered" | "expired" | "cancelled";
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "available":
        return {
          variant: "default" as const,
          className: "bg-[#005e38] hover:bg-[#007a52] text-white",
        };
      case "reserved":
        return {
          variant: "secondary" as const,
          className: "bg-[#d97706] hover:bg-[#f59e0b] text-white",
        };
      case "delivered":
        return {
          variant: "secondary" as const,
          className: "bg-[#1d4ed8] hover:bg-[#4f6ef1] text-white",
        };
      case "expired":
        return {
          variant: "secondary" as const,
          className: "bg-[#b91c1c] hover:bg-[#ef4444] text-white",
        };
      case "cancelled":
        return {
          variant: "secondary" as const,
          className: "bg-[#6b7280] hover:bg-[#9ca3af] text-white",
        };
      default:
        return {
          variant: "secondary" as const,
          className: "bg-[#9ca3af] hover:bg-[#d1d5db] text-white",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "shadow-lg font-medium transition-colors duration-200 ease-in-out cursor-pointer",
        config.className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
