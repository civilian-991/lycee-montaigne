"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { DocumentCard } from "@/components/ui/document-card";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Heart, Eye, Smile, ArrowRight, Calendar, ClipboardList, UtensilsCrossed, Stethoscope, BriefcaseBusiness, Download, FileText } from "lucide-react";

/* ── Supply lists grouped by level ───────────────────────────── */
const supplyGroups = [
  {
    label: "Maternelle",
    color: "bg-secondary",
    lists: [
      { title: "PS", href: "/images/list-files/August2025/LkbuRXzAEWZu6MgGs8ey.pdf" },
      { title: "MS", href: "/images/list-files/August2025/Nnn53vPsziSf7k51md1j.pdf" },
      { title: "GS", href: "/images/list-files/August2025/jFfpUNum1erRXyh4i7v5.pdf" },
    ],
  },
  {
    label: "Elementaire",
    color: "bg-secondary",
    lists: [
      { title: "CP", href: "/images/list-files/August2025/xWLw8YK0awBY1hP5Pley.pdf" },
      { title: "CE1", href: "/images/list-files/August2025/YV5psty1jxoal41T9eUh.pdf" },
      { title: "CE2", href: "/images/list-files/August2025/NcpBMIHwSncNlGTjx0Fn.pdf" },
      { title: "CM1", href: "/images/list-files/August2025/RhX3VyydytAzxBma6xLI.pdf" },
      { title: "CM2", href: "/images/list-files/August2025/zqrlyg2PfGa0tSOQEAFL.pdf" },
    ],
  },
  {
    label: "College",
    color: "bg-primary",
    lists: [
      { title: "6eme", href: "/images/list-files/August2025/vbyAAnbd1ZHIwr5oP2f9.pdf" },
      { title: "5eme", href: "/images/list-files/August2025/Ymu02aBD7P1r9kKc8p1i.pdf" },
      { title: "4eme", href: "/images/list-files/August2025/H6LXNQFNdH66zsHeZ9um.pdf" },
      { title: "3eme", href: "/images/list-files/August2025/4YbiS8nrl2hX5ODfohLG.pdf" },
    ],
  },
  {
    label: "Lycee",
    color: "bg-primary",
    lists: [
      { title: "Seconde", href: "/images/list-files/August2025/r7Nnhm43huO61dv6Ih9L.pdf" },
      { title: "Premiere", href: "/images/list-files/August2025/j51nEsAzVsi257npEwZg.pdf" },
      { title: "Terminale", href: "/images/list-files/September2025/l6PgNMwCKnEgx4pF25kO.pdf" },
    ],
  },
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
    icon: Stethoscope,
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

      {/* ─── Calendrier scolaire & Examens ─────────────────────── */}
      <section id="calendrier" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Calendrier scolaire & Examens officiels" />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <a
                href="/images/calendrier-scolaires/August2025/VNpHBW2LnqOi8ZjeTJpD.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/calendrier-scolaires/March2025/nJHbjJlDuj3pXSvvQxIu.jpg"
                    alt="Calendrier scolaire 2025-2026"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-lg font-bold text-white">Calendrier scolaire 2025-2026</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors group-hover:text-white">
                      <Download className="h-3.5 w-3.5" /> Telecharger le PDF
                    </span>
                  </div>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href="/images/examens-officiels/December2025/N8h4O64ek0R28q9ArxEL.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/examens-officiels/August2025/elnXnRUD1Y1EH0pH2mOU.png"
                    alt="Calendrier des examens officiels 2025-2026"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-lg font-bold text-white">Examens officiels 2025-2026</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors group-hover:text-white">
                      <Download className="h-3.5 w-3.5" /> Telecharger le PDF
                    </span>
                  </div>
                </div>
              </a>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Listes de manuels et fournitures ──────────────────── */}
      <section id="liste" className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Listes de manuels et fournitures"
              subtitle="Annee scolaire 2025-2026"
            />
            <div className="mt-12 space-y-8">
              {supplyGroups.map((group) => (
                <FadeInView key={group.label}>
                  <div className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)]">
                    {/* Group header */}
                    <div className={`${group.color} px-6 py-3`}>
                      <h3 className="text-sm font-bold tracking-wide text-white uppercase">{group.label}</h3>
                    </div>
                    {/* List items */}
                    <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                      {group.lists.map((list) => (
                        <a
                          key={list.title}
                          href={list.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 bg-background p-4 transition-colors hover:bg-background-alt"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-text">{list.title}</span>
                          <Download className="h-3.5 w-3.5 text-text-muted opacity-0 transition-all group-hover:text-secondary group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Restauration ──────────────────────────────────────── */}
      <section id="restauration" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Restauration" />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <a
                href="/images/restauration-files/January2026/mpYrj6lfFbbmG89EhsCF.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/restauration-files/March2025/G3bDh7L45UblbOBgyJ6b.jpeg"
                    alt="Menu Cantine"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-lg font-bold text-white">Menu Cantine</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors group-hover:text-white">
                      <Download className="h-3.5 w-3.5" /> Telecharger le menu
                    </span>
                  </div>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href="/images/restauration-files/September2025/Yi7GGMLiugwxHhD02Xek.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/restauration-files/March2025/Ga6FKNC32Bt3xf28FjPH.jpeg"
                    alt="Menu Kiosque"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-lg font-bold text-white">Menu Kiosque</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors group-hover:text-white">
                      <Download className="h-3.5 w-3.5" /> Telecharger le menu
                    </span>
                  </div>
                </div>
              </a>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Sante ─────────────────────────────────────────────── */}
      <section id="sante" className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader title="Sante" subtitle="Une equipe medicale au service du bien-etre des eleves" />
            <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {healthStaff.map((staff) => {
                const Icon = staff.icon;
                return (
                  <StaggerItem key={staff.title}>
                    <div className="flex h-full flex-col rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-warm)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-[var(--shadow-soft)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-text">{staff.title}</h3>
                      {staff.name && (
                        <p className="mt-1 text-sm font-medium text-secondary">{staff.name}</p>
                      )}
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{staff.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Recrutement — CTA banner ──────────────────────────── */}
      <section id="recrutement" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-primary to-primary-dark shadow-[var(--shadow-elevated)]">
              <div className="flex flex-col items-center px-8 py-12 text-center md:px-16 md:py-16">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <BriefcaseBusiness className="h-7 w-7 text-white" />
                </div>
                <h2 className="mt-6 font-heading text-3xl font-bold text-white md:text-4xl">Recrutement</h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
                  Le Lycee Montaigne (Beit Chabab) recrute pour la rentree 2026-2027. Si vous souhaitez
                  rejoindre notre equipe pedagogique ou administrative, consultez les postes disponibles.
                </p>
                <a
                  href="https://lycee-montaigne.datarays.co/Employee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.2)]"
                >
                  Acceder au formulaire
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
