"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, Award, Globe } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WaveDivider } from "@/components/ui/wave-divider";
import { StatsCounter } from "@/components/ui/stats-counter";
import {
  FadeInView,
  StaggerChildren,
  StaggerItem,
  TextReveal,
} from "@/components/ui/motion";

/* ------------------------------------------------------------------ */
/*  Props coming from the server component (page.tsx)                 */
/* ------------------------------------------------------------------ */

interface HomeContentProps {
  quickLinks: Array<{
    id: string;
    label: string;
    url: string;
    target: string;
    order: number;
  }>;
  featuredNews: Array<{
    id: string;
    title: string;
    image: string | null;
    link: string | null;
    category: string | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  }>;
  heroSlides: Array<{
    id: string;
    imageUrl: string;
    altText: string;
    link: string | null;
    order: number;
  }>;
}

/* ------------------------------------------------------------------ */
/*  Hardcoded fallbacks (used when the DB tables are empty)           */
/* ------------------------------------------------------------------ */

const defaultQuickLinks = [
  { label: "Inscriptions 2026-2027", href: "/inscriptions", icon: BookOpen },
  { label: "Calendrier scolaire", href: "/informations-pratiques#calendrier", icon: Globe },
  { label: "Menu Cantine", href: "/informations-pratiques#restauration", icon: Users },
  { label: "Pronote", href: "https://2050048n.index-education.net/pronote/", icon: Award, external: true },
];

const defaultFeaturedNews = [
  {
    title: "Inscriptions 2026-2027",
    description: "Les inscriptions pour l'annee scolaire 2026-2027 sont ouvertes. Consultez la procedure et les documents necessaires.",
    href: "/inscriptions",
    image: "/images/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png",
  },
  {
    title: "Portes Ouvertes Maternelle",
    description: "Venez decouvrir notre ecole maternelle lors de nos portes ouvertes.",
    href: "/inscriptions#porte-ouvertes",
    image: "/images/s4-files/January2026/U4IfChjnxOFzmzse6Tme.jpeg",
  },
  {
    title: "Resultats 2024-2025",
    description: "100% de reussite au baccalaureat. Decouvrez les resultats de nos eleves aux examens nationaux et internationaux.",
    href: "/excellence-academique#resultats",
    image: "/images/examens-resultats/January2026/resized_IMG_6942.PNG",
  },
];

const defaultHeroImage = "/images/hp-sliders/February2026/xsOXezH2jzRWmKTDo9zN.jpeg";

const stats = [
  { value: 1085, label: "Eleves" },
  { value: 100, suffix: "%", label: "Reussite au bac" },
  { value: 29, label: "Nationalites" },
  { value: 3, label: "Langues d'enseignement" },
];

const reasons = [
  {
    title: "Excellence academique",
    description: "Un enseignement rigoureux suivant les programmes francais, avec des resultats exceptionnels aux examens nationaux et internationaux.",
  },
  {
    title: "Ouverture internationale",
    description: "29 nationalites representees, un Bac Francais International, et des partenariats avec des universites prestigieuses dans le monde entier.",
  },
  {
    title: "Epanouissement de l'eleve",
    description: "Un accompagnement personnalise de la maternelle a la terminale, avec des activites periscolaires variees et un pole inclusion dedie.",
  },
  {
    title: "Valeurs humanistes",
    description: "Une ecole pour toutes les intelligences et tous les talents, fondee sur le regard positif, l'educabilite et le refus du determinisme.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function HomeContent({ quickLinks, featuredNews, heroSlides }: HomeContentProps) {
  const heroImage =
    heroSlides.length > 0 ? heroSlides[0].imageUrl : defaultHeroImage;
  const heroAlt =
    heroSlides.length > 0
      ? heroSlides[0].altText
      : "Lycee Montaigne - Beit Chabab";

  const useDbQuickLinks = quickLinks.length > 0;
  const useDbNews = featuredNews.length > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-primary md:min-h-[90vh]">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              <TextReveal text="Lycee Montaigne" />
            </h1>
            <FadeInView delay={0.4}>
              <p className="mt-2 text-xl font-medium text-secondary-light md:text-2xl">
                Beit Chabab
              </p>
            </FadeInView>
            <FadeInView delay={0.6}>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                Un etablissement scolaire francophone au Liban, de la maternelle a la terminale,
                offrant un parcours d&apos;excellence pour tous les eleves.
              </p>
            </FadeInView>
            <FadeInView delay={0.8}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/inscriptions">
                  <Button size="lg" variant="secondary">
                    Inscriptions 2026-2027
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/etablissement">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Decouvrir l&apos;etablissement
                  </Button>
                </Link>
              </div>
            </FadeInView>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider fill="var(--color-background-alt)" />
        </div>
      </section>

      {/* Quick Links */}
      <section id="liens-utiles" className="relative -mt-2 bg-background-alt pb-8">
        <div className="mx-auto max-w-7xl px-4">
          {useDbQuickLinks ? (
            <StaggerChildren className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {quickLinks.map((link) => {
                const isExternal = link.target === "_blank";
                const content = (
                  <StaggerItem key={link.id}>
                    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Globe className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-text">{link.label}</span>
                    </div>
                  </StaggerItem>
                );
                if (isExternal) {
                  return (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  );
                }
                return (
                  <Link key={link.id} href={link.url}>
                    {content}
                  </Link>
                );
              })}
            </StaggerChildren>
          ) : (
            <StaggerChildren className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {defaultQuickLinks.map((link) => {
                const Icon = link.icon;
                const content = (
                  <StaggerItem key={link.label}>
                    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-text">{link.label}</span>
                    </div>
                  </StaggerItem>
                );
                if (link.external) {
                  return (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  );
                }
                return (
                  <Link key={link.label} href={link.href}>
                    {content}
                  </Link>
                );
              })}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* Pourquoi l'enseignement francais */}
      <section id="pourquoi" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Pourquoi l'enseignement francais ?" />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="h-full rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[var(--shadow-elevated)]">
                  <h3 className="text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {reason.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Stats */}
      <div>
        <WaveDivider fill="var(--color-primary)" />
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <StatsCounter stats={stats} className="text-white [&_span]:text-white [&_p]:text-white/70" />
          </div>
        </section>
        <WaveDivider fill="var(--color-primary)" flip />
      </div>

      {/* Info a la une */}
      <section id="info-une" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Info a la une" />
          {useDbNews ? (
            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredNews.map((item) => (
                <StaggerItem key={item.id}>
                  <Card
                    title={item.title}
                    image={item.image ?? undefined}
                    href={item.link ?? undefined}
                  />
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {defaultFeaturedNews.map((item) => (
                <StaggerItem key={item.title}>
                  <Card
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    image={item.image}
                  />
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-background-alt py-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <FadeInView>
            <h2 className="text-3xl font-bold md:text-4xl">
              Rejoignez la communaute du Lycee Montaigne
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              De la maternelle a la terminale, nous accompagnons chaque eleve vers l&apos;excellence.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/inscriptions">
                <Button size="lg">Inscription</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
