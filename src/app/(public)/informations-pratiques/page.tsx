"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { DocumentCard } from "@/components/ui/document-card";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { Heart, Eye, Smile } from "lucide-react";

const supplyLists = [
  { title: "PS 2025-2026", href: "/images/list-files/August2025/LkbuRXzAEWZu6MgGs8ey.pdf" },
  { title: "MS 2025-2026", href: "/images/list-files/August2025/Nnn53vPsziSf7k51md1j.pdf" },
  { title: "GS 2025-2026", href: "/images/list-files/August2025/jFfpUNum1erRXyh4i7v5.pdf" },
  { title: "CP 2025-2026", href: "/images/list-files/August2025/xWLw8YK0awBY1hP5Pley.pdf" },
  { title: "CE1 2025-2026", href: "/images/list-files/August2025/YV5psty1jxoal41T9eUh.pdf" },
  { title: "CE2 2025-2026", href: "/images/list-files/August2025/NcpBMIHwSncNlGTjx0Fn.pdf" },
  { title: "CM1 2025-2026", href: "/images/list-files/August2025/RhX3VyydytAzxBma6xLI.pdf" },
  { title: "CM2 2025-2026", href: "/images/list-files/August2025/zqrlyg2PfGa0tSOQEAFL.pdf" },
  { title: "6eme 2025-2026", href: "/images/list-files/August2025/vbyAAnbd1ZHIwr5oP2f9.pdf" },
  { title: "5eme 2025-2026", href: "/images/list-files/August2025/Ymu02aBD7P1r9kKc8p1i.pdf" },
  { title: "4eme 2025-2026", href: "/images/list-files/August2025/H6LXNQFNdH66zsHeZ9um.pdf" },
  { title: "3eme 2025-2026", href: "/images/list-files/August2025/4YbiS8nrl2hX5ODfohLG.pdf" },
  { title: "Seconde 2025-2026", href: "/images/list-files/August2025/r7Nnhm43huO61dv6Ih9L.pdf" },
  { title: "Premiere 2025-2026", href: "/images/list-files/August2025/j51nEsAzVsi257npEwZg.pdf" },
  { title: "Terminale 2025-2026", href: "/images/list-files/September2025/l6PgNMwCKnEgx4pF25kO.pdf" },
];

const healthStaff = [
  {
    title: "Infirmiere",
    name: "Mme Jeanine Gharby",
    description: "Soins quotidiens, suivi medical et education a la sante.",
    icon: Heart,
  },
  {
    title: "Medecin",
    name: "",
    description: "Examen medical annuel pour tous les eleves.",
    icon: Heart,
  },
  {
    title: "Optometriste",
    name: "",
    description: "Examen visuel annuel de depistage.",
    icon: Eye,
  },
  {
    title: "Dentiste",
    name: "Dr Harbouk",
    description: "Education a l'hygiene bucco-dentaire et depistage.",
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
          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2">
            <StaggerItem>
              <a
                href="/images/calendrier-scolaires/August2025/VNpHBW2LnqOi8ZjeTJpD.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/calendrier-scolaires/March2025/nJHbjJlDuj3pXSvvQxIu.jpg"
                    alt="Calendrier scolaire 2025-2026"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-text group-hover:text-primary">Calendrier scolaire 2025-2026</h3>
                  <p className="mt-1 text-sm text-text-muted">Cliquez pour telecharger (PDF)</p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href="/images/examens-officiels/December2025/N8h4O64ek0R28q9ArxEL.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/examens-officiels/August2025/elnXnRUD1Y1EH0pH2mOU.png"
                    alt="Calendrier des examens officiels 2025-2026"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-text group-hover:text-primary">Examens officiels 2025-2026</h3>
                  <p className="mt-1 text-sm text-text-muted">Cliquez pour telecharger (PDF)</p>
                </div>
              </a>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Listes de manuels et fournitures */}
      <section id="liste" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Listes de manuels et fournitures" />
          <StaggerChildren className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {supplyLists.map((list) => (
              <StaggerItem key={list.title}>
                <DocumentCard title={list.title} fileUrl={list.href} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Restauration */}
      <section id="restauration" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Restauration" />
          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2">
            <StaggerItem>
              <a
                href="/images/restauration-files/January2026/mpYrj6lfFbbmG89EhsCF.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/restauration-files/March2025/G3bDh7L45UblbOBgyJ6b.jpeg"
                    alt="Menu Cantine"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-text group-hover:text-primary">Menu Cantine</h3>
                  <p className="mt-1 text-sm text-text-muted">Telecharger le menu (PDF)</p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href="/images/restauration-files/September2025/Yi7GGMLiugwxHhD02Xek.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/restauration-files/March2025/Ga6FKNC32Bt3xf28FjPH.jpeg"
                    alt="Menu Kiosque"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-text group-hover:text-primary">Menu Kiosque</h3>
                  <p className="mt-1 text-sm text-text-muted">Telecharger le menu (PDF)</p>
                </div>
              </a>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Sante */}
      <section id="sante" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Sante" />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {healthStaff.map((staff) => {
              const Icon = staff.icon;
              return (
                <StaggerItem key={staff.title}>
                  <div className="rounded-[20px] border border-border bg-background p-6 text-center shadow-[var(--shadow-soft)]">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-semibold">{staff.title}</h3>
                    {staff.name && <p className="mt-1 text-sm font-medium text-secondary">{staff.name}</p>}
                    <p className="mt-2 text-sm text-text-muted">{staff.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Recrutement */}
      <section id="recrutement" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <SectionHeader title="Recrutement" />
          <FadeInView>
            <p className="mx-auto mt-6 max-w-2xl text-text-muted">
              Le Lycee Montaigne (Beit Chabab) recrute pour la rentree 2026-2027. Si vous souhaitez
              rejoindre notre equipe pedagogique ou administrative, consultez les postes disponibles.
            </p>
            <a
              href="https://lycee-montaigne.datarays.co/Employee"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[var(--shadow-warm)]"
            >
              Acceder au formulaire de recrutement
            </a>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
