import { MealDetails } from "./partials";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MealPage({ params }: PageProps) {
  const { id } = await params;

  return <MealDetails id={id} />;
}
