import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { getSettings } from "@/lib/settings";
import { PoleInclusionContent } from "./pole-inclusion-content";

export const metadata: Metadata = {
  title: "Pole Inclusion | Lycee Montaigne",
  description:
    "Le pole inclusion du Lycee Montaigne pour un accompagnement adapte de chaque eleve.",
  alternates: { canonical: "/pole-inclusion" },
};

export default async function PoleInclusionPage() {
  const settings = await getSettings();

  const findPage = () => db.page.findUnique({
    where: { slug: PAGE_SLUGS.poleInclusion },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  let page: Awaited<ReturnType<typeof findPage>> = null;
  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  return <PoleInclusionContent sections={sections} pillars={settings.pole_inclusion_pillars} />;
}
