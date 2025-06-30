import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateCollectorProfileResponseDTO } from "../dto/response/update_collector_profile.dto";
import { UpdateCollecotrAddressRequestDTO } from "../dto/request/update_collector_address.dto";
import CollectorAPI from "..";

export const useUpdateCollectorProfile = (
  options?: UseMutationOptions<
    UpdateCollectorProfileResponseDTO,
    Error,
    UpdateCollecotrAddressRequestDTO
  >
) => {
  return useMutation({
    mutationFn: CollectorAPI.updateCollectorProfile,
    ...options,
  });
};
