import { Notification } from "@/providers/notification_provider";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface MealReservationCancelledByDonorEventPayload {
  mealId: string;
  donorId: string;
  foodDesc: string;
  message: string;
  image: string;
}
export default function handleMealReservationCancelledByDonor(
  data: MealReservationCancelledByDonorEventPayload,
  queryClient: QueryClient
): Notification {
  toast.error(data.message || "Meal reservation cancelled by donor");

  queryClient.invalidateQueries({ queryKey: ["get-booked-meals"] });
  queryClient.invalidateQueries({ queryKey: ["get-meals"] });

  return {
    id: Date.now().toString(),
    title: "Meal Reservation Cancelled",
    message:
      data.message ||
      `Your meal reservation for ${data.foodDesc} has been cancelled by Donor`,
    link: `/my-meals-history/${data.mealId}`,
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_reservation_cancelled_by_donor",
  };
}
