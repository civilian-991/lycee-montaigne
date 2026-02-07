import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { BookOpen, GraduationCap, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Excellence Académique",
  description: "Offre pédagogique, examens, certifications et projet d'établissement du Lycée Montaigne de Beit Chabab.",
};

const programs = [
  {
    title: "École Maternelle",
    levels: "PS – MS – GS",
    href: "/excellence-academique/offre-pedagogique/maternelle",
    color: "bg-secondary",
    image: "/images/offre-pedagogiques/March2025/yBsX8u4ZVOVu4Ki1b9bZ.png",
  },
  {
    title: "École Élémentaire",
    levels: "CP – CE1 – CE2 – CM1 – CM2",
    href: "/excellence-academique/offre-pedagogique/elementaire",
    color: "bg-secondary",
    image: "/images/offre-pedagogiques/March2025/FMajMIbeBmTj2pZsVXg2.png",
  },
  {
    title: "Collège",
    levels: "6ème – 5ème – 4ème – 3ème",
    href: "/excellence-academique/offre-pedagogique/college",
    color: "bg-primary",
    extra: "Brevet Libanais ou Diplôme National du Brevet",
    image: "/images/offre-pedagogiques/March2025/V5TaePZh3OK30gBE0zGt.png",
  },
  {
    title: "Lycée",
    levels: "2nde – 1ère – Terminale",
    href: "/excellence-academique/offre-pedagogique/lycee",
    color: "bg-primary",
    extra: "Bac Français International • Bac Général • Bac Libanais",
    image: "/images/offre-pedagogiques/March2025/ySjFCadTOSWucBhIhl2w.png",
  },
];

const diplomas = [
  "Le Diplôme National du Brevet (DNB)",
  "Brevet Libanais",
  "Bac Français",
  "Bac Libanais",
  "Bac Français International (BFI)",
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
    title: "Axe 1 : Assurer un parcours d'excellence à tous les élèves",
    items: [
      "Renforcer la maîtrise de la langue française",
      "Développer les compétences en langues vivantes",
      "Promouvoir les sciences et la culture numérique",
      "Favoriser les parcours artistiques et culturels",
      "Accompagner chaque élève vers sa réussite",
      "Renforcer l'évaluation formative",
    ],
    image: "/images/axes/April2024/Fn1kk4j4j4fhc0yTmXkP.png",
  },
  {
    title: "Axe 2 : Accompagner la montée en puissance du Lycée Montaigne",
    items: [
      "Développer une politique d'attractivité",
      "Renforcer la communication interne et externe",
      "Moderniser les pratiques pédagogiques",
      "Optimiser la gestion des ressources",
      "Développer les partenariats",
    ],
    image: "/images/axes/April2024/hqG7U0znrO7cPD9llXWC.png",
  },
  {
    title: "Axe 3 : Cultiver l'identité humaniste de l'établissement",
    items: [
      "Promouvoir les valeurs de tolérance et de respect",
      "Développer l'éco-citoyenneté",
      "Renforcer l'égalité filles-garçons",
      "Favoriser l'inclusion et la diversité",
      "Développer le sentiment d'appartenance",
    ],
    image: "/images/axes/April2024/03oaImjGLsLUMIf7Ydtb.png",
  },
];

const parcours = [
  { title: "Parcours citoyen", description: "Formation du citoyen responsable et engagé.", icon: Heart },
  { title: "Parcours Avenir", description: "Orientation et découverte du monde professionnel dès la 6ème.", icon: GraduationCap },
  { title: "Parcours éducatif de santé", description: "Éducation à la santé, prévention et protection.", icon: Heart },
  { title: "Parcours d'éducation artistique et culturelle", description: "Rencontre avec les œuvres, pratique artistique et acquisition de connaissances.", icon: BookOpen },
];

export default function ExcellenceAcademiquePage() {
  return (
    <>
      <PageHero title="Excellence Académique" />

      {/* Offre pédagogique */}
      <section id="pedagogie" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Offre pédagogique" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
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
            ))}
          </div>
        </div>
      </section>

      {/* Résultats et Diplômes */}
      <section id="resultats" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Examens et Certificats" />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/examens-resultats/January2026/resized_IMG_6942.PNG"
                alt="Résultats 2024-2025"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Diplômes préparés</h3>
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

          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-center text-xl font-semibold">Certifications</h3>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center rounded-lg border border-border bg-white p-4 text-center"
                >
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projet d'établissement */}
      <section id="projet" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Projet d'établissement 2021-2026" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-text-muted">
            Le projet d&apos;établissement du Lycée Montaigne s&apos;articule autour de trois axes stratégiques
            pour accompagner chaque élève vers la réussite.
          </p>
          <div className="mt-12 space-y-12">
            {axes.map((axe, i) => (
              <div
                key={axe.title}
                className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
              >
                <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <div className="relative aspect-video overflow-hidden rounded-xl">
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
            ))}
          </div>
        </div>
      </section>

      {/* Parcours éducatifs */}
      <section id="parcours" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Parcours éducatifs" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {parcours.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-xl border border-border bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pôle inclusion */}
      <section id="pole" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Pôle inclusion" className="text-left" />
              <p className="mt-6 text-text-muted">
                Le Lycée Montaigne s&apos;engage pour l&apos;inclusion de tous les élèves à besoins éducatifs
                particuliers (EBEP). Notre pôle inclusion accompagne chaque enfant dans son parcours scolaire
                avec des dispositifs adaptés.
              </p>
              <Link
                href="/pole-inclusion"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light"
              >
                Découvrir le pôle inclusion
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg"
                alt="Pôle inclusion"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BCD - CCC */}
      <section id="bcd" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="BCD – CCC" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link href="/excellence-academique/bcd" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/excellence-bcd-ccc-extras/November2025/4rQCpvOLwImnO4a1DDyT.jpg"
                alt="Bibliothèque Centre Documentaire"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">Bibliothèque Centre Documentaire (BCD)</h3>
              </div>
            </Link>
            <Link href="/excellence-academique/ccc" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/excellence-bcd-ccc-extras/March2025/ZknXu3aPYo0iKijrLgFt.jpeg"
                alt="Centre de Connaissances et de Culture"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">Centre de Connaissances et de Culture (CCC)</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
