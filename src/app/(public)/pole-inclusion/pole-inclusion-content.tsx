"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { localImage } from "@/lib/utils";
import { Heart, Users, BookOpen, Shield } from "lucide-react";

const pillarIcons = [Heart, Users, BookOpen, Shield];

type PageSectionRow = {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  image: string | null;
  order: number;
};

interface PillarData {
  title: string;
  description: string;
}

export function PoleInclusionContent({ sections, pillars }: { sections: PageSectionRow[]; pillars: PillarData[] }) {
  const introSection = sections.find((s) => s.sectionKey === "intro");

  return (
    <>
      <PageHero title="Pole Inclusion" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader
                  title={introSection?.title || "Eleves a Besoins Educatifs Particuliers"}
                  className="text-left"
                />
                {introSection?.contentHtml ? (
                  <div
                    className="mt-6 text-text-muted [&>p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
                  />
                ) : (
                  <>
                    <p className="mt-6 text-text-muted">
                      Le Lycee Montaigne s&apos;engage pour l&apos;inclusion de tous les eleves. Notre pole inclusion
                      accompagne les eleves a besoins educatifs particuliers (EBEP) tout au long de leur
                      parcours scolaire, de la maternelle a la terminale.
                    </p>
                    <p className="mt-4 text-text-muted">
                      Notre approche repose sur le regard positif porte sur chaque personne et la confiance
                      dans l&apos;educabilite de chacun, quels que soient ses besoins specifiques.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(introSection?.image) || "/images/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg"}
                  alt="Pole inclusion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {pillars.length > 0 && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader title="Nos piliers" />
            <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => {
                const Icon = pillarIcons[i % pillarIcons.length];
                return (
                  <StaggerItem key={pillar.title}>
                    <div className="rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-semibold">{pillar.title}</h3>
                      <p className="mt-2 text-sm text-text-muted">{pillar.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}
    </>
  );
}
