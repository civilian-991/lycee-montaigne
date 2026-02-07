"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";

const news = [
  {
    title: "Nuits de la lecture – A la decouverte de la BD avec Tintin",
    image: "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Nuits de la lecture – Contes et radiocassette en CM1 et CM2",
    image: "/images/actualites/January2026/hjohJyJ8Yz3P14BGKWCk.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "2025 MUN Conference Recap",
    image: "/images/actualites/January2026/Yjx2dWMAEQgjzmlB9hcy.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Visite de Mme Isabelle Picault, conseillere adjointe et d'action culturelle",
    image: "/images/actualites/January2026/UnkBO3aNJBHYDaqui4nt.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Explorer le role des enzymes en specialite SVT",
    image: "/images/actualites/January2026/dcdN3CWKF92prbbgkGCc.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Dissection du coeur du mouton en 3eme SVT",
    image: "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
];

const sustainabilityImages = [
  "/images/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
  "/images/development-durables/November2024/uhlbgzGIhcHxPIM03Upx.jpg",
  "/images/development-durables/November2024/OypqboJndmfFo5oDOEdN.jpg",
  "/images/development-durables/November2024/bPAc0bMPRxQ50hIGnNA5.png",
];

export default function VieDuLMPage() {
  return (
    <>
      <PageHero title="Vie du LM" />

      {/* Actualites */}
      <section id="actualite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Actualites" />
          <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <StaggerItem key={item.title}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-text group-hover:text-primary">{item.title}</h3>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Developpement durable */}
      <section id="dev" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Developpement durable" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Depuis sa creation en 2012, le Lycee Montaigne s&apos;engage en faveur du developpement durable
                  et de l&apos;eco-citoyennete. Notre demarche vise a former des citoyens responsables et
                  conscients des enjeux environnementaux.
                </p>
                <p className="mt-4 text-text-muted">
                  L&apos;etablissement a obtenu le label EFE3D Niveau 3 (Expert), temoignant de notre engagement
                  fort en matiere de developpement durable.
                </p>
                <div className="mt-6 rounded-2xl border border-secondary/20 bg-secondary/5 p-4">
                  <p className="text-sm font-medium text-secondary">Referents developpement durable</p>
                  <p className="mt-1 text-sm text-text-muted">
                    Mme Roula Chalabi (1er degre) &bull; M. Robert Sreih (2nd degre)
                  </p>
                </div>
              </div>
              <StaggerChildren className="grid grid-cols-2 gap-3">
                {sustainabilityImages.map((img, i) => (
                  <StaggerItem key={i}>
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                      <Image
                        src={img}
                        alt={`Developpement durable ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Webradio */}
      <section id="web" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)] lg:order-first">
                <Image
                  src="/images/webradios/November2024/amxLKLrgOzIeBoHAVT4x.jpeg"
                  alt="Webradio du Lycee Montaigne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <SectionHeader title="Webradio" className="text-left" />
                <p className="mt-6 text-text-muted">
                  La webradio du Lycee Montaigne est un projet educatif qui permet aux eleves de
                  developper leurs competences en communication, expression orale et travail d&apos;equipe.
                  Les eleves produisent des emissions sur des sujets varies : actualite, culture, sciences, sport.
                </p>
                <div className="mt-6 rounded-2xl border border-secondary/20 bg-secondary/5 p-4">
                  <p className="text-sm font-medium text-secondary">Referentes webradio</p>
                  <p className="mt-1 text-sm text-text-muted">
                    Mme Leila Abboud (1er degre) &bull; Mme Joelle Maalouf (2nd degre)
                  </p>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Democratie scolaire */}
      <section id="climat" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Democratie scolaire" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Le Lycee Montaigne favorise la participation active des eleves a la vie de
                  l&apos;etablissement a travers les instances de democratie scolaire : conseil de vie
                  collegienne (CVC), conseil de vie lyceenne (CVL), et elections de delegues.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg"
                  alt="Democratie scolaire"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Egalite */}
      <section id="egalite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)] lg:order-first">
                <Image
                  src="/images/egalite-intros/October2024/7QOD9LQ0ZmvqaH1ck4qJ.jpg"
                  alt="Egalite filles-garcons"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <SectionHeader title="Egalite" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Conformement a la politique de l&apos;AEFE en matiere d&apos;egalite entre les filles et les garcons,
                  le Lycee Montaigne s&apos;inscrit dans une demarche active de promotion de l&apos;egalite
                  et de lutte contre les stereotypes.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Sejours */}
      <section id="sejour" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader title="Sejours pedagogiques" className="text-left" />
                <p className="mt-6 text-text-muted">
                  Le Lycee Montaigne organise des sejours pedagogiques et des voyages scolaires qui enrichissent
                  le parcours educatif des eleves et favorisent l&apos;ouverture culturelle et internationale.
                </p>
                <Link
                  href="/sejours-pedagogiques"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[var(--shadow-warm)]"
                >
                  Voir les sejours
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-warm)]">
                <Image
                  src="/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg"
                  alt="Sejours pedagogiques"
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
