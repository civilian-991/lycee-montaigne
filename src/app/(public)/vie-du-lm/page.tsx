import { db } from "@/lib/db";
import { VieContent } from "./vie-content";

export default async function VieDuLMPage() {
  const [rawNews, page] = await Promise.all([
    db.newsItem.findMany({ orderBy: { publishedAt: "desc" }, take: 6 }),
    db.page.findUnique({
      where: { slug: "vie-du-lm" },
      include: { sections: { orderBy: { order: "asc" } } },
    }),
  ]);

  const news = rawNews.map((n) => ({
    ...n,
    publishedAt: n.publishedAt.toISOString(),
    createdAt: n.createdAt.toISOString(),
    updatedAt: n.updatedAt.toISOString(),
  }));

  const sections = page?.sections ?? [];
  return <VieContent news={news} sections={sections} />;
}
