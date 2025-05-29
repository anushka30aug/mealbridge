import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BookMealResponseDto } from "../dto/response/book_meal.dto";
import { BookMealRequestDto } from "../dto/request/book_meal.dto";
import MealsAPI from "..";

export const useBookMeal = (
  options?: UseMutationOptions<BookMealResponseDto, Error, BookMealRequestDto>
) => {
  return useMutation({
    mutationFn: MealsAPI.bookMeal,
    ...options,
  });
};
