import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetBookedMealsResponseDto } from "../dto/response/get_booked_meals.dto";
import MealsAPI from "..";

export const useGetBookedMeals = (
  options?: UseQueryOptions<GetBookedMealsResponseDto, Error>
) => {
  return useQuery({
    queryKey: ["get-booked-meals"],
    queryFn: MealsAPI.getBookedMeals,
    ...options,
  });
};
