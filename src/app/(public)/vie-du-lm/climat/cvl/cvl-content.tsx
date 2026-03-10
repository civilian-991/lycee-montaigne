"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Vote, CheckCircle, Users, ClipboardList } from "lucide-react";
import { localImage } from "@/lib/utils";

type PageSectionRow = {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  image: string | null;
  order: number;
};

const CONSULTATION_DOMAINS = [
  "Organisation générale des études et aménagement du temps scolaire",
  "Élaboration ou modification du projet d'établissement et du règlement intérieur",
  "Questions de restauration et d'internat",
  "Organisation du travail personnel et modalités de soutien personnalisé",
  "Dispositifs d'accompagnement des changements d'orientation",
  "Soutien, aide et assistance des élèves",
  "Échanges linguistiques et culturels avec des établissements européens et étrangers",
  "Information liée à l'orientation et aux métiers",
  "Santé, hygiène et sécurité",
  "Aménagement des espaces destinés à la vie lycéenne",
  "Organisation des activités sportives, culturelles et périscolaires",
];

export function CvlContent({ sections }: { sections: PageSectionRow[] }) {
  const introSection = sections.find((s) => s.sectionKey === "cvl-intro" || s.sectionKey === "intro");
  const domainesSection = sections.find((s) => s.sectionKey === "cvl-missions" || s.sectionKey === "domaines");
  const fonctionnementSection = sections.find((s) => s.sectionKey === "fonctionnement");

  return (
    <>
      <PageHero title="Conseil de Vie Lycéenne" />

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Vote className="h-5 w-5 text-primary" />
                  </div>
                  <SectionHeader
                    title={introSection?.title || "Qu'est-ce que le CVL ?"}
                    className="mb-0 text-left"
                  />
                </div>
                {introSection?.contentHtml ? (
                  <div
                    className="mt-6 leading-relaxed text-text-muted [&>p]:mt-4"
                    dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
                  />
                ) : (
                  <>
                    <p className="mt-6 leading-relaxed text-text-muted">
                      Le Conseil de Vie Lycéenne (CVL) est le lieu où les lycéens sont associés
                      aux décisions de l&apos;établissement. Les élus y représentent les élèves
                      de leur établissement.
                    </p>
                    <p className="mt-4 leading-relaxed text-text-muted">
                      Le CVL émet des avis et formule des propositions qui sont présentées au
                      conseil d&apos;administration et éventuellement affichées dans l&apos;établissement.
                    </p>
                  </>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src={localImage(introSection?.image) || "/images/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg"}
                  alt="Conseil de Vie Lycéenne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Domaines de consultation */}
      <section className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                  <ClipboardList className="h-5 w-5 text-secondary" />
                </div>
                <SectionHeader
                  title={domainesSection?.title || "Domaines de consultation obligatoire"}
                  className="mb-0"
                />
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
                Le CVL est obligatoirement consulté sur les sujets suivants :
              </p>
            </FadeInView>
            {domainesSection?.contentHtml ? (
              <div
                className="mx-auto mt-8 max-w-3xl text-text-muted [&>p]:mt-3"
                dangerouslySetInnerHTML={{ __html: domainesSection.contentHtml }}
              />
            ) : (
              <StaggerChildren className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-2">
                {CONSULTATION_DOMAINS.map((domain, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 shadow-[var(--shadow-soft)]">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <p className="text-sm text-text">{domain}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            )}
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* Fonctionnement */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <SectionHeader
                title={fonctionnementSection?.title || "Fonctionnement"}
                className="mb-0"
              />
            </div>
            {fonctionnementSection?.contentHtml ? (
              <div
                className="mx-auto mt-8 max-w-3xl text-center text-text-muted [&>p]:mt-4"
                dangerouslySetInnerHTML={{ __html: fonctionnementSection.contentHtml }}
              />
            ) : (
              <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-6 text-center shadow-[var(--shadow-soft)]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">1</span>
                  </div>
                  <h4 className="mt-4 font-semibold text-primary">Convocation</h4>
                  <p className="mt-2 text-sm text-text-muted">
                    Le CVL est convoqué par le chef d&apos;établissement avant chaque séance du
                    conseil d&apos;administration.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-6 text-center shadow-[var(--shadow-soft)]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">2</span>
                  </div>
                  <h4 className="mt-4 font-semibold text-primary">Sessions extraordinaires</h4>
                  <p className="mt-2 text-sm text-text-muted">
                    Des sessions extraordinaires peuvent être tenues si la moitié des
                    représentants élèves le demande.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-6 text-center shadow-[var(--shadow-soft)]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">3</span>
                  </div>
                  <h4 className="mt-4 font-semibold text-primary">Ordre du jour</h4>
                  <p className="mt-2 text-sm text-text-muted">
                    Le chef d&apos;établissement fixe l&apos;ordre du jour, incluant les points demandés
                    par au moins la moitié des membres.
                  </p>
                </div>
              </div>
            )}
          </FadeInView>
        </div>
      </section>
    </>
  );
}
