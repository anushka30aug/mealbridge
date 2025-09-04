import { GetCollectorProfileResponseDTO } from "@/apiCalls/collector/dto/response/get_collector_profile.dto";
import { Response } from "@/apiCalls/types";
import { cookies } from "next/headers";

export default async function getProfile() {
  try {
    const cookieStore = await cookies();
    const collectorId = cookieStore.get("collector_id")?.value;
    if (!collectorId) {
      return null;
    }

    let baseURL = "http://localhost:3001";
    if (process.env.ENV === "production") {
      baseURL = process.env.BACKEND_URL!;
    }
    const response = await fetch(`${baseURL}/collector/${collectorId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    const data: Response<GetCollectorProfileResponseDTO> =
      await response.json();
    return data.data!;
  } catch (e) {
    console.log(e);
    return null;
  }
}
