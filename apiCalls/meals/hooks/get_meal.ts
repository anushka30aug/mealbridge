import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetMealDto } from "../dto/response/get_meals.dto";
import MealsAPI from "..";

export const useGetMealById = (
  id: string,
  options?: UseQueryOptions<GetMealDto, Error>
) => {
  return useQuery({
    queryKey: ["get-meal", id],
    queryFn: () => MealsAPI.getMealById(id),
    enabled: !!id,
    ...options,
  });
};
