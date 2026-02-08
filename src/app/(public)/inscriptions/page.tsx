import { db } from "@/lib/db";
import { InscriptionsContent } from "./inscriptions-content";

export default async function InscriptionsPage() {
  const documents = await db.document.findMany({
    where: { category: { startsWith: "inscription" } },
    orderBy: { order: "asc" },
  });

  return <InscriptionsContent documents={documents} />;
}
