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

const ACTIVITIES = [
  {
    title: "Visite de l'optométriste Mme Nisrine Achkar",
    description:
      "Dans le cadre du suivi de la santé visuelle de nos élèves, nous avons accueilli Mme Nisrine Achkar, optométriste, pour un contrôle allant de la PS à la Terminale. Une visite essentielle pour assurer le bien-être et le confort visuel de chacun.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/Jp06V1zAqPQwscGoCzYA.jpeg",
  },
  {
    title: "MS — Mon corps, c'est précieux !",
    description:
      "Ton corps, c'est ton trésor, et il mérite toute ton attention ! Pour rester propre et en bonne santé, il faut adopter de bons gestes chaque jour : se laver les mains, se brosser les dents, prendre sa douche, changer de vêtements, utiliser un mouchoir. Être propre, c'est se sentir bien, sentir bon et protéger les autres aussi !",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/iJV9rus72H1Y0VjVOQPd.jpeg",
  },
  {
    title: "Journée de la Résilience",
    description:
      "Dans le cadre d'une mobilisation mondiale initiée par le réseau AEFE, le Lycée Montaigne a pris part à un défi symbolique : assurer un massage cardiaque en continu sur un mannequin, dans un relais animé par des élèves et des membres du personnel. Cette initiative vise à renforcer les capacités de chacun à faire face aux imprévus avec calme, compétence et solidarité.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/November2025/jZZKohDGk8ej4TyK1hJH.jpeg",
  },
  {
    title: "Attention ! Le médicament n'est pas un bonbon — PS",
    description:
      "Dr Antoine Nader, pharmacien, est intervenu à l'école pour aider les élèves de la PS à comprendre que les médicaments ne sont pas des bonbons. Ils doivent toujours être pris sous la supervision d'un adulte afin d'éviter les risques d'intoxication.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/I7u6re9ygOCL07sZ5ekE.jpeg",
  },
  {
    title: "On ne touche pas ici — CP",
    description:
      "Avec l'infirmière, les élèves de CP ont appris que leur corps leur appartient et que personne n'a le droit de les toucher s'ils ne le veulent pas. Ils ont appris à avoir confiance pour parler en cas d'abus et à dire « Non ».",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/nyX7bDW9NadEaaGE2wco.jpeg",
  },
  {
    title: "Écran et sommeil — CM1",
    description:
      "La privation de sommeil diminue la capacité de concentration et de mémorisation. Avec l'infirmière, les élèves de CM1 ont découvert les effets nocifs des écrans (lumière bleue, ondes électromagnétiques) sur le cerveau, et les bonnes pratiques pour mieux dormir.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/HETpC5M7GnpHAPvz1puu.jpeg",
  },
  {
    title: "Intimité et pudeur — PS et MS",
    description:
      "Les élèves de PS et MS ont assisté à une séance d'éveil pour prévenir les attouchements. Avec l'infirmière Mme Gharby, ils ont découvert leur corps et abordé la notion d'intimité. Cette sensibilisation vise à prévenir les violences sexuelles en apprenant tôt aux enfants que leur corps leur appartient.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/tTmxSooK2Jd2b6621z0t.jpeg",
  },
  {
    title: "Sport et santé — CP",
    description:
      "Avec la professeure d'EPS Mme Daher et l'infirmière, les élèves de CP ont appris qu'il n'y a pas d'âge pour bouger. Pour être en bonne santé, il est recommandé de bouger au moins 30 minutes par jour : plus on bouge, plus le cœur et les muscles sont forts.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/82wiyWqgcdRfHzjZ2Rrl.jpeg",
  },
  {
    title: "La puberté — 6ème",
    description:
      "Avec l'infirmière, les élèves de 6ème ont assisté à une intervention interactive sur la puberté : une période pleine de changements physiques, psychologiques et mentaux. Ces changements sont tout à fait naturels. Chez certains, la puberté commence tôt, chez d'autres, plus tard.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/May2025/SAcMF3CmVs6wupNqFF5m.jpeg",
  },
  {
    title: "Hygiène corporelle — CE2",
    description:
      "En CE2, les élèves ont appris avec l'infirmière les règles de base de l'hygiène corporelle à l'adolescence : la douche, les soins intimes, les déodorants, l'hygiène buccale, l'activité physique et les besoins en sommeil selon l'âge.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/March2025/TNsrl7Ni0MBwLCGVnvYM.jpeg",
  },
  {
    title: "Examen de la vue",
    description:
      "La vision joue un rôle important pour la réussite scolaire. Le service de santé met en œuvre chaque année une visite d'optométrie au sein de l'école. L'examen permet de détecter précocement myopie, hypermétropie et astigmatisme.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/March2025/jyEuHMZ3LR4JEawEQimA.jpeg",
  },
  {
    title: "Lavage des mains — PS",
    description:
      "Avec l'infirmière, les élèves de petite section ont appris l'importance du lavage minutieux des mains : après chaque sortie, passage aux toilettes, après s'être mouché, ou après avoir caressé un animal. Un lavage de qualité prend environ 20 secondes.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/March2025/67LgT2i0PMEPIaYLCslH.jpeg",
  },
  {
    title: "Écran et sommeil — 4ème",
    description:
      "Avec l'infirmière, les élèves de 4ème ont découvert les effets nocifs des écrans sur le sommeil et les bonnes pratiques pour améliorer leur qualité de vie : éteindre le téléphone, placer les écrans dans une autre pièce, limiter le temps d'utilisation quotidien.",
    image: "https://lycee-montaigne.edu.lb/storage/sante-activities/March2025/jyEuHMZ3LR4JEawEQimA.jpeg",
  },
];

export function SanteActivitesContent({ sections }: { sections: PageSectionRow[] }) {
  const introSection = sections.find((s) => s.sectionKey === "intro");
  const activitySections = sections.filter((s) => s.sectionKey === "activity");
  const displayActivities =
    activitySections.length > 0
      ? activitySections.map((s) => ({
          title: s.title || "",
          description: "",
          image: localImage(s.image) || ACTIVITIES[0].image,
          contentHtml: s.contentHtml,
        }))
      : null;

  return (
    <>
      <PageHero title="Activités Santé" />

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <SectionHeader
              title={introSection?.title || "Actions de santé et prévention"}
              subtitle="L'infirmière et l'équipe médicale au service du bien-être des élèves"
            />
            {introSection?.contentHtml ? (
              <div
                className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-text-muted [&>p]:mt-4"
                dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
              />
            ) : (
              <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-text-muted">
                Le service de santé du Lycée Montaigne mène tout au long de l&apos;année des actions
                de prévention et de sensibilisation auprès des élèves de tous niveaux : hygiène,
                sommeil, écrans, puberté, premiers secours, protection du corps et bien-être général.
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
