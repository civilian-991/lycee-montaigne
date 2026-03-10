import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { SanteActivitesContent } from "./sante-activites-content";

export const metadata: Metadata = {
  title: "Activités Santé | Lycée Montaigne",
  description:
    "Actions de prévention et de sensibilisation à la santé menées par l'équipe médicale du Lycée Montaigne : hygiène, sommeil, écrans, premiers secours et bien-être des élèves.",
  alternates: { canonical: "/informations-pratiques/activites" },
};

export default async function SanteActivitesPage() {
  const findPage = () =>
    db.page.findFirst({
      where: { slug: PAGE_SLUGS.santeActivite, status: "PUBLISHED" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
  let page: Awaited<ReturnType<typeof findPage>> = null;

  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  return <SanteActivitesContent sections={sections} />;
}
