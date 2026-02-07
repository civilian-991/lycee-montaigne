import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Anciens Élèves",
  description: "Retrouvez les événements et activités de l'Amicale des Anciens du Lycée Montaigne (AALM).",
};

const events = [
  {
    title: "Brunch des Anciens – 11 juillet 2025",
    description:
      "Retrouvailles entre anciens, enseignants et personnel du lycée autour d'un brunch convivial sur le campus de Beit Chabab.",
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
    title: "Réunion de Noël – 23 décembre 2024",
    description:
      "Retrouvailles festives des anciens élèves à l'occasion des fêtes de fin d'année.",
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
      "Premier brunch des anciens sur le campus de Beit Chabab pour les promos 2022-2023-2024. Formation du comité constitutif de l'AALM.",
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
  { role: "Président", name: "Yorgo Abou Haidar" },
  { role: "Vice-présidente", name: "Rebecca Maroun" },
  { role: "Secrétaire", name: "Hayfa Ghandour Achkar" },
  { role: "Réseaux sociaux", name: "Andrea Abou Haidar" },
  { role: "Newsletter", name: "Matteo Kozak et Fay Haydamous" },
  { role: "Événements", name: "Maria Keuchgerian" },
  { role: "Trésorerie", name: "Marc Bejjani" },
];

export default function AnciensPage() {
  return (
    <>
      <PageHero title="Anciens Élèves" />

      {/* AALM */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Amicale des Anciens du LM" className="text-left" />
              <p className="mt-6 text-text-muted">
                L&apos;AALM (Amicale des Anciens du Lycée Montaigne) a été fondée en juillet 2024
                lors du premier brunch des anciens. Elle réunit les anciens élèves du Lycée Montaigne
                de Beit Chabab autour d&apos;événements et de projets communs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Comité de l&apos;AALM</h3>
              <div className="mt-4 space-y-3">
                {committee.map((member) => (
                  <div key={member.name} className="flex items-center gap-3 rounded-lg bg-background-alt p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{member.name}</p>
                      <p className="text-xs text-text-muted">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {event.images.map((img, j) => (
                <div key={j} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`${event.title} - Photo ${j + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
