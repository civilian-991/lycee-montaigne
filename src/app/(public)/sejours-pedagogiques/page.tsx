import type { Metadata } from "next";
import { db } from "@/lib/db";
import { sanitizeSections } from "@/lib/sanitize";
import { SejoursContent } from "./sejours-content";

export const metadata: Metadata = {
  title: "Séjours Pédagogiques | Lycée Montaigne",
  description:
    "Séjours pédagogiques et voyages éducatifs organisés par le Lycée Montaigne.",
};

export default async function SejoursPedagogiquesPage() {
  const page = await db.page.findUnique({
    where: { slug: "sejours-pedagogiques" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  const sections = sanitizeSections(page?.sections ?? []);
  return <SejoursContent sections={sections} />;
}
