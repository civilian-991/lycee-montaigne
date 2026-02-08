"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import {
  FadeInView,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import {
  BookOpen,
  Users,
  Languages,
  BookMarked,
  Search,
  Mic2,
  Theater,
  Baby,
  PersonStanding,
  Moon,
  Scale,
  VolumeX,
  CircleDot,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────── */

const team = [
  { name: "Jennifer Bou Zeid", role: "Documentaliste arabe" },
  { name: "Leila Abboud", role: "Documentaliste francaise" },
];

const coreFunctions: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Activites pedagogiques",
    description:
      "Organiser des activites pedagogiques autour du livre et de la lecture pour developper le gout de lire chez les eleves.",
    icon: BookOpen,
  },
  {
    title: "Recherche documentaire",
    description:
      "Proposer un enseignement de la recherche documentaire a travers la classification Dewey et les outils de reference.",
    icon: Search,
  },
  {
    title: "Rencontres culturelles",
    description:
      "Accueillir auteurs, illustrateurs et conteurs pour enrichir l'univers litteraire des eleves et les inspirer.",
    icon: Mic2,
  },
  {
    title: "Pret multilingue",
    description:
      "Offrir un service de pret dans les trois langues : francais, anglais et arabe, pour encourager la lecture plurilingue.",
    icon: Languages,
  },
];

const activities: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    title: "Decouverte de la litterature",
    description:
      'Explorations litteraires variees comme "Comment j\'ai change ma vie" pour eveiller la curiosite des lecteurs.',
    icon: BookMarked,
    color: "from-primary to-primary-dark",
  },
  {
    title: "Commedia dell'arte",
    description:
      "Exploration de la commedia dell'arte avec les CM1, melant lecture, theatre et decouverte culturelle italienne.",
    icon: Theater,
    color: "from-secondary to-secondary-dark",
  },
  {
    title: "Spectacle de marionnettes",
    description:
      "Spectacles de marionnettes pour les maternelles, alliant narration et art visuel pour les plus jeunes.",
    icon: Baby,
    color: "from-primary-light to-primary",
  },
  {
    title: "Lecture en mouvement",
    description:
      "Activites de lecture en mouvement combinant expression corporelle et decouverte de textes.",
    icon: PersonStanding,
    color: "from-secondary to-secondary-dark",
  },
  {
    title: "Nuits de la Lecture",
    description:
      "Evenement festif dedie a la lecture, avec animations nocturnes et decouvertes litteraires pour toute la communaute.",
    icon: Moon,
    color: "from-primary-dark to-primary",
  },
  {
    title: "Droits de l'enfant",
    description:
      "Projet sur les droits de l'enfant a travers la litterature jeunesse et les echanges en classe.",
    icon: Scale,
    color: "from-secondary-dark to-secondary",
  },
  {
    title: "Silence, on lit !",
    description:
      "Temps de lecture silencieuse quotidien ou toute la communaute scolaire partage un moment de lecture.",
    icon: VolumeX,
    color: "from-primary to-primary-light",
  },
  {
    title: "Cercle de lecture",
    description:
      "Cercles de lecture permettant aux eleves d'echanger, debattre et partager leurs coups de coeur litteraires.",
    icon: CircleDot,
    color: "from-secondary to-secondary-dark",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function BCDPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <PageHero
        title="Bibliotheque Centre Documentaire (BCD)"
        image="/images/excellence-bcd-ccc-extras/November2025/4rQCpvOLwImnO4a1DDyT.jpg"
      />

      {/* ─── Overview ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text side */}
            <FadeInView>
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-secondary uppercase">
                Primaire
              </span>
              <h2 className="mt-4 text-3xl font-bold text-text md:text-4xl">
                Un espace dedie a la litterature jeunesse
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-muted">
                La Bibliotheque Centre Documentaire est consacree a la
                litterature jeunesse et a la promotion de la lecture dans les
                trois langues d&apos;enseignement : le francais, l&apos;anglais
                et l&apos;arabe. C&apos;est un lieu vivant ou les eleves du
                primaire decouvrent le plaisir de lire, apprennent a chercher
                l&apos;information et s&apos;ouvrent au monde a travers les
                livres.
              </p>

              {/* Team */}
              <div className="mt-8">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <Users className="h-4 w-4" />
                  Equipe documentaire
                </h3>
                <div className="mt-3 flex flex-col gap-2.5">
                  {team.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-background-alt px-4 py-3 shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text">
                          {member.name}
                        </p>
                        <p className="text-xs text-text-muted">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages badge row */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Francais", "Anglais", "Arabe"].map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-text-muted shadow-[var(--shadow-soft)]"
                  >
                    <Languages className="h-3 w-3 text-secondary" />
                    {lang}
                  </span>
                ))}
              </div>
            </FadeInView>

            {/* Image side */}
            <FadeInView delay={0.2}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)]">
                <Image
                  src="/images/excellence-bcd-ccc-extras/November2025/4rQCpvOLwImnO4a1DDyT.jpg"
                  alt="Bibliotheque Centre Documentaire du Lycee Montaigne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-black/5" />
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ─── Core Functions ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background-alt">
        <WaveDivider
          fill="var(--color-background)"
          flip
          className="relative z-10"
        />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Nos missions"
              subtitle="Quatre missions essentielles au service de la lecture et de la culture"
            />
            <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coreFunctions.map((fn) => {
                const Icon = fn.icon;
                return (
                  <StaggerItem key={fn.title}>
                    <div className="group flex h-full flex-col rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-text">
                        {fn.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                        {fn.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Activities ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Activites et evenements"
            subtitle="Des animations variees pour cultiver le plaisir de lire"
          />

          <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <StaggerItem key={activity.title}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
                    {/* Colored header band */}
                    <div
                      className={`flex h-28 items-center justify-center bg-gradient-to-br ${activity.color}`}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-bold text-text transition-colors group-hover:text-primary">
                        {activity.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Highlight Banner ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background-alt">
        <WaveDivider
          fill="var(--color-background)"
          flip
          className="relative z-10"
        />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-primary to-primary-dark shadow-[var(--shadow-elevated)]">
                <div className="grid items-center lg:grid-cols-2">
                  <div className="p-8 md:p-12">
                    <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 uppercase">
                      Lecture trilingue
                    </span>
                    <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                      Lire en trois langues
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-white/75">
                      La BCD met a disposition des eleves une riche collection
                      d&apos;ouvrages en francais, anglais et arabe. De la
                      litterature jeunesse aux documentaires, en passant par les
                      albums illustres et les bandes dessinees, chaque enfant
                      trouve de quoi nourrir sa curiosite et developper ses
                      competences linguistiques dans les trois langues.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {["Francais", "English", "العربية"].map((lang) => (
                        <span
                          key={lang}
                          className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-[300px] lg:min-h-full">
                    <Image
                      src="/images/excellence-bcd-ccc-extras/March2025/ZknXu3aPYo0iKijrLgFt.jpeg"
                      alt="Lecture a la BCD"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent lg:from-primary/60" />
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Back link ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="flex justify-center">
              <Link
                href="/excellence-academique"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-warm)]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Retour a l&apos;Excellence Academique
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
