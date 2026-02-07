"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Calendar, FileDown, Compass, GraduationCap, ExternalLink, BookOpen, Trophy } from "lucide-react";

/* ── data ──────────────────────────────────────────────── */

const orientationCalendars = [
  {
    level: "Terminale",
    label: "Calendrier d'orientation annuel des eleves de Terminale",
    href: "/images/calenders/October2025/Lx0wFEvWtizsi6yOH2q1.pdf",
    color: "from-primary to-primary-dark",
  },
  {
    level: "1ere",
    label: "Calendrier d'orientation annuel des eleves de 1ere",
    href: "/images/calenders/September2025/KwWpmr2QDmyQQPjalcUG.pdf",
    color: "from-secondary-dark to-secondary",
  },
  {
    level: "2de",
    label: "Calendrier d'orientation annuel des eleves de 2de",
    href: "/images/calenders/October2025/lXqdceNiOj3Pz9DpwBO7.pdf",
    color: "from-[#8B6914] to-[#C4961A]",
  },
];

const parcoursupDocs = [
  {
    title: "Brochure Salon AGORA Monde AEFE",
    description: "Presentation du salon virtuel d'orientation AEFE",
    href: "/images/orientation-s4-files/December2025/xxgQMty00QT31a5oJWY1.pdf",
  },
  {
    title: "Programme",
    description: "Programme detaille du salon d'orientation",
    href: "/images/orientation-s4-files/November2025/9ZYRV7SE9LloT6ZtYA5J.pdf",
  },
  {
    title: "Calendrier Parcoursup 2025-2026",
    description: "Dates cles et echeances de la procedure Parcoursup",
    href: "/images/orientation-s4-files/November2025/sii8vo2EC7jjb93vkb6h.pdf",
  },
];

const universities = [
  { name: "USJ", image: "/images/inscriptions-universites/April2024/IKh5ECmCosO0wEXbHJfE.png", url: "https://usj.edu.lb/e-doors/" },
  { name: "AUB", image: "/images/inscriptions-universites/April2024/mNyKwjEsKTILxE3Drypm.png", url: "https://www.aub.edu.lb/admissions/Pages/default.aspx" },
  { name: "NDU", image: "/images/inscriptions-universites/April2024/rRdze9NpnGrIp1CoPCfh.png", url: "https://www.ndu.edu.lb/apply" },
  { name: "LAU", image: "/images/inscriptions-universites/April2024/ElIddwesq0I3p3yO7Ppy.png", url: "https://www.lau.edu.lb/apply/first-time-applicant.php" },
  { name: "Balamand", image: "/images/inscriptions-universites/April2024/S6u02K7LW9Efb3cW531z.png", url: "https://www.balamand.edu.lb/ProspectiveStudents/Pages/UndergraduateAdmissions.aspx" },
  { name: "ALBA", image: "/images/inscriptions-universites/April2024/w9Jj9IYMat0esXyFAhkV.png", url: "https://alba.edu.lb/sites/ALBA1/InsAdm/Pages/default.aspx" },
  { name: "ESA", image: "/images/inscriptions-universites/September2025/bLasgg76UCYQgBL3mWiI.png", url: "https://www.esa.edu.lb/french/formation-diplomante/bachelor-in-business-administration" },
  { name: "USEK", image: "/images/inscriptions-universites/September2025/lZIXpZMUVtKqPWMmtWRZ.jpg", url: "https://www.usek.edu.lb/en/admission/online-admission-requirements" },
  { name: "UCAS", image: "/images/inscriptions-universites/September2025/OgIG56RFszFpJXrX2ayB.png", url: "https://www.ucas.com/applying" },
  { name: "Common App", image: "/images/inscriptions-universites/September2025/IOb6uT1ImkYMoE7MKong.png", url: "https://www.commonapp.org/" },
];

const activities = [
  {
    title: "Forum des universites",
    date: "14 novembre 2025",
    description: "18 universites et 12 grandes ecoles ont participe a cette journee, offrant 30 sources d'inspiration a nos eleves.",
    image: "/images/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg",
  },
  {
    title: "Forum des Metiers",
    date: "22 mars 2025",
    description: "Medecine, ingenierie, droit, communication, entrepreneuriat — des professionnels ont partage leurs parcours et conseils.",
    image: "/images/oriantation-activities/July2025/xKaDU1qKXJrvkFI8kJc3.jpeg",
  },
  {
    title: "Forum des universites",
    date: "20 decembre 2024",
    description: "Journee d'echanges avec les representants des universites locales et internationales.",
    image: "/images/oriantation-activities/July2025/E74I8wu2UsLKK4EImXJU.jpeg",
  },
];

const admissionImages = [
  "/images/oriantation-activities/August2025/jGcBleXqGThjKsghZXBQ.jpeg",
  "/images/oriantation-activities/August2025/cZJX6xPO7h3xZDULgEXn.jpeg",
  "/images/oriantation-activities/August2025/Vuu9x02s0E1dfDfps58b.jpeg",
  "/images/oriantation-activities/August2025/XMhQO1k8tKpQaRhCt5AY.jpeg",
];

