import API from "../instance";
import { Response } from "../types";
import { GetMealDto } from "./dto/response/get_meals.dto";

export const getMealById = async (id: string): Promise<GetMealDto> => {
  const { data: response } = await API.get<Response<GetMealDto>>(
    `collector/get-available-meal/${id}`
  );
  return response.data!;
};