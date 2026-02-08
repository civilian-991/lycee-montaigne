import { db } from "@/lib/db";
import { InscriptionsContent } from "./inscriptions-content";

export default async function InscriptionsPage() {
  const [documents, page] = await Promise.all([
    db.document.findMany({
      where: { category: { startsWith: "inscription" } },
      orderBy: { order: "asc" },
    }),
    db.page.findUnique({
      where: { slug: "inscriptions" },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
  ]);

  const sections = page?.sections ?? [];

  return <InscriptionsContent documents={documents} sections={sections} />;
}
