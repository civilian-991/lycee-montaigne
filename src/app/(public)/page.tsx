import { db } from "@/lib/db";
import { HomeContent } from "./home-content";

export default async function HomePage() {
  const [quickLinks, rawNews, heroSlides, settings] = await Promise.all([
    db.quickLink.findMany({ orderBy: { order: "asc" } }),
    db.newsItem.findMany({ orderBy: { publishedAt: "desc" }, take: 3 }),
    db.carouselSlide.findMany({ orderBy: { order: "asc" } }),
    db.siteSetting.findMany(),
  ]);

  // Serialize Date objects to ISO strings so they can be passed as props
  const featuredNews = rawNews.map((n) => ({
    ...n,
    publishedAt: n.publishedAt.toISOString(),
    createdAt: n.createdAt.toISOString(),
    updatedAt: n.updatedAt.toISOString(),
  }));

  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <HomeContent
      quickLinks={quickLinks}
      featuredNews={featuredNews}
      heroSlides={heroSlides}
      settings={settingsMap}
    />
  );
}
