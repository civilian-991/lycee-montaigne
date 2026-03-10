"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/ui/motion";
import { localImage } from "@/lib/utils";

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
                <SectionHeader title="Activités périscolaires" />
                <p className="mx-auto mt-4 max-w-3xl text-center text-text-muted">
                  Le Lycée Montaigne propose un large éventail d&apos;activités périscolaires pour
                  enrichir le parcours de chaque élève. Que vous soyez passionné de sport, d&apos;art,
                  de robotique ou de sciences, il y a une activité pour chacun !
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
                    >
                      {localImage(activity.image) && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={localImage(activity.image)!}
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                  <Image
                    src="/images/activites-prescolaires/May2025/vjpXai9c7VbVIINjggcN.jpeg"
                    alt="Activités périscolaires"
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
                  L&apos;association sportive du Lycée Montaigne offre aux élèves la possibilité de
                  pratiquer différentes disciplines sportives et de participer à des compétitions
                  inter-établissements dans le cadre de la ligue sportive AEFE-UNSS.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sportsActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
                    >
                      {localImage(activity.image) && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={localImage(activity.image)!}
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
            )}
          </FadeInView>
        </div>
      </section>

      {/* Documents à télécharger */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Documents" subtitle="Règlements et descriptifs des activités périscolaires" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Règlement intérieur des activités périscolaires", href: "https://lycee-montaigne.edu.lb/storage/activites-prescolaires/December2025/IPMfacbyygHc1OtBsSgl.pdf" },
              { label: "Descriptif des activités — 1er degré", href: "https://lycee-montaigne.edu.lb/storage/activites-prescolaires/December2025/cMVOtjEM2y8j4FUs0yJt.pdf" },
              { label: "Tableau des activités 2ème période — 1er degré", href: "https://lycee-montaigne.edu.lb/storage/activites-prescolaires/December2025/DVdgUOEmmMigCJI1boMW.pdf" },
              { label: "Descriptif des activités — 2nd degré", href: "https://lycee-montaigne.edu.lb/storage/activites-prescolaires/December2025/I6pLAYth3yz4wFq33pUq.pdf" },
              { label: "Tableau des activités 2ème période — 2nd degré", href: "https://lycee-montaigne.edu.lb/storage/activites-prescolaires/December2025/nEhnt6nMduYpEqFH7e4o.pdf" },
            ].map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                </div>
                <span className="text-sm font-medium text-text transition-colors group-hover:text-primary">{doc.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
