import { useBookMeal } from "./book_meal";
import { useCancelBookedMeal } from "./cancel_booked_meal";
import { useGetBookedMeals } from "./get_booked_meals";
import { useGetHistory } from "./get_history";
import { useGetMeals } from "./get_meals";
import { useGetMealById } from "./get_meal";
const MealHooks = {
  useBookMeal,
  useCancelBookedMeal,
  useGetBookedMeals,
  useGetHistory,
  useGetMeals,
  useGetMealById,
};

export default MealHooks;
