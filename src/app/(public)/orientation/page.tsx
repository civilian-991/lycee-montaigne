import { db } from "@/lib/db";
import { OrientationContent } from "./orientation-content";

export default async function OrientationPage() {
  const documents = await db.document.findMany({
    where: { category: { startsWith: "orientation" } },
    orderBy: { order: "asc" },
  });

  return <OrientationContent documents={documents} />;
}
