"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/ui/motion";

export default function ExtrascolairePage() {
  return (
    <>
      <PageHero title="Extrascolaire" />

      {/* Activites periscolaires */}
      <section id="activite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Activites periscolaires" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Le Lycee Montaigne propose un large eventail d&apos;activites periscolaires pour
                  enrichir le parcours de chaque eleve. Que vous soyez passionne de sport, d&apos;art,
                  de robotique ou de sciences, il y a une activite pour chacun !
                </p>
                <p className="mt-4 text-text-muted">
                  Les activites sont organisees en deux periodes au cours de l&apos;annee scolaire.
                  Les inscriptions se font en debut de chaque periode.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/activites-prescolaires/May2025/vjpXai9c7VbVIINjggcN.jpeg"
                  alt="Activites periscolaires"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Association sportive */}
      <section id="action" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)] lg:order-first">
                <Image
                  src="/images/actions-sportives/May2025/MJzrvOmYO8rmdfoypZDR.jpeg"
                  alt="Association sportive"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <SectionHeader title="Association sportive" className="text-left" />
                <p className="mt-6 text-text-muted">
                  L&apos;association sportive du Lycee Montaigne offre aux eleves la possibilite de
                  pratiquer differentes disciplines sportives et de participer a des competitions
                  inter-etablissements dans le cadre de la ligue sportive AEFE-UNSS.
                </p>
                <p className="mt-4 text-text-muted">
                  Les entrainements ont lieu en dehors des heures de cours et les competitions
                  sont organisees tout au long de l&apos;annee.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
