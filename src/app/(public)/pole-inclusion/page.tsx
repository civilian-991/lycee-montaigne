"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { Heart, Users, BookOpen, Shield } from "lucide-react";

const pillars = [
  {
    title: "Accompagnement personnalise",
    description: "Chaque eleve beneficie d'un suivi adapte a ses besoins specifiques, avec des dispositifs pedagogiques individualises.",
    icon: Heart,
  },
  {
    title: "Equipe pluridisciplinaire",
    description: "Enseignants, psychologue, orthophoniste et educateurs travaillent ensemble pour le bien-etre de l'eleve.",
    icon: Users,
  },
  {
    title: "Amenagements pedagogiques",
    description: "PAP, PPS, PAI : des plans adaptes pour garantir l'acces aux apprentissages de tous les eleves.",
    icon: BookOpen,
  },
  {
    title: "Bienveillance et respect",
    description: "Un cadre inclusif ou chaque difference est accueillie comme une richesse pour la communaute scolaire.",
    icon: Shield,
  },
];

export default function PoleInclusionPage() {
  return (
    <>
      <PageHero title="Pole Inclusion" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Eleves a Besoins Educatifs Particuliers" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Le Lycee Montaigne s&apos;engage pour l&apos;inclusion de tous les eleves. Notre pole inclusion
                  accompagne les eleves a besoins educatifs particuliers (EBEP) tout au long de leur
                  parcours scolaire, de la maternelle a la terminale.
                </p>
                <p className="mt-4 text-text-muted">
                  Notre approche repose sur le regard positif porte sur chaque personne et la confiance
                  dans l&apos;educabilite de chacun, quels que soient ses besoins specifiques.
                </p>
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

      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Nos piliers" />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title}>
                  <div className="rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{pillar.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{pillar.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
