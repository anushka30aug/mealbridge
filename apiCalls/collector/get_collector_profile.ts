import API from "@/apiCalls/instance";
import { Response } from "@/apiCalls/types";
import { GetCollectorProfileResponseDTO } from "./dto/response/get_collector_profile.dto";

export const getCollectorProfile = async (collectorId: String) => {
  const { data: response } = await API.get<
    Response<GetCollectorProfileResponseDTO>
  >(`/collector/${collectorId}`);
  return response.data;
};
