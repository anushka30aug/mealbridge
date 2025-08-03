import { Card, CardContent, CardHeader, CardTitle, Button } from "@ui";
import { MapPin, PencilIcon } from "lucide-react";

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
    <Card className="border border-green-200 shadow-lg rounded-xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-1">
        <CardTitle className="text-[#005e38] flex items-center gap-2 text-xl font-bold tracking-wide leading-tight">
          <MapPin className="h-5 w-5" />
          Location Details
        </CardTitle>
        {isEditable && (
          <Button
            variant="outline"
            onClick={onEdit}
            className="text-sm flex items-center justify-center gap-1 px-2 border-green-600 text-green-700 hover:bg-green-100 cursor-pointer"
          >
            <PencilIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Edit Address</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-4">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Address</div>
          <div className="font-medium">{mealAddress.address}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">City</div>
            <div className="font-medium">{mealAddress.city}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">State</div>
            <div className="font-medium">{mealAddress.state}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Country</div>
            <div className="font-medium">{mealAddress.country}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Postal Code</div>
            <div className="font-medium">{mealAddress.postalCode}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
