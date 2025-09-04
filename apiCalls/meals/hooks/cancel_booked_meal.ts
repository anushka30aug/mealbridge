import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CancelBookedMealResponseDto } from "../dto/response/cancel_booked_meal.dto";
import { CancelBookedMealRequestDto } from "../dto/request/cancel_booked_meal.dto";
import MealsAPI from "..";

export const useCancelBookedMeal = (
  options?: UseMutationOptions<
    CancelBookedMealResponseDto,
    Error,
    CancelBookedMealRequestDto
  >
) => {
  return useMutation({
    mutationFn: MealsAPI.cancelBookedMeal,
    ...options,
  });
};
