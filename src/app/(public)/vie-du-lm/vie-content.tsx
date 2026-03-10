"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { ArrowRight, Leaf, Radio, Vote, Equal, Plane } from "lucide-react";
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

interface VieContentProps {
  news: Array<{
    id: string;
    title: string;
    image: string | null;
    link: string | null;
    category: string | null;
  }>;
  sections: PageSectionRow[];
  webradioReferents: string;
  sustainabilityReferents: string;
  sustainabilityLabel: string;
  instagramUrl: string;
}

export function VieContent({ news, sections, webradioReferents, sustainabilityReferents, sustainabilityLabel, instagramUrl }: VieContentProps) {
  const instagramLink = instagramUrl || "https://www.instagram.com/lyceemontaigne.liban/";
  // Look up CMS sections by key
  const devDurableSection = sections.find((s) => s.sectionKey === "developpement-durable");
  const webradioSection = sections.find((s) => s.sectionKey === "webradio");
  const climatSection = sections.find((s) => s.sectionKey === "climat");
  const egaliteSection = sections.find((s) => s.sectionKey === "egalite");

  // Sustainability images from PageSection
  const sustainabilitySections = sections.filter((s) => s.sectionKey === "developpement-durable-images");
  const sustainabilityImages = sustainabilitySections.length > 0
    ? sustainabilitySections.map((s) => s.image).filter(Boolean) as string[]
    : [];

  // Build news display items from DB only
  const displayNews = news.map((n) => ({
    title: n.title,
    image: localImage(n.image) ?? "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg",
    link: n.link,
  }));

  return (
    <>
      <PageHero title="Vie du LM" />

      {/* ─── Actualites — Instagram-inspired feed ──────────────── */}
      <section id="actualite" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader title="Actualités" className="mb-0 text-left" />
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-2px_rgba(188,24,136,0.4)]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" /></svg>
              Suivez-nous
            </a>
          </div>

          {displayNews.length > 0 ? (
            <div className="mt-4 grid gap-5 lg:grid-cols-5">
              {/* Featured — large */}
              <a
                href={displayNews[0]?.link ?? instagramLink}
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
                      À la une
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">{displayNews[0]?.title}</h3>
                  </div>
                </div>
              </a>

              {/* Smaller posts */}
              {displayNews.slice(1, 5).map((item) => (
                <a
                  key={item.title}
                  href={item.link ?? instagramLink}
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
          ) : (
            <p className="mt-8 text-center text-text-muted">
              Aucune actualité pour le moment. Suivez-nous sur Instagram pour les dernières nouvelles.
            </p>
          )}

          {displayNews.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-white"
              >
                Voir toutes les actualités
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
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
                    <SectionHeader title="Développement durable" className="mb-0 text-left" />
                  </div>
                  {devDurableSection?.contentHtml ? (
                    <div
                      className="mt-6 leading-relaxed text-text-muted [&>p]:mt-4"
                      dangerouslySetInnerHTML={{ __html: devDurableSection.contentHtml }}
                    />
                  ) : (
                    <p className="mt-6 leading-relaxed text-text-muted">
                      Depuis sa création en 2012, le Lycée Montaigne s&apos;engage en faveur du développement durable
                      et de l&apos;éco-citoyenneté. Notre démarche vise à former des citoyens responsables et
                      conscients des enjeux environnementaux.
                    </p>
                  )}
                  {sustainabilityLabel && (
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                      {sustainabilityLabel}
                    </div>
                  )}
                  {sustainabilityReferents && (
                    <div className="mt-6 rounded-2xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]">
                      <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">Référents</p>
                      {sustainabilityReferents.split("\n").filter(Boolean).map((line, i) => (
                        <p key={i} className="mt-1 text-sm text-text">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
                {sustainabilityImages.length > 0 ? (
                  <StaggerChildren className="grid grid-cols-2 gap-3">
                    {sustainabilityImages.map((img, i) => (
                      <StaggerItem key={i}>
                        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                          <Image
                            src={localImage(img) ?? img}
                            alt={`Développement durable ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 25vw"
                          />
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                ) : (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                    <Image
                      src={localImage(devDurableSection?.image) || "/images/development-durables/November2024/IXjTyiAwx79KnYFRYWvR.jpg"}
                      alt="Développement durable"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
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
                    alt="Webradio du Lycée Montaigne"
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
                    <p className="mt-3 leading-relaxed text-text-muted">
                      La webradio du Lycée Montaigne est un projet éducatif qui permet aux élèves de
                      développer leurs compétences en communication, expression orale et travail d&apos;équipe.
                      Les élèves produisent des émissions sur des sujets variés.
                    </p>
                  )}
                  {webradioReferents && (
                    <div className="mt-5 rounded-2xl border border-border bg-background-alt p-4">
                      <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">Référentes</p>
                      <p className="mt-1.5 text-sm text-text">{webradioReferents}</p>
                    </div>
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
              subtitle="Démocratie scolaire et égalité au cœur de notre projet éducatif"
            />
            {/* Democratie scolaire — full-width prominent card */}
            <FadeInView>
              <div className="mt-12 overflow-hidden rounded-[24px] border border-border bg-background shadow-[var(--shadow-warm)]">
                <div className="grid items-stretch lg:grid-cols-2">
                  <div className="relative min-h-[280px]">
                    <Image
                      src={localImage(climatSection?.image) || "/images/climat-categories/April2025/mNHwl4NOWUZkZgPfyTNi.jpeg"}
                      alt="Démocratie scolaire"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                      <Vote className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <h3 className="font-heading text-2xl font-bold text-primary md:text-3xl">
                      {climatSection?.title || "Démocratie scolaire"}
                    </h3>
                    {climatSection?.contentHtml ? (
                      <div
                        className="mt-3 leading-relaxed text-text-muted [&>p]:mt-3"
                        dangerouslySetInnerHTML={{ __html: climatSection.contentHtml }}
                      />
                    ) : (
                      <p className="mt-3 leading-relaxed text-text-muted">
                        Le Lycée Montaigne favorise la participation active des élèves à travers les instances de
                        démocratie scolaire : conseil de vie collégienne (CVC), conseil de vie lycéenne (CVL),
                        et élections de délégués.
                      </p>
                    )}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/vie-du-lm/climat/cvc"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[0_4px_16px_-2px_rgba(2,53,91,0.25)]"
                      >
                        Accéder aux activités du CVC
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/vie-du-lm/climat/cvl"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-white"
                      >
                        Accéder aux activités du CVL
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* Egalite */}
            <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-1">
              <StaggerItem>
                <div id="egalite" className="group overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-warm)]">
                  <div className="grid items-stretch lg:grid-cols-2">
                    <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[240px]">
                      <Image
                        src={localImage(egaliteSection?.image) || "/images/egalite-intros/October2024/7QOD9LQ0ZmvqaH1ck4qJ.jpg"}
                        alt="Égalité filles-garçons"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                        <Equal className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-lg font-bold text-primary">
                        {egaliteSection?.title || "Égalité"}
                      </h3>
                      {egaliteSection?.contentHtml ? (
                        <div
                          className="mt-2 text-sm leading-relaxed text-text-muted [&>p]:mt-2"
                          dangerouslySetInnerHTML={{ __html: egaliteSection.contentHtml }}
                        />
                      ) : (
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">
                          Conformément à la politique de l&apos;AEFE, le Lycée Montaigne s&apos;inscrit dans une démarche
                          active de promotion de l&apos;égalité entre les filles et les garçons et de lutte
                          contre les stéréotypes.
                        </p>
                      )}
                      <Link
                        href="/vie-du-lm/egalite/activite"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                      >
                        Voir les activités
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
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
                    <span className="text-xs font-semibold tracking-wide text-white/60 uppercase">Voyages et découvertes</span>
                  </div>
                  <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                    Séjours pédagogiques
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/75">
                    Le Lycée Montaigne organise des séjours pédagogiques et des voyages scolaires qui enrichissent
                    le parcours éducatif des élèves et favorisent l&apos;ouverture culturelle et internationale.
                  </p>
                  <Link
                    href="/sejours-pedagogiques"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.2)]"
                  >
                    Voir les séjours
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative min-h-[300px] lg:min-h-full">
                  <Image
                    src="/images/actions-sportives/May2025/5AyqpqwCqoBIFxIXphFP.jpeg"
                    alt="Séjours pédagogiques"
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
