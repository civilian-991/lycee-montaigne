import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Vie du LM",
  description: "Actualités, développement durable, webradio, démocratie scolaire et vie quotidienne au Lycée Montaigne.",
};

const news = [
  {
    title: "Nuits de la lecture – À la découverte de la BD avec Tintin",
    image: "https://lycee-montaigne.edu.lb//storage/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Nuits de la lecture – Contes et radiocassette en CM1 et CM2",
    image: "https://lycee-montaigne.edu.lb//storage/actualites/January2026/hjohJyJ8Yz3P14BGKWCk.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "2025 MUN Conference Recap",
    image: "https://lycee-montaigne.edu.lb//storage/actualites/January2026/Yjx2dWMAEQgjzmlB9hcy.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Visite de Mme Isabelle Picault, conseillère adjointe et d'action culturelle",
    image: "https://lycee-montaigne.edu.lb//storage/actualites/January2026/UnkBO3aNJBHYDaqui4nt.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Explorer le rôle des enzymes en spécialité SVT",
    image: "https://lycee-montaigne.edu.lb//storage/actualites/January2026/dcdN3CWKF92prbbgkGCc.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
  {
    title: "Dissection du cœur du mouton en 3ème SVT",
    image: "https://lycee-montaigne.edu.lb//storage/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
    href: "https://www.instagram.com/lyceemontaignebeitchabab/",
  },
];

const sustainabilityImages = [
  "https://lycee-montaigne.edu.lb//storage/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
  "https://lycee-montaigne.edu.lb//storage/development-durables/November2024/uhlbgzGIhcHxPIM03Upx.jpg",
  "https://lycee-montaigne.edu.lb//storage/development-durables/November2024/OypqboJndmfFo5oDOEdN.jpg",
  "https://lycee-montaigne.edu.lb//storage/development-durables/November2024/bPAc0bMPRxQ50hIGnNA5.png",
];

export default function VieDuLMPage() {
  return (
    <>
      <PageHero title="Vie du LM" />

      {/* Actualités */}
      <section id="actualite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Actualités" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-text group-hover:text-primary">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Développement durable */}
      <section id="dev" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Développement durable" className="text-left" />
              <p className="mt-6 text-text-muted">
                Depuis sa création en 2012, le Lycée Montaigne s&apos;engage en faveur du développement durable
                et de l&apos;éco-citoyenneté. Notre démarche vise à former des citoyens responsables et
                conscients des enjeux environnementaux.
              </p>
              <p className="mt-4 text-text-muted">
                L&apos;établissement a obtenu le label EFE3D Niveau 3 (Expert), témoignant de notre engagement
                fort en matière de développement durable.
              </p>
              <div className="mt-6 rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                <p className="text-sm font-medium text-secondary">Référents développement durable</p>
                <p className="mt-1 text-sm text-text-muted">
                  Mme Roula Chalabi (1er degré) • M. Robert Sreih (2nd degré)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {sustainabilityImages.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`Développement durable ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Webradio */}
      <section id="web" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-first">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/webradios/November2024/amxLKLrgOzIeBoHAVT4x.jpeg"
                alt="Webradio du Lycée Montaigne"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeader title="Webradio" className="text-left" />
              <p className="mt-6 text-text-muted">
                La webradio du Lycée Montaigne est un projet éducatif qui permet aux élèves de
                développer leurs compétences en communication, expression orale et travail d&apos;équipe.
                Les élèves produisent des émissions sur des sujets variés : actualité, culture, sciences, sport.
              </p>
              <div className="mt-6 rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                <p className="text-sm font-medium text-secondary">Référentes webradio</p>
                <p className="mt-1 text-sm text-text-muted">
                  Mme Leila Abboud (1er degré) • Mme Joëlle Maalouf (2nd degré)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Démocratie scolaire */}
      <section id="climat" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Démocratie scolaire" className="text-left" />
              <p className="mt-6 text-text-muted">
                Le Lycée Montaigne favorise la participation active des élèves à la vie de
                l&apos;établissement à travers les instances de démocratie scolaire : conseil de vie
                collégienne (CVC), conseil de vie lycéenne (CVL), et élections de délégués.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg"
                alt="Démocratie scolaire"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Égalité */}
      <section id="egalite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-first">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/egalite-intros/October2024/7QOD9LQ0ZmvqaH1ck4qJ.jpg"
                alt="Égalité filles-garçons"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeader title="Égalité" className="text-left" />
              <p className="mt-6 text-text-muted">
                Conformément à la politique de l&apos;AEFE en matière d&apos;égalité entre les filles et les garçons,
                le Lycée Montaigne s&apos;inscrit dans une démarche active de promotion de l&apos;égalité
                et de lutte contre les stéréotypes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Séjours */}
      <section id="sejour" className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader title="Séjours pédagogiques" className="text-left" />
              <p className="mt-6 text-text-muted">
                Le Lycée Montaigne organise des séjours pédagogiques et des voyages scolaires qui enrichissent
                le parcours éducatif des élèves et favorisent l&apos;ouverture culturelle et internationale.
              </p>
              <Link
                href="/sejours-pedagogiques"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light"
              >
                Voir les séjours
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://lycee-montaigne.edu.lb//storage/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg"
                alt="Séjours pédagogiques"
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
