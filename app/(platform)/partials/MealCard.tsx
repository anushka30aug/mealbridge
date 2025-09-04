"use client";
import Image from "next/image";
import { Users } from "lucide-react";
import Link from "next/link";
import { GetMealDto } from "@/apiCalls/meals/dto/response/get_meals.dto";
import { VegBadge, StatusBadge, GetDetails } from "@/components/atoms";
import { formatDistanceToNowStrict, parseISO, isBefore } from "date-fns";

export default function MealCard({
  meal,
  endpoint,
}: {
  meal: GetMealDto;
  endpoint: string;
}) {
  const getExpiryBadge = (expiry: Date) => {
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const hoursLeft = diff / (1000 * 60 * 60);

    let color = "bg-green-600 text-white";
    if (hoursLeft < 1) color = "bg-red-600 text-white";
    else if (hoursLeft < 6) color = "bg-orange-500 text-white";
    else if (hoursLeft < 24) color = "bg-yellow-400 text-black";

    const text =
      hoursLeft < 0
        ? "Expired"
        : `Expires in ${formatDistanceToNowStrict(expiry)}`;

    return { text, color };
  };
  const { text, color } = getExpiryBadge(parseISO(meal.expiryDate));
  return (
    <div
      className="group bg-white border border-gray-200 rounded-2xl shadow-md 
             hover:shadow-lg transition-shadow duration-200 overflow-hidden 
             w-full max-w-[360px] mx-auto flex flex-col min-h-[420px]"
    >
      <div className="w-full h-52 overflow-hidden relative">
        <Image
          src={meal.image}
          alt="Food image"
          width={400}
          height={300}
          className="w-full h-full object-cover transform transition-transform 
                 duration-300 group-hover:scale-105"
        />

        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full shadow ${color}`}
        >
          {text}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          <StatusBadge status={meal.status} />
          <VegBadge isVeg={meal.veg} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users className="w-5 h-5 text-gray-600" />
          <span>
            <span className="font-medium">{meal.feedsUpto}</span>{" "}
            {meal.feedsUpto === 1 ? "plate" : "plates"}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {meal.foodDesc.length > 30 ? (
            <>
              {meal.foodDesc.slice(0, 50)}...
              <Link
                href={`/my-active-meals/${meal._id}`}
                className="text-[#00734a] font-semibold"
              >
                {" "}
                view more
              </Link>
            </>
          ) : (
            <>{meal.foodDesc}</>
          )}
        </p>

        <div className="mt-auto">
          <GetDetails id={meal._id} endpoint={endpoint} />
        </div>
      </div>
    </div>
  );
}
