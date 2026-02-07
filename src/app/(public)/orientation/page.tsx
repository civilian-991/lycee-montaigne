import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Orientation",
  description: "Parcours avenir, Parcoursup, inscriptions universitaires et activités d'orientation au Lycée Montaigne.",
};

const activities = [
  {
    title: "Forum des universités – 14 novembre 2025",
    description: "18 universités et 12 grandes écoles ont participé à cette journée d'orientation pour nos élèves.",
    image: "https://lycee-montaigne.edu.lb//storage/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg",
  },
  {
    title: "Forum des Métiers – 22 mars 2025",
    description: "Rencontre entre professionnels et élèves pour découvrir différents parcours et métiers.",
    image: "https://lycee-montaigne.edu.lb//storage/oriantation-activities/July2025/xKaDU1qKXJrvkFI8kJc3.jpeg",
  },
  {
    title: "Forum des universités – 20 décembre 2024",
    description: "Journée d'échanges avec les représentants des universités locales et internationales.",
    image: "https://lycee-montaigne.edu.lb//storage/oriantation-activities/July2025/E74I8wu2UsLKK4EImXJU.jpeg",
  },
];

const admissionImages = [
  "https://lycee-montaigne.edu.lb//storage/oriantation-activities/August2025/jGcBleXqGThjKsghZXBQ.jpeg",
  "https://lycee-montaigne.edu.lb//storage/oriantation-activities/August2025/cZJX6xPO7h3xZDULgEXn.jpeg",
  "https://lycee-montaigne.edu.lb//storage/oriantation-activities/August2025/Vuu9x02s0E1dfDfps58b.jpeg",
  "https://lycee-montaigne.edu.lb//storage/oriantation-activities/August2025/XMhQO1k8tKpQaRhCt5AY.jpeg",
];

export default function OrientationPage() {
  return (
    <>
      <PageHero title="Orientation" />

      {/* Parcours avenir */}
      <section id="presentation" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Parcours avenir" className="text-left" />
              <p className="mt-6 text-text-muted">
                Dès la classe de 6ème, le Lycée Montaigne accompagne chaque élève dans la construction
                de son parcours d&apos;orientation. Une PRIO (personne ressource en information et orientation),
                une professeure documentaliste et la CPE travaillent ensemble pour guider les élèves
                vers les filières et les métiers qui correspondent à leurs talents et aspirations.
              </p>
              <p className="mt-4 text-text-muted">
                Des forums, des rencontres avec des professionnels, des visites d&apos;universités et
                un accompagnement individualisé permettent à chaque élève de faire des choix éclairés.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/orientation-s1/July2025/4WWbVtfsEoVLlFT5F8AR.png"
                alt="Parcours avenir – Ton orientation: un chemin à parcourir ensemble"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Parcoursup */}
      <section id="parcoursup" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-first">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/orientation-s4/March2025/85D8l8qy1D3xZHVOrctC.png"
                alt="Parcoursup"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeader title="Parcoursup" className="text-left" />
              <p className="mt-6 text-text-muted">
                Parcoursup est la plateforme nationale de préinscription en première année de
                l&apos;enseignement supérieur en France. Les élèves de terminale du Lycée Montaigne
                sont accompagnés tout au long du processus pour formuler leurs vœux et constituer
                leurs dossiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats admissions */}
      <section id="uni" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Inscriptions universités" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-text-muted">
            Nos élèves sont admis dans les universités les plus prestigieuses au Liban et à
            l&apos;international. Voici un aperçu des résultats d&apos;admission 2025-2026.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {admissionImages.map((img, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={img}
                  alt={`Résultats d'admission ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activités d'orientation */}
      <section id="activites" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Activités" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {activities.map((activity) => (
              <div key={activity.title} className="overflow-hidden rounded-xl border border-border bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text">{activity.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