/* ── page ──────────────────────────────────────────────── */

export default function OrientationPage() {
  return (
    <>
      <PageHero title="Orientation" />

      {/* ─── Parcours avenir ─── */}
      <section id="presentation" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Parcours avenir" className="text-left" />
                <p className="mt-6 leading-relaxed text-text-muted">
                  Des la classe de 6eme, le Lycee Montaigne accompagne chaque eleve dans la construction
                  de son parcours d&apos;orientation. Une PRIO (personne ressource en information et orientation),
                  une professeure documentaliste et la CPE travaillent ensemble pour guider les eleves
                  vers les filieres et les metiers qui correspondent a leurs talents et aspirations.
                </p>
                <p className="mt-4 leading-relaxed text-text-muted">
                  Des forums, des rencontres avec des professionnels, des visites d&apos;universites et
                  un accompagnement individualise permettent a chaque eleve de faire des choix eclaires.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/orientation-s1/July2025/4WWbVtfsEoVLlFT5F8AR.png"
                  alt="Parcours avenir"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ─── Calendriers d'orientation ─── */}
      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Calendriers d'orientation"
            subtitle="Planifiez l'annee de votre enfant avec les echeances cles"
          />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
            {orientationCalendars.map((cal) => (
              <StaggerItem key={cal.level}>
                <a
                  href={cal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className={`bg-gradient-to-br ${cal.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <Calendar className="h-8 w-8 opacity-80" />
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                        PDF
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-bold">{cal.level}</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-text-muted">{cal.label}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-secondary">
                      <FileDown className="h-4 w-4" />
                      Telecharger le calendrier
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Activites d'orientation ─── */}
      <section id="activites" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Activites d'orientation"
            subtitle="Forums, rencontres et evenements pour eclairer les choix de nos eleves"
          />
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
            {activities.map((activity) => (
              <StaggerItem key={activity.date}>
                <div className="group overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text backdrop-blur-sm">
                      {activity.date}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold text-text">{activity.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{activity.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Resultats admissions ─── */}
      <section id="admissions" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary-dark text-white">
                <Trophy className="h-7 w-7" />
              </div>
              <SectionHeader title="Admissions post-bac 2024-2025" />
              <p className="mt-4 text-text-muted">
                Nos bacheliers sont admis dans les universites les plus prestigieuses au Liban et a
                l&apos;international, temoignant de l&apos;excellence academique et de la perseverance de nos eleves.
              </p>
            </div>
          </FadeInView>
          <StaggerChildren className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {admissionImages.map((img, i) => (
              <StaggerItem key={i}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-[20px] shadow-[var(--shadow-soft)]">
                  <Image
                    src={img}
                    alt={`Resultats d'admission ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <WaveDivider fill="var(--color-primary)" className="relative -mb-px" />

      {/* ─── Parcoursup ─── */}
      <section id="parcoursup" className="bg-gradient-to-b from-primary to-primary-dark py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-xl">
                  <Image
                    src="/images/orientation-s4/March2025/85D8l8qy1D3xZHVOrctC.png"
                    alt="Parcoursup"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Compass className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-3xl font-bold md:text-4xl">Parcoursup</h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  Parcoursup est la plateforme nationale de preinscription en premiere annee de
                  l&apos;enseignement superieur en France. Les eleves de terminale du Lycee Montaigne
                  sont accompagnes tout au long du processus pour formuler leurs voeux et constituer
                  leurs dossiers.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {parcoursupDocs.map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <FileDown className="mb-2 h-5 w-5 text-secondary-light" />
                      <span className="text-sm font-semibold">{doc.title}</span>
                      <span className="mt-1 text-xs text-white/60">{doc.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <WaveDivider fill="var(--color-background)" className="relative -mt-px rotate-180" />

      {/* ─── Inscriptions universites ─── */}
      <section id="uni" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white">
                <GraduationCap className="h-7 w-7" />
              </div>
              <SectionHeader title="Inscriptions universites" />
              <p className="mt-4 text-text-muted">
                Accedez directement aux portails d&apos;admission des universites partenaires au Liban et a l&apos;international.
              </p>
            </div>
          </FadeInView>
          <StaggerChildren className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {universities.map((uni) => (
              <StaggerItem key={uni.name}>
                <a
                  href={uni.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="relative h-16 w-full">
                    <Image
                      src={uni.image}
                      alt={uni.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="120px"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary transition-colors group-hover:text-secondary">
                    {uni.name}
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <FadeInView>
            <BookOpen className="mx-auto h-10 w-10 text-secondary-light" />
            <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
              Besoin de conseils personnalises ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Notre equipe d&apos;orientation est a votre disposition pour accompagner votre enfant
              dans ses choix de parcours.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-background hover:shadow-xl"
            >
              Contactez-nous
            </a>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
