import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lycee-montaigne.edu.lb";

  const staticRoutes = [
    "",
    "/etablissement",
    "/excellence-academique",
    "/excellence-academique/bcd",
    "/excellence-academique/ccc",
    "/excellence-academique/offre-pedagogique/maternelle",
    "/excellence-academique/offre-pedagogique/elementaire",
    "/excellence-academique/offre-pedagogique/college",
    "/excellence-academique/offre-pedagogique/lycee",
    "/inscriptions",
    "/vie-du-lm",
    "/orientation",
    "/extrascolaire",
    "/informations-pratiques",
    "/contact",
    "/anciens",
    "/pole-inclusion",
    "/sejours-pedagogiques",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Add dynamic governance instance pages from DB
  try {
    const instances = await db.governanceInstance.findMany({
      select: { slug: true, updatedAt: true },
    });
    for (const inst of instances) {
      entries.push({
        url: `${baseUrl}/etablissement/fonctionnement/${inst.slug}`,
        lastModified: inst.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // DB unreachable at build time — hardcoded fallback
    const fallbackSlugs = [
      "conseil-strategique",
      "conseil-etablissement",
      "conseil-ecole",
      "conseil-pedagogique",
      "conseil-discipline",
      "conseil-classe",
      "conseil-vie-collegienne",
      "commission-hygiene-securite",
      "conseil-vie-lyceenne",
      "cellule-formation",
      "cesce",
    ];
    for (const slug of fallbackSlugs) {
      entries.push({
        url: `${baseUrl}/etablissement/fonctionnement/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
