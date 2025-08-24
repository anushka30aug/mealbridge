import { GetMealDto } from "@/api/meals/dto/response/get_meals.dto";
import MealIntro from "./MealIntro";
import MealInfo from "./MealInfo";

export default function MealDescription({
  meal,
}: {
  meal: GetMealDto;
}) {
  return (
    <>
      <MealIntro meal={meal} />
      <MealInfo meal={meal} />
    </>
  );
}
