import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateCollectorProfileResponseDTO } from "../dto/response/update_collector_profile.dto";
import CollectorAPI from "..";
import { UpdateCollectorProfileRequestDTO } from "../dto/request/update_collector_profile.dto";

export const useUpdateCollectorProfile = (
  options?: UseMutationOptions<
    UpdateCollectorProfileResponseDTO,
    Error,
    UpdateCollectorProfileRequestDTO
  >
) => {
  return useMutation({
    mutationFn: CollectorAPI.updateCollectorProfile,
    ...options,
  });
};
