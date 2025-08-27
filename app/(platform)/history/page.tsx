"use client";
import MealHooks from "@/api/meals/hooks";
import HistoryCard from "./partials/HistoryCard";
import { useRouter } from "next/navigation";
import { Skeleton } from "@ui"; // shadcn/ui Skeleton
import { BackButton } from "@atoms";

export default function History() {
  const { data: meals, isLoading, error } = MealHooks.useGetHistory();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="space-y-3">
              <Skeleton className="h-70 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) throw new Error("Failed to load meals, please try again.");

  return (
    <div className="px-4 py-6 mx-auto">
      <BackButton />
      <div className="flex items-center justify-center lg:justify-start flex-wrap gap-6 m-6">
        {meals?.map((meal) => (
          <HistoryCard
            key={meal._id}
            item={meal}
            onAction={(item) => router.push(`/meal/${item._id}`)}
          />
        ))}
      </div>
    </div>
  );
}
