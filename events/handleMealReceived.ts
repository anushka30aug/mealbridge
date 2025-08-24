import { toast } from "sonner";
import { Notification } from "@/providers/notification_provider";
import { QueryClient } from "@tanstack/react-query";

export interface MealReceivedEventPayload {
  mealId: string;
  collectorId: string;
  donorName: string;
  message: string;
  foodDesc: string;
  image: string;
}

export default function handleMealReceived(
  data: MealReceivedEventPayload,
  queryClient: QueryClient
): Notification {
  toast.success(data.message || "Meal received successfully!");

  queryClient.invalidateQueries({ queryKey: ["get-booked-meals"] });
  queryClient.invalidateQueries({ queryKey: ["get-meal", data.mealId] });
  queryClient.invalidateQueries({ queryKey: ["get-meals"] });
  queryClient.invalidateQueries({ queryKey: ["get-history"] });

  return {
    id: Date.now().toString(),
    title: "Meal Received",
    message:
      data.message ||
      `you have successfully received meal from ${data.donorName}`,
    link: `/my-meals-history/${data.mealId}`,
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_received",
  };
}
