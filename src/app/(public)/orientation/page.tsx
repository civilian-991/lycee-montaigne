import { db } from "@/lib/db";
import { OrientationContent } from "./orientation-content";

export default async function OrientationPage() {
  const [documents, page, rawActivities] = await Promise.all([
    db.document.findMany({
      where: { category: { startsWith: "orientation" } },
      orderBy: { order: "asc" },
    }),
    db.page.findUnique({
      where: { slug: "orientation" },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
    db.activityItem.findMany({
      where: { category: "orientation" },
      orderBy: { order: "asc" },
    }),
  ]);

  const sections = page?.sections ?? [];
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
    />
  );
}
