import { cn } from "@/lib/utils";
import { Badge } from "@ui";
import { Flame, Leaf } from "lucide-react";

export default function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <Badge
      className={cn(
        "shadow-lg cursor-pointer",
        isVeg
          ? "bg-green-500 hover:bg-green-600 text-white"
          : "bg-red-500 hover:bg-red-600 text-white"
      )}
    >
      {isVeg ? (
        <Leaf className="h-3 w-3 mr-1" />
      ) : (
        <Flame className="h-3 w-3 mr-1" />
      )}
      {isVeg ? "Vegetarian" : "Non-Veg"}
    </Badge>
  );
}
