"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { ExternalLink } from "lucide-react";
import { localImage } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  image: string | null;
  link: string | null;
  category: string | null;
  publishedAt: string;
}

export function ActualitesContent({ news }: { news: NewsItem[] }) {
  return (
    <>
      <PageHero title="Actualités" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          {news.length > 0 ? (
            <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <StaggerItem key={item.id}>
                  <FadeInView>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                      >
                        <CardInner item={item} />
                      </a>
                    ) : (
                      <div className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-soft)]">
                        <CardInner item={item} />
                      </div>
                    )}
                  </FadeInView>
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <p className="text-center text-text-muted">
              Aucune actualité pour le moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function CardInner({ item }: { item: NewsItem }) {
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(item.publishedAt));

  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={localImage(item.image) || "/images/actualites/January2026/Gr126Yxp86fX8jQaSwnh.jpeg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
            {item.category}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs text-text-muted">{formattedDate}</p>
        <h3 className="mt-1 font-semibold text-primary line-clamp-2">{item.title}</h3>
        {item.link && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
            Voir sur Instagram
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </>
  );
}
