import { Card, CardContent, CardHeader, CardTitle, Separator } from "@ui";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface mealTime {
  preferredTime: string;
  deliveryDate: string | null;
  expiryDate: string;
}
export default function MealTime({ mealTime }: { mealTime: mealTime }) {
  const isActive =
    Date.now() < new Date(mealTime.expiryDate).getTime() &&
    mealTime.deliveryDate === null;

  return (
    <Card className="border rounded-xl bg-white">
      <CardHeader className="flex items-center justify-between px-4 py-1">
        <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-wide text-[#005e38] leading-tight">
          <Clock className="h-5 w-5" />
          Timing Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-4 pb-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Preferred Pickup Time</div>
              <div className="font-medium">
                {format(new Date(mealTime.preferredTime), "MMM dd, yyyy")}
              </div>
              <div className="text-sm text-gray-600">
                {format(new Date(mealTime.preferredTime), "h:mm a")}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">
                {isActive ? "Expires On" : "Expired On"}
              </div>
              <div className="font-medium">
                {format(new Date(mealTime.expiryDate), "MMM dd, yyyy")}
              </div>
              <div className="text-sm text-gray-600">
                {format(new Date(mealTime.expiryDate), "h:mm a")}
              </div>
            </div>
          </div>

          <Separator />
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Delivered On</div>
            <div className="font-medium">
              {mealTime.deliveryDate
                ? format(new Date(mealTime.deliveryDate), "MMM dd, yyyy h:mm a")
                : "-"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
