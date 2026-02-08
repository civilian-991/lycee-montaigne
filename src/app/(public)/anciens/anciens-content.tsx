"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Users, Heart, Calendar, Megaphone, Wallet, PenLine, Radio, PartyPopper, Mail } from "lucide-react";

/* -- data (committee & subcommittees stay hardcoded) -- */

const committee = [
  {
    role: "President",
    name: "Yorgo Abou Haidar",
    alternate: null,
    icon: Users,
    color: "from-primary to-primary-dark",
  },
  {
    role: "Vice-presidente",
    name: "Rebecca Maroun",
    alternate: "Antonio Abou Rahal",
    icon: Heart,
    color: "from-secondary-dark to-secondary",
  },
  {
    role: "Secretaire",
    name: "Hayfa Ghandour Achkar",
    alternate: "Maria Elias",
    icon: PenLine,
    color: "from-[#7C6B4F] to-[#A89070]",
  },
  {
    role: "Reseaux sociaux",
    name: "Andrea Abou Haidar",
    alternate: "Sasha Ghorayeb",
    icon: Megaphone,
    color: "from-[#8B5CF6] to-[#A78BFA]",
  },
  {
    role: "Newsletter",
    name: "Matteo Kozak & Fay Haydamous",
    alternate: null,
    icon: Mail,
    color: "from-[#0891B2] to-[#22D3EE]",
  },
  {
    role: "Evenements",
    name: "Maria Keuchgerian",
    alternate: "Caline Mehranian, Jana Labaky, Reem Feghali, Nella Hechaime",
    icon: PartyPopper,
    color: "from-[#DB2777] to-[#F472B6]",
  },
  {
    role: "Tresorerie",
    name: "Marc Bejjani",
    alternate: "Gabrielle Tauk, Chris Kabakian, Chris Tchopourian",
    icon: Wallet,
    color: "from-[#059669] to-[#34D399]",
  },
];

const subcommittees = [
  { name: "Secretariat", icon: PenLine },
  { name: "Tresorerie", icon: Wallet },
  { name: "Evenements", icon: PartyPopper },
  { name: "Reseaux sociaux", icon: Megaphone },
  { name: "Web Radio", icon: Radio },
];

const hardcodedEvents = [
  {
    title: "Brunch des Anciens",
    date: "11 juillet 2025",
    year: "2025",
    description:
      "Retrouvailles entre anciens, enseignants et personnel du lycee autour d'un brunch convivial sur le campus de Beit Chabab. Une journee de fraternite, de convivialite et de souvenirs partages ou chacun a pu raviver les liens qui unissent les generations du Lycee Montaigne.",
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
    title: "Reunion de Noel",
    date: "23 decembre 2024",
    year: "2024",
    description:
      "Retrouvailles festives a l'occasion des fetes de fin d'annee. Retrouvailles emouvantes, rires et souvenirs partages — l'occasion parfaite de se retrouver, d'echanger sur les parcours depuis le lycee et de profiter de l'esprit de Noel en bonne compagnie.",
    images: [
      "/images/anciens/March2025/LBqkCVHdyv78XpGnfAH1.jpeg",
      "/images/anciens/March2025/HEQxBeweJfWguNossQOS.jpeg",
      "/images/anciens/March2025/f3vVhxbqZ3nUKILttEH9.jpeg",
      "/images/anciens/March2025/WSLY3ZnIDWp00MfIrMMT.jpeg",
      "/images/anciens/March2025/67aHfEHl4KuY6fxQ2vGe.jpeg",
      "/images/anciens/March2025/5iiQNILm422XxkXqGkFe.jpeg",
      "/images/anciens/March2025/gM5S027koxZof9K6pum8.jpeg",
    ],
  },
  {
    title: "Premier Brunch & Fondation de l'AALM",
    date: "19 juillet 2024",
    year: "2024",
    description:
      "Premier brunch des anciens sur le campus de Beit Chabab pour les promos 2022, 2023 et 2024. C'est lors de cette journee fondatrice qu'a ete elu le comite constitutif de l'AALM, marquant le debut officiel de l'Amicale des Anciens du Lycee Montaigne.",
    images: [
      "/images/anciens/December2024/Gr126Yxp86fX8jQaSwnh.jpeg",
      "/images/anciens/December2024/hjohJyJ8Yz3P14BGKWCk.jpeg",
      "/images/anciens/December2024/Yjx2dWMAEQgjzmlB9hcy.jpeg",
      "/images/anciens/December2024/UnkBO3aNJBHYDaqui4nt.jpeg",
      "/images/anciens/December2024/dcdN3CWKF92prbbgkGCc.jpeg",
    ],
  },
];

/* -- Types for DB events -- */

type AlumniPhotoRow = {
  id: string;
  eventId: string;
  imageUrl: string;
  altText: string;
  order: number;
};

type AlumniEventRow = {
  id: string;
  title: string;
  date: string;
  descriptionHtml: string | null;
  photos: AlumniPhotoRow[];
  createdAt: string;
  updatedAt: string;
};

/* -- helpers -- */

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function getYear(isoDate: string): string {
  return new Date(isoDate).getFullYear().toString();
}

/* -- component -- */

