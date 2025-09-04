"use client";

import { useState } from "react";
import MealHooks from "@/apiCalls/meals/hooks";
import LocationBanner from "./LoactionBanner";
import Filters from "../partials/Filters";
import MealCard from "../partials/MealCard";
import { Utensils } from "lucide-react";
import { GetCollectorProfileResponseDTO } from "@/apiCalls/collector/dto/response/get_collector_profile.dto";

const { useGetMeals } = MealHooks;

export default function HomeContent({
  collectorProfile,
}: {
  collectorProfile: GetCollectorProfileResponseDTO;
}) {
  const [filters, setFilters] = useState({
    veg: false,
    minFeeds: 3,
  });
  const { data, isLoading, isError } = useGetMeals({ ...filters });
  const { address } = collectorProfile;
  const meals = data || [];

  return (
    <main className="px-4 md:px-10 py-6 max-w-6xl mx-auto">
      {address && <LocationBanner location={address.address} />}
      <Filters onFilterChange={setFilters} />
      <h2 className="text-xl font-semibold flex items-center gap-2 text-[#005e38] my-5">
        <Utensils size={20} color="green" /> Available Meals{" "}
        <span className="text-gray-500 text-sm font-normal">
          ({meals.length} found)
        </span>
      </h2>
      {isLoading ? (
        <p className="text-gray-500 text-center mt-10">Loading meals...</p>
      ) : isError ? (
        <p className="text-red-500 text-center mt-10">Failed to fetch meals.</p>
      ) : meals.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No meals available currently.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} endpoint="/meal" />
          ))}
        </div>
      )}
    </main>
  );
}
