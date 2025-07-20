import { Skeleton } from "@ui";
import { Card, CardContent, CardHeader } from "@ui";
import { User, MapPin } from "lucide-react";

export default function ProfileSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card className="border border-green-200 shadow-lg rounded-xl bg-white">
        <CardHeader className="flex items-center justify-between px-4 py-1">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-green-700" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-8 w-24 rounded-md" />
        </CardHeader>

        <CardContent className="space-y-6 px-5 pb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-green-100 shadow-sm rounded-lg p-3 text-center"
              >
                <Skeleton className="h-3 w-24 mx-auto mb-2" />
                <Skeleton className="h-5 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-green-200 shadow rounded-xl bg-white">
        <CardHeader className="px-4 py-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-700" />
            <Skeleton className="h-5 w-32" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 px-4 pb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[70%]" />
        </CardContent>
      </Card>
    </div>
  );
}
