import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetMealsResponseDto } from "../dto/response/get_meals.dto";
import MealsAPI from "..";

export const useGetMeals = (
  payload?: { veg?: boolean; minFeeds?: number },
  options?: UseQueryOptions<GetMealsResponseDto, Error>
) => {
  return useQuery({
    queryKey: ["get-meals", payload],
    queryFn: () => MealsAPI.getMeals(payload),
    ...options,
  });
};
