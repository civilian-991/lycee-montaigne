"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { Equal } from "lucide-react";
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

const ACTIVITIES = [
  {
    title: "Débat au CCC — Espaces inclusifs",
    description:
      "Les élèves du primaire et du secondaire ont participé à une discussion intitulée « Comment penser et aménager les espaces... pour que chacun y trouve sa place ? » autour de l'égalité filles-garçons. Les participants ont partagé des idées pour rendre les espaces scolaires plus inclusifs et accessibles.",
    image: "/images/egalite-activites/May2025/n2MEOg4B5XaEyppiSdZA.png",
  },
  {
    title: "Concours AEFE Égalité — Princia Mouawad",
    description:
      "Une élève de terminale a remporté le concours égalité AEFE 2025 avec une affiche représentant des individus surmontant les stéréotypes de genre et avançant vers la liberté et le choix.",
    image: "/images/egalite-activites/May2025/32TchvdKVSXFx3cZ3U8q.png",
  },
  {
    title: "Label Génération 2024",
    description:
      "L'établissement a reçu le label Génération 2024 pour la promotion du sport et du handisport auprès des jeunes, créant des passerelles entre le milieu scolaire et les opportunités sportives.",
    image: "/images/egalite-activites/March2025/sAELm48qiMuUVw81PiQT.png",
  },
  {
    title: "« Force = nom féminin » — Projet presse & médias",
    description:
      "Les élèves de seconde ont réalisé un documentaire explorant les droits des femmes, des déclarations historiques aux mouvements féministes contemporains et aux défis posés par les stéréotypes de genre.",
    image: "/images/egalite-activites/March2025/wDNEXp7fqrp7wE8cflyM.jpeg",
  },
  {
    title: "Sensibilisation au handicap — CM1",
    description:
      "Les élèves de CM1 ont mené des interviews et des reportages avec des athlètes paralympiques, découvrant leurs parcours et comprenant l'importance de l'inclusion et de l'égalité.",
    image: "/images/egalite-activites/March2025/AGqGjlCvqMiXvOQUL4db.jpg",
  },
];

export function EgaliteActiviteContent({ sections }: { sections: PageSectionRow[] }) {
  const introSection = sections.find((s) => s.sectionKey === "intro");

  // If CMS sections have activity entries, use them
  const activitySections = sections.filter((s) => s.sectionKey === "activity");
  const displayActivities = activitySections.length > 0
    ? activitySections.map((s) => ({
        title: s.title || "",
        description: "",
        image: localImage(s.image) || ACTIVITIES[0].image,
        contentHtml: s.contentHtml,
      }))
    : null;

  return (
    <>
      <PageHero title="Activités Égalité" />

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Equal className="h-5 w-5 text-primary" />
              </div>
              <SectionHeader
                title={introSection?.title || "Nos projets pour l'égalité"}
                className="mb-0"
              />
            </div>
            {introSection?.contentHtml ? (
              <div
                className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-text-muted [&>p]:mt-4"
                dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
              />
            ) : (
              <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-text-muted">
                Conformément à la politique de l&apos;AEFE, le Lycée Montaigne s&apos;inscrit dans une démarche
                active de promotion de l&apos;égalité et de lutte contre les stéréotypes. Voici nos
                projets et activités réalisés dans ce cadre.
              </p>
            )}
          </FadeInView>
        </div>
      </section>

      {/* Activities grid */}
      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <StaggerChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(displayActivities || ACTIVITIES).map((activity, i) => (
              <StaggerItem key={i}>
                <div className="group overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={typeof activity.image === "string" ? activity.image : ACTIVITIES[0].image}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-primary">{activity.title}</h3>
                    {"contentHtml" in activity && activity.contentHtml ? (
                      <div
                        className="mt-2 text-sm leading-relaxed text-text-muted [&>p]:mt-2"
                        dangerouslySetInnerHTML={{ __html: activity.contentHtml }}
                      />
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {activity.description}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
