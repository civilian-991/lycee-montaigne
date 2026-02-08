"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { ArrowRight, Leaf, Radio, Vote, Equal, Plane, ExternalLink } from "lucide-react";
import { localImage } from "@/lib/utils";

const INSTAGRAM_URL = "https://www.instagram.com/lyceemontaigne.liban/";

const defaultNews = [
  {
    title: "Nuits de la lecture – A la decouverte de la BD avec Tintin",
    image: "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
  },
  {
    title: "Nuits de la lecture – Contes et radiocassette en CM1 et CM2",
    image: "/images/actualites/January2026/hjohJyJ8Yz3P14BGKWCk.jpeg",
  },
  {
    title: "2025 MUN Conference Recap",
    image: "/images/actualites/January2026/Yjx2dWMAEQgjzmlB9hcy.jpeg",
  },
  {
    title: "Visite de Mme Isabelle Picault, conseillere adjointe et d'action culturelle",
    image: "/images/actualites/January2026/UnkBO3aNJBHYDaqui4nt.jpeg",
  },
  {
    title: "Explorer le role des enzymes en specialite SVT",
    image: "/images/actualites/January2026/dcdN3CWKF92prbbgkGCc.jpeg",
  },
  {
    title: "Dissection du coeur du mouton en 3eme SVT",
    image: "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
  },
];

const sustainabilityImages = [
  "/images/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg",
  "/images/development-durables/November2024/uhlbgzGIhcHxPIM03Upx.jpg",
  "/images/development-durables/November2024/OypqboJndmfFo5oDOEdN.jpg",
  "/images/development-durables/November2024/bPAc0bMPRxQ50hIGnNA5.png",
];

type PageSectionRow = {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string | null;
  contentHtml: string | null;
  image: string | null;
  order: number;
};

interface VieContentProps {
  news: Array<{
    id: string;
    title: string;
    image: string | null;
    link: string | null;
    category: string | null;
  }>;
  sections: PageSectionRow[];
}