export function AnciensContent({ events: dbEvents }: { events: AlumniEventRow[] }) {
  // Use DB events if available, otherwise fall back to hardcoded
  const useDbEvents = dbEvents.length > 0;

  const events = useDbEvents
    ? dbEvents.map((e) => ({
        title: e.title,
        date: formatDate(e.date),
        year: getYear(e.date),
        description: e.descriptionHtml || "",
        images: e.photos.map((p) => p.imageUrl),
      }))
    : hardcodedEvents;

  return (
    <>
      {/* Immersive Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src="/images/anciens-heros/November2024/FBsgd5jjTeNC5ITDmt9U.jpeg"
          alt="Les anciens eleves du Lycee Montaigne reunis sur le campus"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16">
            <FadeInView>
              <span className="mb-3 inline-block rounded-full bg-secondary/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                Communaute
              </span>
              <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Anciens Eleves
              </h1>
              <p className="mt-3 max-w-xl text-lg text-white/80">
                Une famille qui grandit au-dela des murs du lycee
              </p>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* AALM Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
                Amicale des Anciens du LM
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">
                L&apos;AALM a ete fondee en juillet 2024 lors du premier brunch des anciens
                sur le campus de Beit Chabab. Elle reunit les anciens eleves des promotions
                2022, 2023 et 2024 — et toutes celles a venir — autour d&apos;evenements,
                de projets communs et d&apos;un esprit de solidarite.
              </p>
            </div>
          </FadeInView>

          {/* Quote */}
          <FadeInView>
            <blockquote className="mx-auto mt-12 max-w-2xl rounded-[20px] border border-border bg-background-alt p-8 shadow-[var(--shadow-soft)]">
              <p className="text-center font-heading text-lg italic leading-relaxed text-text md:text-xl">
                &laquo; Quelle joie de voir tant de visages familiers reunis.
                Gardez cet esprit de communaute et de solidarite. &raquo;
              </p>
              <footer className="mt-4 text-center text-sm text-text-muted">
                — <strong>Mme Rachel Atallah</strong>, Cheffe d&apos;etablissement
              </footer>
            </blockquote>
          </FadeInView>

          {/* Subcommittees pills */}
          <FadeInView>
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-medium text-text-muted">Sous-comites :</span>
              {subcommittees.map((sc) => (
                <span
                  key={sc.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-text shadow-sm"
                >
                  <sc.icon className="h-3.5 w-3.5 text-primary" />
                  {sc.name}
                </span>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Committee */}
      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Comite de l'AALM"
            subtitle="Elu lors du brunch fondateur du 19 juillet 2024"
          />
          <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {committee.map((member, idx) => {
              const Icon = member.icon;
              return (
                <StaggerItem key={member.name}>
                  <div className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)]">
                    <div className={`bg-gradient-to-br ${member.color} p-5 text-white`}>
                      <Icon className="h-7 w-7 opacity-80" />
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-white/70">
                        {member.role}
                      </p>
                    </div>
                    <div className="p-5">
                      <p className={`font-heading font-semibold text-text ${idx === 0 ? "text-lg" : "text-base"}`}>
                        {member.name}
                      </p>
                      {member.alternate && (
                        <p className="mt-1.5 text-xs text-text-muted">
                          Suppleant{member.alternate.includes(",") ? "s" : ""} : {member.alternate}
                        </p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      <WaveDivider fill="var(--color-background)" className="relative -mb-px" />

      {/* Events timeline */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Nos evenements"
            subtitle="Retrouvailles, brunchs et celebrations qui renforcent nos liens"
          />

          <div className="relative mt-16 space-y-20">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:block" />

            {events.map((event, i) => (
              <FadeInView key={event.date}>
                <div className="relative md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 hidden h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-sm font-bold text-white shadow-lg md:flex">
                    {event.year}
                  </div>

                  {/* Event card */}
                  <div className="overflow-hidden rounded-[24px] border border-border bg-background shadow-[var(--shadow-warm)]">
                    {/* Header */}
                    <div className="border-b border-border p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          <Calendar className="mr-1 inline h-3 w-3" />
                          {event.date}
                        </span>
                      </div>
                      <h3 className="mt-3 font-heading text-2xl font-bold text-text md:text-3xl">
                        {event.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-text-muted">
                        {event.description}
                      </p>
                    </div>

                    {/* Photo grid */}
                    <div className="p-4 md:p-6">
                      {i === 0 ? (
                        /* First event: hero + grid layout */
                        <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:aspect-auto">
                            <Image
                              src={event.images[0]}
                              alt={`${event.title} - Photo principale`}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 66vw"
                            />
                          </div>
                          {event.images.slice(1, 5).map((img, j) => (
                            <div key={j} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                              <Image
                                src={img}
                                alt={`${event.title} - Photo ${j + 2}`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 22vw"
                              />
                            </div>
                          ))}
                          {event.images.length > 5 && (
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                              <Image
                                src={event.images[5]}
                                alt={`${event.title} - Photo ${6}`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 22vw"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Other events: masonry-ish grid */
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                          {event.images.map((img, j) => (
                            <div
                              key={j}
                              className={`relative overflow-hidden rounded-2xl ${
                                j === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/3]" : "aspect-[4/3]"
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`${event.title} - Photo ${j + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <FadeInView>
            <Heart className="mx-auto h-10 w-10 text-secondary-light" />
            <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
              Vous etes ancien(ne) du LM ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Rejoignez l&apos;AALM et restez connecte(e) a votre communaute.
              Evenements, retrouvailles et projets vous attendent.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-background hover:shadow-xl"
            >
              Nous contacter
            </a>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
