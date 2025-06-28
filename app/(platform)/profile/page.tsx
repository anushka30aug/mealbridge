"use client";
import { useGetCollectorProfile } from "@/api/collector/hooks/get_collector_profile";

export default function Profile() {
  const collectorId = localStorage.getItem("collector_id") || "";
  const { data: collectorProfile, isLoading } =
    useGetCollectorProfile(collectorId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(collectorProfile);
  return <div>Profile</div>;
}
