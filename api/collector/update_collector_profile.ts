import API from "../instance";
import { Response } from "../types";
import { UpdateCollectorProfileRequestDTO } from "./dto/request/update_collector_profile.dto";
import { UpdateCollectorProfileResponseDTO } from "./dto/response/update_collector_profile.dto";

export const updateCollectorProfile = async (
  payload: UpdateCollectorProfileRequestDTO
) => {
  const { data: response } = await API.put<
    Response<UpdateCollectorProfileResponseDTO>
  >("/collector/update", payload);
  return response.data!;
};
