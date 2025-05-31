import API from "../instance";
import { Response } from "../types";
import { GetMealsResponseDto } from "./dto/response/get_meals.dto";

export const getMeals = async () => {
  const { data: response } = await API.get<Response<GetMealsResponseDto>>(
    "collector/get-available-meals"
  );
  return response.data!;
};
