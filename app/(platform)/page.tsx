import { GetCollectorProfileResponseDTO } from "@/api/collector/dto/response/get_collector_profile.dto";
import getProfile from "@/lib/getProfile";
import AddressChecker from "./partials/AddressChecker";

export default async function Home() {
  const profile: GetCollectorProfileResponseDTO | null = await getProfile();
  return (
    <>
      <AddressChecker address={profile?.address?.address || ""} />
      <h1> at home page </h1>
    </>
  );
}
