import { Badge, Card, CardContent, CardHeader, CardTitle } from "@ui";
import { Gift, Users } from "lucide-react";

export default function PlatformStats() {
  const appData = {
    donation: 500,
    peopleFed: 1250,
  };
  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold text-center p-2 m-2 text-transparent bg-clip-text bg-gradient-to-b from-[#278049] to-green-600 ">
        MealBridge Platform Impact
      </h1>
      <div className="flex items-center flex-col gap-4 sm:flex-row">
        <Card className="bg-green-100 p-4 border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex items-center justify-between m-0">
            <Gift className="h-8 w-8 text-green-500" />
            <Badge variant="secondary" className="bg-green-200">
              App Data
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appData.donation}</div>
            <CardTitle>Food Donations</CardTitle>
            <p className="text-sm text-gray-600 pt-2">
              Food items donated through MealBridge platform
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-100 p-4 border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex items-center justify-between">
            <Users className="h-8 w-8 text-green-500" />
            <Badge variant="secondary" className="bg-green-200">
              App Data
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appData.peopleFed}</div>
            <CardTitle>People Fed</CardTitle>
            <p className="text-sm text-gray-600 pt-2">
              Individuals who received food through our platform
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
