import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { AnciensContent } from "./anciens-content";

export const metadata: Metadata = {
  title: "Anciens Eleves | Lycee Montaigne",
  description:
    "Retrouvez les evenements et photos des anciens eleves du Lycee Montaigne.",
  alternates: { canonical: "/anciens" },
};

export default async function AnciensPage() {
  const settings = await getSettings();

  const findEvents = () => db.alumniEvent.findMany({
    include: { photos: { orderBy: { order: "asc" } } },
    orderBy: { date: "desc" },
  });
  let rawEvents: Awaited<ReturnType<typeof findEvents>> = [];
  try {
    rawEvents = await findEvents();
  } catch {
    // DB unreachable
  }

  const events = rawEvents.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return (
    <AnciensContent
      events={events}
      alumniCommittee={settings.alumni_committee}
      alumniSubcommittees={settings.alumni_subcommittees}
    />
  );
}
