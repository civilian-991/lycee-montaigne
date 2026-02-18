import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { ExcellenceContent } from "./excellence-content";

export const metadata: Metadata = {
  title: "Excellence Académique | Lycée Montaigne",
  description:
    "Offre pédagogique, examens, certificats et parcours éducatifs au Lycée Montaigne.",
  alternates: { canonical: "/excellence-academique" },
};

export default async function ExcellenceAcademiquePage() {
  const settings = await getSettings();

  let certifications: Awaited<ReturnType<typeof db.certification.findMany>> = [];
  try {
    certifications = await db.certification.findMany({ orderBy: { order: "asc" } });
  } catch {
    // DB unreachable
  }

  return (
    <ExcellenceContent
      certifications={certifications}
      programs={settings.programs}
      diplomas={settings.diplomas}
      strategicAxes={settings.strategic_axes}
      educationalPaths={settings.educational_paths}
    />
  );
}
