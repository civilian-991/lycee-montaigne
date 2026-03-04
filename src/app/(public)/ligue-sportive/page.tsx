import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { LigueSportiveContent } from "./ligue-sportive-content";

export const metadata: Metadata = {
  title: "Ligue Sportive | Lycée Montaigne",
  description:
    "Ligue sportive AEFE-UNSS du Lycée Montaigne : compétitions, résultats et événements sportifs.",
  alternates: { canonical: "/ligue-sportive" },
};

export default async function LigueSportivePage() {
  const findPage = () =>
    db.page.findFirst({
      where: { slug: PAGE_SLUGS.ligueSportive, status: "PUBLISHED" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
  let page: Awaited<ReturnType<typeof findPage>> = null;

  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  return <LigueSportiveContent sections={sections} />;
}
