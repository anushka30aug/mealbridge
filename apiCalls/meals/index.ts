import { bookMeal } from "./book_meal";
import { cancelBookedMeal } from "./cancel_booked_meal";
import { getBookedMeals } from "./get_booked_meals";
import { getHistory } from "./get_history";
import { getMeals } from "./get_meals";
import { getMealById } from "./get_meal";
const MealsAPI = {
  bookMeal,
  cancelBookedMeal,
  getBookedMeals,
  getHistory,
  getMeals,
  getMealById,
};

export default MealsAPI;
