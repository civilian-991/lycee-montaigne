import { db } from "@/lib/db";
import { ExtrascolaireContent } from "./extrascolaire-content";

export default async function ExtrascolairePage() {
  const activities = await db.activityItem.findMany({
    where: { category: "periscolaire" },
    orderBy: { order: "asc" },
  });
  const sportsActivities = await db.activityItem.findMany({
    where: { category: "sportive" },
    orderBy: { order: "asc" },
  });
  return <ExtrascolaireContent activities={activities} sportsActivities={sportsActivities} />;
}
