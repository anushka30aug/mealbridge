import CollectorProfile from "./partials";

export default async function Profile({
  params,
}: {
  params: Promise<{ collectorId: string }>;
}) {
  const { collectorId } = await params;
  return <CollectorProfile collectorId={collectorId} />;
}
