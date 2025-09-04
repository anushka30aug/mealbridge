import API from "../instance";
import { Response } from "../types";
import { GetMealsResponseDto } from "./dto/response/get_meals.dto";

export const getMeals = async (payload?: {
  veg?: boolean;
  minFeeds?: number;
}) => {
  const veg = payload?.veg ?? false;
  const minFeeds = payload?.minFeeds ?? 3;

  const url = `collector/get-available-meals?veg=${veg}&minFeeds=${minFeeds}`;

  const { data: response } = await API.get<Response<GetMealsResponseDto>>(url);
  return response.data!;
};
