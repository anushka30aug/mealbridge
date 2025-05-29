import API from "../instance";
import { Response } from "../types";
import { CancelBookedMealRequestDto } from "./dto/request/cancel_booked_meal.dto";
import { CancelBookedMealResponseDto } from "./dto/response/cancel_booked_meal.dto";

export const cancelBookedMeal = async (payload: CancelBookedMealRequestDto) => {
  const { data: response } = await API.post<
    Response<CancelBookedMealResponseDto>
  >("/collector/cancel-booked-meal", payload);
  return response.data!;
};