export function VieContent({ news, sections }: VieContentProps) {
  // Look up CMS sections by key
  const devDurableSection = sections.find((s) => s.sectionKey === "developpement-durable");
  const webradioSection = sections.find((s) => s.sectionKey === "webradio");
  const climatSection = sections.find((s) => s.sectionKey === "climat");
  const egaliteSection = sections.find((s) => s.sectionKey === "egalite");
  // Use CMS news if available, otherwise fall back to hardcoded defaults
  const displayNews = news.length > 0
    ? news.map((n) => ({
        title: n.title,
        image: localImage(n.image) ?? "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
        link: n.link,
      }))
    : defaultNews.map((n) => ({ ...n, link: null as string | null }));

  return (
    <>
      <PageHero title="Vie du LM" />

      {/* ─── Actualites — Instagram-inspired feed ──────────────── */}
      <section id="actualite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader title="Actualites" className="mb-0 text-left" />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-2px_rgba(188,24,136,0.4)]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" /></svg>
              Suivez-nous
            </a>
          </div>

          {/* Featured post + grid */}
          <div className="mt-4 grid gap-5 lg:grid-cols-5">
            {/* Featured — large */}
            <a
              href={displayNews[0]?.link ?? INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[20px] shadow-[var(--shadow-elevated)] lg:col-span-3 lg:row-span-2"
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
                <Image
                  src={displayNews[0]?.image ?? ""}
                  alt={displayNews[0]?.title ?? ""}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-8">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    A la une
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">{displayNews[0]?.title}</h3>
                </div>
              </div>
            </a>

            {/* Smaller posts */}
            {displayNews.slice(1, 5).map((item) => (
              <a
                key={item.title}
                href={item.link ?? INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-[20px] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] lg:col-span-1"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs font-medium text-white line-clamp-2">{item.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Developpement durable ─────────────────────────────── */}
      <section id="dev" className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <FadeInView>
              <div className="grid items-start gap-10 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                      <Leaf className="h-5 w-5 text-secondary" />
                    </div>
                    <SectionHeader title="Developpement durable" className="mb-0 text-left" />
                  </div>
                  {devDurableSection?.contentHtml ? (
                    <div
                      className="mt-6 leading-relaxed text-text-muted [&>p]:mt-4"
                      dangerouslySetInnerHTML={{ __html: devDurableSection.contentHtml }}
                    />
                  ) : (
                    <>
                      <p className="mt-6 leading-relaxed text-text-muted">
                        Depuis sa creation en 2012, le Lycee Montaigne s&apos;engage en faveur du developpement durable
                        et de l&apos;eco-citoyennete. Notre demarche vise a former des citoyens responsables et
                        conscients des enjeux environnementaux.
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">3</span>
                        Label EFE3D Niveau Expert
                      </div>
                      <div className="mt-6 rounded-2xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]">
                        <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">Referents</p>
                        <p className="mt-2 text-sm text-text">
                          Mme Roula Chalabi <span className="text-text-muted">(1er degre)</span>
                        </p>
                        <p className="mt-1 text-sm text-text">
                          M. Robert Sreih <span className="text-text-muted">(2nd degre)</span>
                        </p>
                      </div>
                    </>
                  )}
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
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Webradio ──────────────────────────────────────────── */}
      <section id="web" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="overflow-hidden rounded-[24px] border border-border bg-background shadow-[var(--shadow-warm)]">
              <div className="grid items-stretch lg:grid-cols-2">
                <div className="relative min-h-[280px]">
                  <Image
                    src={localImage(webradioSection?.image) || "/images/webradios/November2024/amxLKLrgOzIeBoHAVT4x.jpeg"}
                    alt="Webradio du Lycee Montaigne"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                      <Radio className="h-5 w-5 text-red-500" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-red-500 uppercase">On Air</span>
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-primary md:text-3xl">
                    {webradioSection?.title || "Webradio"}
                  </h3>
                  {webradioSection?.contentHtml ? (
                    <div
                      className="mt-3 leading-relaxed text-text-muted [&>p]:mt-3"
                      dangerouslySetInnerHTML={{ __html: webradioSection.contentHtml }}
                    />
                  ) : (
                    <>
                      <p className="mt-3 leading-relaxed text-text-muted">
                        La webradio du Lycee Montaigne est un projet educatif qui permet aux eleves de
                        developper leurs competences en communication, expression orale et travail d&apos;equipe.
                        Les eleves produisent des emissions sur des sujets varies.
                      </p>
                      <div className="mt-5 rounded-2xl border border-border bg-background-alt p-4">
                        <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">Referentes</p>
                        <p className="mt-1.5 text-sm text-text">
                          Mme Leila Abboud <span className="text-text-muted">(1er degre)</span> &bull; Mme Joelle Maalouf <span className="text-text-muted">(2nd degre)</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ─── Valeurs — Democratie + Egalite ────────────────────── */}
      <section id="climat" className="relative overflow-hidden bg-background-alt">
        <WaveDivider fill="var(--color-background)" flip className="relative z-10" />
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="Nos valeurs en action"
              subtitle="Democratie scolaire et egalite au coeur de notre projet educatif"
            />
            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
              {/* Democratie scolaire */}
              <StaggerItem>
                <div className="group h-full overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-warm)]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={localImage(climatSection?.image) || "/images/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg"}
                      alt="Democratie scolaire"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                      <Vote className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary">
                      {climatSection?.title || "Democratie scolaire"}
                    </h3>
                    {climatSection?.contentHtml ? (
                      <div
                        className="mt-2 text-sm leading-relaxed text-text-muted [&>p]:mt-2"
                        dangerouslySetInnerHTML={{ __html: climatSection.contentHtml }}
                      />
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        Le Lycee Montaigne favorise la participation active des eleves a travers les instances de
                        democratie scolaire : conseil de vie collegienne (CVC), conseil de vie lyceenne (CVL),
                        et elections de delegues.
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>

              {/* Egalite */}
              <StaggerItem>
                <div id="egalite" className="group h-full overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-warm)]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={localImage(egaliteSection?.image) || "/images/egalite-intros/October2024/7QOD9LQ0ZmvqaH1ck4qJ.jpg"}
                      alt="Egalite filles-garcons"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                      <Equal className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary">
                      {egaliteSection?.title || "Egalite"}
                    </h3>
                    {egaliteSection?.contentHtml ? (
                      <div
                        className="mt-2 text-sm leading-relaxed text-text-muted [&>p]:mt-2"
                        dangerouslySetInnerHTML={{ __html: egaliteSection.contentHtml }}
                      />
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        Conformement a la politique de l&apos;AEFE, le Lycee Montaigne s&apos;inscrit dans une demarche
                        active de promotion de l&apos;egalite entre les filles et les garcons et de lutte
                        contre les stereotypes.
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </div>
        <WaveDivider fill="var(--color-background)" />
      </section>

      {/* ─── Sejours — CTA banner ──────────────────────────────── */}
      <section id="sejour" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeInView>
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-primary to-primary-dark shadow-[var(--shadow-elevated)]">
              <div className="grid items-center lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-white/60" />
                    <span className="text-xs font-semibold tracking-wide text-white/60 uppercase">Voyages et decouvertes</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                    Sejours pedagogiques
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/75">
                    Le Lycee Montaigne organise des sejours pedagogiques et des voyages scolaires qui enrichissent
                    le parcours educatif des eleves et favorisent l&apos;ouverture culturelle et internationale.
                  </p>
                  <Link
                    href="/sejours-pedagogiques"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.2)]"
                  >
                    Voir les sejours
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative min-h-[300px] lg:min-h-full">
                  <Image
                    src="/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg"
                    alt="Sejours pedagogiques"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent lg:from-primary/60" />
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
