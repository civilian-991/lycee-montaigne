"use client";
import { localImage } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import {
  Building2,
  Scale,
  GraduationCap,
  BookOpen,
  Gavel,
  ClipboardList,
  Megaphone,
  HeartPulse,
  UserCheck,
  Globe,
  Shield,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

/* Map governance instance icon names (from DB) to Lucide components */
const governanceIconMap: Record<string, LucideIcon> = {
  Building2,
  Scale,
  GraduationCap,
  BookOpen,
  Gavel,
  ClipboardList,
  Megaphone,
  HeartPulse,
  UserCheck,
  Globe,
  Shield,
};


type StaffMemberRow = {
  id: string;
  name: string;
  title: string;
  photo: string | null;
  messageHtml: string | null;
  section: string;
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

type GovernanceRow = {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  accentColor: string;
};

export function EtablissementContent({
  staff,
  sections,
  governanceInstances,
}: {
  staff: StaffMemberRow[];
  sections: PageSectionRow[];
  governanceInstances: GovernanceRow[];
}) {
  // Use DB staff for direction section — no hardcoded fallback
  const directionStaff = staff.filter((s) => s.section === "direction");

  // Use DB staff for comite section — no hardcoded fallback
  const comiteStaff = staff.filter((s) => s.section === "comite");
  const displayComite = comiteStaff.map((s) => ({ role: s.title, name: s.name }));

  // Use CMS mission section if available
  const missionSection = sections.find((s) => s.sectionKey === "mission");

  // Use DB staff for direction messages — no hardcoded fallback
  const staffMessages = directionStaff.map((s) => ({
    id: s.id,
    title: s.title,
    name: s.name,
    image: localImage(s.photo) || "",
    text: s.messageHtml || "",
  }));

  return (
    <>
      <PageHero title="Etablissement" />

      {/* Mission et Vision */}
      <section id="mission" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title={missionSection?.title || "Mission et Vision"} className="text-left" />
                {missionSection?.contentHtml ? (
                  <div
                    className="mt-6 leading-relaxed text-text-muted [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-secondary [&>p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: missionSection.contentHtml }}
                  />
                ) : (
                  <>
                    <h3 className="mt-6 text-xl font-semibold text-secondary">Notre projet educatif</h3>
                    <p className="mt-4 leading-relaxed text-text-muted">
                      Le Lycee Montaigne est une ecole pour toutes les intelligences et tous les talents.
                      Notre projet educatif repose sur le regard positif porte sur chaque personne,
                      le refus du determinisme et la confiance dans l&apos;educabilite cognitive, affective et physiologique de chacun.
                    </p>
                    <p className="mt-4 leading-relaxed text-text-muted">
                      Bienvenue a la communaute du LM, a ses amis et aux visiteurs de notre site web.
                      Nous vous invitons a decouvrir notre etablissement, nos valeurs et notre engagement
                      envers l&apos;excellence educative.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/eta-s2/November2024/mJKjRY5yzkeXW04S1XmZ.jpg"
                  alt="Eleves en classe au Lycee Montaigne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Staff Messages */}
      {staffMessages.map((person, i) => (
        <section
          key={person.id}
          id={person.id}
          className={i % 2 === 0 ? "bg-background-alt py-16 md:py-24" : "py-16 md:py-24"}
        >
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <div className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
                <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                    <Image
                      src={person.image}
                      alt={person.name || person.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                </div>
                <div>
                  <SectionHeader title={person.title} className="text-left" />
                  {person.name && (
                    <p className="mt-2 font-medium text-secondary">{person.name}</p>
                  )}
                  <p className="mt-6 leading-relaxed text-text-muted">{person.text}</p>
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      ))}

      {/* Comite des parents */}
      <section id="comite" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Comite des parents" className="text-left" />
                {displayComite.length > 0 && (
                <StaggerChildren className="mt-8 space-y-4">
                  {displayComite.map((member) => (
                    <StaggerItem key={member.name}>
                      <div className="flex items-center gap-4 rounded-2xl bg-background p-4 shadow-[var(--shadow-soft)]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {member.name.split(" ").pop()?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-text">{member.name}</p>
                          <p className="text-sm text-text-muted">{member.role}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
                )}
                <p className="mt-6 text-sm text-text-muted">
                  Contact : <a href="mailto:comitedesparents@lycee-montaigne.edu.lb" className="text-secondary hover:underline">comitedesparents@lycee-montaigne.edu.lb</a>
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/comite-parents/December2025/ex9aVmzf9X4A0EDTgZEz.jpg"
                  alt="Comite des parents du Lycee Montaigne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Reglement Interieur */}
      <section id="reglement" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Reglement Interieur & Instances" />
          <FadeInView>
            <div className="mx-auto mt-12 max-w-4xl rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-xl font-semibold">Reglement Interieur</h3>
              <p className="mt-4 text-text-muted">
                Le reglement interieur du Lycee Montaigne definit les droits et devoirs de chaque membre
                de la communaute scolaire. Il garantit un cadre de vie harmonieux et propice a l&apos;apprentissage.
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Instances de Gouvernance — only show if DB has data */}
      {governanceInstances.length > 0 && (
      <section id="fonctionnement" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Instances de Gouvernance"
            subtitle="Les organes qui assurent le fonctionnement democratique du lycee"
          />
          <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {governanceInstances.map((inst) => {
              const Icon = governanceIconMap[inst.iconName] || Building2;
              return (
                <StaggerItem key={inst.id}>
                  <Link
                    href={`/etablissement/fonctionnement/${inst.slug}`}
                    className="group flex items-center gap-4 rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${inst.accentColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-semibold text-text transition-colors group-hover:text-secondary">
                        {inst.title}
                      </h4>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-secondary" />
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
      )}
    </>
  );
}
