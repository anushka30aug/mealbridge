import { GetCollectorProfileResponseDTO } from "@/api/collector/dto/response/get_collector_profile.dto";
import { Response } from "@/api/types";
import { cookies } from "next/headers";

export default async function getProfile() {
  try {
    const cookieStore = await cookies();
    const collectorId = cookieStore.get("collector_id")?.value;
    if (!collectorId) {
      return null;
    }
    const response = await fetch(
      `http://localhost:3001/collector/${collectorId}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return null;
    }
    const data: Response<GetCollectorProfileResponseDTO> =
      await response.json();
    return data.data!;
  } catch (e) {
    return null;
  }
}
