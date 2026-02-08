"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/ui/motion";
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
  // Use CMS sections if available
  const introSection = sections.find((s) => s.sectionKey === "intro");
  const sportSection = sections.find((s) => s.sectionKey === "ligue-sportive");

  return (
    <>
      <PageHero title="Sejours Pedagogiques" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader
                  title={introSection?.title || "Voyages et sejours"}
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
                      Le Lycee Montaigne organise des sejours pedagogiques et des voyages scolaires qui
                      enrichissent le parcours educatif des eleves. Ces experiences favorisent l&apos;ouverture
                      culturelle, l&apos;autonomie et la cohesion de groupe.
                    </p>
                    <p className="mt-4 text-text-muted">
                      De la decouverte du patrimoine local aux echanges internationaux, chaque sejour
                      est concu pour prolonger les apprentissages en classe et offrir aux eleves des
                      experiences inoubliables.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(introSection?.image) || "/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg"}
                  alt="Sejours pedagogiques"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="bg-background-alt py-16 md:py-24">
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
                Les eleves du Lycee Montaigne participent aux competitions sportives inter-etablissements
                dans le cadre de la ligue sportive AEFE-UNSS, offrant des opportunites de rencontres
                sportives au niveau regional et international.
              </p>
            )}
          </FadeInView>
        </div>
      </section>
    </>
  );
}
