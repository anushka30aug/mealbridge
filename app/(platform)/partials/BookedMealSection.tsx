"use client";

import MealHooks from "@/api/meals/hooks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ui/carousel";
import { Sparkles } from "lucide-react";
import BookedMealCard from "./BookedMealCard";

export default function BookedMealsSection() {
  const { data: meals, isLoading, isError } = MealHooks.useGetBookedMeals();

  if (isLoading || isError || !meals || meals.length === 0) return null;

  return (
    <section className="w-full flex justify-center px-4 mb-8">
      {/* Section Heading */}
      <div className="w-full max-w-5xl lg:mx-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-green-600 w-4 h-4" />
          <h2 className="text-green-800 font-semibold text-base sm:text-lg">
            Your Booked Meals
          </h2>
        </div>
        {/* Carousel Wrapper */}
        <div className="relative">
          <Carousel>
            <CarouselContent>
              {meals.map((meal) => (
                <CarouselItem
                  key={meal._id}
                  className="basis-[90%] sm:basis-[48%] md:basis-[32%] lg:basis-[25%]"
                >
                  <BookedMealCard meal={meal} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Arrows */}
            <CarouselPrevious className="left-0 -translate-y-1/2 top-1/2" />
            <CarouselNext className="right-0 -translate-y-1/2 top-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
