import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ActualitesContent } from "./actualites-content";

export const metadata: Metadata = {
  title: "Actualités | Lycée Montaigne",
  description:
    "Toutes les actualités du Lycée Montaigne : événements, projets, vie scolaire.",
  alternates: { canonical: "/actualites" },
};

export default async function ActualitesPage() {
  let rawNews: Awaited<ReturnType<typeof db.newsItem.findMany>> = [];

  try {
    rawNews = await db.newsItem.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // DB unreachable
  }

  const news = rawNews.map((n) => ({
    id: n.id,
    title: n.title,
    image: n.image,
    link: n.link,
    category: n.category,
    publishedAt: n.publishedAt.toISOString(),
  }));

  return <ActualitesContent news={news} />;
}
