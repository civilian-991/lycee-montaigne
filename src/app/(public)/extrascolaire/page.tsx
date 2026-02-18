import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ExtrascolaireContent } from "./extrascolaire-content";

export const metadata: Metadata = {
  title: "Extrascolaire | Lycée Montaigne",
  description:
    "Activités périscolaires et association sportive au Lycée Montaigne de Beit Chabab.",
  alternates: { canonical: "/extrascolaire" },
};

export default async function ExtrascolairePage() {
  let activities: Awaited<ReturnType<typeof db.activityItem.findMany>> = [];
  let sportsActivities: Awaited<ReturnType<typeof db.activityItem.findMany>> = [];

  try {
    [activities, sportsActivities] = await Promise.all([
      db.activityItem.findMany({
        where: { category: "periscolaire" },
        orderBy: { order: "asc" },
      }),
      db.activityItem.findMany({
        where: { category: "sportive" },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch {
    // DB unreachable
  }

  return <ExtrascolaireContent activities={activities} sportsActivities={sportsActivities} />;
}
