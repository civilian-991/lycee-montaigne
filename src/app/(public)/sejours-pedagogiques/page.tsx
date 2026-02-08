import { db } from "@/lib/db";
import { SejoursContent } from "./sejours-content";

export default async function SejoursPedagogiquesPage() {
  const page = await db.page.findUnique({
    where: { slug: "sejours-pedagogiques" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  const sections = page?.sections ?? [];
  return <SejoursContent sections={sections} />;
}
