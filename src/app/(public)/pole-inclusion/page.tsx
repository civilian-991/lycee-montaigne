import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Heart, Users, BookOpen, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Pôle Inclusion",
  description: "Le pôle inclusion du Lycée Montaigne accompagne les élèves à besoins éducatifs particuliers (EBEP).",
};

const pillars = [
  {
    title: "Accompagnement personnalisé",
    description: "Chaque élève bénéficie d'un suivi adapté à ses besoins spécifiques, avec des dispositifs pédagogiques individualisés.",
    icon: Heart,
  },
  {
    title: "Équipe pluridisciplinaire",
    description: "Enseignants, psychologue, orthophoniste et éducateurs travaillent ensemble pour le bien-être de l'élève.",
    icon: Users,
  },
  {
    title: "Aménagements pédagogiques",
    description: "PAP, PPS, PAI : des plans adaptés pour garantir l'accès aux apprentissages de tous les élèves.",
    icon: BookOpen,
  },
  {
    title: "Bienveillance et respect",
    description: "Un cadre inclusif où chaque différence est accueillie comme une richesse pour la communauté scolaire.",
    icon: Shield,
  },
];

export default function PoleInclusionPage() {
  return (
    <>
      <PageHero title="Pôle Inclusion" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Élèves à Besoins Éducatifs Particuliers" className="text-left" />
              <p className="mt-6 text-text-muted">
                Le Lycée Montaigne s&apos;engage pour l&apos;inclusion de tous les élèves. Notre pôle inclusion
                accompagne les élèves à besoins éducatifs particuliers (EBEP) tout au long de leur
                parcours scolaire, de la maternelle à la terminale.
              </p>
              <p className="mt-4 text-text-muted">
                Notre approche repose sur le regard positif porté sur chaque personne et la confiance
                dans l&apos;éducabilité de chacun, quels que soient ses besoins spécifiques.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/vie-s1/November2024/GS7jV1MyA75tAjglBQcx.jpg"
                alt="Pôle inclusion"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Nos piliers" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="rounded-xl border border-border bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
