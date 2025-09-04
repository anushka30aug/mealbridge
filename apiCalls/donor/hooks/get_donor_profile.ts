import { useQuery } from "@tanstack/react-query";
import DonorAPI from "..";

export const useGetDonorProfile = (donorId: string) => {
  return useQuery({
    queryKey: ["get-donor-profile", donorId],
    queryFn: () => DonorAPI.getDonorProfile(donorId),
    enabled: !!donorId,
  });
};
