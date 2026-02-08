import { db } from "@/lib/db";
import { CccContent } from "./ccc-content";

export default async function CccPage() {
  const activities = await db.activityItem.findMany({
    where: { category: "ccc" },
    orderBy: { order: "asc" },
  });
  return <CccContent activities={activities} />;
}
