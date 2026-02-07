import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, Globe } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const quickLinks = [
  { label: "Inscriptions 2026-2027", href: "/inscriptions", icon: BookOpen },
  { label: "Calendrier scolaire", href: "/informations-pratiques#calendrier", icon: Globe },
  { label: "Menu Cantine", href: "/informations-pratiques#restauration", icon: Users },
  { label: "Pronote", href: "https://2050048n.index-education.net/pronote/", icon: Award, external: true },
];

const stats = [
  { value: "1085", label: "Élèves" },
  { value: "100%", label: "Réussite au bac" },
  { value: "29", label: "Nationalités" },
  { value: "3", label: "Langues d'enseignement" },
];

const reasons = [
  {
    title: "Excellence académique",
    description: "Un enseignement rigoureux suivant les programmes français, avec des résultats exceptionnels aux examens nationaux et internationaux.",
  },
  {
    title: "Ouverture internationale",
    description: "29 nationalités représentées, un Bac Français International, et des partenariats avec des universités prestigieuses dans le monde entier.",
  },
  {
    title: "Épanouissement de l'élève",
    description: "Un accompagnement personnalisé de la maternelle à la terminale, avec des activités périscolaires variées et un pôle inclusion dédié.",
  },
  {
    title: "Valeurs humanistes",
    description: "Une école pour toutes les intelligences et tous les talents, fondée sur le regard positif, l'éducabilité et le refus du déterminisme.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-primary md:min-h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent opacity-90" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Lycée Montaigne
            </h1>
            <p className="mt-2 text-xl font-medium text-secondary-light md:text-2xl">
              Beit Chabab
            </p>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Un établissement scolaire francophone au Liban, de la maternelle à la terminale,
              offrant un parcours d&apos;excellence pour tous les élèves.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/inscriptions">
                <Button size="lg" variant="secondary">
                  Inscriptions 2026-2027
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/etablissement">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Découvrir l&apos;établissement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section id="liens-utiles" className="bg-background-alt py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              const content = (
                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-text">{link.label}</span>
                </div>
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
          </div>
        </div>
      </section>

      {/* Pourquoi l'enseignement français */}
      <section id="pourquoi" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Pourquoi l'enseignement français ?" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-xl border border-border bg-white p-6 transition-all hover:border-secondary hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-4xl font-bold text-white md:text-5xl">
                  {stat.value}
                </span>
                <p className="mt-2 text-sm font-medium text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info à la une - placeholder for DB-driven content */}
      <section id="info-une" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Info à la une" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Inscriptions 2026-2027"
              description="Les inscriptions pour l'année scolaire 2026-2027 sont ouvertes. Consultez la procédure et les documents nécessaires."
              href="/inscriptions"
              image="https://lycee-montaigne.edu.lb//storage/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png"
            />
            <Card
              title="Portes Ouvertes Maternelle"
              description="Venez découvrir notre école maternelle lors de nos portes ouvertes."
              href="/inscriptions#porte-ouvertes"
              image="https://lycee-montaigne.edu.lb//storage/s4-files/January2026/U4IfChjnxOFzmzse6Tme.jpeg"
            />
            <Card
              title="Résultats 2024-2025"
              description="100% de réussite au baccalauréat. Découvrez les résultats de nos élèves aux examens nationaux et internationaux."
              href="/excellence-academique#resultats"
              image="https://lycee-montaigne.edu.lb//storage/examens-resultats/January2026/resized_IMG_6942.PNG"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-alt py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Rejoignez la communauté du Lycée Montaigne
          </h2>
          <p className="mt-4 text-text-muted">
            De la maternelle à la terminale, nous accompagnons chaque élève vers l&apos;excellence.
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
        </div>
      </section>
    </>
  );
}
