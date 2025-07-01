"use client";

import MealHooks from "@/api/meals/hooks";
import { Button } from "@ui";
import { toast } from "sonner";
export default function MealDetails({ id }: { id: string }) {
  const { data: meal, isLoading, isError } = MealHooks.useGetMealById(id);

  const { mutate: bookMeal, isPending } = MealHooks.useBookMeal({
    onSuccess: () => {
      toast.success("Meal Booked", {
        description: "You have successfully reserved this meal.",
      });
    },
    onError: (err) => {
      toast.error("Booking failed", {
        description: err.message || "Something went wrong.",
      });
    },
  });

  const handleClick = () => {
    bookMeal({ mealId: id });
  };
  if (isLoading) return <p className="text-center mt-10">Loading meal...</p>;
  if (isError || !meal) {
    return <p className="text-center mt-10 text-red-500">Meal not found.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <img
        src={meal.image}
        alt="Meal"
        className="w-full h-56 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {meal.foodDesc}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        Feeds up to: <span className="font-medium">{meal.feedsUpto}</span>
      </p>
      <p className="text-sm text-gray-600">
        Status:{" "}
        <span className="capitalize font-semibold text-green-700">
          {meal.status}
        </span>
      </p>
      <Button variant={"primary"} onClick={handleClick} className="mt-3">
        Book Meal
      </Button>
    </div>
  );
}
