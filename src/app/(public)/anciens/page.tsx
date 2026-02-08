import { db } from "@/lib/db";
import { AnciensContent } from "./anciens-content";

export default async function AnciensPage() {
  const [rawEvents, committeeStaff] = await Promise.all([
    db.alumniEvent.findMany({
      include: { photos: { orderBy: { order: "asc" } } },
      orderBy: { date: "desc" },
    }),
    db.staffMember.findMany({
      where: { section: "alumni" },
      orderBy: { order: "asc" },
    }),
  ]);

  const events = rawEvents.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return <AnciensContent events={events} committeeStaff={committeeStaff} />;
}
