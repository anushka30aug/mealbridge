import API from "../instance";
import { Response } from "../types";
import { UpdateCollecotrAddressRequestDTO } from "./dto/request/update_collector_address.dto";
import { UpdateCollectorProfileResponseDTO } from "./dto/response/update_collector_profile.dto";

export const updateCollectorProfile=async(payload:UpdateCollecotrAddressRequestDTO)=>{
    const{data:response}= await API.put<Response<UpdateCollectorProfileResponseDTO>>("/collector/update",payload);
    return response.data!;
}