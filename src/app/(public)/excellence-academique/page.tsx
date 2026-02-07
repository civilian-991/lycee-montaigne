"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { BookOpen, GraduationCap, Award, Heart } from "lucide-react";

const programs = [
  {
    title: "Ecole Maternelle",
    levels: "PS – MS – GS",
    href: "/excellence-academique/offre-pedagogique/maternelle",
    color: "bg-secondary",
    image: "/images/offre-pedagogiques/March2025/yBsX8u4ZVOVu4Ki1b9bZ.png",
  },
  {
    title: "Ecole Elementaire",
    levels: "CP – CE1 – CE2 – CM1 – CM2",
    href: "/excellence-academique/offre-pedagogique/elementaire",
    color: "bg-secondary",
    image: "/images/offre-pedagogiques/March2025/FMajMIbeBmTj2pZsVXg2.png",
  },
  {
    title: "College",
    levels: "6eme – 5eme – 4eme – 3eme",
    href: "/excellence-academique/offre-pedagogique/college",
    color: "bg-primary",
    extra: "Brevet Libanais ou Diplome National du Brevet",
    image: "/images/offre-pedagogiques/March2025/V5TaePZh3OK30gBE0zGt.png",
  },
  {
    title: "Lycee",
    levels: "2nde – 1ere – Terminale",
    href: "/excellence-academique/offre-pedagogique/lycee",
    color: "bg-primary",
    extra: "Bac Francais International • Bac General • Bac Libanais",
    image: "/images/offre-pedagogiques/March2025/ySjFCadTOSWucBhIhl2w.png",
  },
];

const diplomas = [
  "Le Diplome National du Brevet (DNB)",
  "Brevet Libanais",
  "Bac Francais",
  "Bac Libanais",
  "Bac Francais International (BFI)",
];

const certifications = [
  { name: "Cambridge English Certificate", image: "/images/certificates/November2024/YutiYtDi0zuxMBPliMh3.jpeg" },
  { name: "IELTS", image: "/images/certificates/November2024/efSpqghzlYYijlgfFavw.png" },
  { name: "DELE", image: "/images/certificates/November2024/ViDy8mEJXK3IcwBFsWR8.png" },
  { name: "PIX", image: "/images/certificates/November2024/Pg3enjuqnTHgxraxiYwT.png" },
  { name: "SAT", image: "/images/certificates/November2024/XyKeUu4XU8MRwE5EwY4z.png" },
  { name: "CIMA", image: "/images/certificates/May2025/fD40mxinf2JZXQHf1GYq.webp" },
];

const axes = [
  {
    title: "Axe 1 : Assurer un parcours d'excellence a tous les eleves",
    items: [
      "Renforcer la maitrise de la langue francaise",
      "Developper les competences en langues vivantes",
      "Promouvoir les sciences et la culture numerique",
      "Favoriser les parcours artistiques et culturels",
      "Accompagner chaque eleve vers sa reussite",
      "Renforcer l'evaluation formative",
    ],
    image: "/images/axes/April2024/Fn1kk4j4j4fhc0yTmXkP.png",
  },
  {
    title: "Axe 2 : Accompagner la montee en puissance du Lycee Montaigne",
    items: [
      "Developper une politique d'attractivite",
      "Renforcer la communication interne et externe",
      "Moderniser les pratiques pedagogiques",
      "Optimiser la gestion des ressources",
      "Developper les partenariats",
    ],
    image: "/images/axes/April2024/hqG7U0znrO7cPD9llXWC.png",
  },
  {
    title: "Axe 3 : Cultiver l'identite humaniste de l'etablissement",
    items: [
      "Promouvoir les valeurs de tolerance et de respect",
      "Developper l'eco-citoyennete",
      "Renforcer l'egalite filles-garcons",
      "Favoriser l'inclusion et la diversite",
      "Developper le sentiment d'appartenance",
    ],
    image: "/images/axes/April2024/03oaImjGLsLUMIf7Ydtb.png",
  },
];

