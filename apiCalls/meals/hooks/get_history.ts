import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetHistoryResponseDto } from "../dto/response/get_history.dto";
import MealsAPI from "..";

export const useGetHistory = (
  options?: UseQueryOptions<GetHistoryResponseDto, Error>
) => {
  return useQuery({
    queryKey: ["get-history"],
    queryFn: MealsAPI.getHistory,
    ...options,
  });
};
