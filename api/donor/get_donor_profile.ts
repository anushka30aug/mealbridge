import API from "../instance";
import { Response } from "../types";
import { GetDonorProfileResponseDTO } from "./dto/response/get_donor_profile.dto";
export const getDonorProfile = async (donorId: string) => {
  const { data: response } = await API.get<
    Response<GetDonorProfileResponseDTO>
  >(`/donor/${donorId}`);
  return response.data;
};
