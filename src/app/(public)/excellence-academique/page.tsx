import { db } from "@/lib/db";
import { ExcellenceContent } from "./excellence-content";

export default async function ExcellenceAcademiquePage() {
  const [certifications, page] = await Promise.all([
    db.certification.findMany({ orderBy: { order: "asc" } }),
    db.page.findUnique({
      where: { slug: "excellence-academique" },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
  ]);

  const sections = page?.sections ?? [];
  return <ExcellenceContent certifications={certifications} sections={sections} />;
}
