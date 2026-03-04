import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { CvlContent } from "./cvl-content";

export const metadata: Metadata = {
  title: "Conseil de Vie Lycéenne (CVL) | Lycée Montaigne",
  description:
    "Le conseil de vie lycéenne (CVL) du Lycée Montaigne : rôle, composition, domaines de consultation et fonctionnement.",
  alternates: { canonical: "/vie-du-lm/climat/cvl" },
};

export default async function CvlPage() {
  const findPage = () =>
    db.page.findFirst({
      where: { slug: PAGE_SLUGS.cvl, status: "PUBLISHED" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
  let page: Awaited<ReturnType<typeof findPage>> = null;

  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  return <CvlContent sections={sections} />;
}
