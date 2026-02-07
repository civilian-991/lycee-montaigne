import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lycee-montaigne.edu.lb";

  const routes = [
    "",
    "/etablissement",
    "/excellence-academique",
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
