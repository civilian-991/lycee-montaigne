import { db } from "@/lib/db";
import { AnciensContent } from "./anciens-content";

export default async function AnciensPage() {
  const rawEvents = await db.alumniEvent.findMany({
    include: { photos: { orderBy: { order: "asc" } } },
    orderBy: { date: "desc" },
  });
  const events = rawEvents.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));
  return <AnciensContent events={events} />;
}
