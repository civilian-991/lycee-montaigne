import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { getSettings } from "@/lib/settings";
import { OrientationContent } from "./orientation-content";

export const metadata: Metadata = {
  title: "Orientation | Lycee Montaigne",
  description:
    "Parcours avenir, Parcoursup et accompagnement a l'orientation au Lycee Montaigne.",
  alternates: { canonical: "/orientation" },
};

export default async function OrientationPage() {
  const settings = await getSettings();

  const findPage = () => db.page.findFirst({
    where: { slug: PAGE_SLUGS.orientation, status: "PUBLISHED" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  let documents: Awaited<ReturnType<typeof db.document.findMany>> = [];
  let page: Awaited<ReturnType<typeof findPage>> = null;
  let rawActivities: Awaited<ReturnType<typeof db.activityItem.findMany>> = [];

  try {
    [documents, page, rawActivities] = await Promise.all([
      db.document.findMany({
        where: { category: { startsWith: "orientation" } },
        orderBy: { order: "asc" },
      }),
      findPage(),
      db.activityItem.findMany({
        where: { category: "orientation" },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  const activities = rawActivities.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    image: a.image,
    category: a.category,
    order: a.order,
  }));

  return (
    <OrientationContent
      documents={documents}
      sections={sections}
      activities={activities}
      universities={settings.universities}
    />
  );
}
