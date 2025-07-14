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
      {
        address && <div className="px-4 md:px-10 py-6 max-w-6xl mx-auto">
        <h1 className="p-2 font-bold text-4xl flex items-center flex-wrap gap-1">Welcome back, <p className="text-[#005e38]">{profile?.username}!👋</p></h1>
        <p className="text-gray-500 text-md px-2">
          Discover fresh meals and help reduce food waste in your community
        </p>
      </div>
      }
      <BookedMealsSection />
      <HomeContent address={address} />
    </>
  );
}
