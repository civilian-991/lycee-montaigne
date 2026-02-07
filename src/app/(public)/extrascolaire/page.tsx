import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Extrascolaire",
  description: "Activités périscolaires et association sportive au Lycée Montaigne de Beit Chabab.",
};

export default function ExtrascolairePage() {
  return (
    <>
      <PageHero title="Extrascolaire" />

      {/* Activités périscolaires */}
      <section id="activite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Activités périscolaires" className="text-left" />
              <p className="mt-6 text-text-muted">
                Le Lycée Montaigne propose un large éventail d&apos;activités périscolaires pour
                enrichir le parcours de chaque élève. Que vous soyez passionné de sport, d&apos;art,
                de robotique ou de sciences, il y a une activité pour chacun !
              </p>
              <p className="mt-4 text-text-muted">
                Les activités sont organisées en deux périodes au cours de l&apos;année scolaire.
                Les inscriptions se font en début de chaque période.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/activites-prescolaires/May2025/vjpXai9c7VbVIINjggcN.jpeg"
                alt="Activités périscolaires"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Association sportive */}
      <section id="action" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-first">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/actions-sportives/May2025/MJzrvOmYO8rmdfoypZDR.jpeg"
                alt="Association sportive"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeader title="Association sportive" className="text-left" />
              <p className="mt-6 text-text-muted">
                L&apos;association sportive du Lycée Montaigne offre aux élèves la possibilité de
                pratiquer différentes disciplines sportives et de participer à des compétitions
                inter-établissements dans le cadre de la ligue sportive AEFE-UNSS.
              </p>
              <p className="mt-4 text-text-muted">
                Les entraînements ont lieu en dehors des heures de cours et les compétitions
                sont organisées tout au long de l&apos;année.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
