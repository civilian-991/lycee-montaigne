import type { Metadata } from "next";
import { db } from "@/lib/db";
import { sanitizeSections, cleanHtmlNullable } from "@/lib/sanitize";
import { EtablissementContent } from "./etablissement-content";

export const metadata: Metadata = {
  title: "Établissement | Lycée Montaigne",
  description:
    "Découvrez la mission, la vision et l'équipe de direction du Lycée Montaigne de Beit Chabab.",
};

export default async function EtablissementPage() {
  const [staff, page] = await Promise.all([
    db.staffMember.findMany({ orderBy: { order: "asc" } }),
    db.page.findUnique({
      where: { slug: "etablissement" },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
  ]);
  const sections = sanitizeSections(page?.sections ?? []);
  const sanitizedStaff = staff.map((s) => ({
    ...s,
    messageHtml: cleanHtmlNullable(s.messageHtml),
  }));
  return <EtablissementContent staff={sanitizedStaff} sections={sections} />;
}
