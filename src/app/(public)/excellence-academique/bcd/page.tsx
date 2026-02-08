import { db } from "@/lib/db";
import { BcdContent } from "./bcd-content";

export default async function BcdPage() {
  const activities = await db.activityItem.findMany({
    where: { category: "bcd" },
    orderBy: { order: "asc" },
  });
  const team = await db.staffMember.findMany({
    where: { section: "bcd" },
    orderBy: { order: "asc" },
  });
  return <BcdContent activities={activities} team={team} />;
}
