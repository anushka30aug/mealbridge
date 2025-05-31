import API from "../instance";
import { Response } from "../types";
import { GetHistoryResponseDto } from "./dto/response/get_history.dto";

export const getHistory = async () => {
  const { data: response } = await API.get<Response<GetHistoryResponseDto>>(
    "/collector/get-meal-booking-history"
  );
  return response.data!;
};
