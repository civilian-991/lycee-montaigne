"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Trophy, Medal } from "lucide-react";
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

const EVENTS = [
  {
    title: "Jeux ZPO Cycle 4",
    date: "13 décembre 2025",
    results: [
      "Rhéa Keirouz : 1ère place en relais",
      "Cyrine Bou Chedid : 3ème place en escalade",
    ],
    disciplines: "Basketball, escalade, relais",
    image: "/images/ligue-sportive-events/January2026/cu5MtjhcWR9veHHS8X6k.jpeg",
  },
  {
    title: "Journée olympique et paralympique AEFE",
    date: "2025",
    results: [
      "Participation multi-cycles en activités sportives variées",
    ],
    disciplines: "Compétitions mixtes, esprit d'équipe",
    image: "/images/ligue-sportive-events/May2025/P3OuuxEc709C0u8wyFTB.jpeg",
  },
  {
    title: "Jeux ZPO",
    date: "10 mai 2025",
    results: [
      "Karim Fayad & Cyana Haladjian : 1ère place, tennis de table",
      "Cyrine Bou Chedid & Raphaël Karam : 3ème place, tennis de table",
      "C. Bou Chedid, K. Fayad, E. Nassif & T. Issa : 3ème place, relais",
    ],
    disciplines: "Tennis de table, badminton, relais",
    image: "/images/ligue-sportive-events/May2025/4RSzcaY5Pm9PpOYkhyfK.jpeg",
  },
  {
    title: "Compétition Ligue AEFE ZPO",
    date: "2025",
    results: [
      "Ultimate frisbee : 2ème place",
      "Tennis de table : 2ème place (Ronaldo Abboud)",
    ],
    disciplines: "Ultimate frisbee, tennis de table",
    image: "/images/ligue-sportive-events/May2025/oXxwOv94KQ89cfaEnDuy.jpeg",
  },
  {
    title: "Critérium de ski",
    date: "10 mars 2024",
    results: [
      "Chris Tchopourian (terminale) : 2ème place, catégorie garçons II",
    ],
    disciplines: "Ski — Faraya",
    image: "/images/ligue-sportive-events/September2024/LiFT96PPIbuZ7icTClEs.jpg",
  },
  {
    title: "Championnat d'échecs",
    date: "1 mars 2024",
    results: [
      "William Mbarak : 3ème place, cycle 4",
    ],
    disciplines: "Échecs",
    image: "/images/ligue-sportive-events/September2024/zaHImTS6XcJCm6ND56Tf.jpg",
  },
];

export function LigueSportiveContent({ sections }: { sections: PageSectionRow[] }) {
  const introSection = sections.find((s) => s.sectionKey === "intro");

  // If CMS sections have event entries, use them
  const eventSections = sections.filter((s) => s.sectionKey === "event");
  const usesCms = eventSections.length > 0;

  return (
    <>
      <PageHero title="Ligue Sportive" />

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                    <Trophy className="h-5 w-5 text-secondary" />
                  </div>
                  <SectionHeader
                    title={introSection?.title || "Ligue sportive AEFE-UNSS"}
                    className="mb-0 text-left"
                  />
                </div>
                {introSection?.contentHtml ? (
                  <div
                    className="mt-6 leading-relaxed text-text-muted [&>p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
                  />
                ) : (
                  <>
                    <p className="mt-6 leading-relaxed text-text-muted">
                      Le Lycée Montaigne participe activement aux compétitions sportives
                      organisées dans le cadre de la ligue sportive AEFE-UNSS. Nos élèves
                      représentent l&apos;établissement dans de nombreuses disciplines et
                      obtiennent d&apos;excellents résultats.
                    </p>
                    <p className="mt-4 leading-relaxed text-text-muted">
                      Basketball, ski, tennis de table, badminton, escalade, ultimate frisbee,
                      échecs, handball — nos sportifs s&apos;illustrent à chaque compétition
                      par leur engagement et leur esprit d&apos;équipe.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(introSection?.image) || "/images/ligue-sportive-events/January2026/cu5MtjhcWR9veHHS8X6k.jpeg"}
                  alt="Ligue sportive"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Événements et résultats */}
      <section className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <SectionHeader
                title="Événements et résultats"
                subtitle="Les compétitions et palmarès de nos élèves"
              />
            </FadeInView>

            {usesCms ? (
              <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {eventSections.map((s, i) => (
                  <StaggerItem key={s.id}>
                    <div className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)]">
                      {s.image && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={localImage(s.image) || ""}
                            alt={s.title || ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-semibold text-primary">{s.title}</h3>
                        {s.contentHtml && (
                          <div
                            className="mt-2 text-sm text-text-muted [&>p]:mt-2"
                            dangerouslySetInnerHTML={{ __html: s.contentHtml }}
                          />
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            ) : (
              <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {EVENTS.map((event, i) => (
                  <StaggerItem key={i}>
                    <div className="group overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                          {event.date}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-primary">{event.title}</h3>
                        <p className="mt-1 text-xs text-text-muted">{event.disciplines}</p>
                        <div className="mt-3 space-y-1.5">
                          {event.results.map((result, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <Medal className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                              <p className="text-sm text-text">{result}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            )}
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>
    </>
  );
}
