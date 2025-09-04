import { GetMealDto } from "@/apiCalls/meals/dto/response/get_meals.dto";
import MealTime from "./MealTime";
import { AddressCard } from "@molecules";
export default function MealInfo({ meal }: { meal: GetMealDto }) {
  const mealAddress = {
    address: meal.address,
    city: meal.city,
    state: meal.state,
    country: meal.country,
    postalCode: meal.postalCode,
  };

  const mealTime = {
    preferredTime: meal.preferredTime,
    deliveryDate: meal?.deliveryDate,
    expiryDate: meal.expiryDate,
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <AddressCard mealAddress={mealAddress} />
      <MealTime mealTime={mealTime} />
    </div>
  );
}
