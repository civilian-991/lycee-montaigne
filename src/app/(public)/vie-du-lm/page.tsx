import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { getSettings } from "@/lib/settings";
import { VieContent } from "./vie-content";

export const metadata: Metadata = {
  title: "Vie du LM | Lycee Montaigne",
  description:
    "Actualites, developpement durable, webradio et vie scolaire au Lycee Montaigne.",
  alternates: { canonical: "/vie-du-lm" },
};

export default async function VieDuLMPage() {
  const settings = await getSettings();

  const findPage = () => db.page.findUnique({
    where: { slug: PAGE_SLUGS.vieDuLm },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  let rawNews: Awaited<ReturnType<typeof db.newsItem.findMany>> = [];
  let page: Awaited<ReturnType<typeof findPage>> = null;

  try {
    [rawNews, page] = await Promise.all([
      db.newsItem.findMany({ orderBy: { publishedAt: "desc" }, take: 6 }),
      findPage(),
    ]);
  } catch {
    // DB unreachable
  }

  const news = rawNews.map((n) => ({
    ...n,
    publishedAt: n.publishedAt.toISOString(),
    createdAt: n.createdAt.toISOString(),
    updatedAt: n.updatedAt.toISOString(),
  }));

  const sections = sanitizeSections(page?.sections ?? []);
  return (
    <VieContent
      news={news}
      sections={sections}
      webradioReferents={settings.webradio_referents}
    />
  );
}
