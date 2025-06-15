import { Badge, Card, CardContent, CardHeader, CardTitle } from "@ui";
import { ChefHat, Clock, Gift, Globe, MapPin, Users } from "lucide-react";
import PlatformStats from "./PlatformStats";
import GlobalStats from "./GlobalStats";

export default function StatsSection() {
  return (
    <div className="flex items-center flex-col gap-4 p-6 min-h-screen">
      <h1 className="text-4xl text-center font-bold bg-gradient-to-b from-[#278049] to-green-600 text-transparent bg-clip-text pb-1">
        Our Progress & Global Impact
      </h1>
      <p className="text-lg text-center text-gray-600">
        Track our growing impact while understanding the global challenge we're
        working together to solve.
      </p>
      <PlatformStats />
      <GlobalStats />
    </div>
  );
}
