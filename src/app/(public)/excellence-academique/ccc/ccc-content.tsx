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
import { localImage } from "@/lib/utils";
import type { CccFunction, CccResource } from "@/lib/settings";
import {
  Library,
  Monitor,
  Theater,
  BrainCircuit,
  BookOpen,
  BookMarked,
  ArrowLeft,
  ExternalLink,
  Mail,
  Search,
  type LucideIcon,
} from "lucide-react";

/* ---- Types ---- */

interface ActivityItemData {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  category: string;
  order: number;
}

/* ---- Component ---- */

/* Color cycling for CCC function cards */
const functionColors = [
  "from-primary to-primary-dark",
  "from-[#0891B2] to-[#0E7490]",
  "from-secondary to-secondary-dark",
  "from-[#7C3AED] to-[#6D28D9]",
];

/* Icon cycling for CCC function cards */
const functionIcons = [Library, Monitor, Theater, BrainCircuit];

interface CccContentProps {
  activities: ActivityItemData[];
  cccFunctions: CccFunction[];
  cccResources: CccResource[];
  cccEmail: string;
}

export function CccContent({ activities, cccFunctions, cccResources, cccEmail }: CccContentProps) {

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Centre de Connaissances et de Culture (CCC)"
        image="/images/excellence-bcd-ccc-extras/March2025/ZknXu3aPYo0iKijrLgFt.jpeg"
      />

      {/* Quote */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <FadeInView>
            <blockquote className="relative">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-serif text-8xl leading-none text-secondary/20">
                &ldquo;
              </span>
              <p className="relative z-10 font-serif text-2xl font-medium italic leading-relaxed text-text md:text-3xl lg:text-4xl">
                Un livre est une fenetre par laquelle on s&apos;evade
              </p>
              <footer className="mt-6">
                <cite className="not-italic text-base font-semibold text-primary">
                  &mdash; Julien Green
                </cite>
              </footer>
            </blockquote>
          </FadeInView>
        </div>
      </section>

      {/* Overview */}
      <section className="relative overflow-hidden bg-background-alt">
        <WaveDivider
          fill="var(--color-background)"
          flip
          className="relative z-10"
        />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <FadeInView>
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)]">
                    <Image
                      src="/images/excellence-bcd-ccc-extras/March2025/rH1Pp2VNCmOq42KoG7Rm.jpeg"
                      alt="Espace du Centre de Connaissances et de Culture"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[20px] shadow-[var(--shadow-soft)]">
                    <Image
                      src="/images/excellence-bcd-ccc-extras/November2025/4rQCpvOLwImnO4a1DDyT.jpg"
                      alt="Activites au CCC du Lycee Montaigne"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </FadeInView>
              <FadeInView delay={0.15}>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
                  Secondaire &middot; College &amp; Lycee
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold text-text md:text-4xl">
                  Un espace moderne au service de la reussite
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-muted">
                  Inaugure recemment, le Centre de Connaissances et de Culture
                  (CCC) du Lycee Montaigne est un lieu de vie et
                  d&apos;apprentissage ouvert a tous les eleves du secondaire.
                  Equipe de mobilier flexible et de ressources numeriques
                  modernes, il offre un environnement propice au travail
                  individuel, a la collaboration et a l&apos;epanouissement
                  culturel.
                </p>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  Le CCC est bien plus qu&apos;une bibliotheque : c&apos;est un
                  veritable carrefour de connaissances ou les eleves
                  developpent leur autonomie, leur curiosite intellectuelle et
                  leurs competences informationnelles.
                </p>
              </FadeInView>
            </div>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* Four Key Functions */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Nos quatre missions"
            subtitle="Le CCC s'articule autour de quatre fonctions complementaires"
          />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2">
            {cccFunctions.map((fn, i) => {
              const Icon = functionIcons[i % functionIcons.length];
              const color = functionColors[i % functionColors.length];
              return (
                <StaggerItem key={fn.title}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
                    <div
                      className={`flex items-center gap-4 bg-gradient-to-r ${color} p-6`}
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                        <Icon
                          className="h-7 w-7 text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {fn.title}
                      </h3>
                    </div>
                    <div className="flex-1 p-6">
                      <p className="text-sm leading-relaxed text-text-muted">
                        {fn.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Resources */}
      <section className="relative overflow-hidden bg-background-alt">
        <WaveDivider
          fill="var(--color-background)"
          flip
          className="relative z-10"
        />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Ressources documentaires"
              subtitle="Des outils numeriques pour explorer, rechercher et apprendre"
            />

            {cccResources.length > 0 && (
            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
              {cccResources.map((res) => (
                  <StaggerItem key={res.name}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-start gap-5 rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-[var(--shadow-soft)]">
                        <Search className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-text transition-colors group-hover:text-primary">
                          {res.name}
                          <ExternalLink className="h-4 w-4 text-text-muted transition-colors group-hover:text-primary" />
                        </h3>
                      </div>
                    </a>
                  </StaggerItem>
              ))}
            </StaggerChildren>
            )}

            {/* Contact — only shown if email is set */}
            {cccEmail && (
            <FadeInView>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-[20px] border border-border bg-background p-6 text-center shadow-[var(--shadow-soft)] sm:flex-row sm:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">
                    Contactez le CCC
                  </p>
                  <a
                    href={`mailto:${cccEmail}`}
                    className="text-sm text-primary underline-offset-2 transition-colors hover:underline"
                  >
                    {cccEmail}
                  </a>
                </div>
              </div>
            </FadeInView>
            )}
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* Activities */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Activites et evenements"
            subtitle="Un programme riche d'animations culturelles tout au long de l'annee"
          />
          <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <StaggerItem key={activity.id}>
                <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                  {/* Activity photo */}
                  {localImage(activity.image) && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={localImage(activity.image)!}
                        alt={activity.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-[var(--shadow-soft)]">
                        <BookMarked className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-base font-bold text-text transition-colors group-hover:text-primary">
                        {activity.title}
                      </h3>
                    </div>
                    {activity.description && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
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

      {/* CTA / Back Link */}
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
                      Decouvrir aussi
                    </span>
                    <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                      Bibliotheque Centre Documentaire (BCD)
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-white/75">
                      La BCD accueille les eleves du primaire dans un espace
                      chaleureux dedie a la lecture, a la decouverte et a
                      l&apos;eveil culturel des le plus jeune age.
                    </p>
                    <Link
                      href="/excellence-academique/bcd"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.2)]"
                    >
                      Explorer la BCD
                      <BookOpen className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="relative min-h-[300px] lg:min-h-full">
                    <Image
                      src="/images/excellence-bcd-ccc-extras/November2025/4rQCpvOLwImnO4a1DDyT.jpg"
                      alt="Bibliotheque Centre Documentaire"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent lg:from-primary/60" />
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* Back link */}
            <FadeInView>
              <div className="mt-12 text-center">
                <Link
                  href="/excellence-academique"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-text shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:text-primary hover:shadow-[var(--shadow-warm)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour a l&apos;Excellence Academique
                </Link>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>
    </>
  );
}
