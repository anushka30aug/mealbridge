import { useQuery } from "@tanstack/react-query";
import CollectorAPI from "..";

export const useGetCollectorProfile = (collectorId: string) => {
  return useQuery({
    queryKey: ["get-collector-profile", collectorId],
    queryFn: () => CollectorAPI.getCollectorProfile(collectorId),
    enabled: !!collectorId,
  });
};
