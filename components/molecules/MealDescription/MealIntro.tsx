import { GetMealDto } from "@/api/meals/dto/response/get_meals.dto";
import { Card, CardContent } from "@ui";
import { Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { StatusBadge, VegBadge } from "@atoms";
import Image from "next/image";
export default function MealIntro({ meal }: { meal: GetMealDto }) {
  return (
    <Card className="my-2">
      <div className="relative">
        <Image
          src={meal.image}
          alt={meal.foodDesc}
          width={600}
          height={300}
          className="w-full h-84 sm:h-96 object-cover object-center"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <VegBadge isVeg={meal.veg} />
          <StatusBadge status={meal.status} />
        </div>
      </div>
      <CardContent>
        <p className="my-2 text-[#005e38] font-semibold text-xl">
          {meal.foodDesc}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-gray-600">
            <Users className="h-4 w-4 text-[#005e38]" />
            <strong>{meal.feedsUpto}</strong>
            plates
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <Calendar className="h-4 w-4 text-[#005e38]" />
            <strong>Posted On:</strong>
            {format(new Date(meal.createdAt), "MMM dd, yyyy")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
