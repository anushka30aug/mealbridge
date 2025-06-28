import { Notification } from "@/providers/notification_provider";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface mealCancelledEventPayload {
  mealId: string;
  donorId: string;
  foodDesc: string;
  image: string;
  message: string;
}
export default function handleMealCancelled(
  data: mealCancelledEventPayload,
  queryClient: QueryClient
): Notification {
  toast.error(data.message || `Meal cancelled by donor`);
  queryClient.invalidateQueries({ queryKey: ["get-history"] });
  queryClient.invalidateQueries({ queryKey: ["get-booked-meals"] });

  return {
    id: Date.now().toString(),
    title: "Meal Cancelled",
    message:
      data.message || `Donor has cancelled Donation of  ${data.foodDesc}`,
    link: `/my-meals-history/${data.mealId}`,
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_cancelled",
  };
}
