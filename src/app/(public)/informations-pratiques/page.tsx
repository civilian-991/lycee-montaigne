import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { DocumentCard } from "@/components/ui/document-card";
import { Heart, Eye, Smile } from "lucide-react";

export const metadata: Metadata = {
  title: "Informations Pratiques",
  description: "Calendrier scolaire, listes de fournitures, restauration, santé et recrutement au Lycée Montaigne.",
};

const supplyLists = [
  { title: "PS 2025-2026", href: "/images/list-files/August2025/LkbuRXzAEWZu6MgGs8ey.pdf" },
  { title: "MS 2025-2026", href: "/images/list-files/August2025/Nnn53vPsziSf7k51md1j.pdf" },
  { title: "GS 2025-2026", href: "/images/list-files/August2025/jFfpUNum1erRXyh4i7v5.pdf" },
  { title: "CP 2025-2026", href: "/images/list-files/August2025/xWLw8YK0awBY1hP5Pley.pdf" },
  { title: "CE1 2025-2026", href: "/images/list-files/August2025/YV5psty1jxoal41T9eUh.pdf" },
  { title: "CE2 2025-2026", href: "/images/list-files/August2025/NcpBMIHwSncNlGTjx0Fn.pdf" },
  { title: "CM1 2025-2026", href: "/images/list-files/August2025/RhX3VyydytAzxBma6xLI.pdf" },
  { title: "CM2 2025-2026", href: "/images/list-files/August2025/zqrlyg2PfGa0tSOQEAFL.pdf" },
  { title: "6ème 2025-2026", href: "/images/list-files/August2025/vbyAAnbd1ZHIwr5oP2f9.pdf" },
  { title: "5ème 2025-2026", href: "/images/list-files/August2025/Ymu02aBD7P1r9kKc8p1i.pdf" },
  { title: "4ème 2025-2026", href: "/images/list-files/August2025/H6LXNQFNdH66zsHeZ9um.pdf" },
  { title: "3ème 2025-2026", href: "/images/list-files/August2025/4YbiS8nrl2hX5ODfohLG.pdf" },
  { title: "Seconde 2025-2026", href: "/images/list-files/August2025/r7Nnhm43huO61dv6Ih9L.pdf" },
  { title: "Première 2025-2026", href: "/images/list-files/August2025/j51nEsAzVsi257npEwZg.pdf" },
  { title: "Terminale 2025-2026", href: "/images/list-files/September2025/l6PgNMwCKnEgx4pF25kO.pdf" },
];

const healthStaff = [
  {
    title: "Infirmière",
    name: "Mme Jeanine Gharby",
    description: "Soins quotidiens, suivi médical et éducation à la santé.",
    icon: Heart,
  },
  {
    title: "Médecin",
    name: "",
    description: "Examen médical annuel pour tous les élèves.",
    icon: Heart,
  },
  {
    title: "Optométriste",
    name: "",
    description: "Examen visuel annuel de dépistage.",
    icon: Eye,
  },
  {
    title: "Dentiste",
    name: "Dr Harbouk",
    description: "Éducation à l'hygiène bucco-dentaire et dépistage.",
    icon: Smile,
  },
];

export default function InformationsPratiquesPage() {
  return (
    <>
      <PageHero title="Informations Pratiques" />

      {/* Calendrier scolaire & Examens */}
      <section id="calendrier" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Calendrier scolaire & Examens officiels" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <a
              href="/images/calendrier-scolaires/August2025/VNpHBW2LnqOi8ZjeTJpD.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/calendrier-scolaires/March2025/nJHbjJlDuj3pXSvvQxIu.jpg"
                  alt="Calendrier scolaire 2025-2026"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-text group-hover:text-primary">Calendrier scolaire 2025-2026</h3>
                <p className="mt-1 text-sm text-text-muted">Cliquez pour télécharger (PDF)</p>
              </div>
            </a>
            <a
              href="/images/examens-officiels/December2025/N8h4O64ek0R28q9ArxEL.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/examens-officiels/August2025/elnXnRUD1Y1EH0pH2mOU.png"
                  alt="Calendrier des examens officiels 2025-2026"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-text group-hover:text-primary">Examens officiels 2025-2026</h3>
                <p className="mt-1 text-sm text-text-muted">Cliquez pour télécharger (PDF)</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Listes de manuels et fournitures */}
      <section id="liste" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Listes de manuels et fournitures" />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {supplyLists.map((list) => (
              <DocumentCard key={list.title} title={list.title} fileUrl={list.href} />
            ))}
          </div>
        </div>
      </section>

      {/* Restauration */}
      <section id="restauration" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Restauration" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <a
              href="/images/restauration-files/January2026/mpYrj6lfFbbmG89EhsCF.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/restauration-files/March2025/G3bDh7L45UblbOBgyJ6b.jpeg"
                  alt="Menu Cantine"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-text group-hover:text-primary">Menu Cantine</h3>
                <p className="mt-1 text-sm text-text-muted">Télécharger le menu (PDF)</p>
              </div>
            </a>
            <a
              href="/images/restauration-files/September2025/Yi7GGMLiugwxHhD02Xek.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/restauration-files/March2025/Ga6FKNC32Bt3xf28FjPH.jpeg"
                  alt="Menu Kiosque"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-text group-hover:text-primary">Menu Kiosque</h3>
                <p className="mt-1 text-sm text-text-muted">Télécharger le menu (PDF)</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Santé */}
      <section id="sante" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Santé" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {healthStaff.map((staff) => {
              const Icon = staff.icon;
              return (
                <div key={staff.title} className="rounded-xl border border-border bg-white p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold">{staff.title}</h3>
                  {staff.name && <p className="mt-1 text-sm font-medium text-secondary">{staff.name}</p>}
                  <p className="mt-2 text-sm text-text-muted">{staff.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recrutement */}
      <section id="recrutement" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <SectionHeader title="Recrutement" />
          <p className="mx-auto mt-6 max-w-2xl text-text-muted">
            Le Lycée Montaigne (Beit Chabab) recrute pour la rentrée 2026-2027. Si vous souhaitez
            rejoindre notre équipe pédagogique ou administrative, consultez les postes disponibles.
          </p>
          <a
            href="https://lycee-montaigne.datarays.co/Employee"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
          >
            Accéder au formulaire de recrutement
          </a>
        </div>
      </section>
    </>
  );
}
