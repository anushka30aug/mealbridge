import { GetBookedMealDto } from "@/apiCalls/meals/dto/response/get_booked_meals.dto";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function BookedMealCard({ meal }: { meal: GetBookedMealDto }) {
  const timeLeft = formatDistanceToNow(new Date(meal.expiryDate), {
    addSuffix: true,
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={meal.image}
          alt="Meal"
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-white/90 text-green-700 text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Expires {timeLeft}
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {meal.foodDesc}
        </h3>
        <p className="text-xs text-gray-500">Feeds up to {meal.feedsUpto}</p>

        <Link
          href={`/meal/${meal._id}`}
          className="mt-auto text-xs text-green-600 hover:underline font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
