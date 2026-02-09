import type { Metadata } from "next";
import { db } from "@/lib/db";
import { sanitizeSections } from "@/lib/sanitize";
import { InscriptionsContent } from "./inscriptions-content";

export const metadata: Metadata = {
  title: "Inscriptions et Réinscriptions | Lycée Montaigne",
  description:
    "Procédures d'inscription, réinscription, portes ouvertes et bourses scolaires au Lycée Montaigne.",
};

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

  const sections = sanitizeSections(page?.sections ?? []);

  return <InscriptionsContent documents={documents} sections={sections} />;
}
