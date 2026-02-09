import type { Metadata } from "next";
import { db } from "@/lib/db";
import { sanitizeSections } from "@/lib/sanitize";
import { VieContent } from "./vie-content";

export const metadata: Metadata = {
  title: "Vie du LM | Lycée Montaigne",
  description:
    "Actualités, développement durable, webradio et vie scolaire au Lycée Montaigne.",
};

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

  const sections = sanitizeSections(page?.sections ?? []);
  return <VieContent news={news} sections={sections} />;
}
