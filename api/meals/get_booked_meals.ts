import API from "../instance";
import { Response } from "../types";
import { GetBookedMealsResponseDto } from "./dto/response/get_booked_meals.dto";

export const getBookedMeals = async () => {
  const { data: response } = await API.get<Response<GetBookedMealsResponseDto>>(
    "/collector/get-booked-meals"
  );
  return response.data!;
};
