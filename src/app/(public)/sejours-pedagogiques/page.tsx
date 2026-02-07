import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Séjours Pédagogiques",
  description: "Voyages scolaires et séjours pédagogiques organisés par le Lycée Montaigne de Beit Chabab.",
};

export default function SejoursPedagogiquesPage() {
  return (
    <>
      <PageHero title="Séjours Pédagogiques" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Voyages et séjours" className="text-left" />
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
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg"
                alt="Séjours pédagogiques"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Ligue sportive AEFE-UNSS" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-text-muted">
            Les élèves du Lycée Montaigne participent aux compétitions sportives inter-établissements
            dans le cadre de la ligue sportive AEFE-UNSS, offrant des opportunités de rencontres
            sportives au niveau régional et international.
          </p>
        </div>
      </section>
    </>
  );
}
