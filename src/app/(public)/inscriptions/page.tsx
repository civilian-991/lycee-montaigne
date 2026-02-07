"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { CheckCircle } from "lucide-react";

const requiredDocs = [
  "Carnet de vaccination et fiche medicale",
  "Deux photos d'identite",
  "Pieces d'identite (libanaises, binationales ou etrangeres)",
  "Attestation scolaire de l'etablissement actuel",
  "Bulletins scolaires de l'annee en cours et de l'annee precedente",
  "Pour le secondaire : copie du Brevet Libanais",
  "Dispense d'arabe le cas echeant",
  "Jugement de divorce avec garde le cas echeant",
];

export default function InscriptionsPage() {
  return (
    <>
      <PageHero title="Inscriptions et Reinscriptions" />

      {/* Procedure */}
      <section id="inscription" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Procedure d'inscription 2026-2027" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Pour inscrire votre enfant au Lycee Montaigne, veuillez preparer les documents suivants :
                </p>
                <StaggerChildren className="mt-6 space-y-3">
                  {requiredDocs.map((doc) => (
                    <StaggerItem key={doc}>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                        <span className="text-sm text-text">{doc}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png"
                  alt="Ouverture des inscriptions 2026-2027"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Portes Ouvertes */}
      <section id="porte-ouvertes" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)] lg:order-first">
                <Image
                  src="/images/s4-files/January2026/U4IfChjnxOFzmzse6Tme.jpeg"
                  alt="Portes Ouvertes Maternelle 2025-2026"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <SectionHeader title="Portes Ouvertes Maternelle" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Venez decouvrir notre ecole maternelle lors de nos journees portes ouvertes.
                  Un moment d&apos;accueil, de visite des locaux et d&apos;echanges avec l&apos;equipe pedagogique
                  vous attend.
                </p>
                <div className="mt-6 rounded-2xl border border-secondary/20 bg-secondary/5 p-4">
                  <p className="font-medium text-secondary">Prochaines portes ouvertes</p>
                  <p className="mt-1 text-sm text-text-muted">
                    Consultez nos reseaux sociaux pour les dates a venir.
                  </p>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Bourses */}
      <section id="bourse" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Bourses Scolaires" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Les bourses scolaires sont destinees aux enfants francais residant a l&apos;etranger.
                  Elles permettent de couvrir tout ou partie des frais de scolarite dans les
                  etablissements d&apos;enseignement francais a l&apos;etranger.
                </p>
                <p className="mt-4 text-text-muted">
                  Pour plus d&apos;informations sur les conditions d&apos;eligibilite et la procedure
                  de demande, veuillez consulter le site de l&apos;AEFE ou contacter l&apos;ambassade de France au Liban.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/adm-s3/November2024/VOFelUKYIHWGosCjXmsz.png"
                  alt="Bourses scolaires"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
