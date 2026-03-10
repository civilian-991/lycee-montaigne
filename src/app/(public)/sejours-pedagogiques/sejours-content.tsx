"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { localImage } from "@/lib/utils";

type PageSectionRow = {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  image: string | null;
  order: number;
};

export function SejoursContent({ sections }: { sections: PageSectionRow[] }) {
  const introSection = sections.find((s) => s.sectionKey === "intro");
  const sportSection = sections.find((s) => s.sectionKey === "ligue-sportive");
  // All sections that are individual trip/event articles
  const tripSections = sections.filter(
    (s) => s.sectionKey !== "intro" && s.sectionKey !== "ligue-sportive"
  );

  return (
    <>
      <PageHero title="Séjours Pédagogiques" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader
                  title={introSection?.title || "Voyages et séjours"}
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
                      Le Lycée Montaigne organise des séjours pédagogiques et des voyages scolaires qui
                      enrichissent le parcours éducatif des élèves. Ces expériences favorisent l&apos;ouverture
                      culturelle, l&apos;autonomie et la cohésion de groupe.
                    </p>
                    <p className="mt-4 text-text-muted">
                      De la découverte du patrimoine local aux échanges internationaux, chaque séjour
                      est conçu pour prolonger les apprentissages en classe et offrir aux élèves des
                      expériences inoubliables.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(introSection?.image) || "/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg"}
                  alt="Séjours pédagogiques"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Trip articles grid */}
      {tripSections.length > 0 && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader title="Nos voyages et aventures" subtitle="Des expériences inoubliables pour nos élèves" />
            <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tripSections.map((trip) => (
                <StaggerItem key={trip.id}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                    {trip.image && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={trip.image}
                          alt={trip.title || "Séjour pédagogique"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      {trip.title && (
                        <h3 className="text-base font-bold text-text transition-colors group-hover:text-primary">
                          {trip.title}
                        </h3>
                      )}
                      {trip.contentHtml && (
                        <div
                          className="mt-2 flex-1 text-sm leading-relaxed text-text-muted [&>p:first-child]:mt-0 [&>p]:mt-2 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-4 line-clamp-[8]"
                          dangerouslySetInnerHTML={{
                            __html: trip.contentHtml.replace(/<\/?(strong|em|b|i)>/g, ""),
                          }}
                        />
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      <section className={`py-16 md:py-24 ${tripSections.length > 0 ? "" : "bg-background-alt"}`}>
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <SectionHeader title={sportSection?.title || "Ligue sportive AEFE-UNSS"} />
            {sportSection?.contentHtml ? (
              <div
                className="mx-auto mt-6 max-w-3xl text-center text-text-muted [&>p]:mt-4"
                dangerouslySetInnerHTML={{ __html: sportSection.contentHtml }}
              />
            ) : (
              <p className="mx-auto mt-6 max-w-3xl text-center text-text-muted">
                Les élèves du Lycée Montaigne participent aux compétitions sportives inter-établissements
                dans le cadre de la ligue sportive AEFE-UNSS, offrant des opportunités de rencontres
                sportives au niveau régional et international.
              </p>
            )}
          </FadeInView>
        </div>
      </section>
    </>
  );
}
