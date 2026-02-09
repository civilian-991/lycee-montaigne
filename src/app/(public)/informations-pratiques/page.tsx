import type { Metadata } from "next";
import { db } from "@/lib/db";
import { InfoPratiquesContent } from "./info-pratiques-content";

export const metadata: Metadata = {
  title: "Informations Pratiques | Lycée Montaigne",
  description:
    "Calendrier scolaire, restauration, santé et informations pratiques du Lycée Montaigne.",
};

export default async function InformationsPratiquesPage() {
  const documents = await db.document.findMany({
    orderBy: { order: "asc" },
  });

  const staff = await db.staffMember.findMany({
    where: { section: "sante" },
    orderBy: { order: "asc" },
  });

  return <InfoPratiquesContent documents={documents} healthStaff={staff} />;
}
