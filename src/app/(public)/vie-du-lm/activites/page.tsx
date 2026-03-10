import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { sanitizeSections } from "@/lib/sanitize";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { ArrowLeft, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Activités Développement Durable | Lycée Montaigne",
  description: "Actions éco-responsables et activités de développement durable au Lycée Montaigne.",
  alternates: { canonical: "/vie-du-lm/activites" },
};

export default async function ActivitesPage() {
  let sections: { id: string; sectionKey: string; title: string | null; contentHtml: string | null; image: string | null; order: number }[] = [];

  try {
    const page = await db.page.findFirst({
      where: { slug: "vie-du-lm-activites", status: "PUBLISHED" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
    sections = sanitizeSections(page?.sections ?? []);
  } catch {
    // DB unreachable
  }

  // Group by year from sectionKey prefix (act-2026-* vs act-2025-*)
  const byYear: Record<string, typeof sections> = {};
  for (const s of sections) {
    const match = s.sectionKey.match(/act-(\d{4})-/);
    const year = match ? match[1] : "other";
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(s);
  }
  const sortedYears = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <PageHero title="Activités" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <Link
              href="/vie-du-lm#dev"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à Développement durable
            </Link>
          </FadeInView>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
              <Leaf className="h-5 w-5 text-secondary" />
            </div>
            <SectionHeader
              title="Actions éco-responsables"
              subtitle="Nos engagements pour le développement durable"
              className="mb-0 text-left"
            />
          </div>

          {sortedYears.map((year) => (
            <div key={year} className="mt-16">
              <h2 className="mb-8 inline-block rounded-full bg-secondary/10 px-5 py-2 text-sm font-bold text-secondary">
                Année {Number(year) - 1}-{year}
              </h2>
              <StaggerChildren className="grid gap-8 md:grid-cols-2">
                {byYear[year].map((act) => (
                  <StaggerItem key={act.id}>
                    <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                      {act.image && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={act.image}
                            alt={act.title ?? "Activité"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        {act.title && (
                          <h3 className="font-semibold text-primary">{act.title}</h3>
                        )}
                        {act.contentHtml && (
                          <div
                            className="mt-3 flex-1 text-sm leading-relaxed text-text-muted [&>p]:mt-2 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:mt-1 [&_a]:font-semibold [&_a]:text-secondary [&_a]:underline hover:[&_a]:text-primary"
                            dangerouslySetInnerHTML={{ __html: act.contentHtml }}
                          />
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          ))}

          {sections.length === 0 && (
            <p className="mt-12 text-center text-text-muted">Aucune activité pour le moment.</p>
          )}
        </div>
      </section>
    </>
  );
}
