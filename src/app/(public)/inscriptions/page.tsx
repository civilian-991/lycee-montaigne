import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Inscriptions et Réinscriptions",
  description: "Procédure d'inscription au Lycée Montaigne de Beit Chabab pour l'année scolaire 2026-2027.",
};

const requiredDocs = [
  "Carnet de vaccination et fiche médicale",
  "Deux photos d'identité",
  "Pièces d'identité (libanaises, binationales ou étrangères)",
  "Attestation scolaire de l'établissement actuel",
  "Bulletins scolaires de l'année en cours et de l'année précédente",
  "Pour le secondaire : copie du Brevet Libanais",
  "Dispense d'arabe le cas échéant",
  "Jugement de divorce avec garde le cas échéant",
];

export default function InscriptionsPage() {
  return (
    <>
      <PageHero title="Inscriptions et Réinscriptions" />

      {/* Procédure */}
      <section id="inscription" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Procédure d'inscription 2026-2027" className="text-left" />
              <p className="mt-6 text-text-muted">
                Pour inscrire votre enfant au Lycée Montaigne, veuillez préparer les documents suivants :
              </p>
              <ul className="mt-6 space-y-3">
                {requiredDocs.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <span className="text-sm text-text">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/adm-s1/December2025/xbMaFrODRj51WGOcKi4k.png"
                alt="Ouverture des inscriptions 2026-2027"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portes Ouvertes */}
      <section id="porte-ouvertes" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-first">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/s4-files/January2026/U4IfChjnxOFzmzse6Tme.jpeg"
                alt="Portes Ouvertes Maternelle 2025-2026"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeader title="Portes Ouvertes Maternelle" className="text-left" />
              <p className="mt-6 text-text-muted">
                Venez découvrir notre école maternelle lors de nos journées portes ouvertes.
                Un moment d&apos;accueil, de visite des locaux et d&apos;échanges avec l&apos;équipe pédagogique
                vous attend.
              </p>
              <div className="mt-6 rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                <p className="font-medium text-secondary">Prochaines portes ouvertes</p>
                <p className="mt-1 text-sm text-text-muted">
                  Consultez nos réseaux sociaux pour les dates à venir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bourses */}
      <section id="bourse" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Bourses Scolaires" className="text-left" />
              <p className="mt-6 text-text-muted">
                Les bourses scolaires sont destinées aux enfants français résidant à l&apos;étranger.
                Elles permettent de couvrir tout ou partie des frais de scolarité dans les
                établissements d&apos;enseignement français à l&apos;étranger.
              </p>
              <p className="mt-4 text-text-muted">
                Pour plus d&apos;informations sur les conditions d&apos;éligibilité et la procédure
                de demande, veuillez consulter le site de l&apos;AEFE ou contacter l&apos;ambassade de France au Liban.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/adm-s3/November2024/VOFelUKYIHWGosCjXmsz.png"
                alt="Bourses scolaires"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
