import { GetCollectorProfileResponseDTO } from "@/api/collector/dto/response/get_collector_profile.dto";
import getProfile from "@/lib/getProfile";
import AddressChecker from "./partials/AddressChecker";
import HomeContent from "./partials/HomeContent";
import BookedMealsSection from "./partials/BookedMealSection";

export default async function HomePage() {
  const profile: GetCollectorProfileResponseDTO | null = await getProfile();
  const address = profile?.address?.address || "";

  return (
    <>
      <AddressChecker address={address} />
      <BookedMealsSection />
      <HomeContent address={address} />
    </>
  );
}
