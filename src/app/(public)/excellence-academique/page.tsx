import { db } from "@/lib/db";
import { ExcellenceContent } from "./excellence-content";

export default async function ExcellenceAcademiquePage() {
  const certifications = await db.certification.findMany({
    orderBy: { order: "asc" },
  });

  return <ExcellenceContent certifications={certifications} />;
}
