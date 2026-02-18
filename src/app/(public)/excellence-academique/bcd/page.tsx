import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { BcdContent } from "./bcd-content";

export const metadata: Metadata = {
  title: "BCD",
  description:
    "Bibliotheque Centre de Documentation du Lycee Montaigne — activites de lecture, animations et ressources pour les eleves.",
  alternates: { canonical: "/excellence-academique/bcd" },
};

export default async function BcdPage() {
  const settings = await getSettings();

  let activities: Awaited<ReturnType<typeof db.activityItem.findMany>> = [];
  let team: Awaited<ReturnType<typeof db.staffMember.findMany>> = [];

  try {
    [activities, team] = await Promise.all([
      db.activityItem.findMany({
        where: { category: "bcd" },
        orderBy: { order: "asc" },
      }),
      db.staffMember.findMany({
        where: { section: "bcd" },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch {
    // DB unreachable
  }

  return (
    <BcdContent
      activities={activities}
      team={team}
      bcdFunctions={settings.bcd_functions}
    />
  );
}
