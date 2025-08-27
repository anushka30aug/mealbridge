import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, PencilIcon, Navigation, Building, Globe } from "lucide-react";

interface AddressCardProps {
  mealAddress: {
    city: string;
    state: string;
    country: string;
    address: string;
    postalCode: string;
  };
  isEditable?: boolean;
  onEdit?: () => void;
}

export default function AddressCard({
  mealAddress,
  isEditable = false,
  onEdit,
}: AddressCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-[#005e38] tracking-wide flex items-center gap-2 leading-tight">
            <MapPin className="w-6 h-6 text-[#005e38]" />
            Location Details
          </CardTitle>
          {isEditable && (
            <Button
              variant="outline"
              className="text-sm flex items-center justify-center gap-1 px-2 border-green-600 text-green-700 hover:bg-green-100 cursor-pointer"
              onClick={onEdit}
            >
              <PencilIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Edit Address</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg p-4 ">
            <div className="flex items-start gap-3">
              <Navigation className="w-5 h-5 text-slate-600 mt-1" />
              <div>
                <p className="text-sm text-slate-600">Full Address</p>
                <p className="font-medium text-slate-800">
                  {mealAddress.address}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "City",
                value: mealAddress.city,
                icon: Building,
                color: "text-green-600",
              },
              {
                label: "State",
                value: mealAddress.state,
                icon: MapPin,
                color: "text-blue-600",
              },
              {
                label: "Country",
                value: mealAddress.country,
                icon: Globe,
                color: "text-purple-600",
              },
              {
                label: "Postal Code",
                value: mealAddress.postalCode,
                icon: Navigation,
                color: "text-orange-600",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white  rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <div>
                    <p className="text-sm text-slate-600">{item.label}</p>
                    <p className="font-medium text-slate-800">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