const parcours = [
  { title: "Parcours citoyen", description: "Formation du citoyen responsable et engage.", icon: Heart },
  { title: "Parcours Avenir", description: "Orientation et decouverte du monde professionnel des la 6eme.", icon: GraduationCap },
  { title: "Parcours educatif de sante", description: "Education a la sante, prevention et protection.", icon: Heart },
  { title: "Parcours d'education artistique et culturelle", description: "Rencontre avec les oeuvres, pratique artistique et acquisition de connaissances.", icon: BookOpen },
];

export default function ExcellenceAcademiquePage() {
  return (
    <>
      <PageHero title="Excellence Academique" />

      {/* Offre pedagogique */}
      <section id="pedagogie" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Offre pedagogique" />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <StaggerItem key={program.title}>
                <Link
                  href={program.href}
                  className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className={`${program.color} flex h-32 items-center justify-center p-4`}>
                    <div className="relative h-20 w-20">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-text group-hover:text-primary">{program.title}</h3>
                    <p className="mt-1 text-xs text-text-muted">{program.levels}</p>
                    {program.extra && (
                      <p className="mt-2 text-xs font-medium text-secondary">{program.extra}</p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Resultats et Diplomes */}
      <section id="resultats" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Examens et Certificats" />
          <FadeInView>
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/examens-resultats/January2026/resized_IMG_6942.PNG"
                  alt="Resultats 2024-2025"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Diplomes prepares</h3>
                <ul className="mt-4 space-y-3">
                  {diplomas.map((d) => (
                    <li key={d} className="flex items-center gap-3">
                      <Award className="h-5 w-5 shrink-0 text-secondary" />
                      <span className="text-sm text-text">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInView>

          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-center text-xl font-semibold">Certifications</h3>
            <StaggerChildren className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {certifications.map((cert) => (
                <StaggerItem key={cert.name}>
                  <div className="flex flex-col items-center rounded-2xl border border-border bg-background p-4 text-center shadow-[var(--shadow-soft)]">
                    <div className="relative h-16 w-16">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium text-text">{cert.name}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Projet d'etablissement */}
      <section id="projet" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Projet d'etablissement 2021-2026" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-text-muted">
            Le projet d&apos;etablissement du Lycee Montaigne s&apos;articule autour de trois axes strategiques
            pour accompagner chaque eleve vers la reussite.
          </p>
          <div className="mt-12 space-y-12">
            {axes.map((axe, i) => (
              <FadeInView key={axe.title}>
                <div className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
                  <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                    <div className="relative aspect-video overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                      <Image
                        src={axe.image}
                        alt={axe.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{axe.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {axe.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours educatifs */}
      <section id="parcours" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Parcours educatifs" />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {parcours.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <div className="rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{p.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Pole inclusion */}
      <section id="pole" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Pole inclusion" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Le Lycee Montaigne s&apos;engage pour l&apos;inclusion de tous les eleves a besoins educatifs
                  particuliers (EBEP). Notre pole inclusion accompagne chaque enfant dans son parcours scolaire
                  avec des dispositifs adaptes.
                </p>
                <Link
                  href="/pole-inclusion"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[var(--shadow-warm)]"
                >
                  Decouvrir le pole inclusion
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg"
                  alt="Pole inclusion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* BCD - CCC */}
      <section id="bcd" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="BCD – CCC" />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <Link href="/excellence-academique/bcd" className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/excellence-bcd-ccc-extras/November2025/4rQCpvOLwImnO4a1DDyT.jpg"
                  alt="Bibliotheque Centre Documentaire"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white">Bibliotheque Centre Documentaire (BCD)</h3>
                </div>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/excellence-academique/ccc" className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/excellence-bcd-ccc-extras/March2025/ZknXu3aPYo0iKijrLgFt.jpeg"
                  alt="Centre de Connaissances et de Culture"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white">Centre de Connaissances et de Culture (CCC)</h3>
                </div>
              </Link>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
