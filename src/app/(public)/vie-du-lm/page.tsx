import { db } from "@/lib/db";
import { VieContent } from "./vie-content";

export default async function VieDuLMPage() {
  const rawNews = await db.newsItem.findMany({
    orderBy: { publishedAt: "desc" },
    take: 6,
  });

  const news = rawNews.map((n) => ({
    ...n,
    publishedAt: n.publishedAt.toISOString(),
    createdAt: n.createdAt.toISOString(),
    updatedAt: n.updatedAt.toISOString(),
  }));

  return <VieContent news={news} />;
}
