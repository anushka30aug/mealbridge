import { QueryClient } from "@tanstack/react-query";
import { Notification } from "@/providers/notification_provider";
import { toast } from "sonner";

export type MealExpiredEventPayload = {
  mealId: string;
  donorId: string;
  message: string;
  foodDesc: string;
  image: string;
};
export default function handleMealExpired(
  data: MealExpiredEventPayload,
  queryClient: QueryClient
): Notification {
  toast.error(data.message || `Your booked meal has expired`);

  queryClient.invalidateQueries({ queryKey: ["get-booked-meals"] });
  queryClient.invalidateQueries({ queryKey: ["get-history"] });

  return {
    id: Date.now().toString(),
    title: "Meal Expired",
    message: data.message || `Your booked ${data.foodDesc} has expired`,
    link: "/",
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_expired",
  };
}
