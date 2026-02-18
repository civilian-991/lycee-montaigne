import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { CccContent } from "./ccc-content";

export const metadata: Metadata = {
  title: "CCC",
  description:
    "Centre de Connaissances et de Culture du Lycee Montaigne — espace de recherche, lecture et culture pour les collegiens et lyceens.",
  alternates: { canonical: "/excellence-academique/ccc" },
};

export default async function CccPage() {
  const settings = await getSettings();

  let activities: Awaited<ReturnType<typeof db.activityItem.findMany>> = [];
  try {
    activities = await db.activityItem.findMany({
      where: { category: "ccc" },
      orderBy: { order: "asc" },
    });
  } catch {
    // DB unreachable
  }

  return (
    <CccContent
      activities={activities}
      cccFunctions={settings.ccc_functions}
      cccResources={settings.ccc_resources}
      cccEmail={settings.ccc_email}
    />
  );
}
