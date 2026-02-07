"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";

const activities = [
  {
    title: "Forum des universites – 14 novembre 2025",
    description: "18 universites et 12 grandes ecoles ont participe a cette journee d'orientation pour nos eleves.",
    image: "/images/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg",
  },
  {
    title: "Forum des Metiers – 22 mars 2025",
    description: "Rencontre entre professionnels et eleves pour decouvrir differents parcours et metiers.",
    image: "/images/oriantation-activities/July2025/xKaDU1qKXJrvkFI8kJc3.jpeg",
  },
  {
    title: "Forum des universites – 20 decembre 2024",
    description: "Journee d'echanges avec les representants des universites locales et internationales.",
    image: "/images/oriantation-activities/July2025/E74I8wu2UsLKK4EImXJU.jpeg",
  },
];

const admissionImages = [
  "/images/oriantation-activities/August2025/jGcBleXqGThjKsghZXBQ.jpeg",
  "/images/oriantation-activities/August2025/cZJX6xPO7h3xZDULgEXn.jpeg",
  "/images/oriantation-activities/August2025/Vuu9x02s0E1dfDfps58b.jpeg",
  "/images/oriantation-activities/August2025/XMhQO1k8tKpQaRhCt5AY.jpeg",
];

export default function OrientationPage() {
  return (
    <>
      <PageHero title="Orientation" />

      {/* Parcours avenir */}
      <section id="presentation" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Parcours avenir" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Des la classe de 6eme, le Lycee Montaigne accompagne chaque eleve dans la construction
                  de son parcours d&apos;orientation. Une PRIO (personne ressource en information et orientation),
                  une professeure documentaliste et la CPE travaillent ensemble pour guider les eleves
                  vers les filieres et les metiers qui correspondent a leurs talents et aspirations.
                </p>
                <p className="mt-4 text-text-muted">
                  Des forums, des rencontres avec des professionnels, des visites d&apos;universites et
                  un accompagnement individualise permettent a chaque eleve de faire des choix eclaires.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/orientation-s1/July2025/4WWbVtfsEoVLlFT5F8AR.png"
                  alt="Parcours avenir"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Parcoursup */}
      <section id="parcoursup" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)] lg:order-first">
                <Image
                  src="/images/orientation-s4/March2025/85D8l8qy1D3xZHVOrctC.png"
                  alt="Parcoursup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <SectionHeader title="Parcoursup" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Parcoursup est la plateforme nationale de preinscription en premiere annee de
                  l&apos;enseignement superieur en France. Les eleves de terminale du Lycee Montaigne
                  sont accompagnes tout au long du processus pour formuler leurs voeux et constituer
                  leurs dossiers.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Resultats admissions */}
      <section id="uni" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Inscriptions universites" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-text-muted">
            Nos eleves sont admis dans les universites les plus prestigieuses au Liban et a
            l&apos;international. Voici un apercu des resultats d&apos;admission 2025-2026.
          </p>
          <StaggerChildren className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {admissionImages.map((img, i) => (
              <StaggerItem key={i}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                  <Image
                    src={img}
                    alt={`Resultats d'admission ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Activites d'orientation */}
      <section id="activites" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Activites" />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
            {activities.map((activity) => (
              <StaggerItem key={activity.title}>
                <div className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)]">
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
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
