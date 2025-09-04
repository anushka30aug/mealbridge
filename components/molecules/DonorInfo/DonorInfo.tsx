"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@ui";
import { User, Calendar, PhoneIcon } from "lucide-react";
import { format } from "date-fns";
import DonorHooks from "@/apiCalls/donor/hooks";

export default function DonorInfo({ donorId }: { donorId: string }) {
  const { data: donor } = DonorHooks.useGetDonorProfile(donorId);
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="my-2 bg-gradient-to-br from-green-50 to-cream-50 border-green-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-green-700 flex items-center gap-2">
          <User className="h-5 w-5" />
          Donor Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-green-200">
            <AvatarImage
              src={donor?.profilePicture || ""}
              alt={donor?.username || "Donor"}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.error("Image failed to load:", donor?.profilePicture ,e);
              }}
              onLoad={() => {
                console.log("Image loaded successfully");
              }}
            />
            <AvatarFallback className="bg-green-100 text-green-700 text-lg font-semibold">
              {donor?.username ? getInitials(donor.username) : "?"}
            </AvatarFallback>
          </Avatar>
          <div className=" space-y-1">
            <h3 className="font-semibold text-lg text-gray-900">
              {donor?.username || "Unknown"}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-cream-300 text-cream-700"
              >
                {donor?.donationCount || 0} donations
              </Badge>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <PhoneIcon className="h-4 w-4 text-green-500" />
            <span>+91-{donor?.contact || "No Contact"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>
              {donor?.createdAt
                ? `Member since ${format(new Date(donor.createdAt), "MMMM yyyy")}`
                : "Member since —"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
