import { Badge, Button } from "@ui";
import { ArrowDown, Shield, Star, TrendingUp, Utensils } from "lucide-react";

export default function IntroSection({
  handleScroll,
}: {
  handleScroll: () => void;
}) {
  const impact = [
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      desc: "Every food item donated can feed multiple families",
    },
    {
      icon: <Shield className="text-green-600" />,
      desc: "100% transparency - track your food donation impact",
    },
    {
      icon: <TrendingUp className="text-green-500" />,
      desc: "Join the fight against global food insecurity",
    },
  ];
  return (
    <div className="md:min-h-screen flex flex-wrap flex-col gap-5 items-center pt-20 px-auto bg-gradient-to-r from-[#f0f9f4] via-white to-[#f0f9f4]">
      <div className=" text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#278049] to-green-500 bg-clip-text text-transparent pb-1">
          MealBridge
        </h1>
        <span className="text-sm font-medium text-gray-600">
          Bringing Hope To Hunger
        </span>
      </div>
      <Badge variant="secondary">🌟 Connecting Communities Through Food</Badge>

      <div className="text-4xl md:text-6xl font-bold mt-5">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#278049] via-green-600 to-[#278049] pb-1 md:pb-3">
          Fighting Hunger,
        </h1>
        <h1>Building Bridges</h1>
      </div>
      <p className="text-lg text-gray-600 text-center px-3 ">
        Join our mission to eliminate food insecurity by sharing your surplus
        food. Every meal donated creates a bridge of hope and nourishment for
        those in need.
      </p>
      <Button
        className="border-none bg-green-600 font-medium flex items-center hover:bg-green-700 cursor-pointer"
        onClick={handleScroll}
      >
        <Utensils className="mr-2 h-2 w-2" />
        Donate Food
        <ArrowDown className="ml-2 h-2 w-2 animate-bounce" />
      </Button>
      <div className="mt-2 flex flex-wrap justify-center items-center sm:gap-4 ">
        {impact.map((val, indx) => (
          <div
            className="flex items-center gap-4 border-1 border-green-100 rounded-lg w-full p-4 m-3 bg-white text-center text-gray-600 font-medium sm:max-w-[300px] sm:shadow-md m-0"
            key={indx}
          >
            {val.icon}
            {val.desc}
          </div>
        ))}
      </div>
    </div>
  );
}
