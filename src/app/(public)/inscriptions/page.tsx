import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { getSettings } from "@/lib/settings";
import { InscriptionsContent } from "./inscriptions-content";

export const metadata: Metadata = {
  title: "Inscriptions et Reinscriptions | Lycee Montaigne",
  description:
    "Procedures d'inscription, reinscription, portes ouvertes et bourses scolaires au Lycee Montaigne.",
  alternates: { canonical: "/inscriptions" },
};

export default async function InscriptionsPage() {
  const settings = await getSettings();

  const findPage = () => db.page.findFirst({
    where: { slug: PAGE_SLUGS.inscriptions, status: "PUBLISHED" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  let page: Awaited<ReturnType<typeof findPage>> = null;
  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);

  return (
    <InscriptionsContent
      sections={sections}
      inscriptionDocuments={settings.inscription_documents}
    />
  );
}
