import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { SejoursContent } from "./sejours-content";

export const metadata: Metadata = {
  title: "Séjours Pédagogiques | Lycée Montaigne",
  description:
    "Séjours pédagogiques et voyages éducatifs organisés par le Lycée Montaigne.",
  alternates: { canonical: "/sejours-pedagogiques" },
};

export default async function SejoursPedagogiquesPage() {
  const findPage = () => db.page.findFirst({
    where: { slug: PAGE_SLUGS.sejoursPedagogiques, status: "PUBLISHED" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  let page: Awaited<ReturnType<typeof findPage>> = null;
  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  return <SejoursContent sections={sections} />;
}
