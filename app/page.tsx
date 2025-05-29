"use client";
import MealHooks from "@/api/meals/hooks";
import { useSocket } from "@/providers/socketProvider";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { socket } = useSocket();
  const {
    useBookMeal,
    useCancelBookedMeal,
    useGetMeals,
    useGetBookedMeals,
    useGetHistory,
  } = MealHooks;

  const queryClient = useQueryClient();

  const {
    mutate: bookMeal,
    isPending: isBookingPending,
    isSuccess: isBookingSuccessful,
    isError: isBookingError,
    error: bookingErrorDetail,
  } = useBookMeal({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-meals"] });
      queryClient.invalidateQueries({ queryKey: ["get-booked-meals"] });
    },
  });

  const {
    mutate: cancelBookedMeal,
    isPending: isCancellationPending,
    isSuccess: isCancellationSuccessful,
    isError: isCancellationError,
    error: cancellationErrorDetail,
  } = useCancelBookedMeal({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-meals"] });
      queryClient.invalidateQueries({ queryKey: ["get-booked-meals"] });
    },
  });

  const {
    data: bookedMeals,
    isLoading: isBookedMealsLoading,
    error: bookedMealsError,
  } = useGetBookedMeals();

  const {
    data: meals,
    isLoading: isMealsLoading,
    error: mealsError,
  } = useGetMeals();

  const {
    data: mealsHistory,
    isLoading: isHistoryLoading,
    error: mealsHistoryError,
  } = useGetHistory();

  const test = () => {
    if (!socket) return;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* NGO Button - Left Aligned */}
      <button onClick={test} className="bg-red-400 p-4 m-6 cursor-grab">
        NGO
      </button>

      {/* Main Content Centered */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Available Meals</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {isMealsLoading && <div>Meals loading...</div>}
          {!meals && (
            <div> No Meals Available in you locality for donation </div>
          )}
          {meals &&
            meals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-full max-w-xs"
              >
                <img
                  src={meal.image}
                  alt="Meal"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2 text-left">
                  <p className="text-gray-700">{meal.foodDesc}</p>
                  <p
                    className={`text-sm font-semibold ${
                      meal.veg ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {meal.veg ? "Vegetarian" : "Non-Vegetarian"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Feeds up to: {meal.feedsUpto}
                  </p>
                  <p className="text-sm text-gray-500">
                    Address: {meal.address}, {meal.city}, {meal.state},{" "}
                    {meal.country}, {meal.postalCode}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {meal.expiryDate}
                  </p>
                  <p className="text-xs text-gray-400">
                    Preferred time: {meal.preferredTime}
                  </p>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-3 w-full cursor-pointer"
                    onClick={() => bookMeal({ mealId: meal._id })}
                  >
                    Book Meal
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-2xl font-bold my-4">Booked Meals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {isBookedMealsLoading && <div>Meals History loading...</div>}
          {!isBookedMealsLoading && bookedMeals?.length === 0 && (
            <div>No Booked Meals...</div>
          )}
          {bookedMeals &&
            bookedMeals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-full max-w-xs"
              >
                <img
                  src={meal.image}
                  alt="Meal"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2 text-left">
                  <p className="text-gray-700">{meal.foodDesc}</p>
                  <p
                    className={`text-sm font-semibold ${
                      meal.veg ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {meal.veg ? "Vegetarian" : "Non-Vegetarian"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Feeds up to: {meal.feedsUpto}
                  </p>
                  <p className="text-sm text-gray-500">
                    Address: {meal.address}, {meal.city}, {meal.state},{" "}
                    {meal.country}, {meal.postalCode}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {meal.expiryDate}
                  </p>
                  <p className="text-xs text-gray-400">
                    Preferred time: {meal.preferredTime}
                  </p>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-3 w-full cursor-pointer"
                    onClick={() => cancelBookedMeal({ mealId: meal._id })}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-2xl font-bold my-4">Meals History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {isHistoryLoading && <div>Meals loading...</div>}

          {!isHistoryLoading && mealsHistory?.length === 0 && (
            <div>No Meal History...</div>
          )}

          {mealsHistory &&
            mealsHistory.map((meal) => (
              <div
                key={meal._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-full max-w-xs"
              >
                <img
                  src={meal.image}
                  alt="Meal"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2 text-left">
                  <p className="text-gray-700">{meal.foodDesc}</p>
                  <p
                    className={`text-sm font-semibold ${
                      meal.veg ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {meal.veg ? "Vegetarian" : "Non-Vegetarian"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Feeds up to: {meal.feedsUpto}
                  </p>
                  <p className="text-sm text-gray-500">
                    Address: {meal.address}, {meal.city}, {meal.state},{" "}
                    {meal.country}, {meal.postalCode}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {meal.expiryDate}
                  </p>
                  <p className="text-xs text-gray-400">
                    Preferred time: {meal.preferredTime}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
