import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { EgaliteActiviteContent } from "./egalite-activite-content";

export const metadata: Metadata = {
  title: "Activités Égalité | Lycée Montaigne",
  description:
    "Les activités et projets en faveur de l'égalité au Lycée Montaigne.",
  alternates: { canonical: "/vie-du-lm/egalite/activite" },
};

export default async function EgaliteActivitePage() {
  const findPage = () =>
    db.page.findFirst({
      where: { slug: PAGE_SLUGS.egaliteActivite, status: "PUBLISHED" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
  let page: Awaited<ReturnType<typeof findPage>> = null;

  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  return <EgaliteActiviteContent sections={sections} />;
}
