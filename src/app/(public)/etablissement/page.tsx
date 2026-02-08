import { db } from "@/lib/db";
import { EtablissementContent } from "./etablissement-content";

export default async function EtablissementPage() {
  const [staff, page] = await Promise.all([
    db.staffMember.findMany({ orderBy: { order: "asc" } }),
    db.page.findUnique({
      where: { slug: "etablissement" },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
  ]);
  const sections = page?.sections ?? [];
  return <EtablissementContent staff={staff} sections={sections} />;
}
