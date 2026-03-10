"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { localImage } from "@/lib/utils";
import { Heart, Users, BookOpen, Shield, Sun, Sparkles, Rainbow } from "lucide-react";

const pillarIcons = [Heart, Users, BookOpen, Shield];

const espaceIcons: Record<string, typeof Heart> = {
  "espace-soleil": Sun,
  "espace-ebep": Sparkles,
  "espace-arc-en-ciel": Rainbow,
  "accompagnement": Shield,
};

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
  // Extra sections seeded by migration (espace-soleil, espace-ebep, espace-arc-en-ciel, accompagnement)
  const extraSections = sections.filter((s) => s.sectionKey !== "intro");

  return (
    <>
      <PageHero title="Pôle Inclusion" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader
                  title={introSection?.title || "Élèves à Besoins Éducatifs Particuliers"}
                  className="text-left"
                />
                {introSection?.contentHtml ? (
                  <div
                    className="mt-6 text-text-muted [&>p]:mt-4 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-1"
                    dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
                  />
                ) : (
                  <>
                    <p className="mt-6 text-text-muted">
                      Le Lycée Montaigne s&apos;engage pour l&apos;inclusion de tous les élèves. Notre pôle inclusion
                      accompagne les élèves à besoins éducatifs particuliers (EBEP) tout au long de leur
                      parcours scolaire, de la maternelle à la terminale.
                    </p>
                    <p className="mt-4 text-text-muted">
                      Notre approche repose sur le regard positif porté sur chaque personne et la confiance
                      dans l&apos;éducabilité de chacun, quels que soient ses besoins spécifiques.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(introSection?.image) || "/images/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg"}
                  alt="Pôle inclusion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Espace sections from DB (Soleil, Étincelle, Arc-en-Ciel, Accompagnement) */}
      {extraSections.length > 0 && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader title="Nos espaces d'accompagnement" subtitle="Un dispositif adapté à chaque étape de la scolarité" />
            <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2">
              {extraSections.map((sec) => {
                const Icon = espaceIcons[sec.sectionKey] || Heart;
                return (
                  <StaggerItem key={sec.id}>
                    <div className="rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                          <Icon className="h-5 w-5" />
                        </div>
                        {sec.title && (
                          <h3 className="font-semibold text-text">{sec.title}</h3>
                        )}
                      </div>
                      {sec.contentHtml && (
                        <div
                          className="mt-4 text-sm leading-relaxed text-text-muted [&>p]:mt-2 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-1"
                          dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
                        />
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}

      {pillars.length > 0 && (
        <section className={`py-16 md:py-24 ${extraSections.length > 0 ? "" : "bg-background-alt"}`}>
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
