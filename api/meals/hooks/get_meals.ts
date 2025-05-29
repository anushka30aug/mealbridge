import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetMealsResponseDto } from "../dto/response/get_meals.dto";
import MealsAPI from "..";

export const useGetMeals = (
  options?: UseQueryOptions<GetMealsResponseDto, Error>
) => {
  return useQuery({
    queryKey: ["get-meals"],
    queryFn: MealsAPI.getMeals,
    ...options,
  });
};
