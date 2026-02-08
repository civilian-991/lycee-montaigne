"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/ui/motion";

interface ActivityItemData {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  category: string;
  order: number;
}

interface ExtrascolaireContentProps {
  activities: ActivityItemData[];
  sportsActivities: ActivityItemData[];
}

export function ExtrascolaireContent({ activities, sportsActivities }: ExtrascolaireContentProps) {
  return (
    <>
      <PageHero title="Extrascolaire" />

      {/* Activites periscolaires */}
      <section id="activite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            {activities.length > 0 ? (
              <>
                <SectionHeader title="Activites periscolaires" />
                <p className="mx-auto mt-4 max-w-3xl text-center text-text-muted">
                  Le Lycee Montaigne propose un large eventail d&apos;activites periscolaires pour
                  enrichir le parcours de chaque eleve. Que vous soyez passionne de sport, d&apos;art,
                  de robotique ou de sciences, il y a une activite pour chacun !
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
                    >
                      {activity.image && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold text-text transition-colors group-hover:text-primary">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
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
            )}
          </FadeInView>
        </div>
      </section>

      {/* Association sportive */}
      <section id="action" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            {sportsActivities.length > 0 ? (
              <>
                <SectionHeader title="Association sportive" />
                <p className="mx-auto mt-4 max-w-3xl text-center text-text-muted">
                  L&apos;association sportive du Lycee Montaigne offre aux eleves la possibilite de
                  pratiquer differentes disciplines sportives et de participer a des competitions
                  inter-etablissements dans le cadre de la ligue sportive AEFE-UNSS.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sportsActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
                    >
                      {activity.image && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold text-text transition-colors group-hover:text-primary">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
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
            )}
          </FadeInView>
        </div>
      </section>
    </>
  );
}
