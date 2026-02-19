import type { Metadata } from "next";
import { db } from "@/lib/db";
import { HomeContent } from "./home-content";

export const metadata: Metadata = {
  title: "Accueil | Lycee Montaigne",
  description:
    "Bienvenue au Lycee Montaigne de Beit Chabab — etablissement scolaire francophone au Liban, de la maternelle a la terminale.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  let quickLinks: Awaited<ReturnType<typeof db.quickLink.findMany>> = [];
  let rawNews: Awaited<ReturnType<typeof db.newsItem.findMany>> = [];
  let heroSlides: Awaited<ReturnType<typeof db.carouselSlide.findMany>> = [];
  let rawSettings: Awaited<ReturnType<typeof db.siteSetting.findMany>> = [];

  try {
    [quickLinks, rawNews, heroSlides, rawSettings] = await Promise.all([
      db.quickLink.findMany({ orderBy: { order: "asc" } }),
      db.newsItem.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, take: 3 }),
      db.carouselSlide.findMany({ orderBy: { order: "asc" } }),
      db.siteSetting.findMany(),
    ]);
  } catch {
    // DB unreachable — continue with empty data
  }

  // Serialize Date objects to ISO strings so they can be passed as props
  const featuredNews = rawNews.map((n) => ({
    ...n,
    publishedAt: n.publishedAt.toISOString(),
    createdAt: n.createdAt.toISOString(),
    updatedAt: n.updatedAt.toISOString(),
  }));

  const settingsMap = Object.fromEntries(rawSettings.map((s) => [s.key, s.value]));

  return (
    <HomeContent
      quickLinks={quickLinks}
      featuredNews={featuredNews}
      heroSlides={heroSlides}
      settings={settingsMap}
    />
  );
}
