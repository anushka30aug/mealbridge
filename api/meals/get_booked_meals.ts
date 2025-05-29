import API from "../instance";
import { Response } from "../types";
import { GetBookedMealsResponseDto } from "./dto/response/get_booked_meals.dto";

export const getBookedMeals = async () => {
  const { data: response } = await API.get<Response<GetBookedMealsResponseDto>>(
    "/collector/view-booked-meal"
  );
  return response.data!;
};
