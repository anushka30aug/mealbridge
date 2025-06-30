import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateCollecotrAddressResponseDTO } from "../dto/response/update_collector_address.dto";
import { UpdateCollecotrAddressRequestDTO } from "../dto/request/update_collector_address.dto";
import CollectorAPI from "..";

export const useUpdateCollectorAddress = (
  options?: UseMutationOptions<
    UpdateCollecotrAddressResponseDTO,
    Error,
    UpdateCollecotrAddressRequestDTO
  >
) => {
  return useMutation({
    mutationFn: CollectorAPI.updateCollectorAddress,
    ...options,
  });
};
