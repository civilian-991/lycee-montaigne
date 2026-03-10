import type { Metadata } from "next";
import { db } from "@/lib/db";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { HomeContent } from "./home-content";

export const metadata: Metadata = {
  title: "Accueil | Lycée Montaigne",
  description:
    "Bienvenue au Lycée Montaigne de Beit Chabab — établissement scolaire francophone au Liban, de la maternelle à la terminale.",
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

  const settingsMap: Record<string, string> = {
    // Seed defaults for JSON settings that may be missing from DB
    homepage_reasons: JSON.stringify(DEFAULT_SETTINGS.homepage_reasons),
    trait_union_title: DEFAULT_SETTINGS.trait_union_title,
    trait_union_description: DEFAULT_SETTINGS.trait_union_description,
    trait_union_image: DEFAULT_SETTINGS.trait_union_image,
    trait_union_link: DEFAULT_SETTINGS.trait_union_link,
    // DB values override defaults
    ...Object.fromEntries(rawSettings.map((s) => [s.key, s.value])),
  };

  return (
    <HomeContent
      quickLinks={quickLinks}
      featuredNews={featuredNews}
      heroSlides={heroSlides}
      settings={settingsMap}
    />
  );
}
