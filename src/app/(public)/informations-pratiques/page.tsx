import { db } from "@/lib/db";
import { InfoPratiquesContent } from "./info-pratiques-content";

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
