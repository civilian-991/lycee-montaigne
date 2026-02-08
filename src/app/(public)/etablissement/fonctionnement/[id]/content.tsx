"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import {
  FadeInView,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import {
  Users,
  Calendar,
  Building2,
  Shield,
  Scale,
  ArrowLeft,
  GraduationCap,
  Megaphone,
  HeartPulse,
  BookOpen,
  Globe,
  Gavel,
  ClipboardList,
  UserCheck,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { instances, getInstanceById, type GovernanceInstance, type Member } from "./data";

/* ── Icon Map ──────────────────────────────────────────── */

const iconMap: Record<string, LucideIcon> = {
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

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Users;
}

/* ── DB Data Type ──────────────────────────────────────── */

interface DbGovernanceInstance {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  iconName: string;
  accentColor: string;
  descriptionHtml: string;
  compositionHtml: string;
  membersJson: string | null;
  meetingFrequency: string | null;
  presidence: string | null;
  responsibilitiesHtml: string;
  order: number;
}

/* ── Component ─────────────────────────────────────────── */

export function FonctionnementContent({
  instanceId,
  dbData,
}: {
  instanceId: string;
  dbData?: DbGovernanceInstance;
}) {
  // Use DB data if available, otherwise fall back to hardcoded
  const hardcodedInstance = getInstanceById(instanceId);

  // Resolve display values from DB or hardcoded
  const title = dbData?.title ?? hardcodedInstance?.title;
  const subtitle = dbData?.subtitle ?? hardcodedInstance?.subtitle;
  const iconName = dbData?.iconName ?? hardcodedInstance?.iconName ?? "Building2";
  const accentColor = dbData?.accentColor ?? hardcodedInstance?.accentColor ?? "from-primary to-primary-dark";
  const presidence = dbData?.presidence ?? hardcodedInstance?.presidence;
  const meetingFrequency = dbData?.meetingFrequency ?? hardcodedInstance?.meetingFrequency;

  if (!title) return null;

  const IconComponent = getIcon(iconName);

  // Parse DB members JSON if present
  let dbMembers: Member[] | null = null;
  if (dbData?.membersJson) {
    try {
      dbMembers = JSON.parse(dbData.membersJson);
    } catch {
      dbMembers = null;
    }
  }

  // Determine data source flags
  const useDbDescription = !!dbData;
  const useDbComposition = !!dbData;
  const useDbResponsibilities = !!dbData;
  const members = dbMembers ?? hardcodedInstance?.members ?? null;
  const hasMembers = members && members.length > 0;

  // For hardcoded data
  const hardcodedDescription = hardcodedInstance?.description ?? [];
  const hardcodedComposition = hardcodedInstance?.composition ?? [];
  const hardcodedResponsibilities = hardcodedInstance?.keyResponsibilities ?? [];
  const hasResponsibilities = useDbResponsibilities
    ? !!dbData?.responsibilitiesHtml?.trim()
    : hardcodedResponsibilities.length > 0;
  const hasMeetingFrequency = !!meetingFrequency;

  return (
    <>
      {/* Hero */}
      <PageHero title={title} />

      {/* Breadcrumb + Subtitle */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
              <Link
                href="/etablissement"
                className="transition-colors hover:text-secondary"
              >
                Etablissement
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href="/etablissement#reglement"
                className="transition-colors hover:text-secondary"
              >
                Instances
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-text">{title}</span>
            </nav>

            {/* Title card with icon */}
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br ${accentColor} shadow-[var(--shadow-elevated)]`}
              >
                <IconComponent className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text md:text-3xl">
                  {title}
                </h2>
                <p className="mt-2 max-w-2xl text-lg leading-relaxed text-text-muted">
                  {subtitle}
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Description */}
      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative">
            <WaveDivider
              fill="var(--color-background)"
              flip
              className="absolute -top-16 left-0 right-0 md:-top-24"
            />
          </div>
          <SectionHeader
            title="Presentation"
            subtitle="Role et missions de cette instance"
          />
          <FadeInView>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-soft)] md:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${accentColor}`}
                  >
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text">
                    {title}
                  </h3>
                </div>
                {useDbDescription ? (
                  <div
                    className="space-y-4 leading-relaxed text-text-muted [&_p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: dbData!.descriptionHtml }}
                  />
                ) : (
                  <div className="space-y-4">
                    {hardcodedDescription.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed text-text-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {presidence && (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-primary/5 px-5 py-4">
                    <Users className="h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm font-medium text-primary">
                      {presidence}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Composition / Members */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Composition"
            subtitle={
              hasMembers
                ? "Membres et responsabilites"
                : "Parties representees au sein de cette instance"
            }
          />

          {hasMembers ? (
            <StaggerChildren className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {members!.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="group relative overflow-hidden rounded-[20px] border border-border bg-background p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-elevated)]">
                    {/* Decorative circle */}
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative">
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${accentColor}`}
                      >
                        <span className="text-lg font-bold text-white">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-text">{member.name}</h4>
                      <p className="mt-1 text-sm text-text-muted">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : useDbComposition ? (
            <FadeInView>
              <div className="mx-auto mt-12 max-w-4xl">
                <div
                  className="rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-soft)] leading-relaxed text-text-muted [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 md:p-10"
                  dangerouslySetInnerHTML={{ __html: dbData!.compositionHtml }}
                />
              </div>
            </FadeInView>
          ) : (
            <StaggerChildren className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hardcodedComposition.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-center gap-4 rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-elevated)]">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${accentColor}`}
                    >
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-medium text-text">{item}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* Key Responsibilities */}
      {hasResponsibilities && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="relative">
              <WaveDivider
                fill="var(--color-background)"
                flip
                className="absolute -top-16 left-0 right-0 md:-top-24"
              />
            </div>
            <SectionHeader
              title="Missions Principales"
              subtitle="Les attributions cles de cette instance"
            />
            <FadeInView>
              <div className="mx-auto max-w-4xl">
                <div className="rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-soft)] md:p-10">
                  {useDbResponsibilities ? (
                    <div
                      className="space-y-4 leading-relaxed text-text-muted [&_li]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: dbData!.responsibilitiesHtml }}
                    />
                  ) : (
                    <StaggerChildren className="space-y-5">
                      {hardcodedResponsibilities.map((responsibility, i) => (
                        <StaggerItem key={i}>
                          <div className="flex items-start gap-4">
                            <div
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${accentColor}`}
                            >
                              <span className="text-xs font-bold text-white">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <p className="pt-1 leading-relaxed text-text-muted">
                              {responsibility}
                            </p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                  )}
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      )}

      {/* Meeting Frequency */}
      {hasMeetingFrequency && (
        <section className={hasResponsibilities ? "py-16 md:py-24" : "bg-background-alt py-16 md:py-24"}>
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <div className="mx-auto max-w-3xl">
                <div className="relative overflow-hidden rounded-[20px] border border-border bg-background p-8 shadow-[var(--shadow-warm)] md:p-10">
                  {/* Decorative blobs */}
                  <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-secondary/10 to-primary/5" />
                  <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/5" />
                  <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-secondary to-secondary-dark shadow-[var(--shadow-soft)]">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text">
                        Frequence des reunions
                      </h3>
                      <p className="mt-2 leading-relaxed text-text-muted">
                        {meetingFrequency}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      )}

      {/* Other Instances Navigation */}
      <section
        className={
          (hasResponsibilities && !hasMeetingFrequency) || (!hasResponsibilities && hasMeetingFrequency)
            ? "py-16 md:py-24"
            : "bg-background-alt py-16 md:py-24"
        }
      >
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Autres Instances"
            subtitle="Decouvrez les autres instances de gouvernance"
          />
          <StaggerChildren className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {instances
              .filter((inst) => inst.id !== instanceId)
              .slice(0, 6)
              .map((inst) => {
                const OtherIcon = getIcon(inst.iconName);
                return (
                  <StaggerItem key={inst.id}>
                    <Link
                      href={`/etablissement/fonctionnement/${inst.id}`}
                      className="group flex items-center gap-4 rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${inst.accentColor} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <OtherIcon className="h-5 w-5 text-white" />
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

          {/* Show remaining if more than 6 */}
          {instances.filter((inst) => inst.id !== instanceId).length > 6 && (
            <FadeInView className="mt-6">
              <StaggerChildren className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {instances
                  .filter((inst) => inst.id !== instanceId)
                  .slice(6)
                  .map((inst) => {
                    const OtherIcon = getIcon(inst.iconName);
                    return (
                      <StaggerItem key={inst.id}>
                        <Link
                          href={`/etablissement/fonctionnement/${inst.id}`}
                          className="group flex items-center gap-4 rounded-[20px] border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${inst.accentColor} transition-transform duration-300 group-hover:scale-110`}
                          >
                            <OtherIcon className="h-5 w-5 text-white" />
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
            </FadeInView>
          )}
        </div>
      </section>

      {/* Back link */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="flex justify-center">
              <Link
                href="/etablissement#reglement"
                className="group inline-flex items-center gap-3 rounded-[20px] border border-border bg-background px-8 py-4 font-medium text-text shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
              >
                <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                Retour aux instances de l&apos;etablissement
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
