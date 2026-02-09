import type { Metadata } from "next";
import { db } from "@/lib/db";
import { sanitizeSections } from "@/lib/sanitize";
import { PoleInclusionContent } from "./pole-inclusion-content";

export const metadata: Metadata = {
  title: "Pôle Inclusion | Lycée Montaigne",
  description:
    "Le pôle inclusion du Lycée Montaigne pour un accompagnement adapté de chaque élève.",
};

export default async function PoleInclusionPage() {
  const page = await db.page.findUnique({
    where: { slug: "pole-inclusion" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  const sections = sanitizeSections(page?.sections ?? []);
  return <PoleInclusionContent sections={sections} />;
}
