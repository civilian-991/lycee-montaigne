import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections, cleanHtmlNullable } from "@/lib/sanitize";
import { EtablissementContent } from "./etablissement-content";

export const metadata: Metadata = {
  title: "Établissement | Lycée Montaigne",
  description:
    "Découvrez la mission, la vision et l'équipe de direction du Lycée Montaigne de Beit Chabab.",
  alternates: { canonical: "/etablissement" },
};

export default async function EtablissementPage() {
  const findPage = () => db.page.findFirst({
    where: { slug: PAGE_SLUGS.etablissement, status: "PUBLISHED" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  const findGov = () => db.governanceInstance.findMany({
    orderBy: { order: "asc" },
  });
  let staff: Awaited<ReturnType<typeof db.staffMember.findMany>> = [];
  let page: Awaited<ReturnType<typeof findPage>> = null;
  let governance: Awaited<ReturnType<typeof findGov>> = [];

  try {
    [staff, page, governance] = await Promise.all([
      db.staffMember.findMany({ orderBy: { order: "asc" } }),
      findPage(),
      findGov(),
    ]);
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  const sanitizedStaff = staff.map((s) => ({
    ...s,
    messageHtml: cleanHtmlNullable(s.messageHtml),
  }));
  const governanceData = governance.map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    iconName: g.iconName,
    accentColor: g.accentColor,
  }));
  return (
    <EtablissementContent
      staff={sanitizedStaff}
      sections={sections}
      governanceInstances={governanceData}
    />
  );
}
