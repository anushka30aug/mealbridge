import { cn } from "@/lib/utils";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@ui";
import { ChefHat, Clock, Globe, MapPin } from "lucide-react";

export default function GlobalStats() {
  const globalStats = [
    {
      icon: <Globe className="h-8 w-8 text-red-500" />,
      value: "733M",
      label: "People Face Hunger",
      description: "People worldwide were chronically undernourished in 2023",
      bgGradient: "from-red-50 to-red-100",
      badge: "Global Data",
      badgeColor: "bg-red-100 text-red-700",
    },
    {
      icon: <MapPin className="h-8 w-8 text-orange-500" />,
      value: "1.05B",
      label: "Tons Food Wasted",
      description: "Food wasted globally each year, enough for 1B meals daily",
      bgGradient: "from-orange-50 to-orange-100",
      badge: "Global Data",
      badgeColor: "bg-orange-100 text-orange-700",
    },
    {
      icon: <ChefHat className="h-8 w-8 text-yellow-500" />,
      value: "2.8B",
      label: "Cannot Afford Healthy Diet",
      description: "People globally unable to afford a healthy diet in 2022",
      bgGradient: "from-yellow-50 to-yellow-100",
      badge: "Global Data",
      badgeColor: "bg-yellow-100 text-yellow-700",
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      value: "58M",
      label: "At Risk of Starvation",
      description: "People at risk of famine due to funding gaps in 2024",
      bgGradient: "from-purple-50 to-purple-100",
      badge: "Global Data",
      badgeColor: "bg-purple-100 text-purple-700",
    },
  ];
  return (
    <div className="my-5">
      <h1 className="text-lg font-bold text-center p-2 m-2 pb-0 mb-0 text-transparent bg-clip-text bg-gradient-to-b from-[#278049] to-green-600 ">
        The Global Challenge We're Addressing
      </h1>
      <p className="text-gray-600 text-md text-center p-2 mb-2 pt-0 mt-0">
        Understanding the scale of global hunger helps us appreciate the
        importance of every food donation and action.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {globalStats.map((val, indx) => {
          return (
            <Card
              key={indx}
              className={cn(
                "p-4 border-none shadow-md max-w-[400px] mx-auto hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2",
                "bg-gradient-to-br",
                val.bgGradient
              )}
            >
              <CardHeader className="flex items-center justify-between">
                {val.icon}
                <Badge className={val.badgeColor}>{val.badge}</Badge>
              </CardHeader>
              <CardContent>
                <h1 className="text-lg font-bold ">{val.value}</h1>

                <CardTitle>{val.label}</CardTitle>
                <p className="text-sm text-gray-600 pt-2">{val.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
