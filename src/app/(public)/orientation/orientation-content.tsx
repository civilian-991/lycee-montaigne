"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { localImage } from "@/lib/utils";
import { Calendar, FileDown, Compass, GraduationCap, ExternalLink, BookOpen, Trophy } from "lucide-react";

/* ── Types ────────────────────────────────────────────── */
type DocumentRow = {
  id: string;
  title: string;
  fileUrl: string;
  category: string;
  academicYear: string | null;
  order: number;
};

type PageSectionRow = {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  image: string | null;
  order: number;
};

type ActivityItemRow = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  category: string;
  order: number;
};

interface UniversityData {
  name: string;
  url: string;
}

/* Color cycle for calendars built from DB */
const calendarColors = [
  "from-primary to-primary-dark",
  "from-secondary-dark to-secondary",
  "from-[#8B6914] to-[#C4961A]",
];

/* ── Helpers ─────────────────────────────────────────── */

function extractDateFromDescription(desc: string): { date: string; rest: string } | null {
  const match = desc.match(/^(\d{1,2}\s+\w+\s+\d{4})\s*[—–-]\s*/);
  if (match) {
    return { date: match[1], rest: desc.slice(match[0].length) };
  }
  return null;
}

function safeJsonParse<T>(html: string | null | undefined): T | null {
  if (!html) return null;
  try {
    return JSON.parse(html) as T;
  } catch {
    return null;
  }
}

/* ── Props ────────────────────────────────────────────── */
interface OrientationContentProps {
  documents: DocumentRow[];
  sections: PageSectionRow[];
  activities: ActivityItemRow[];
  universities: UniversityData[];
}

