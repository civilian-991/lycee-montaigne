import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ExtrascolaireContent } from "./extrascolaire-content";

export const metadata: Metadata = {
  title: "Extrascolaire | Lycée Montaigne",
  description:
    "Activités périscolaires et association sportive au Lycée Montaigne de Beit Chabab.",
};

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
