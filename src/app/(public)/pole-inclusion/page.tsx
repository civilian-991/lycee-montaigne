import { db } from "@/lib/db";
import { PoleInclusionContent } from "./pole-inclusion-content";

export default async function PoleInclusionPage() {
  const page = await db.page.findUnique({
    where: { slug: "pole-inclusion" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  const sections = page?.sections ?? [];
  return <PoleInclusionContent sections={sections} />;
}