/* ── Component ────────────────────────────────────────── */
export function OrientationContent({ documents, sections, activities, universities }: OrientationContentProps) {
  /* ── Look up CMS sections by key ── */
  const parcoursAvenirSection = sections.find((s) => s.sectionKey === "parcours-avenir");
  const parcoursupSection = sections.find((s) => s.sectionKey === "parcoursup");
  const admissionsSection = sections.find((s) => s.sectionKey === "admissions");
  const admissionsImagesSection = sections.find((s) => s.sectionKey === "admissions-images");
  const universitesSection = sections.find((s) => s.sectionKey === "universites");
  const ctaSection = sections.find((s) => s.sectionKey === "cta");

  /* ── Derive orientation calendars from DB documents ── */
  const dbCalendars = documents.filter((d) => d.category === "orientation-calendrier");
  const orientationCalendars = dbCalendars.map((d, i) => ({
    level: d.title,
    label: d.title,
    href: d.fileUrl,
    color: calendarColors[i % calendarColors.length],
  }));

  /* ── Derive parcoursup docs from DB documents ── */
  const dbParcoursup = documents.filter((d) => d.category === "orientation-parcoursup");
  const parcoursupDocs = dbParcoursup.map((d) => ({
    title: d.title,
    description: d.academicYear ?? "",
    href: d.fileUrl,
  }));

  /* ── Derive activities from CMS ActivityItems ── */
  const displayActivities = activities.map((a) => {
    const parsed = a.description ? extractDateFromDescription(a.description) : null;
    return {
      title: a.title,
      date: parsed?.date ?? "",
      description: parsed?.rest ?? a.description ?? "",
      image: a.image ?? "/images/oriantation-activities/November2025/0HnUrhMFu9ReUOd5Dcbs.jpeg",
    };
  });

  /* ── Derive admission images from CMS ── */
  const cmsAdmissionImages = safeJsonParse<string[]>(admissionsImagesSection?.contentHtml);
  const displayAdmissionImages = cmsAdmissionImages && cmsAdmissionImages.length > 0
    ? cmsAdmissionImages
    : [];

  /* ── Derive universities from settings, with CMS image data if available ── */
  const cmsUniversities = safeJsonParse<{ name: string; image: string; url: string }[]>(universitesSection?.contentHtml);
  const displayUniversities = cmsUniversities && cmsUniversities.length > 0
    ? cmsUniversities
    : universities.map((u) => ({ name: u.name, image: "", url: u.url }));

  return (
    <>
      <PageHero title="Orientation" />

      {/* ─── Parcours avenir ─── */}
      <section id="presentation" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader
                  title={parcoursAvenirSection?.title || "Parcours avenir"}
                  className="text-left"
                />
                {parcoursAvenirSection?.contentHtml ? (
                  <div
                    className="mt-6 leading-relaxed text-text-muted [&>p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: parcoursAvenirSection.contentHtml }}
                  />
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(parcoursAvenirSection?.image) || "/images/orientation-s1/July2025/4WWbVtfsEoVLlFT5F8AR.png"}
                  alt={parcoursAvenirSection?.title || "Parcours avenir"}
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
      {orientationCalendars.length > 0 && (
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
      )}

      {/* ─── Activites d'orientation ─── */}
      {displayActivities.length > 0 && (
        <section id="activites" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Activites d'orientation"
              subtitle="Forums, rencontres et evenements pour eclairer les choix de nos eleves"
            />
            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
              {displayActivities.map((activity, i) => (
                <StaggerItem key={activity.date || `activity-${i}`}>
                  <div className="group overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={localImage(activity.image) || activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {activity.date && (
                        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text backdrop-blur-sm">
                          {activity.date}
                        </div>
                      )}
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
      )}

      {/* ─── Resultats admissions ─── */}
      <section id="admissions" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary-dark text-white">
                <Trophy className="h-7 w-7" />
              </div>
              <SectionHeader title={admissionsSection?.title || "Admissions post-bac 2024-2025"} />
              {admissionsSection?.contentHtml ? (
                <div
                  className="mt-4 text-text-muted [&>p]:mt-4"
                  dangerouslySetInnerHTML={{ __html: admissionsSection.contentHtml }}
                />
              ) : (
                <p className="mt-4 text-text-muted">
                  Nos bacheliers sont admis dans les universites les plus prestigieuses au Liban et a
                  l&apos;international, temoignant de l&apos;excellence academique et de la perseverance de nos eleves.
                </p>
              )}
            </div>
          </FadeInView>
          {displayAdmissionImages.length > 0 && (
            <StaggerChildren className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {displayAdmissionImages.map((img, i) => (
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
          )}
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
                    src={localImage(parcoursupSection?.image) || "/images/orientation-s4/March2025/85D8l8qy1D3xZHVOrctC.png"}
                    alt={parcoursupSection?.title || "Parcoursup"}
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
                <h2 className="font-heading text-3xl font-bold md:text-4xl">
                  {parcoursupSection?.title || "Parcoursup"}
                </h2>
                {parcoursupSection?.contentHtml ? (
                  <div
                    className="mt-4 leading-relaxed text-white/80 [&>p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: parcoursupSection.contentHtml }}
                  />
                ) : (
                  <p className="mt-4 leading-relaxed text-white/80">
                    Parcoursup est la plateforme nationale de preinscription en premiere annee de
                    l&apos;enseignement superieur en France. Les eleves de terminale du Lycee Montaigne
                    sont accompagnes tout au long du processus pour formuler leurs voeux et constituer
                    leurs dossiers.
                  </p>
                )}
                {parcoursupDocs.length > 0 && (
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
                )}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <WaveDivider fill="var(--color-background)" className="relative -mt-px rotate-180" />

      {/* ─── Inscriptions universites ─── */}
      {displayUniversities.length > 0 && (
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
              {displayUniversities.map((uni) => (
                <StaggerItem key={uni.name}>
                  <a
                    href={uni.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  >
                    {uni.image ? (
                      <div className="relative h-16 w-full">
                        <Image
                          src={localImage(uni.image) || uni.image}
                          alt={uni.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                          sizes="120px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-full items-center justify-center">
                        <GraduationCap className="h-8 w-8 text-primary/40" />
                      </div>
                    )}
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
      )}

      {/* ─── CTA ─── */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <FadeInView>
            <BookOpen className="mx-auto h-10 w-10 text-secondary-light" />
            {ctaSection?.title ? (
              <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                {ctaSection.title}
              </h2>
            ) : (
              <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                Besoin de conseils personnalises ?
              </h2>
            )}
            {ctaSection?.contentHtml ? (
              <div
                className="mx-auto mt-4 max-w-xl text-white/80 [&>p]:mt-4"
                dangerouslySetInnerHTML={{ __html: ctaSection.contentHtml }}
              />
            ) : (
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Notre equipe d&apos;orientation est a votre disposition pour accompagner votre enfant
                dans ses choix de parcours.
              </p>
            )}
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
