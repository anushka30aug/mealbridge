import { MapPin } from "lucide-react";

export default function LocationBanner({ location }: { location: string | null }) {
  return (
    <div className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-xl text-sm font-medium mb-4 flex items-center gap-2">
      <MapPin className="w-4 h-4 text-green-700" />
      <span className="truncate">{location}</span>
    </div>
  );
}
