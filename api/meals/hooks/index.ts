import { useBookMeal } from "./book_meal";
import { useCancelBookedMeal } from "./cancel_booked_meal";
import { useGetBookedMeals } from "./get_booked_meals";
import { useGetHistory } from "./get_history";
import { useGetMeals } from "./get_meals";

const MealHooks = {
  useBookMeal,
  useCancelBookedMeal,
  useGetBookedMeals,
  useGetHistory,
  useGetMeals,
};

export default MealHooks;
