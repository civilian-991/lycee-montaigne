"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { BookOpen, GraduationCap, Award, Heart, ArrowRight, CheckCircle2, Compass, Palette } from "lucide-react";

const programs = [
  {
    title: "Ecole Maternelle",
    levels: "PS – MS – GS",
    href: "/excellence-academique/offre-pedagogique/maternelle",
    color: "from-secondary to-secondary-dark",
    badge: "3–5 ans",
    image: "/images/offre-pedagogiques/March2025/yBsX8u4ZVOVu4Ki1b9bZ.png",
  },
  {
    title: "Ecole Elementaire",
    levels: "CP – CE1 – CE2 – CM1 – CM2",
    href: "/excellence-academique/offre-pedagogique/elementaire",
    color: "from-secondary to-secondary-dark",
    badge: "6–10 ans",
    image: "/images/offre-pedagogiques/March2025/FMajMIbeBmTj2pZsVXg2.png",
  },
  {
    title: "College",
    levels: "6eme – 5eme – 4eme – 3eme",
    href: "/excellence-academique/offre-pedagogique/college",
    color: "from-primary to-primary-dark",
    badge: "11–14 ans",
    extra: "Brevet Libanais ou Diplome National du Brevet",
    image: "/images/offre-pedagogiques/March2025/V5TaePZh3OK30gBE0zGt.png",
  },
  {
    title: "Lycee",
    levels: "2nde – 1ere – Terminale",
    href: "/excellence-academique/offre-pedagogique/lycee",
    color: "from-primary to-primary-dark",
    badge: "15–17 ans",
    extra: "BFI • Bac General • Bac Libanais",
    image: "/images/offre-pedagogiques/March2025/ySjFCadTOSWucBhIhl2w.png",
  },
];

const diplomas = [
  { name: "Diplome National du Brevet (DNB)", type: "Francais" },
  { name: "Brevet Libanais", type: "Libanais" },
  { name: "Bac Francais", type: "Francais" },
  { name: "Bac Libanais", type: "Libanais" },
  { name: "Bac Francais International (BFI)", type: "International" },
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
    title: "Assurer un parcours d'excellence a tous les eleves",
    num: "01",
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
    title: "Accompagner la montee en puissance du Lycee Montaigne",
    num: "02",
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
    title: "Cultiver l'identite humaniste de l'etablissement",
    num: "03",
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
  { title: "Parcours citoyen", description: "Formation du citoyen responsable et engage, participation a la vie democratique de l'etablissement.", icon: Compass },
  { title: "Parcours Avenir", description: "Orientation et decouverte du monde professionnel des la 6eme jusqu'a la terminale.", icon: GraduationCap },
  { title: "Parcours educatif de sante", description: "Education a la sante, prevention et protection des eleves tout au long de leur scolarite.", icon: Heart },
  { title: "Parcours d'education artistique et culturelle", description: "Rencontre avec les oeuvres, pratique artistique et acquisition de connaissances culturelles.", icon: Palette },
];

