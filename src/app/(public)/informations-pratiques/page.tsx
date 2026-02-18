import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { InfoPratiquesContent } from "./info-pratiques-content";

export const metadata: Metadata = {
  title: "Informations Pratiques | Lycee Montaigne",
  description:
    "Calendrier scolaire, restauration, sante et informations pratiques du Lycee Montaigne.",
  alternates: { canonical: "/informations-pratiques" },
};

export default async function InformationsPratiquesPage() {
  const settings = await getSettings();

  let documents: Awaited<ReturnType<typeof db.document.findMany>> = [];
  let staff: Awaited<ReturnType<typeof db.staffMember.findMany>> = [];

  try {
    [documents, staff] = await Promise.all([
      db.document.findMany({ orderBy: { order: "asc" } }),
      db.staffMember.findMany({
        where: { section: "sante" },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch {
    // DB unreachable
  }

  return (
    <InfoPratiquesContent
      documents={documents}
      healthStaff={staff}
      supplyLists={settings.supply_lists}
      healthReferents={settings.health_referents}
    />
  );
}
