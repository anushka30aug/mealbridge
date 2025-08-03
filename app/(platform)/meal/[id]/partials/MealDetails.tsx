"use client";
import { useQueryClient } from "@tanstack/react-query";
import MealHooks from "@/api/meals/hooks";
import { Button, Card, Skeleton } from "@ui";
import { toast } from "sonner";
import { format } from "date-fns";
import { HandHeart } from "lucide-react";
import DonorInfo from "@molecules/DonorInfo";
import MealDescription from "@molecules/MealDescription";
import { BackButton } from "@atoms";

export default function MealDetailsPage({ id }: { id: string }) {
  const mealId = id;
  const queryClient = useQueryClient();
  const { data: meal, isPending, isError } = MealHooks.useGetMealById(mealId);

  const { mutate: cancelBooking, isPending: isCancelling } =
    MealHooks.useCancelBookedMeal({
      onSuccess: (response) => {
        queryClient.setQueryData(["get-meal", response._id], response);
        toast.success("Booking Cancelled", {
          description: "You have cancelled the booking.",
        });
      },
      onError: (err) => {
        toast.error("Cancellation failed", {
          description: err.message || "Something went wrong.",
        });
      },
    });

  const { mutate: bookMeal, isPending: isBooking } = MealHooks.useBookMeal({
    onSuccess: (response) => {
      queryClient.setQueryData(["get-meal", response._id], response);
      toast.success("Meal Booked", {
        description: "You have successfully reserved this meal.",
      });
    },
    onError: (err) => {
      toast.error("Booking failed", {
        description: err.message || "Something went wrong.",
      });
    },
  });

  if (isPending)
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="max-w-2xl m-4 flex flex-col items-center w-full">
          <Skeleton className="w-full h-100 bg-gray-100" />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
            <Skeleton className="h-60 bg-gray-100" />
            <Skeleton className="h-60 bg-gray-100" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-15 mt-2 w-full">
            <Skeleton className="h-10 w-full bg-gray-100" />
            <Skeleton className="h-10 w-full bg-gray-100" />
          </div>
        </div>
      </div>
    );
  if (isError || !meal) {
    throw new Error("Cannot fetch meal");
  }

  const isBookedByUser = meal.status === "reserved" && meal.collectorId;
  const isAvailable = meal.status === "available";
  const isExpired = meal.status === "expired";
  const isDelivered = meal.status === "delivered";

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <BackButton />
      <MealDescription meal={meal} />

      <div className="text-center mt-4">
        {isBookedByUser && meal.donorId && (
          <div className="mt-6">
            <DonorInfo donorId={meal.donorId} />
          </div>
        )}

        {isAvailable && (
          <Button
            variant="default"
            onClick={() => bookMeal({ mealId })}
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200"
          >
            <HandHeart className="h-4 w-4 mr-2" />
            {isPending ? "Booking..." : "Book Meal"}
          </Button>
        )}

        {isBookedByUser && (
          <div className="text-green-700 text-md font-medium space-y-2">
            <p>
              You have booked this meal. Contact the donor and collect it before
              it expires.
            </p>
            <Button
              variant="destructive"
              onClick={() => cancelBooking({ mealId })}
              disabled={isCancelling}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold cursor-pointer rounded-lg transition-all duration-200"
            >
              {isCancelling ? "Cancelling..." : "Cancel Booking"}
            </Button>
          </div>
        )}

        {isExpired && (
          <div className="text-red-600 text-md font-semibold">
            This meal has expired and can no longer be booked.
          </div>
        )}

        {isDelivered && (
          <Card className="p-6 bg-white shadow-md border border-green-200 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 text-xl">✅</span>
              <h2 className="text-lg font-semibold text-gray-800">
                Meal Successfully Delivered
              </h2>
            </div>

            {meal.deliveryDate && (
              <p className="text-sm text-gray-500 text-left">
                <span className="font-medium text-gray-700">Delivered on:</span>{" "}
                {format(new Date(meal.deliveryDate), "MMM dd, yyyy h:mm a")}
              </p>
            )}
            {meal.donorId && <DonorInfo donorId={meal.donorId} />}
          </Card>
        )}
      </div>
    </div>
  );
}