export default function ExcellenceAcademiquePage() {
  return (
    <>
      <PageHero title="Excellence Academique" />

      {/* ─── Offre pedagogique ─────────────────────────────────── */}
      <section id="pedagogie" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Offre pedagogique"
            subtitle="De la maternelle au baccalaureat, un parcours d'excellence continu"
          />
          <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <StaggerItem key={program.title}>
                <Link
                  href={program.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]"
                >
                  {/* Visual header with gradient + image */}
                  <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${program.color} p-6`}>
                    {/* Age badge */}
                    <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {program.badge}
                    </span>
                    <div className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-contain drop-shadow-lg"
                        sizes="96px"
                      />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-text transition-colors group-hover:text-primary">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{program.levels}</p>
                    {program.extra && (
                      <p className="mt-3 rounded-lg bg-secondary/8 px-3 py-1.5 text-xs font-medium text-secondary">
                        {program.extra}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Decouvrir <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Examens et Certificats ────────────────────────────── */}
      <section id="resultats" className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Examens et Certificats"
              subtitle="Des diplomes reconnus et des certifications internationales"
            />

            {/* Diplomas + Results — balanced layout */}
            <FadeInView>
              <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
                {/* Results image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)]">
                  <Image
                    src="/images/examens-resultats/January2026/resized_IMG_6942.PNG"
                    alt="Resultats 2024-2025"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Diplomas */}
                <div>
                  <h3 className="font-heading text-2xl font-bold text-primary">Diplomes prepares</h3>
                  <p className="mt-2 text-sm text-text-muted">
                    Nos eleves sont prepares aux examens francais, libanais et internationaux
                  </p>
                  <div className="mt-5 space-y-2.5">
                    {diplomas.map((d) => (
                      <div
                        key={d.name}
                        className="flex items-center gap-3.5 rounded-2xl border border-border bg-background p-4 shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-warm)]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                          <Award className="h-5 w-5 text-secondary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-text">{d.name}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                          {d.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* Certifications */}
            <div className="mt-16">
              <FadeInView>
                <h3 className="text-center font-heading text-2xl font-bold text-primary">Certifications internationales</h3>
                <p className="mx-auto mt-2 max-w-xl text-center text-sm text-text-muted">
                  Nos eleves preparent et obtiennent des certifications reconnues mondialement
                </p>
              </FadeInView>
              <StaggerChildren className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {certifications.map((cert) => (
                  <StaggerItem key={cert.name}>
                    <div className="group flex flex-col items-center rounded-2xl border border-border bg-background p-5 text-center shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                      <div className="relative h-16 w-16 transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={cert.image}
                          alt={cert.name}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                      <p className="mt-3 text-xs font-semibold text-text">{cert.name}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Projet d'etablissement ────────────────────────────── */}
      <section id="projet" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Projet d'etablissement 2021–2026"
            subtitle="Trois axes strategiques pour accompagner chaque eleve vers la reussite"
          />
          <div className="mt-14 space-y-8">
            {axes.map((axe, i) => (
              <FadeInView key={axe.num}>
                <div className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)]">
                  <div className={`grid items-stretch lg:grid-cols-5 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
                    {/* Image side */}
                    <div className={`relative min-h-[240px] lg:col-span-2 ${i % 2 !== 0 ? "lg:col-start-4" : ""}`}>
                      <Image
                        src={axe.image}
                        alt={axe.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      {/* Axis number overlay */}
                      <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-warm)] backdrop-blur-sm">
                        <span className="font-heading text-lg font-bold text-primary">{axe.num}</span>
                      </div>
                    </div>
                    {/* Content side */}
                    <div className="p-6 md:p-8 lg:col-span-3">
                      <h3 className="text-xl font-bold text-primary md:text-2xl">{axe.title}</h3>
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {axe.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                            <span className="text-sm text-text-muted">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Parcours educatifs ─────────────────────────────────── */}
      <section id="parcours" className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader title="Parcours educatifs" />
            <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2">
              {parcours.map((p) => {
                const Icon = p.icon;
                return (
                  <StaggerItem key={p.title}>
                    <div className="flex h-full gap-5 rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-[var(--shadow-soft)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-text">{p.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{p.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Pole inclusion ────────────────────────────────────── */}
      <section id="pole" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-primary to-primary-dark shadow-[var(--shadow-elevated)]">
              <div className="grid items-center lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 uppercase">
                    Engagement inclusif
                  </span>
                  <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                    Pole inclusion
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/75">
                    Le Lycee Montaigne s&apos;engage pour l&apos;inclusion de tous les eleves a besoins educatifs
                    particuliers (EBEP). Notre pole inclusion accompagne chaque enfant dans son parcours scolaire
                    avec des dispositifs adaptes.
                  </p>
                  <Link
                    href="/pole-inclusion"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.2)]"
                  >
                    Decouvrir le pole inclusion
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative min-h-[300px] lg:min-h-full">
                  <Image
                    src="/images/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg"
                    alt="Pole inclusion"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent lg:from-primary/60" />
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ─── BCD – CCC ─────────────────────────────────────────── */}
      <section id="bcd" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="BCD – CCC" subtitle="Nos espaces de lecture et de culture" />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <Link href="/excellence-academique/bcd" className="group relative block aspect-[16/10] overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)]">
                <Image
                  src="/images/excellence-bcd-ccc-extras/November2025/4rQCpvOLwImnO4a1DDyT.jpg"
                  alt="Bibliotheque Centre Documentaire"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-8">
                  <span className="inline-block rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-white">
                    Primaire
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">
                    Bibliotheque Centre Documentaire (BCD)
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-white/70 transition-colors group-hover:text-white">
                    Explorer <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/excellence-academique/ccc" className="group relative block aspect-[16/10] overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)]">
                <Image
                  src="/images/excellence-bcd-ccc-extras/March2025/ZknXu3aPYo0iKijrLgFt.jpeg"
                  alt="Centre de Connaissances et de Culture"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-8">
                  <span className="inline-block rounded-full bg-primary-light/80 px-3 py-1 text-xs font-semibold text-white">
                    Secondaire
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">
                    Centre de Connaissances et de Culture (CCC)
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-white/70 transition-colors group-hover:text-white">
                    Explorer <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
