import API from "@/api/instance";
import { Response } from "@/api/types";
import { GetCollectorProfileResponseDTO } from "./dto/response/get_collector_profile.dto";

export const getCollectorProfile = async (collectorId: String) => {
  const { data: response } = await API.get<
    Response<GetCollectorProfileResponseDTO>
  >(`/collector/${collectorId}`);
  return response.data;
};
