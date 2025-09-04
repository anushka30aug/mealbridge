import API from "../instance";
import { Response } from "../types";
import { BookMealRequestDto } from "./dto/request/book_meal.dto";
import { BookMealResponseDto } from "./dto/response/book_meal.dto";

export const bookMeal = async (Payload: BookMealRequestDto) => {
  const { data: response } = await API.post<Response<BookMealResponseDto>>(
    "/collector/book-meal",
    Payload
  );
  return response.data!;
};
