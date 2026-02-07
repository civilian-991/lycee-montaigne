"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";

const events = [
  {
    title: "Brunch des Anciens – 11 juillet 2025",
    description:
      "Retrouvailles entre anciens, enseignants et personnel du lycee autour d'un brunch convivial sur le campus de Beit Chabab.",
    images: [
      "/images/anciens/August2025/tbgbFWe3V7nhiqK9KdbW.jpeg",
      "/images/anciens/August2025/aFC7rOpJhr2G0lM9Dr1M.jpeg",
      "/images/anciens/August2025/NWoTxLZNaGoLGqN3ALNM.jpeg",
      "/images/anciens/August2025/34dQliGXtze4qbuV35El.jpeg",
      "/images/anciens/August2025/e56wswRlMyehZbdlhHeN.jpeg",
      "/images/anciens/August2025/fAUvjSZcpr1xXwR8z0y9.jpeg",
    ],
  },
  {
    title: "Reunion de Noel – 23 decembre 2024",
    description:
      "Retrouvailles festives des anciens eleves a l'occasion des fetes de fin d'annee.",
    images: [
      "/images/anciens/March2025/LBqkCVHdyv78XpGnfAH1.jpeg",
      "/images/anciens/March2025/HEQxBeweJfWguNossQOS.jpeg",
      "/images/anciens/March2025/f3vVhxbqZ3nUKILttEH9.jpeg",
      "/images/anciens/March2025/WSLY3ZnIDWp00MfIrMMT.jpeg",
      "/images/anciens/March2025/67aHfEHl4KuY6fxQ2vGe.jpeg",
      "/images/anciens/March2025/5iiQNILm422XxkXqGkFe.jpeg",
    ],
  },
  {
    title: "Brunch des Anciens – 19 juillet 2024",
    description:
      "Premier brunch des anciens sur le campus de Beit Chabab pour les promos 2022-2023-2024. Formation du comite constitutif de l'AALM.",
    images: [
      "/images/anciens/December2024/Gr126Yxp86fX8jQaSwnh.jpeg",
      "/images/anciens/December2024/hjohJyJ8Yz3P14BGKWCk.jpeg",
      "/images/anciens/December2024/Yjx2dWMAEQgjzmlB9hcy.jpeg",
      "/images/anciens/December2024/UnkBO3aNJBHYDaqui4nt.jpeg",
      "/images/anciens/December2024/dcdN3CWKF92prbbgkGCc.jpeg",
    ],
  },
];

const committee = [
  { role: "President", name: "Yorgo Abou Haidar" },
  { role: "Vice-presidente", name: "Rebecca Maroun" },
  { role: "Secretaire", name: "Hayfa Ghandour Achkar" },
  { role: "Reseaux sociaux", name: "Andrea Abou Haidar" },
  { role: "Newsletter", name: "Matteo Kozak et Fay Haydamous" },
  { role: "Evenements", name: "Maria Keuchgerian" },
  { role: "Tresorerie", name: "Marc Bejjani" },
];

export default function AnciensPage() {
  return (
    <>
      <PageHero title="Anciens Eleves" />

      {/* AALM */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Amicale des Anciens du LM" className="text-left" />
                <p className="mt-6 text-text-muted">
                  L&apos;AALM (Amicale des Anciens du Lycee Montaigne) a ete fondee en juillet 2024
                  lors du premier brunch des anciens. Elle reunit les anciens eleves du Lycee Montaigne
                  de Beit Chabab autour d&apos;evenements et de projets communs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Comite de l&apos;AALM</h3>
                <StaggerChildren className="mt-4 space-y-3">
                  {committee.map((member) => (
                    <StaggerItem key={member.name}>
                      <div className="flex items-center gap-3 rounded-2xl bg-background-alt p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{member.name}</p>
                          <p className="text-xs text-text-muted">{member.role}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Events */}
      {events.map((event, i) => (
        <section
          key={event.title}
          className={i % 2 === 0 ? "bg-background-alt py-16 md:py-24" : "py-16 md:py-24"}
        >
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader title={event.title} />
            <p className="mx-auto mt-4 max-w-3xl text-center text-text-muted">{event.description}</p>
            <StaggerChildren className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {event.images.map((img, j) => (
                <StaggerItem key={j}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                    <Image
                      src={img}
                      alt={`${event.title} - Photo ${j + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      ))}
    </>
  );
}
