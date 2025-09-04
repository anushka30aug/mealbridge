"use client";
import { GetHistoryDto } from "@/apiCalls/meals/dto/response/get_history.dto";
import { StatusBadge, VegBadge } from "@atoms";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui";
import {
  Calendar,
  Clock,
  MapPin,
  Package,
  Users,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

import { useState } from "react";

export default function HistoryCard({
  item,
  onAction,
}: {
  item: GetHistoryDto;
  onAction?: (meal: GetHistoryDto) => void;
}) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border border-gray-100 bg-white rounded-2xl overflow-hidden hover:scale-[1.01]">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex items-start gap-3 w-full">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
              {!imageError ? (
                <Image
                  src={item.image}
                  alt={item.foodDesc}
                  fill
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight mb-2">
                {item.foodDesc}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <VegBadge isVeg={item.veg} />
                <StatusBadge status={item.status} />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 col-span-2 sm:col-span-1">
            <Users className="w-4 h-4" />
            <span>
              Feeds up to {item.feedsUpto || "?"}{" "}
              {item.feedsUpto > 1 ? "people" : "person"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 col-span-2 sm:col-span-1">
            <Clock className="w-4 h-4" />
            <span>
              Preferred: {formatDate(item.preferredTime) || "Anytime"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 col-span-2 sm:col-span-1">
            <MapPin className="w-4 h-4" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="truncate max-w-[150px]">
                    {item.city || "Unknown"}, {item.state || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {item.city}, {item.state}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Expires: {formatDate(item.expiryDate)}</span>
          </div>
        </div>

        {item.deliveryDate && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-700" />
            <span className="text-green-700 font-medium">
              Delivered on {formatDate(item.deliveryDate)}
            </span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 hidden sm:block">
            Created {formatDate(item.createdAt)}
          </span>
          <Button
            onClick={() => onAction?.(item)}
            variant="default"
            size="sm"
            className="bg-[#005e38] text-white hover:bg-green-800 hover:scale-105 transition-transform shadow-md cursor-pointer w-full sm:w-auto"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
