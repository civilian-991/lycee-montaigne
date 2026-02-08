import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { OffrePedagogiqueContent } from "./offre-pedagogique-content";

/* ── Static Generation ─────────────────────────────────── */

const validSlugs = ["maternelle", "elementaire", "college", "lycee"] as const;

const titles: Record<string, string> = {
  maternelle: "Ecole Maternelle",
  elementaire: "Ecole Elementaire",
  college: "College",
  lycee: "Lycee",
};

/** Maps the URL slug to the CMS page slug */
const slugToPageSlug: Record<string, string> = {
  maternelle: "offre-maternelle",
  elementaire: "offre-elementaire",
  college: "offre-college",
  lycee: "offre-lycee",
};

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = titles[slug];
  if (!title) return { title: "Page introuvable | Lycee Montaigne" };
  return {
    title: `${title} | Lycee Montaigne`,
    description: `Decouvrez le programme ${title} du Lycee Montaigne — un parcours d'excellence pour chaque eleve.`,
  };
}

/* ── Page ───────────────────────────────────────────────── */

export default async function OffrePedagogiquePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) {
    notFound();
  }

  const pageSlug = slugToPageSlug[slug];
  const page = pageSlug
    ? await db.page.findUnique({
        where: { slug: pageSlug },
        include: { sections: { orderBy: { order: "asc" } } },
      })
    : null;

  const sections = page?.sections ?? [];

  return <OffrePedagogiqueContent slug={slug} sections={sections} />;
}
