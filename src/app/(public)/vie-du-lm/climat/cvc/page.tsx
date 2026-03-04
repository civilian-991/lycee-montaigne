import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PAGE_SLUGS } from "@/lib/page-slugs";
import { sanitizeSections } from "@/lib/sanitize";
import { CvcContent } from "./cvc-content";

export const metadata: Metadata = {
  title: "Conseil de Vie Collégienne (CVC) | Lycée Montaigne",
  description:
    "Le conseil de vie collégienne (CVC) du Lycée Montaigne : rôle, composition et activités.",
  alternates: { canonical: "/vie-du-lm/climat/cvc" },
};

export default async function CvcPage() {
  const findPage = () =>
    db.page.findFirst({
      where: { slug: PAGE_SLUGS.cvc, status: "PUBLISHED" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
  let page: Awaited<ReturnType<typeof findPage>> = null;

  try {
    page = await findPage();
  } catch {
    // DB unreachable
  }

  const sections = sanitizeSections(page?.sections ?? []);
  return <CvcContent sections={sections} />;
}
