import API from "../instance";
import { Response } from "../types";
import { UpdateCollecotrAddressRequestDTO } from "./dto/request/update_collector_address.dto";
import { UpdateCollecotrAddressResponseDTO } from "./dto/response/update_collector_address.dto";

export const updateCollectorAddress=async(payload:UpdateCollecotrAddressRequestDTO)=>{
    const{data:response}= await API.put<Response<UpdateCollecotrAddressResponseDTO>>("/collector/update",payload);
    return response.data!;
}